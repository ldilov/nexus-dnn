import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/tokens.css";

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  width: "100%",
  borderRadius: vars.radius.lg,
  overflow: "hidden",
  background: vars.color.surfaceMuted,
});

export const video = style({
  width: "100%",
  height: "auto",
  display: "block",
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
  background: "rgba(0,0,0,0.32)",
  zIndex: 1,
  pointerEvents: "none",
});

export const spinner = style({
  width: "32px",
  height: "32px",
  borderRadius: vars.radius.pill,
  border: `3px solid ${vars.color.surfaceHigh}`,
  borderTopColor: vars.color.accent,
  animation: `${spin} 0.9s linear infinite`,
  "@media": {
    "(prefers-reduced-motion: reduce)": { animation: "none" },
  },
});

export const fpsBadge = style({
  position: "absolute",
  top: vars.space.md,
  right: vars.space.md,
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  background: "rgba(0,0,0,0.55)",
  color: vars.color.text,
  fontFamily: vars.font.mono,
  fontSize: vars.text.caption,
  letterSpacing: "0.04em",
  pointerEvents: "none",
  zIndex: 2,
});

export const emptyPanel = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.sm,
  minHeight: "180px",
  padding: vars.space.xl,
  textAlign: "center",
  color: vars.color.textMuted,
  fontSize: vars.text.caption,
});

export const errorPanel = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.sm,
  padding: vars.space.xl,
  textAlign: "center",
});

export const errorTitle = style({
  fontSize: vars.text.body,
  fontWeight: 600,
  color: vars.color.danger,
});

export const errorDetail = style({
  fontSize: vars.text.caption,
  color: vars.color.textMuted,
});
