import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  width: "100%",
  height: "100%",
  minHeight: "400px",
});

export const graphNode = style({
  padding: vars.space.md,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surface.raised,
  border: `1px solid ${vars.color.border.default}`,
  fontSize: vars.font.size.sm,
  color: vars.color.text.primary,
  minWidth: "120px",
  textAlign: "center",
});

export const graphNodeRunning = style({
  borderColor: vars.color.accent.primary,
  boxShadow: `0 0 0 2px ${vars.color.accent.muted}`,
});

export const graphNodeCompleted = style({
  borderColor: vars.color.success.base,
});

export const graphNodeFailed = style({
  borderColor: vars.color.error.base,
});

export const nodeName = style({
  fontWeight: vars.font.weight.medium,
});

export const nodeOperator = style({
  fontSize: vars.font.size.xs,
  color: vars.color.text.muted,
  fontFamily: vars.font.family.mono,
});
