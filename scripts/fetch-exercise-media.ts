/**
 * Downloads and prepares the exercise media referenced by
 * `src/data/exercise-media.ts`, writing it into `public/exercises`.
 *
 * Run with `bun run fetch:media`. It is safe to re-run.
 *
 * Why this exists:
 *  - Wikimedia serves thumbnails with the EXIF rotation already stripped, so
 *    landscape photos arrive rotated 90 degrees. We always fetch the original
 *    and apply orientation ourselves.
 *  - Nothing may be upscaled: every image is capped at MAX_IMAGE_WIDTH and the
 *    checker fails if a file is still narrower than the media area.
 *  - Downloads are validated (magic bytes, minimum size) so an error page can
 *    never be committed as if it were media.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import sharp from "sharp";

import { EXERCISE_MEDIA } from "../src/data/exercise-media";

/** The details media area renders at ~976px wide; stay above it, never below. */
const MAX_IMAGE_WIDTH = 1400;
const POSTER_WIDTH = 960;
const RENDER_WIDTH = 976;
/** Every asset is normalised to 16:9 so the library shares one frame. */
const TARGET_ASPECT = 16 / 9;
/** Shared mean luminance, so no photo is noticeably darker or brighter. */
const TARGET_LUMA = 118;
const MAX_LUMA_SHIFT = 40;
const SATURATION = 1.08;
const MIN_VIDEO_BYTES = 50_000;
const MIN_IMAGE_BYTES = 5_000;
const USER_AGENT =
  "ElbodyFitnessSite/1.0 (https://commons.wikimedia.org/wiki/User:Anon; elbody-media-fetch@example.org) bun-fetch";

const PUBLIC_DIR = join(process.cwd(), "public");

function outputPath(src: string) {
  return join(PUBLIC_DIR, src.replace(/^\//, ""));
}

/** Commons file name encoded for the Special:FilePath endpoint. */
function commonsFileName(sourceUrl: string) {
  const marker = "/wiki/File:";
  const index = sourceUrl.indexOf(marker);
  if (index === -1) return null;
  return encodeURIComponent(sourceUrl.slice(index + marker.length));
}

const REQUEST_DELAY_MS = 1200;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Downloads with a compliant user agent, pacing requests and backing off when
 * Wikimedia rate limits us (HTTP 429).
 */
async function download(url: string, attempt = 0) {
  const response = await fetch(url, {
    headers: { "User-Agent": USER_AGENT, Referer: "https://commons.wikimedia.org/" },
  });

  if (response.status === 429 && attempt < 4) {
    const wait = REQUEST_DELAY_MS * 2 ** attempt;
    console.log(`  rate limited, retrying in ${wait}ms…`);
    await sleep(wait);
    return download(url, attempt + 1);
  }

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }

  await sleep(REQUEST_DELAY_MS);
  return Buffer.from(await response.arrayBuffer());
}

function assertWebm(buffer: Buffer, slug: string) {
  const magic = [...buffer.slice(0, 4)];
  const isWebm =
    magic[0] === 0x1a && magic[1] === 0x45 && magic[2] === 0xdf && magic[3] === 0xa3;
  if (!isWebm || buffer.length < MIN_VIDEO_BYTES) {
    throw new Error(
      `${slug}: not a usable WebM (${buffer.length} bytes, magic ${magic
        .map((b) => b.toString(16))
        .join(" ")})`,
    );
  }
}

/**
 * Normalises a photo into the library's shared presentation:
 * EXIF orientation, capped width (never enlarged), a centre crop to 16:9, and
 * a uniform luminance/saturation grade.
 *
 * `crop` is skipped for assets marked `fit: "contain"`, which are letterboxed
 * because their source is too small to fill the frame.
 */
async function writeImage(
  source: Buffer,
  target: string,
  options: { crop?: boolean } = {},
) {
  const { crop = true } = options;

  // Pass 1: apply EXIF orientation and cap the width, never enlarging.
  const base = await sharp(source)
    .rotate()
    .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
    .toBuffer();

  const { width = 0, height = 0 } = await sharp(base).metadata();

  // Pass 2: centre-crop to the shared 16:9 frame (cropping never enlarges).
  let pipeline = sharp(base);
  if (crop && width && height) {
    const cropWidth =
      width / height > TARGET_ASPECT ? Math.round(height * TARGET_ASPECT) : width;
    const cropHeight =
      width / height > TARGET_ASPECT ? height : Math.round(width / TARGET_ASPECT);
    pipeline = pipeline.resize({
      width: cropWidth,
      height: cropHeight,
      fit: "cover",
      position: "centre",
    });
  }

  // Pass 3: uniform grade so no exercise is much darker or brighter.
  const stats = await pipeline.clone().stats();
  const mean = (stats.channels[0].mean + stats.channels[1].mean + stats.channels[2].mean) / 3;
  const shift = Math.max(
    -MAX_LUMA_SHIFT,
    Math.min(MAX_LUMA_SHIFT, TARGET_LUMA - mean),
  );

  const { data, info } = await pipeline
    .linear(1, shift)
    .modulate({ saturation: SATURATION })
    .jpeg({ quality: 84, progressive: true })
    .toBuffer({ resolveWithObject: true });

  if (data.length < MIN_IMAGE_BYTES) {
    throw new Error(`${target}: produced only ${data.length} bytes`);
  }
  await writeFile(target, data);
  return { ...info, lumaShift: Math.round(shift) };
}

async function main() {
  await mkdir(join(PUBLIC_DIR, "exercises"), { recursive: true });
  const failures: string[] = [];

  for (const [slug, media] of Object.entries(EXERCISE_MEDIA)) {
    const fileName = commonsFileName(media.sourceUrl);

    try {
      if (!fileName) {
        // Non-Commons source (free-exercise-db): fetch each frame directly.
        const rawBase = media.sourceUrl
          .replace("https://github.com/", "https://raw.githubusercontent.com/")
          .replace("/blob/", "/");
        const frames = [media.src, media.loopFrame].filter(Boolean) as string[];
        for (const [index, src] of frames.entries()) {
          const url = rawBase.replace(/\d\.jpg$/, `${index}.jpg`);
          const response = await fetch(url);
          await sleep(REQUEST_DELAY_MS);
          if (!response.ok) throw new Error(`${response.status} for ${url}`);
          const info = await writeImage(
            Buffer.from(await response.arrayBuffer()),
            outputPath(src),
            { crop: media.fit !== "contain" },
          );
          console.log(
            `${slug.padEnd(22)} photo ${src} -> ${info.width}x${info.height} (letterboxed)`,
          );
        }
        continue;
      }

      if (media.kind === "video") {
        const buffer = await download(
          `https://commons.wikimedia.org/wiki/Special:FilePath/${fileName}`,
        );
        assertWebm(buffer, slug);
        await writeFile(outputPath(media.src), buffer);

        const poster = await download(
          `https://commons.wikimedia.org/wiki/Special:FilePath/${fileName}?width=${POSTER_WIDTH}`,
        );
        const info = await writeImage(poster, outputPath(media.cardSrc));
        console.log(
          `${slug.padEnd(22)} video ${(buffer.length / 1024).toFixed(0)}KB, poster ${info.width}x${info.height}`,
        );
        continue;
      }

      const original = await download(
        `https://commons.wikimedia.org/wiki/Special:FilePath/${fileName}`,
      );
      const info = await writeImage(original, outputPath(media.src), {
        crop: media.fit !== "contain",
      });
      const fits = info.width >= RENDER_WIDTH;
      if (!fits) {
        failures.push(
          `${slug}: image is ${info.width}px wide, below the ${RENDER_WIDTH}px media area`,
        );
      }
      console.log(
        `${slug.padEnd(22)} photo ${info.width}x${info.height} ar ${(
          (info.width ?? 0) / (info.height ?? 1)
        ).toFixed(2)} (${(info.size / 1024).toFixed(0)}KB, luma ${info.lumaShift >= 0 ? "+" : ""}${
          info.lumaShift
        })${fits ? "" : " TOO NARROW"}`,
      );
    } catch (error) {
      failures.push(`${slug}: ${(error as Error).message}`);
    }
  }

  if (failures.length > 0) {
    console.error("\nMedia preparation failed:");
    for (const failure of failures) console.error(`  - ${failure}`);
    process.exit(1);
  }

  console.log(`\nPrepared ${Object.keys(EXERCISE_MEDIA).length} exercises.`);
}

await main();
