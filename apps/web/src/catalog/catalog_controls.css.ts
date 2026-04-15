import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const bar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "12px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.panel,
  marginBottom: "18px",
});

export const searchWrap = style({
  position: "relative",
  flex: "1 1 220px",
  display: "flex",
  alignItems: "center",
});

export const searchInput = style({
  width: "100%",
  padding: "8px 12px 8px 34px",
  borderRadius: "8px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.canvas,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: "13px",
  outline: "none",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":focus": {
    borderColor: vars.color.accent.primary,
  },
});

export const searchIcon = style({
  position: "absolute",
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: vars.color.text.muted,
  pointerEvents: "none",
});

export const filterGroup = style({
  display: "inline-flex",
  gap: "6px",
});

export const filterChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "6px 10px",
  borderRadius: "999px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  cursor: "pointer",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}, background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: `${vars.color.accent.primary}66`,
    color: vars.color.text.primary,
  },
});

export const filterChipActive = style({
  borderColor: vars.color.accent.primary,
  color: vars.color.text.primary,
  background: `${vars.color.accent.primary}22`,
});

export const extensionSelect = style({
  padding: "6px 10px",
  borderRadius: "8px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.canvas,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  fontSize: "11px",
  outline: "none",
  cursor: "pointer",
});

export const resultCount = style({
  marginLeft: "auto",
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const clearAll = style({
  padding: "6px 12px",
  borderRadius: "999px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  fontSize: "11px",
  cursor: "pointer",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: `${vars.color.accent.primary}66`,
    color: vars.color.text.primary,
  },
});
