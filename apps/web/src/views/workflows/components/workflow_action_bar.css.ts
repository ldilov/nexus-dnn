import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../../theme/contract.css";

export const root = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d4,
  padding: `${vars.density.d3} ${vars.density.d6}`,
  backgroundColor: vars.color.bg.canvas,
});

export const tabs = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flex: "1 1 auto",
});

export const tab = recipe({
  base: {
    height: vars.control.heightSm,
    paddingInline: vars.density.d4,
    border: "none",
    background: "transparent",
    fontFamily: vars.font.ui,
    fontSize: vars.font.size.bodySm,
    fontWeight: vars.font.weight.medium,
    color: vars.color.text.muted,
    cursor: "pointer",
    borderRadius: vars.radius.control,
    transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    ":hover": {
      color: vars.color.text.primary,
      background: vars.color.bg.hover,
    },
  },
  variants: {
    active: {
      true: {
        color: vars.color.text.primary,
        background: vars.color.bg.elevated,
      },
    },
  },
  defaultVariants: { active: false },
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  flex: "0 0 auto",
});

export const metrics = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  marginInlineEnd: vars.density.d4,
});

export const metricChip = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.density.d2,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
});

export const metricLabel = style({
  fontWeight: vars.font.weight.regular,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const metricValue = recipe({
  base: {
    fontWeight: vars.font.weight.semibold,
  },
  variants: {
    level: {
      normal: { color: vars.color.text.primary },
      good: { color: vars.color.success.base },
      warning: { color: vars.color.warning.base },
      danger: { color: vars.color.error.base },
    },
  },
  defaultVariants: { level: "normal" },
});
