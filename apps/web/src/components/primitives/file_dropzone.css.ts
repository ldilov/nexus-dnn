import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const dropzoneRecipe = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space.gapSm,
    width: "100%",
    minHeight: 132,
    padding: vars.space.insetLg,
    borderRadius: vars.radius.card,
    background: vars.color.bg.lowest,
    boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
    color: vars.color.text.secondary,
    cursor: "pointer",
    textAlign: "center",
    transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    ":hover": {
      background: vars.color.bg.hover,
    },
    ":focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 1px ${vars.color.accent.primary}, 0 0 0 ${vars.focus.ringWidth} ${vars.color.accent.primaryDim}`,
    },
  },
  variants: {
    isDragging: {
      true: {
        background: vars.color.bg.hover,
        boxShadow: `inset 0 0 0 2px ${vars.color.accent.primary}`,
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
        pointerEvents: "none",
      },
    },
    hasError: {
      true: {
        boxShadow: `inset 0 0 0 1px ${vars.color.error.base}`,
      },
    },
  },
  defaultVariants: {
    isDragging: false,
    isDisabled: false,
    hasError: false,
  },
});

export const hiddenInput = style({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const primaryLine = style({
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
});

export const hintLine = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const errorLine = style({
  marginTop: vars.space.gapXs,
  fontSize: vars.font.size.caption,
  color: vars.color.error.text,
});

export const previewSlot = style({
  width: "100%",
  marginTop: vars.space.gapSm,
});
