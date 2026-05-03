import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";

export const box = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginTop: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "6px",
  background: "rgba(0,0,0,0.35)",
  border: `1px solid ${vars.color.outline.variant}`,
  fontFamily: vars.font.code,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  fontSize: "10px",
  color: vars.color.text.secondary,
  lineHeight: 1.45,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  maxHeight: "120px",
  overflow: "auto",
});

export const jsonBox = style([box, { whiteSpace: "pre-wrap", wordBreak: "break-word" }]);

export const imageBox = style({
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  marginTop: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "6px",
  overflow: "hidden",
  // audit-allow: hex — hex — pure-black contrast anchor
  background: "#000",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  maxHeight: "140px",
});

export const chartBox = style([
  box,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  { display: "flex", alignItems: "center", justifyContent: "center", height: "60px" },
]);

export const imgFit = style({
  width: "100%",
  display: "block",
});

export const svgFit = style({
  width: "100%",
  height: "100%",
});
