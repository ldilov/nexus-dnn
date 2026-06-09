import { style } from "@vanilla-extract/css";

import { vars } from "../../theme/contract.css";

export const fullScreen = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  padding: vars.space.insetXl,
  marginInline: "auto",
  width: "100%",
});

export const heading = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const eyebrow = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: vars.color.text.muted,
});

export const title = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.heading,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const subtitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
});

export const banner = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.gapLg,
  padding: vars.space.insetMd,
  marginBottom: vars.space.gapMd,
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
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
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

export const link = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.accent.primary,
  textDecoration: "none",
  selectors: {
    "&:hover": { textDecoration: "underline" },
  },
});

export const ghostButton = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: `6px ${vars.space.insetSm}`,
  borderRadius: vars.radius.control,
  selectors: {
    "&:hover": { color: vars.color.text.primary },
  },
});

export const stateShell = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: vars.space.insetXl,
  textAlign: "center",
});

export const stateMessage = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
});

export const escapeRow = style({
  display: "flex",
  justifyContent: "flex-end",
});
