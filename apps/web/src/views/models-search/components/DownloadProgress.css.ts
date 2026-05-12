import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

const queuedPulse = keyframes({
  "0%, 100%": { opacity: 0.55 },
  "50%": { opacity: 1 },
});

export const wrap = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
  flex: 1,
  minWidth: 0,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d2,
});

export const label = style({
  fontFamily: vars.font.code,
  // audit-allow: px — dense progress label 10px matches kbd token sibling but kept literal for parity with VariantList progress
  fontSize: vars.font.size.kbd,
  letterSpacing: "0.08em",
  color: vars.color.accent.secondary,
  fontVariantNumeric: "tabular-nums",
  textTransform: "uppercase",
  fontWeight: vars.font.weight.bold,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
  flex: 1,
});

export const labelDim = style({
  color: vars.color.text.muted,
});

export const bar = style({
  position: "relative",
  width: "100%",
  // audit-allow: px — progress bar height 6px is a fixed UX geometry below density token granularity
  height: "6px",
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.full,
  overflow: "hidden",
});

export const fill = style({
  height: "100%",
  background: vars.color.accent.primary,
  borderRadius: vars.radius.full,
  transition: `width ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
});

export const fillPaused = style({
  background: `color-mix(in oklch, ${vars.color.accent.primary} 55%, transparent)`,
});

export const fillFailed = style({
  background: vars.color.error.base,
});

export const row = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flex: 1,
  minWidth: 0,
});

export const inlineButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  height: vars.control.heightSm,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": { background: vars.color.bg.bright },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
      outlineOffset: vars.focus.offset,
    },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  },
});

export const inlineButtonAccent = style({
  background: `color-mix(in oklch, ${vars.color.accent.primary} 18%, transparent)`,
  color: vars.color.accent.primary,
  selectors: {
    "&:hover": {
      background: `color-mix(in oklch, ${vars.color.accent.primary} 26%, transparent)`,
    },
  },
});

export const inlineButtonDanger = style({
  background: `color-mix(in oklch, ${vars.color.error.base} 18%, transparent)`,
  color: vars.color.error.base,
  selectors: {
    "&:hover": {
      background: `color-mix(in oklch, ${vars.color.error.base} 26%, transparent)`,
    },
  },
});

export const queuedBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  paddingInline: vars.density.d3,
  paddingBlock: vars.density.d1,
  borderRadius: vars.radius.full,
  background: `color-mix(in oklch, ${vars.color.accent.secondary} 14%, transparent)`,
  color: vars.color.accent.secondary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  animation: `${queuedPulse} 1.6s ${vars.motion.easingDefault} infinite`,
});

export const downloadedChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  height: vars.control.heightLg,
  paddingInline: vars.density.d4,
  borderRadius: vars.radius.control,
  background: `color-mix(in oklch, ${vars.color.success.base} 16%, transparent)`,
  color: vars.color.success.base,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  flex: 1,
  minWidth: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const downloadedIcon = style({
  fontSize: vars.icon.sm,
});

export const failedRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flex: 1,
  minWidth: 0,
});

export const failedText = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  color: vars.color.error.base,
  letterSpacing: "0.04em",
  flex: 1,
  minWidth: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
