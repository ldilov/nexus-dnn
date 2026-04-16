import { style } from "@vanilla-extract/css";
import { motion, vars } from "../../styles";

export const root = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
});

export const identityBanner = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  padding: `${vars.space.md} ${vars.space.xl}`,
  background: vars.color.surfaceContainerLow,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
});

export const backLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  color: vars.color.onSurfaceVariant,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: vars.text.bodyS,
  padding: 0,
});

export const statusDot = style({
  width: "8px",
  height: "8px",
  borderRadius: vars.radius.full,
  background: vars.color.acidGreen,
  flexShrink: 0,
});

export const idText = style({
  fontFamily: vars.font.mono,
  fontSize: vars.text.bodyS,
  color: vars.color.onSurfaceVariant,
});

export const displayName = style({
  fontFamily: vars.font.ui,
  fontSize: vars.text.titleS,
  fontWeight: 600,
  color: vars.color.onSurface,
});

export const sourceBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: vars.color.surfaceContainer,
  borderRadius: vars.radius.full,
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
});

export const bannerActions = style({
  display: "flex",
  gap: vars.space.sm,
  marginLeft: "auto",
});

export const primaryBtn = style({
  background: vars.color.primary,
  color: vars.color.onPrimary,
  border: "none",
  padding: `${vars.space.xs} ${vars.space.md}`,
  fontWeight: 600,
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  fontSize: vars.text.bodyS,
  selectors: {
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:hover:not(:disabled)": { background: vars.color.primaryDim },
  },
});

export const secondaryBtn = style({
  background: "transparent",
  color: vars.color.onSurface,
  border: `1px solid ${vars.color.outlineVariant}`,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  fontSize: vars.text.bodyS,
  selectors: {
    "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
    "&:hover:not(:disabled)": { background: vars.color.surfaceContainer },
  },
});

export const warningBanner = style({
  padding: `${vars.space.sm} ${vars.space.xl}`,
  background: vars.color.tertiaryContainer,
  color: vars.color.onTertiaryContainer,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
  fontSize: vars.text.bodyS,
});

export const draftBanner = style({
  padding: `${vars.space.sm} ${vars.space.xl}`,
  background: vars.color.surfaceContainerHigh,
  color: vars.color.onSurface,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
  fontSize: vars.text.bodyS,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.md,
});

export const tabBar = style({
  display: "flex",
  gap: vars.space.xs,
  padding: `0 ${vars.space.xl}`,
  background: vars.color.surface,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
});

export const tabBtn = style({
  background: "transparent",
  border: "none",
  color: vars.color.onSurfaceVariant,
  padding: `${vars.space.md} ${vars.space.lg}`,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyM,
  borderBottom: "2px solid transparent",
  transition: `color ${motion.duration.tabCrossfade}, border-color ${motion.duration.tabCrossfade}`,
  selectors: {
    "&[aria-selected='true']": {
      color: vars.color.primary,
      borderBottomColor: vars.color.primary,
    },
    "&:hover": { color: vars.color.onSurface },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "-2px",
    },
  },
});

export const panel = style({
  flex: 1,
  overflow: "auto",
  padding: vars.space.xl,
});

export const readOnlyNote = style({
  padding: vars.space.md,
  background: vars.color.surfaceContainerLow,
  border: `1px dashed ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.md,
  color: vars.color.onSurfaceVariant,
  fontSize: vars.text.bodyS,
  marginBottom: vars.space.lg,
});

export const stepRow = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: vars.space.md,
  padding: vars.space.md,
  background: vars.color.surfaceContainerLow,
  borderRadius: vars.radius.md,
  marginBottom: vars.space.sm,
});

export const stepNumber = style({
  fontFamily: vars.font.mono,
  color: vars.color.onSurfaceVariant,
  fontWeight: 700,
});

export const errorBox = style({
  padding: vars.space.lg,
  background: vars.color.errorContainer,
  color: vars.color.onErrorContainer,
  borderRadius: vars.radius.md,
  margin: vars.space.xl,
});

export const payloadPre = style({
  fontFamily: vars.font.mono,
  background: vars.color.surfaceContainer,
  padding: vars.space.lg,
  borderRadius: vars.radius.md,
  overflow: "auto",
  fontSize: vars.text.labelM,
});
