import { style } from "@vanilla-extract/css";

import { vars } from "../../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
});

export const banner = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.gapLg,
  padding: vars.space.insetLg,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
});

export const bannerText = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const bannerTitle = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const bannerSubtitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
});

export const bannerActions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
});

export const installButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.onColor.primary,
  background: vars.color.accent.primary,
  border: "none",
  cursor: "pointer",
  padding: `10px ${vars.space.insetXl}`,
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, transform ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent.primaryHover,
      transform: "translateY(-1px)",
    },
    "&:active:not(:disabled)": { transform: "translateY(0)" },
    "&:disabled": {
      background: vars.color.bg.elevated,
      color: vars.color.text.muted,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const cancelButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  background: vars.color.bg.elevated,
  border: "none",
  cursor: "pointer",
  padding: `10px ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  selectors: {
    "&:hover": { background: vars.color.bg.bright },
  },
});

export const stepList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
});

export const emptyState = style({
  padding: vars.space.insetXl,
  textAlign: "center",
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
});

export const allSatisfied = style({
  background: `linear-gradient(135deg, ${vars.color.accent.secondaryContainer}, ${vars.color.bg.panel})`,
});
