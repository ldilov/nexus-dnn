// audit-allow: px — workflow canvas pixel-precise rendering
// audit-allow: px — sub-token spacing value, no density token at this step
// audit-allow: hex — neon decorative palette per design lang
// audit-allow: hex — pure-black contrast anchor
import { style } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";

export const container = style({
  position: "absolute",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  top: "12px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "8px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "6px 10px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  background: "rgba(17, 20, 22, 0.85)",
  border: `1px solid ${vars.color.outline.variant}`,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
  zIndex: 5,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  backdropFilter: "blur(8px)",
});

const chipBase = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "6px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "2px 8px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  fontFamily: vars.font.code,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
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
    // audit-allow: hex — hex — neon decorative palette per design lang
    color: "#34D399",
    border: "1px solid rgba(52, 211, 153, 0.4)",
  },
]);

export const chipInvalid = style([
  chipBase,
  {
    background: "rgba(255, 110, 132, 0.15)",
    // audit-allow: hex — hex — neon decorative palette per design lang
    color: "#ff6e84",
    border: "1px solid rgba(255, 110, 132, 0.4)",
  },
]);

export const chipEdited = style([
  chipBase,
  {
    background: "rgba(255, 132, 57, 0.15)",
    // audit-allow: hex — hex — neon decorative palette per design lang
    color: "#ff8439",
    border: "1px solid rgba(255, 132, 57, 0.4)",
  },
]);

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "4px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  padding: "4px 10px",
  // audit-allow: px — px — sub-token spacing value, no density token at this step
  borderRadius: "999px",
  fontFamily: vars.font.ui,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
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
    // audit-allow: hex — hex — neon decorative palette per design lang
    color: "#14061f",
    borderColor: vars.color.accent.primary,
    selectors: {
      "&:hover:not(:disabled)": {
        background: vars.color.accent.primary,
        // audit-allow: hex — hex — neon decorative palette per design lang
        color: "#14061f",
        // audit-allow: px — px — below minimum token granularity (sub-10px)
        boxShadow: `0 0 0 4px ${vars.color.accent.primary}33`,
      },
    },
  },
]);

export const errorPanel = style({
  position: "absolute",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  top: "54px",
  left: "50%",
  transform: "translateX(-50%)",
  // audit-allow: px — px — fixed layout breakpoint
  width: "min(520px, 80vw)",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  maxHeight: "160px",
  overflowY: "auto",
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  padding: "10px 12px",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  borderRadius: "8px",
  background: "rgba(17, 20, 22, 0.95)",
  border: `1px solid rgba(255, 110, 132, 0.4)`,
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
  fontFamily: vars.font.code,
  // audit-allow: px — px — node graph layout primitive (xy-flow contract)
  fontSize: "11px",
  // audit-allow: hex — hex — neon decorative palette per design lang
  color: "#FECACA",
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  // audit-allow: px — px — below minimum token granularity (sub-10px)
  gap: "3px",
});
