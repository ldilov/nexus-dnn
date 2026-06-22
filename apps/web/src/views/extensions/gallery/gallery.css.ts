import { style, globalStyle, keyframes } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";
import { media } from "../../../theme/breakpoints";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.padSection,
  paddingBlock: vars.density.padSection,
  // audit-allow: px — fixed layout breakpoint matches Deployments-Index reference
  maxWidth: "1400px",
  marginInline: "auto",
  width: "100%",
  "@media": {
    [media.maxMobile]: {
      paddingBlock: vars.density.d4,
    },
  },
});

export const summaryGrid = style({
  display: "grid",
  // audit-allow: px — fixed minimum width breakpoint, matches Deployments-Index reference
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: vars.density.gapCard,
});

export const summaryStat = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  padding: vars.density.padCard,
  borderRadius: vars.radius.card,
  background: vars.card.bg,
});

export const summaryStatLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const summaryStatValue = style({
  fontFamily: vars.font.code,
  // audit-allow: px — fluid clamp display value, matches Deployments-Index summaryStatValue
  fontSize: "clamp(28px, 1.6vw + 18px, 44px)",
  fontWeight: vars.font.weight.regular,
  color: vars.color.text.primary,
  lineHeight: 1,
  letterSpacing: "-0.02em",
  fontVariantNumeric: "tabular-nums",
});

export const grid = style({
  display: "grid",
  // audit-allow: px — minimum card width before reflow
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: vars.density.gapCard,
  listStyle: "none",
  padding: 0,
  margin: 0,
  "@media": {
    // audit-allow: px — Spectral Graphite responsive breakpoint per design brief §2.3
    "(min-width: 1280px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    // audit-allow: px — Spectral Graphite responsive breakpoint per design brief §2.3
    "(min-width: 960px) and (max-width: 1279px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [media.maxMobile]: {
      gridTemplateColumns: "1fr",
      gap: vars.density.d3,
    },
  },
});

export const card = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  padding: vars.density.padCard,
  borderRadius: vars.radius.card,
  background: vars.card.bg,
  boxShadow: vars.card.shadow,
  backdropFilter: vars.card.backdrop,
  textAlign: "left",
  border: "none",
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    transform: "translateY(-1px)",
  },
});

export const cardDisabled = style({
  opacity: 0.7,
});

export const cardHead = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.density.d3,
});

export const iconTile = style({
  width: vars.control.heightLg,
  height: vars.control.heightLg,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.control,
  background: `color-mix(in oklch, ${vars.color.accent.primary} 14%, transparent)`,
  color: vars.color.accent.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.02em",
});

export const headText = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
  minWidth: 0,
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flexWrap: "wrap",
});

const titleBase = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
  margin: 0,
});

export const title = titleBase;

export const titleLink = style([
  titleBase,
  {
    textDecoration: "none",
    cursor: "pointer",
    transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
    selectors: {
      "&:hover": { color: vars.color.accent.primary },
      "&:focus-visible": {
        outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
        outlineOffset: vars.focus.offset,
        borderRadius: vars.radius.control,
      },
    },
  },
]);

export const sourceChip = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  paddingInline: vars.density.d2,
  // audit-allow: px — chip vertical padding 2px is below minimum density token granularity
  paddingBlock: "2px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.hover,
  color: vars.color.text.secondary,
});

export const meta = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.02em",
});

export const capsLine = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  letterSpacing: "0.06em",
  lineHeight: 1.9,
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const capsSep = style({
  color: vars.color.outline.variant,
  whiteSpace: "pre",
});

export const metrics = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.density.d3,
  paddingTop: vars.density.d2,
});

export const metricCell = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
});

export const metricLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const metricValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  fontVariantNumeric: "tabular-nums",
});

export const metricValueMuted = style({
  color: vars.color.text.muted,
});

export const summaryStatValueMuted = style({
  color: vars.color.text.muted,
});

export const footer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "auto",
  paddingTop: vars.density.d3,
  gap: vars.density.d3,
});

export const footerActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d1,
});

export const iconButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: vars.control.heightSm,
  height: vars.control.heightSm,
  border: "none",
  borderRadius: vars.radius.full,
  background: "transparent",
  color: vars.color.text.muted,
  cursor: "pointer",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: vars.color.bg.hover,
      color: vars.color.text.primary,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
      outlineOffset: vars.focus.offset,
    },
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const iconButtonDanger = style({
  selectors: {
    "&:hover": {
      color: vars.color.error.text,
    },
  },
});

export const iconButtonLink = style([
  iconButton,
  {
    textDecoration: "none",
  },
]);

export const iconGlyph = style({
  fontSize: vars.icon.sm,
  lineHeight: 1,
});

export const toggle = style({
  position: "relative",
  // audit-allow: px — fixed switch geometry, no density token at this granularity
  width: "36px",
  // audit-allow: px — fixed switch geometry, no density token at this granularity
  height: "20px",
  border: "none",
  borderRadius: vars.radius.full,
  background: vars.color.bg.hover,
  cursor: "pointer",
  padding: 0,
  flexShrink: 0,
  transition: `background ${vars.motion.durationNormal} ${vars.motion.easingDefault}, box-shadow ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
  selectors: {
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
      outlineOffset: vars.focus.offset,
    },
  },
});

export const toggleOn = style({
  background: vars.color.accent.primary,
  boxShadow: `0 0 16px ${vars.color.accent.accentGlow}`,
});

export const toggleKnob = style({
  position: "absolute",
  // audit-allow: px — sub-density alignment for the 36×20 switch geometry
  top: "2px",
  // audit-allow: px — sub-density alignment for the 36×20 switch geometry
  left: "2px",
  // audit-allow: px — sub-density knob geometry, no density token at this granularity
  width: "16px",
  // audit-allow: px — sub-density knob geometry, no density token at this granularity
  height: "16px",
  borderRadius: vars.radius.full,
  background: vars.color.text.primary,
  transition: `transform ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
});

export const toggleKnobOn = style({
  // audit-allow: px — sub-density knob travel matches 36×20 track geometry
  transform: "translateX(16px)",
});

export const installCard = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.density.d2,
  // audit-allow: px — install card minimum height matches the visual height of a populated card row
  minHeight: "240px",
  borderRadius: vars.radius.card,
  background: vars.card.bg,
  color: vars.color.text.muted,
  cursor: "pointer",
  outline: `1px dashed ${vars.color.outline.variant}`,
  outlineOffset: "-1px",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, outline-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover, &:focus-visible": {
      background: vars.color.bg.hover,
      color: vars.color.accent.primary,
      outlineColor: vars.color.accent.primary,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
      outlineOffset: vars.focus.offset,
    },
  },
});

export const installGlyph = style({
  fontFamily: "Material Symbols Outlined",
  // audit-allow: px — display glyph size for empty install affordance
  fontSize: "40px",
  lineHeight: 1,
  color: vars.color.accent.primary,
});

export const installTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.04em",
  color: vars.color.text.primary,
});

export const installHint = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.04em",
});

export const errorState = style({
  padding: vars.density.padCard,
  borderRadius: vars.radius.card,
  background: vars.card.bg,
  color: vars.color.error.text,
  fontSize: vars.font.size.bodySm,
});

const setupBadgeDot = keyframes({
  "0%": { transform: "scale(1)", opacity: 1 },
  "50%": { transform: "scale(1.6)", opacity: 0.6 },
  "100%": { transform: "scale(1)", opacity: 1 },
});

export const setupBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  flexShrink: 0,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  paddingInline: vars.density.d2,
  // audit-allow: px — chip vertical padding 2px is below minimum density token granularity
  paddingBlock: "2px",
  borderRadius: vars.radius.full,
  background: vars.color.accent.tertiary,
  color: vars.color.onColor.tertiary,
  textDecoration: "none",
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": { transform: "translateY(-1px)" },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.tertiary}`,
      outlineOffset: vars.focus.offset,
    },
  },
});

export const setupBadgeCount = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.04em",
  opacity: 0.78,
});

export const setupBadgePulse = style({
  // audit-allow: px — sub-density pulse dot, sits below d1
  width: "6px",
  // audit-allow: px — sub-density pulse dot, sits below d1
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.onColor.tertiary,
  animation: `${setupBadgeDot} 1.6s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

const checkingDotPulse = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.55, transform: "scale(0.92)" },
});

export const checkingChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  flexShrink: 0,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  paddingInline: vars.density.d2,
  // audit-allow: px — chip vertical padding 2px is below minimum density token granularity
  paddingBlock: "2px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.hover,
  color: vars.color.text.muted,
});

export const checkingDot = style({
  // audit-allow: px — sub-density pulse dot, sits below d1
  width: "6px",
  // audit-allow: px — sub-density pulse dot, sits below d1
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.accent.primary,
  flexShrink: 0,
  animation: `${checkingDotPulse} 1.5s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

const skeletonShimmer = keyframes({
  "0%, 100%": { opacity: 0.55 },
  "50%": { opacity: 1 },
});

export const actionSkeleton = style({
  // audit-allow: px — matches the 36×20 toggle footprint so the resolved control swaps in without layout shift
  width: "36px",
  // audit-allow: px — matches the 36×20 toggle footprint so the resolved control swaps in without layout shift
  height: "20px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.hover,
  flexShrink: 0,
  animation: `${skeletonShimmer} 1.5s ease-in-out infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0.7,
    },
  },
});

export const setupCta = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.onColor.tertiary,
  background: vars.color.accent.tertiary,
  border: "none",
  cursor: "pointer",
  paddingInline: vars.density.d4,
  paddingBlock: vars.density.d2,
  borderRadius: vars.radius.full,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      transform: "translateY(-1px)",
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.tertiary}`,
      outlineOffset: vars.focus.offset,
    },
  },
});

globalStyle(`.${installCard} input[type="file"]`, {
  display: "none",
});
