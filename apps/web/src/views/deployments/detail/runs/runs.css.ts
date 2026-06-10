import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

export const note = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
  padding: vars.space.gapLg,
});

export const tableWrap = style({
  width: "100%",
  overflowX: "auto",
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: vars.font.size.bodySm,
});

export const th = style({
  textAlign: "left",
  padding: `${vars.space.gapSm} ${vars.space.gapMd}`,
  color: vars.color.text.muted,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontSize: vars.font.size.caption,
});

export const row = style({
  selectors: {
    "&:hover": { background: vars.color.bg.hover },
  },
});

export const td = style({
  padding: `${vars.space.gapSm} ${vars.space.gapMd}`,
  color: vars.color.text.primary,
  verticalAlign: "top",
  whiteSpace: "nowrap",
});

export const tdDetail = style([
  td,
  {
    whiteSpace: "normal",
    maxWidth: "320px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: vars.color.text.secondary,
  },
]);

export const runLabel = style({
  fontWeight: 600,
});

export const runId = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
});
