/**
 * Media integrity check. Run with `bun run check:media`.
 *
 * Catches the failure modes that actually happened during development:
 *  - a media file that is missing, empty, or an error page saved with the wrong
 *    extension (validated by magic bytes, not just size);
 *  - an image narrower than the details media area, which `object-cover` would
 *    silently upscale;
 *  - an image that is not in the landscape orientation the media area expects;
 *  - exercises or media records that reference slugs which do not exist.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import sharp from "sharp";

import { EXERCISES } from "../src/data/exercises";
import {
  EXERCISE_CARD_GIFS,
  EXERCISE_MEDIA,
} from "../src/data/exercise-media";

/** The details media area renders at ~976x549; cards at ~240x150. */
const DETAIL_WIDTH = 976;
const CARD_WIDTH = 240;
const MIN_VIDEO_BYTES = 50_000;
const MIN_IMAGE_BYTES = 5_000;

const PUBLIC_DIR = join(process.cwd(), "public");

const problems: string[] = [];
const slugs = new Set(EXERCISES.map((exercise) => exercise.slug));

if (slugs.size !== EXERCISES.length) {
  problems.push("Duplicate exercise slugs found in EXERCISES.");
}

const names = new Set(EXERCISES.map((exercise) => exercise.name));
if (names.size !== EXERCISES.length) {
  problems.push("Duplicate exercise names found in EXERCISES.");
}

async function checkImage(slug: string, label: string, src: string, minWidth: number) {
  const file = join(PUBLIC_DIR, src.replace(/^\//, ""));

  if (!existsSync(file)) {
    problems.push(`${slug}: ${label} file missing (${src}).`);
    return;
  }

  const bytes = readFileSync(file);
  if (bytes.length < MIN_IMAGE_BYTES) {
    problems.push(
      `${slug}: ${label} is only ${bytes.length} bytes (${src}) — the download most likely failed.`,
    );
    return;
  }

  const { width, height, format } = await sharp(file).metadata();

  if (!width || !height) {
    problems.push(`${slug}: ${label} is not a readable image (${src}).`);
    return;
  }

  if (width < minWidth) {
    problems.push(
      `${slug}: ${label} is ${width}px wide, below the ${minWidth}px it renders at (${src}).`,
    );
  }

  if (format !== "jpeg" && format !== "png") {
    problems.push(`${slug}: ${label} has unexpected format ${format} (${src}).`);
  }

  return { width, height };
}

for (const exercise of EXERCISES) {
  const media = EXERCISE_MEDIA[exercise.slug];

  if (!media) {
    problems.push(
      `${exercise.slug}: no media record — the details page will show the placeholder.`,
    );
    continue;
  }

  if (!media.sourceUrl || !media.license || !media.author) {
    problems.push(`${exercise.slug}: media record is missing attribution fields.`);
  }

  if (media.kind === "video") {
    const file = join(PUBLIC_DIR, media.src.replace(/^\//, ""));
    if (!existsSync(file)) {
      problems.push(`${exercise.slug}: video file missing (${media.src}).`);
    } else {
      const bytes = readFileSync(file);
      const magic = [...bytes.slice(0, 4)];
      const isWebm =
        magic[0] === 0x1a && magic[1] === 0x45 && magic[2] === 0xdf && magic[3] === 0xa3;
      if (!isWebm || bytes.length < MIN_VIDEO_BYTES) {
        problems.push(
          `${exercise.slug}: ${media.src} is not a usable WebM (${bytes.length} bytes, magic ${magic
            .map((b) => b.toString(16))
            .join(" ")}). Re-run \`bun run fetch:media\`.`,
        );
      }
    }

    await checkImage(exercise.slug, "cardSrc", media.cardSrc, CARD_WIDTH);
    continue;
  }

  // A photo is upscaled by object-cover unless it is explicitly letterboxed.
  const detail = await checkImage(
    exercise.slug,
    "src",
    media.src,
    media.fit === "contain" ? 0 : DETAIL_WIDTH,
  );

  if (detail && media.fit !== "contain" && detail.height > detail.width) {
    problems.push(
      `${exercise.slug}: detail photo is portrait (${detail.width}x${detail.height}) and will be heavily cropped in the 16:9 media area.`,
    );
  }

  if (media.loopFrame) {
    await checkImage(exercise.slug, "loopFrame", media.loopFrame, 0);
  }
}

for (const [slug, gif] of Object.entries(EXERCISE_CARD_GIFS)) {
  if (!slugs.has(slug)) {
    problems.push(`EXERCISE_CARD_GIFS has "${slug}", which is not an exercise slug.`);
  }
  if (!gif.startsWith("https://")) {
    problems.push(`EXERCISE_CARD_GIFS["${slug}"] should be a remote GIF URL.`);
  }
}

for (const slug of Object.keys(EXERCISE_MEDIA)) {
  if (!slugs.has(slug)) {
    problems.push(`EXERCISE_MEDIA has "${slug}", which is not an exercise slug.`);
  }
}

if (problems.length > 0) {
  console.error("Media check failed:\n");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

const videoCount = Object.values(EXERCISE_MEDIA).filter((m) => m.kind === "video").length;
console.log(
  `Media check passed: ${EXERCISES.length} exercises, all with media (${videoCount} video, ${
    EXERCISES.length - videoCount
  } photo).`,
);
