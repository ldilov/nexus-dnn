import { style } from "@vanilla-extract/css";

export const wrap = style({
  position: "relative",
  display: "inline-block",
});

export const menu = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  right: 0,
  zIndex: 20,
  minWidth: "16rem",
  padding: "0.25rem",
  borderRadius: "0.5rem",
  border: "1px solid var(--border, rgba(255,255,255,0.12))",
  background: "var(--surface-raised, #14161b)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  display: "flex",
  flexDirection: "column",
  gap: "0.125rem",
});

export const row = style({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
});

export const item = style({
  flex: 1,
  textAlign: "left",
  padding: "0.4rem 0.5rem",
  borderRadius: "0.375rem",
  background: "transparent",
  border: "none",
  color: "inherit",
  cursor: "pointer",
  selectors: {
    "&:hover:not(:disabled)": { background: "var(--surface-hover, rgba(255,255,255,0.06))" },
    "&:disabled": { opacity: 0.5, cursor: "default" },
  },
});

export const iconBtn = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "0.3rem",
  borderRadius: "0.375rem",
  background: "transparent",
  border: "none",
  color: "var(--text-muted, #9aa0aa)",
  cursor: "pointer",
  selectors: {
    "&:hover:not(:disabled)": { color: "var(--danger, #e5484d)" },
    "&:disabled": { opacity: 0.5, cursor: "default" },
  },
});

export const empty = style({
  padding: "0.5rem",
  color: "var(--text-muted, #9aa0aa)",
  fontSize: "0.85rem",
});

export const divider = style({
  height: "1px",
  margin: "0.25rem 0",
  background: "var(--border, rgba(255,255,255,0.12))",
});
