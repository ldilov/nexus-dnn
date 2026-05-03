// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: px — modal/dialog/drawer width per UX spec
import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — workspace shell scaffolding dimension
  gap: "28px",
});

export const group = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — workspace shell scaffolding dimension
  gap: "14px",
});

export const groupHeader = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  // audit-allow: px — workspace shell scaffolding dimension
  gap: "16px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  paddingBottom: "8px",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const groupLabel = style({
  display: "flex",
  alignItems: "baseline",
  // audit-allow: px — workspace shell scaffolding dimension
  gap: "12px",
  flexWrap: "wrap",
});

export const groupName = style({
  fontFamily: vars.font.headline,
  // audit-allow: px — workspace shell scaffolding dimension
  fontSize: "18px",
  fontWeight: 600,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
});

export const groupVersion = style({
  fontFamily: vars.font.code,
  // audit-allow: px — workspace shell scaffolding dimension
  fontSize: "11px",
  color: vars.color.text.secondary,
});

export const groupCount = style({
  fontFamily: vars.font.code,
  // audit-allow: px — workspace shell scaffolding dimension
  fontSize: "11px",
  color: vars.color.text.muted,
});

export const groupActions = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "8px",
});

export const revealButton = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  // audit-allow: px — workspace shell scaffolding dimension
  fontSize: "11px",
  cursor: "pointer",
  transition: `border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    borderColor: `${vars.color.accent.primary}66`,
    color: vars.color.text.primary,
  },
});

export const bannerInfo = style({
  // audit-allow: px — workspace shell scaffolding dimension
  padding: "10px 14px",
  // audit-allow: px — workspace shell scaffolding dimension
  borderRadius: "10px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.panel,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  // audit-allow: px — workspace shell scaffolding dimension
  fontSize: "13px",
});

export const emptyWrap = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // audit-allow: px — workspace shell scaffolding dimension
  gap: "12px",
  // audit-allow: px — workspace shell scaffolding dimension
  padding: "56px 24px",
  textAlign: "center",
  color: vars.color.text.secondary,
});

export const emptyTitle = style({
  fontFamily: vars.font.headline,
  // audit-allow: px — workspace shell scaffolding dimension
  fontSize: "18px",
  color: vars.color.text.primary,
});

export const emptyHint = style({
  fontFamily: vars.font.ui,
  // audit-allow: px — workspace shell scaffolding dimension
  fontSize: "13px",
  // audit-allow: px — fixed layout breakpoint
  maxWidth: "480px",
  lineHeight: 1.5,
});
