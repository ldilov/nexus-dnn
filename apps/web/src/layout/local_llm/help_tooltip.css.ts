import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const reducedMotion = "(prefers-reduced-motion: reduce)";

const tooltipEnter = keyframes({
  from: { opacity: 0, transform: "translateY(-2px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const root = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  marginInlineStart: vars.density.d2,
});

export const trigger = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  height: "16px",
  padding: 0,
  margin: 0,
  border: "none",
  borderRadius: vars.radius.full,
  background: "transparent",
  color: vars.color.text.muted,
  cursor: "help",
  fontFamily: vars.font.ui,
  fontSize: "11px",
  fontWeight: 600,
  lineHeight: 1,
  outline: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  transition: `color ${vars.motion.durationFast} ease, box-shadow ${vars.motion.durationFast} ease`,
  selectors: {
    "&:hover": {
      color: vars.color.accent.primary,
      boxShadow: `inset 0 0 0 1px ${vars.color.accent.primary}`,
    },
    "&:focus-visible": {
      color: vars.color.accent.primary,
      boxShadow: `inset 0 0 0 1.5px ${vars.color.accent.primary}`,
    },
  },
});

const tooltipBase = style({
  position: "absolute",
  zIndex: 50,
  pointerEvents: "none",
  maxWidth: "280px",
  minWidth: "200px",
  padding: vars.density.d3,
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  boxShadow: vars.shadow.sm,
  boxSizing: "border-box",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  lineHeight: 1.45,
  selectors: {
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      borderRadius: vars.radius.control,
      boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
      pointerEvents: "none",
    },
  },
});

const tooltipVisible = style({
  animation: `${tooltipEnter} 160ms ${vars.motion.easingDefault}`,
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const tooltipSide = styleVariants({
  top: [
    tooltipBase,
    {
      left: "50%",
      bottom: "calc(100% + 6px)",
      transform: "translateX(-50%)",
    },
  ],
  bottom: [
    tooltipBase,
    {
      left: "50%",
      top: "calc(100% + 6px)",
      transform: "translateX(-50%)",
    },
  ],
  left: [
    tooltipBase,
    {
      right: "calc(100% + 6px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
  ],
  right: [
    tooltipBase,
    {
      left: "calc(100% + 6px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
  ],
});

export const tooltipOpen = tooltipVisible;

export const tooltipHidden = style({
  visibility: "hidden",
  opacity: 0,
});

export const title = style({
  display: "block",
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  marginBottom: vars.density.d1,
});

export const description = style({
  display: "block",
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  lineHeight: 1.45,
});

export const recommended = style({
  display: "block",
  marginTop: vars.density.d2,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.accent.primary,
  letterSpacing: "0.01em",
});
