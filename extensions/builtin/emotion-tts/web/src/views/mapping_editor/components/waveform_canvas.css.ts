import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const wrapper = style({
  position: "relative",
  width: "100%",
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
  cursor: "crosshair",
});

export const handle = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: 12,
  marginLeft: -6,
  cursor: "ew-resize",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  outline: "none",
  borderRadius: vars.radius.sm,
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
    },
  },
});

export const handleLine = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: "50%",
  width: 2,
  marginLeft: -1,
  background: vars.color.accent,
  boxShadow: vars.shadow.glow,
  pointerEvents: "none",
});

export const handleGrip = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 10,
  height: 28,
  borderRadius: vars.radius.sm,
  background: vars.color.accent,
  boxShadow: vars.shadow.raised,
  pointerEvents: "none",
});

export const playhead = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: 2,
  marginLeft: -1,
  background: vars.color.tertiary,
  pointerEvents: "none",
});

export const dimRegion = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  background: vars.color.surface,
  opacity: 0.7,
  pointerEvents: "none",
});

export const loading = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});
