import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const sliderRow = style({
  display: "grid",
  gridTemplateColumns: "180px 1fr 96px",
  alignItems: "center",
  gap: vars.space.lg,
  "@media": {
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
  height: "32px",
  appearance: "none",
  WebkitAppearance: "none",
  background: "transparent",
  cursor: "pointer",
  selectors: {
    "&::-webkit-slider-runnable-track": {
      height: "6px",
      background: `linear-gradient(to right, ${vars.color.tertiary}, ${vars.color.tertiary} var(--fill, 50%), ${vars.color.borderGhost} var(--fill, 50%), ${vars.color.borderGhost})`,
      borderRadius: vars.radius.pill,
    },
    "&::-moz-range-track": {
      height: "6px",
      background: vars.color.borderGhost,
      borderRadius: vars.radius.pill,
    },
    "&::-moz-range-progress": {
      height: "6px",
      background: vars.color.tertiary,
      borderRadius: vars.radius.pill,
    },
    "&::-webkit-slider-thumb": {
      WebkitAppearance: "none",
      appearance: "none",
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      background: vars.color.tertiary,
      marginTop: "-6px",
      cursor: "grab",
      transition: `box-shadow ${vars.motion.fast}`,
    },
    "&:focus-visible::-webkit-slider-thumb": {
      boxShadow: `0 0 0 4px color-mix(in oklab, ${vars.color.tertiary} 30%, transparent)`,
    },
    "&::-moz-range-thumb": {
      width: "18px",
      height: "18px",
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

export const value = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.body,
  color: vars.color.tertiary,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
});
