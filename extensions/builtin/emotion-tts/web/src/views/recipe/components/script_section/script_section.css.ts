import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const headerRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const quickToggle = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const counters = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.md,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  marginLeft: "auto",
});

export const counterValue = style({
  color: vars.color.accent,
  fontFamily: vars.font.mono,
});
