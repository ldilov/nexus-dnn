import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

const pulse = keyframes({
  "0%, 100%": { opacity: 0.45 },
  "50%": { opacity: 0.75 },
});

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  paddingBlock: vars.density.d4,
  paddingInline: vars.density.d5,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d2,
});

export const title = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
});

export const count = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  color: vars.color.accent.primary,
  fontVariantNumeric: "tabular-nums",
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  listStyle: "none",
  margin: 0,
  padding: 0,
});

export const item = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d3,
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d4,
  background: vars.color.bg.lowest,
  borderRadius: vars.radius.card,
});

export const itemBody = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
  flex: 1,
  minWidth: 0,
});

export const filename = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
});

export const itemMeta = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.density.d2,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
});

export const metaSep = style({
  color: vars.color.outline.variant,
  opacity: 0.6,
});

export const chipRow = style({
  display: "flex",
  alignItems: "center",
});

export const path = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  color: vars.color.text.muted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
  direction: "rtl",
  textAlign: "left",
});

export const deleteButton = style({
  appearance: "none",
  cursor: "pointer",
  height: vars.control.heightSm,
  paddingInline: vars.density.d3,
  borderRadius: vars.radius.control,
  border: "none",
  background: `color-mix(in oklch, ${vars.color.error.base} 14%, transparent)`,
  color: vars.color.error.base,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  fontWeight: vars.font.weight.bold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      background: `color-mix(in oklch, ${vars.color.error.base} 24%, transparent)`,
    },
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.error.base}`,
      outlineOffset: vars.focus.offset,
    },
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
  },
});

export const deleteIcon = style({
  fontSize: vars.icon.sm,
});

export const skeletonRow = style({
  // audit-allow: px — fixed skeleton height matches the dense list-row silhouette
  height: "56px",
  borderRadius: vars.radius.card,
  background: vars.color.bg.lowest,
  animation: `${pulse} 1.4s ${vars.motion.easingDefault} infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 0.5,
    },
  },
});

export const empty = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d1,
  paddingBlock: vars.density.d4,
  paddingInline: vars.density.d4,
  textAlign: "center",
  alignItems: "center",
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

export const emptyIcon = style({
  fontSize: vars.icon.lg,
  color: vars.color.text.muted,
  opacity: 0.7,
});

export const errorBanner = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  paddingBlock: vars.density.d2,
  paddingInline: vars.density.d4,
  background: `color-mix(in oklch, ${vars.color.error.base} 12%, transparent)`,
  color: vars.color.error.base,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});

export const truncatedNote = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.kbd,
  color: vars.color.text.muted,
});
