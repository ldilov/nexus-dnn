import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const inputStyle = style({
  width: "100%",
  padding: `${vars.space.sm} ${vars.space.md}`,
  backgroundColor: vars.color.surface.base,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.border.default}`,
  borderRadius: vars.radius.md,
  fontSize: vars.font.size.sm,
  fontFamily: vars.font.family.body,
  lineHeight: vars.font.lineHeight.normal,
  outline: "none",
  transition: "border-color 150ms",
  ":focus": {
    borderColor: vars.color.accent.primary,
  },
  "::placeholder": {
    color: vars.color.text.muted,
  },
});
