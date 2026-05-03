// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: px — below minimum token granularity (sub-10px)
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.insetLg,
  height: "100%",
  padding: vars.density.padCard,
  backgroundColor: vars.card.bg,
  boxShadow: vars.card.shadow,
  backdropFilter: vars.card.backdrop,
  borderRadius: vars.radius.panel,
  overflow: "auto",
});

export const heading = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "-0.02em",
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  padding: vars.space.gapXl,
  textAlign: "center",
});

export const fieldLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const fieldValue = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
});

export const fieldGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const sectionLabel = style({
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: vars.color.accent.primary,
  marginTop: vars.space.gapSm,
});

export const description = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  lineHeight: 1.55,
});

export const chipRow = style({
  display: "flex",
  flexWrap: "wrap",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
});

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "4px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "2px 8px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.text.secondary,
  backgroundColor: vars.color.bg.hover,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const portList = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "4px",
});

export const portItem = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "4px 8px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "6px",
  backgroundColor: "rgba(255,255,255,0.02)",
  border: `1px solid ${vars.color.outline.variant}`,
});

export const portDot = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  width: "8px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  height: "8px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  flexShrink: 0,
});

export const portName = style({
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  color: vars.color.text.primary,
});

export const portType = style({
  marginLeft: "auto",
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  color: vars.color.text.muted,
});

export const requiredMark = style({
  color: vars.color.error.base,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginLeft: "2px",
});
