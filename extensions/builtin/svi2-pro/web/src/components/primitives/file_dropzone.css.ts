import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const dropzone = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.sm,
  width: "100%",
  minHeight: "132px",
  padding: vars.space.lg,
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceMuted,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  color: vars.color.textMuted,
  cursor: "pointer",
  textAlign: "center",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": { background: vars.color.surfaceHigh },
    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, ${vars.shadow.focusRing}`,
    },
  },
});

export const dragging = style({
  background: vars.color.surfaceHigh,
  boxShadow: `inset 0 0 0 2px ${vars.color.accent}`,
});

export const disabled = style({
  opacity: 0.5,
  cursor: "not-allowed",
  pointerEvents: "none",
});

export const errored = style({
  boxShadow: `inset 0 0 0 1px ${vars.color.danger}`,
});

export const hiddenInput = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const primaryLine = style({
  fontSize: vars.text.body,
  fontWeight: 500,
  color: vars.color.text,
});

export const hintLine = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const errorLine = style({
  marginTop: vars.space.xs,
  fontSize: vars.text.caption,
  color: vars.color.danger,
});

export const previewSlot = style({
  width: "100%",
  marginTop: vars.space.sm,
});
