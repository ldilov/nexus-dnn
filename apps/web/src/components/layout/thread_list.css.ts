import { keyframes, style } from "@vanilla-extract/css";

const pulse = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.5, transform: "scale(1.2)" },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "8px 8px 16px",
  overflowY: "auto",
  overflowX: "hidden",
  minWidth: 0,
  flex: 1,
});

export const sectionLabel = style({
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-on-surface-variant, rgba(255,255,255,0.45))",
  padding: "6px 10px 4px",
  marginTop: "4px",
  userSelect: "none",
});

export const item = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "10px 12px 10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
  outline: "none",
  background: "transparent",
  transition:
    "background 140ms ease, box-shadow 180ms ease, transform 140ms ease",
  minWidth: 0,
  ":hover": {
    background: "rgba(186,158,255,0.07)",
  },
  ":focus-visible": {
    background: "rgba(186,158,255,0.10)",
    boxShadow: "inset 0 0 0 1.5px var(--color-primary, #ba9eff)",
  },
  "::before": {
    content: "''",
    position: "absolute",
    left: "4px",
    top: "10px",
    bottom: "10px",
    width: "2.5px",
    borderRadius: "2px",
    background: "transparent",
    transition: "background 140ms ease",
  },
});

export const itemSelected = style({
  background: "rgba(186,158,255,0.12)",
  selectors: {
    "&:hover": {
      background: "rgba(186,158,255,0.14)",
    },
    "&::before": {
      background: "var(--color-primary, #ba9eff)",
      boxShadow: "0 0 8px rgba(186,158,255,0.45)",
    },
  },
});

export const rowTop = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  minWidth: 0,
});

export const title = style({
  flex: 1,
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--color-on-surface, rgba(255,255,255,0.95))",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: 0,
});

export const titleSelected = style({
  color: "var(--color-primary, #ba9eff)",
});

export const timestamp = style({
  flexShrink: 0,
  fontSize: "10.5px",
  fontFamily:
    "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace)",
  color: "var(--color-on-surface-variant, rgba(255,255,255,0.4))",
  fontWeight: 500,
});

export const rowMeta = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "11px",
  color: "var(--color-on-surface-variant, rgba(255,255,255,0.45))",
  minWidth: 0,
});

export const metaDot = style({
  display: "inline-block",
  width: "3px",
  height: "3px",
  borderRadius: "999px",
  background: "currentColor",
  opacity: 0.4,
  flexShrink: 0,
});

export const liveDot = style({
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: "999px",
  background: "var(--color-primary, #ba9eff)",
  boxShadow: "0 0 6px rgba(186,158,255,0.6)",
  flexShrink: 0,
  animation: `${pulse} 1.6s ease-in-out infinite`,
});

export const emptyState = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  padding: "28px 14px",
  textAlign: "center",
  color: "var(--color-on-surface-variant, rgba(255,255,255,0.5))",
  fontSize: "12.5px",
  lineHeight: 1.5,
});

export const emptyIcon = style({
  fontSize: "26px",
  opacity: 0.35,
});

export const loadingRow = style({
  padding: "10px 14px",
  fontSize: "12px",
  color: "var(--color-on-surface-variant, rgba(255,255,255,0.45))",
});
