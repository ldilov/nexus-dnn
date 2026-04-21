import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  padding: vars.space.insetXl,
  maxWidth: "960px",
  width: "100%",
  margin: "0 auto",
  boxSizing: "border-box",
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  boxShadow: vars.shadow.md,
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const title = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
  margin: 0,
});

export const subtitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  display: "flex",
  alignItems: "baseline",
  gap: vars.space.gapSm,
});

export const installId = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  letterSpacing: "0.04em",
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapLg,
  paddingBlock: vars.space.insetMd,
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: vars.space.insetSm,
});

export const emptyState = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "240px",
  padding: vars.space.insetXl,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.muted,
  textAlign: "center",
  background: vars.color.bg.panel,
  borderRadius: vars.radius.panel,
  boxShadow: vars.shadow.sm,
});

export const loadingVeil = style({
  opacity: 0.6,
  transition: `opacity ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
});
