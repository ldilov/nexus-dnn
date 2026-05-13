import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  width: "100%",
  borderRadius: vars.radius.card,
  overflow: "hidden",
  background: vars.color.bg.panel,
});

export const video = style({
  width: "100%",
  height: "auto",
  display: "block",
  background: "#000",
});

export const audio = style({
  width: "100%",
  padding: vars.space.insetSm,
});

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const loadingOverlay = style({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.32)",
  zIndex: 1,
  pointerEvents: "none",
});

export const spinner = style({
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: `3px solid ${vars.color.bg.elevated}`,
  borderTopColor: vars.color.accent.primary,
  animation: `${spin} 0.9s linear infinite`,
});

export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
  padding: vars.space.insetSm,
  gap: vars.space.gapSm,
});

export const downloadButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  padding: `${vars.space.insetSm} ${vars.space.insetMd}`,
  borderRadius: vars.radius.control,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  textDecoration: "none",
  transition: "filter 120ms ease",
  ":hover": { filter: "brightness(1.1)" },
  ":focus-visible": {
    outline: `2px solid ${vars.color.accent.primary}`,
    outlineOffset: 2,
  },
});

export const errorPanel = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.gapSm,
  padding: vars.space.insetLg,
  textAlign: "center",
});

export const errorTitle = style({
  fontSize: vars.font.size.body,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.error.text,
});

export const errorDetail = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
});

export const downloadFallbackLink = style({
  marginTop: vars.space.gapSm,
  color: vars.color.accent.primary,
  textDecoration: "underline",
});
