import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../theme/contract.css";

export const inputRecipe = recipe({
  base: {
    width: "100%",
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
  },
  variants: {
    variant: {
      default: {},
      ghost: {
        border: "none",
        backgroundColor: "transparent",
        ":focus": {
          boxShadow: "none",
          backgroundColor: vars.color.bg.elevated,
        },
      },
      mono: {
        fontFamily: vars.font.code,
        fontSize: vars.font.size.bodySm,
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
    hasError: {
      true: {
        borderBottomColor: vars.color.error.base,
        ":focus": {
          borderBottomColor: vars.color.error.base,
          // audit-allow: px — below minimum token granularity (sub-10px)
          boxShadow: `0 0 0 2px ${vars.color.error.base}33`,
        },
      },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    hasError: false,
  },
});
