# Eyebrow

A small dot and label that names a section before its heading, with an optional count.

**The consumer provides** `children` (two to four words, sentence case) and optional `count`, a real number shown as `(04)`.

- Sits above a section, `space-12` from what it introduces. In a two-column layout it sits alone in the left column.
- The count uses `counter` (Fragment Mono). Only show it when it's a true count, like pages in a group.
- Never use an eyebrow as decoration. If the heading already says it, drop the eyebrow.
