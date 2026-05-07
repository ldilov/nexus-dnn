import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const block = style({
  display: "block",
  margin: 0,
  paddingBlock: vars.density.d3,
  paddingInline: 0,
  background: "#0d1117",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.card,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.primary,
  overflowX: "auto",
  counterReset: "line",
  selectors: {
    "&:focus-visible": {
      outline: `${vars.focus.ringWidth} solid ${vars.color.accent.secondary}`,
      outlineOffset: vars.focus.offset,
    },
  },
});

globalStyle(`${block} pre`, {
  margin: 0,
  padding: 0,
  background: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  color: "inherit",
});

globalStyle(`${block} code`, {
  display: "block",
  background: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  color: "inherit",
  padding: 0,
});

globalStyle(`${block} .line`, {
  counterIncrement: "line",
  display: "block",
  paddingInlineStart: vars.density.d6,
  paddingInlineEnd: vars.density.d4,
  position: "relative",
  minHeight: "1em",
});

globalStyle(`${block} .line::before`, {
  content: "counter(line)",
  position: "absolute",
  insetInlineStart: 0,
  width: vars.density.d5,
  textAlign: "right",
  color: vars.color.text.muted,
  opacity: 0.55,
  userSelect: "none",
  pointerEvents: "none",
  fontVariantNumeric: "tabular-nums",
});

globalStyle(`${block} > code`, {
  paddingInlineStart: vars.density.d6,
  paddingInlineEnd: vars.density.d4,
});
