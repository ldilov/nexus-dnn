import { style } from "@vanilla-extract/css";
import { vars } from "../styles";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.xl,
  height: "100%",
  overflow: "auto",
});

export const header = style({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: vars.space.lg,
  flexWrap: "wrap",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const title = style({
  fontSize: vars.text.titleL,
  fontWeight: 600,
  color: vars.color.onSurface,
  margin: 0,
  letterSpacing: vars.tracking.tight,
});

export const subtitle = style({
  fontSize: vars.text.bodyM,
  color: vars.color.onSurfaceVariant,
  margin: 0,
  maxWidth: "60ch",
});

export const controls = style({
  display: "flex",
  gap: vars.space.md,
  alignItems: "center",
  flexWrap: "wrap",
});

export const search = style({
  background: vars.color.surfaceContainer,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.md,
  padding: `${vars.space.sm} ${vars.space.md}`,
  color: vars.color.onSurface,
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyM,
  minWidth: "240px",
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const facetGroup = style({
  display: "inline-flex",
  background: vars.color.surfaceContainer,
  borderRadius: vars.radius.md,
  padding: "2px",
  gap: "2px",
});

export const facetBtn = style({
  padding: `${vars.space.xs} ${vars.space.md}`,
  background: "transparent",
  border: "none",
  borderRadius: vars.radius.sm,
  color: vars.color.onSurfaceVariant,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyS,
  selectors: {
    "&[aria-pressed='true']": {
      background: vars.color.surfaceContainerHighest,
      color: vars.color.onSurface,
    },
    "&:hover": { color: vars.color.onSurface },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const primaryCta = style({
  background: vars.color.primary,
  color: vars.color.onPrimary,
  border: "none",
  padding: `${vars.space.sm} ${vars.space.lg}`,
  fontWeight: 600,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyS,
  selectors: {
    "&:hover": { background: vars.color.primaryDim },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "2px",
    },
  },
});

export const secondaryCta = style({
  background: "transparent",
  color: vars.color.onSurface,
  border: `1px solid ${vars.color.outlineVariant}`,
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyS,
  selectors: {
    "&:hover": { background: vars.color.surfaceContainer },
  },
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: vars.space.lg,
});

export const sectionHeader = style({
  fontSize: vars.text.titleS,
  fontWeight: 600,
  color: vars.color.onSurface,
  margin: 0,
  marginTop: vars.space.xl,
  marginBottom: vars.space.sm,
  letterSpacing: vars.tracking.wide,
  textTransform: "uppercase",
});

export const empty = style({
  padding: vars.space["3xl"],
  textAlign: "center",
  color: vars.color.onSurfaceVariant,
});

export const errorBox = style({
  padding: vars.space.lg,
  background: vars.color.errorContainer,
  color: vars.color.onErrorContainer,
  borderRadius: vars.radius.md,
});
