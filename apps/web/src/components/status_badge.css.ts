import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const statusBadgeRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.xxs,
    padding: `${vars.space.xxs} ${vars.space.sm}`,
    borderRadius: vars.radius.full,
    fontSize: vars.font.size.xs,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.tight,
  },
  variants: {
    status: {
      active: {
        backgroundColor: vars.color.success.base,
        color: vars.color.text.inverse,
      },
      disabled: {
        backgroundColor: vars.color.surface.overlay,
        color: vars.color.text.muted,
      },
      invalid: {
        backgroundColor: vars.color.error.base,
        color: vars.color.error.text,
      },
      running: {
        backgroundColor: vars.color.accent.primary,
        color: vars.color.text.inverse,
      },
      completed: {
        backgroundColor: vars.color.success.base,
        color: vars.color.text.inverse,
      },
      failed: {
        backgroundColor: vars.color.error.base,
        color: vars.color.error.text,
      },
      pending: {
        backgroundColor: vars.color.surface.overlay,
        color: vars.color.text.secondary,
      },
    },
  },
  defaultVariants: {
    status: "pending",
  },
});
