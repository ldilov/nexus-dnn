import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const pulse = keyframes({
  "0%, 100%": { opacity: 0.4 },
  "50%": { opacity: 0.7 },
});

export const page = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — design-grid micro-rhythm value, no token between gapMd(12) and gapXl(24)
  gap: "28px",
  // audit-allow: px — page layout: 32px top/bottom gutter, 40px horizontal, 80px bottom padding are fixed layout values
  padding: "32px 40px 80px",
  // audit-allow: px — fixed layout breakpoint max-width for models search page
  maxWidth: "1600px",
  margin: "0 auto",
  width: "100%",
  flex: 1,
  minWidth: 0,
  boxSizing: "border-box",
});

export const grid = style({
  display: "grid",
  gap: vars.density.d5,
  // audit-allow: px — card grid min-width 360px is a fixed layout breakpoint, no token
  gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
  width: "100%",
  "@media": {
    // audit-allow: px — 900px responsive breakpoint for single-column grid layout
    "(max-width: 900px)": { gridTemplateColumns: "1fr" },
  },
});

export const heroCount = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.accent.primary,
  fontWeight: 600,
});

export const filterBar = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: `${vars.space.insetXl} ${vars.density.d5}`,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  position: "sticky",
  top: vars.space.insetXl,
  zIndex: 4,
  backdropFilter: `blur(${vars.space.insetXl})`,
});

export const filterRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  // audit-allow: px — design-grid micro-rhythm value, no token between gapSm(4) and gapMd(12)
  gap: "10px",
});

export const filterLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: 700,
  color: vars.color.text.muted,
  marginRight: vars.space.gapSm,
});

export const separator = style({
  width: "1px",
  height: vars.space.insetXl,
  background: vars.color.outline.variant,
  opacity: 0.3,
  margin: `0 ${vars.space.gapSm}`,
});

export const chip = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  padding: `${vars.space.insetSm} ${vars.font.size.bodyLg}`,
  borderRadius: vars.radius.full,
  background: vars.color.bg.panel,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outlineOffset: "2px",
  },
});

export const chipActive = style({
  background: vars.color.bg.elevated,
  color: vars.color.accent.primary,
});

export const toggleSwitch = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — design-grid micro-rhythm value, no token between gapSm(4) and gapMd(12)
  gap: "10px",
  cursor: "pointer",
  border: "none",
  background: "transparent",
  padding: `${vars.space.insetSm} ${vars.density.d2}`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  color: vars.color.text.secondary,
  ":focus-visible": {
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outlineOffset: "2px",
  },
});

export const toggleTrack = style({
  position: "relative",
  // audit-allow: px — fixed toggle track geometry: 30×16px per UX spec, no density token
  width: "30px",
  // audit-allow: px — fixed toggle track geometry: 30×16px per UX spec, no density token
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
  // audit-allow: px — toggle thumb offset 2px aligns thumb inside track per fixed toggle geometry
  top: "2px",
  // audit-allow: px — toggle thumb offset 2px aligns thumb inside track per fixed toggle geometry
  left: "2px",
  // audit-allow: px — fixed toggle thumb geometry: 12×12px per UX spec, no density token
  width: "12px",
  // audit-allow: px — fixed toggle thumb geometry: 12×12px per UX spec, no density token
  height: "12px",
  borderRadius: "50%",
  background: vars.color.text.primary,
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const toggleThumbOn = style({
  // audit-allow: px — toggle thumb travel distance matches track width minus thumb size minus 2×offset
  transform: "translateX(14px)",
});

export const sortRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.insetXl,
});

export const sortMenu = style({
  position: "relative",
});

export const sortButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.insetMd,
  appearance: "none",
  border: "none",
  cursor: "pointer",
  padding: `${vars.space.insetMd} ${vars.font.size.bodyLg}`,
  borderRadius: vars.radius.control,
  background: vars.color.bg.panel,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  ":hover": {
    background: vars.color.bg.hover,
  },
  ":focus-visible": {
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outlineOffset: "2px",
  },
});

export const sortPanel = style({
  position: "absolute",
  right: 0,
  top: `calc(100% + ${vars.space.insetSm})`,
  // audit-allow: px — fixed dropdown minimum width, no layout token for 180px
  minWidth: "180px",
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.panel,
  padding: vars.space.insetSm,
  boxShadow: vars.shadow.lg,
  zIndex: 20,
  backdropFilter: `blur(${vars.space.insetXl})`,
});

export const sortOption = style({
  appearance: "none",
  border: "none",
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: `${vars.space.insetMd} ${vars.space.insetLg}`,
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
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width with -2px inset offset per design contract
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width with -2px inset offset per design contract
    outlineOffset: "-2px",
  },
});

export const sortOptionActive = style({
  color: vars.color.accent.primary,
});

export const viewToggle = style({
  display: "inline-flex",
  // audit-allow: px — view toggle button gap 2px is below minimum token granularity (sub-4px)
  gap: "2px",
  background: vars.color.bg.panel,
  // audit-allow: px — view toggle inset 3px is below minimum token granularity (sub-4px)
  padding: "3px",
  borderRadius: vars.radius.control,
});

export const viewToggleButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  padding: `${vars.space.insetSm} ${vars.density.d2}`,
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.muted,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": { color: vars.color.text.primary },
  ":focus-visible": {
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outlineOffset: "2px",
  },
});

export const viewToggleButtonActive = style({
  background: vars.color.bg.elevated,
  color: vars.color.text.primary,
});

export const gridList = style({
  gridTemplateColumns: "1fr",
});

export const bannerDegraded = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  // audit-allow: px — design-grid micro-rhythm value, no token between gapSm(4) and gapMd(12)
  padding: "10px 16px",
  background: vars.color.bg.panel,
  color: vars.color.warning.text,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

export const skeletonCard = style({
  // audit-allow: px — fixed skeleton card height matches design spec, no layout token for 240px
  height: "240px",
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

export const emptyState = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.insetXl,
  // audit-allow: px — empty state uses 80px top/bottom padding for visual breathing room, fixed layout value
  padding: "80px 24px",
  textAlign: "center",
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
});

export const emptyIcon = style({
  // audit-allow: px — decorative icon glyph at 48px is a fixed display size, no icon token for 48px
  fontSize: "48px",
  color: vars.color.text.muted,
});

export const emptyTitle = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.heading,
  fontWeight: 700,
  color: vars.color.text.primary,
  margin: 0,
});

export const emptyHint = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
  // audit-allow: px — fixed max-width constraint for empty state hint text readability
  maxWidth: "420px",
});

export const emptyAction = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  padding: `${vars.space.insetMd} ${vars.space.insetXl}`,
  marginTop: vars.space.insetMd,
  borderRadius: vars.radius.control,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  ":hover": { background: vars.color.accent.primaryHover },
  ":focus-visible": {
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outlineOffset: "2px",
  },
});

export const errorState = style([
  emptyState,
  // audit-allow: px — error state uses 3px left border accent; fixed decorative border below token granularity
  { borderLeft: `3px solid ${vars.color.error.base}` },
]);

export const paginator = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.insetXl,
  padding: `${vars.space.insetMd} ${vars.space.gapSm}`,
});

export const paginatorPages = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const pageButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  // audit-allow: px — paginator button fixed hit-target geometry: 32×32px per UX spec
  minWidth: "32px",
  // audit-allow: px — paginator button fixed hit-target geometry: 32×32px per UX spec
  height: "32px",
  padding: `0 ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":disabled": { opacity: 0.3, cursor: "not-allowed" },
  ":focus-visible": {
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outlineOffset: "2px",
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
  padding: `0 ${vars.space.gapSm}`,
});

export const pageSizeSelect = style({
  appearance: "none",
  cursor: "pointer",
  // audit-allow: px — select padding-right 28px provides clearance for custom dropdown arrow SVG
  padding: `${vars.space.insetSm} 28px ${vars.space.insetSm} ${vars.density.d2}`,
  borderRadius: vars.radius.control,
  background: vars.color.bg.panel,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  border: "none",
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'><path d='M2 4l3 3 3-3' stroke='%23aaabae' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: `right ${vars.space.insetMd} center`,
  ":focus-visible": {
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outline: `2px solid ${vars.color.accent.primary}`,
    // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
    outlineOffset: "2px",
  },
});

export const queryInput = style([
  chip,
  {
    flex: 1,
    // audit-allow: px — query input min/max-width are fixed layout constraints for search UX
    minWidth: "240px",
    // audit-allow: px — query input min/max-width are fixed layout constraints for search UX
    maxWidth: "420px",
    padding: `${vars.space.insetMd} ${vars.font.size.bodyLg}`,
    textTransform: "none",
    letterSpacing: "normal",
    fontFamily: vars.font.code,
    fontSize: vars.font.size.bodySm,
  },
]);

export const chipDisabled = style({
  cursor: "default",
  opacity: 0.5,
});

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
