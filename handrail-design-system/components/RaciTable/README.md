# RaciTable

Shows who is Responsible, Accountable, Consulted and Informed for each task.

**The consumer provides** `roles` (column order), `rows` (a `task` and a `cells` map of role to `R`, `A`, `C` or `I`) and an optional `caption`.

- One `A` per row, shown as a filled `ink` circle so the owner stands out. Two A's means the process is broken, not the table.
- Letters are Fragment Mono in circles with a tooltip for the full word.
- Empty cells show a middle dot in `ink-dim`.
- The table sits in its own tile and scrolls sideways inside it on phones.
