import { keyframes, style } from "@vanilla-extract/css";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const slideIn = keyframes({
  from: { opacity: 0, transform: "translateY(8px) scale(0.98)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

export const backdrop = style({
  position: "fixed",
  inset: 0,
  background: "rgba(4, 5, 8, 0.72)",
  backdropFilter: "blur(12px) saturate(140%)",
  WebkitBackdropFilter: "blur(12px) saturate(140%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 120,
  animation: `${fadeIn} 180ms ease-out`,
  padding: "24px",
});

export const dialog = style({
  width: "min(560px, 100%)",
  maxHeight: "80vh",
  background:
    "linear-gradient(180deg, rgba(29,32,35,0.98) 0%, rgba(17,20,22,0.98) 100%)",
  borderRadius: "20px",
  boxShadow:
    "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(186,158,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "22px 24px 20px",
  animation: `${slideIn} 220ms ease-out`,
  fontFamily: "var(--font-ui)",
  color: "var(--color-on-surface)",
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "16px",
});

export const title = style({
  fontSize: "18px",
  fontWeight: 600,
  margin: 0,
});

export const subtitle = style({
  fontSize: "12px",
  color: "var(--color-on-surface-variant)",
  marginTop: "2px",
});

export const closeButton = style({
  appearance: "none",
  background: "transparent",
  color: "var(--color-on-surface-variant)",
  border: "none",
  fontSize: "22px",
  lineHeight: 1,
  cursor: "pointer",
  padding: "4px 10px",
  borderRadius: "8px",
  ":hover": {
    background: "rgba(255,255,255,0.06)",
    color: "var(--color-on-surface)",
  },
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  flex: 1,
});

export const option = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: "12px 14px",
  borderRadius: "12px",
  cursor: "pointer",
  outline: "none",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.04)",
  transition: "background 120ms ease, border-color 120ms ease",
  ":hover": {
    background: "rgba(186,158,255,0.08)",
    borderColor: "rgba(186,158,255,0.18)",
  },
  ":focus-visible": {
    background: "rgba(186,158,255,0.10)",
    borderColor: "var(--color-primary)",
  },
});

export const optionSelected = style({
  background: "rgba(186,158,255,0.14)",
  borderColor: "var(--color-primary)",
});

export const optionLabel = style({
  fontSize: "14px",
  fontWeight: 500,
});

export const optionMeta = style({
  fontSize: "11px",
  color: "var(--color-on-surface-variant)",
});

export const empty = style({
  padding: "28px 8px",
  textAlign: "center",
  color: "var(--color-on-surface-variant)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
});

export const emptyLink = style({
  color: "var(--color-primary)",
  textDecoration: "none",
  fontWeight: 500,
  ":hover": { textDecoration: "underline" },
});

export const statusRow = style({
  fontSize: "12px",
  color: "var(--color-on-surface-variant)",
  padding: "4px 2px",
});
