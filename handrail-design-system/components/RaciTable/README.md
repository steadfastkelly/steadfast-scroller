# RaciTable

Shows who is Responsible, Accountable, Consulted and Informed for each task in a process.

**The consumer provides** `roles` (column order), `rows` (each a `task` and a `cells` map from role to `R`, `A`, `C` or `I`) and an optional `caption`.

- One `A` per row. The `A` is filled with `ink` so the owner jumps out. If a row has two, the process has a problem, not the table.
- Letters sit in `meta` boxes and carry a tooltip with the full word.
- Empty cells show a middle dot so a blank never looks like a loading error.
- The table scrolls sideways inside its own box on phones. The page never does.
