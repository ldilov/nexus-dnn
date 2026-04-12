import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const leftZone = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  flex: "0 0 auto",
});

export const brand = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.accent.primary,
  letterSpacing: "-0.02em",
  lineHeight: 1,
  cursor: "default",
  userSelect: "none",
});

export const viewTabs = style({
  display: "flex",
  gap: vars.space.gapXs,
});

export const viewTab = style({
  border: "none",
  background: "transparent",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  cursor: "pointer",
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    color: vars.color.text.primary,
    background: vars.color.bg.hover,
  },
});

export const viewTabActive = style({
  color: vars.color.accent.primary,
  background: vars.color.bg.elevated,
  boxShadow: `inset 0 -2px 0 0 ${vars.color.accent.primary}`,
});

export const centerZone = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  flex: 1,
  justifyContent: "center",
});

export const metricChip = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.control,
  outline: `1px solid ${vars.color.outline.variant}26`,
  height: vars.control.heightSm,
});

export const metricLabel = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: vars.color.text.muted,
});

export const metricValue = recipe({
  base: {
    fontFamily: vars.font.code,
    fontSize: vars.font.size.bodySm,
    fontWeight: vars.font.weight.bold,
  },
  variants: {
    level: {
      normal: { color: vars.color.text.primary },
      good: { color: vars.color.success.base },
      warning: { color: vars.color.warning.base },
      danger: { color: vars.color.error.base },
    },
  },
  defaultVariants: {
    level: "normal",
  },
});

export const rightZone = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  flex: "0 0 auto",
});

export const iconButton = style({
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "none",
  color: vars.color.text.muted,
  borderRadius: vars.radius.control,
  cursor: "pointer",
  fontSize: vars.icon.lg,
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.secondary,
  },
});

export const runButton = style({
  height: vars.control.heightMd,
  padding: `0 ${vars.space.insetXl}`,
  background: vars.color.accent.primary,
  color: vars.color.text.inverse,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  borderRadius: vars.radius.control,
  border: "none",
  cursor: "pointer",
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.accent.primaryHover,
  },
});

export const runButtonActive = style({
  background: vars.color.accent.primaryDim,
});

export const validateButton = style({
  height: vars.control.heightMd,
  padding: `0 ${vars.space.insetLg}`,
  background: "transparent",
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  borderRadius: vars.radius.control,
  border: "none",
  cursor: "pointer",
  outline: `1px solid ${vars.color.outline.variant}66`,
  textTransform: "uppercase",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
  },
});
