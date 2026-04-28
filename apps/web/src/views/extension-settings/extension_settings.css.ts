import { style } from "@vanilla-extract/css";

import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  padding: vars.space.insetLg,
  maxWidth: "960px",
  margin: "0 auto",
  width: "100%",
});

export const breadcrumb = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: vars.color.text.muted,
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapXs,
});

export const breadcrumbLink = style({
  color: vars.color.text.muted,
  textDecoration: "none",
  selectors: {
    "&:hover": { color: vars.color.text.primary },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const tabBar = style({
  display: "flex",
  gap: vars.space.gapSm,
  padding: vars.space.insetXs,
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  width: "fit-content",
});

export const tabButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: `8px ${vars.space.insetLg}`,
  borderRadius: vars.radius.control,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}, color ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  selectors: {
    "&:hover": { color: vars.color.text.primary },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.accent.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const tabActive = style({
  background: vars.color.bg.bright,
  color: vars.color.text.primary,
});

export const tabPanel = style({
  minHeight: "320px",
});

export const errorState = style({
  padding: vars.space.insetXl,
  textAlign: "center",
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.error.text,
});
