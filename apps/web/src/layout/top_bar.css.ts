import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const leftZone = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  flex: "0 0 auto",
});

export const logo = style({
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.bold,
  color: vars.color.accent.primary,
  lineHeight: 1,
});

export const projectName = style({
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  maxWidth: "200px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const savedDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.state.completed,
});

export const centerZone = style({
  display: "flex",
  justifyContent: "center",
  flex: 1,
});

export const commandTrigger = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: `${vars.space.insetXs} ${vars.space.insetLg}`,
  backgroundColor: vars.color.bg.elevated,
  borderRadius: vars.radius.control,
  border: "none",
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  fontFamily: vars.font.ui,
  cursor: "pointer",
  minWidth: "240px",
  maxWidth: "280px",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
  },
});

export const shortcutHint = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  marginLeft: "auto",
});

export const rightZone = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  flex: "0 0 auto",
});

export const controlGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
});

export const healthBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  fontSize: vars.font.size.caption,
  color: vars.color.text.secondary,
});

export const healthDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.state.completed,
});
