import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const wrap = style({
  display: "flex",
  alignItems: "flex-end",
  gap: vars.density.d3,
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d4,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.panel,
});

export const textarea = style({
  flex: "1 1 auto",
  minHeight: "32px",
  maxHeight: "8rem",
  resize: "none",
  background: "transparent",
  color: vars.color.text.primary,
  border: "none",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.normal,
  outline: "none",
  "::placeholder": { color: vars.color.text.muted },
});

export const sendBtn = style({
  height: vars.control.heightMd,
  width: vars.control.heightMd,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.full,
  background: vars.color.accent.tertiary,
  color: vars.color.onColor.tertiary,
  border: "none",
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, opacity ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": { background: vars.color.accent.tertiaryDim },
  ":disabled": {
    opacity: 0.4,
    cursor: "not-allowed",
  },
});

export const cancelBtn = style({
  height: vars.control.heightMd,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.full,
  background: "transparent",
  color: vars.color.text.secondary,
  border: `1px solid ${vars.color.outline.variant}`,
  cursor: "pointer",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const hint = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  paddingBlock: vars.density.d2,
  paddingInline: vars.density.d4,
});

export const disabledNotice = style({
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d4,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.panel,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});
