import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const presetRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.xs,
  alignItems: "center",
});

export const presetChip = style({
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
      background: vars.color.surfaceHigh,
      color: vars.color.text,
    },
    "&:focus-visible": {
      boxShadow: vars.shadow.focusRing,
      outline: "none",
    },
    '&[data-active="true"]': {
      background: `color-mix(in oklab, ${vars.color.accent} 22%, transparent)`,
      color: vars.color.accent,
    },
  },
});

export const customLabel = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.tertiary,
  padding: `${vars.space.xs} ${vars.space.md}`,
});

export const sliderGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: vars.space.lg,
  alignItems: "stretch",
  "@media": {
    "(max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const bandColumn = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.sm,
  padding: vars.space.md,
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
});

export const bandLabel = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.caption,
  fontWeight: 600,
  color: vars.color.text,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
});

export const bandValue = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.tertiary,
  fontVariantNumeric: "tabular-nums",
});

export const verticalSlider = style({
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
    "&::-moz-range-progress": {
      height: "6px", // audit-allow: px — track thickness sub-token
      background: vars.color.tertiary,
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
      transition: `box-shadow ${vars.motion.fast}`,
    },
    "&:focus-visible::-webkit-slider-thumb": {
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
    "&:focus-visible::-moz-range-thumb": {
      boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.tertiary} 30%, transparent)`,
    },
    "&:focus": {
      outline: "none",
    },
  },
});

export const tickLabels = style({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  fontFamily: vars.font.mono,
  fontSize: vars.text.micro,
  color: vars.color.textFaint,
});
