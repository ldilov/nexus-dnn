import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

const surfacePingAnim = keyframes({
  "0%": { transform: "scale(0.4)", opacity: 0.85 },
  "100%": { transform: "scale(2.6)", opacity: 0 },
});

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
  fill: `color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
  stroke: vars.color.accent,
  // Visual stroke; non-scaling so near-degenerate polygons stay readable.
  strokeWidth: 2,
  vectorEffect: "non-scaling-stroke",
  strokeLinejoin: "round",
  pointerEvents: "none",
  transition: `fill ${vars.motion.fast}`,
});

export const petal = style({
  stroke: vars.color.accent,
  strokeWidth: 1.5,
  vectorEffect: "non-scaling-stroke",
  strokeLinecap: "round",
  opacity: 0.55,
  pointerEvents: "none",
  transition: `opacity ${vars.motion.fast}`,
});

export const petalActive = style({
  opacity: 1,
  filter: `drop-shadow(0 0 6px ${vars.color.accentGlow})`,
});

// Generously sized invisible hit target sits behind the visible dot so
// the user doesn't have to be pixel-perfect to grab a handle.
export const handleHit = style({
  fill: "transparent",
  cursor: "grab",
  selectors: {
    "&:active": { cursor: "grabbing" },
  },
});

export const handle = style({
  fill: vars.color.tertiary,
  // Pointer events flow to the hit-circle below; the visible dot is purely cosmetic.
  pointerEvents: "none",
  transition: `transform ${vars.motion.fast}, fill ${vars.motion.fast}, filter ${vars.motion.fast}`,
});

export const handleActive = style({
  fill: vars.color.accent,
  transform: "scale(1.35)",
  transformOrigin: "center",
  transformBox: "fill-box",
  filter: `drop-shadow(0 0 6px ${vars.color.accentGlow})`,
});

export const surfacePing = style({
  fill: "none",
  stroke: vars.color.accent,
  strokeWidth: 2,
  vectorEffect: "non-scaling-stroke",
  pointerEvents: "none",
  transformOrigin: "center",
  transformBox: "fill-box",
  animationName: surfacePingAnim,
  animationDuration: "320ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  animationFillMode: "forwards",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0,
    },
  },
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
