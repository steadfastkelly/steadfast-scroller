# Button

Starts an action on a policy or process. Every button is a pill.

**The consumer provides** `children` (a verb first: "Submit for approval", never "OK"), `variant`, `size` and native button props (`onClick`, `disabled`, `type`).

- `primary` is an `ink` pill with `on-ink` text. One per screen, for the step that moves work forward.
- `secondary` (the default) is a `line-strong` outline pill.
- `quiet` drops the border. Use it in toolbars and beside a primary.
- `inverse` is the white pill for dark `panel` blocks.
- `danger` retires or deletes. Keep it away from the primary.
- Height is `control-height` (44px) at every width, so it works for touch without a phone variant.
