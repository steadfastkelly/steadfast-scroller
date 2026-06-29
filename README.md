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

## Technical notes

- **Zero dependencies, one file.** The eyes are a procedural engraving: each structure
  (brow hatching, lid lines, lashes, limbal rings, iris radials, pupil, tear trough) is
  generated mathematically and rendered as ~900 tiny word/data-point spans (auto-reduced on
  small screens). The spectrum is a transform-driven arch of the work thumbnails.
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
