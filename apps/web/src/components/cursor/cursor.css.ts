import { keyframes, style } from "@vanilla-extract/css";
import { terminal } from "../../styles/tokens/terminal.css";

const cursorBreath = keyframes({
  "0%": { opacity: terminal.cursor.opacityMin },
  "50%": { opacity: terminal.cursor.opacityMax },
  "100%": { opacity: terminal.cursor.opacityMin },
});

const cursorBreathReduced = keyframes({
  "0%": { opacity: terminal.cursor.opacityMax },
  "50%": { opacity: "0.85" },
  "100%": { opacity: terminal.cursor.opacityMax },
});

export const cursor = style({
  display: "inline-block",
  width: terminal.cursor.blockWidth,
  height: terminal.cursor.blockHeight,
  background: terminal.cursor.glowColor,
  boxShadow: `inset 0 0 0 ${terminal.cursor.glowRadius} ${terminal.cursor.glowColor}`,
  opacity: terminal.cursor.opacityMax,
  verticalAlign: "baseline",
  pointerEvents: "none",
  willChange: "opacity",
  animationName: cursorBreath,
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
});

export const cursorActivityRest = style({
  animationDuration: terminal.cursor.pulseRest,
});

export const cursorActivityInference = style({
  animationDuration: terminal.cursor.pulseInference,
});

export const cursorActivityLoad = style({
  animationDuration: terminal.cursor.pulseLoad,
});

export const cursorReducedMotion = style({
  animationName: cursorBreathReduced,
  animationDuration: `calc(${terminal.cursor.pulseRest} * 1.5)`,
  selectors: {
    "&[data-activity-level='inference']": {
      animationDuration: `calc(${terminal.cursor.pulseInference} * 1.5)`,
    },
    "&[data-activity-level='load']": {
      animationDuration: `calc(${terminal.cursor.pulseLoad} * 1.5)`,
    },
  },
});
