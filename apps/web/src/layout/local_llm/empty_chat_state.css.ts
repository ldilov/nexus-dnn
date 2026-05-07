import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const wrap = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.density.d3,
  textAlign: "center",
  color: vars.color.text.secondary,
});

export const sparkle = style({
  fontFamily: "Material Symbols Outlined",
  fontSize: "32px",
  lineHeight: 1,
  color: vars.color.accent.primary,
  filter: `drop-shadow(0 0 12px color-mix(in oklch, ${vars.color.accent.primary} 50%, transparent))`,
});

export const heading = style({
  margin: 0,
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
});

export const description = style({
  margin: 0,
  maxWidth: "420px",
  fontSize: vars.font.size.bodySm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.secondary,
});
