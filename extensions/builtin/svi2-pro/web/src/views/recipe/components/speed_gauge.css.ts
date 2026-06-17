import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  minWidth: "168px",
});

export const label = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const svg = style({
  width: "100%",
  maxWidth: "168px",
  margin: "0 auto",
  display: "block",
  overflow: "visible",
});

export const track = style({
  fill: "none",
  stroke: vars.color.surfaceHigh,
  strokeLinecap: "round",
});

export const tick = style({
  stroke: vars.color.borderGhost,
  strokeLinecap: "round",
});

export const scaleText = style({
  fontFamily: vars.font.mono,
  fill: vars.color.textFaint,
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "0.04em",
});

export const fillFast = style({
  fill: "none",
  strokeLinecap: "round",
  stroke: vars.color.accent,
  filter: `drop-shadow(0 0 6px ${vars.color.accentGlow})`,
  transition: "stroke-dasharray 400ms cubic-bezier(0.16, 1, 0.3, 1), stroke 300ms ease",
});

export const fillMid = style([
  fillFast,
  {
    stroke: vars.color.secondary,
    filter: "drop-shadow(0 0 6px rgba(96, 99, 238, 0.35))",
  },
]);

export const fillSlow = style([
  fillFast,
  {
    stroke: vars.color.warning,
    filter: "drop-shadow(0 0 6px rgba(255, 132, 57, 0.3))",
  },
]);

export const needleGroup = style({
  transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
});

export const needle = style({
  stroke: vars.color.text,
  strokeLinecap: "round",
});

export const hub = style({
  fill: vars.color.text,
});

export const valueText = style({
  fontFamily: vars.font.mono,
  fontWeight: 700,
  fill: vars.color.text,
  fontVariantNumeric: "tabular-nums",
  paintOrder: "stroke",
  stroke: vars.color.surfaceMuted,
  strokeWidth: "3px",
});

export const suffixText = style({
  fontFamily: vars.font.mono,
  fill: vars.color.textMuted,
  letterSpacing: "0.06em",
  paintOrder: "stroke",
  stroke: vars.color.surfaceMuted,
  strokeWidth: "2.5px",
});

export const its = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  textAlign: "center",
  fontVariantNumeric: "tabular-nums",
  letterSpacing: "0.04em",
});
