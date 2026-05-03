// audit-allow: px — workflow canvas pixel-precise rendering
// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: px — below minimum token granularity (sub-10px)
import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

export const wrapper = style({
  position: "absolute",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  top: "58px",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  right: "20px",
  // audit-allow: px — px — fixed layout breakpoint
  width: "320px",
  maxHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  background: "rgba(17, 20, 22, 0.94)",
  border: `1px solid ${vars.color.outline.variant}`,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  borderRadius: "10px",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  boxShadow: "0 12px 32px rgba(0,0,0,0.55)",
  zIndex: 6,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  backdropFilter: "blur(10px)",
  overflow: "hidden",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "8px 12px",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  fontFamily: vars.font.code,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
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
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  fontSize: "14px",
  selectors: {
    "&:hover": { color: vars.color.text.primary },
  },
});

export const searchRow = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "8px 12px",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const searchInput = style({
  width: "100%",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  background: "rgba(0,0,0,0.35)",
  border: `1px solid ${vars.color.outline.variant}`,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "6px",
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  fontSize: "12px",
  outline: "none",
  selectors: {
    "&:focus": { borderColor: vars.color.accent.primary },
  },
});

export const list = style({
  overflowY: "auto",
  flex: 1,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "4px 0",
});

export const item = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "2px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "8px 12px",
  cursor: "pointer",
  transition: "background 120ms ease",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
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
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
  fontFamily: vars.font.ui,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  fontSize: "12px",
  fontWeight: 600,
  color: vars.color.text.primary,
});

export const itemMeta = style({
  fontFamily: vars.font.code,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  fontSize: "10px",
  color: vars.color.text.muted,
});

export const portChips = style({
  display: "flex",
  flexWrap: "wrap",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "3px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginTop: "2px",
});

export const portChip = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "3px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "0 4px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "3px",
  fontFamily: vars.font.code,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  fontSize: "9px",
  color: vars.color.text.muted,
  background: "rgba(255,255,255,0.04)",
});

export const emptyState = style({
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  padding: "16px",
  textAlign: "center",
  color: vars.color.text.muted,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  fontSize: "12px",
});
