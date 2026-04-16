import { style } from "@vanilla-extract/css";
import { motion, vars } from "../styles";

export const scrim = style({
  position: "fixed",
  inset: 0,
  background: vars.color.scrim,
  zIndex: vars.z.drawer,
  display: "flex",
  justifyContent: "flex-end",
});

export const drawer = style({
  width: "min(520px, 100%)",
  height: "100vh",
  background: vars.color.surfaceContainerLow,
  borderLeft: `1px solid ${vars.color.outlineVariant}`,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `${vars.space.lg} ${vars.space.xl}`,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
});

export const title = style({
  fontSize: vars.text.titleM,
  fontWeight: 600,
  color: vars.color.onSurface,
  margin: 0,
  letterSpacing: vars.tracking.tight,
});

export const closeButton = style({
  background: "transparent",
  border: "none",
  color: vars.color.onSurfaceVariant,
  cursor: "pointer",
  padding: vars.space.xs,
  borderRadius: vars.radius.md,
  selectors: {
    "&:hover": { background: vars.color.surfaceContainerHigh },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const body = style({
  flex: 1,
  padding: vars.space.xl,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const dropZone = style({
  border: `2px dashed ${vars.color.outline}`,
  borderRadius: vars.radius.lg,
  padding: `${vars.space["3xl"]} ${vars.space.xl}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.md,
  cursor: "pointer",
  color: vars.color.onSurfaceVariant,
  transition: `background ${motion.duration.cardGlow}, border-color ${motion.duration.cardGlow}`,
  selectors: {
    "&[data-dragover='true']": {
      borderColor: vars.color.primary,
      background: vars.color.surfaceContainer,
    },
    "&:hover": {
      borderColor: vars.color.outlineVariant,
      background: vars.color.surfaceContainer,
    },
  },
});

export const dropIcon = style({
  fontSize: "48px",
  color: vars.color.primary,
});

export const dropText = style({
  fontSize: vars.text.bodyL,
  fontWeight: 500,
  color: vars.color.onSurface,
});

export const dropHint = style({
  fontSize: vars.text.bodyS,
  color: vars.color.onSurfaceVariant,
});

export const hiddenInput = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const state = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  padding: vars.space.lg,
  borderRadius: vars.radius.lg,
  background: vars.color.surfaceContainer,
});

export const stateTitle = style({
  fontSize: vars.text.bodyM,
  fontWeight: 600,
  color: vars.color.onSurface,
  margin: 0,
});

export const stateMessage = style({
  fontSize: vars.text.bodyS,
  color: vars.color.onSurfaceVariant,
  fontFamily: vars.font.mono,
  margin: 0,
});

export const success = style({
  borderLeft: `3px solid ${vars.color.acidGreen}`,
});

export const error = style({
  borderLeft: `3px solid ${vars.color.error}`,
});

export const info = style({
  borderLeft: `3px solid ${vars.color.secondary}`,
});

export const footer = style({
  display: "flex",
  gap: vars.space.md,
  padding: `${vars.space.lg} ${vars.space.xl}`,
  borderTop: `1px solid ${vars.color.outlineVariant}`,
  justifyContent: "flex-end",
});

export const primaryBtn = style({
  background: vars.color.primary,
  color: vars.color.onPrimary,
  border: "none",
  padding: `${vars.space.sm} ${vars.space.lg}`,
  fontWeight: 600,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  selectors: {
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    "&:hover:not(:disabled)": { background: vars.color.primaryDim },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const secondaryBtn = style({
  background: "transparent",
  color: vars.color.onSurface,
  border: `1px solid ${vars.color.outlineVariant}`,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  selectors: {
    "&:hover": { background: vars.color.surfaceContainer },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "2px",
    },
  },
});
