import { style } from "@vanilla-extract/css";
import { vars } from "../../styles";

export const menu = style({
  position: "absolute",
  top: "100%",
  right: 0,
  marginTop: vars.space.xs,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  minWidth: "240px",
  background: vars.color.surfaceContainerHigh,
  border: `1px solid ${vars.color.outlineVariant}`,
  borderRadius: vars.radius.md,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  boxShadow: `0 8px 24px ${vars.color.shadowElevation}`,
  padding: vars.space.xs,
  zIndex: vars.z.overlay,
  display: "flex",
  flexDirection: "column",
  gap: "1px",
});

export const item = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  textAlign: "left",
  color: vars.color.onSurface,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.ui,
  selectors: {
    "&:hover": { background: vars.color.surfaceContainerHighest },
    "&:focus-visible": {
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outline: `2px solid ${vars.color.primary}`,
      // audit-allow: px — px — below minimum token granularity (sub-10px)
      outlineOffset: "-2px",
    },
  },
});

export const name = style({
  fontSize: vars.text.bodyS,
  fontWeight: 500,
});

export const desc = style({
  fontSize: vars.text.labelS,
  color: vars.color.onSurfaceVariant,
});

export const primaryDot = style({
  display: "inline-block",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  width: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  height: "6px",
  borderRadius: vars.radius.full,
  background: vars.color.primary,
  marginRight: vars.space.xs,
});
