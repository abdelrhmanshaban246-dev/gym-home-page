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
  EXERCISE_MEDIA,
  EXERCISES_WITHOUT_MEDIA,
} from "../src/data/exercise-media";

/** The details media area renders at ~976x549; cards at ~240x150. */
const DETAIL_WIDTH = 976;
const CARD_WIDTH = 240;
/** Every asset is normalised to 16:9 so the library shares one frame. */
const TARGET_ASPECT = 16 / 9;
const ASPECT_TOLERANCE = 0.02;
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
  const verifiedUnavailable = EXERCISES_WITHOUT_MEDIA.has(exercise.slug);

  if (!media && verifiedUnavailable) {
    // Declared as audited and intentionally placeholder-only.
    continue;
  }

  if (!media) {
    problems.push(
      `${exercise.slug}: no media record and no EXERCISES_WITHOUT_MEDIA entry — the details page will show the placeholder.`,
    );
    continue;
  }

  if (verifiedUnavailable) {
    problems.push(
      `${exercise.slug}: listed in EXERCISES_WITHOUT_MEDIA but still has a media record.`,
    );
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

    const poster = await checkImage(exercise.slug, "cardSrc", media.cardSrc, CARD_WIDTH);
    if (poster && Math.abs(poster.width / poster.height - TARGET_ASPECT) > ASPECT_TOLERANCE) {
      problems.push(
        `${exercise.slug}: poster frame is ${poster.width}x${poster.height}, not 16:9.`,
      );
    }
    continue;
  }

  // A photo is upscaled by object-cover unless it is explicitly letterboxed.
  const letterboxed = media.fit === "contain";
  const detail = await checkImage(
    exercise.slug,
    "src",
    media.src,
    letterboxed ? 0 : DETAIL_WIDTH,
  );

  if (detail && !letterboxed) {
    const aspect = detail.width / detail.height;
    if (Math.abs(aspect - TARGET_ASPECT) > ASPECT_TOLERANCE) {
      problems.push(
        `${exercise.slug}: detail photo is ${detail.width}x${detail.height} (aspect ${aspect.toFixed(2)}), not the shared 16:9 frame — it will be cropped differently from the rest of the library.`,
      );
    }
  }

  if (media.loopFrame) {
    await checkImage(exercise.slug, "loopFrame", media.loopFrame, 0);
  }
}

for (const [slug, media] of Object.entries(EXERCISE_MEDIA)) {
  for (const [label, src] of [
    ["src", media.src],
    ["cardSrc", media.cardSrc],
    ["loopFrame", media.loopFrame],
  ] as const) {
    if (src?.startsWith("http")) {
      problems.push(
        `${slug}: ${label} points at a remote URL (${src}) — library media must be served from public/exercises.`,
      );
    }
  }
}

for (const slug of Object.keys(EXERCISE_MEDIA)) {
  if (!slugs.has(slug)) {
    problems.push(`EXERCISE_MEDIA has "${slug}", which is not an exercise slug.`);
  }
}

for (const slug of EXERCISES_WITHOUT_MEDIA) {
  if (!slugs.has(slug)) {
    problems.push(
      `EXERCISES_WITHOUT_MEDIA has "${slug}", which is not an exercise slug.`,
    );
  }
}

if (problems.length > 0) {
  console.error("Media check failed:\n");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

const videoCount = Object.values(EXERCISE_MEDIA).filter((m) => m.kind === "video").length;
const placeholderCount = EXERCISES_WITHOUT_MEDIA.size;
console.log(
  `Media check passed: ${EXERCISES.length} exercises — ${videoCount} video, ${
    EXERCISES.length - videoCount - placeholderCount
  } photo, ${placeholderCount} verified-unavailable (placeholder).`,
);
