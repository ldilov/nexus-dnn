import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const bar = style({
  position: "fixed",
  insetBlockEnd: vars.space.xl,
  insetInlineStart: "50%",
  transform: "translate(-50%, 12px)",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: vars.space.xs,
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.surfaceHigh} 92%, transparent)`,
  boxShadow: `${vars.shadow.raised}, inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
  backdropFilter: "blur(12px) saturate(1.2)",
  WebkitBackdropFilter: "blur(12px) saturate(1.2)",
  zIndex: 40,
  opacity: 0,
  pointerEvents: "none",
  transition: `opacity ${vars.motion.normal}, transform ${vars.motion.normal}`,
  selectors: {
    '&[data-visible="true"]': {
      opacity: 1,
      pointerEvents: "auto",
      transform: "translate(-50%, 0)",
    },
  },
});

const buttonBase = {
  appearance: "none" as const,
  display: "inline-flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  width: "40px",
  height: "40px",
  borderRadius: vars.radius.pill,
  border: "none",
  cursor: "pointer",
  fontSize: vars.text.subhead,
  lineHeight: 1,
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}, box-shadow ${vars.motion.fast}, transform ${vars.motion.fast}`,
};

export const runBtn = style({
  ...buttonBase,
  background: "transparent",
  color: vars.color.text,
  selectors: {
    "&:hover:not(:disabled)": {
      background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
      color: vars.color.accent,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
    '&[data-state="running"]': {
      background: `color-mix(in oklab, ${vars.color.success} 18%, transparent)`,
      color: vars.color.success,
    },
    "&:disabled": {
      opacity: 0.55,
      cursor: "not-allowed",
    },
  },
});

export const generateBtn = style({
  ...buttonBase,
  background: vars.color.accent,
  color: vars.color.accentOn,
  selectors: {
    "&:hover:not(:disabled)": {
      boxShadow: vars.shadow.glow,
      transform: "scale(1.04)",
    },
    "&:active:not(:disabled)": {
      transform: "scale(0.98)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "3px",
    },
    "&:disabled": {
      opacity: 0.45,
      cursor: "not-allowed",
      filter: "saturate(0.5)",
    },
  },
});

export const divider = style({
  width: "1px",
  height: "20px",
  background: vars.color.borderGhost,
  marginInline: vars.space.xs,
});

export const glyph = style({
  display: "inline-block",
  fontFamily: vars.font.body,
  fontWeight: 600,
});

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = style({
  display: "inline-block",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  border: `2px solid color-mix(in oklab, ${vars.color.text} 25%, transparent)`,
  borderTopColor: "currentColor",
  animation: `${spin} 0.8s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
