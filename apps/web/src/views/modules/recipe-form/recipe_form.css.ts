import { style } from "@vanilla-extract/css";
import { motion, vars } from "../../../styles";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
});

export const presetRail = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
});

export const presetPill = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.full,
  background: vars.color.surfaceContainerLow,
  border: "1px solid transparent",
  color: vars.color.onSurfaceVariant,
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyS,
  fontWeight: 500,
  cursor: "pointer",
  transition: `color ${motion.duration.focusRing}, background ${motion.duration.focusRing}, border-color ${motion.duration.focusRing}`,
  selectors: {
    "&:hover": { color: vars.color.onSurface },
    "&[aria-pressed='true']": {
      background: vars.color.primaryContainer,
      borderColor: vars.color.primary,
      color: vars.color.primary,
    },
  },
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  margin: 0,
  padding: vars.space.lg,
  border: "none",
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceContainerLow,
});

export const sectionTitle = style({
  fontSize: vars.text.labelM,
  fontWeight: 600,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
  color: vars.color.onSurfaceVariant,
  padding: 0,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const label = style({
  fontSize: vars.text.labelM,
  fontWeight: 500,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
  color: vars.color.onSurfaceVariant,
});

const recess = {
  width: "100%",
  background: vars.color.surfaceContainerLowest,
  border: "none",
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
  borderTopLeftRadius: vars.radius.sm,
  borderTopRightRadius: vars.radius.sm,
  color: vars.color.onSurface,
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyM,
  padding: `${vars.space.sm} ${vars.space.md}`,
  outline: "none",
  transition: `border-color ${motion.duration.focusRing}, box-shadow ${motion.duration.cardGlow}`,
  selectors: {
    "&::placeholder": { color: vars.color.onSurfaceVariant },
    "&:focus": {
      borderBottomColor: vars.color.primary,
      // audit-allow: px — focus underline accent shadow, sub-token granularity
      boxShadow: `0 2px 0 0 ${vars.color.primaryDim}`,
    },
    "&:disabled": { opacity: 0.45, cursor: "not-allowed" },
  },
} as const;

export const input = style(recess);

export const textarea = style([
  recess,
  {
    // audit-allow: px — multiline minimum height, no density token at this granularity
    minHeight: "96px",
    resize: "vertical",
    lineHeight: 1.5,
  },
]);

export const select = style([
  recess,
  {
    appearance: "none",
    cursor: "pointer",
    paddingRight: vars.space.xl,
  },
]);

export const checkbox = style({
  // audit-allow: px — fixed control hit-target, not density-coupled
  width: "18px",
  // audit-allow: px — fixed control hit-target, not density-coupled
  height: "18px",
  accentColor: vars.color.primary,
  cursor: "pointer",
  alignSelf: "flex-start",
  selectors: {
    "&:disabled": { opacity: 0.45, cursor: "not-allowed" },
  },
});

export const help = style({
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
});

export const error = style({
  fontSize: vars.text.labelS,
  color: vars.color.error,
});

export const actions = style({
  display: "flex",
  gap: vars.space.md,
  marginTop: vars.space.sm,
});

export const runButton = style({
  background: vars.color.primary,
  color: vars.color.onPrimary,
  border: "none",
  borderRadius: vars.radius.md,
  padding: `${vars.space.sm} ${vars.space.xl}`,
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyM,
  fontWeight: 600,
  cursor: "pointer",
  transition: `background ${motion.duration.focusRing}, box-shadow ${motion.duration.cardGlow}`,
  selectors: {
    "&:hover:not(:disabled)": {
      // audit-allow: px — accent focus glow, true elevation lighting
      boxShadow: `0 0 16px ${vars.color.primaryDim}`,
    },
    "&:active:not(:disabled)": { background: vars.color.primaryDim },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  },
});
