import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "28px",
});

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: "14px",
});

export const groupHeader = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: "16px",
  paddingBottom: "8px",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const groupLabel = style({
  display: "flex",
  alignItems: "baseline",
  gap: "12px",
  flexWrap: "wrap",
});

export const groupName = style({
  fontFamily: vars.font.headline,
  fontSize: "18px",
  fontWeight: 600,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
});

export const groupVersion = style({
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.text.secondary,
});

export const groupCount = style({
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: vars.color.text.muted,
});

export const groupActions = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const revealButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 10px",
  borderRadius: "8px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  fontSize: "11px",
  cursor: "pointer",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: `${vars.color.accent.primary}66`,
    color: vars.color.text.primary,
  },
});

export const bannerInfo = style({
  padding: "10px 14px",
  borderRadius: "10px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.panel,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: "13px",
});

export const emptyWrap = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  padding: "56px 24px",
  textAlign: "center",
  color: vars.color.text.secondary,
});

export const emptyTitle = style({
  fontFamily: vars.font.headline,
  fontSize: "18px",
  color: vars.color.text.primary,
});

export const emptyHint = style({
  fontFamily: vars.font.ui,
  fontSize: "13px",
  maxWidth: "480px",
  lineHeight: 1.5,
});
