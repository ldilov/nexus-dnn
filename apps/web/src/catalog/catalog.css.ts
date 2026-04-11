import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const searchWrapper = style({
  marginBottom: vars.space.md,
});

export const groupLabel = style({
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: vars.space.xs,
  marginTop: vars.space.md,
});

export const itemCard = style({
  backgroundColor: vars.color.surface.raised,
  borderRadius: vars.radius.md,
  padding: vars.space.md,
  marginBottom: vars.space.sm,
  border: `1px solid ${vars.color.border.subtle}`,
  transition: "border-color 150ms",
  ":hover": {
    borderColor: vars.color.border.strong,
  },
});

export const itemName = style({
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
});

export const itemMeta = style({
  fontSize: vars.font.size.xs,
  color: vars.color.text.muted,
  fontFamily: vars.font.family.mono,
  marginTop: vars.space.xxs,
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.sm,
  textAlign: "center",
  padding: vars.space.xl,
});

export const errorState = style({
  color: vars.color.error.text,
  fontSize: vars.font.size.sm,
  padding: vars.space.md,
});

export const badgeRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  marginTop: vars.space.xs,
});
