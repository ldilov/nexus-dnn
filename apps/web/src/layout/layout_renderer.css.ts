import { style } from "@vanilla-extract/css";
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

export const loadingSpinner = style({
  width: "24px",
  height: "24px",
  border: `2px solid ${vars.color.outline.variant}`,
  borderTopColor: vars.color.accent.primary,
  borderRadius: vars.radius.full,
  animation: "spin 0.8s linear infinite",
  "@keyframes": {
    spin: {
      to: { transform: "rotate(360deg)" },
    },
  },
} as never);

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
