#!/usr/bin/env node
/**
 * build-artifact-preview.mjs — derive a self-contained, CSP-safe copy of a
 * page for previewing as a Claude Artifact.
 *
 *   node scripts/build-artifact-preview.mjs [inFile] [outFile]
 *     inFile  default: hero-carousel.html  (also handles index.html)
 *     outFile default: <inFile>.artifact.html
 *
 * Artifacts run under a strict CSP that blocks the external image files, so
 * each thumbnail is inlined as an AVIF data URI exposed on `window.WORK_DATA`
 * — the exact hook index.html's story already reads, and which the carousel
 * is rewired to use here. Markup, CSS and animation logic are otherwise kept
 * byte-for-byte; only the image SOURCE (file path → data URI) changes, and
 * the path-based <source> elements are dropped so nothing fetches under CSP.
 *
 * Output is body content only (no <!doctype>/<html>/<head>/<body>) — the
 * Artifact host adds those.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const IN = process.argv[2] || path.join(ROOT, "hero-carousel.html");
const OUT = process.argv[3] || IN.replace(/\.html$/, "") + ".artifact.html";
const NAMES = [
  "01-clarisbio","02-utzy","03-alivecor","04-alvus","05-kinnect","06-conformal",
  "07-ultra-one","08-qapel","09-msi","10-apellis","11-iheezo","12-biotrue",
];

const dataUri = async (name) => {
  const buf = await readFile(path.join(ROOT, "assets/work/optimized", `${name}-460.avif`));
  return `data:image/avif;base64,${buf.toString("base64")}`;
};

const src = await readFile(IN, "utf8");

const style = src.match(/<style>[\s\S]*?<\/style>/)[0];
const bodyInner = src.match(/<body>([\s\S]*?)<\/body>/)[1];

// shared image map — read by the story (window.WORK_DATA[name]) and the
// carousel (rewired below)
const WORK_DATA = {};
for (const n of NAMES) WORK_DATA[n] = await dataUri(n);

// rewire the carousel's <img> to the inlined data URI and drop the path-based
// <source> elements so the CSP has nothing to block
const body = bodyInner
  .replace('el.srcset = srcset("jpg");', "/* artifact: inline data URI, no srcset */")
  .replace(
    "el.src = `${CONFIG.assetBase}/${img.name}-${CONFIG.fallbackWidth}.jpg`;",
    "el.src = WORK_DATA[img.name];"
  )
  .replace("picture.append(avif, webp, el);", "picture.append(el);"); // artifact: data URI only

const out = `<title>Steadfast — From Jargon to a Living Spectrum</title>
<meta name="description" content="A scroll story: ophthalmology data assembles into engraved eyes, then blooms into a spectrum of work that comes alive as a slow, drifting thumbnail wheel." />
${style}
<script>window.WORK_DATA = ${JSON.stringify(WORK_DATA)};
  // expose the same map to the carousel IIFE's lexical scope
  var WORK_DATA = window.WORK_DATA;</script>
${body}
`;

await writeFile(OUT, out, "utf8");
console.log(`Wrote ${OUT}  (${(Buffer.byteLength(out) / 1024).toFixed(0)} KB)`);
