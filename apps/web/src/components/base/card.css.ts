import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../theme/contract.css";

export const cardRecipe = recipe({
  base: {
    backgroundColor: vars.card.bg,
    borderRadius: vars.radius.card,
    padding: vars.density.padCard,
    boxShadow: vars.card.shadow,
    backdropFilter: vars.card.backdrop,
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
        boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
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
