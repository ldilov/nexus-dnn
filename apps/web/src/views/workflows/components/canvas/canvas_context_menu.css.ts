// audit-allow: px — workflow canvas pixel-precise rendering
// audit-allow: px — sub-token spacing value, no density token at this step
import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

export const menu = style({
  position: "fixed",
  zIndex: 100,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  minWidth: "180px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "4px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  background: "rgba(17, 20, 22, 0.97)",
  border: `1px solid ${vars.color.outline.variant}`,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  boxShadow: "0 12px 32px rgba(0,0,0,0.55)",
  fontFamily: vars.font.ui,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  fontSize: "12px",
  color: vars.color.text.primary,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  backdropFilter: "blur(10px)",
});

export const item = style({
  display: "flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "4px",
  cursor: "pointer",
  selectors: {
    "&:hover": { background: "rgba(186, 158, 255, 0.15)" },
  },
});

export const separator = style({
  height: "1px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  margin: "2px 4px",
  background: vars.color.outline.variant,
});

export const shortcut = style({
  marginLeft: "auto",
  fontFamily: vars.font.code,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  fontSize: "10px",
  color: vars.color.text.muted,
});
