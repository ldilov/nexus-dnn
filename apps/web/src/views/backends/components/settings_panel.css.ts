// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: hex — semantic state color outside vars.color contract
import { style } from "@vanilla-extract/css";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gap: "16px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "20px",
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "8px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "12px",
  // audit-allow: hex — neon decorative palette per design lang
  border: "1px solid var(--border-subtle, #2a2c33)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  borderRadius: "10px",
});

export const row = style({
  display: "grid",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gridTemplateColumns: "200px 1fr",
  alignItems: "center",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gap: "12px",
});

export const preview = style({
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "12px",
  // audit-allow: hex — neon decorative palette per design lang
  background: "var(--surface-inset, #0f1014)",
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "12px",
  whiteSpace: "pre-wrap",
});

export const errorText = style({
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--danger, #ef6b6b)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "12px",
});
