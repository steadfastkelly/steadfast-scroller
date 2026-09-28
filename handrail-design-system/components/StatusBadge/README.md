# StatusBadge

Shows where a policy or process sits in its review cycle.

**The consumer provides** `status`: `draft`, `review`, `approved`, `overdue` or `retired`. `children` overrides the label but keep the five words fixed across the product.

- The word carries the meaning. The color only helps you scan. Never show the dot alone.
- `approved` is blue (`approved`), not green, so it never gets confused with `overdue` red by someone with red-green color blindness.
- `overdue` means the page is past its next review date. It is the only status that should pull attention.
- In `DocNav`, approved pages show no badge. Only the exceptions get one.
