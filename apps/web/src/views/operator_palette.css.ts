import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const wrapper = style({
  position: "absolute",
  top: "58px",
  right: "20px",
  width: "320px",
  maxHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  background: "rgba(17, 20, 22, 0.94)",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: "10px",
  boxShadow: "0 12px 32px rgba(0,0,0,0.55)",
  zIndex: 6,
  backdropFilter: "blur(10px)",
  overflow: "hidden",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  padding: "8px 12px",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: vars.color.text.secondary,
});

export const closeButton = style({
  background: "transparent",
  border: "none",
  color: vars.color.text.muted,
  cursor: "pointer",
  fontSize: "14px",
  selectors: {
    "&:hover": { color: vars.color.text.primary },
  },
});

export const searchRow = style({
  padding: "8px 12px",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const searchInput = style({
  width: "100%",
  padding: "6px 10px",
  background: "rgba(0,0,0,0.35)",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: "6px",
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: "12px",
  outline: "none",
  selectors: {
    "&:focus": { borderColor: vars.color.accent.primary },
  },
});

export const list = style({
  overflowY: "auto",
  flex: 1,
  padding: "4px 0",
});

export const item = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: "8px 12px",
  cursor: "pointer",
  transition: "background 120ms ease",
  borderLeft: "2px solid transparent",
  selectors: {
    "&:hover": {
      background: "rgba(186, 158, 255, 0.08)",
      borderLeftColor: vars.color.accent.primary,
    },
  },
});

export const itemTop = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontFamily: vars.font.ui,
  fontSize: "12px",
  fontWeight: 600,
  color: vars.color.text.primary,
});

export const itemMeta = style({
  fontFamily: vars.font.code,
  fontSize: "10px",
  color: vars.color.text.muted,
});

export const portChips = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "3px",
  marginTop: "2px",
});

export const portChip = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "3px",
  padding: "0 4px",
  borderRadius: "3px",
  fontFamily: vars.font.code,
  fontSize: "9px",
  color: vars.color.text.muted,
  background: "rgba(255,255,255,0.04)",
});

export const emptyState = style({
  padding: "16px",
  textAlign: "center",
  color: vars.color.text.muted,
  fontSize: "12px",
});
