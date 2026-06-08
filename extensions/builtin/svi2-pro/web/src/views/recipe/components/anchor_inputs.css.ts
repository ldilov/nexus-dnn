import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: vars.space.lg,
});

export const slot = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const slotLabel = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontSize: vars.text.caption,
  fontWeight: 600,
  color: vars.color.text,
});

export const thumb = style({
  width: "100%",
  maxHeight: "160px",
  objectFit: "contain",
  borderRadius: vars.radius.md,
  background: vars.color.surface,
});

export const fileName = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  wordBreak: "break-all",
});
