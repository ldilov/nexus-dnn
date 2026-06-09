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
  // audit-allow: px — below minimum token granularity (sub-10px)
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
  // audit-allow: px — sub-token spacing value, no density token at this step
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
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
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
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: `10px ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  selectors: {
    "&:hover": { background: vars.color.bg.bright },
  },
});

/**
 * Secondary "Reinstall everything" CTA. Outlined / ghost styling so it sits
 * next to the primary install button without competing for attention — the
 * primary remains the green-path action; reinstall is the recovery action.
 */
export const reinstallButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  background: "transparent",
  border: `1px solid ${vars.color.bg.bright}`,
  cursor: "pointer",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: `9px ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.bg.elevated,
      borderColor: vars.color.accent.primary,
    },
    "&:disabled": {
      color: vars.color.text.muted,
      borderColor: vars.color.bg.elevated,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

/**
 * "Uninstall" CTA. Ghost/outlined like reinstall but danger-tinted on hover so
 * the reversal action reads as destructive without dominating the banner.
 */
export const uninstallButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.error.text,
  background: "transparent",
  border: `1px solid ${vars.color.bg.bright}`,
  cursor: "pointer",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: `9px ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, border-color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.bg.elevated,
      borderColor: vars.color.error.base,
    },
    "&:disabled": {
      color: vars.color.text.muted,
      borderColor: vars.color.bg.elevated,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.error.base}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
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
