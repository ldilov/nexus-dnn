import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.insetSm,
});

export const sectionHead = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.insetMd,
  marginBottom: vars.space.gapSm,
});

export const sectionTitle = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.text.muted,
});

export const sectionHint = style({
  fontFamily: vars.font.code,
  // audit-allow: px — hint font 9px is below minimum font token (kbd=10px); intentional dense label
  fontSize: "9px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: vars.color.accent.secondary,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — variant row gap 3px is below minimum token granularity (sub-4px)
  gap: "3px",
  // audit-allow: px — variant list max-height 184px is a fixed layout constraint for scroll containment
  maxHeight: "184px",
  overflowY: "auto",
  paddingRight: vars.space.gapSm,
  selectors: {
    "&::-webkit-scrollbar": { width: vars.space.gapSm },
    "&::-webkit-scrollbar-track": { background: "transparent" },
    "&::-webkit-scrollbar-thumb": {
      background: vars.color.bg.elevated,
      borderRadius: vars.radius.full,
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
  gap: vars.space.gapMd,
  // audit-allow: px — design-grid micro-rhythm value, no token between gapSm(4) and gapMd(12)
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
      // audit-allow: px — WCAG 2.2 focus ring uses 2px width with -2px inset offset per design contract
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — WCAG 2.2 focus ring uses 2px width with -2px inset offset per design contract
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
      // audit-allow: px — indicator stripe top/bottom inset 6px aligns with row padding; no token match
      top: 6,
      bottom: 6,
      // audit-allow: px — indicator stripe width 2px is a fixed decorative border, below token granularity
      width: "2px",
      // audit-allow: px — indicator stripe border-radius 2px is below token granularity
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
  // audit-allow: px — design-grid micro-rhythm value, no token between gapSm(4) and gapMd(12)
  gap: "10px",
  minWidth: 0,
});

export const label = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  fontWeight: 700,
});

export const size = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  color: vars.color.text.muted,
});

export const recommended = style({
  // audit-allow: px — recommended badge vertical padding 1px is below minimum token granularity (sub-4px)
  padding: "1px 6px",
  borderRadius: vars.radius.control,
  background: vars.color.accent.primaryDim,
  color: vars.color.accent.primary,
  fontFamily: vars.font.code,
  // audit-allow: px — recommended badge font 8px is below minimum font token (kbd=10px); intentional dense badge
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
  // audit-allow: px — action button hit-target 26×26px is a fixed UX geometry below density.d8 (44px cozy)
  width: "26px",
  // audit-allow: px — action button hit-target 26×26px is a fixed UX geometry below density.d8 (44px cozy)
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
      // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
      outline: `2px solid ${vars.color.accent.primary}`,
      // audit-allow: px — WCAG 2.2 focus ring uses 2px width + 2px offset per design contract
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
  fontSize: vars.icon.md,
});

export const progress = style({
  fontFamily: vars.font.code,
  // audit-allow: px — progress font 9px is below minimum font token (kbd=10px); intentional dense inline label
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
  // audit-allow: px — progress bar height 2px is a fixed decorative stripe, below token granularity
  height: "2px",
  background: "transparent",
  overflow: "hidden",
  // audit-allow: px — progress bar border-radius 6px rounds bottom corners to match row radius; exact match to radius.control(6px) intentional
  borderRadius: `0 0 ${vars.radius.control} ${vars.radius.control}`,
});

export const progressFill = style({
  height: "100%",
  background: vars.color.accent.primary,
  transition: `width ${vars.motion.durationNormal} ${vars.motion.easingDefault}`,
});
