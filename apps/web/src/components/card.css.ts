import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const cardRecipe = recipe({
  base: {
    backgroundColor: vars.color.bg.elevated,
    borderRadius: vars.radius.card,
    border: `1px solid ${vars.color.border.subtle}`,
    padding: vars.space.insetLg,
    transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  },
  variants: {
    variant: {
      default: {},
      interactive: {
        cursor: "pointer",
        ":hover": {
          borderColor: vars.color.border.strong,
          transform: "translateY(-1px)",
        },
      },
      outlined: {
        backgroundColor: "transparent",
      },
    },
    selected: {
      true: {
        borderColor: vars.color.accent.primary,
        boxShadow: `0 0 0 1px ${vars.color.accent.primary}4d`,
      },
    },
  },
  defaultVariants: {
    variant: "default",
    selected: false,
  },
});
