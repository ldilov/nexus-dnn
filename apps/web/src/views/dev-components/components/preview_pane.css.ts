import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  height: "100%",
  overflow: "hidden",
  background: vars.color.bg.canvas,
});

export const stage = style({
  flex: 1,
  overflow: "auto",
  padding: vars.space.insetLg,
  borderRadius: vars.radius.card,
  margin: vars.space.insetMd,
  background: vars.color.bg.panel,
  boxShadow: `inset 0 0 0 1px ${vars.color.outline.variant}`,
  position: "relative",
  // Creates a containing block for position:fixed descendants so overlays
  // (install_modal, future modals/popovers) stay bounded inside the stage
  // instead of taking over the whole playground.
  transform: "translateZ(0)",
  contain: "layout paint",
});

export const empty = style({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: vars.space.insetLg,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontStyle: "italic",
});

export const info = style({
  margin: `0 ${vars.space.insetMd}`,
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  background: `${vars.color.accent.primary}14`,
  color: vars.color.text.secondary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  lineHeight: 1.4,
});

export const warn = style({
  margin: `0 ${vars.space.insetMd}`,
  padding: `${vars.space.insetXs} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  background: `${vars.color.warning.base}14`,
  color: vars.color.warning.text,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
});

export const error = style({
  margin: vars.space.insetMd,
  padding: vars.space.insetMd,
  borderRadius: vars.radius.control,
  background: `${vars.color.error.base}14`,
  color: vars.color.error.text,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  whiteSpace: "pre-wrap",
});
