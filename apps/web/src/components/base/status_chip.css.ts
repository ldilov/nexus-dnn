import { globalStyle, keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.chip.gap,
  height: vars.chip.height,
  padding: `0 ${vars.chip.padX}`,
  background: vars.color.bg.hover,
  color: vars.color.text.secondary,
  borderRadius: vars.radius.full,
  fontSize: vars.chip.fontSize,
  fontWeight: 500,
  letterSpacing: "0.02em",
});

export const chipDot = style({
  width: vars.chip.dot,
  height: vars.chip.dot,
  borderRadius: vars.radius.full,
  background: vars.color.text.secondary,
  flex: "0 0 auto",
});

const pulse = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.55, transform: "scale(0.92)" },
});

export const chipDotPulse = style({
  animation: `${pulse} 1.5s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const chipKind = styleVariants({
  live: {},
  idle: {},
  failed: {},
  draft: {
    color: vars.color.text.secondary,
  },
  ai: {
    background: `linear-gradient(135deg, ${vars.color.accent.secondary}40, ${vars.color.accent.secondary}10)`,
    color: vars.color.accent.secondary,
    // audit-allow: px — px — sub-token spacing value, no density token at this step
    boxShadow: `inset 0 0 0 1px ${vars.color.accent.secondary}40, 0 0 12px ${vars.color.accent.secondary}22`,
  },
});

globalStyle(`${chip}${chipKind.live} ${chipDot}`, {
  background: vars.color.success.base,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  boxShadow: `0 0 8px ${vars.color.success.base}55`,
});

globalStyle(`${chip}${chipKind.idle} ${chipDot}`, {
  background: vars.color.outline.base,
});

globalStyle(`${chip}${chipKind.failed} ${chipDot}`, {
  background: vars.color.error.base,
});

globalStyle(`${chip}${chipKind.draft} ${chipDot}`, {
  background: vars.color.accent.tertiary,
});

export type StatusKind = keyof typeof chipKind;
