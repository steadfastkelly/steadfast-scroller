# Steadfast — Scrolling Story

A single-file, scroll-driven animation built for the Steadfast brand. It dramatizes one
idea: **science doesn't have to stay black and white — creativity gives complex science
color, shape, and a story that reaches a wider audience.**

Open `index.html` in any modern browser and scroll.

## The narrative arc

The whole piece is one sticky stage driven by scroll progress (0 → 1):

1. **Empty** — an off-white screen and a single line: *"Science begins in black & white."*
2. **The onslaught** — dozens of monochrome ophthalmology readouts (OCT, Humphrey visual
   fields, IOP waveforms, pachymetry, Snellen acuity, scatter/bar/donut charts, cohort
   tables) flood and overwhelm the screen: *"Data alone can overwhelm."*
3. **The transformation** — the grayscale data converges to center and drains away while
   color blooms outward from the same point.
4. **The kaleidoscope** — the work resolves into a mirrored, rotating kaleidoscope of
   colorful **work tiles** (placeholders labeled by medium: Brand, Print, Motion, Web,
   Illustration, Data Viz, Editorial, Identity) — the illusion that complex science can
   take shape across the spectrum of mediums Steadfast offers.
5. **The close** — *"Creativity gives complexity color, shape & a story."*

## Design system

This was intended to live inside the **two-islands design system** used on the Steadfast
Pathways and Steadfast Services sites. That system lives in other repositories which this
build environment cannot reach (GitHub access here is scoped to `steadfast-scroller`),
so it uses the fallback brand spec instead:

- **Display / headlines:** Zolando Sans Extended
- **Body / secondary:** Google Sans Flex
- **Background:** off-white (`#F2EFE8`)

Both fonts are referenced first in their font stacks with robust fallbacks, so the piece
renders correctly even when those exact faces (or the webfont CDN) are unavailable. When
wiring this into the real design system, drop the licensed `@font-face` declarations (or
the shared token sheet) at the top of the `<style>` block and the named families take over
automatically — no other changes required.

## Technical notes

- **Zero dependencies, one file.** All charts are generated procedurally as inline SVG;
  the kaleidoscope is built from 8 mirrored, clip-path wedges of a shared tile composition.
- **Performance:** animates only `transform` and `opacity`, driven by a single
  `requestAnimationFrame` loop with eased scroll smoothing.
- **Respects `prefers-reduced-motion`:** the continuous rotation is disabled for users who
  ask for reduced motion; the scroll story still plays.
- The work tiles are intentional **placeholders** — swap the gradients/labels for real
  project thumbnails when ready.
