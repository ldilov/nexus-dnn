import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const button = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  paddingBlock: vars.density.d2,
  paddingInline: vars.density.d3,
  // audit-allow: px — fixed maximum width for the model selector chip
  maxWidth: "260px",
  background: vars.color.bg.elevated,
  color: vars.color.text.primary,
  border: "none",
  borderRadius: vars.radius.control,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  cursor: "pointer",
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  transition:
    `background ${vars.motion.durationFast} ease, box-shadow ${vars.motion.durationFast} ease, color ${vars.motion.durationFast} ease`,
  ":hover": {
    background: `color-mix(in oklch, ${vars.color.accent.secondary} 12%, transparent)`,
    boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${vars.color.accent.secondary} 32%, transparent)`,
  },
  ":focus-visible": {
    outline: "none",
    boxShadow: `inset 0 0 0 1.5px color-mix(in oklch, ${vars.color.accent.secondary} 55%, transparent)`,
  },
});

export const labelText = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
});

export const placeholder = style({
  color: vars.color.text.secondary,
  fontStyle: "italic",
});

export const chevron = style({
  fontFamily: vars.font.code,
  color: vars.color.text.secondary,
  fontSize: vars.font.size.caption,
  // audit-allow: px — sub-density chevron offset, no token at this granularity
  marginLeft: "2px",
  flex: "0 0 auto",
});
