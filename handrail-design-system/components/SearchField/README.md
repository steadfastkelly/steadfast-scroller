# SearchField

The main way into the handbook. Most people search before they browse.

**The consumer provides** native input props (`value`, `onChange`, `placeholder`), a `label` for screen readers and an optional `shortcut` hint like `/`.

- It is the only pill-shaped thing in the system (`radius-pill`). That makes it easy to find on any screen.
- Put it at the top of the nav rail on desktop and at the top of the page on phones.
- Highlight matches in results with `mark` (the `rail-soft` highlighter), never bold.
- The shortcut hint hides below 768px.
