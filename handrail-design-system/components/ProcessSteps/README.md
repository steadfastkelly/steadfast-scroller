# ProcessSteps

A numbered process with an owner on every step and branches written as plain sentences.

**The consumer provides** `steps`: each has a `title` (starts with a verb), an `owner` (a role, not a person, so the page survives turnover), an optional `body`, an optional `decision` (`if`, `goTo`, `target` id) and `current` for the step a reader is on.

- The numbers are real order. Only use this component when order matters. For a list of rules, use a normal list.
- Step numbers are `meta` in a `line-strong` box, two digits (`01`). The current step fills with `rail`.
- Write decisions as "If it overlaps a client launch, go to step 4". Never draw a flowchart for fewer than eight steps.
- Keep a process under ten steps. More than that is two processes.
