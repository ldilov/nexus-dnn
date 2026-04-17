import { style } from "@vanilla-extract/css";
import { vars } from "../../styles";

export const chip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: vars.color.surfaceContainer,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.full,
  cursor: "pointer",
  color: vars.color.onSurface,
  fontFamily: vars.font.ui,
  fontSize: vars.text.labelS,
  selectors: {
    "&:hover": {
      background: vars.color.surfaceContainerHigh,
      borderColor: vars.color.primary,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "2px",
    },
  },
});
