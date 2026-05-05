import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  padding: vars.space.xs,
  gap: vars.space.xs,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

const segmentBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  minHeight: "2rem",
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: "0.04em",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}, transform ${vars.motion.fast}`,
  selectors: {
    "&:hover:not([aria-checked='true']):not([aria-disabled='true'])": {
      color: vars.color.text,
      background: vars.color.surfaceHigh,
    },
    "&[aria-disabled='true']": {
      cursor: "not-allowed",
      opacity: 0.45,
    },
  },
  "@media": {
    "(forced-colors: active)": {
      borderRadius: 0,
    },
  },
});

export const segment = styleVariants({
  idle: [segmentBase],
  active: [
    segmentBase,
    {
      color: vars.color.accentOn,
      background: vars.color.accent,
      boxShadow: `0 1px 0 ${vars.color.accentDim}`,
      "@media": {
        "(forced-colors: active)": {
          background: "Highlight",
          color: "HighlightText",
          forcedColorAdjust: "none",
        },
      },
    },
  ],
});

export const glyph = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  opacity: 0.85,
});
