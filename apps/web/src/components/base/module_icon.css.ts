import { style } from "@vanilla-extract/css";
import { vars } from "../../styles";

export const wrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  borderRadius: vars.radius.md,
  background: vars.color.surfaceContainer,
  color: vars.color.onSurfaceVariant,
  overflow: "hidden",
});

export const symbol = style({
  fontFamily: vars.font.symbols,
  color: vars.color.primary,
  display: "block",
});

export const symbolFilled = style({
  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
});

export const svgFrame = style({
  width: "70%",
  height: "70%",
  display: "block",
  color: vars.color.primary,
});
