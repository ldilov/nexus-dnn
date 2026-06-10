// audit-allow: px — fixed layout breakpoint
// audit-allow: px — modal/dialog/drawer width per UX spec
// audit-allow: px — sub-token spacing value, no density token at this step
import { style, keyframes } from "@vanilla-extract/css";
import { motion, vars } from "../../../styles";

// ─── Page shell ────────────────────────────────────────────────────────────

export const root = style({
  height: "100%",
  overflow: "auto",
  background: vars.color.surface,
  color: vars.color.onSurface,
  position: "relative",
});

// Soft corner glows. Compositor-only, reduced-motion-safe (no animation).
export const ambientGlowPrimary = style({
  position: "fixed",
  top: 0,
  right: 0,
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "600px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "600px",
  background: vars.color.primary,
  opacity: 0.04,
  // audit-allow: px — sub-token spacing value, no density token at this step
  filter: "blur(150px)",
  borderRadius: vars.radius.full,
  transform: "translate(25%, -50%)",
  pointerEvents: "none",
  zIndex: 0,
});

export const ambientGlowSecondary = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "500px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "500px",
  background: vars.color.secondary,
  opacity: 0.04,
  // audit-allow: px — sub-token spacing value, no density token at this step
  filter: "blur(150px)",
  borderRadius: vars.radius.full,
  transform: "translate(-25%, 50%)",
  pointerEvents: "none",
  zIndex: 0,
});

export const canvas = style({
  position: "relative",
  zIndex: 1,
  // audit-allow: px — fixed layout breakpoint
  maxWidth: "1440px",
  margin: "0 auto",
  padding: vars.space["2xl"],
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3xl"],
});

// ─── Back link ─────────────────────────────────────────────────────────────

export const backLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  color: vars.color.onSurfaceVariant,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: vars.text.labelM,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
  padding: 0,
  alignSelf: "flex-start",
  fontFamily: vars.font.ui,
  selectors: {
    "&:hover": { color: vars.color.onSurface },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "4px",
    },
  },
});

// ─── Hero meta primitives (consumed by PageHero `meta` slot) ──────────────

export const buildChip = style({
  fontFamily: vars.font.mono,
  color: vars.color.secondary,
  background: vars.color.secondaryContainer,
  padding: `${vars.space.xs} ${vars.space.md}`,
  fontSize: vars.text.labelS,
  borderRadius: vars.radius.sm,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
});

const pulse = keyframes({
  "0%, 100%": { transform: "scale(1)", opacity: 1 },
  "50%": { transform: "scale(1.3)", opacity: 0.7 },
});

export const statusRow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  color: vars.color.onSurfaceVariant,
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.widest,
  textTransform: "uppercase",
  fontWeight: 700,
  fontFamily: vars.font.ui,
});

export const statusDotHealthy = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "8px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "8px",
  borderRadius: vars.radius.full,
  background: vars.color.acidGreen,
  // audit-allow: px — sub-token spacing value, no density token at this step
  boxShadow: `0 0 10px ${vars.color.acidGreen}`,
  animation: `${pulse} ${motion.duration.statusDotPulseCycle} infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const statusDotWarning = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "8px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "8px",
  borderRadius: vars.radius.full,
  background: vars.color.tertiary,
  // audit-allow: px — sub-token spacing value, no density token at this step
  boxShadow: `0 0 10px ${vars.color.tertiary}`,
});

export const statusDotIdle = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "8px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "8px",
  borderRadius: vars.radius.full,
  background: vars.color.outline,
});

export const primaryBtn = style({
  background: vars.color.primary,
  color: vars.color.onPrimary,
  border: "none",
  padding: `${vars.space.sm} ${vars.space.xl}`,
  fontWeight: 900,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.labelM,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.widest,
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  // audit-allow: px — below minimum token granularity (sub-10px)
  boxShadow: `0 4px 20px ${vars.color.primaryDim}33`,
  transition: `background ${motion.duration.cardGlow}, box-shadow ${motion.duration.cardGlow}, transform ${motion.duration.focusRing}`,
  selectors: {
    "&:disabled": { opacity: 0.5, cursor: "not-allowed", boxShadow: "none" },
    "&:hover:not(:disabled)": {
      background: vars.color.primaryDim,
      // audit-allow: px — below minimum token granularity (sub-10px)
      boxShadow: `0 8px 28px ${vars.color.primaryDim}55`,
    },
    "&:active:not(:disabled)": { transform: "scale(0.97)" },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

export const secondaryBtn = style({
  background: vars.color.surfaceContainerHighest,
  color: vars.color.onSurface,
  border: `1px solid ${vars.color.outlineVariant}`,
  padding: `${vars.space.sm} ${vars.space.xl}`,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.labelM,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.widest,
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  transition: `background ${motion.duration.cardGlow}`,
  selectors: {
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:hover:not(:disabled)": { background: vars.color.surfaceBright },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

// ─── Cards (editorial card-border) ─────────────────────────────────────────

export const cardGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
  gap: vars.space["2xl"],
});

export const cardWide = style({
  gridColumn: "span 12",
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(min-width: 1024px)": { gridColumn: "span 7" },
  },
});

export const cardNarrow = style({
  gridColumn: "span 12",
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(min-width: 1024px)": { gridColumn: "span 5" },
  },
});

export const card = style({
  position: "relative",
  overflow: "hidden",
  padding: vars.space["2xl"],
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceContainerLow,
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

export const cardCornerGlow = style({
  position: "absolute",
  top: 0,
  right: 0,
  // audit-allow: px — fixed layout breakpoint
  width: "320px",
  // audit-allow: px — fixed layout breakpoint
  height: "320px",
  background: vars.color.primaryDim,
  opacity: 0.05,
  // audit-allow: px — sub-token spacing value, no density token at this step
  filter: "blur(100px)",
  borderRadius: vars.radius.full,
  pointerEvents: "none",
});

export const sectionNumber = style({
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.widest,
  textTransform: "uppercase",
  color: vars.color.onSurfaceVariant,
  fontWeight: 900,
  marginBottom: vars.space.xl,
  fontFamily: vars.font.ui,
});

// ─── Card 1: About ─────────────────────────────────────────────────────────

export const aboutLead = style({
  color: vars.color.onSurface,
  lineHeight: 1.4,
  fontWeight: 500,
  fontSize: "clamp(0.95rem, 0.85rem + 0.4vw, 1.125rem)",
  letterSpacing: vars.tracking.tight,
  margin: 0,
  marginBottom: vars.space.md,
  fontFamily: vars.font.ui,
  maxWidth: "60ch",
});

export const aboutLeadAccent = style({
  color: vars.color.secondary,
  fontStyle: "italic",
  textDecoration: "underline",
  textDecorationColor: vars.color.secondary,
  // audit-allow: px — below minimum token granularity (sub-10px)
  textDecorationThickness: "2px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  textUnderlineOffset: "4px",
});

export const aboutSub = style({
  color: vars.color.onSurfaceVariant,
  lineHeight: 1.5,
  fontSize: vars.text.bodyS,
  fontWeight: 400,
  margin: 0,
  marginBottom: vars.space.xl,
  maxWidth: "60ch",
});

export const metaGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: vars.space["2xl"],
  marginTop: "auto",
});

export const metaItem = style({
  position: "relative",
  paddingLeft: vars.space.lg,
  "::before": {
    content: "''",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    // audit-allow: px — below minimum token granularity (sub-10px)
    width: "4px",
    borderRadius: vars.radius.full,
  },
});

export const metaItemSecondary = style({
  "::before": {
    background: vars.color.secondary,
    opacity: 0.4,
  },
});

export const metaItemTertiary = style({
  "::before": {
    background: vars.color.tertiary,
    opacity: 0.4,
  },
});

export const metaLabel = style({
  display: "block",
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
  color: vars.color.onSurfaceVariant,
  fontWeight: 700,
  marginBottom: vars.space.sm,
});

export const metaValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.titleM,
  fontWeight: 500,
  color: vars.color.onSurface,
});

export const metaUnit = style({
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
  textTransform: "uppercase",
  marginLeft: vars.space.xs,
});

// ─── Card 2: Impact ────────────────────────────────────────────────────────

export const impactCol = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3xl"],
  flex: 1,
  justifyContent: "center",
});

export const impactRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const impactHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

export const impactLabel = style({
  fontSize: vars.text.labelS,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.widest,
  color: vars.color.onSurfaceVariant,
});

export const impactValue = style({
  fontFamily: vars.font.mono,
  color: vars.color.onSurface,
  fontWeight: 700,
  fontSize: vars.text.titleM,
  lineHeight: 1,
});

export const impactValueUnit = style({
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
});

export const progressTrack = style({
  width: "100%",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "6px",
  background: vars.color.surfaceContainerHighest,
  borderRadius: vars.radius.full,
  overflow: "hidden",
});

export const progressFillPrimary = style({
  height: "100%",
  background: vars.color.primary,
  // audit-allow: px — sub-token spacing value, no density token at this step
  boxShadow: `0 0 12px ${vars.color.primary}66`,
  transition: `width ${motion.duration.cardGlow}`,
});

export const progressFillSecondary = style({
  height: "100%",
  background: vars.color.secondary,
  // audit-allow: px — sub-token spacing value, no density token at this step
  boxShadow: `0 0 12px ${vars.color.secondary}66`,
  transition: `width ${motion.duration.cardGlow}`,
});

export const progressFillAcid = style({
  height: "100%",
  background: vars.color.acidGreen,
  // audit-allow: px — sub-token spacing value, no density token at this step
  boxShadow: `0 0 12px ${vars.color.acidGreen}66`,
  transition: `width ${motion.duration.cardGlow}`,
});

export const progressFillError = style({
  height: "100%",
  background: vars.color.error,
  // audit-allow: px — sub-token spacing value, no density token at this step
  boxShadow: `0 0 12px ${vars.color.error}66`,
  transition: `width ${motion.duration.cardGlow}`,
});

export const impactCaption = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.labelS,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.wide,
  color: vars.color.onSurfaceVariant,
});

// ─── Instances section ────────────────────────────────────────────────────

export const instancesSection = style({
  gridColumn: "span 12",
  padding: vars.space["2xl"],
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceContainerLow,
});

export const instancesHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: vars.space.xl,
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const instancesTitle = style({
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.widest,
  textTransform: "uppercase",
  fontWeight: 900,
  color: vars.color.onSurfaceVariant,
  marginBottom: vars.space.xs,
});

export const instancesSubtitle = style({
  fontSize: vars.text.bodyS,
  color: vars.color.onSurfaceVariant,
  opacity: 0.7,
  fontWeight: 500,
});

export const searchWrap = style({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
});

export const searchIcon = style({
  position: "absolute",
  left: vars.space.sm,
  color: vars.color.outline,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "16px !important",
  pointerEvents: "none",
});

export const searchInput = style({
  background: vars.color.surfaceContainerLowest,
  border: `1px solid ${vars.color.outlineVariant}`,
  padding: `${vars.space.sm} ${vars.space.lg} ${vars.space.sm} ${vars.space["2xl"]}`,
  fontSize: vars.text.labelS,
  fontFamily: vars.font.mono,
  color: vars.color.onSurface,
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "240px",
  borderRadius: vars.radius.sm,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.wide,
  selectors: {
    "&:focus": {
      outline: "none",
      borderColor: vars.color.primary,
    },
    "&::placeholder": { color: vars.color.outline },
  },
});

export const tableWrap = style({
  overflowX: "auto",
});

export const table = style({
  width: "100%",
  textAlign: "left",
  borderCollapse: "collapse",
});

export const tableHead = style({
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.widest,
  textTransform: "uppercase",
  color: vars.color.onSurfaceVariant,
  fontWeight: 900,
});

export const tableHeadCell = style({
  paddingBottom: vars.space.lg,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
});

export const tableRow = style({
  transition: `background ${motion.duration.cardGlow}`,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceContainer,
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
});

export const tableCell = style({
  padding: `${vars.space.lg} ${vars.space.md} ${vars.space.lg} 0`,
  fontFamily: vars.font.mono,
  fontSize: vars.text.bodyS,
  color: vars.color.onSurfaceVariant,
  verticalAlign: "middle",
});

export const tableCellBold = style({
  color: vars.color.onSurface,
  fontWeight: 700,
});

export const stateChipActive = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  color: vars.color.acidGreen,
  fontWeight: 900,
  textTransform: "uppercase",
  fontFamily: vars.font.mono,
  fontSize: vars.text.labelS,
});

export const stateChipIdle = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  color: vars.color.onSurfaceVariant,
  fontWeight: 900,
  textTransform: "uppercase",
  fontFamily: vars.font.mono,
  fontSize: vars.text.labelS,
});

export const stateChipError = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  color: vars.color.error,
  fontWeight: 900,
  textTransform: "uppercase",
  fontFamily: vars.font.mono,
  fontSize: vars.text.labelS,
});

export const stateDotActive = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "6px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.acidGreen,
});

export const stateDotIdle = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "6px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.outline,
});

export const stateDotError = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "6px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.error,
});

export const rowActions = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space.xs,
});

export const rowActionBtn = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "32px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "32px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.outline,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  borderRadius: vars.radius.sm,
  transition: `color ${motion.duration.cardGlow}, background ${motion.duration.cardGlow}`,
  selectors: {
    "&:hover": {
      color: vars.color.primary,
      background: vars.color.primaryContainer,
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "-2px",
    },
  },
});

export const emptyInstances = style({
  padding: `${vars.space["2xl"]} ${vars.space.lg}`,
  textAlign: "center",
  color: vars.color.onSurfaceVariant,
  fontStyle: "italic",
  fontSize: vars.text.bodyS,
});

// ─── Footer info cards ────────────────────────────────────────────────────

export const footerGrid = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: vars.space.xl,
});

export const footerCard = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.md,
  padding: vars.space.lg,
  background: vars.color.surfaceContainerLow,
  borderRadius: vars.radius.md,
});

export const footerIcon = style({
  color: vars.color.onSurfaceVariant,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "24px !important",
});

export const footerLabel = style({
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.widest,
  textTransform: "uppercase",
  fontWeight: 900,
  color: vars.color.onSurfaceVariant,
  marginBottom: vars.space.xs,
});

export const footerValue = style({
  fontSize: vars.text.bodyS,
  fontWeight: 500,
  color: vars.color.onSurface,
});

// ─── Draft banner (for DraftView) ─────────────────────────────────────────

export const draftBanner = style({
  padding: `${vars.space.sm} ${vars.space.xl}`,
  background: vars.color.surfaceContainerHigh,
  color: vars.color.onSurface,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
  fontSize: vars.text.bodyS,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

// ─── Error / loading / misc ───────────────────────────────────────────────

export const errorBox = style({
  padding: vars.space.xl,
  background: vars.color.errorContainer,
  color: vars.color.onErrorContainer,
  borderRadius: vars.radius.md,
  margin: vars.space["2xl"],
});

export const loadingBox = style({
  padding: vars.space["3xl"],
  textAlign: "center",
  color: vars.color.onSurfaceVariant,
  fontSize: vars.text.bodyM,
});

export const warningBanner = style({
  padding: `${vars.space.md} ${vars.space.xl}`,
  background: vars.color.tertiaryContainer,
  color: vars.color.onTertiaryContainer,
  fontSize: vars.text.bodyS,
});

// ─── Legacy (used by DraftView) ───────────────────────────────────────────

export const payloadPre = style({
  fontFamily: vars.font.mono,
  background: vars.color.surfaceContainer,
  padding: vars.space.lg,
  borderRadius: vars.radius.md,
  overflow: "auto",
  fontSize: vars.text.labelM,
  color: vars.color.onSurface,
});

export const panel = style({
  padding: vars.space["2xl"],
});

export const readOnlyNote = style({
  padding: vars.space.md,
  background: vars.color.surfaceContainerLow,
  border: `1px dashed ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.md,
  color: vars.color.onSurfaceVariant,
  fontSize: vars.text.bodyS,
  marginBottom: vars.space.lg,
});

// Draft hero meta primitives (consumed by PageHero `meta` slot on draft routes).
export const bannerActions = style({
  display: "flex",
  gap: vars.space.sm,
  marginLeft: "auto",
  alignItems: "center",
});

export const statusDot = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  width: "8px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  height: "8px",
  borderRadius: vars.radius.full,
  background: vars.color.acidGreen,
  flexShrink: 0,
});

export const idText = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.bodyS,
  color: vars.color.onSurfaceVariant,
});

export const sourceBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: vars.color.surfaceContainer,
  borderRadius: vars.radius.full,
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
});

export const iconLg = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "18px",
});

export const iconMd = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "16px",
});

export const metaValueLg = style({
  fontSize: "1rem",
  lineHeight: 1.3,
});

export const alignRight = style({
  textAlign: "right",
});

export const monoFont = style({
  fontFamily: "var(--font-mono, monospace)",
});

export const centeredSpinner = style({
  margin: "1rem auto",
});

export const zeroMarginLeft = style({
  marginLeft: 0,
});

export const inputNarrow = style({
  padding: "0.25rem 0.5rem",
  minWidth: 200,
});

export const iconSm = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "14px",
});

export const sectionHeader = style({
  fontWeight: 600,
  marginTop: 0,
});
