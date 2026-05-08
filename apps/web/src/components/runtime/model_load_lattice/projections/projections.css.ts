/**
 * Spec 042 — Lattice projection styles (T053).
 *
 * Bytes / Tensors / Phases / Story rung surfaces. Each projection is a thin
 * presentational wrapper around the same derived `LatticeState`.
 */

import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../../theme/contract.css";
import { terminal } from "../../../../styles/tokens/terminal.css";

const pulse = keyframes({
  "0%": { opacity: 0.5 },
  "50%": { opacity: 1 },
  "100%": { opacity: 0.5 },
});

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.density.d3,
  fontFamily: terminal.type.mono,
  color: vars.color.text.primary,
});

export const eyebrow = style({
  fontSize: terminal.type.monoCompact,
  color: vars.color.text.muted,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
});

export const bytesBar = style({
  position: "relative",
  width: "100%",
  height: terminal.lattice.bytesBarHeight,
  backgroundColor: vars.color.bg.lowest,
  borderRadius: terminal.lattice.cellRadius,
  overflow: "hidden",
});

export const bytesFill = style({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  backgroundColor: terminal.state.resident,
  opacity: 0.65,
  transition: `width ${terminal.motion.snapTransition} ${terminal.motion.ease}`,
});

export const bytesMarker = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: terminal.lattice.bytesMarkerWidth,
  backgroundColor: terminal.state.activeGlow,
  opacity: 0.4,
});

export const bytesMeta = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: terminal.type.monoCompact,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
});

export const phasesRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.density.d2,
  flexWrap: "wrap",
});

export const phaseChipBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.density.d1,
  padding: `${vars.density.d1} ${vars.density.d3}`,
  borderRadius: terminal.lattice.cellRadius,
  fontSize: terminal.type.monoCompact,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  backgroundColor: vars.color.bg.lowest,
  color: vars.color.text.muted,
  fontVariantNumeric: "tabular-nums",
});

export const phaseChipState = styleVariants({
  pending: {
    color: vars.color.text.muted,
  },
  active: {
    color: vars.color.text.primary,
    boxShadow: `inset 0 0 0 ${terminal.lattice.cellOutlineWidth} ${terminal.state.activeGlow}`,
    animationName: pulse,
    animationDuration: terminal.motion.ambientSlow,
    animationIterationCount: "infinite",
    animationTimingFunction: "ease-in-out",
    "@media": {
      "(prefers-reduced-motion: reduce)": {
        animationName: "none",
        opacity: 1,
      },
    },
  },
  completed: {
    color: vars.color.text.primary,
    backgroundColor: terminal.state.allocating,
    opacity: 0.85,
  },
  failed: {
    color: vars.color.text.primary,
    backgroundColor: terminal.state.error,
  },
});

export const phaseIndex = style({
  fontSize: terminal.lattice.indexFontSize,
  opacity: 0.7,
});

export const story = style({
  fontFamily: terminal.type.mono,
  fontSize: terminal.type.monoCompact,
  fontStyle: "italic",
  color: vars.color.text.secondary,
  paddingTop: vars.density.d2,
  paddingBottom: vars.density.d2,
});

export const tensorsHost = style({
  display: "block",
});
