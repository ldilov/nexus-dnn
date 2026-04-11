import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const panelRecipe = recipe({
  base: {
    borderRadius: vars.radius.lg,
    padding: vars.space.lg,
  },
  variants: {
    variant: {
      raised: {
        backgroundColor: vars.color.surface.raised,
        boxShadow: vars.shadow.sm,
      },
      flat: {
        backgroundColor: vars.color.surface.base,
      },
      outline: {
        backgroundColor: "transparent",
        border: `1px solid ${vars.color.border.default}`,
      },
    },
  },
  defaultVariants: {
    variant: "raised",
  },
});
