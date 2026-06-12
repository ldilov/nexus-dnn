// audit-allow: px — fixed layout breakpoint
// audit-allow: px — modal/dialog/drawer width per UX spec
// audit-allow: px — sub-token spacing value, no density token at this step
import { style } from "@vanilla-extract/css";
import { motion, vars } from "../../styles";

export const root = style({
  height: "100%",
  overflow: "auto",
  background: vars.color.surface,
  color: vars.color.onSurface,
  position: "relative",
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
  gap: vars.space["2xl"],
});

export const ambientGlow = style({
  position: "fixed",
  top: 0,
  right: 0,
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "500px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "500px",
  background: vars.color.primary,
  opacity: 0.04,
  // audit-allow: px — sub-token spacing value, no density token at this step
  filter: "blur(150px)",
  borderRadius: vars.radius.full,
  transform: "translate(25%, -50%)",
  pointerEvents: "none",
  zIndex: 0,
});

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
  },
});

// ─── Hero accent (consumed by PageHero `title` slot) ──────────────────────

export const titleAccent = style({
  color: vars.color.primary,
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
  transition: `background ${motion.duration.cardGlow}, box-shadow ${motion.duration.cardGlow}`,
  selectors: {
    "&:disabled": { opacity: 0.5, cursor: "not-allowed", boxShadow: "none" },
    "&:hover:not(:disabled)": {
      background: vars.color.primaryDim,
      // audit-allow: px — below minimum token granularity (sub-10px)
      boxShadow: `0 8px 28px ${vars.color.primaryDim}55`,
    },
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
  selectors: {
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:hover:not(:disabled)": { background: vars.color.surfaceBright },
  },
});

// ─── Recipe pill row ──────────────────────────────────────────────────────

export const pillRow = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
  paddingBottom: vars.space.md,
});

export const primaryStar = style({
  color: vars.color.primary,
});

// ─── Section framing ──────────────────────────────────────────────────────

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const sectionNumber = style({
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.widest,
  textTransform: "uppercase",
  color: vars.color.onSurfaceVariant,
  fontWeight: 900,
  fontFamily: vars.font.ui,
  margin: 0,
});

export const overview = style({
  color: vars.color.onSurfaceVariant,
  lineHeight: 1.55,
  fontSize: vars.text.bodyL,
  fontWeight: 300,
  margin: 0,
  maxWidth: "70ch",
});

// ─── Recipe steps ─────────────────────────────────────────────────────────

export const stepList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: 0,
  margin: 0,
  listStyle: "none",
});

export const step = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gap: vars.space.lg,
  padding: vars.space.lg,
  background: vars.color.surfaceContainerLow,
  border: "1px solid transparent",
  borderRadius: vars.radius.md,
  transition: `background ${motion.duration.cardGlow}, border-color ${motion.duration.cardGlow}`,
  alignItems: "start",
  selectors: {
    "&:hover": {
      background: vars.color.surfaceContainer,
      borderColor: `color-mix(in srgb, ${vars.color.primary} 25%, transparent)`,
    },
  },
  "@media": {
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

export const stepNumber = style({
  fontFamily: vars.font.mono,
  color: vars.color.onSurfaceVariant,
  fontWeight: 900,
  fontSize: vars.text.titleS,
  letterSpacing: vars.tracking.tight,
  minWidth: "2ch",
});

export const stepBody = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  minWidth: 0,
});

export const stepHeadRow = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const stepOp = style({
  fontFamily: vars.font.mono,
  color: vars.color.secondary,
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
});

export const stepTitle = style({
  fontSize: vars.text.bodyM,
  color: vars.color.onSurface,
  fontWeight: 600,
  fontFamily: vars.font.ui,
});

export const stepStageChip = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: `2px ${vars.space.sm}`,
  borderRadius: vars.radius.full,
  background: vars.color.surfaceContainerHigh,
  color: vars.color.onSurfaceVariant,
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
  fontWeight: 700,
  alignSelf: "start",
});

export const stepInputs = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  marginTop: vars.space.xs,
});

export const stepInputsLabel = style({
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
  fontWeight: 700,
  color: vars.color.onSurfaceVariant,
  opacity: 0.7,
});

export const stepInputRow = style({
  display: "grid",
  gridTemplateColumns: "auto auto 1fr",
  gap: vars.space.md,
  alignItems: "baseline",
  fontFamily: vars.font.mono,
  fontSize: vars.text.labelM,
  padding: `${vars.space.xs} 0`,
});

export const stepInputName = style({
  color: vars.color.onSurface,
  fontWeight: 600,
});

export const stepInputArrow = style({
  color: vars.color.onSurfaceVariant,
  opacity: 0.5,
});

export const stepInputSource = style({
  color: vars.color.onSurfaceVariant,
});

export const stepInputSourceExternal = style({
  color: vars.color.tertiary,
});

export const stepInputSourceRef = style({
  color: vars.color.secondary,
});

export const stepsStageHeader = style({
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.widest,
  textTransform: "uppercase",
  fontWeight: 900,
  opacity: 0.7,
  marginBottom: vars.space.sm,
  color: vars.color.onSurfaceVariant,
  fontFamily: vars.font.ui,
});

// ─── Workflow graph DAG ───────────────────────────────────────────────────

export const graphBox = style({
  background: vars.color.surfaceContainerLowest,
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  overflowX: "auto",
  overflowY: "hidden",
});

export const svgNode = style({
  fill: vars.color.surfaceContainerHighest,
  stroke: vars.color.outline,
  strokeWidth: 1,
});

export const svgNodeBoundary = style({
  fill: vars.color.surfaceContainerHighest,
  stroke: vars.color.primary,
  strokeWidth: 1.5,
});

export const svgNodeTitle = style({
  fill: vars.color.onSurface,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "13px",
  fontWeight: 700,
  fontFamily: vars.font.ui,
});

export const svgNodeOp = style({
  fill: vars.color.secondary,
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  fontFamily: vars.font.mono,
});

export const svgEdge = style({
  stroke: vars.color.outline,
  strokeWidth: 1.5,
  fill: "none",
  opacity: 0.8,
});

export const svgArrowFill = style({
  fill: vars.color.outline,
});

export const graphLegend = style({
  display: "flex",
  gap: vars.space.lg,
  flexWrap: "wrap",
  padding: vars.space.md,
  background: vars.color.surfaceContainerLow,
  borderRadius: vars.radius.md,
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
  fontFamily: vars.font.mono,
});

export const legendItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const legendSwatch = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "14px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "14px",
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.outlineVariant}`,
});

export const swatchNode = style({
  background: vars.color.surfaceContainerHigh,
});

export const swatchBoundary = style({
  background: vars.color.surfaceContainerHigh,
  borderColor: vars.color.primary,
});

export const instanceIdText = style({
  fontFamily: vars.font.mono,
  opacity: 0.6,
  fontSize: vars.text.labelS,
});

export const nodeTable = style({
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: vars.font.mono,
  fontSize: vars.text.bodyS,
});

export const nodeRow = style({
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
  selectors: {
    "&:hover": { background: vars.color.surfaceContainer },
    "&:last-child": { borderBottom: "none" },
  },
});

export const nodeCell = style({
  padding: `${vars.space.md} ${vars.space.md} ${vars.space.md} 0`,
  color: vars.color.onSurfaceVariant,
  verticalAlign: "top",
});

export const nodeCellBold = style({
  color: vars.color.onSurface,
  fontWeight: 700,
});

export const nodeKindChip = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: vars.color.secondaryContainer,
  color: vars.color.onSecondaryContainer,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.mono,
  fontSize: vars.text.labelS,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
});

export const emptyGraph = style({
  padding: vars.space["3xl"],
  textAlign: "center",
  color: vars.color.onSurfaceVariant,
  fontStyle: "italic",
});

// ─── Instances list (bottom of page) ──────────────────────────────────────

export const instancesSection = style({
  padding: vars.space["2xl"],
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceContainerLow,
});

export const instancesRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: `${vars.space.md} 0`,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
  selectors: {
    "&:last-child": { borderBottom: "none" },
  },
});

// ─── Dry-run inline plan ──────────────────────────────────────────────────

export const planBox = style({
  padding: vars.space.lg,
  background: vars.color.surfaceContainerLowest,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.md,
  fontFamily: vars.font.mono,
  fontSize: vars.text.bodyS,
  whiteSpace: "pre-wrap",
  color: vars.color.onSurface,
});

export const errorBox = style({
  padding: vars.space.lg,
  background: vars.color.errorContainer,
  color: vars.color.onErrorContainer,
  borderRadius: vars.radius.md,
});

export const loadingBox = style({
  padding: vars.space["2xl"],
  textAlign: "center",
  color: vars.color.onSurfaceVariant,
  fontStyle: "italic",
});

export const iconLg = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "18px",
});

export const iconMd = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "16px",
});

export const stackLarge = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const stackMedium = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
});

export const italic = style({
  fontStyle: "italic",
});

export const italicSpaced = style({
  fontStyle: "italic",
  marginTop: "0.5rem",
});

export const graphBoxTall = style({
  // audit-allow: px — fixed layout breakpoint
  height: "560px",
  padding: 0,
});

export const centerCell = style({
  textAlign: "center",
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "40px",
});

export const bold = style({
  fontWeight: 600,
});
