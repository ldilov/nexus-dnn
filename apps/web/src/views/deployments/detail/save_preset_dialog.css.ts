import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d5,
  paddingInline: vars.space.insetLg,
  paddingBlockEnd: vars.space.insetMd,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
});

export const fieldLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
});

export const textarea = style({
  width: "100%",
  // audit-allow: px — comfortable textarea min height, no density token at this step
  minHeight: "76px",
  resize: "vertical",
  paddingBlock: vars.density.d3,
  paddingInline: vars.space.insetLg,
  backgroundColor: vars.color.bg.lowest,
  color: vars.color.text.primary,
  border: "none",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  borderRadius: `${vars.radius.control} ${vars.radius.control} 0 0`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.normal,
  outline: "none",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  "::placeholder": {
    color: vars.color.text.muted,
  },
  ":focus": {
    borderBottomColor: vars.color.accent.primary,
    // audit-allow: px — below minimum token granularity (sub-10px)
    boxShadow: `0 0 0 2px ${vars.color.accent.primary}33`,
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});
