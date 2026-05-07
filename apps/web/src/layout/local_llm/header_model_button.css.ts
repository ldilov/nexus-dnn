import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const button = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  padding: `${vars.density.d2} ${vars.density.d3}`,
  background: vars.color.bg.elevated,
  color: vars.color.text.primary,
  border: "none",
  borderRadius: vars.radius.control,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: 500,
  cursor: "pointer",
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  transition:
    `background ${vars.motion.durationFast} ease, box-shadow ${vars.motion.durationFast} ease, color ${vars.motion.durationFast} ease`,
  ":hover": {
    background: `color-mix(in oklch, ${vars.color.accent.primary} 10%, transparent)`,
    boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${vars.color.accent.primary} 32%, transparent)`,
  },
  ":focus-visible": {
    outline: "none",
    boxShadow: `inset 0 0 0 1.5px color-mix(in oklch, ${vars.color.accent.primary} 55%, transparent)`,
  },
});

export const placeholder = style({
  color: vars.color.text.secondary,
  fontStyle: "italic",
});

export const chevron = style({
  fontFamily: vars.font.code,
  color: vars.color.text.secondary,
  fontSize: vars.font.size.caption,
  marginLeft: "2px",
});
