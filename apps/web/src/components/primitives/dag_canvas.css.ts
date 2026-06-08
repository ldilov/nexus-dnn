import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const container = style({
  position: "relative",
  width: "100%",
  height: "100%",
  minHeight: 320,
  borderRadius: vars.radius.card,
  overflow: "hidden",
  background: vars.color.bg.canvas,
});

export const miniMapBg = style({
  background: vars.color.bg.panel,
  borderRadius: vars.radius.control,
});
