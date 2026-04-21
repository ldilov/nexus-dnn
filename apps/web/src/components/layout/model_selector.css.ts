import { keyframes, style } from "@vanilla-extract/css";

const spin = keyframes({
  from: { transform: "rotate(0deg)" },
  to: { transform: "rotate(360deg)" },
});

const pulse = keyframes({
  "0%": { opacity: 0.35, transform: "scale(1)" },
  "50%": { opacity: 1, transform: "scale(1.15)" },
  "100%": { opacity: 0.35, transform: "scale(1)" },
});

export const container = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
});

export const chip = style({
  display: "inline-grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  padding: "7px 10px 7px 12px",
  minHeight: "36px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.035)",
  color: "var(--color-on-surface)",
  fontFamily: "var(--font-ui)",
  fontSize: "13px",
  lineHeight: 1.25,
  cursor: "pointer",
  outline: "none",
  userSelect: "none",
  transition:
    "background 150ms ease, box-shadow 200ms ease, color 150ms ease",
  ":hover": {
    background: "rgba(186,158,255,0.10)",
    boxShadow: "0 0 0 1px rgba(186,158,255,0.18), 0 4px 14px rgba(186,158,255,0.08)",
  },
  ":focus-visible": {
    background: "rgba(186,158,255,0.12)",
    boxShadow: "0 0 0 1px var(--color-primary), 0 6px 18px rgba(186,158,255,0.12)",
  },
  selectors: {
    '&[aria-disabled="true"]': {
      cursor: "not-allowed",
      opacity: 0.55,
      background: "rgba(255,255,255,0.02)",
    },
    '&[aria-disabled="true"]:hover': {
      background: "rgba(255,255,255,0.02)",
      boxShadow: "none",
    },
    '&[data-phase="loading"]': {
      boxShadow: "0 0 0 1px rgba(186,158,255,0.22)",
    },
    '&[data-phase="ready"]': {
      background: "rgba(186,158,255,0.06)",
      boxShadow: "0 0 0 1px rgba(186,158,255,0.14)",
    },
    '&[data-phase="failed"]': {
      boxShadow: "0 0 0 1px rgba(255,163,102,0.35)",
    },
  },
});

export const statusSlot = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "14px",
  height: "14px",
  flexShrink: 0,
});

export const textBlock = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minWidth: 0,
  gap: "1px",
});

export const mainLabel = style({
  fontSize: "13px",
  fontWeight: 500,
  fontFamily: "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const subLabel = style({
  fontSize: "10.5px",
  fontWeight: 500,
  letterSpacing: "0.02em",
  color: "var(--color-on-surface-variant)",
  textTransform: "uppercase",
});

const dotBase = style({
  display: "inline-block",
  width: "8px",
  height: "8px",
  borderRadius: "999px",
});

export const dotIdle = style([
  dotBase,
  { background: "rgba(255,255,255,0.22)" },
]);

export const dotHollow = style([
  dotBase,
  {
    background: "transparent",
    boxShadow: "inset 0 0 0 1.5px rgba(186,158,255,0.55)",
  },
]);

export const dotReady = style([
  dotBase,
  {
    background: "var(--color-primary, #ba9eff)",
    boxShadow: "0 0 8px rgba(186,158,255,0.55)",
  },
]);

export const dotFailed = style([
  dotBase,
  {
    background: "#ffa366",
    boxShadow: "0 0 8px rgba(255,163,102,0.45)",
    animation: `${pulse} 1.6s ease-in-out infinite`,
  },
]);

export const icon = style({
  width: "14px",
  height: "14px",
  color: "currentColor",
});

export const spinner = style({
  animation: `${spin} 900ms linear infinite`,
  color: "var(--color-primary, #ba9eff)",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
    },
  },
});

export const unloadButton = style({
  appearance: "none",
  background: "transparent",
  border: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "22px",
  height: "22px",
  padding: 0,
  borderRadius: "6px",
  cursor: "pointer",
  color: "var(--color-on-surface-variant)",
  opacity: 0.55,
  transition: "opacity 150ms ease, background 150ms ease, color 150ms ease",
  ":hover": {
    opacity: 1,
    background: "rgba(255,163,102,0.14)",
    color: "#ffa366",
  },
  ":focus-visible": {
    opacity: 1,
    outline: "none",
    boxShadow: "0 0 0 1.5px rgba(255,163,102,0.55)",
  },
  ":disabled": {
    opacity: 0.25,
    cursor: "not-allowed",
  },
});
