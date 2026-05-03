import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const segmentedRow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  background: vars.color.surfaceMuted,
  padding: vars.space.xs,
  borderRadius: vars.radius.pill,
  alignSelf: "flex-start",
});

export const segmentButton = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.caption,
  fontWeight: 600,
  letterSpacing: vars.tracking.label,
  textTransform: "uppercase",
  color: vars.color.textMuted,
  background: "transparent",
  border: "none",
  padding: `${vars.space.xs} ${vars.space.lg}`,
  borderRadius: vars.radius.pill,
  cursor: "pointer",
  transition: `background ${vars.motion.fast}, color ${vars.motion.fast}`,
  selectors: {
    "&:hover": {
      color: vars.color.text,
    },
    "&:focus-visible": {
      outline: "none",
      boxShadow: vars.shadow.focusRing,
    },
    '&[data-active="true"]': {
      background: vars.color.surfaceHigh,
      color: vars.color.accent,
    },
  },
});

export const sliderRow = style({
  display: "grid",
  gridTemplateColumns: "1fr 96px",
  gap: vars.space.lg,
  alignItems: "center",
  "@media": {
    "(max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
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

export const value = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.tertiary,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
});

export const reRenderRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const hint = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});
