# HandbookPage

The standard page layout: white tiles on the `paper` ground, `tile-gap` (4px) apart, and how it folds down.

**The consumer provides** the nav sections, one `GovernanceHeader`, and the page body as sections, each an `Eyebrow` plus an `h2`.

- Under 810px: one column, a blurred sticky top bar (`nav-blur`) with the wordmark and a Menu pill, `space-5` gutters.
- 810 to 1199px: sections go two-column (eyebrow left, content right), `space-7` gutters.
- 1200px and up: the nav tile docks at `nav-width` and sticks; `space-9` gutters.
- 1440px and up: the On this page tile appears at `toc-width`. The shell caps at `page-max` (1520px).
- Running text never goes wider than `measure`. Tiles never get a shadow; the gap separates them.
