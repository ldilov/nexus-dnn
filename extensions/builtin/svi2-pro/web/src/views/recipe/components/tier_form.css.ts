import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const stack = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const fieldGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: `${vars.space.lg} ${vars.space.xl}`,
  alignItems: "start",
});
