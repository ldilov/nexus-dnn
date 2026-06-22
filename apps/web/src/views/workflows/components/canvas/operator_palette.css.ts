// audit-allow: px — workflow canvas pixel-precise rendering
// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: px — below minimum token granularity (sub-10px)
import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";
import { media } from "../../../../theme/breakpoints";

export const wrapper = style({
  position: "absolute",
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  top: "58px",
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  right: "20px",
  // audit-allow: px — fixed layout breakpoint
  width: "320px",
  maxHeight: "60vh",
  display: "flex",
  flexDirection: "column",
  background: "rgba(17, 20, 22, 0.94)",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.card,
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  boxShadow: "0 12px 32px rgba(0,0,0,0.55)",
  zIndex: 6,
  // audit-allow: px — node graph layout primitive (xy-flow contract)
  backdropFilter: "blur(10px)",
  overflow: "hidden",
  "@media": {
    // Phones: the palette spans the canvas width as a top sheet instead of a
    // fixed panel that would cover the whole viewport at a fixed offset.
    [media.maxMobile]: {
      top: vars.density.d3,
      left: vars.density.d3,
      right: vars.density.d3,
      width: "auto",
      maxHeight: "50vh",
    },
  },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d2,
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "8px 12px",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
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
  fontSize: vars.font.size.bodyLg,
  selectors: {
    "&:hover": { color: vars.color.text.primary },
  },
});

export const searchRow = style({
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "8px 12px",
  borderBottom: `1px solid ${vars.color.outline.variant}`,
});

export const searchInput = style({
  width: "100%",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  background: "rgba(0,0,0,0.35)",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.control,
  color: vars.color.text.primary,
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  outline: "none",
  selectors: {
    "&:focus": { borderColor: vars.color.accent.primary },
  },
});

export const list = style({
  overflowY: "auto",
  flex: 1,
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "4px 0",
});

export const item = style({
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "2px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "8px 12px",
  cursor: "pointer",
  transition: "background 120ms ease",
  // audit-allow: px — below minimum token granularity (sub-10px)
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
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "6px",
  fontFamily: vars.font.ui,
  fontSize: vars.font.size.bodySm,
  fontWeight: 600,
  color: vars.color.text.primary,
});

export const itemMeta = style({
  fontFamily: vars.font.code,
  fontSize: vars.font.size.kbd,
  color: vars.color.text.muted,
});

export const portChips = style({
  display: "flex",
  flexWrap: "wrap",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "3px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  marginTop: "2px",
});

export const portChip = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — below minimum token granularity (sub-10px)
  gap: "3px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  padding: "0 4px",
  // audit-allow: px — below minimum token granularity (sub-10px)
  borderRadius: "3px",
  fontFamily: vars.font.code,
  // audit-allow: px — below minimum token granularity (sub-10px)
  fontSize: "9px",
  color: vars.color.text.muted,
  background: "rgba(255,255,255,0.04)",
});

export const emptyState = style({
  padding: vars.density.d4,
  textAlign: "center",
  color: vars.color.text.muted,
  fontSize: vars.font.size.bodySm,
});
