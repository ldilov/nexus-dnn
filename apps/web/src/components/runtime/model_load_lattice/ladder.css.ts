/**
 * Spec 042 — Ladder of Abstraction (T052) styles.
 *
 * 4-detent vertical rail. Active detent has inset phosphor glow per the
 * brainstorm doc's "inset-only phosphor" rule.
 */

import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";
import { terminal } from "../../../styles/tokens/terminal.css";

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  paddingTop: vars.density.d2,
  paddingBottom: vars.density.d2,
  fontFamily: terminal.type.mono,
});

export const indicator = style({
  position: "absolute",
  left: 0,
  width: "2px",
  backgroundColor: terminal.state.activeGlow,
  borderRadius: "1px",
  pointerEvents: "none",
  transition: `transform ${terminal.motion.snapTransition} ${terminal.motion.ease}`,
});

export const rung = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  padding: `${vars.density.d2} ${vars.density.d3}`,
  marginLeft: vars.density.d2,
  background: "transparent",
  border: "none",
  color: vars.color.text.muted,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoCompact,
  letterSpacing: "0.06em",
  textAlign: "left",
  cursor: "pointer",
  borderRadius: "2px",
  transition: `color ${terminal.motion.snapTransition} ${terminal.motion.ease}, background ${terminal.motion.snapTransition} ${terminal.motion.ease}`,
  ":hover": {
    color: vars.color.text.primary,
  },
  ":focus-visible": {
    outline: `1px solid ${terminal.state.activeGlow}`,
    outlineOffset: "1px",
  },
});

export const rungActive = style({
  color: vars.color.text.primary,
  boxShadow: `inset 0 0 0 1px ${terminal.state.activeGlow}`,
});

export const rungIndex = style({
  fontSize: "10px",
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
  width: "2ch",
});

export const rungLabel = style({
  fontWeight: 500,
  textTransform: "uppercase",
});

export const rungSize = styleVariants({
  bytes: { fontSize: "10px" },
  tensors: { fontSize: "11px" },
  phases: { fontSize: "12px", fontWeight: 600 },
  story: { fontSize: "11px" },
});
