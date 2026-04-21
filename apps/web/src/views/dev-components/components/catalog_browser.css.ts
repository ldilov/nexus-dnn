import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
  background: vars.color.bg.panel,
});

export const searchRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: vars.space.insetMd,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const searchInput = style({
  flex: 1,
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  border: "1px solid transparent",
  outline: "none",

  ":focus": {
    borderColor: vars.color.accent.primary,
  },
});

export const countBadge = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const categories = style({
  flex: 1,
  overflowY: "auto",
  padding: vars.space.insetMd,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
});

export const categoryBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const categoryTitle = style({
  margin: 0,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const list = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

const itemBase = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  border: "none",
  borderRadius: vars.radius.control,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  textAlign: "left",
  cursor: "pointer",
  transition: "background 120ms ease, color 120ms ease",

  ":hover": {
    background: vars.color.bg.hover,
    color: vars.color.text.primary,
  },
});

export const item = style([itemBase]);

export const itemSelected = style([
  itemBase,
  {
    background: vars.color.bg.elevated,
    color: vars.color.text.primary,
    borderLeft: `2px solid ${vars.color.accent.primary}`,
    paddingLeft: `calc(${vars.space.insetMd} - 2px)`,
  },
]);

export const itemName = style({
  fontWeight: 500,
});

export const itemTag = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});
