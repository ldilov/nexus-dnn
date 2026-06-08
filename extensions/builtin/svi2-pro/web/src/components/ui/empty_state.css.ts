import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.sm,
  minHeight: "180px",
  padding: vars.space.xl,
  textAlign: "center",
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceMuted,
  color: vars.color.textMuted,
});

export const title = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.text,
});

export const detail = style({
  fontSize: vars.text.caption,
  maxWidth: "42ch",
});
