import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const hero = style({
  display: "flex",
  flexDirection: "column",
  gap: "var(--d-3)",
  paddingTop: "var(--d-6)",
  paddingBottom: "var(--d-5)",
});

export const heroRow = style({
  display: "flex",
  alignItems: "baseline",
  gap: "var(--d-4)",
  flexWrap: "wrap",
});

export const heroTitle = style({
  fontFamily: vars.font.headline,
  fontSize: "clamp(2.125rem, 1.45rem + 1.9vw, 3.625rem)",
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
  color: vars.color.text.primary,
  margin: 0,
});

export const heroAccent = style({
  color: "var(--accent)",
  fontWeight: 600,
});

export const heroCount = style({
  fontFamily: vars.font.code,
  fontVariantNumeric: "tabular-nums",
  fontSize: "0.7em",
  color: vars.color.text.secondary,
  marginLeft: "var(--d-3)",
});

export const heroLede = style({
  margin: 0,
  maxWidth: "62ch",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.body,
  lineHeight: 1.55,
  color: vars.color.text.secondary,
});

export const heroMeta = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--d-2)",
  flexWrap: "wrap",
  color: vars.color.text.secondary,
  fontSize: vars.font.size.body,
});

export const heroMetaSep = style({
  color: vars.color.outline.variant,
  margin: "0 var(--d-1)",
});

export const heroActions = style({
  marginLeft: "auto",
  display: "flex",
  gap: "var(--d-2)",
  alignItems: "center",
  flexWrap: "wrap",
});
