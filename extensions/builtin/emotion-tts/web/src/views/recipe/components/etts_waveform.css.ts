import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  width: "100%",
});

export const canvasFrame = style({
  position: "relative",
  width: "100%",
  height: "120px", // audit-allow: px — waveform canvas vertical anchor
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
  overflow: "hidden",
  userSelect: "none",
  touchAction: "none",
});

export const canvas = style({
  display: "block",
  width: "100%",
  height: "100%",
  cursor: "pointer",
});

export const playhead = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "2px", // audit-allow: px — sub-token playhead stroke
  marginLeft: "-1px", // audit-allow: px — sub-token playhead centering
  background: vars.color.accent,
  boxShadow: vars.shadow.glow,
  pointerEvents: "none",
});

export const loopRegion = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  background: `color-mix(in oklab, ${vars.color.tertiary} 18%, transparent)`,
  pointerEvents: "none",
});

export const loopHandle = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "10px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  marginLeft: "-5px",
  cursor: "ew-resize",
  background: vars.color.tertiary,
  opacity: 0.6,
  borderRadius: vars.radius.sm,
  transition: `opacity ${vars.motion.fast}, transform ${vars.motion.fast}`,
  selectors: {
    "&:hover, &:focus-visible": {
      opacity: 1,
      transform: "scaleX(1.2)",
      outline: "none",
    },
  },
});

export const loadingOverlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const fallbackNote = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  paddingTop: vars.space.xs,
});

export const transportRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const transportButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px", // audit-allow: px — touch-target minimum per WCAG
  height: "44px", // audit-allow: px — touch-target minimum per WCAG
  background: vars.color.surfaceHigh,
  color: vars.color.text,
  border: "none",
  borderRadius: vars.radius.pill,
  cursor: "pointer",
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  transition: `background ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceHighest,
    },
    "&:focus-visible": {
      boxShadow: vars.shadow.focusRing,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const timeReadout = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: vars.tracking.label,
});

export const metaChips = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  marginLeft: "auto",
});

export const metaChip = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  background: vars.color.surfaceMuted,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.pill,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
});
