import { style, styleVariants, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

const pulse = keyframes({
  "0%, 100%": { opacity: 0.4 },
  "50%": { opacity: 0.7 },
});

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: "28px",
  padding: "32px 40px 80px",
  maxWidth: "1600px",
  margin: "0 auto",
  width: "100%",
  flex: 1,
  minWidth: 0,
  boxSizing: "border-box",
});

export const grid = style({
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
  width: "100%",
  "@media": {
    "(max-width: 900px)": { gridTemplateColumns: "1fr" },
  },
});

export const heroCount = style({
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.accent.primary,
  fontWeight: 600,
});

export const filterBar = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "16px 20px",
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  position: "sticky",
  top: "16px",
  zIndex: 4,
  backdropFilter: "blur(16px)",
});

export const filterRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "10px",
});

export const filterLabel = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: 700,
  color: vars.color.text.muted,
  marginRight: "4px",
});

export const separator = style({
  width: "1px",
  height: "16px",
  background: vars.color.outline.variant,
  opacity: 0.3,
  margin: "0 4px",
});

export const chip = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  padding: "6px 14px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.panel,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
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
  gap: "10px",
  cursor: "pointer",
  border: "none",
  background: "transparent",
  padding: "6px 10px",
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: "11px",
  fontWeight: 600,
  color: vars.color.text.secondary,
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
    outlineOffset: "2px",
  },
});

export const toggleTrack = style({
  position: "relative",
  width: "30px",
  height: "16px",
  background: vars.color.bg.elevated,
  borderRadius: "999px",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const toggleTrackOn = style({
  background: vars.color.accent.primary,
});

export const toggleThumb = style({
  position: "absolute",
  top: "2px",
  left: "2px",
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: vars.color.text.primary,
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const toggleThumbOn = style({
  transform: "translateX(14px)",
});

export const sortRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
});

export const sortMenu = style({
  position: "relative",
});

export const sortButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  appearance: "none",
  border: "none",
  cursor: "pointer",
  padding: "8px 14px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.panel,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: "12px",
  fontWeight: 600,
  ":hover": {
    background: vars.color.bg.hover,
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
    outlineOffset: "2px",
  },
});

export const sortPanel = style({
  position: "absolute",
  right: 0,
  top: "calc(100% + 6px)",
  minWidth: "180px",
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.panel,
  padding: "6px",
  boxShadow: vars.shadow.lg,
  zIndex: 20,
  backdropFilter: "blur(16px)",
});

export const sortOption = style({
  appearance: "none",
  border: "none",
  display: "block",
  width: "100%",
  textAlign: "left",
  padding: "8px 12px",
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: "12px",
  cursor: "pointer",
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
    outlineOffset: "-2px",
  },
});

export const sortOptionActive = style({
  color: vars.color.accent.primary,
});

export const viewToggle = style({
  display: "inline-flex",
  gap: "2px",
  background: vars.color.bg.panel,
  padding: "3px",
  borderRadius: vars.radius.control,
});

export const viewToggleButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  padding: "6px 10px",
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.muted,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": { color: vars.color.text.primary },
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
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
  gap: "12px",
  padding: "10px 16px",
  background: vars.color.bg.panel,
  color: vars.color.warning.text,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: "12px",
});

export const skeletonCard = style({
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
  gap: "16px",
  padding: "80px 24px",
  textAlign: "center",
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
});

export const emptyIcon = style({
  fontSize: "48px",
  color: vars.color.text.muted,
});

export const emptyTitle = style({
  fontFamily: vars.font.headline,
  fontSize: "20px",
  fontWeight: 700,
  color: vars.color.text.primary,
  margin: 0,
});

export const emptyHint = style({
  fontFamily: vars.font.ui,
  fontSize: "13px",
  color: vars.color.text.secondary,
  maxWidth: "420px",
});

export const emptyAction = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  padding: "8px 16px",
  marginTop: "8px",
  borderRadius: vars.radius.control,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  fontFamily: vars.font.ui,
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  ":hover": { background: vars.color.accent.primaryHover },
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
    outlineOffset: "2px",
  },
});

export const errorState = style([
  emptyState,
  { borderLeft: `3px solid ${vars.color.error.base}` },
]);

export const paginator = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  padding: "8px 4px",
});

export const paginatorPages = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
});

export const pageButton = style({
  appearance: "none",
  border: "none",
  cursor: "pointer",
  minWidth: "32px",
  height: "32px",
  padding: "0 8px",
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  fontSize: "12px",
  fontWeight: 600,
  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
  ":disabled": { opacity: 0.3, cursor: "not-allowed" },
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
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
  fontSize: "12px",
  padding: "0 4px",
});

export const pageSizeSelect = style({
  appearance: "none",
  cursor: "pointer",
  padding: "6px 28px 6px 10px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.panel,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: "12px",
  border: "none",
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'><path d='M2 4l3 3 3-3' stroke='%23aaabae' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
    outlineOffset: "2px",
  },
});

export const queryInput = style([
  chip,
  {
    flex: 1,
    minWidth: "240px",
    maxWidth: "420px",
    padding: "8px 14px",
    textTransform: "none",
    letterSpacing: "normal",
    fontFamily: vars.font.code,
    fontSize: "12px",
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
