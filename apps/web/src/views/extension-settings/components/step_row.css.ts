// audit-allow: px — fixed UX hit-target, not density-coupled
// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: px — below minimum token granularity (sub-10px)
// audit-allow: px — modal/dialog/drawer width per UX spec
import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "../../../theme/contract.css";

const stripeShimmer = keyframes({
  "0%": { backgroundPosition: "0 0" },
  // audit-allow: px — sub-token spacing value, no density token at this step
  "100%": { backgroundPosition: "32px 0" },
});

export const row = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: vars.space.insetLg,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.card,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": { background: vars.color.bg.elevated },
  },
});

export const rowRunning = style({
  background: `linear-gradient(90deg, color-mix(in oklch, ${vars.color.accent.accent} 7%, transparent), transparent 65%)`,
});

/**
 * Flat variant for rows stacked inside a grouped section card: the group card
 * owns the surface + radius, rows separate by hairline dividers only (G1).
 */
export const rowGrouped = style({
  background: "transparent",
  borderRadius: 0,
});
export const rowFailed = style({});
export const rowOk = style({});
export const rowSkipped = style({});

/**
 * Neutral structural bar (G10: status colors live on the statusPill dot only).
 * The RUNNING state alone warms it to the accent as a selection-ish cue.
 */
export const accentBar = style({
  position: "absolute",
  top: vars.space.insetSm,
  bottom: vars.space.insetSm,
  left: 0,
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "3px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "0 2px 2px 0",
  background: vars.color.outline.variant,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const accentRunning = style({ background: vars.color.accent.accent });

export const glyphTile = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "44px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.control,
  background: vars.color.accent.secondaryContainer,
  color: vars.color.accent.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  flexShrink: 0,
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  minWidth: 0,
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  flexWrap: "wrap",
});

export const stepId = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "0.01em",
});

/** Mono micro-cap KIND eyebrow right of the step name — quiet, unboxed. */
export const stepLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  fontWeight: vars.font.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: vars.color.text.muted,
});

export const subtitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const metaRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  flexWrap: "wrap",
});

export const meta = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const metaSep = style({
  color: vars.color.outline.variant,
});

/** Dependency names inside the "requires …" mono line — slightly brighter. */
export const requiresName = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.secondary,
});

export const progressTrack = style({
  position: "relative",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "6px",
  width: "100%",
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  overflow: "hidden",
  marginTop: vars.space.gapXs,
});

export const progressFill = style({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  background: `linear-gradient(90deg, ${vars.color.accent.primaryDim}, ${vars.color.accent.primary})`,
  // audit-allow: px — transition timing tuned to the live-progress ticker cadence
  transition: "width 320ms linear",
  borderRadius: vars.radius.control,
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

/** Dimmed, glow-less fill for a paused partial download. */
export const progressFillPaused = style({
  background: `color-mix(in oklch, ${vars.color.accent.accent} 45%, transparent)`,
  boxShadow: "none",
  transition: "none",
});

export const liveMeta = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  flexWrap: "wrap",
  marginTop: vars.space.gapXs,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
});

export const livePrimary = style({
  color: vars.color.text.secondary,
  fontWeight: vars.font.weight.semibold,
});

export const liveMetric = style({
  color: vars.color.text.muted,
});

export const progressIndeterminate = style({
  position: "absolute",
  inset: 0,
  // audit-allow: px — below minimum token granularity (sub-10px)
  background: `repeating-linear-gradient(135deg, ${vars.color.accent.primary} 0 8px, ${vars.color.accent.primaryDim} 8px 16px)`,
  opacity: 0.5,
  animation: `${stripeShimmer} 600ms linear infinite`,
});

export const trailing = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: vars.space.gapSm,
  flexShrink: 0,
});

/** Dot + mono caps status label — text signal only, no boxed pill (G10). */
export const statusPill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  fontWeight: vars.font.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: vars.color.text.secondary,
});

export const statusTextOk = style({ color: vars.color.success.text });
export const statusTextRunning = style({ color: vars.color.accent.accent });
export const statusTextFailed = style({ color: vars.color.error.text });
export const statusTextPaused = style({ color: vars.color.warning.text });

export const statusDot = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "8px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "8px",
  borderRadius: vars.radius.full,
  background: vars.color.outline.variant,
});

export const statusDotPending = style({ background: vars.color.outline.variant });
export const statusDotPaused = style({ background: vars.color.warning.base });
export const statusDotRunning = style({
  background: vars.color.accent.primary,
  // audit-allow: px — below minimum token granularity (sub-10px)
  boxShadow: `0 0 0 4px ${vars.color.accent.secondaryContainer}`,
});
export const statusDotOk = style({ background: vars.color.success.base });
export const statusDotFailed = style({ background: vars.color.error.base });
export const statusDotSkipped = style({ background: vars.color.accent.tertiary });

/** Quiet per-row text action ("Reinstall", "Install only this") — dim mono, hover brightens. */
export const ctaButton = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      color: vars.color.accent.accent,
    },
    "&:disabled": {
      opacity: 0.35,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

/** Failed-row Retry — the one boxed per-row action, red-tinted small chip. */
export const retryChip = style({
  height: vars.control.heightSm,
  padding: `0 ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  background: `color-mix(in oklch, ${vars.color.error.base} 13%, transparent)`,
  border: `1px solid color-mix(in oklch, ${vars.color.error.base} 28%, transparent)`,
  color: vars.color.error.text,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: `color-mix(in oklch, ${vars.color.error.base} 20%, transparent)`,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.error.base}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

/** Pure-black recessed well (surface-floor) holding the failure details. */
export const errorPanel = style({
  gridColumn: "1 / -1",
  marginTop: vars.space.gapSm,
  padding: `${vars.space.insetMd} ${vars.space.insetLg}`,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.card,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const errorLine = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.error.text,
});

export const errorHint = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
});

export const errorLog = style({
  margin: 0,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.muted,
  whiteSpace: "pre-wrap",
  // audit-allow: px — sub-token spacing value, no density token at this step
  maxHeight: "240px",
  overflowY: "auto",
});

/** Red mono "View/Hide error details" toggle link on a failed row. */
export const expandToggle = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.error.text,
  opacity: 0.85,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  textAlign: "left",
  selectors: {
    "&:hover": { opacity: 1 },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});
