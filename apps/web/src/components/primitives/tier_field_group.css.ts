import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: vars.radius.card,
  background: vars.color.bg.panel,
  overflow: "hidden",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  width: "100%",
  padding: `${vars.space.insetMd} ${vars.space.insetLg}`,
  background: "transparent",
  border: "none",
  color: vars.color.text.primary,
  cursor: "pointer",
  textAlign: "left",
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    background: vars.color.bg.hover,
  },
  ":focus-visible": {
    outline: `${vars.focus.ringWidth} solid ${vars.color.accent.primary}`,
    outlineOffset: `-${vars.focus.ringWidth}`,
  },
});

export const chevron = style({
  display: "inline-flex",
  width: vars.icon.sm,
  height: vars.icon.sm,
  color: vars.color.text.secondary,
  transition: `transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
});

export const chevronCollapsed = style({
  transform: "rotate(-90deg)",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  flex: 1,
  minWidth: 0,
});

export const title = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const description = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const badgeSlot = style({
  display: "inline-flex",
  alignItems: "center",
  marginLeft: "auto",
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  padding: `0 ${vars.space.insetLg} ${vars.space.insetLg}`,
});
