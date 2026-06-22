import { style } from "@vanilla-extract/css";
import { vars } from "../../styles";
import { media } from "../../theme/breakpoints";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.xl,
  height: "100%",
  overflow: "auto",
  "@media": {
    [media.maxMobile]: {
      padding: vars.space.md,
    },
  },
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
  background: vars.color.surfaceContainerLowest,
  border: "none",
  borderRadius: vars.radius.md,
  padding: `${vars.space.sm} ${vars.space.md}`,
  color: vars.color.onSurface,
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyM,
  // audit-allow: px — sub-token spacing value, no density token at this step
  minWidth: "240px",
  "@media": {
    [media.maxMobile]: {
      minWidth: 0,
      width: "100%",
    },
  },
  selectors: {
    "&:focus-visible": {
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

export const facetGroup = style({
  display: "inline-flex",
  background: vars.color.surfaceContainer,
  borderRadius: vars.radius.md,
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "2px",
  // audit-allow: px — below minimum token granularity (sub-10px)
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
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
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
      // audit-allow: px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — below minimum token granularity (sub-10px)
      outlineOffset: "2px",
    },
  },
});

export const secondaryCta = style({
  background: vars.color.surfaceContainerHighest,
  color: vars.color.onSurface,
  border: "none",
  padding: `${vars.space.sm} ${vars.space.lg}`,
  borderRadius: vars.radius.md,
  cursor: "pointer",
  fontFamily: vars.font.ui,
  fontSize: vars.text.bodyS,
  selectors: {
    "&:hover": { background: vars.color.surfaceBright },
  },
});

export const grid = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: vars.space.lg,
  "@media": {
    [media.maxMobile]: {
      gridTemplateColumns: "1fr",
      gap: vars.space.md,
    },
  },
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
