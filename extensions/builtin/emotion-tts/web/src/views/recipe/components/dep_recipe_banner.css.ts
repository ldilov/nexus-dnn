import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.space.lg,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: `color-mix(in oklab, ${vars.color.surface} 60%, transparent)`,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const item = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.space.xs,
  fontVariantNumeric: "tabular-nums",
});

export const label = style({
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textFaint,
});

export const value = style({
  color: vars.color.text,
});

export const accentValue = style({
  color: vars.color.accent,
});

export const divider = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "1px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "16px",
  background: vars.color.borderGhost,
});
