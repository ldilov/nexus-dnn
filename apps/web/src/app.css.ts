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
