import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: vars.space.insetLg,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const fieldLabel = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
});

export const fieldName = style({
  fontWeight: 500,
  letterSpacing: "0.01em",
});

export const fieldRequired = style({
  color: vars.color.accent.primary,
  fontSize: vars.font.size.caption,
  lineHeight: 1,
});

export const fieldDescription = style({
  margin: 0,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
});

export const fieldError = style({
  margin: 0,
  color: vars.color.error.base,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
});

const controlBase = style({
  width: "100%",
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  border: "1px solid transparent",
  outline: "none",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,

  ":focus": {
    borderColor: vars.color.accent.primary,
    background: vars.color.bg.hover,
  },
});

export const inputText = style([controlBase]);
export const inputSelect = style([controlBase]);
export const inputTextarea = style([
  controlBase,
  {
    fontFamily: vars.font.code,
    resize: "vertical",
    minHeight: "4.5rem",
  },
]);

export const toggle = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  cursor: "pointer",
});

export const emptyState = style({
  padding: vars.space.insetLg,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontStyle: "italic",
});

export const arrayRows = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const arrayEmpty = style({
  margin: 0,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontStyle: "italic",
});

export const arrayRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  padding: vars.space.insetMd,
  borderRadius: vars.radius.control,
  background: vars.color.bg.elevated,
});

export const arrayRowHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const arrayRowIndex = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const arrayRowRemove = style({
  padding: `0 ${vars.space.insetMd}`,
  border: "none",
  background: "transparent",
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  cursor: "pointer",

  ":hover": {
    color: vars.color.error.base,
  },
});

export const arrayObjectFields = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const arrayAdd = style({
  alignSelf: "flex-start",
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  border: `1px dashed ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.accent.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  cursor: "pointer",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,

  ":hover": {
    borderColor: vars.color.accent.primary,
    color: vars.color.accent.primaryHover,
  },
});
