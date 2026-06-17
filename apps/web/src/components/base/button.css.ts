import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../theme/contract.css";

/* ── Button — canonical contract (host) ────────────────────────────────────
 * One primitive for every push-button affordance in the host shell.
 * ─────────────────────────────────────────────────────────────────────── */

export const buttonRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space.gapXs,
    border: "none",
    borderRadius: vars.radius.control,
    fontFamily: vars.font.ui,
    fontSize: vars.font.size.bodySm,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.tight,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, opacity ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    selectors: {
      "&:disabled, &[aria-disabled='true']": {
        opacity: 0.55,
        cursor: "not-allowed",
      },
      "&[aria-busy='true']": {
        cursor: "progress",
      },
      "&:focus-visible": {
        outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
        outlineOffset: vars.focus.offset,
      },
    },
  },
  variants: {
    variant: {
      primary: {
        background: vars.color.accent.primary,
        color: vars.color.onColor.primary,
        fontWeight: vars.font.weight.semibold,
        selectors: {
          "&:hover:not(:disabled)": {
            background: vars.color.accent.primaryHover,
            color: vars.color.text.primary,
          },
        },
      },
      secondary: {
        backgroundColor: "transparent",
        color: vars.color.text.primary,
        boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.bg.hover,
            boxShadow: `inset 0 0 0 1px ${vars.color.outline.base}`,
          },
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: vars.color.text.secondary,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.bg.hover,
            color: vars.color.text.primary,
          },
        },
      },
      danger: {
        backgroundColor: vars.color.error.base,
        color: vars.color.text.inverse,
        selectors: {
          "&:hover:not(:disabled)": { opacity: 0.9 },
        },
      },
      // Aliases — kept for back-compat with existing call sites. Prefer the
      // canonical four above for new code.
      tertiary: {
        backgroundColor: vars.color.accent.tertiary,
        color: vars.color.onColor.tertiary,
        fontWeight: vars.font.weight.semibold,
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.accent.tertiaryDim,
            color: vars.color.text.primary,
          },
        },
      },
      success: {
        backgroundColor: vars.color.success.base,
        color: vars.color.text.inverse,
        selectors: {
          "&:hover:not(:disabled)": { opacity: 0.9 },
        },
      },
      accent: {
        backgroundColor: vars.color.accent.tertiary,
        color: vars.color.onColor.tertiary,
        selectors: {
          "&:hover:not(:disabled)": { opacity: 0.9 },
        },
      },
    },
    size: {
      // audit-allow: px — Button-specific touch-target scale, intentionally
      // distinct from form-control heights.
      xs: { height: "24px", padding: `0 ${vars.space.insetSm}`, fontSize: vars.font.size.caption },
      // audit-allow: px — Button-specific touch-target scale.
      sm: { height: "32px", padding: `0 ${vars.space.insetMd}`, fontSize: vars.font.size.caption },
      // audit-allow: px — Button-specific touch-target scale.
      md: { height: "40px", padding: `0 ${vars.space.insetLg}` },
      // audit-allow: px — Button-specific touch-target scale.
      lg: { height: "48px", padding: `0 ${vars.space.insetXl}`, fontSize: vars.font.size.bodyLg },
    },
    iconOnly: {
      true: {
        borderRadius: vars.radius.full,
        padding: 0,
      },
    },
  },
  compoundVariants: [
    // audit-allow: px — square aspect-ratio for icon-only buttons.
    { variants: { size: "xs", iconOnly: true }, style: { width: "24px" } },
    // audit-allow: px — square aspect-ratio for icon-only buttons.
    { variants: { size: "sm", iconOnly: true }, style: { width: "32px" } },
    // audit-allow: px — square aspect-ratio for icon-only buttons.
    { variants: { size: "md", iconOnly: true }, style: { width: "40px" } },
    // audit-allow: px — square aspect-ratio for icon-only buttons.
    { variants: { size: "lg", iconOnly: true }, style: { width: "48px" } },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    iconOnly: false,
  },
});
