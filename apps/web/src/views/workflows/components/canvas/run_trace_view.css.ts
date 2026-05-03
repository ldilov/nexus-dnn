import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
});

export const eventRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.insetLg,
  padding: vars.space.insetMd,
  borderRadius: vars.radius.control,
  backgroundColor: vars.color.bg.elevated,
});

export const timestamp = style({
  fontSize: vars.font.size.caption,
  fontFamily: vars.font.code,
  color: vars.color.text.muted,
  flexShrink: 0,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  width: "80px",
});

export const nodeId = style({
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  flexShrink: 0,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  width: "120px",
});

export const message = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.secondary,
  flex: 1,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  textAlign: "center",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  padding: "48px",
});
