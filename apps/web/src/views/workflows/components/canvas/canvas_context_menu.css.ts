import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

export const menu = style({
  position: "fixed",
  zIndex: 100,
  minWidth: "180px",
  padding: "4px",
  borderRadius: "8px",
  background: "rgba(17, 20, 22, 0.97)",
  border: `1px solid ${vars.color.outline.variant}`,
  boxShadow: "0 12px 32px rgba(0,0,0,0.55)",
  fontFamily: vars.font.ui,
  fontSize: "12px",
  color: vars.color.text.primary,
  backdropFilter: "blur(10px)",
});

export const item = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer",
  selectors: {
    "&:hover": { background: "rgba(186, 158, 255, 0.15)" },
  },
});

export const separator = style({
  height: "1px",
  margin: "2px 4px",
  background: vars.color.outline.variant,
});

export const shortcut = style({
  marginLeft: "auto",
  fontFamily: vars.font.code,
  fontSize: "10px",
  color: vars.color.text.muted,
});
