import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../theme/contract.css";

export const buttonRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space.xs,
    border: "none",
    borderRadius: vars.radius.md,
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.medium,
    fontFamily: vars.font.family.body,
    lineHeight: vars.font.lineHeight.tight,
    cursor: "pointer",
    transition: "background 150ms, color 150ms",
    whiteSpace: "nowrap",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.accent.primary,
        color: vars.color.text.inverse,
        ":hover": { backgroundColor: vars.color.accent.hover },
      },
      secondary: {
        backgroundColor: vars.color.surface.raised,
        color: vars.color.text.primary,
        border: `1px solid ${vars.color.border.default}`,
        ":hover": { backgroundColor: vars.color.surface.overlay },
      },
      ghost: {
        backgroundColor: "transparent",
        color: vars.color.text.secondary,
        ":hover": {
          backgroundColor: vars.color.surface.raised,
          color: vars.color.text.primary,
        },
      },
    },
    size: {
      sm: { padding: `${vars.space.xs} ${vars.space.sm}`, fontSize: vars.font.size.xs },
      md: { padding: `${vars.space.sm} ${vars.space.md}` },
      lg: { padding: `${vars.space.md} ${vars.space.lg}`, fontSize: vars.font.size.md },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
