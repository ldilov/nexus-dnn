import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

export const sectionHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  marginBottom: "4px",
});

export const sectionTitle = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const sectionHint = style({
  fontFamily: vars.font.code,
  fontSize: "9px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: vars.color.accent.secondary,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: "3px",
  maxHeight: "184px",
  overflowY: "auto",
  paddingRight: "4px",
  selectors: {
    "&::-webkit-scrollbar": { width: "4px" },
    "&::-webkit-scrollbar-track": { background: "transparent" },
    "&::-webkit-scrollbar-thumb": {
      background: vars.color.bg.elevated,
      borderRadius: "999px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: vars.color.accent.primary,
    },
  },
});

export const row = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "8px 10px",
  borderRadius: vars.radius.control,
  background: vars.color.bg.lowest,
  color: vars.color.text.primary,
  position: "relative",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  cursor: "pointer",
  selectors: {
    "&:hover": { background: vars.color.bg.elevated },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "-2px",
    },
  },
});

export const rowDefault = style({
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      left: 0,
      top: 6,
      bottom: 6,
      width: "2px",
      borderRadius: "2px",
      background: vars.color.accent.primary,
    },
  },
});

export const rowInstalled = style({
  color: vars.color.accent.primary,
});

export const rowLeft = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0,
});

export const label = style({
  fontFamily: vars.font.code,
  fontSize: "12px",
  fontWeight: 700,
});

export const size = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  color: vars.color.text.muted,
});

export const recommended = style({
  padding: "1px 6px",
  borderRadius: vars.radius.control,
  background: vars.color.accent.primaryDim,
  color: vars.color.accent.primary,
  fontFamily: vars.font.code,
  fontSize: "8px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
});

export const rowAction = style({
  appearance: "none",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "26px",
  height: "26px",
  borderRadius: vars.radius.control,
  color: vars.color.text.muted,
  transition: `color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": {
      color: vars.color.accent.primary,
      background: vars.color.bg.hover,
    },
    "&:disabled": { cursor: "default" },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const rowActionDone = style({
  color: vars.color.success.base,
});

export const rowActionFailed = style({
  color: vars.color.error.base,
});

export const spinner = style({
  fontSize: "16px",
});

export const progress = style({
  fontFamily: vars.font.code,
  fontSize: "9px",
  letterSpacing: "0.08em",
  color: vars.color.accent.secondary,
  marginLeft: "auto",
  whiteSpace: "nowrap",
});

export const progressBar = style({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: "2px",
  background: "transparent",
  overflow: "hidden",
  borderRadius: "0 0 6px 6px",
});

export const progressFill = style({
  height: "100%",
  background: vars.color.accent.primary,
  transition: `width ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
});
