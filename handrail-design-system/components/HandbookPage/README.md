# HandbookPage

The standard page layout: nav rail, reading sheet and on-page contents, and how it folds down on smaller screens.

**The consumer provides** the nav sections, one `GovernanceHeader`, and the page body as `h2` sections.

- Below 768px: one column, a top bar with the wordmark and search, `space-4` gutters, 44px touch targets.
- 768px to 1079px: same single column, `space-6` gutters, type steps up to desktop sizes.
- 1080px and up: the nav rail docks at `nav-width` on `paper`; the reading sheet sits on `surface` with `space-12` gutters.
- 1280px and up: the "On this page" list appears at `toc-width` on the right.
- Running text never goes wider than `measure` (68ch), however big the screen.
