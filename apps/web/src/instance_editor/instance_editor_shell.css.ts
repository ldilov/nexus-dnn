import { style } from "@vanilla-extract/css";
import { motion, vars } from "../styles";

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

export const moduleBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  background: vars.color.surfaceContainer,
  borderRadius: vars.radius.full,
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
});

export const revisionBtn = style({
  background: vars.color.surfaceContainer,
  color: vars.color.onSurface,
  border: `1px solid ${vars.color.outlineVariant}`,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.md,
  fontFamily: vars.font.mono,
  fontSize: vars.text.bodyS,
  cursor: "pointer",
  marginLeft: "auto",
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

export const segmentedControl = style({
  display: "inline-flex",
  background: vars.color.surfaceContainer,
  padding: "2px",
  borderRadius: vars.radius.md,
  marginBottom: vars.space.lg,
});

export const segmentBtn = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  background: "transparent",
  border: "none",
  borderRadius: vars.radius.sm,
  color: vars.color.onSurfaceVariant,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyS,
  selectors: {
    "&[aria-selected='true']": {
      background: vars.color.surfaceContainerHighest,
      color: vars.color.onSurface,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const dirtyDot = style({
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.tertiary,
  marginLeft: vars.space.xs,
});

export const draftBanner = style({
  padding: `${vars.space.sm} ${vars.space.xl}`,
  background: vars.color.tertiaryContainer,
  color: vars.color.onTertiaryContainer,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
  fontSize: vars.text.bodyS,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const viewingBanner = style({
  padding: `${vars.space.sm} ${vars.space.xl}`,
  background: vars.color.secondaryContainer,
  color: vars.color.onSecondaryContainer,
  borderBottom: `1px solid ${vars.color.outlineVariant}`,
  fontSize: vars.text.bodyS,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: `transform ${motion.duration.viewingBannerEntrance}`,
});

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
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
});

export const errorBox = style({
  padding: vars.space.lg,
  background: vars.color.errorContainer,
  color: vars.color.onErrorContainer,
  borderRadius: vars.radius.md,
  margin: vars.space.xl,
});
