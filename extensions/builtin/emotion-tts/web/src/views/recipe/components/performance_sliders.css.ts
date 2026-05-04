import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const sliderRow = style({
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

export const labelBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const label = style({
  fontFamily: vars.font.display,
  fontSize: vars.text.body,
  color: vars.color.text,
  fontWeight: 600,
});

export const sub = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});

export const range = style({
  width: "100%",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "32px",
  appearance: "none",
  WebkitAppearance: "none",
  background: "transparent",
  cursor: "pointer",
  selectors: {
    "&::-webkit-slider-runnable-track": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      height: "6px",
      background: `linear-gradient(to right, ${vars.color.tertiary}, ${vars.color.tertiary} var(--fill, 50%), ${vars.color.borderGhost} var(--fill, 50%), ${vars.color.borderGhost})`,
      borderRadius: vars.radius.pill,
    },
    "&::-moz-range-track": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      height: "6px",
      background: vars.color.borderGhost,
      borderRadius: vars.radius.pill,
    },
    "&::-moz-range-progress": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      height: "6px",
      background: vars.color.tertiary,
      borderRadius: vars.radius.pill,
    },
    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      appearance: "none",
      // audit-allow: px — sub-token spacing value, no density token at this step
      width: "18px",
      // audit-allow: px — sub-token spacing value, no density token at this step
      height: "18px",
      borderRadius: "50%",
      background: vars.color.tertiary,
      // audit-allow: px — below minimum token granularity (sub-10px)
      marginTop: "-6px",
      cursor: "grab",
      transition: `box-shadow ${vars.motion.fast}`,
    },
    "&:focus-visible::-webkit-slider-thumb": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.tertiary} 30%, transparent)`,
    },
    "&::-moz-range-thumb": {
      // audit-allow: px — sub-token spacing value, no density token at this step
      width: "18px",
      // audit-allow: px — sub-token spacing value, no density token at this step
      height: "18px",
      borderRadius: "50%",
      background: vars.color.tertiary,
      border: "none",
      cursor: "grab",
    },
    "&:focus-visible::-moz-range-thumb": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.tertiary} 30%, transparent)`,
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
