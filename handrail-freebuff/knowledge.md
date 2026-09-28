# Handrail design system

Handrail is an operations handbook web app. People open it to find a rule, follow a process or check who owns something, usually in a hurry. Every screen must be calm, fast to scan and obviously trustworthy.

The look: quiet greyscale, white rounded tiles on a light grey ground with 4px gaps between them, big tightly tracked headlines, pill-shaped controls, and one yellow used only as a highlighter.

Follow this file for every UI change. When a rule here conflicts with a habit or a UI library default, this file wins.

## Files in this folder

| File | Use it for |
| --- | --- |
| `tokens.css` | Every color, space, radius, font and breakpoint as CSS variables, light and dark. The single source of truth. |
| `handrail.css` | `tokens.css` plus the component classes (`hr-*`) and fonts. Import this once at the app root. |
| `components/handrail.js` | React 18 components: Button, Eyebrow, StatusBadge, GovernanceHeader, ProcessSteps, Callout, RaciTable, SearchField, DocNav. |
| `components/handrail.d.ts` | Props for each component. Read before using one. |
| `reference/handbook-page.html` | The standard page, fully built. Match its structure and responsive behavior. |
| `reference/components.html` | Static markup for buttons, badges, callouts and the RACI table. |
| `tokens.json` | Same tokens as data, with a usage note on each. |
| `tailwind.preset.js` | Only if the app uses Tailwind. |

## Hard rules

1. Use tokens for every value. Never write a raw hex color, px spacing value or font name in a component. Use `var(--ink)`, `var(--space-6)`, `var(--radius-md)` and so on.
2. Use the existing components before writing new ones. Extend them with props, not copies.
3. No new colors. The only hues are `rail` (yellow) and the three status colors. No gradients, no colored buttons, no purple.
4. No shadows on anything in the page flow. Tiles are separated by the 4px `tile-gap`, not borders or shadows. `shadow-pop` is only for menus and the search popover.
5. No emoji anywhere in the UI or copy. No em dashes in copy.
6. No card with a colored bar down its left side.
7. No scroll animations, parallax or word-by-word reveals in the app. Hover fades of 150ms are the only motion. Respect `prefers-reduced-motion`.
8. Text contrast must pass WCAG AA in both themes. Don't lighten greys to look "softer."
9. Don't add a UI kit (shadcn, MUI, Chakra, Bootstrap) unless asked. If one is already in the project, restyle it with these tokens.

## Color

- Page ground: `paper`. Content lives in `surface` tiles. `sunken` is for table heads, code and hover.
- Text: `ink`. Small secondary text: `ink-muted`. `ink-dim` only for the grey half of a two-tone headline, 22px and up.
- Two-tone lines: the part that answers the question in `ink`, the rest in `ink-dim`. Example: "**How much time off you get,** how to ask for it, and who says yes."
- Dark blocks (`panel`) are for Required callouts, the marketing services section and the footer. Text on them: `on-panel`, `on-panel-muted`.
- Primary button is an `ink` pill with `on-ink` text. Never yellow.
- `rail` fills exactly one thing: the current step's counter. `rail-soft` highlights the active nav item and search matches (`<mark>`). `rail-deep` underlines links.
- Status colors mean status only, and always appear with their word: `approved` (blue), `review` (violet), `overdue` (red), plus neutral `draft` and `retired`.
- Focus: 2px solid `focus` outline, 2px offset, on every interactive element.

## Type

- Fonts: Schibsted Grotesk for all text, Fragment Mono for numbers (both from Google Fonts, loaded by `handrail.css`). Don't swap in Inter, Roboto or system UI fonts.
- Use the `t-*` classes in `tokens.css`: `t-display`, `t-h1`, `t-h2`, `t-h3`, `t-lead`, `t-body`, `t-body-sm`, `t-ui`, `t-small`, `t-counter`, `t-meta`.
- Headlines are tight: display -0.05em, h1 and h2 -0.04em, h3 and lead -0.03em, UI text -0.02em. Keep it. The tracking is most of the look.
- Weights: 500 and 600 only (700 for the wordmark).
- Body copy: 17px, line height 1.6, max width `var(--measure)` (68ch).
- Page titles and display lines end with a period: "Paid time off." Section headings don't.
- Counts and order in Fragment Mono inside parentheses: `(04)` pages in a group, `(01)` a step. Only for real numbers.
- Dates as `12 Sep 2026`, versions as `v4.2`, both in `t-meta`.

## Layout

The page is tiles on the ground, `tile-gap` (4px) apart. Generous padding inside tiles, tight gaps between them.

| Width | Layout | Side gutter |
| --- | --- | --- |
| under 810px | One column. Sticky top bar with 7px backdrop blur, wordmark and a Menu pill. | `space-5` (20px) |
| 810 to 1199px | Page sections go two-column: eyebrow on the left (180px), content on the right. | `space-7` (30px) |
| 1200 to 1439px | Nav tile docks left at `nav-width` (280px) and sticks. Top bar hides. | `space-9` (36px) |
| 1440px and up | "On this page" tile appears on the right at `toc-width` (240px). Shell max width `page-max` (1520px). | `space-9` |

- Build mobile first. Nothing may scroll sideways; wide tables scroll inside their own tile.
- Radius: tiles and cards `radius-md` (14px); dark panels `radius-lg` (24px); buttons, pills, badges and search `radius-pill`.
- Section pattern: an `Eyebrow` (dot and label), then an `h2`, then content.
- Lists of things (steps, FAQs, services) are rows split by 1px `line` hairlines with a mono counter on the left.
- Metadata is a row of small tiles, never a sentence.

## Every policy or process page

Open with `GovernanceHeader`: section, title, two-tone summary, then tiles for owner, status, last reviewed, next review and version. A page with no owner or review date isn't finished; show the header anyway so the gap is visible. Pages past their next review date show `overdue` in the header and in the nav.

## Components

- `Button`: `primary` (ink pill, one per screen), `secondary` (outline, default), `quiet`, `danger`, `inverse` (white pill on a dark panel). Labels start with a verb.
- `Eyebrow`: dot plus a short label, optional `count`.
- `StatusBadge`: `draft`, `review`, `approved`, `overdue`, `retired`.
- `GovernanceHeader`: see above.
- `ProcessSteps`: steps with `title`, `owner` (a role), `body`, optional `decision` branch, `current`.
- `Callout`: `required` (dark panel, max two per page), `recommended`, `note`.
- `RaciTable`: one `A` per row.
- `SearchField`: the pill search, optional `shortcut` hint.
- `DocNav`: grouped nav; only pages needing attention get a badge.

## Copy

- Write like a good manager explaining a rule across a desk. Say who does what. Lead with the answer.
- Contractions and everyday words: "ask," "use," "before," "don't."
- Sentence case everywhere. No exclamation marks.
- Name things by what people search for: "Client offboarding," not "Offboarding Procedure Framework."
- Steps start with a verb and name a role: "Manager reviews coverage."
- Errors say what went wrong and how to fix it.

## Before you finish any UI task

- [ ] Only tokens, no raw values.
- [ ] Looks right at 390px, 810px, 1200px and 1440px, with no sideways scroll.
- [ ] Works in light and dark (`data-theme="dark"` on `<html>`).
- [ ] Visible focus ring on every interactive element.
- [ ] No new colors, shadows, emoji or left-border cards.
