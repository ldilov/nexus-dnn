import { keyframes, style } from "@vanilla-extract/css";
import { motion } from "./motion.css";
import { vars } from "./theme.css";

const reduceMotion = "(prefers-reduced-motion: reduce)";

export const ghostBorder = style({
  border: `1px solid ${vars.color.outlineVariant}26`,
});

export const glassPanel = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  backdropFilter: "blur(20px)",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  WebkitBackdropFilter: "blur(20px)",
  background: `${vars.color.surfaceContainerHigh}cc`,
});

export const primaryDimGlow = style({
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  boxShadow: `0 0 12px 0 ${vars.color.primaryDim}44`,
  transitionProperty: "box-shadow",
  transitionDuration: motion.duration.cardGlow,
  transitionTimingFunction: motion.ease.out,
  "@media": {
    [reduceMotion]: {
      transitionDuration: "0s",
    },
  },
});

export const surfaceCard = style({
  backgroundColor: vars.color.surfaceContainerLow,
  transitionProperty: "transform, box-shadow",
  transitionDuration: motion.duration.cardHoverLift,
  transitionTimingFunction: motion.ease.out,
  ":hover": {
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    transform: "translateY(-2px)",
    // audit-allow: px — px — sub-token spacing value, no density token at this step
    boxShadow: `0 0 32px ${vars.color.surfaceContainerLowest}66`,
  },
  "@media": {
    [reduceMotion]: {
      transitionDuration: "0s",
      ":hover": {
        transform: "none",
      },
    },
  },
});

export const focusRing = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  outline: `2px solid ${vars.color.primary}`,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  outlineOffset: "2px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  boxShadow: `0 0 8px 0 ${vars.color.primaryDim}44`,
  transitionProperty: "outline-color, box-shadow",
  transitionDuration: motion.duration.focusRing,
  transitionTimingFunction: motion.ease.out,
  "@media": {
    [reduceMotion]: {
      transitionDuration: "0s",
      boxShadow: "none",
    },
  },
});

const pulseKeyframes = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
});

export const acidGreenPulse = style({
  animationName: pulseKeyframes,
  animationDuration: motion.duration.statusDotPulseCycle,
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
  "@media": {
    [reduceMotion]: {
      animationDuration: "0s",
      animationIterationCount: "1",
      opacity: 1,
    },
  },
});
