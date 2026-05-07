import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  position: "sticky",
  top: 0,
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  marginBottom: vars.density.d4,
  paddingBlock: vars.density.d3,
  paddingInline: vars.density.d4,
  borderRadius: vars.radius.card,
  background: `color-mix(in oklch, ${vars.color.bg.elevated} 92%, transparent)`,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
});

export const titleRow = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.density.d3,
  justifyContent: "space-between",
});

export const title = style({
  flex: "1 1 auto",
  margin: 0,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "-0.005em",
  lineHeight: 1.25,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  wordBreak: "break-word",
  minWidth: 0,
});

export const chips = style({
  flex: "0 0 auto",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  height: vars.control.heightSm,
  paddingInline: vars.density.d2,
  borderRadius: vars.radius.full,
  background: vars.color.bg.lowest,
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.04em",
});

export const chipMoe = style({
  display: "inline-flex",
  alignItems: "center",
  height: vars.control.heightSm,
  paddingInline: vars.density.d2,
  borderRadius: vars.radius.full,
  background: `color-mix(in oklch, ${vars.color.accent.primary} 16%, transparent)`,
  color: vars.color.accent.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const facts = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: vars.density.d3,
  margin: 0,
  "@media": {
    // audit-allow: px — fixed responsive breakpoint
    "(max-width: 640px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  },
});

export const fact = style({
  display: "flex",
  flexDirection: "column",
  gap: 0,
  minWidth: 0,
});

export const factLabel = style({
  margin: 0,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const factValue = style({
  margin: 0,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const factSubValue = style({
  fontWeight: vars.font.weight.regular,
  color: vars.color.text.muted,
});
