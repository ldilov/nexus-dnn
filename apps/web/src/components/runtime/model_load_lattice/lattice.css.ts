/**
 * Spec 042 — Lattice grid styles (T051).
 *
 * Bloomberg-dense grid with 13px cells + 4px gaps, no grid lines, role-token
 * driven colors (`terminal.state.*`). Cell breath animation drives gentle
 * opacity oscillation when motion is allowed; reduced-motion suspends the
 * cycle while preserving the static color encoding.
 */

import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme/contract.css";
import { terminal } from "../../../styles/tokens/terminal.css";

const breath = keyframes({
  "0%": { opacity: terminal.lattice.breathAmplitudeMin },
  "50%": { opacity: terminal.lattice.breathAmplitudeMax },
  "100%": { opacity: terminal.lattice.breathAmplitudeMin },
});

export const root = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  columnGap: vars.density.d4,
  alignItems: "stretch",
  fontFamily: terminal.type.mono,
  color: vars.color.text.primary,
});

export const main = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  minWidth: 0,
});

export const headerRow = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: vars.density.d3,
});

export const headerLabel = style({
  fontSize: terminal.type.monoCompact,
  color: vars.color.text.secondary,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const headerCounters = style({
  display: "flex",
  gap: vars.density.d3,
  fontSize: terminal.type.monoCompact,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
});

export const counterValue = style({
  color: vars.color.text.primary,
  marginLeft: vars.density.d1,
});

export const auxBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d2,
  paddingBottom: vars.density.d2,
  borderBottom: `${terminal.lattice.cellOutlineWidth} dashed ${vars.color.outline.variant}`,
});

export const auxLabel = style({
  fontSize: terminal.type.monoCompact,
  color: vars.color.text.muted,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const auxRow = style({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: terminal.lattice.cellSize,
  gap: terminal.lattice.cellGap,
  alignItems: "center",
});

export const grid = style({
  display: "grid",
  gridAutoFlow: "row",
  gap: terminal.lattice.cellGap,
  overflowY: "auto",
  overflowX: "hidden",
  maxHeight: "70vh",
  padding: vars.density.d1,
  alignContent: "start",
});

export const gridRow = style({
  display: "grid",
  gridAutoFlow: "column",
  gridAutoColumns: terminal.lattice.cellSize,
  gap: terminal.lattice.cellGap,
  alignItems: "center",
});

export const layerLabel = style({
  fontSize: terminal.type.monoCompact,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
  paddingRight: vars.density.d2,
  minWidth: "3ch",
  textAlign: "right",
});

export const cellBase = style({
  width: terminal.lattice.cellSize,
  height: terminal.lattice.cellSize,
  borderRadius: terminal.lattice.cellRadius,
  backgroundColor: terminal.state.pending,
  cursor: "pointer",
  transition: `background-color ${terminal.motion.snapTransition} ${terminal.motion.ease}, box-shadow ${terminal.motion.snapTransition} ${terminal.motion.ease}`,
  outline: "none",
  border: "none",
  padding: 0,
  ":focus-visible": {
    boxShadow: `inset 0 0 0 ${terminal.lattice.cellOutlineWidth} ${terminal.state.activeGlow}`,
  },
});

export const cellAux = style({
  height: terminal.lattice.cellAuxHeight,
  opacity: 0.85,
});

export const cellPhase = styleVariants({
  pending: {
    backgroundColor: terminal.state.pending,
    opacity: 0.35,
  },
  discovered: {
    backgroundColor: terminal.state.allocating,
    opacity: 0.55,
  },
  assigned: {
    backgroundColor: terminal.state.allocating,
    opacity: 0.75,
  },
  reserved: {
    backgroundColor: terminal.state.loading,
    opacity: 0.85,
  },
  ready: {
    backgroundColor: terminal.state.resident,
    animationName: breath,
    animationDuration: terminal.lattice.breathCycle,
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        animationName: "none",
        opacity: terminal.lattice.breathAmplitudeMax,
      },
    },
  },
  cpu_offloaded: {
    backgroundColor: terminal.state.cpuOffload,
    opacity: 0.80,
  },
  error: {
    backgroundColor: terminal.state.error,
    boxShadow: `inset 0 0 0 ${terminal.lattice.cellOutlineWidth} ${terminal.state.error}`,
  },
});

export const cellTrail = style({
  boxShadow: `inset 0 0 0 ${terminal.lattice.cellOutlineWidth} ${terminal.state.activeGlow}`,
  transition: `box-shadow ${terminal.motion.persistFade} ${terminal.motion.ease}`,
});

export const cellSelected = style({
  boxShadow: `inset 0 0 0 ${terminal.lattice.cellOutlineWidth} ${terminal.state.activeGlow}, inset 0 0 ${terminal.lattice.cellSelectedHaloRadius} ${terminal.state.activeGlow}`,
});

export const ladderColumn = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: vars.density.d2,
  paddingLeft: vars.density.d3,
  borderLeft: `${terminal.lattice.cellOutlineWidth} solid ${vars.color.outline.variant}`,
});

export const projectionsHost = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
});

export const empty = style({
  fontSize: terminal.type.monoCompact,
  color: vars.color.text.muted,
  padding: vars.density.d4,
  textAlign: "center",
});
