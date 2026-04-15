import { style } from "@vanilla-extract/css";
import { vars } from "./theme/contract.css";

export const canvasColumn = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const canvasContent = style({
  flex: 1,
  overflow: "auto",
  padding: vars.space.insetXl,
});

export const extensionCanvas = style({
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

export const placeholderText = style({
  color: vars.color.text.muted,
  textAlign: "center",
  padding: "48px",
});

export const workflowListFallback = style({
  padding: vars.space.insetMd,
});

export const drawerContent = style({
  padding: `${vars.space.insetMd} ${vars.space.insetXl}`,
});

export const backToCatalog = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px",
  marginBottom: "14px",
  borderRadius: "999px",
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.secondary,
  fontFamily: vars.font.code,
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  cursor: "pointer",
  width: "fit-content",
  transition: "border-color 160ms ease, color 160ms ease",
  ":hover": {
    borderColor: `${vars.color.accent.primary}66`,
    color: vars.color.text.primary,
  },
});
