import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../theme/contract.css";

export const badgeRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.gapXs,
    borderRadius: vars.radius.full,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.tight,
    fontFamily: vars.font.ui,
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      sm: {
        height: "20px",
        padding: `0 ${vars.space.insetSm}`,
        fontSize: vars.font.size.caption,
      },
      md: {
        height: "24px",
        padding: `0 ${vars.space.insetMd}`,
        fontSize: vars.font.size.bodySm,
      },
    },
    intent: {
      neutral: {
        backgroundColor: vars.color.bg.hover,
        color: vars.color.text.secondary,
      },
      info: {
        backgroundColor: `${vars.color.accent.primary}1a`,
        color: vars.color.accent.primary,
      },
      success: {
        backgroundColor: `${vars.color.success.base}1a`,
        color: vars.color.success.base,
      },
      warning: {
        backgroundColor: `${vars.color.warning.base}1a`,
        color: vars.color.warning.base,
      },
      error: {
        backgroundColor: `${vars.color.error.base}1a`,
        color: vars.color.error.base,
      },
    },
    modality: {
      image: {
        backgroundColor: `${vars.color.mod.image}1a`,
        color: vars.color.mod.image,
      },
      video: {
        backgroundColor: `${vars.color.mod.video}1a`,
        color: vars.color.mod.video,
      },
      audio: {
        backgroundColor: `${vars.color.mod.audio}1a`,
        color: vars.color.mod.audio,
      },
      text: {
        backgroundColor: `${vars.color.mod.text}1a`,
        color: vars.color.mod.text,
      },
      model: {
        backgroundColor: `${vars.color.mod.model}1a`,
        color: vars.color.mod.model,
      },
      system: {
        backgroundColor: `${vars.color.mod.system}1a`,
        color: vars.color.mod.system,
      },
    },
    mono: {
      true: {
        fontFamily: vars.font.code,
        fontWeight: vars.font.weight.regular,
        letterSpacing: "0.02em",
      },
    },
  },
  defaultVariants: {
    size: "sm",
    intent: "neutral",
    mono: false,
  },
});

export const dot = recipe({
  base: {
    width: "6px",
    height: "6px",
    borderRadius: vars.radius.full,
    flexShrink: 0,
  },
  variants: {
    color: {
      neutral: { backgroundColor: vars.color.text.muted },
      info: { backgroundColor: vars.color.accent.primary },
      success: { backgroundColor: vars.color.success.base },
      warning: { backgroundColor: vars.color.warning.base },
      error: { backgroundColor: vars.color.error.base },
    },
  },
  defaultVariants: {
    color: "neutral",
  },
});
