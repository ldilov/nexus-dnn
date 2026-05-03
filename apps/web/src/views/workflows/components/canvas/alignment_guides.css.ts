import { style } from "@vanilla-extract/css";

export const fullSvg = style({
  position: "absolute",
  inset: 0,
  overflow: "visible",
});

export const guideLineGlow = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))",
});
