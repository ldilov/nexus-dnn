import { style } from "@vanilla-extract/css";

export const backdrop = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
});

export const dialog = style({
  width: "min(640px, 95vw)",
  background: "var(--surface-elevated, #22242b)",
  borderRadius: "16px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const phaseList = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "13px",
});

export const phaseItem = style({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

export const progressBar = style({
  width: "100%",
  height: "6px",
  background: "var(--surface-inset, #16181d)",
  borderRadius: "999px",
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  background: "var(--accent, #6ea2ff)",
  transition: "width 120ms linear",
});

export const logPanel = style({
  maxHeight: "240px",
  overflow: "auto",
  fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
  fontSize: "12px",
  background: "var(--surface-inset, #0f1014)",
  borderRadius: "8px",
  padding: "12px",
});
