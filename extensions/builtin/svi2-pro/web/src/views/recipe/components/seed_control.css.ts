import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const input = style({
  width: "168px",
  height: "42px",
  background: vars.color.surface,
  border: "none",
  boxShadow: `inset 0 0 0 1px ${vars.color.borderSubtle}`,
  borderRadius: "9px",
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: "15px",
  fontWeight: vars.weight.semibold,
  fontVariantNumeric: "tabular-nums",
  padding: "0 14px",
  outline: "none",
  transition: `box-shadow ${vars.motion.fast}`,
  selectors: {
    "&:focus-visible": {
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}, 0 0 0 3px ${vars.color.accentGlow}`,
    },
  },
});
