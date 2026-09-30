/**
 * Fails when an exercise has no media record, a record points at a missing
 * file, or a card GIF has no matching exercise. Run with `bun run check:media`.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";

import { EXERCISES } from "../src/data/exercises";
import {
  EXERCISE_CARD_GIFS,
  EXERCISE_MEDIA,
} from "../src/data/exercise-media";

const PUBLIC_DIR = join(import.meta.dir, "..", "public");

const problems: string[] = [];
const slugs = new Set(EXERCISES.map((exercise) => exercise.slug));

if (slugs.size !== EXERCISES.length) {
  problems.push("Duplicate exercise slugs found in EXERCISES.");
}

for (const exercise of EXERCISES) {
  const media = EXERCISE_MEDIA[exercise.slug];

  if (!media) {
    problems.push(`${exercise.slug}: no media record — details will use the placeholder.`);
    continue;
  }

  for (const [label, src] of [
    ["src", media.src],
    ["cardSrc", media.cardSrc],
    ["loopFrame", media.loopFrame],
  ] as const) {
    if (!src) continue;
    if (src.startsWith("http")) continue;
    if (!existsSync(join(PUBLIC_DIR, src.replace(/^\//, "")))) {
      problems.push(`${exercise.slug}: ${label} file missing (${src}).`);
    }
  }

  if (media.kind === "video" && media.src.endsWith(".webm")) {
    // Videos need a poster frame for the card view.
    if (!existsSync(join(PUBLIC_DIR, media.cardSrc.replace(/^\//, "")))) {
      problems.push(`${exercise.slug}: video poster frame missing (${media.cardSrc}).`);
    }
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

console.log(
  `Media check passed: ${EXERCISES.length} exercises, ${Object.keys(EXERCISE_MEDIA).length} with media.`,
);
