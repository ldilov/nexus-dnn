import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  padding: vars.space.insetLg,
  minHeight: "100%",
});

export const header = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.insetMd,
  flexWrap: "wrap",
});

export const title = style({
  fontSize: vars.font.size.heading,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  margin: 0,
});

export const subtitle = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
  margin: 0,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const card = style({
  display: "grid",
  gridTemplateColumns: "1fr auto auto",
  alignItems: "center",
  gap: vars.space.insetMd,
  padding: vars.space.insetLg,
  borderRadius: vars.radius.card,
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.panel,
});

export const cardTitle = style({
  fontWeight: vars.font.weight.semibold,
  fontSize: vars.font.size.bodyLg,
  color: vars.color.text.primary,
});

export const cardSlug = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  marginTop: vars.space.insetXs,
});

export const cardMeta = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
  display: "flex",
  gap: vars.space.insetMd,
  flexWrap: "wrap",
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  color: vars.color.text.secondary,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const empty = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.insetMd,
  padding: vars.space.insetXl,
  border: `1px dashed ${vars.color.outline.variant}`,
  borderRadius: vars.radius.container,
  color: vars.color.text.muted,
  textAlign: "center",
});

export const emptyIcon = style({
  fontSize: "48px",
  color: vars.color.text.muted,
});

export const emptyTitle = style({
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
});

export const error = style({
  padding: vars.space.insetMd,
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  color: vars.color.error.text,
  fontSize: vars.font.size.bodySm,
});

export const filterBar = style({
  display: "flex",
  gap: "0.75rem",
  alignItems: "center",
  flexWrap: "wrap",
});

export const filterCheckbox = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
});

export const cardTitleButton = style({
  background: "transparent",
  border: "none",
  color: "inherit",
  font: "inherit",
  cursor: "pointer",
  padding: 0,
});
