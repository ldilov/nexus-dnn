import { style } from "@vanilla-extract/css";
import { vars } from "./contract.css";

export const glassEffect = style({
  backgroundColor: `${vars.color.bg.elevated}cc`,
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
});

export const ghostBorder = style({
  outline: `1px solid ${vars.color.outline.variant}26`,
});

export const primaryGlow = style({
  boxShadow: `0 0 12px 0 ${vars.color.accent.primaryDim}44`,
});
