import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const pill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--d-2)",
  height: vars.control.heightMd,
  padding: "0 var(--d-3)",
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: 500,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid var(--accent)`,
    outlineOffset: vars.focus.offset,
  },
});

export const pillActive = style({
  background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)`,
  color: vars.color.onColor.primary,
  fontWeight: 600,
  ":hover": {
    background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-dim) 100%)`,
    color: vars.color.onColor.primary,
  },
});

export const pillCount = style({
  fontFamily: vars.font.code,
  fontVariantNumeric: "tabular-nums",
  fontSize: vars.font.size.caption,
  marginLeft: "var(--d-2)",
  opacity: 0.85,
});
