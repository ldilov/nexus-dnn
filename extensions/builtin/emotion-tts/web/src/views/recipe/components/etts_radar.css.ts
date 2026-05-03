import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.lg,
});

export const svgWrap = style({
  position: "relative",
  width: "100%",
  // audit-allow: px — sub-token spacing value, no density token at this step
  maxWidth: "360px",
  aspectRatio: "1 / 1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const svgRoot = style({
  width: "100%",
  height: "100%",
  overflow: "visible",
  touchAction: "none",
});

export const ring = style({
  fill: "none",
  stroke: vars.color.borderSubtle,
  strokeWidth: 1,
});

export const axisLine = style({
  stroke: vars.color.borderGhost,
  strokeWidth: 1,
});

export const polygon = style({
  fill: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
  stroke: vars.color.accent,
  strokeWidth: 1.5,
  transition: `fill ${vars.motion.fast}`,
});

export const handle = style({
  fill: vars.color.tertiary,
  cursor: "grab",
  transition: `transform ${vars.motion.fast}, fill ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      transform: "scale(1.25)",
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

export const handleActive = style({
  fill: vars.color.accent,
  transform: "scale(1.3)",
});

export const axisLabel = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.caption,
  fill: vars.color.textMuted,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  pointerEvents: "none",
  userSelect: "none",
});

export const axisLabelActive = style({
  fill: vars.color.accent,
});

export const dominantBlock = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.xs,
});

export const dominantValue = style({
  fontFamily: vars.font.display,
  fontSize: "clamp(1.5rem, 0.9rem + 1.5vw, 2.25rem)",
  letterSpacing: vars.tracking.display,
  color: vars.color.text,
  fontWeight: 600,
  textTransform: "capitalize",
});

export const dominantSub = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const axisChips = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  justifyContent: "center",
});

export const axisChip = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.pill,
  background: vars.color.surface,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
  cursor: "pointer",
  border: "none",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  ":hover": {
    background: vars.color.surfaceRaised,
    color: vars.color.text,
  },
});

export const axisChipActive = style({
  background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
  color: vars.color.accent,
});

export const axisChipValue = style({
  fontFamily: vars.font.mono,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.tertiary,
});

export const mini = style({
  display: "inline-block",
});

export const miniSvg = style({
  display: "block",
});

export const miniRing = style({
  fill: "none",
  stroke: vars.color.borderGhost,
  strokeWidth: 0.5,
});

export const miniPolygon = style({
  fill: `color-mix(in oklab, ${vars.color.accent} 36%, transparent)`,
  stroke: vars.color.accent,
  strokeWidth: 1,
});
