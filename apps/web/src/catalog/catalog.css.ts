import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const searchWrapper = style({
  marginBottom: vars.space.insetLg,
});

export const groupLabel = style({
  fontSize: vars.font.size.caption,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  marginBottom: vars.space.insetXs,
  marginTop: vars.space.insetLg,
});

export const itemCard = style({
  backgroundColor: vars.color.bg.elevated,
  borderRadius: vars.radius.control,
  padding: vars.space.insetLg,
  marginBottom: vars.space.insetMd,
  transition: `background ${vars.motion.durationFast} ${vars.motion.easingDefault}`,
  ":hover": {
    backgroundColor: vars.color.bg.hover,
  },
});

export const itemName = style({
  fontSize: vars.font.size.bodySm,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
});

export const itemMeta = style({
  fontSize: vars.font.size.caption,
  color: vars.color.text.muted,
  fontFamily: vars.font.code,
  marginTop: vars.space.gapXs,
});

export const emptyState = style({
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
  textAlign: "center",
  padding: vars.space.gapXl,
});

export const errorState = style({
  color: vars.color.error.text,
  fontSize: vars.font.size.bodySm,
  padding: vars.space.insetLg,
});

export const badgeRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.gapSm,
  marginTop: vars.space.insetXs,
});
