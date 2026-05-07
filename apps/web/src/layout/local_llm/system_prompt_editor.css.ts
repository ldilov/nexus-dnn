import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const wrap = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  padding: `${vars.density.d3} ${vars.density.d4}`,
  borderRadius: vars.radius.card,
  background: `color-mix(in oklch, ${vars.color.bg.elevated} 75%, transparent)`,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
});

export const label = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: vars.color.text.secondary,
});

export const textarea = style({
  width: "100%",
  minHeight: "92px",
  resize: "vertical",
  padding: `${vars.density.d2} ${vars.density.d3}`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  lineHeight: 1.5,
  color: vars.color.text.primary,
  background: `color-mix(in oklch, ${vars.color.bg.canvas} 80%, transparent)`,
  border: "none",
  borderRadius: vars.radius.control,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  outline: "none",
  transition: `box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:focus": {
      boxShadow: `inset 0 0 0 1.5px ${vars.color.accent.primary}`,
    },
    "&::placeholder": {
      color: vars.color.text.muted,
    },
  },
});

export const foot = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d2,
});

export const muted = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.04em",
});

export const clear = style({
  appearance: "none",
  background: "transparent",
  color: vars.color.text.secondary,
  border: "none",
  cursor: "pointer",
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  padding: `${vars.density.d1} ${vars.density.d2}`,
  borderRadius: vars.radius.control,
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      color: vars.color.accent.primary,
      background: `color-mix(in oklch, ${vars.color.accent.primary} 10%, transparent)`,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "2px",
    },
  },
});
