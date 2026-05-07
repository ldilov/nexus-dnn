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

export const head = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d2,
});

export const label = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: vars.color.text.secondary,
});

export const value = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.primary,
  letterSpacing: "0.04em",
});

export const pct = style({
  color: vars.color.text.muted,
  marginInlineStart: vars.density.d1,
});

export const track = style({
  position: "relative",
  width: "100%",
  height: "6px",
  borderRadius: vars.radius.control,
  background: `color-mix(in oklch, ${vars.color.bg.canvas} 80%, transparent)`,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  overflow: "hidden",
});

export const fill = style({
  height: "100%",
  borderRadius: "inherit",
  transition: `width ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    '&[data-tone="ok"]': {
      background: vars.color.success.base,
    },
    '&[data-tone="warn"]': {
      background: vars.color.warning.base,
    },
    '&[data-tone="danger"]': {
      background: vars.color.error.base,
    },
  },
});
