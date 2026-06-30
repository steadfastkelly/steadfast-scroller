---
name: dynamic-scroll-animation
description: Build a scroll-driven hero animation where many small pieces (words, tiles, glyphs, shapes) assemble into a composition, then the page transitions from a light background INTO the color of one of those pieces — that piece zooms/blooms until its color fills the viewport and becomes the next section's background, on which new content (copy, image grid) arrives. Use when the user wants a "pieces come together then the background becomes one element's color" scroll story, a typographic/particle assembly hero, or a seamless light→dark (or light→brand-color) scroll transition. Covers the progress→keyframe timeline, assembly easing, the seamless color-takeover (no hard cut), Canvas performance, optional depth-of-field, and deterministic export to .mov/.mp4.
---

# Dynamic Scroll Animation

A reusable playbook for a scroll story with two signature moments:

1. **Assembly** — many small pieces fly in from scattered/off-screen positions and settle into a recognizable composition (a shape, a word-portrait, a grid).
2. **Color takeover** — as the user keeps scrolling, ONE piece zooms toward the viewer and its color **blooms out to fill the whole viewport**, becoming the background for the next section. The light page color gives way to that element's color *continuously* — never a hard cut — and then the next-section content (headline, image fan, etc.) arrives on it.

> The hard-won lesson this skill exists to preserve: **the new background must be born FROM the zooming element** (an expanding fill anchored at that element), not a separate full-screen `<div>` whose opacity snaps in. A snapping div reads as an ugly cut; an aperture growing from the element reads as intentional and premium.

---

## Architecture

A single **sticky stage** pinned inside a **tall scroll track**. Scroll position drives one normalized progress value `p ∈ [0,1]`; a single `requestAnimationFrame` loop eases a smoothed `cur` toward `p` and calls `render(cur)`. Everything visual is a pure function of `p`.

```html
<div class="scroll-track"><!-- height: ~1500–2500vh -->
  <div class="stage"><!-- position:sticky; top:0; height:100vh; overflow:hidden -->
    <canvas id="pieces"></canvas>   <!-- the assembling pieces (see Performance) -->
    <div class="content"></div>     <!-- next-section copy / grid, z above the canvas -->
  </div>
</div>
```

```js
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=t=>t*t*(3-2*t);                       // smoothstep
// piecewise-linear keyframes: flat segments = intentional holds
function pw(p,k){for(let i=1;i<k.length;i++){if(p<=k[i][0]){
  const t=(p-k[i-1][0])/((k[i][0]-k[i-1][0])||1);return lerp(k[i-1][1],k[i][1],clamp(t));}}return k[k.length-1][1];}

// One timeline per phase. Flat runs (e.g. [0.80,0]→[0.875,1]) are where that phase happens;
// equal values create a deliberate pause for reading.
const KF_ASSEMBLE=[[0,0],[0.06,0],[0.74,1],[1,1]];
const KF_TAKEOVER=[[0,0],[0.80,0],[0.875,1],[1,1]];   // the color bloom
const KF_CONTENT =[[0,0],[0.875,0],[0.97,1],[1,1]];   // next-section reveal AFTER takeover

let target=0,cur=0,prevMS=performance.now();
addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;
  target=m>0?clamp(scrollY/m):0;},{passive:true});
function loop(){const now=performance.now(),dt=Math.min(0.05,(now-prevMS)/1000);prevMS=now;
  cur+=(target-cur)*0.10; if(Math.abs(target-cur)<2e-4)cur=target; render(cur,dt); requestAnimationFrame(loop);}
loop();
```

Pass `dt` to `render` — you need real elapsed time for any **time-based** beat (a hold timer before content reveals, an idle ambient rotation), kept separate from scroll-based progress.

---

## Phase 1 — Assembly

Give each piece: a normalized **target** `(nx, ny)` in `[0,1]`, an **entry** point (off-screen or scattered), a per-piece **delay** and **span** so they stagger, and any visual attrs (size, color, rotation).

```js
// in render(p):
const aT = smooth(pw(p, KF_ASSEMBLE));
for(const it of pieces){
  const a = smooth(clamp((aT - it.delay)/it.span));      // this piece's own 0→1
  const x = lerp(it.ex, it.tx, a), y = lerp(it.ey, it.ty, a);
  const s = lerp(0.7, 1, a);
  // draw it at (x,y) scale s, opacity ~ clamp(a*1.9)
}
```
- Stagger delays deterministically (e.g. `delay = ((i*0.61803)%1)*0.5`, golden-ratio hash) so it never looks mechanical and is stable across reloads.
- Entry points: send left-half pieces off the left edge, right-half off the right, with a little random jitter, so they converge inward.
- Keep `KF_ASSEMBLE` finishing (≈0.74) **before** the takeover starts (≈0.80) so there's a moment where the composition is fully formed and still.

---

## Phase 2 — The color takeover (the core move)

Pick a **source piece** near the center of the composition and read its color (`C`). As `takeover ∈ [0,1]` rises:

1. **Dive:** the whole field scales up toward the viewer, anchored on the source piece, which is translated to mid-screen so it ends up centered and huge. Other pieces fling outward past the lens.
2. **Bloom:** a fill of color `C` **grows out of the source piece's screen position** and expands past the viewport diagonal — so the light background is replaced by `C` continuously.
3. **Lock:** once it covers the frame, paint the whole surface `C` and hold it as the next section's background.

```js
// in render(p,dt), after drawing the assembled/diving pieces:
const tk = smooth(pw(p, KF_TAKEOVER));
const cx = lerp(srcX, innerWidth/2, tk), cy = lerp(srcY, innerHeight/2, tk);   // dive origin → center
// (scale every piece by Z = 1 + tk^3 * BIG around (cx,cy); fling others out)

const coreR = smooth(clamp((tk-0.40)/0.55)) * Math.hypot(innerWidth,innerHeight) * 0.62;
if(coreR>0){ ctx.fillStyle = C; ctx.beginPath(); ctx.arc(cx,cy,coreR,0,Math.PI*2); ctx.fill(); }  // aperture
// once tk≈1 (or p past the takeover band): fillRect the whole canvas with C and stop redrawing pieces.
```

**Why an aperture, not a div:** the bloom must originate at the element and sweep outward, so the eye reads it as "this thing's color is taking over." A radial fill on the same canvas is seamless with the dive; a separate `<div>` fading/snapping to full-screen is the cut the user will reject. On an eye/lens theme the circle doubles as an aperture; for other themes ease the radius fast so the circular edge sweeps off-screen quickly, or shape the bloom to the element.

**Pitfalls that cause off-color gaps:**
- Centering the dive on a *gap between pieces* (or a glyph counter/hole) → the background color shows through at full zoom. Anchor on a solid piece / solid interior.
- Relying on a single thin element to fill by zoom alone → a thin stroke needs astronomical scale. Let the **bloom fill** guarantee coverage; the zoom sells the motion.

---

## Phase 3 — Content on the new background

Reveal the next section **only after** the takeover (`KF_CONTENT` starts at the takeover's end). Stagger eyebrow → headline → paragraph → media with `op()` opacity windows. If the new background needs a real time pause before content (so the takeover lands), gate it on a `dt`-accumulated hold, not on scroll:

```js
if(tk>=0.98) hold += dt; else hold = 0;
const reveal = smooth(clamp(Math.max(pw(p,KF_CONTENT) * (hold>0.5?1:0), (hold-0.5)/0.9)));
```

---

## Performance (what keeps it smooth)

- **Render the many pieces on one `<canvas>`, not hundreds of DOM/SVG nodes.** Animating ~hundreds of SVG `<text>`/`<div>` transforms per frame is the #1 cause of jank. One canvas with `fillText`/`fill` per piece is dramatically smoother and stays crisp.
- **Cap devicePixelRatio at 2** for the canvas backing store (`canvas.width = cssW * min(dpr,2)`). Crisp without wasting fill-rate.
- **Heavy effects only when still.** If you add blur/depth, repaint *sharp & filter-free while scrolling*, and paint the expensive blurred frame **once when motion settles** (a "focus-in"). Track a `moved` flag (`|p - lastP| > 2e-4`).
- **Cull off-screen pieces** during the dive (skip `fill` if center is well outside the viewport) — at high zoom most pieces are off-screen.
- **Group draws** by font/style and minimize `ctx.font`/`ctx.fillStyle`/`ctx.filter` switches (sort pieces by style once).
- **Skip entirely** once the takeover color has filled and the pieces are hidden behind it.
- Use `setTransform` for per-piece rotation rather than `save`/`restore` at scale.
- Respect `prefers-reduced-motion`: disable ambient loops; optionally render the settled composition statically.

---

## Optional — depth of field

For a richer "looking through a lens" feel, give each piece a depth `z`: foreground pieces slightly larger/airier, background pieces smaller, dimmer, softly blurred; the focal plane stays sharp. Express depth via **font-size/scale + opacity + a few static blur tiers** (2–3, not continuous). Turn blur OFF during the dive — a blur filter on a hugely-scaled element smears.

---

## Tunable variables (expose these at the top)

- `KF_ASSEMBLE / KF_TAKEOVER / KF_CONTENT` — when each phase happens and its holds.
- Scroll-track height — total scroll length / pacing.
- `cur += (target-cur)*0.10` — scroll smoothing (lower = silkier/laggier).
- Assembly: per-piece `delay/span`, entry spread, start scale (`0.7`).
- Dive depth `BIG` (zoom magnitude), the dive-origin lerp, scatter strength.
- Takeover color `C`, aperture window `(tk-0.40)/0.55` and the `*0.62` coverage margin.
- DPR cap, blur tiers/radii, depth scale range.

---

## Exporting a smooth video (.mov / .mp4)

Do **not** screen-record in real time (headless rAF throttles → stutter). Drive `render` deterministically:

1. Headless Chromium (Playwright). Disable the page loop: `window.requestAnimationFrame = ()=>0;` and reset time-based state (`hold=0`, ambient phase=0, `lastP=null`).
2. For each frame `i` of `FPS*DURATION`, compute `p` from a hand-authored timeline (linear ramps + holds), call `render(p, 1/FPS)` (fixed timestep), then `page.screenshot`. Holds = repeated `p` (let `dt` accumulate so timed reveals/ambient motion advance).
3. Encode: `ffmpeg -framerate FPS -i f%04d.png -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -movflags +faststart out.mov`. (`imageio-ffmpeg` via pip provides a full static ffmpeg with h264 + the mov muxer if the system one is minimal.)

A good 30s timeline: assemble (~0–16s) → brief hold on the formed composition (~1.5s, shows depth-of-field focus-in) → dive + color bloom (~5s) → resolve to full color (~2s) → content + any ambient motion (~4s hold).

---

## Reference skeleton

`reference.html` in this folder is a minimal, framework-free, generic implementation (placeholder shape pieces, light→element-color takeover, content reveal) you can copy and adapt. Replace the `PIECES` data with your composition's coordinates/colors.
