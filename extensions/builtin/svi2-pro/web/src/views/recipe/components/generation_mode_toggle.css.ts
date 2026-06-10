import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/tokens.css";

export const note = style({
  fontSize: vars.text.micro,
  color: vars.color.textMuted,
  lineHeight: 1.5,
});
