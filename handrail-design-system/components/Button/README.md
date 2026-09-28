# Button

Starts an action on a policy or process: submit, approve, save, retire.

**The consumer provides** `children` (the label, a verb first: "Submit for approval", never "OK"), `variant`, `size` and any native button props (`onClick`, `disabled`, `type`).

- `primary` fills with `rail` and `on-rail` text. One per screen, for the step that moves the work forward.
- `secondary` (the default) is a `line-strong` outline. Use it for everything else.
- `quiet` drops the border. Use it in toolbars and next to a primary.
- `danger` is for retiring or deleting. Put it away from the primary, never beside it.
- Height is `control-height` (40px) and grows to 44px below 768px for touch.

Don't put icons in buttons by default. If one is needed, it goes before the label at 16px.
