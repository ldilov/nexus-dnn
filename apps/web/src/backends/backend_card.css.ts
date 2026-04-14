import { style } from "@vanilla-extract/css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "20px",
  borderRadius: "12px",
  background: "var(--surface-raised, #1c1d22)",
  border: "1px solid var(--border-subtle, #2a2c33)",
  minWidth: "320px",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const title = style({
  fontFamily: "var(--font-headline, 'Space Grotesk', sans-serif)",
  fontSize: "18px",
  fontWeight: 600,
});

export const badge = style({
  padding: "2px 8px",
  borderRadius: "999px",
  fontSize: "11px",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
});

export const body = style({
  fontSize: "13px",
  lineHeight: 1.5,
  color: "var(--text-secondary, #a7adbb)",
});

export const version = style({
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "12px",
  color: "var(--text-tertiary, #7d8494)",
});

export const actions = style({
  display: "flex",
  gap: "8px",
  marginTop: "4px",
});
