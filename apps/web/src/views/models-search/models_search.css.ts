import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const pulse = keyframes({
  "0%, 100%": { opacity: 0.45 },
  "50%": { opacity: 0.75 },
});

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.padSection,
  paddingBlock: vars.density.padSection,
  // audit-allow: px — fixed maximum content width; matches Deployments-Index reference
  maxWidth: "1600px",
  marginInline: "auto",
  width: "100%",
  flex: 1,
  minWidth: 0,
  boxSizing: "border-box",
});

export const heroCount = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.accent.primary,
  letterSpacing: "0.02em",
  fontVariantNumeric: "tabular-nums",
});

export const grid = style({
  display: "grid",
  gap: vars.density.gapCard,
  // audit-allow: px — narrow-viewport minimum card width
  gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
  width: "100%",
  "@media": {
    // audit-allow: px — Spectral Graphite responsive breakpoint per design brief §2.3
    "(min-width: 1280px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    // audit-allow: px — Spectral Graphite responsive breakpoint per design brief §2.3
    "(min-width: 960px) and (max-width: 1279px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    // audit-allow: px — single-column reflow below 960px
    "(max-width: 959px)": { gridTemplateColumns: "1fr" },
  },
});

export const filterBar = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  paddingBlock: vars.density.d4,
  paddingInline: vars.density.d5,
  background: `color-mix(in oklch, ${vars.color.bg.canvas} 78%, transparent)`,
  borderRadius: vars.radius.panel,
  position: "sticky",
  top: 0,
  zIndex: 4,
  backdropFilter: "blur(20px) saturate(1.2)",
});

export const filterRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.density.d2,
});

export const filterLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.muted,
  marginRight: vars.density.d2,
});

export const separator = style({
  width: "1px",
  height: vars.density.d4,
  background: vars.color.outline.variant,
  opacity: 0.35,
  marginInline: vars.density.d2,
});

export const chip = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  height: vars.control.heightSm,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.full,
  background: vars.color.bg.lowest,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
    outlineOffset: vars.focus.offset,
  },
});

export const chipActive = style({
  background: `color-mix(in oklch, ${vars.color.accent.primary} 18%, transparent)`,
  color: vars.color.accent.primary,
});

export const chipDisabled = style({
  cursor: "default",
  opacity: 0.5,
});

export const toggleSwitch = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  cursor: "pointer",
  border: "none",
  background: "transparent",
  paddingInline: vars.density.d2,
  paddingBlock: vars.density.d1,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
    outlineOffset: vars.focus.offset,
  },
});

export const toggleTrack = style({
  position: "relative",
  // audit-allow: px — fixed inline switch geometry below density token granularity
  width: "30px",
  // audit-allow: px — fixed inline switch geometry below density token granularity
  height: "16px",
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.full,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const toggleTrackOn = style({
  background: vars.color.accent.primary,
});

export const toggleThumb = style({
  position: "absolute",
  // audit-allow: px — sub-density alignment for 30×16 switch geometry
  top: "2px",
  // audit-allow: px — sub-density alignment for 30×16 switch geometry
  left: "2px",
  // audit-allow: px — sub-density thumb geometry for 30×16 switch
  width: "12px",
  // audit-allow: px — sub-density thumb geometry for 30×16 switch
  height: "12px",
  borderRadius: vars.radius.full,
  background: vars.color.text.primary,
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const toggleThumbOn = style({
  // audit-allow: px — sub-density thumb travel for 30×16 switch geometry
  transform: "translateX(14px)",
});

export const sortRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d4,
});

export const sortMenu = style({
  position: "relative",
});

export const sortButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  appearance: "none",
  border: "none",
  cursor: "pointer",
  height: vars.control.heightMd,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.control,
  background: vars.color.bg.panel,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  ":hover": {
    background: vars.color.bg.hover,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
    outlineOffset: vars.focus.offset,
  },
});

export const sortPanel = style({
  position: "absolute",
  right: 0,
  top: `calc(100% + ${vars.density.d2})`,
  // audit-allow: px — fixed dropdown minimum width
  minWidth: "200px",
  background: `color-mix(in oklch, ${vars.color.bg.elevated} 92%, transparent)`,
  borderRadius: vars.radius.panel,
  padding: vars.density.d2,
  boxShadow: vars.shadow.lg,
  zIndex: 20,
  backdropFilter: "blur(20px) saturate(1.2)",
});

export const sortOption = style({
  appearance: "none",
  border: "none",
  display: "block",
  width: "100%",
  textAlign: "left",
  paddingBlock: vars.density.d2,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  cursor: "pointer",
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
    outlineOffset: "-2px",
  },
});

export const sortOptionActive = style({
  color: vars.color.accent.primary,
});

export const viewToggle = style({
  display: "inline-flex",
  // audit-allow: px — track inset 2px is sub-density (gap below d1)
  gap: "2px",
  background: vars.color.bg.panel,
  // audit-allow: px — track padding 3px is sub-density (below d1)
  padding: "3px",
  borderRadius: vars.radius.control,
});

export const viewToggleButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  width: vars.control.heightSm,
  height: vars.control.heightSm,
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.muted,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": { color: vars.color.text.primary },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
    outlineOffset: vars.focus.offset,
  },
});

export const viewToggleButtonActive = style({
  background: vars.color.bg.elevated,
  color: vars.color.text.primary,
});

export const gridList = style({
  gridTemplateColumns: "1fr",
  "@media": {
    // audit-allow: px — list view forces single column at any width
    "(min-width: 0px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const bannerDegraded = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  paddingBlock: vars.density.d2,
  paddingInline: vars.density.d4,
  background: `color-mix(in oklch, ${vars.color.warning.base} 12%, transparent)`,
  color: vars.color.warning.text,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

export const skeletonCard = style({
  // audit-allow: px — fixed skeleton height matches the dense card silhouette
  height: "260px",
  borderRadius: vars.radius.card,
  background: vars.color.bg.panel,
  animation: `${pulse} 1.4s ${vars.motion.easingDefault} infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0.5,
    },
  },
});

export const paginator = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d4,
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d2,
});

export const paginatorPages = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  fontVariantNumeric: "tabular-nums",
});

export const pageButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  // audit-allow: px — fixed pagination tap target geometry
  minWidth: "32px",
  height: vars.control.heightMd,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  fontVariantNumeric: "tabular-nums",
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":disabled": { opacity: 0.3, cursor: "not-allowed" },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
    outlineOffset: vars.focus.offset,
  },
});

export const pageButtonActive = style({
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
});

export const pageEllipsis = style({
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  paddingInline: vars.density.d1,
});

export const pageSizeSelect = style({
  appearance: "none",
  cursor: "pointer",
  height: vars.control.heightMd,
  // audit-allow: px — select padding-right 28px provides clearance for the dropdown chevron
  paddingInline: `${vars.density.d3} 28px ${vars.density.d3}`,
  borderRadius: vars.radius.control,
  background: vars.color.bg.panel,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  border: "none",
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'><path d='M2 4l3 3 3-3' stroke='%23aaabae' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: `right ${vars.density.d3} center`,
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.accent}`,
    outlineOffset: vars.focus.offset,
  },
});

export const queryInput = style([
  chip,
  {
    flex: 1,
    // audit-allow: px — fixed search field geometry constraints
    minWidth: "260px",
    // audit-allow: px — fixed search field geometry constraints
    maxWidth: "440px",
    paddingInline: vars.density.d4,
    textTransform: "none",
    letterSpacing: "normal",
    fontFamily: vars.font.code,
    fontSize: vars.font.size.bodySm,
  },
]);

export const screenReaderOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  border: 0,
});

export const cardVariants = styleVariants({
  grid: {},
  list: {
    gridColumn: "1 / -1",
  },
});
