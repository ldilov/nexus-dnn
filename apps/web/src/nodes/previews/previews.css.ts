import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/contract.css";

export const box = style({
  marginTop: "6px",
  padding: "6px 10px",
  borderRadius: "6px",
  background: "rgba(0,0,0,0.35)",
  border: `1px solid ${vars.color.outline.variant}`,
  fontFamily: vars.font.code,
  fontSize: "10px",
  color: vars.color.text.secondary,
  lineHeight: 1.45,
  maxHeight: "120px",
  overflow: "auto",
});

export const jsonBox = style([box, { whiteSpace: "pre-wrap", wordBreak: "break-word" }]);

export const imageBox = style({
  marginTop: "6px",
  borderRadius: "6px",
  overflow: "hidden",
  background: "#000",
  maxHeight: "140px",
});

export const chartBox = style([
  box,
  { display: "flex", alignItems: "center", justifyContent: "center", height: "60px" },
]);
