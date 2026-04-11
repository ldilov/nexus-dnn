import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const stageRow = style({
  display: "flex",
  gap: vars.space.gapLg,
  overflowX: "auto",
  paddingBottom: vars.space.insetLg,
});

export const stageColumn = style({
  minWidth: "200px",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const stageHeader = style({
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  paddingBottom: vars.space.insetXs,
  borderBottom: `1px solid ${vars.color.border.subtle}`,
});

export const nodeCard = style({
  backgroundColor: vars.color.bg.elevated,
  borderRadius: vars.radius.control,
  padding: vars.space.insetLg,
  cursor: "pointer",
  border: `1px solid ${vars.color.border.subtle}`,
  transition: "border-color 150ms",
  ":hover": {
    borderColor: vars.color.accent.primary,
  },
});

export const nodeCardSelected = style({
  borderColor: vars.color.accent.primary,
});

export const nodeName = style({
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
});

export const nodeOperator = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
});

export const nodeStatusRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: vars.space.insetXs,
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  textAlign: "center",
  padding: "48px",
});
