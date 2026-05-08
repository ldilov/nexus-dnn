import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { terminal } from "../../styles/tokens/terminal.css";
import { vars } from "../../styles/theme.css";

const breathe = keyframes({
  "0%": { opacity: terminal.pulseFloor.traceOpacity },
  "50%": {
    opacity: `calc(${terminal.pulseFloor.traceOpacity} * 1.4)`,
  },
  "100%": { opacity: terminal.pulseFloor.traceOpacity },
});

export const traceContainer = style({
  position: "relative",
  flex: "1 1 auto",
  height: "100%",
  display: "block",
  overflow: "hidden",
});

export const traceSvg = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
});

export const tracePathBase = style({
  fill: "none",
  strokeWidth: 1,
  vectorEffect: "non-scaling-stroke",
  willChange: "stroke, opacity",
});

export const tracePathByMode = styleVariants({
  quiet: {
    stroke: vars.color.primaryDim,
    opacity: terminal.pulseFloor.traceOpacity,
    animationName: breathe,
    animationDuration: terminal.motion.ambientSlow,
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
  },
  elevated: {
    stroke: vars.color.primary,
    opacity: `calc(${terminal.pulseFloor.traceOpacity} * 1.4)`,
  },
  anomaly: {
    stroke: terminal.state.anomaly,
    opacity: `calc(${terminal.pulseFloor.traceOpacity} * ${terminal.pulseFloor.anomalyBoost})`,
  },
  unavailable: {
    stroke: vars.color.outlineVariant,
    opacity: 0.3,
  },
});

export const traceLeadingGlow = style({
  fill: terminal.state.anomaly,
  opacity: terminal.pulseFloor.leadingGlowOpacity,
  filter: `drop-shadow(0 0 ${terminal.pulseFloor.leadingGlowBlur} ${terminal.state.anomaly})`,
});

export const traceUnavailableTooltip = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "auto",
  cursor: "help",
});

export const reducedMotionTrace = style({
  selectors: {
    "&": { animation: "none" },
  },
});
