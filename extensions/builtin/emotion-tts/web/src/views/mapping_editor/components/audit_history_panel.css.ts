import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  padding: vars.space.md,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
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
  display: "grid",
  gridTemplateColumns: "minmax(120px, 1fr) auto auto auto",
  alignItems: "baseline",
  gap: vars.space.md,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  background: vars.color.surfaceRaised,
});

export const timestamp = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.text,
});

export const opCount = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const digest = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.accent,
});

export const actor = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
});

export const empty = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textFaint,
  fontStyle: "italic",
});

export const errorBanner = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.danger,
});

export const loading = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});
