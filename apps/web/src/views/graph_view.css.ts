import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  width: "100%",
  height: "100%",
  minHeight: "400px",
});

export const graphNode = style({
  padding: vars.space.insetLg,
  borderRadius: vars.radius.control,
  backgroundColor: vars.color.bg.elevated,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  minWidth: "120px",
  textAlign: "center",
});

export const graphNodeRunning = style({
  boxShadow: `0 0 0 2px ${vars.color.accent.primaryDim}`,
});

export const graphNodeCompleted = style({
  boxShadow: `0 0 0 2px ${vars.color.success.base}`,
});

export const graphNodeFailed = style({
  boxShadow: `0 0 0 2px ${vars.color.error.base}`,
});

export const nodeName = style({
  fontWeight: vars.font.weight.medium,
});

export const nodeOperator = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
});
