import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const shell = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  background: vars.color.bg.app,
});

export const topBar = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapMd,
  padding: `${vars.space.insetMd} ${vars.space.insetLg}`,
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  background: vars.color.bg.panel,
});

export const heading = style({
  margin: 0,
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingLg,
  color: vars.color.text.primary,
  letterSpacing: "-0.01em",
});

export const devBadge = style({
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderRadius: vars.radius.full,
  background: `${vars.color.warning.base}1f`,
  color: vars.color.warning.text,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const topBarSpacer = style({
  flex: 1,
});

export const topBarMeta = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
});

export const docsLink = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  color: vars.color.accent.primary,
  textDecoration: "none",

  ":hover": {
    textDecoration: "underline",
  },
});

export const body = style({
  flex: 1,
  display: "grid",
  gridTemplateColumns: "240px 1fr 360px",
  overflow: "hidden",
});

export const bodyCol = style({
  height: "100%",
  overflow: "hidden",
  borderRight: `1px solid ${vars.color.outline.variant}`,
  selectors: {
    "&:last-child": {
      borderRight: "none",
    },
  },
});

export const errorBlock = style({
  padding: vars.space.insetLg,
  color: vars.color.error.text,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});
