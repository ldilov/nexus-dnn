import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  padding: vars.space.insetLg,
  minHeight: "100%",
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
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
  maxWidth: "70ch",
});

export const summary = style({
  display: "flex",
  gap: vars.space.insetMd,
  flexWrap: "wrap",
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
});

export const chip = style({
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  background: vars.color.bg.elevated,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: vars.space.insetMd,
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetLg,
  background: vars.color.bg.panel,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.card,
});

export const cardHead = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.insetMd,
});

export const cardTitle = style({
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const cardVariant = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const cardRow = style({
  display: "grid",
  gridTemplateColumns: "120px 1fr",
  gap: vars.space.insetMd,
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.code,
  alignItems: "baseline",
});

export const rowLabel = style({
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontSize: vars.font.size.caption,
});

export const rowValue = style({
  color: vars.color.text.primary,
  wordBreak: "break-all",
});

export const stateChip = style({
  alignSelf: "flex-start",
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  borderRadius: vars.radius.full,
  fontSize: vars.font.size.caption,
  fontFamily: vars.font.code,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  background: vars.color.bg.elevated,
  color: vars.color.text.secondary,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const stateChipActive = style({
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  borderColor: "transparent",
});

export const empty = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.insetMd,
  padding: vars.space.insetXl,
  border: `1px dashed ${vars.color.outline.variant}`,
  borderRadius: vars.radius.container,
  color: vars.color.text.muted,
  textAlign: "center",
});

export const errorBox = style({
  padding: vars.space.insetMd,
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  color: vars.color.error.text,
  fontSize: vars.font.size.bodySm,
});
