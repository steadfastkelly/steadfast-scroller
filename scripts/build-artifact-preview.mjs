#!/usr/bin/env node
/**
 * build-artifact-preview.mjs — derive a self-contained, CSP-safe copy of
 * hero-carousel.html for previewing as a Claude Artifact.
 *
 * Artifacts run under a strict CSP that blocks the external image files, so
 * each thumbnail is inlined as an AVIF data URI (the same WORK_DATA pattern
 * index.html already uses). The component's markup, CSS and animation logic
 * are kept byte-for-byte identical to production — only the image SOURCE
 * (file path → data URI) changes, and the path-based <source> elements are
 * dropped so nothing tries (and fails) to fetch under the CSP.
 *
 * Output: scratchpad/hero-carousel.artifact.html (body content only — no
 *         <!doctype>/<html>/<head>/<body>, since the Artifact host adds them).
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = process.argv[2] || path.join(ROOT, "hero-carousel.artifact.html");
const NAMES = [
  "01-clarisbio","02-utzy","03-alivecor","04-alvus","05-kinnect","06-conformal",
  "07-ultra-one","08-qapel","09-msi","10-apellis","11-iheezo","12-biotrue",
];

const dataUri = async (name) => {
  const buf = await readFile(path.join(ROOT, "assets/work/optimized", `${name}-460.avif`));
  return `data:image/avif;base64,${buf.toString("base64")}`;
};

const src = await readFile(path.join(ROOT, "hero-carousel.html"), "utf8");

// pull out the <style> and the <section>…</section> + <script>…</script>
const style = src.match(/<style>[\s\S]*?<\/style>/)[0];
const section = src.match(/<section[\s\S]*?<\/section>/)[0];
let script = src.match(/<script>[\s\S]*?<\/script>/)[0];

// build WORK_DATA and rewire the image source to it
const WORK_DATA = {};
for (const n of NAMES) WORK_DATA[n] = await dataUri(n);

script = script
  .replace(
    '"use strict";',
    `"use strict";\n  const WORK_DATA = ${JSON.stringify(WORK_DATA)};`
  )
  .replace('el.srcset = srcset("jpg");', "/* artifact: inline data URI, no srcset */")
  .replace(
    "el.src = `${CONFIG.assetBase}/${img.name}-${CONFIG.fallbackWidth}.jpg`;",
    "el.src = WORK_DATA[img.name];"
  )
  .replace("picture.append(avif, webp, el);", "picture.append(el); // artifact: data URI only");

const out = `<title>Steadfast — Hero Carousel</title>
<meta name="description" content="A slow, premium thumbnail wheel of Steadfast work — a curved arc that drifts counter-clockwise, independent of scroll." />
${style}
${section}
${script}
`;

await writeFile(OUT, out, "utf8");
console.log(`Wrote ${OUT}  (${(Buffer.byteLength(out) / 1024).toFixed(0)} KB)`);
