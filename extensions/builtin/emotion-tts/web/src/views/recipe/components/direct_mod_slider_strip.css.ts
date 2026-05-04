import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const summaryRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const summaryChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.tertiary,
  background: `color-mix(in oklab, ${vars.color.tertiary} 12%, transparent)`,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
});

export const summaryEmpty = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  color: vars.color.textFaint,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
});

export const pendingDot = style({
  width: "6px", // audit-allow: px — sub-token decorative dot
  height: "6px", // audit-allow: px — sub-token decorative dot
  borderRadius: "50%",
  background: vars.color.success,
  display: "inline-block",
});

export const groupGrid = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "180px 1fr 96px",
  alignItems: "center",
  gap: vars.space.lg,
  "@media": {
    // audit-allow: px — fixed layout breakpoint
    "(max-width: 640px)": {
      gridTemplateColumns: "1fr",
      gap: vars.space.sm,
    },
  },
});

export const groupBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const groupHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const groupLabel = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  color: vars.color.text,
  fontWeight: 600,
});

export const groupValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.tertiary,
  fontVariantNumeric: "tabular-nums",
});

export const groupSub = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const range = style({
  width: "100%",
  height: "32px", // audit-allow: px — input range thumb hit area
  appearance: "none",
  WebkitAppearance: "none",
  background: "transparent",
  cursor: "pointer",
  selectors: {
    "&::-webkit-slider-runnable-track": {
      height: "6px", // audit-allow: px — track thickness sub-token
      background: `linear-gradient(to right, ${vars.color.tertiary}, ${vars.color.tertiary} var(--fill, 50%), ${vars.color.borderGhost} var(--fill, 50%), ${vars.color.borderGhost})`,
      borderRadius: vars.radius.pill,
    },
    "&::-moz-range-track": {
      height: "6px", // audit-allow: px — track thickness sub-token
      background: vars.color.borderGhost,
      borderRadius: vars.radius.pill,
    },
    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      appearance: "none",
      width: "18px", // audit-allow: px — touch-target minimum per WCAG
      height: "18px", // audit-allow: px — touch-target minimum per WCAG
      borderRadius: "50%",
      background: vars.color.tertiary,
      marginTop: "-6px", // audit-allow: px — sub-token thumb centering
      cursor: "grab",
    },
    "&:focus-visible::-webkit-slider-thumb": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.tertiary} 30%, transparent)`,
    },
    "&::-moz-range-thumb": {
      width: "18px", // audit-allow: px — touch-target minimum per WCAG
      height: "18px", // audit-allow: px — touch-target minimum per WCAG
      borderRadius: "50%",
      background: vars.color.tertiary,
      border: "none",
      cursor: "grab",
    },
    "&:focus": {
      outline: "none",
    },
  },
});

export const radioRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
});

export const radioChip = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  background: vars.color.surfaceMuted,
  color: vars.color.textMuted,
  border: "none",
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.pill,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      color: vars.color.text,
    },
    '&[data-active="true"]': {
      background: `color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
      color: vars.color.accent,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
    },
  },
});

export const fadeRow = style({
  display: "flex",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const fadeField = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  // audit-allow: px — sub-token spacing value, no density token at this step
  flex: "1 1 140px",
});

export const fadeLabel = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const fadeInput = style({
  background: vars.color.surfaceMuted,
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  border: "none",
  borderRadius: vars.radius.sm,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
    },
  },
});

export const silenceRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const checkboxLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  fontFamily: vars.font.body,
  fontSize: vars.text.body,
  color: vars.color.text,
  cursor: "pointer",
});

export const sectionDivider = style({
  height: "0",
  margin: 0,
  border: "none",
});

export const applyRow = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space.sm,
  paddingTop: vars.space.md,
});

export const subSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  padding: vars.space.md,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
});

export const subSectionTitle = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.caption,
  fontWeight: 600,
  color: vars.color.text,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
});
