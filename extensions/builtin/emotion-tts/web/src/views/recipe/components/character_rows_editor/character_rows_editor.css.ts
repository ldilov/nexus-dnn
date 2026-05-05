import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const header = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const headerEyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
});

export const counter = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const counterValue = style({
  color: vars.color.accent,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const row = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "auto 160px 160px 120px 1fr auto",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.sm} ${vars.space.md}`,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
  borderLeft: `2px solid ${vars.color.borderGhost}`,
  transition: `border-color ${vars.motion.fast}, background ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceRaised,
    },
    "&:focus-within": {
      borderLeftColor: vars.color.accent,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
    },
  },
  "@media": {
    "(max-width: 960px)": {
      gridTemplateColumns: "auto 1fr 1fr auto",
      gridTemplateAreas: `
        "ord char preset rm"
        "alpha alpha alpha alpha"
        "text text text text"
      `,
    },
  },
});

export const ordinal = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  width: "1.5rem",
  textAlign: "right",
  userSelect: "none",
  "@media": {
    "(max-width: 960px)": { gridArea: "ord" },
  },
});

const inputBase = style({
  appearance: "none",
  width: "100%",
  height: "2rem",
  padding: `0 ${vars.space.sm}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.text,
  background: vars.color.surface,
  border: "none",
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  outline: "none",
  transition: `box-shadow ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    "&::placeholder": { color: vars.color.textFaint },
    "&:hover:not(:focus)": {
      boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
    },
  },
});

export const characterInput = style([inputBase, {
  "@media": {
    "(max-width: 960px)": { gridArea: "char" },
  },
}]);

export const presetSelect = style([inputBase, {
  paddingRight: vars.space.lg,
  cursor: "pointer",
  "@media": {
    "(max-width: 960px)": { gridArea: "preset" },
  },
}]);

export const alphaWrap = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  "@media": {
    "(max-width: 960px)": { gridArea: "alpha" },
  },
});

export const alphaSlider = style({
  width: "100%",
  paddingTop: vars.space.xs,
  paddingBottom: vars.space.xs,
  accentColor: vars.color.accent,
  cursor: "pointer",
  background: "transparent",
});

export const alphaValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  minWidth: "2.25rem",
  textAlign: "right",
});

export const textInput = style([inputBase, {
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  height: "2rem",
  "@media": {
    "(max-width: 960px)": { gridArea: "text" },
  },
}]);

export const removeButton = style({
  appearance: "none",
  width: "2rem",
  height: "2rem",
  padding: 0,
  background: "transparent",
  color: vars.color.textFaint,
  border: "none",
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  lineHeight: 1,
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      color: vars.color.danger,
      background: `color-mix(in oklab, ${vars.color.danger} 12%, transparent)`,
    },
    "&:focus-visible": {
      color: vars.color.danger,
    },
  },
  "@media": {
    "(max-width: 960px)": { gridArea: "rm" },
    "(forced-colors: active)": {
      border: "1px solid CanvasText",
    },
  },
});

export const addRowButton = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.xs,
  alignSelf: "flex-start",
  padding: `${vars.space.xs} ${vars.space.md}`,
  background: "transparent",
  color: vars.color.text,
  border: "none",
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  fontWeight: 600,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, box-shadow ${vars.motion.fast}, transform ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceMuted,
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}`,
    },
    "&:active": { transform: "translateY(1px)" },
  },
});

export const addGlyph = style({
  fontFamily: vars.font.mono,
  color: vars.color.accent,
});

export const emptyHint = style({
  margin: 0,
  padding: `${vars.space.lg} ${vars.space.md}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  textAlign: "center",
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
});

export const unmappedBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `0 ${vars.space.sm}`,
  height: "1.5rem",
  marginLeft: vars.space.xs,
  background: `color-mix(in oklab, ${vars.color.warning} 32%, ${vars.color.surfaceMuted})`,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  borderRadius: vars.radius.sm,
  boxShadow: `inset 0 0 0 1px ${vars.color.warning}`,
});
