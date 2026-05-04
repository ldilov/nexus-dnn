import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/tokens.css";

export const list = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.lg,
  padding: 0,
  margin: 0,
  listStyle: "none",
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const codeAccent = style({
  color: vars.color.accent,
});

export const codeSecondary = style({
  color: vars.color.secondary,
});

export const codeTertiary = style({
  color: vars.color.tertiary,
});

export const codeSuccess = style({
  color: vars.color.success,
});
