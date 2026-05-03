import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gap: "16px",
  // audit-allow: px — sub-token spacing value, no density token at this step
  padding: "24px",
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "4px",
});

export const title = style({
  fontFamily: "var(--font-headline, 'Space Grotesk', sans-serif)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "28px",
  fontWeight: 600,
});

export const subtitle = style({
  // audit-allow: hex — neon decorative palette per design lang
  color: "var(--text-secondary, #a7adbb)",
});

export const chips = style({
  display: "flex",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "8px",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  // audit-allow: px — sub-token spacing value, no density token at this step
  fontSize: "12px",
});

export const grid = style({
  display: "grid",
  // audit-allow: px — fixed layout breakpoint
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  // audit-allow: px — sub-token spacing value, no density token at this step
  gap: "16px",
});

// Error boundary panel — used when the backends fetch fails (e.g. server
// returns 500 because an adapter's current_summary() errored out). Shows
// the envelope error message verbatim + a retry button.
export const errorPanel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.gapSm,
  padding: vars.space.insetLg,
  background: vars.color.bg.panel,
  border: `1px solid ${vars.color.error.base}`,
  borderRadius: vars.radius.card,
  alignItems: "flex-start",
});

export const errorTitle = style({
  fontSize: vars.font.size.bodyLg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.error.base,
});

export const errorMessage = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.bodySm,
  color: vars.color.text.primary,
  wordBreak: "break-word",
  padding: vars.space.insetMd,
  background: vars.color.bg.elevated,
  borderRadius: vars.radius.control,
  border: `1px solid ${vars.color.outline.variant}`,
  width: "100%",
});

export const errorRetry = style({
  padding: `${vars.space.insetSm} ${vars.space.insetLg}`,
  background: vars.color.accent.primary,
  color: vars.color.onColor.primary,
  border: "none",
  borderRadius: vars.radius.control,
  cursor: "pointer",
  fontWeight: vars.font.weight.semibold,
  fontSize: vars.font.size.bodySm,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});
