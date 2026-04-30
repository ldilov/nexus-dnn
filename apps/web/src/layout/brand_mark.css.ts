import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
});

export const wordmark = style({
  fontFamily: vars.font.ui,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "-0.01em",
});
