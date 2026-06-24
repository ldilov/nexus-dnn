import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapMd,
  width: "100%",
});

export const artifactList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const artifactItem = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
  borderRadius: vars.radius.card,
  background: vars.color.bg.panel,
  overflow: "hidden",
});

export const mediaPlayer = style({
  width: "100%",
  borderRadius: vars.radius.card,
  background: vars.color.bg.lowest,
  display: "block",
});

export const imagePreview = style({
  width: "100%",
  display: "block",
  objectFit: "contain",
  borderRadius: vars.radius.card,
  // audit-allow: px — max preview height cap, no density token at this scale
  maxHeight: "480px",
});

export const textOutput = style({
  padding: vars.space.insetMd,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});

export const fallbackLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.gapXs,
  padding: vars.space.insetMd,
  color: vars.color.accent.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  textDecoration: "none",
  ":hover": {
    textDecoration: "underline",
  },
});

export const nodeOutputsSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  paddingTop: vars.space.insetSm,
  borderTop: `1px solid ${vars.color.outline.variant}`,
});

export const nodeOutputsTitle = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const emptyState = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: vars.space.insetXl,
  color: vars.color.text.muted,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
});
