import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  padding: vars.space.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const heading = style({
  fontSize: vars.font.size.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.sm,
  padding: vars.space.xl,
  textAlign: "center",
});

export const fieldLabel = style({
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const fieldValue = style({
  fontSize: vars.font.size.sm,
  color: vars.color.text.primary,
  fontFamily: vars.font.family.mono,
});

export const fieldGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xxs,
});
