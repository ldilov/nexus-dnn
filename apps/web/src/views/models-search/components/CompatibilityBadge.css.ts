import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "3px 9px",
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
});

export const badgeVariants = styleVariants({
  compatible: {
    background: `color-mix(in oklab, ${vars.color.success.base} 14%, transparent)`,
    color: vars.color.success.base,
  },
  compatible_with_requirements: {
    background: `color-mix(in oklab, ${vars.color.accent.tertiary} 14%, transparent)`,
    color: vars.color.accent.tertiary,
  },
  downloadable_but_not_runnable: {
    background: `color-mix(in oklab, ${vars.color.accent.secondary} 14%, transparent)`,
    color: vars.color.accent.secondary,
  },
  unsupported: {
    background: vars.color.bg.elevated,
    color: vars.color.text.muted,
  },
  unknown: {
    background: vars.color.bg.elevated,
    color: vars.color.text.muted,
  },
});

const shape = style({
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  flexShrink: 0,
});

export const shapeCompatible = style([
  shape,
  { background: vars.color.success.base },
]);
export const shapeReqs = style([shape, { background: vars.color.accent.tertiary }]);
export const shapeDl = style([shape, { background: vars.color.accent.secondary }]);
export const shapeUnsupported = style([
  shape,
  {
    background: "transparent",
    border: `2px solid ${vars.color.text.muted}`,
    width: "8px",
    height: "8px",
  },
]);
export const shapeUnknown = style([
  shape,
  {
    background: "transparent",
    border: `2px dashed ${vars.color.text.muted}`,
    width: "8px",
    height: "8px",
  },
]);
