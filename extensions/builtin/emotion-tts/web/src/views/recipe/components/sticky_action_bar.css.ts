import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

/* ── Floating quick-action capsule — editorial direction ──────────────
   The bar lifts off the page with a saturated backdrop blur and a soft
   inner accent ring. Left side carries a status pill (mono caps) so the
   bar communicates state even when collapsed; right side is the labeled
   Generate CTA which breathes a slow accent halo when ready.

   ── Carve-out: pill shape ───────────────────────────────────────────
   This component intentionally uses a fully rounded pill shape for both
   the bar surface AND its inner buttons. That violates the canonical
   Button contract (rounded-rect, vars.radius.md). It is allowed because
   a floating-capsule toolbar is a single composed widget — not a row of
   individual buttons — and the pill shape IS the design intent of the
   capsule pattern. Do NOT copy this pattern for regular row affordances. */

export const bar = style({
  position: "fixed",
  bottom: vars.space.xl,
  left: "50%",
  transform: "translate(-50%, 12px)",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  paddingInline: vars.space.sm,
  paddingBlock: vars.space.xs,
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.surfaceHighest} 78%, transparent)`,
  boxShadow: `${vars.shadow.raised}, inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 22%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 6%, transparent)`,
  backdropFilter: "blur(18px) saturate(1.6)",
  WebkitBackdropFilter: "blur(18px) saturate(1.6)",
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

/* Status pill anchoring the left side. Mono caps, dot, label. */
export const statusPill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  paddingInline: vars.space.md,
  height: "32px",
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  background: `color-mix(in oklab, ${vars.color.surface} 60%, transparent)`,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderGhost}`,
  transition: `color ${vars.motion.fast}, background ${vars.motion.fast}, box-shadow ${vars.motion.fast}`,
  selectors: {
    '&[data-tone="ready"]': {
      color: vars.color.success,
      background: `color-mix(in oklab, ${vars.color.success} 14%, transparent)`,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.success} 38%, transparent)`,
    },
    '&[data-tone="busy"]': {
      color: vars.color.accent,
      background: `color-mix(in oklab, ${vars.color.accent} 16%, transparent)`,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 42%, transparent)`,
    },
    '&[data-tone="off"]': {
      color: vars.color.textFaint,
    },
  },
});

const dotPulse = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.55, transform: "scale(0.85)" },
});

export const statusDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  background: "currentColor",
  flexShrink: 0,
  selectors: {
    '&[data-pulse="true"]': {
      animation: `${dotPulse} 1.6s ease-in-out infinite`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

const buttonBase = {
  appearance: "none" as const,
  display: "inline-flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  height: "40px",
  borderRadius: vars.radius.pill,
  border: "none",
  cursor: "pointer",
  fontSize: vars.text.subhead,
  lineHeight: 1,
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}, box-shadow ${vars.motion.fast}, transform ${vars.motion.fast}`,
};

/* Run/Stop icon button — clear visual map for idle/running/transitioning. */
export const runBtn = style({
  ...buttonBase,
  width: "40px",
  background: "transparent",
  color: vars.color.textMuted,
  selectors: {
    "&:hover:not(:disabled)": {
      background: `color-mix(in oklab, ${vars.color.accent} 14%, transparent)`,
      color: vars.color.accent,
      transform: "translateY(-1px)",
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.accent} 50%, transparent)`,
    },
    "&:active:not(:disabled)": {
      transform: "translateY(0)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "2px",
    },
    /* RUNNING: success-tinted with breathing glow. */
    '&[data-state="running"]': {
      background: `color-mix(in oklab, ${vars.color.success} 22%, transparent)`,
      color: vars.color.success,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${vars.color.success} 55%, transparent), 0 0 0 0 color-mix(in oklab, ${vars.color.success} 38%, transparent)`,
    },
    /* TRANSITIONING: muted, spinner-rendered separately. */
    '&[data-state="transitioning"]': {
      background: `color-mix(in oklab, ${vars.color.accent} 12%, transparent)`,
      color: vars.color.accent,
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
});

const generateBreath = keyframes({
  "0%, 100%": {
    boxShadow: `0 8px 24px -8px color-mix(in oklab, ${vars.color.accent} 60%, transparent), 0 0 0 0 color-mix(in oklab, ${vars.color.accent} 0%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 16%, transparent)`,
  },
  "50%": {
    boxShadow: `0 12px 32px -8px color-mix(in oklab, ${vars.color.accent} 80%, transparent), 0 0 0 8px color-mix(in oklab, ${vars.color.accent} 0%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 22%, transparent), ${vars.shadow.glow}`,
  },
});

/* Generate pill — labeled "Generate" with icon, breathes when ready. */
export const generateBtn = style({
  ...buttonBase,
  paddingInline: vars.space.lg,
  gap: vars.space.sm,
  background: vars.color.accent,
  color: vars.color.accentOn,
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  fontWeight: 600,
  letterSpacing: "-0.005em",
  boxShadow: `0 8px 24px -8px color-mix(in oklab, ${vars.color.accent} 60%, transparent), inset 0 1px 0 0 color-mix(in oklab, white 14%, transparent)`,
  selectors: {
    '&[data-ready="true"]:not(:disabled)': {
      animation: `${generateBreath} 3.2s ease-in-out infinite`,
    },
    "&:hover:not(:disabled)": {
      transform: "translateY(-1px) scale(1.02)",
      animation: "none",
      color: vars.color.text,
      boxShadow: `0 14px 36px -8px color-mix(in oklab, ${vars.color.accent} 90%, transparent), ${vars.shadow.glow}, inset 0 1px 0 0 color-mix(in oklab, white 28%, transparent)`,
    },
    "&:active:not(:disabled)": {
      transform: "translateY(0) scale(0.99)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: "3px",
    },
    "&:disabled": {
      opacity: 0.45,
      cursor: "not-allowed",
      filter: "saturate(0.5)",
      animation: "none",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const generateLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 700,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  /* sit a hair below the icon's optical center */
  paddingBottom: "1px",
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
  fontSize: vars.text.body,
});

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = style({
  display: "inline-block",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  border: `2px solid color-mix(in oklab, currentColor 25%, transparent)`,
  borderTopColor: "currentColor",
  animation: `${spin} 0.8s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

/* ── Tooltip — mono-caps editorial chip floating above the icon. ── */
export const tooltipWrap = style({
  position: "relative",
  display: "inline-flex",
});

export const tooltip = style({
  position: "absolute",
  bottom: "calc(100% + 10px)",
  left: "50%",
  transform: "translate(-50%, 4px)",
  paddingInline: vars.space.sm,
  paddingBlock: "4px",
  borderRadius: vars.radius.sm,
  background: vars.color.surface,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: "0.625rem",
  fontWeight: 700,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  pointerEvents: "none",
  opacity: 0,
  boxShadow: `${vars.shadow.subtle}, inset 0 0 0 1px ${vars.color.borderSubtle}`,
  transition: `opacity ${vars.motion.fast}, transform ${vars.motion.fast}`,
  zIndex: 1,
  selectors: {
    [`${tooltipWrap}:hover &, ${tooltipWrap}:focus-within &`]: {
      opacity: 1,
      transform: "translate(-50%, 0)",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});
