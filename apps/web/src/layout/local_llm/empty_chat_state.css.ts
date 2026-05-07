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

export const eyebrow = style({
  fontFamily: vars.font.code,
  fontSize: vars.text.eyebrow,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: vars.font.weight.semibold,
  color: vars.color.accent.secondary,
});

export const sparkle = style({
  fontFamily: "Material Symbols Outlined",
  // audit-allow: px — display glyph at 32px sits above icon.lg (20px)
  fontSize: "32px",
  lineHeight: 1,
  color: vars.color.accent.secondary,
  filter: `drop-shadow(0 0 12px color-mix(in oklch, ${vars.color.accent.secondary} 50%, transparent))`,
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
  // audit-allow: px — readable measure cap for the description copy
  maxWidth: "420px",
  fontSize: vars.font.size.bodySm,
  lineHeight: vars.font.lineHeight.relaxed,
  color: vars.color.text.secondary,
});
