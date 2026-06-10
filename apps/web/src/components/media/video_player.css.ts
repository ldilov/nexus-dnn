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
  // audit-allow: hex — letterbox backdrop must stay pure black behind video frames
  background: "#000",
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
  // audit-allow: rgba — translucent scrim over arbitrary video content
  background: "rgba(0,0,0,0.32)",
  zIndex: 1,
  pointerEvents: "none",
});

export const spinner = style({
  width: 32,
  height: 32,
  borderRadius: vars.radius.full,
  border: `3px solid ${vars.color.bg.elevated}`,
  borderTopColor: vars.color.accent.primary,
  animation: `${spin} 0.9s linear infinite`,
});

export const fpsBadge = style({
  position: "absolute",
  top: vars.space.insetSm,
  right: vars.space.insetSm,
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.space.insetXs} ${vars.space.insetSm}`,
  borderRadius: vars.radius.control,
  // audit-allow: rgba — glass chip floating over arbitrary video content
  background: "rgba(0,0,0,0.55)",
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  letterSpacing: "0.04em",
  pointerEvents: "none",
  zIndex: 2,
});

export const emptyPanel = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.gapSm,
  minHeight: 160,
  padding: vars.space.insetLg,
  textAlign: "center",
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
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
