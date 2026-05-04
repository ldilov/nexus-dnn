import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

/* ── Generate panel — editorial direction ──────────────────────────
   The Generate slot is the recipe's hero call-to-action. Editorial
   anchor: a mono "01" numeral on the left, dense diagnostic strip in
   the middle, oversized labeled CTA on the right with breathing accent
   glow when ready. Cancel is demoted to a small ghost text-link so it
   doesn't fight Generate for visual weight.

   Typographic rhythm — chip 36 / cancel 40 / Generate 60 — reads as a
   3-step scale instead of the previous flat 30/52/52. */

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const card = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto",
  gap: vars.space.lg,
  alignItems: "center",
  paddingBlock: vars.space.md,
  paddingInline: vars.space.lg,
  borderRadius: vars.radius.lg,
  background: `linear-gradient(135deg,
    color-mix(in oklab, ${vars.color.accent} 8%, ${vars.color.surfaceMuted}) 0%,
    ${vars.color.surfaceMuted} 60%)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 16%, transparent)`,
  overflow: "hidden",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `radial-gradient(620px 200px at 100% 0%, color-mix(in oklab, ${vars.color.accent} 14%, transparent), transparent 70%)`,
    },
  },
  "@media": {
    "(max-width: 720px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: vars.space.lg,
      paddingInline: vars.space.lg,
    },
  },
});

/* Editorial anchor — mono numeral, soft accent. */
export const numeral = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  fontFamily: vars.font.mono,
  fontSize: "1.5rem",
  fontWeight: 600,
  letterSpacing: "-0.02em",
  lineHeight: 1,
  color: `color-mix(in oklab, ${vars.color.accent} 70%, transparent)`,
  selectors: {
    "&::after": {
      content: '""',
      position: "absolute",
      right: "-12px",
      top: "10%",
      bottom: "10%",
      width: "1px",
      background: `linear-gradient(to bottom, transparent, ${vars.color.borderGhost} 30%, ${vars.color.borderGhost} 70%, transparent)`,
    },
  },
  "@media": {
    "(max-width: 720px)": {
      display: "none",
    },
  },
});

export const diagnostics = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  minWidth: 0,
});

export const diagnosticsLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textFaint,
  fontWeight: 600,
});

export const diagList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const diagItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  paddingInline: vars.space.sm,
  height: "28px",
  borderRadius: vars.radius.pill,
  background: vars.color.surface,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.text,
  transition: `box-shadow ${vars.motion.fast}, background ${vars.motion.fast}`,
});

const failPulse = keyframes({
  "0%, 100%": {
    boxShadow: `0 0 0 0 color-mix(in oklab, ${vars.color.danger} 0%, transparent)`,
  },
  "50%": {
    boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.danger} 28%, transparent)`,
  },
});

export const diagDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  flexShrink: 0,
  selectors: {
    '&[data-status="ok"]': { background: vars.color.success },
    '&[data-status="warn"]': { background: vars.color.warning },
    '&[data-status="fail"]': {
      background: vars.color.danger,
      animation: `${failPulse} 1.6s ease-in-out infinite`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const diagLabel = style({
  fontWeight: 600,
});

export const diagDetail = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
});

export const cta = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  flexShrink: 0,
});

const ctaPulse = keyframes({
  "0%, 100%": {
    boxShadow: `0 8px 24px -8px color-mix(in oklab, ${vars.color.accent} 60%, transparent), 0 0 0 0 color-mix(in oklab, ${vars.color.accent} 60%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 14%, transparent)`,
  },
  "50%": {
    boxShadow: `0 12px 32px -8px color-mix(in oklab, ${vars.color.accent} 80%, transparent), 0 0 0 8px color-mix(in oklab, ${vars.color.accent} 0%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 22%, transparent)`,
  },
});

const ctaBreath = keyframes({
  "0%, 100%": {
    boxShadow: `0 8px 24px -8px color-mix(in oklab, ${vars.color.accent} 60%, transparent), 0 0 0 0 color-mix(in oklab, ${vars.color.accent} 0%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 14%, transparent)`,
  },
  "50%": {
    boxShadow: `0 14px 38px -8px color-mix(in oklab, ${vars.color.accent} 85%, transparent), 0 0 0 8px color-mix(in oklab, ${vars.color.accent} 0%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 22%, transparent), ${vars.shadow.glow}`,
  },
});

export const generateBtn = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  height: "40px",
  paddingInline: vars.space.lg,
  border: "none",
  borderRadius: vars.radius.md,
  background: vars.color.accent,
  color: vars.color.accentOn,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  fontWeight: 600,
  letterSpacing: "-0.005em",
  cursor: "pointer",
  boxShadow: `0 8px 24px -8px color-mix(in oklab, ${vars.color.accent} 60%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 14%, transparent)`,
  transition: `transform ${vars.motion.fast}, box-shadow ${vars.motion.fast}, color ${vars.motion.fast}, background ${vars.motion.fast}`,
  selectors: {
    /* When pre-flight is green and runtime is ready, breathe a slow halo. */
    '&[data-state="idle"]:not(:disabled)': {
      animation: `${ctaBreath} 3.6s ease-in-out infinite`,
    },
    "&:hover:not(:disabled)": {
      color: vars.color.text,
      transform: "translateY(-1px) scale(1.015)",
      animation: "none",
      boxShadow: `0 14px 36px -8px color-mix(in oklab, ${vars.color.accent} 90%, transparent), ${vars.shadow.glow}, inset 0 1px 0 0 color-mix(in oklab, white 28%, transparent)`,
    },
    "&:active:not(:disabled)": {
      transform: "translateY(0) scale(0.99)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "3px",
    },
    '&[data-state="running"]': {
      animation: `${ctaPulse} 1.6s ease-in-out infinite`,
    },
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.55,
      filter: "saturate(0.6)",
      boxShadow: "none",
      animation: "none",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const ctaIcon = style({
  fontSize: vars.text.subhead,
  lineHeight: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

/* Cancel demoted to ghost-text. Hover surfaces danger tint. */
export const cancelBtn = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  height: "32px",
  paddingInline: vars.space.md,
  border: "none",
  borderRadius: vars.radius.sm,
  background: "transparent",
  color: vars.color.textMuted,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: `color-mix(in oklab, ${vars.color.danger} 14%, transparent)`,
      color: vars.color.danger,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.danger}`,
      outlineOffset: "2px",
    },
    "&:disabled": {
      opacity: 0.35,
      cursor: "not-allowed",
    },
  },
});

const spinKeyframes = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = style({
  display: "inline-block",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  border: `2px solid color-mix(in oklab, currentColor 25%, transparent)`,
  borderTopColor: "currentColor",
  animation: `${spinKeyframes} 0.8s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const queueChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  paddingInline: vars.space.sm,
  height: "22px",
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  marginLeft: vars.space.sm,
});

const queuePulseKeyframes = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.55, transform: "scale(0.9)" },
});

export const queueDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  background: vars.color.accent,
  animation: `${queuePulseKeyframes} 1.5s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});
