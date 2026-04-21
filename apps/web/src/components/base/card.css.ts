import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../theme/contract.css";

export const cardRecipe = recipe({
  base: {
    backgroundColor: vars.color.bg.elevated,
    borderRadius: vars.radius.card,
    padding: vars.space.insetLg,
    transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  },
  variants: {
    variant: {
      default: {},
      interactive: {
        cursor: "pointer",
        ":hover": {
          backgroundColor: vars.color.bg.hover,
          transform: "translateY(-1px)",
        },
      },
      outlined: {
        backgroundColor: "transparent",
      },
    },
    selected: {
      true: {
        boxShadow: `0 0 12px 0 ${vars.color.accent.primaryDim}44`,
      },
    },
  },
  defaultVariants: {
    variant: "default",
    selected: false,
  },
});
