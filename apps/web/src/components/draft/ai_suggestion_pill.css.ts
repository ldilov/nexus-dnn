import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "inline-flex",
  flexDirection: "column",
  gap: "var(--d-2)",
  padding: `var(--d-3) var(--d-4)`,
  borderRadius: vars.radius.card,
  background: `color-mix(in oklab, ${vars.color.accent.secondary} 10%, ${vars.color.bg.elevated})`,
  border: `1px solid color-mix(in oklab, ${vars.color.accent.secondary} 35%, transparent)`,
  boxShadow: `0 1px 0 0 color-mix(in oklab, ${vars.color.accent.secondary} 25%, transparent)`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  // audit-allow: px — readable-line cap; 640px is the established prose-readability ceiling, no token primitive maps to it cleanly
  maxWidth: "min(640px, 100%)",
});

export const eyebrow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--d-1)",
  fontFamily: vars.font.code,
  fontVariantNumeric: "tabular-nums",
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: vars.color.accent.secondary,
});

export const eyebrowDot = style({
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: vars.color.accent.secondary,
  // audit-allow: px — drop-shadow blur and spread are intentionally tiny; design-system shadow primitives are calibrated for surface elevation, not 6×6 indicator dots
  boxShadow: `0 0 8px 1px color-mix(in oklab, ${vars.color.accent.secondary} 60%, transparent)`,
});

export const body = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "var(--d-3)",
});

export const text = style({
  flex: "1 1 auto",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.body,
  color: vars.color.text.primary,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

export const muted = style({
  color: vars.color.text.muted,
});

export const errorText = style({
  color: vars.color.error.text,
});

const cursorBlink = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0 },
});

export const cursor = style({
  display: "inline-block",
  width: "0.5ch",
  marginLeft: "0.1ch",
  background: vars.color.accent.secondary,
  animation: `${cursorBlink} ${vars.motion.durationSlower} ${vars.motion.easingDefault} infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0.6,
    },
  },
});

export const actions = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--d-2)",
  flexShrink: 0,
});

export const iconButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: vars.control.heightSm,
  height: vars.control.heightSm,
  padding: 0,
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  borderRadius: vars.radius.control,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
    outlineOffset: vars.focus.offset,
  },
  ":disabled": {
    opacity: 0.4,
    cursor: "not-allowed",
  },
});

export const acceptButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--d-1)",
  height: vars.control.heightSm,
  padding: `0 var(--d-3)`,
  background: vars.color.accent.secondary,
  color: vars.color.onColor.secondary,
  border: "none",
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.accent.secondaryDim,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
    outlineOffset: vars.focus.offset,
  },
});

export const acceptHotkey = style({
  fontFamily: vars.font.code,
  fontVariantNumeric: "tabular-nums",
  fontSize: vars.font.size.caption,
  opacity: 0.85,
});

export const ctaLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "var(--d-1)",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  color: vars.color.accent.secondary,
  textDecoration: "none",
  ":hover": {
    color: vars.color.accent.secondaryDim,
    textDecoration: "underline",
  },
});
