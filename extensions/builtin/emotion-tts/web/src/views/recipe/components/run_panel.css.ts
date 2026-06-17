import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

/* ── Generate panel — editorial direction ──────────────────────────
   The Generate slot is the recipe's hero call-to-action. Editorial
   3-step scale instead of the previous flat 30/52/52. */

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const card = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: vars.space.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  borderRadius: vars.radius.md,
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
      background: `radial-gradient(620px 200px at 100% 0%, color-mix(in oklab, ${vars.color.accent} 12%, transparent), transparent 70%)`,
    },
  },
});

/* Tiny mono numeral — sits inline with the eyebrow label, no longer a
   separate column. Keeps editorial anchor without dominating the row. */
export const numeral = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  fontWeight: 700,
  letterSpacing: vars.tracking.label,
  color: vars.color.accent,
  textTransform: "uppercase",
});

/* Diagnostics — single row, label and chips inline with the CTA. */
export const diagnostics = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: vars.space.sm,
  flex: "1 1 auto",
  minWidth: 0,
});

export const diagnosticsLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textFaint,
  fontWeight: 600,
  whiteSpace: "nowrap",
});

export const diagList = style({
  display: "inline-flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const diagItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  paddingInline: vars.space.sm,
  // 28px chip aligns with 32px Generate button (sm) on the same baseline.
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

/* When the floating sticky toolbar takes over the Generate CTA, the in-page
   button collapses to a quiet status line so the user has exactly one
   visible primary action per spec I-3. */
export const stickyHandoff = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  paddingInline: vars.space.md,
  paddingBlock: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  borderRadius: vars.radius.pill,
  background: `color-mix(in oklab, ${vars.color.surfaceHigh} 85%, transparent)`,
  whiteSpace: "nowrap",
});

export const stickyHandoffArrow = style({
  color: vars.color.accent,
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

/* ── Per-item progress grid (storyboard fan-out) ───────────────────
   A 4-column grid — label | status pill | eta/spinner/duration |
   glance without reading text. */
export const progressGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto auto auto",
  columnGap: vars.space.md,
  rowGap: vars.space.xs,
  alignItems: "center",
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceMuted,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const progressGridHead = style({
  gridColumn: "1 / -1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  paddingBottom: vars.space.xs,
  marginBottom: vars.space.xs,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
});

export const progressGridTitle = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textFaint,
});

const inFlightPulse = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.5, transform: "scale(0.85)" },
});

export const inFlightBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  paddingInline: vars.space.sm,
  height: "22px",
  borderRadius: vars.radius.pill,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  background: vars.color.surface,
  color: vars.color.textMuted,
  selectors: {
    '&[data-tone="live"]': {
      background: `color-mix(in oklab, ${vars.color.accent} 18%, transparent)`,
      color: vars.color.text,
    },
  },
});

export const inFlightDot = style({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  flexShrink: 0,
  background: vars.color.textFaint,
  selectors: {
    [`${inFlightBadge}[data-tone="live"] &`]: {
      background: vars.color.accent,
      animation: `${inFlightPulse} 1.4s ease-in-out infinite`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

/* `display: contents` lets each row's four cells live directly on the
   parent grid tracks while still scoping a per-row hover + status rail
   on the cells. */
export const progressGridRow = style({
  display: "contents",
});

const cellBase = {
  alignSelf: "center",
  paddingBlock: vars.space.xs,
  transition: `background ${vars.motion.fast}`,
} as const;

export const gridLabel = style({
  ...cellBase,
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  paddingLeft: vars.space.sm,
  paddingRight: vars.space.xs,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
  borderRadius: `${vars.radius.sm} 0 0 ${vars.radius.sm}`,
  // Left status rail — the accent edge that flips colour with state.
  boxShadow: `inset 2px 0 0 ${vars.color.borderSubtle}`,
  selectors: {
    [`${progressGridRow}[data-status="generating"] &`]: {
      color: vars.color.text,
      boxShadow: `inset 2px 0 0 ${vars.color.accent}`,
    },
    [`${progressGridRow}[data-status="done"] &`]: {
      boxShadow: `inset 2px 0 0 ${vars.color.success}`,
    },
    [`${progressGridRow}[data-status="failed"] &`]: {
      color: vars.color.text,
      boxShadow: `inset 2px 0 0 ${vars.color.danger}`,
    },
    [`${progressGridRow}[data-status="cancelled"] &`]: {
      color: vars.color.textFaint,
      boxShadow: `inset 2px 0 0 ${vars.color.textFaint}`,
    },
  },
});

export const gridStatus = style({ ...cellBase });

export const gridMeta = style({
  ...cellBase,
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  justifyContent: "flex-end",
  minWidth: 0,
});

export const gridDuration = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.success,
});

export const etaChip = style({
  display: "inline-flex",
  alignItems: "center",
  paddingInline: vars.space.sm,
  height: "20px",
  borderRadius: vars.radius.pill,
  background: vars.color.surface,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
});

export const gridFailure = style({
  ...cellBase,
  paddingRight: vars.space.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.danger,
  borderRadius: `0 ${vars.radius.sm} ${vars.radius.sm} 0`,
  textAlign: "right",
});

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = style({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  border: `2px solid color-mix(in oklab, ${vars.color.accent} 30%, transparent)`,
  borderTopColor: vars.color.accent,
  animation: `${spin} 0.7s linear infinite`,
  flexShrink: 0,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      borderTopColor: vars.color.accent,
    },
  },
});
