import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const eyebrow = style({
  fontSize: vars.text.eyebrow,
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
});

export const eyebrowAccent = style({
  color: "var(--accent)",
});
