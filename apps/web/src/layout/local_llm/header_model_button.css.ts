import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const button = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d2,
  padding: "6px 12px",
  background: "rgba(255,255,255,0.04)",
  color: vars.color.text.primary,
  border: "none",
  borderRadius: vars.radius.control,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: 500,
  cursor: "pointer",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
  transition:
    `background ${vars.motion.durationFast} ease, box-shadow ${vars.motion.durationFast} ease, color ${vars.motion.durationFast} ease`,
  ":hover": {
    background: "rgba(186,158,255,0.10)",
    boxShadow: "inset 0 0 0 1px rgba(186,158,255,0.32)",
  },
  ":focus-visible": {
    outline: "none",
    boxShadow: "inset 0 0 0 1.5px rgba(186,158,255,0.55)",
  },
});

export const placeholder = style({
  color: vars.color.text.secondary,
  fontStyle: "italic",
});

export const chevron = style({
  fontFamily: vars.font.code,
  color: vars.color.text.secondary,
  fontSize: vars.font.size.caption,
  marginLeft: "2px",
});
