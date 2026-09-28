Handrail is an operations handbook. People open it to find a rule, follow a process or check who owns something, usually in a hurry. Every choice here serves that: calm pages, one accent, big clear headings, and the facts that make a page trustworthy (owner, status, review date) always in view.

The look is minimal on purpose. Lots of white space, hairline rules instead of boxes, square corners, no shadows in the page flow and one yellow that works like a highlighter pen.

## Voice

Write the way a good manager explains a rule across a desk.

- Say who does what. "Your manager approves it," not "Approval is obtained."
- Lead with the answer. The first line under a heading should settle the question most people came with.
- Use contractions and everyday words: "ask," "use," "before," "don't." Never "utilize," "prior to" or "leverage."
- Titles name the thing people search for: "Paid time off," "Client offboarding." Not "PTO Policy Framework v2."
- Steps start with a verb and name a role, not a person: "Manager reviews coverage."
- Sentence case everywhere, including buttons and headings. The only uppercase is the `label` style.
- No emoji, no exclamation marks, no em dashes.
- Dates are `12 Sep 2026`. Versions are `v4.2`. Both set in `meta`.

## Color

- The page ground is `paper`. The reading sheet (the white page a policy sits on) is `surface`. Table heads, code and notes use `sunken`.
- Text is `ink`. Metadata and captions are `ink-muted`. Both read on `paper`, `surface`, `sunken` and `rail-soft` in both themes.
- `rail` is the only accent. Use it for the primary button, the current step and the cover. Text on it is always `on-rail`. Never set text in `rail` on a light ground.
- `rail-soft` is the highlighter: the active nav item, search matches (`mark`) and Required callouts.
- `rail-deep` is the accent as a mark: link underlines and the Required callout rule.
- Links are `link` (the same as `ink`) with a 2px `rail-deep` underline, 3px below the text. They look like text someone marked up.
- Status colors mean status only: `approved` (blue, on purpose, so it never pairs with red as a red-green choice), `review` (violet), `overdue` (red). Each has a `-soft` ground. A status always shows its word too.
- `steel` is for solid dark blocks on the marketing site and the cover. Keep it out of the app UI.
- Borders on controls use `line-strong` (3:1 on every ground). `line` is for decorative hairlines only.
- Focus is a solid 2px `focus` ring, offset 2px: `ink` in light, `rail` in dark.

## Type

- Headings and interface: Schibsted Grotesk. Set page titles in `h1`, sections in `h2`, sub-sections and step titles in `h3`. Tight negative tracking on the big sizes is part of the look.
- Reading: Source Serif 4 in `body` (18/30) for policy text and `body-sm` (16/26) for summaries, steps and callouts. The serif makes long pages easier to read and tells people "this is the handbook," not the settings screen.
- Data: IBM Plex Mono in `meta` for dates, versions, step numbers and IDs, with tabular figures.
- `label` is the one uppercase style: eyebrows, nav group titles, table heads, callout tags.
- `display` (72px) belongs to the marketing site hero only. One per page.
- Running text never goes wider than `measure` (68ch).
- Below 768px: `h1` drops to 32/36 and `body` to 17/28.

## Layout and responsiveness

Mobile first. The layout changes at four points (`bp-sm` 480, `bp-md` 768, `bp-lg` 1080, `bp-xl` 1280):

| Width | Layout | Gutter |
| --- | --- | --- |
| under 768px | One column. Top bar with wordmark and search. Nav in a menu sheet. 44px touch targets. | `space-4` |
| 768 to 1079px | One column, desktop type sizes. | `space-6` |
| 1080 to 1279px | Nav rail docks left at `nav-width` on `paper`. Reading sheet on `surface`. | `space-12` |
| 1280px and up | "On this page" list appears on the right at `toc-width`. Shell caps at `page-max`. | `space-12` |

- Space comes from the `space-*` scale only. Sections are `space-12` apart; a heading sits `space-8` above its block, content blocks `space-6` apart.
- Separate things with space first, a `line` hairline second, a fill third. Never a box around every block.
- Wide tables scroll inside their own container. The page body never scrolls sideways.
- See the `HandbookPage` card for the full shell at every width.

## Shape and depth

- Corners are square (`radius-0`) for sheets, tables and callouts, `radius-sm` (2px) for buttons, inputs, badges and step numbers.
- `radius-pill` belongs to the search field and keyboard hints only, so search is easy to find on any screen.
- `shadow-pop` is for menus and the search popover. Nothing in the page flow gets a shadow.
- Callouts use a full-width top rule. Never a colored bar down the left side.

## Motion

- Hover and state changes fade over 120ms. That's all.
- No scroll animation, parallax or reveal effects in the app. People come here to look something up; motion slows them down.
- The marketing site may use one entrance for the hero headline. Respect `prefers-reduced-motion` everywhere.

## Governance on every page

A page without an owner and a review date isn't done. Every policy and process page opens with `GovernanceHeader`: section, title, summary, owner, status, last reviewed, next review and version. Pages past their next review date show `overdue` in the header and in the nav, and nowhere else is red used.

## Iconography

- No icon set ships with the system yet. Use line icons at 16px with a 1.5px stroke in `currentColor`, like the search glyph in `SearchField`.
- Icons support a word; they never replace it. No emoji anywhere in the product.

## Logo

There is no logo yet. Set the name "Handrail" in Schibsted Grotesk 700 at -0.02em tracking in `ink` until one exists.
