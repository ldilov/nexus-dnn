import { style } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

export const root = style({
  padding: `${vars.space.xl} ${vars.space.lg}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: vars.space.xs,
  color: vars.color.textMuted,
});

export const glyph = style({
  fontFamily: vars.font.mono,
  fontSize: "clamp(4rem, 6vw + 2rem, 5.5rem)",
  lineHeight: 1,
  fontWeight: 600,
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "-0.02em",
  margin: 0,
  marginBottom: vars.space.sm,
});

export const title = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.subhead,
  fontWeight: 500,
  color: vars.color.text,
  margin: 0,
});

export const hint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  marginTop: vars.space.xs,
});
