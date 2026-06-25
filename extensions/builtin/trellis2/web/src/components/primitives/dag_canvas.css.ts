import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const container = style({
  position: "relative",
  flex: 1,
  width: "100%",
  minHeight: "420px",
  borderRadius: vars.radius.md,
  overflow: "hidden",
  background: vars.color.canvas,
});

export const miniMapBg = style({
  background: `${vars.color.surfaceRaised} !important`,
  borderRadius: vars.radius.sm,
});
