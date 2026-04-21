import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const wrapper = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  minWidth: 0,
  flex: 1,
});

export const readOnlyValue = style({
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.accent.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "140px",
});

export const input = style({
  flex: 1,
  minWidth: 0,
  background: "rgba(0,0,0,0.25)",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: "4px",
  padding: "2px 6px",
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
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
  fontSize: "10px",
  color: vars.color.accent.primary,
  minWidth: "34px",
  textAlign: "right",
});

export const toggle = style({
  position: "relative",
  width: "28px",
  height: "16px",
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
  width: "12px",
  height: "12px",
  borderRadius: "999px",
  background: vars.color.text.primary,
  transition: "transform 140ms ease",
});

export const toggleKnobOn = style({
  transform: "translateX(12px)",
});
