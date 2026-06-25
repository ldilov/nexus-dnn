import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const sectionLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textFaint,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: vars.space.lg,
});

export const textureRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.lg,
  padding: `${vars.space.lg} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceFloor,
});

export const textureCopy = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const textureTitle = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const textureHint = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const toggle = style({
  position: "relative",
  width: "44px",
  height: "24px",
  flexShrink: 0,
  borderRadius: vars.radius.pill,
  background: vars.color.surfaceHigh,
  border: "none",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}`,
  selectors: {
    "&[aria-checked='true']": { background: vars.color.accent },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focusRing },
  },
});

export const toggleThumb = style({
  position: "absolute",
  top: "3px",
  left: "3px",
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  background: vars.color.text,
  transition: `transform ${vars.motion.fast}`,
  selectors: {
    "[aria-checked='true'] &": { transform: "translateX(20px)" },
  },
});

export const advanced = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
});

export const advancedBody = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const advancedHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  width: "100%",
  padding: 0,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: vars.color.text,
});

export const advancedTitle = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const advancedChevron = style({
  fontFamily: "'Material Symbols Outlined'",
  fontSize: "20px",
  lineHeight: 1,
  color: vars.color.textMuted,
  transition: `transform ${vars.motion.fast}`,
  selectors: {
    "&[data-open='true']": { transform: "rotate(180deg)" },
  },
});
