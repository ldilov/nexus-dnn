import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const scrim = style({
  position: "fixed",
  inset: 0,
  background: vars.color.scrim,
  backdropFilter: "blur(2px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: vars.z.modal,
  padding: vars.space.gapLg,
});

export const dialog = style({
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.panel,
  boxShadow: vars.shadow.lg,
  width: "min(440px, 100%)",
  maxHeight: "calc(100vh - 4rem)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  outline: `1px solid ${vars.color.outline.base}`,
});

export const header = style({
  padding: `${vars.space.insetMd} ${vars.space.insetLg} ${vars.space.insetSm}`,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const title = style({
  fontSize: vars.font.size.heading,
  fontFamily: vars.font.headline,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  margin: 0,
  letterSpacing: "-0.01em",
});

export const eyebrow = style({
  fontSize: vars.font.size.caption,
  fontFamily: vars.font.code,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: vars.color.text.muted,
});

export const body = style({
  padding: `0 ${vars.space.insetLg} ${vars.space.insetMd}`,
  color: vars.color.text.secondary,
  fontSize: vars.font.size.body,
  lineHeight: vars.font.lineHeight.relaxed,
});

export const list = style({
  margin: `${vars.space.gapSm} 0 0`,
  paddingLeft: vars.space.insetLg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});

export const input = style({
  width: "100%",
  height: vars.control.heightMd,
  marginTop: vars.space.gapSm,
  padding: `0 ${vars.space.insetMd}`,
  background: vars.color.bg.lowest,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  outline: "none",
  selectors: {
    "&:focus": { borderColor: vars.color.accent.primary },
  },
});

export const footer = style({
  padding: `${vars.space.insetSm} ${vars.space.insetLg} ${vars.space.insetLg}`,
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space.gapMd,
});
