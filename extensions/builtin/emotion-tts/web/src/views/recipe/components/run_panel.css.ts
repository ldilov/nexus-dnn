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

/* CTA slot — wraps the canonical Button primitive. The breathing halo
 * around the Generate button is rendered by `cta::before` when
 * `data-state="idle"` so the Button itself stays a vanilla primary md
 * shape and pulls every visual rule from the design system. */
const ctaBreath = keyframes({
  "0%, 100%": {
    opacity: 0.35,
    transform: "scale(1)",
  },
  "50%": {
    opacity: 0.7,
    transform: "scale(1.05)",
  },
});

export const cta = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  flexShrink: 0,
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      // audit-allow: px — halo overshoot beyond Button bounds.
      inset: "-6px",
      borderRadius: vars.radius.lg,
      background: `radial-gradient(closest-side, color-mix(in oklab, ${vars.color.accent} 35%, transparent), transparent 70%)`,
      opacity: 0,
      pointerEvents: "none",
      transition: `opacity ${vars.motion.normal}`,
    },
    '&[data-state="idle"]::before': {
      animation: `${ctaBreath} 3.6s ease-in-out infinite`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      selectors: {
        "&::before": { animation: "none" },
      },
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
