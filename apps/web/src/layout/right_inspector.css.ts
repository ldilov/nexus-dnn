import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  padding: vars.space.insetXl,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.insetLg,
});

export const heading = style({
  fontFamily: vars.font.headline,
  fontSize: vars.font.size.headingSm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
  letterSpacing: "-0.02em",
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  padding: vars.space.gapXl,
  textAlign: "center",
});

export const fieldLabel = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const fieldValue = style({
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  fontFamily: vars.font.code,
});

export const fieldGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapXs,
});
