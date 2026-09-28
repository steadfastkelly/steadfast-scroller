Handrail is an operations handbook. People open it to find a rule, follow a process or check who owns something, usually in a hurry. The look is quiet greyscale, white tiles on a light grey ground, big tight headlines and pill-shaped controls. The one yellow is a highlighter, not a brand splash.

## Voice

Write the way a good manager explains a rule across a desk.

- Say who does what. "Your manager approves it," not "Approval is obtained."
- Lead with the answer. The first line under a heading settles the question most people came with.
- Contractions and everyday words: "ask," "use," "before," "don't."
- Page titles and big display lines end with a period: "Paid time off." Section headings don't.
- Titles name what people search for: "Client offboarding," not "Offboarding Procedure Framework."
- Steps start with a verb and name a role: "Manager reviews coverage."
- Sentence case everywhere. No emoji, no exclamation marks, no em dashes.
- Dates are `12 Sep 2026`, versions `v4.2`, counts `(04)`. All three in Fragment Mono.

## Color

- Everything sits on `paper`. Content lives in `surface` tiles. `sunken` is for table heads, code and hover.
- Text is `ink`. Small secondary text is `ink-muted`. `ink-dim` is only for the grey half of a two-tone headline or summary, 22px and up.
- Two-tone lines: the part that answers the question in `ink`, the rest in `ink-dim`. "**How much time off you get,** how to ask for it, and who says yes."
- `panel` is the dark block: Required callouts, the marketing services section, the footer. Text on it is `on-panel` and `on-panel-muted`; buttons on it are `inverse` pills.
- The primary button is an `ink` pill. There is no colored button.
- `rail` fills exactly one thing: the current step's counter. `rail-soft` is the highlighter for the active nav item and search matches. `rail-deep` underlines links.
- Status hues (`approved`, `review`, `overdue`) mean status only and always come with their word.
- Focus is a solid 2px `focus` ring, offset 2px.

## Type

- Schibsted Grotesk for everything readable, Fragment Mono for numbers.
- Headlines are tight: `display` at -0.05em, `h1` and `h2` at -0.04em, `h3` and `lead` at -0.03em, UI at -0.02em. The tracking is most of the look; don't loosen it.
- Weights are 500 and 600 only (700 for the wordmark).
- `body` (17px, 1.6) is the one style kept near normal tracking, so long policies stay easy to read. Keep it to `measure` (68ch).
- `counter` is for real counts and order, in parentheses: `(04)` pages, `(01)` a step. Never decorative numbering.
- Under 810px: `display` 64px, `h1` 36px, `h2` 26px.

## Layout and responsiveness

The page is a set of tiles on the ground with `tile-gap` (4px) between them. Space inside tiles is generous; space between them is tight. Nothing gets a border or shadow to separate it.

| Width | Layout | Gutter |
| --- | --- | --- |
| under 810px | One column. Blurred sticky top bar with wordmark and a Menu pill. | `space-5` (20px) |
| 810 to 1199px | Sections go two-column: eyebrow left, content right. | `space-7` (30px) |
| 1200 to 1439px | Nav tile docks left at `nav-width` and sticks. | `space-9` (36px) |
| 1440px and up | On this page tile appears at `toc-width`. Shell caps at `page-max` (1520px). | `space-9` |

- Sections open with an `Eyebrow` (dot and label), then the heading. On tablet and up the eyebrow sits alone in a narrow left column.
- Lists of things (steps, services, FAQs) are rows split by `line` hairlines, with a mono counter on the left.
- Metadata comes as a row of small tiles, never a sentence.
- Wide tables scroll inside their own tile. The page never scrolls sideways.
- See the `HandbookPage` card for the full shell.

## Shape

- Tiles and cards: `radius-md` (14px). Dark panels and media: `radius-lg` (24px).
- Buttons, pills, badges, search: `radius-pill`.
- `radius-sm` (8px) for small bits like keyboard hints.
- `shadow-pop` for menus and the search popover only.

## Motion

- Hover fades over 150ms. Primary pills dim slightly on hover.
- The sticky top bar blurs what's behind it (`nav-blur`).
- No word-by-word reveals, parallax or scroll effects in the app. The marketing site may use one reveal on its hero line. Respect `prefers-reduced-motion`.

## Governance on every page

Every policy and process page opens with `GovernanceHeader`: section, title, summary, then tiles for owner, status, last reviewed, next review and version. Pages past their next review date show `overdue` in the header and in the nav.

## Iconography

- No icon set yet. Use line icons at 16px with a 1.5px stroke in `currentColor`, like the search glyph. The eyebrow dot is the only filled mark.
- Icons support a word; they never replace it.

## Logo

There's no logo yet. Set "Handrail" in Schibsted Grotesk 700 at -0.05em in `ink` until one exists.
