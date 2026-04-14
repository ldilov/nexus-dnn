import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

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
    transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    variant: {
      primary: {
        background: `linear-gradient(120deg, ${vars.color.accent.primary} 0%, #F472B6 55%, #22D3EE 120%)`,
        backgroundSize: "200% 100%",
        backgroundPosition: "0% 50%",
        color: "#14061f",
        fontWeight: vars.font.weight.semibold,
        boxShadow: "0 4px 14px rgba(186, 158, 255, 0.28), inset 0 1px 0 rgba(255,255,255,0.25)",
        transition: `background-position ${vars.motion.durationSlow} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
        ":hover": {
          backgroundPosition: "100% 50%",
          boxShadow: "0 8px 22px rgba(244, 114, 182, 0.38), 0 0 20px rgba(34, 211, 238, 0.22)",
          transform: "translateY(-1px)",
        },
      },
      secondary: {
        backgroundColor: vars.color.bg.elevated,
        color: vars.color.text.primary,
        ":hover": {
          backgroundColor: vars.color.bg.hover,
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
        color: vars.color.text.inverse,
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
