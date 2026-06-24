import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const rail = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: `${vars.space.insetSm} 0`,
});

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const groupLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const groupChips = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: vars.space.gapSm,
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  borderRadius: vars.radius.full,
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  cursor: "pointer",
  transition: [
    `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    `color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ].join(", "),
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
    borderColor: vars.color.outline.base,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
});

export const chipSelected = style({
  background: vars.color.accent.secondaryContainer,
  color: vars.color.text.primary,
  borderColor: vars.color.accent.secondary,
  selectors: {
    "&:hover": {
      background: vars.color.accent.secondaryContainer,
    },
  },
});
