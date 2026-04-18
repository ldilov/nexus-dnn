import { style } from "@vanilla-extract/css";

export const fullSvg = style({
  position: "absolute",
  inset: 0,
  overflow: "visible",
});

export const guideLineGlow = style({
  filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))",
});
