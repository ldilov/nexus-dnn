import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const wrap = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d5,
  fontFamily: vars.font.ui,
  color: vars.color.text.primary,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.density.d2,
  paddingBottom: vars.density.d2,
});

export const eyebrow = style({
  display: "inline-flex",
  alignItems: "baseline",
  gap: vars.density.d2,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: vars.color.text.muted,
});

export const eyebrowNum = style({
  color: vars.color.accent.primary,
});

export const eyebrowTitle = style({
  color: vars.color.text.secondary,
});

export const modelCard = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.density.d3,
  padding: `${vars.density.d3} ${vars.density.d4}`,
  borderRadius: vars.radius.card,
  background: `color-mix(in oklch, ${vars.color.bg.elevated} 75%, transparent)`,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
});

export const modelGlyph = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "32px",
  height: "32px",
  borderRadius: vars.radius.control,
  background: `color-mix(in oklch, ${vars.color.accent.primary} 18%, transparent)`,
  color: vars.color.accent.primary,
  fontSize: vars.icon.md,
});

export const modelText = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

export const modelName = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.body,
  fontWeight: 600,
  color: vars.color.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const modelNameEmpty = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.body,
  fontWeight: 500,
  color: vars.color.text.muted,
  fontStyle: "italic",
});

export const modelSub = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.04em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const chipBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  padding: `2px ${vars.density.d2}`,
  borderRadius: vars.radius.full,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
});

export const chip = styleVariants({
  idle: [
    chipBase,
    {
      background: `color-mix(in oklch, ${vars.color.text.muted} 14%, transparent)`,
      color: vars.color.text.muted,
    },
  ],
  loading: [
    chipBase,
    {
      background: `color-mix(in oklch, ${vars.color.warning.base} 18%, transparent)`,
      color: vars.color.warning.base,
    },
  ],
  ready: [
    chipBase,
    {
      background: `color-mix(in oklch, ${vars.color.success.base} 18%, transparent)`,
      color: vars.color.success.base,
    },
  ],
  failed: [
    chipBase,
    {
      background: `color-mix(in oklch, ${vars.color.error.base} 18%, transparent)`,
      color: vars.color.error.base,
    },
  ],
});

export const meterStack = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
});

export const paramsList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  padding: `${vars.density.d3} ${vars.density.d4}`,
  borderRadius: vars.radius.card,
  background: `color-mix(in oklch, ${vars.color.bg.elevated} 75%, transparent)`,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
});

export const paramRow = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  gap: vars.density.d3,
});

export const paramLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: vars.color.text.secondary,
});

export const paramInput = style({
  // audit-allow: px — fixed numeric input width keeps the param column aligned
  width: "96px",
  appearance: "none",
  padding: `${vars.density.d1} ${vars.density.d2}`,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontVariantNumeric: "tabular-nums",
  textAlign: "right",
  color: vars.color.text.primary,
  background: `color-mix(in oklch, ${vars.color.bg.canvas} 80%, transparent)`,
  border: "none",
  borderRadius: vars.radius.control,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  outline: "none",
  transition: `box-shadow ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:focus": {
      boxShadow: `inset 0 0 0 1.5px ${vars.color.accent.tertiary}`,
    },
    "&[data-role=\"manual\"]:focus": {
      boxShadow: `inset 0 0 0 1.5px ${vars.color.accent.tertiary}`,
    },
  },
});

export const promptIndicatorInherited = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.04em",
});

export const promptIndicatorOverridden = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.accent.primary,
  letterSpacing: "0.04em",
  fontWeight: 600,
});

export const modelMeta = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
});

export const unloadBtn = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  padding: `${vars.density.d1} ${vars.density.d2}`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: vars.color.text.muted,
  cursor: "pointer",
  outline: "none",
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      color: vars.color.error.base,
      textDecoration: "underline",
    },
    "&:focus-visible": {
      boxShadow: `0 0 0 2px color-mix(in oklch, ${vars.color.error.base} 55%, transparent)`,
    },
  },
});
