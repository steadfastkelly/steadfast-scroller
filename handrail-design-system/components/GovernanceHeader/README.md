# GovernanceHeader

The top of every policy and process page: what it is, who owns it, and whether you can trust it today.

**The consumer provides** `title` (ends with a period), and ideally `section`, `summary`, `owner`, `status`, `reviewed`, `nextReview` and `version`. Dates arrive formatted as `12 Sep 2026`.

- Built as tiles: one big tile for the title, then a row of small metadata tiles with `tile-gap` between them.
- The summary is two-tone: the first clause in `ink`, the rest in `ink-dim`. Pass it as two spans.
- Dates and versions set in `meta` so they line up across pages.
- A page with no owner or review date isn't done. Show the header anyway so the gap is visible.
- On phones the metadata tiles go two across. Nothing gets hidden.
