import { style } from "@vanilla-extract/css";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "20px",
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "12px",
  border: "1px solid var(--border-subtle, #2a2c33)",
  borderRadius: "10px",
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "200px 1fr",
  alignItems: "center",
  gap: "12px",
});

export const preview = style({
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "12px",
  background: "var(--surface-inset, #0f1014)",
  borderRadius: "8px",
  padding: "12px",
  whiteSpace: "pre-wrap",
});

export const errorText = style({
  color: "var(--danger, #ef6b6b)",
  fontSize: "12px",
});
