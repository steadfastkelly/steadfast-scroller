# Steadfast — Scrolling Story

A single-file, scroll-driven animation for the Steadfast brand. It dramatizes one idea:
**science doesn't have to stay black and white — creativity gives complex science a story
that reaches a wider audience.**

Open `index.html` in any modern browser and scroll.

## The narrative arc

One sticky stage driven by scroll progress (0 → 1), with the copy held in the lower third
the whole way so the animation never sits behind the words:

1. **Empty** — an off-white screen. *"Keep scrolling."*
2. **Jargon streams in** — ophthalmology / healthcare terminology flows in from the left and
   right edges (*Retina, Cornea, Intraocular, Pachymetry, logMAR, Suprachoroidal…*) as the
   copy beats land one at a time: *"Data alone creates complexity…" → "Charts." → "Numbers."
   → "Findings." → "The truth is there."*
3. **The terminology assembles into a pair of finely engraved black-and-white eyes** —
   hundreds of tiny words and clinical data points (*550 µm, 21 mmHg, 20/40, 0.3 logMAR,
   ETDRS 85, p<0.05, n=240…*) crosshatch the brows, lid lines, lashes, iris striations,
   pupils and under-eye shading, with the iris clipped by the lids and a catchlight left
   blank. The beat *"But can your audience see it?"* lands on eyes built entirely from
   unreadable data — the point made visually.
4. **The eyes collapse into the centre and the work blooms out** — *"The Steadfast
   Difference."* The monochrome word-eyes funnel into the centre of the composition; from
   that point the **spectrum of real Steadfast work** (the 12 thumbnails in `assets/work/`)
   emerges and fans out into a wide arch that runs off both edges.
5. **The close** — *"Creativity gives complexity a story."* and *"We turn rigorous science
   into visual storytelling across a spectrum of mediums, so you can carry your vision
   forward."*

## Design system

Intended to live inside the **two-islands design system** used on the Steadfast Pathways
and Steadfast Services sites. That system lives in repositories this build environment can't
reach (GitHub access is scoped to `steadfast-scroller`), so this uses the fallback brand
spec:

- **Display / headlines:** Zolando Sans Extended
- **Body / secondary:** Google Sans Flex
- **Background:** off-white (`#F2EFE8`)

Both fonts lead their font stacks with robust fallbacks, so the piece renders correctly even
when those exact faces are unavailable. To wire in the real system, drop the licensed
`@font-face` declarations (or the shared token sheet) into the top of the `<style>` block.

## Assets

`assets/work/*.jpg` — the 12 work thumbnails, resized to 460px-wide progressive JPEGs
(~450KB total, down from ~7.6MB) for fast loading. Swap these files (same names) to update
the spectrum.

`assets/work/optimized/*` — derived AVIF / WebP / JPEG variants at 160/240/320/460 px,
generated from the JPEGs above by `scripts/build-images.mjs` and consumed by the hero
carousel (see below). Regenerate with `npm i sharp && node scripts/build-images.mjs`.

## Hero carousel (standalone component)

`hero-carousel.html` is a self-contained, dependency-free hero component that reuses the
spectrum's curved-wheel composition as a **continuously drifting** thumbnail arc — distinct
from the scroll-driven story in `index.html`, which is left untouched.

- **Composition.** The 12 thumbnails ride the upper arc of a large invisible wheel and tilt
  with the rim, overflowing both edges. They drift counter-clockwise (apex moves right → left)
  as a seamless conveyor: each is `pitch` degrees from the next, and an item leaving the far
  left wraps a full `N·pitch` span back to the far right entirely off-screen, so there is no
  visible seam. Motion is **time-based and independent of scroll** (no scroll listeners).
- **Images.** Each tile is a `<picture>` with AVIF → WebP → JPEG sources and an accurate
  `srcset`/`sizes`, so the browser fetches one small variant per card (160 px @1×, 320 px @2×)
  and never the full 460 px master for a thumbnail-sized slot. Intrinsic `width`/`height` are
  declared (no layout shift); the opening arc loads eagerly at high priority and the rest defer.
- **Performance.** One `requestAnimationFrame` loop writes only `transform`
  (`translate3d(…) rotate(…)`) and `opacity` straight to each tile — no layout properties, no
  framework re-renders. `will-change:transform` is scoped to the 12 tiles; the loop pauses when
  the hero scrolls off-screen and `prefers-reduced-motion` renders a static arc.
- **Configuration.** A single `CONFIG` object holds every visual knob — image list + semantic
  alt text + optional focal point, speed, direction, `pitch` (spacing), hover scale, radius,
  apex inset, card size and the responsive breakpoints. Hover scales the focused thumbnail to
  110% via transform only and lifts it with z-index, with no layout shift. Styles are scoped
  under `.hc-*`.

## Technical notes

- **Zero dependencies, one file.** The eyes are true word-art sampled from the engraving
  reference (`ref/eyes-reference.jpg`): `ref/gen.py` reads the image, grids it, and emits a
  point per dark cell with its darkness and local hatch angle (`ref/eyepts.json`, ~1000
  points, baked inline as `EYEPTS`). Each point becomes a tiny clinical token whose size,
  weight and opacity track the darkness and whose rotation follows the engraving's lines, so
  the words reproduce the actual illustration (highlights stay blank). Auto-reduced on small
  screens. The spectrum is a transform-driven arch of the work thumbnails.
- **Regenerating the eyes:** drop a new reference at `ref/eyes-reference.jpg`, run
  `python3 ref/gen.py` (needs `numpy`, `Pillow`), then re-inject `eyepts.json` into the
  `EYEPTS` array in `index.html`.
- **Hover:** once the spectrum is fanned out, hovering a work card zooms it in with a subtle
  spring ease and raises it above its neighbours (pointer events are only enabled after the
  bloom). Cards carry a soft drop shadow and no border.
- **Performance:** animates only `transform` and `opacity`, driven by one
  `requestAnimationFrame` loop with eased scroll smoothing.
- **Legibility first:** all copy lives in a fixed lower-third band with its own off-white
  scrim; the spectrum settles into a wide arch with the closing message resting beneath it.
- Respects `prefers-reduced-motion`.

### Building the Artifact / phone-preview version

The Claude Artifact is body-level HTML under a strict CSP, so the work images must be
inlined as base64 rather than referenced by path. `index.html` reads
`window.WORK_DATA[name]` first and falls back to `assets/work/<name>.jpg`, so the same
source works both ways — the Artifact build just injects a `WORK_DATA` map of data URIs.
