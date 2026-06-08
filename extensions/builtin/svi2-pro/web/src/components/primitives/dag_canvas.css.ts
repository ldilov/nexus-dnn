import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const container = style({
  position: "relative",
  width: "100%",
  height: "100%",
  minHeight: "360px",
  borderRadius: vars.radius.md,
  overflow: "hidden",
  background: vars.color.canvas,
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
});

export const miniMapBg = style({
  background: vars.color.surfaceMuted,
  borderRadius: vars.radius.md,
});
