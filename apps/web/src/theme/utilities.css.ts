import { style } from "@vanilla-extract/css";
import { vars } from "./contract.css";

export const glassEffect = style({
  backgroundColor: `${vars.color.bg.elevated}cc`,
  // audit-allow: px — sub-token spacing value, no density token at this step
  backdropFilter: "blur(20px)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  WebkitBackdropFilter: "blur(20px)",
});

export const ghostBorder = style({
  outline: `1px solid ${vars.color.outline.variant}26`,
});

export const primaryGlow = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  boxShadow: `0 0 12px 0 ${vars.color.accent.primaryDim}44`,
});
