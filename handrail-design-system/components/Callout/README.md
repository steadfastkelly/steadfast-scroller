# Callout

Pulls one rule out of the running text and says how firm it is.

**The consumer provides** `kind` (`required`, `recommended` or `note`), an optional one-line `title` ending with a period, and `children` (one or two short paragraphs).

- `required` is a dark `panel` with `radius-lg` and a white tag pill. It's the loudest thing on a page, so use two at most.
- `recommended` is a white tile with an outline tag.
- `note` sits on `sunken`. Context only; it changes nothing.
- Callouts stack with `tile-gap`. No side bars, no icons.
