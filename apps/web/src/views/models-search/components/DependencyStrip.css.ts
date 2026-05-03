import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const strip = style({
  display: "flex",
  flexWrap: "wrap",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
  alignItems: "center",
});

export const pill = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "4px 10px",
  borderRadius: vars.radius.full,
  background: vars.color.bg.lowest,
  fontFamily: vars.font.ui,
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  fontSize: "10px",
  fontWeight: 600,
  color: vars.color.text.secondary,
});

export const pillRequired = style({
  color: vars.color.accent.tertiary,
});

export const dot = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  width: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  height: "6px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  background: vars.color.text.muted,
  flexShrink: 0,
});

export const dotRequired = style({
  background: vars.color.accent.tertiary,
});

export const dotOptional = style({
  background: "transparent",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  border: `1.5px solid ${vars.color.text.muted}`,
});
