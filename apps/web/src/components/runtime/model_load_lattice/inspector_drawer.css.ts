/**
 * Spec 042 — Inspector drawer (T054) styles.
 *
 * Glassmorphism floating overlay, opens on cell selection. Three tabs:
 * Tensor metadata, KV cache, Edit (layer placement override).
 */

import { style } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";
import { terminal } from "../../../styles/tokens/terminal.css";

export const drawer = style({
  position: "fixed",
  top: vars.density.d4,
  right: vars.density.d4,
  bottom: vars.density.d4,
  width: "min(420px, 90vw)",
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  padding: vars.density.d4,
  background: vars.card.bg,
  backdropFilter: vars.card.backdrop,
  WebkitBackdropFilter: vars.card.backdrop,
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: vars.radius.panel,
  boxShadow: vars.shadow.lg,
  zIndex: vars.z.drawer,
  fontFamily: terminal.type.mono,
  color: vars.color.text.primary,
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.density.d3,
});

export const title = style({
  fontSize: terminal.type.monoHeader,
  fontWeight: 500,
  letterSpacing: "0.04em",
});

export const meta = style({
  fontSize: terminal.type.monoCompact,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
});

export const closeBtn = style({
  background: "transparent",
  color: vars.color.text.muted,
  border: "none",
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoCompact,
  cursor: "pointer",
  padding: vars.density.d1,
  ":hover": {
    color: vars.color.text.primary,
  },
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  flex: 1,
  minHeight: 0,
  overflow: "auto",
});

export const fieldRow = style({
  display: "grid",
  gridTemplateColumns: "8ch 1fr",
  gap: vars.density.d2,
  fontSize: terminal.type.monoCompact,
  paddingTop: vars.density.d1,
  paddingBottom: vars.density.d1,
  borderBottom: `1px dashed ${vars.color.outline.variant}`,
});

export const fieldKey = style({
  color: vars.color.text.muted,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
});

export const fieldValue = style({
  color: vars.color.text.primary,
  fontVariantNumeric: "tabular-nums",
  wordBreak: "break-all",
});

export const editActions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.density.d2,
  paddingTop: vars.density.d3,
});

export const actionBtn = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  padding: `${vars.density.d2} ${vars.density.d3}`,
  background: "transparent",
  border: `1px solid ${vars.color.outline.variant}`,
  borderRadius: "2px",
  color: vars.color.text.primary,
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoCompact,
  cursor: "pointer",
  transition: `border-color ${terminal.motion.snapTransition} ${terminal.motion.ease}, color ${terminal.motion.snapTransition} ${terminal.motion.ease}`,
  ":hover": {
    borderColor: terminal.state.activeGlow,
    color: terminal.state.activeGlow,
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const actionPrimary = style({
  borderColor: terminal.state.activeGlow,
  color: terminal.state.activeGlow,
});

export const status = style({
  fontSize: terminal.type.monoCompact,
  color: vars.color.text.muted,
  paddingTop: vars.density.d2,
});

export const statusError = style({
  color: vars.color.error.text,
});
