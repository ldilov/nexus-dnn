import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const labelRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
});

export const numericLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.text,
});

export const controls = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const toggleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

