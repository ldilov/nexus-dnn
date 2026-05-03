import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
});

export const title = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
});

export const label = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
});

export const input = style({
  height: vars.control.heightSm,
  paddingInline: vars.density.d3,
  background: vars.color.bg.lowest,
  border: "none",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  borderRadius: `${vars.radius.control} ${vars.radius.control} 0 0`,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  outline: "none",
  ":focus": {
    borderBottomColor: vars.color.accent.tertiary,
    // audit-allow: px — px — below minimum token granularity (sub-10px)
    boxShadow: `0 0 0 2px color-mix(in oklab, ${vars.color.accent.tertiary} 33%, transparent)`,
  },
});

export const select = style([
  input,
  { paddingInlineEnd: vars.density.d4 },
]);
