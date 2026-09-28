# ProcessSteps

A numbered process laid out like a services list: counter on the left, hairline between rows, an owner pill on every step.

**The consumer provides** `steps`, each with a `title` (starts with a verb), an `owner` (a role, not a person), optional `body`, optional `decision` (`if`, `goTo`, `target`) and `current`.

- The counters `(01)` are real order. Use this only when order matters.
- The current step's counter sits on a `rail` pill. That is the only place `rail` fills anything.
- Write branches as a sentence: "If it overlaps a client launch, go to step 4."
- Keep a process under ten steps. More than that is two processes.
- On phones the counter moves above the title.
