// Optional. Only if the app uses Tailwind. Maps Tailwind names to Handrail's CSS variables,
// so tokens.css stays the single source of truth. Add to tailwind.config.js: presets: [require("./handrail-design-system/tailwind.preset.js")]
const v = (n) => `var(--${n})`;
module.exports = {
  theme: {
    screens: { md: "810px", lg: "1200px", xl: "1440px" },
    colors: {
      transparent: "transparent", current: "currentColor",
      paper: v("paper"), surface: v("surface"), sunken: v("sunken"),
      line: v("line"), "line-strong": v("line-strong"),
      ink: v("ink"), "ink-muted": v("ink-muted"), "ink-dim": v("ink-dim"),
      panel: v("panel"), "on-panel": v("on-panel"), "on-panel-muted": v("on-panel-muted"), "on-ink": v("on-ink"),
      rail: v("rail"), "rail-soft": v("rail-soft"), "on-rail": v("on-rail"), "rail-deep": v("rail-deep"), focus: v("focus"),
      approved: v("approved"), "approved-soft": v("approved-soft"),
      review: v("review"), "review-soft": v("review-soft"),
      overdue: v("overdue"), "overdue-soft": v("overdue-soft"),
    },
    fontFamily: { sans: v("font-sans"), mono: v("font-mono") },
    borderRadius: { none: "0", sm: v("radius-sm"), md: v("radius-md"), lg: v("radius-lg"), full: v("radius-pill") },
    extend: {
      spacing: { tile: v("tile-gap") },
      maxWidth: { measure: v("measure"), page: v("page-max") },
      boxShadow: { pop: v("shadow-pop") },
    },
  },
};
