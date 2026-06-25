import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

const VIEWER_MIN_HEIGHT = "440px";

export const root = style({
  position: "relative",
  width: "100%",
  minHeight: VIEWER_MIN_HEIGHT,
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  background: `radial-gradient(120% 120% at 30% 0%, ${vars.color.surfaceHigh}, ${vars.color.canvas} 70%)`,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}, ${vars.shadow.raised}`,
});

export const viewer = style({
  display: "block",
  width: "100%",
  height: "100%",
  minHeight: VIEWER_MIN_HEIGHT,
  borderRadius: vars.radius.lg,
  background: "transparent",
  outline: "none",
  selectors: {
    "&:focus-visible": { boxShadow: vars.shadow.focusRing },
  },
});

const pulse = keyframes({
  "0%, 100%": { opacity: 0.55 },
  "50%": { opacity: 1 },
});

export const overlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.textFaint,
  animation: `${pulse} 2.4s ease-in-out infinite`,
  "@media": { "(prefers-reduced-motion: reduce)": { animation: "none" } },
});

export const controls = style({
  position: "absolute",
  left: vars.space.md,
  right: vars.space.md,
  bottom: vars.space.md,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.space.lg,
  padding: `${vars.space.sm} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceGlass,
  backdropFilter: "blur(20px) saturate(1.2)",
  WebkitBackdropFilter: "blur(20px) saturate(1.2)",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}, ${vars.shadow.subtle}`,
  zIndex: 1,
});

export const controlGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  margin: 0,
  padding: 0,
  border: "none",
  minWidth: 0,
});

export const toneGroup = style([
  controlGroup,
  {
    display: "flex",
    alignItems: "center",
    gap: vars.space.sm,
  },
]);

export const legend = style({
  float: "left",
  padding: 0,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
});

export const exposureGroup = style({
  flex: "1 1 200px",
  minWidth: "180px",
});

export const controlLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
});

export const controlValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.text,
  minWidth: "3ch",
  textAlign: "right",
});

export const slider = style({
  flex: 1,
  height: "4px",
  appearance: "none",
  WebkitAppearance: "none",
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.accent} 28%, ${vars.color.surfaceInset})`,
  cursor: "pointer",
  outline: "none",
  selectors: {
    "&::-webkit-slider-thumb": {
      appearance: "none",
      WebkitAppearance: "none",
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: vars.color.accent,
      boxShadow: vars.shadow.glow,
      cursor: "pointer",
      transition: `transform ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
    },
    "&::-webkit-slider-thumb:hover": { transform: "scale(1.15)" },
    "&::-moz-range-thumb": {
      width: "14px",
      height: "14px",
      border: "none",
      borderRadius: "50%",
      background: vars.color.accent,
      boxShadow: vars.shadow.glow,
      cursor: "pointer",
    },
    "&:focus-visible": { boxShadow: vars.shadow.focusRing },
  },
});

export const segment = style({
  display: "inline-flex",
  padding: "2px",
  borderRadius: vars.radius.sm,
  background: vars.color.surfaceInset,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

const segmentButtonBase = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.textMuted,
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": { color: vars.color.text },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "1px",
    },
  },
});

export const segmentButton = style([segmentButtonBase]);

export const segmentButtonActive = style([
  segmentButtonBase,
  {
    background: `color-mix(in oklab, ${vars.color.accent} 20%, transparent)`,
    color: vars.color.text,
    boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 40%, transparent)`,
  },
]);
