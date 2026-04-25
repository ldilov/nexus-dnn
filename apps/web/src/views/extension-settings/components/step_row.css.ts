import { keyframes, style } from "@vanilla-extract/css";

import { vars } from "../../../theme/contract.css";

const stripeShimmer = keyframes({
  "0%": { backgroundPosition: "0 0" },
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

export const rowRunning = style({});
export const rowFailed = style({});
export const rowOk = style({});
export const rowSkipped = style({});

export const accentBar = style({
  position: "absolute",
  top: vars.space.insetSm,
  bottom: vars.space.insetSm,
  left: 0,
  width: "3px",
  borderRadius: "0 2px 2px 0",
  background: vars.color.outline.variant,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const accentRunning = style({ background: vars.color.accent.primary });
export const accentOk = style({ background: vars.color.success.base });
export const accentFailed = style({ background: vars.color.error.base });
export const accentSkipped = style({ background: vars.color.accent.tertiary });

export const glyphTile = style({
  width: "44px",
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

export const stepLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: vars.color.text.muted,
  padding: `2px ${vars.space.insetSm}`,
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
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

export const requiresChip = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  background: vars.color.bg.elevated,
  padding: `1px ${vars.space.insetSm}`,
  borderRadius: vars.radius.control,
});

export const progressTrack = style({
  position: "relative",
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
  transition: `width ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  borderRadius: vars.radius.control,
});

export const progressIndeterminate = style({
  position: "absolute",
  inset: 0,
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

export const statusPill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  padding: `4px ${vars.space.insetMd}`,
  borderRadius: vars.radius.full,
  background: vars.color.bg.elevated,
  color: vars.color.text.secondary,
});

export const statusDot = style({
  width: "8px",
  height: "8px",
  borderRadius: vars.radius.full,
  background: vars.color.outline.variant,
});

export const statusDotPending = style({ background: vars.color.outline.variant });
export const statusDotRunning = style({
  background: vars.color.accent.primary,
  boxShadow: `0 0 0 4px ${vars.color.accent.secondaryContainer}`,
});
export const statusDotOk = style({ background: vars.color.success.base });
export const statusDotFailed = style({ background: vars.color.error.base });
export const statusDotSkipped = style({ background: vars.color.accent.tertiary });

export const ctaButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.accent.primary,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: `6px ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent.secondaryContainer,
    },
    "&:disabled": {
      color: vars.color.text.muted,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const ctaPrimary = style({
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent.primaryHover,
    },
  },
});

export const errorPanel = style({
  gridColumn: "1 / -1",
  marginTop: vars.space.gapSm,
  padding: vars.space.insetLg,
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.card,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const errorLine = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.error.text,
});

export const errorHint = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
});

export const errorLog = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  background: vars.color.bg.lowest,
  padding: vars.space.insetMd,
  borderRadius: vars.radius.control,
  whiteSpace: "pre-wrap",
  maxHeight: "240px",
  overflowY: "auto",
});

export const expandToggle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  textAlign: "left",
  selectors: {
    "&:hover": { color: vars.color.text.primary },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "2px",
    },
  },
});
