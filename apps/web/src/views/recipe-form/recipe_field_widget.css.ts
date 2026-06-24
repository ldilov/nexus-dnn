import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  width: "100%",
});

export const input = style({
  width: "100%",
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  background: vars.color.bg.lowest,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  lineHeight: vars.font.lineHeight.normal,
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":focus": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: vars.focus.offset,
    borderColor: vars.color.accent.primary,
  },
  ":disabled": {
    opacity: 0.55,
    cursor: "not-allowed",
  },
});

export const select = style([
  input,
  {
    cursor: "pointer",
    ":disabled": {
      opacity: 0.55,
      cursor: "not-allowed",
    },
  },
]);

export const checkboxRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const checkbox = style({
  width: vars.icon.md,
  height: vars.icon.md,
  accentColor: vars.color.accent.primary,
  cursor: "pointer",
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.55,
  },
});

export const assetPicker = style({
  width: "100%",
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  background: vars.color.bg.lowest,
  border: `1px dashed ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  cursor: "pointer",
  ":disabled": {
    opacity: 0.55,
    cursor: "not-allowed",
  },
});
