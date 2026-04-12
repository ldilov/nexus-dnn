import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.gapXs,
  width: "100%",
  height: "100%",
});

export const topGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.gapXs,
  flex: 1,
});

export const bottomGroup = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.gapXs,
  paddingBottom: vars.space.insetMd,
});

export const divider = style({
  width: "24px",
  height: "1px",
  backgroundColor: vars.color.outline.variant,
  margin: `${vars.space.gapSm} 0`,
});

export const railItemRecipe = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: vars.radius.control,
    border: "none",
    backgroundColor: "transparent",
    color: vars.color.text.muted,
    cursor: "pointer",
    position: "relative",
    transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    fontFamily: vars.font.ui,
    fontSize: vars.icon.lg,
    ":hover": {
      backgroundColor: vars.color.bg.hover,
      color: vars.color.text.secondary,
    },
  },
  variants: {
    active: {
      true: {
        color: vars.color.accent.primary,
        backgroundColor: vars.color.bg.hover,
        "::before": {
          content: '""',
          position: "absolute",
          left: "-8px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "3px",
          height: "20px",
          backgroundColor: vars.color.accent.primary,
          borderRadius: "0 2px 2px 0",
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
