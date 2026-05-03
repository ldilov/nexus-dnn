import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const headerRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const targetSelector = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexWrap: "wrap",
});

export const select = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  border: "none",
  outline: "none",
  cursor: "pointer",
  selectors: {
    "&:focus": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}`,
    },
  },
});

export const actionRow = style({
  display: "inline-flex",
  gap: vars.space.sm,
  alignItems: "center",
});

export const link = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.accent,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  textDecoration: "none",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  transition: `background ${vars.motion.fast}`,
  ":hover": {
    background: `color-mix(in oklab, ${vars.color.accent} 10%, transparent)`,
  },
});

export const dangerLink = style({
  color: vars.color.danger,
  ":hover": {
    background: `color-mix(in oklab, ${vars.color.danger} 10%, transparent)`,
  },
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
  gridTemplateColumns: "auto auto 1fr auto auto",
  alignItems: "baseline",
  gap: vars.space.lg,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surface,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  "@media": {
    "(max-width: 768px)": {
      gridTemplateColumns: "1fr auto",
      gap: vars.space.sm,
    },
  },
});

export const timestamp = style({
  color: vars.color.text,
  fontVariantNumeric: "tabular-nums",
});

export const opCount = style({
  color: vars.color.tertiary,
  fontVariantNumeric: "tabular-nums",
});

export const digest = style({
  color: vars.color.secondary,
  fontVariantNumeric: "tabular-nums",
});

export const actor = style({
  color: vars.color.textFaint,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
});

export const actionPill = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.pill,
});

export const empty = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.textMuted,
  margin: 0,
  padding: vars.space.lg,
  textAlign: "center",
});

export const emptyHint = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
  marginTop: vars.space.xs,
});

export const errorBanner = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.danger,
  padding: vars.space.sm,
  borderRadius: vars.radius.sm,
  background: `color-mix(in oklab, ${vars.color.danger} 10%, transparent)`,
});

export const loading = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  padding: vars.space.md,
});
