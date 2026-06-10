import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const bar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.lg,
  padding: "16px 20px",
  background: vars.color.surface,
  borderRadius: "13px",
  boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--outline-variant, #46484a) 32%, transparent)",
  flexWrap: "wrap",
});

export const eyebrow = style({
  fontFamily: vars.font.mono,
  fontSize: "10px",
  letterSpacing: "0.2em",
  color: vars.color.accent,
  textTransform: "uppercase",
});

export const stats = style({
  display: "flex",
  alignItems: "center",
  gap: "13px",
  fontFamily: vars.font.mono,
  fontSize: "12.5px",
  color: vars.color.text,
  fontVariantNumeric: "tabular-nums",
  flexWrap: "wrap",
});

export const statStrong = style({
  fontWeight: 700,
});

export const statDim = style({
  color: vars.color.textMuted,
});

export const dot = style({
  width: "3px",
  height: "3px",
  borderRadius: "50%",
  background: "var(--outline-variant, #46484a)",
});

export const chip = style({
  marginLeft: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  fontSize: "11.5px",
  fontWeight: vars.weight.medium,
  color: vars.color.textMuted,
  background: vars.color.surfaceHighest,
  padding: "5px 12px",
  borderRadius: vars.radius.pill,
  whiteSpace: "nowrap",
});

export const chipDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: vars.color.accent,
  boxShadow: `0 0 8px ${vars.color.accentGlow}`,
});

export const chipDotWarn = style({
  background: vars.color.warning,
  boxShadow: `0 0 8px color-mix(in oklab, ${vars.color.warning} 45%, transparent)`,
});
