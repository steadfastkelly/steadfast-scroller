# StatusBadge

Shows where a policy or process sits in its review cycle.

**The consumer provides** `status`: `draft`, `review`, `approved`, `overdue` or `retired`. Keep the five labels fixed across the product.

- The word carries the meaning. The color only helps people scan. Never show the dot alone.
- `approved` is blue, not green, so it never pairs with `overdue` red for someone with red-green color blindness.
- `overdue` is the only status that should pull the eye. Status colors are the only hues in the product besides `rail`.
- In `DocNav`, approved pages show no badge. Only exceptions get one.
