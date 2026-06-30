import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

const VP_MIN = "360px";
const VP_MIN_SM = "300px";

export const wrap = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: vars.space.lg,
  "@media": {
    "screen and (max-width: 760px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const pane = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  minWidth: 0,
  padding: vars.space.md,
  borderRadius: vars.radius.lg,
  background: `radial-gradient(120% 120% at 30% 18%, ${vars.color.surfaceHigh}, ${vars.color.canvas} 70%)`,
  boxShadow: vars.shadow.subtle,
});

export const paneLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const viewer = style({
  minHeight: VP_MIN,
  borderRadius: vars.radius.md,
  "@media": {
    "screen and (max-width: 760px)": { minHeight: VP_MIN_SM },
  },
});

export const empty = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: VP_MIN,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceFloor,
  color: vars.color.textMuted,
  fontSize: vars.text.caption,
  textAlign: "center",
  padding: vars.space.lg,
  "@media": {
    "screen and (max-width: 760px)": { minHeight: VP_MIN_SM },
  },
});

export const download = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  height: "42px",
  padding: `0 ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  color: vars.color.accentOn,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: vars.weight.semibold,
  textDecoration: "none",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": { background: vars.color.accentDim, boxShadow: vars.shadow.glow },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
  },
});

export const downloadIcon = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "18px",
  lineHeight: 1,
});
