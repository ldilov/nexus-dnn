import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const rendererRoot = style({
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const loadingContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  gap: vars.space.gapMd,
});

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const loadingSpinner = style({
  // audit-allow: px — sub-token spacing value, no density token at this step
  width: "24px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  height: "24px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  border: `2px solid ${vars.color.outline.variant}`,
  borderTopColor: vars.color.accent.primary,
  borderRadius: vars.radius.full,
  animation: `${spin} 0.8s linear infinite`,
});

export const loadingText = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.muted,
});

export const errorContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  gap: vars.space.gapMd,
  padding: vars.space.insetXl,
});

export const errorTitle = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.error.base,
});

export const errorMessage = style({
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  color: vars.color.text.secondary,
  textAlign: "center",
  // audit-allow: px — sub-token spacing value, no density token at this step
  maxWidth: "400px",
});

export const unknownComponent = style({
  backgroundColor: vars.color.bg.panel,
  borderRadius: vars.radius.card,
  padding: vars.space.insetMd,
  border: `1px dashed ${vars.color.outline.variant}`,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.muted,
  textAlign: "center",
});
