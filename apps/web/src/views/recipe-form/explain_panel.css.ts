import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  width: "100%",
  padding: vars.space.insetMd,
  borderRadius: vars.radius.card,
  background: vars.color.bg.panel,
  border: `1px solid ${vars.color.outline.variant}`,
});

export const title = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const entryList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  listStyle: "none",
  margin: 0,
  padding: 0,
});

export const entryItem = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  paddingTop: vars.space.insetSm,
  borderTop: `1px solid ${vars.color.outline.variant}`,
  selectors: {
    "&:first-child": {
      paddingTop: 0,
      borderTop: "none",
    },
  },
});

export const entryHeader = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.gapSm,
});

export const entryLabel = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
});

export const entryValue = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.accent.primary,
  wordBreak: "break-word",
});

export const targetList = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: vars.space.gapXs,
});

export const targetTag = style({
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  borderRadius: vars.radius.full,
  background: vars.color.bg.lowest,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
});

export const emptyState = style({
  display: "flex",
  alignItems: "center",
  padding: vars.space.insetSm,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});
