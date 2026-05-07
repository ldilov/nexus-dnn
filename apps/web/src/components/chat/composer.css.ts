import { globalStyle, keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const fadeSlideIn = keyframes({
  from: { opacity: 0, transform: "translateY(4px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const restoredHint = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  marginBottom: vars.density.d2,
  paddingBlock: vars.density.d1,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.full,
  background: `color-mix(in oklch, ${vars.color.accent.primary} 10%, transparent)`,
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.04em",
  animation: `${fadeSlideIn} 220ms ${vars.motion.easingDefault}`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const restoredHintGlyph = style({
  fontSize: "14px",
  lineHeight: 1,
  color: vars.color.accent.primary,
});

export const restoredHintDismiss = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginInlineStart: vars.density.d1,
  width: "16px",
  height: "16px",
  padding: 0,
  background: "transparent",
  color: vars.color.text.muted,
  border: "none",
  borderRadius: vars.radius.full,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
});

globalStyle(`${restoredHintDismiss} > .material-symbols-outlined`, {
  fontSize: "14px",
  lineHeight: 1,
});

export const wrap = style({
  display: "flex",
  alignItems: "flex-end",
  gap: vars.density.d2,
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d4,
  background: vars.color.bg.lowest,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.panel,
  transition: `border-color ${vars.motion.durationNormal} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  selectors: {
    "&:focus-within": {
      borderColor: `color-mix(in oklch, ${vars.color.accent.primary} 50%, ${vars.color.outline.variant})`,
      boxShadow: `0 0 0 3px color-mix(in oklch, ${vars.color.accent.primary} 14%, transparent)`,
    },
  },
});

export const textarea = style({
  flex: "1 1 auto",
  minHeight: "48px",
  maxHeight: "8rem",
  paddingBlock: vars.density.d2,
  resize: "none",
  background: "transparent",
  color: vars.color.text.primary,
  border: "none",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.normal,
  outline: "none",
  "::placeholder": { color: vars.color.text.muted, opacity: 0.7 },
});

export const charCount = style({
  flex: "0 0 auto",
  alignSelf: "flex-end",
  paddingBlock: vars.density.d2,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.02em",
  userSelect: "none",
});

export const secondaryBtn = style({
  height: "48px",
  width: "48px",
  flex: "0 0 auto",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  color: vars.color.text.secondary,
  border: `1px solid color-mix(in oklch, ${vars.color.outline.variant} 50%, transparent)`,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    color: vars.color.text.primary,
    background: vars.color.bg.hover,
    borderColor: `color-mix(in oklch, ${vars.color.accent.primary} 35%, ${vars.color.outline.variant})`,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
});

export const sendBtn = style({
  height: "48px",
  paddingInline: vars.density.d4,
  flex: "0 0 auto",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  borderRadius: vars.radius.control,
  background: `linear-gradient(135deg, ${vars.color.accent.primary}, ${vars.color.accent.secondary})`,
  color: vars.color.onColor.primary,
  border: "none",
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  boxShadow: `0 4px 12px color-mix(in oklch, ${vars.color.accent.primary} 25%, transparent)`,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, opacity ${vars.motion.durationFast} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    boxShadow: `0 6px 18px color-mix(in oklch, ${vars.color.accent.primary} 38%, transparent)`,
    transform: "translateY(-1px)",
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
  ":disabled": {
    background: vars.color.bg.elevated,
    color: vars.color.text.muted,
    boxShadow: "none",
    transform: "none",
    opacity: 0.5,
    cursor: "not-allowed",
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});

export const cancelBtn = style({
  height: "48px",
  paddingInline: vars.density.d4,
  flex: "0 0 auto",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.secondary,
  border: `1px solid color-mix(in oklch, ${vars.color.outline.variant} 60%, transparent)`,
  cursor: "pointer",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    color: vars.color.text.primary,
    background: vars.color.bg.hover,
    borderColor: `color-mix(in oklch, ${vars.color.error.base} 40%, ${vars.color.outline.variant})`,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
  },
});

export const hint = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  paddingBlock: vars.density.d2,
  paddingInline: vars.density.d4,
});

export const disabledNotice = style({
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d4,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.panel,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});
