import { style } from "@vanilla-extract/css";
import { vars } from "../theme/tokens.css";

export const sectionLabel = style({
  fontFamily: vars.font.body,
  fontSize: vars.text.caption,
  textTransform: "uppercase",
  letterSpacing: vars.tracking.label,
  color: vars.color.textMuted,
  margin: 0,
  marginBottom: vars.space.md,
});
