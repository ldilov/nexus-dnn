import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

export const root = style({
  display: "inline-flex",
  alignItems: "stretch",
  gap: vars.space.lg,
  padding: 0,
  background: "transparent",
  borderRadius: 0,
  borderBottom: `1px solid ${vars.color.borderGhost}`,
});

export const glyph = style({
  display: "inline-block",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  color: vars.color.textFaint,
  transform: "translateY(0)",
  transition: `color ${vars.motion.fast}, transform ${vars.motion.normal}`,
});

const segmentBase = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  minHeight: "2.25rem",
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: vars.space.xs,
  paddingBottom: vars.space.sm,
  borderRadius: 0,
  border: "none",
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: "0.04em",
  cursor: "pointer",
  transition: [
    `color ${vars.motion.fast}`,
    `transform ${vars.motion.fast}`,
  ].join(", "),
  selectors: {
    "&[aria-disabled='true']": {
      cursor: "not-allowed",
      opacity: 0.45,
    },
  },
});

export const segment = styleVariants({
  idle: [segmentBase],
  active: [
    segmentBase,
    {
      color: vars.color.text,
      selectors: {
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: -1,
          height: "2px",
          background: vars.color.accent,
          boxShadow: vars.shadow.glow,
          borderRadius: vars.radius.pill,
        },
      },
      "@media": {
        "(forced-colors: active)": {
          color: "Highlight",
          forcedColorAdjust: "none",
        },
      },
    },
  ],
});

globalStyle(`${segment.idle}:hover:not([aria-disabled='true'])`, {
  color: vars.color.text,
});

globalStyle(`${segment.idle}:hover:not([aria-disabled='true']) ${glyph}`, {
  color: vars.color.accent,
});

globalStyle(`${segment.active} ${glyph}`, {
  color: vars.color.accent,
  transform: "translateY(-1px)",
});
