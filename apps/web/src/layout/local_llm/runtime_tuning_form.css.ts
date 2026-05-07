import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d4,
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  padding: `${vars.density.d3} ${vars.density.d4}`,
  borderRadius: vars.radius.card,
  background: `color-mix(in oklch, ${vars.color.text.primary} 2.5%, transparent)`,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
});

export const sectionTitle = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.density.d2,
  margin: 0,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
});

export const sectionIndex = style({
  fontFamily: vars.font.code,
  fontVariantNumeric: "tabular-nums",
  color: vars.color.accent.primary,
});

export const sectionDivider = style({
  color: vars.color.text.muted,
  opacity: 0.6,
});

export const sectionName = style({
  color: vars.color.text.primary,
});

export const summaryLabel = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.density.d2,
});

export const subSectionLabel = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.density.d2,
  marginTop: vars.density.d3,
  paddingTop: vars.density.d3,
  borderTop: `1px solid ${vars.color.outline.variant}`,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
});

export const advanced = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  padding: `${vars.density.d3} ${vars.density.d4}`,
  borderRadius: vars.radius.card,
  background: `color-mix(in oklch, ${vars.color.text.primary} 2.5%, transparent)`,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
});

export const advancedSummary = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  cursor: "pointer",
  listStyle: "none",
  userSelect: "none",
  color: vars.color.text.secondary,
  transition: `color ${vars.motion.durationFast} ease`,
  selectors: {
    "&::-webkit-details-marker": { display: "none" },
    "&:hover": { color: vars.color.text.primary },
  },
});

export const summaryHint = style({
  fontSize: vars.font.size.caption,
  fontWeight: 500,
  letterSpacing: "0.02em",
  textTransform: "none",
  color: vars.color.accent.primary,
  opacity: 0.75,
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "112px 1fr 64px",
  alignItems: "center",
  gap: vars.density.d4,
});

export const rowFull = style({
  display: "grid",
  gridTemplateColumns: "112px 1fr",
  alignItems: "center",
  gap: vars.density.d4,
});

export const label = style({
  fontSize: vars.font.size.bodySm,
  fontWeight: 500,
  color: vars.color.text.primary,
});

export const labelCell = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
});

export const ctxWarn = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.density.d2,
  marginTop: vars.density.d2,
  padding: `${vars.density.d2} ${vars.density.d3}`,
  borderRadius: vars.radius.control,
  background: `color-mix(in oklch, ${vars.color.warning.base} 8%, transparent)`,
  boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${vars.color.warning.base} 24%, transparent)`,
  color: vars.color.warning.text,
  fontSize: vars.font.size.caption,
  lineHeight: 1.4,
});

export const ctxWarnIcon = style({
  flexShrink: 0,
  color: vars.color.warning.base,
  fontFamily: vars.font.code,
});

export const ctxWarnMultiplier = style({
  fontFamily: vars.font.code,
  color: vars.color.warning.base,
});

export const ctxOverride = style({
  display: "block",
  marginTop: vars.density.d1,
  fontSize: vars.font.size.caption,
  fontFamily: vars.font.code,
  color: vars.color.text.muted,
});

export const value = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.accent.primary,
  textAlign: "right",
});

export const slider = style({
  width: "100%",
  accentColor: vars.color.accent.primary,
  height: "18px",
  background: "transparent",
});

export const select = style({
  width: "100%",
  padding: "6px 10px",
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.ui,
  background: `color-mix(in oklch, ${vars.color.text.primary} 4%, transparent)`,
  color: vars.color.text.primary,
  border: "none",
  borderRadius: vars.radius.control,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  outline: "none",
  cursor: "pointer",
  ":focus": {
    boxShadow: `inset 0 0 0 1.5px color-mix(in oklch, ${vars.color.accent.primary} 50%, transparent)`,
  },
  selectors: {
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const number = style({
  width: "100%",
  // audit-allow: px — sub-density numeric input padding, no token at this granularity
  padding: "6px 10px",
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.code,
  fontVariantNumeric: "tabular-nums",
  background: `color-mix(in oklch, ${vars.color.text.primary} 4%, transparent)`,
  color: vars.color.text.primary,
  border: "none",
  borderRadius: vars.radius.control,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  outline: "none",
  ":focus": {
    boxShadow: `inset 0 0 0 1.5px color-mix(in oklch, ${vars.color.accent.tertiary} 55%, transparent)`,
  },
});

export const checkboxRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  cursor: "pointer",
  userSelect: "none",
});

export const checkboxRowDisabled = style({
  opacity: 0.45,
  cursor: "not-allowed",
});

export const checkbox = style({
  accentColor: vars.color.accent.primary,
  width: vars.icon.sm,
  height: vars.icon.sm,
  margin: 0,
});

export const hint = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
  lineHeight: 1.4,
  margin: 0,
});

export const resetRow = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const reset = style({
  appearance: "none",
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  cursor: "pointer",
  fontSize: vars.font.size.caption,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  padding: "4px 8px",
  borderRadius: vars.radius.control,
  transition: `color ${vars.motion.durationFast} ease, background ${vars.motion.durationFast} ease`,
  ":hover": {
    color: vars.color.accent.primary,
    background: `color-mix(in oklch, ${vars.color.accent.primary} 8%, transparent)`,
  },
});

export const warnings = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
});

export const warningChip = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d3,
  padding: `${vars.density.d2} ${vars.density.d3}`,
  borderRadius: vars.radius.control,
  fontSize: vars.font.size.caption,
  lineHeight: 1.4,
  background: `color-mix(in oklch, ${vars.color.accent.tertiary} 12%, transparent)`,
  color: vars.color.text.primary,
  selectors: {
    '&[data-severity="info"]': {
      background: `color-mix(in oklch, ${vars.color.accent.secondary} 10%, transparent)`,
    },
    '&[data-severity="error"]': {
      background: `color-mix(in oklch, ${vars.color.error.base} 14%, transparent)`,
    },
  },
});

export const warningCopy = style({
  flex: 1,
  textAlign: "left",
});

export const warningAction = style({
  appearance: "none",
  background: vars.color.accent.primary,
  color: vars.color.text.inverse,
  border: "none",
  borderRadius: vars.radius.control,
  cursor: "pointer",
  padding: `4px 10px`,
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  whiteSpace: "nowrap",
  transition: `background ${vars.motion.durationFast} ease`,
  ":hover": {
    background: vars.color.accent.primaryHover,
  },
});

export const note = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
  lineHeight: 1.4,
  fontStyle: "italic",
});

export const presets = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flexWrap: "wrap",
});

export const presetChip = style({
  appearance: "none",
  background: "transparent",
  color: vars.color.text.secondary,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  cursor: "pointer",
  padding: `4px 12px`,
  fontSize: vars.font.size.caption,
  fontWeight: 500,
  transition: `color ${vars.motion.durationFast} ease, background ${vars.motion.durationFast} ease, border-color ${vars.motion.durationFast} ease`,
  ":hover": {
    color: vars.color.accent.primary,
    borderColor: vars.color.accent.primary,
  },
  selectors: {
    '&[data-active="true"]': {
      color: vars.color.accent.primary,
      borderColor: vars.color.accent.primary,
      background: `color-mix(in oklch, ${vars.color.accent.primary} 8%, transparent)`,
    },
  },
});
