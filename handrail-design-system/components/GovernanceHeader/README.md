# GovernanceHeader

The top of every policy and process page: what it is, who owns it, and whether you can trust it today.

**The consumer provides** `title`, and ideally all of `section`, `summary`, `owner`, `status`, `reviewed`, `nextReview` and `version`. Dates come pre-formatted as `12 Sep 2026` (day, short month, year) so they read the same in every country.

- This is Handrail's main job. If a page has no owner or review date, it isn't finished. Show the header anyway so the gap is visible.
- The title uses `h1`, the summary `body` in `ink-muted`, the metadata row `label` over `ui` or `meta`.
- Dates and versions are set in `meta` (mono) so they line up when people compare pages.
- On phones the metadata stacks to two columns. Don't hide any of it.
