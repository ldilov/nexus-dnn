import { style } from "@vanilla-extract/css";
import { vars } from "../theme/contract.css";

export const container = style({
  position: "absolute",
  top: "12px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 10px",
  borderRadius: "999px",
  background: "rgba(17, 20, 22, 0.85)",
  border: `1px solid ${vars.color.outline.variant}`,
  boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
  zIndex: 5,
  backdropFilter: "blur(8px)",
});

const chipBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "2px 8px",
  borderRadius: "999px",
  fontFamily: vars.font.code,
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const chipDirty = style([
  chipBase,
  {
    background: `${vars.color.accent.primary}22`,
    color: vars.color.accent.primary,
    border: `1px solid ${vars.color.accent.primary}55`,
  },
]);

export const chipValid = style([
  chipBase,
  {
    background: "rgba(52, 211, 153, 0.15)",
    color: "#34D399",
    border: "1px solid rgba(52, 211, 153, 0.4)",
  },
]);

export const chipInvalid = style([
  chipBase,
  {
    background: "rgba(255, 110, 132, 0.15)",
    color: "#ff6e84",
    border: "1px solid rgba(255, 110, 132, 0.4)",
  },
]);

export const chipEdited = style([
  chipBase,
  {
    background: "rgba(255, 132, 57, 0.15)",
    color: "#ff8439",
    border: "1px solid rgba(255, 132, 57, 0.4)",
  },
]);

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "4px 10px",
  borderRadius: "999px",
  fontFamily: vars.font.ui,
  fontSize: "11px",
  fontWeight: 600,
  border: `1px solid ${vars.color.outline.variant}`,
  background: "transparent",
  color: vars.color.text.secondary,
  cursor: "pointer",
  transition: "color 120ms ease, border-color 120ms ease, background 120ms ease",
  selectors: {
    "&:hover:not(:disabled)": {
      color: vars.color.text.primary,
      borderColor: vars.color.accent.primary,
      background: "rgba(186, 158, 255, 0.1)",
    },
    "&:disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
});

export const saveButton = style([
  button,
  {
    background: vars.color.accent.primary,
    color: "#14061f",
    borderColor: vars.color.accent.primary,
    selectors: {
      "&:hover:not(:disabled)": {
        background: vars.color.accent.primary,
        color: "#14061f",
        boxShadow: `0 0 0 4px ${vars.color.accent.primary}33`,
      },
    },
  },
]);

export const errorPanel = style({
  position: "absolute",
  top: "54px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "min(520px, 80vw)",
  maxHeight: "160px",
  overflowY: "auto",
  padding: "10px 12px",
  borderRadius: "8px",
  background: "rgba(17, 20, 22, 0.95)",
  border: `1px solid rgba(255, 110, 132, 0.4)`,
  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
  fontFamily: vars.font.code,
  fontSize: "11px",
  color: "#FECACA",
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  gap: "3px",
});
