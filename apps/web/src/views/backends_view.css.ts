import { style } from "@vanilla-extract/css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px",
});

export const header = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const title = style({
  fontFamily: "var(--font-headline, 'Space Grotesk', sans-serif)",
  fontSize: "28px",
  fontWeight: 600,
});

export const subtitle = style({
  color: "var(--text-secondary, #a7adbb)",
});

export const chips = style({
  display: "flex",
  gap: "8px",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "12px",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "16px",
});
