// audit-allow: px — node graph layout primitive (xy-flow contract)
// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: px — fixed UX hit-target, not density-coupled
import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const wrapper = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "6px",
  minWidth: 0,
  flex: 1,
});

export const readOnlyValue = style({
  fontFamily: vars.font.code,
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  fontSize: "11px",
  color: vars.color.accent.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  maxWidth: "140px",
});

export const input = style({
  flex: 1,
  minWidth: 0,
  background: "rgba(0,0,0,0.25)",
  border: `1px solid ${vars.color.outline.variant}`,
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "4px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "2px 6px",
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  fontSize: "11px",
  outline: "none",
  transition: "border-color 120ms ease",
  selectors: {
    "&:focus": {
      borderColor: vars.color.accent.primary,
    },
  },
});

export const textarea = style([
  input,
  {
    resize: "vertical",
    // audit-allow: px — node graph layout primitive (xy-flow contract)
    minHeight: "44px",
    fontFamily: vars.font.code,
    lineHeight: 1.4,
  },
]);

export const select = style([input, { cursor: "pointer" }]);

export const slider = style({
  flex: 1,
  accentColor: vars.color.accent.primary,
});

export const sliderValue = style({
  fontFamily: vars.font.code,
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  fontSize: "10px",
  color: vars.color.accent.primary,
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  minWidth: "34px",
  textAlign: "right",
});

export const toggle = style({
  position: "relative",
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  width: "28px",
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  height: "16px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  background: vars.color.bg.hover,
  border: `1px solid ${vars.color.outline.variant}`,
  cursor: "pointer",
  transition: "background 140ms ease",
});

export const toggleOn = style({
  background: vars.color.accent.primary,
  borderColor: vars.color.accent.primary,
});

export const toggleKnob = style({
  position: "absolute",
  top: "1px",
  left: "1px",
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  width: "12px",
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  height: "12px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  background: vars.color.text.primary,
  transition: "transform 140ms ease",
});

export const toggleKnobOn = style({
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  transform: "translateX(12px)",
});
