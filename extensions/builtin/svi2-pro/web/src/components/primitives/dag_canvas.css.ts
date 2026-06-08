import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const container = style({
  position: "relative",
  width: "100%",
  height: "100%",
  minHeight: "360px",
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  background: vars.color.canvas,
});

export const miniMapBg = style({
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
});
