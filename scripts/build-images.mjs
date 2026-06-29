#!/usr/bin/env node
/**
 * build-images.mjs — derive optimized, responsive image variants for the hero
 * carousel from the source work thumbnails.
 *
 * Source of truth:  assets/work/<name>.jpg  (460×631 progressive JPEGs — the
 *                   client-resized masters; the true originals are not in this
 *                   repo). 460px is therefore a HARD ceiling: we never upscale.
 *
 * Output:           assets/work/optimized/<name>-<w>.{avif,webp,jpg}
 *
 * Formats (best → fallback):  AVIF → WebP → JPEG.
 * Widths:           160, 240, 320, 460 — matched to the carousel's real
 *                   rendered card size (~120–264 CSS px, up to ~528px @2×),
 *                   clamped to the 460px source so nothing is upscaled.
 *
 * Run:   npm i sharp && node scripts/build-images.mjs
 *        (sharp / node_modules / package.json are gitignored by design — this
 *         repo stays dependency-free; only the derived images + this script
 *         are committed.)
 */
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "assets", "work");
const OUT_DIR = path.join(SRC_DIR, "optimized");

const WIDTHS = [160, 240, 320, 460];        // never exceeds the 460px source
const AVIF = { quality: 52, effort: 6 };    // AVIF — smallest, modern browsers
const WEBP = { quality: 74, effort: 6 };    // WebP — broad support
const JPEG = { quality: 76, mozjpeg: true, progressive: true }; // universal fallback

const kb = (n) => (n / 1024).toFixed(1) + "KB";

async function build() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(SRC_DIR))
    .filter((f) => f.toLowerCase().endsWith(".jpg"))
    .sort();

  let totalIn = 0;
  let totalOut = 0;
  const manifest = [];

  for (const file of files) {
    const name = path.basename(file, ".jpg");
    const srcPath = path.join(SRC_DIR, file);
    const meta = await sharp(srcPath).metadata();
    const srcW = meta.width ?? 460;
    totalIn += (await stat(srcPath)).size;

    // Only widths that don't exceed the source — guarantees no upscaling.
    const widths = WIDTHS.filter((w) => w <= srcW);
    if (widths[widths.length - 1] !== srcW && srcW <= Math.max(...WIDTHS)) {
      widths.push(srcW); // include the native width if it's below our largest step
    }

    for (const w of widths) {
      const pipeline = sharp(srcPath).resize({
        width: w,
        withoutEnlargement: true,
        fit: "cover",
      });
      const targets = [
        ["avif", pipeline.clone().avif(AVIF)],
        ["webp", pipeline.clone().webp(WEBP)],
        ["jpg", pipeline.clone().jpeg(JPEG)],
      ];
      for (const [ext, pipe] of targets) {
        const out = path.join(OUT_DIR, `${name}-${w}.${ext}`);
        const info = await pipe.toFile(out);
        totalOut += info.size;
      }
    }
    manifest.push({ name, src: `${srcW}×${meta.height}`, widths });
    console.log(`✓ ${name.padEnd(16)} → ${widths.join(",")} w  ×  avif/webp/jpg`);
  }

  console.log(
    `\nGenerated ${manifest.length} images × ${WIDTHS.length} widths × 3 formats.`
  );
  console.log(`Source total: ${kb(totalIn)}   →   variants total: ${kb(totalOut)}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
