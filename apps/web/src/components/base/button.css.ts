import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../theme/contract.css";

export const buttonRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space.gapXs,
    border: "none",
    borderRadius: vars.radius.control,
    fontSize: vars.font.size.bodySm,
    fontWeight: vars.font.weight.medium,
    fontFamily: vars.font.ui,
    lineHeight: vars.font.lineHeight.tight,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    ":focus-visible": {
      outline: "none",
      boxShadow: `0 0 0 ${vars.focus.ringWidth} ${vars.color.accent.accent}`,
    },
  },
  variants: {
    variant: {
      primary: {
        background: vars.color.accent.primary,
        color: vars.color.onColor.primary,
        fontWeight: vars.font.weight.semibold,
        ":hover": {
          background: vars.color.accent.primaryHover,
          // audit-allow: px — sub-token spacing value, no density token at this step
          boxShadow: `0 0 12px 0 color-mix(in oklab, ${vars.color.accent.primaryDim} 40%, transparent)`,
        },
      },
      secondary: {
        backgroundColor: "transparent",
        color: vars.color.text.primary,
        boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
        ":hover": {
          backgroundColor: vars.color.bg.hover,
          boxShadow: `inset 0 0 0 1px ${vars.color.outline.base}`,
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: vars.color.text.secondary,
        ":hover": {
          backgroundColor: vars.color.bg.hover,
          color: vars.color.text.primary,
        },
      },
      tertiary: {
        backgroundColor: vars.color.accent.tertiary,
        color: vars.color.onColor.tertiary,
        fontWeight: vars.font.weight.semibold,
        ":hover": {
          backgroundColor: vars.color.accent.tertiaryDim,
          // audit-allow: px — sub-token spacing value, no density token at this step
          boxShadow: `0 0 16px 0 color-mix(in oklab, ${vars.color.accent.tertiaryDim} 40%, transparent)`,
        },
      },
      danger: {
        backgroundColor: vars.color.error.base,
        color: vars.color.text.inverse,
        ":hover": { opacity: 0.9 },
      },
      success: {
        backgroundColor: vars.color.success.base,
        color: vars.color.text.inverse,
        ":hover": { opacity: 0.9 },
      },
      accent: {
        backgroundColor: vars.color.accent.tertiary,
        color: vars.color.onColor.tertiary,
        ":hover": { opacity: 0.9 },
      },
    },
    size: {
      sm: {
        height: vars.control.heightSm,
        padding: `0 ${vars.space.insetMd}`,
        fontSize: vars.font.size.caption,
      },
      md: {
        height: vars.control.heightMd,
        padding: `0 ${vars.space.insetLg}`,
      },
      lg: {
        height: vars.control.heightLg,
        padding: `0 ${vars.space.insetXl}`,
        fontSize: vars.font.size.bodyLg,
      },
    },
    iconOnly: {
      true: {
        borderRadius: vars.radius.full,
        padding: 0,
      },
    },
  },
  compoundVariants: [
    { variants: { size: "sm", iconOnly: true }, style: { width: vars.control.heightSm } },
    { variants: { size: "md", iconOnly: true }, style: { width: vars.control.heightMd } },
    { variants: { size: "lg", iconOnly: true }, style: { width: vars.control.heightLg } },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    iconOnly: false,
  },
});
