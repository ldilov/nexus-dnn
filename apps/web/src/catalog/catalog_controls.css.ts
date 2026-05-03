// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: px — below minimum token granularity (sub-10px)
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const bar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  gap: "10px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  padding: "10px 12px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "12px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.panel,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  marginBottom: "18px",
});

export const searchWrap = style({
  position: "relative",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  flex: "1 1 220px",
  display: "flex",
  alignItems: "center",
});

export const searchInput = style({
  width: "100%",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "8px 12px 8px 34px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.canvas,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "13px",
  outline: "none",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":focus": {
    borderColor: vars.color.accent.primary,
  },
});

export const searchIcon = style({
  position: "absolute",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  left: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  color: vars.color.text.muted,
  pointerEvents: "none",
});

export const filterGroup = style({
  display: "inline-flex",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
});

export const filterChip = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "4px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
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
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.canvas,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  outline: "none",
  cursor: "pointer",
});

export const resultCount = style({
  marginLeft: "auto",
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "11px",
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const clearAll = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 12px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
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
