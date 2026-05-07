/**
 * Spec 042 — Neo-Terminal Desktop Shell — semantic token layer.
 *
 * Adds a role-named layer on top of the Spectral Graphite primitive palette
 * (`vars.color.*` from `../theme.css`). Consumers reference `terminal.state.*`
 * (semantic role) instead of `vars.color.*` (palette hue) so the spectral
 * palette can evolve without breaking Lattice / Pulse-Floor / Cursor / Block
 * surfaces.
 *
 * The four locked aesthetic axes from the brainstorm doc
 * (`docs/brainstorms/2026-05-08-terminal-on-steroids-lattice.md`):
 *   - Bloomberg-dense (4px base spacing)
 *   - Kinetic Observatory (continuous gentle motion encoding real data)
 *   - Modern block phosphor cursor (pulses 70%↔100%, never blinks)
 *   - Inset-only phosphor glow on active surfaces (never outer halo)
 *
 * `prefers-reduced-motion` overrides at the bottom suspend continuous animation
 * cycles while preserving load-encoding on the cursor (because pulse rate
 * carries information; disabling it removes data per FR-064).
 *
 * XII.8 "Frame the interface first" — this file is the visual-system anchor
 * landed before any screen-level component work begins. T007 in tasks.md.
 */

import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";
import { vars } from "../theme.css";
import { motion } from "../motion.css";

export const terminal = createGlobalTheme(":root", {
  cursor: {
    pulseRest: "1000ms",
    pulseInference: "500ms",
    pulseLoad: "333ms",
    opacityMin: "0.70",
    opacityMax: "1.00",
    glowColor: vars.color.primary,
    glowRadius: "2px",
    glowOpacity: "0.30",
    blockWidth: "0.6em",
    blockHeight: "1em",
  },

  phosphor: {
    insetRadius: "2px",
    insetOpacity: "0.30",
    fadeIn: "150ms",
    fadeOut: "300ms",
    leadingEdgeOpacity: "0.70",
  },

  block: {
    paddingDense: "4px",
    paddingHead: "6px 8px",
    gapStack: "4px",
    gapInline: "8px",
    headerHeight: "24px",
    sparklineHeight: "4px",
    mnemonicLength: "4",
  },

  lattice: {
    cellSize: "13px",
    cellGap: "4px",
    breathCycle: "2000ms",
    breathAmplitudeMin: "0.90",
    breathAmplitudeMax: "1.00",
    sweepFade: "600ms",
  },

  pulseFloor: {
    height: "4px",
    traceOpacity: "0.45",
    leadingGlowOpacity: "0.70",
    anomalyBoost: "1.80",
    anomalySustainMs: "1000ms",
  },

  state: {
    pending: vars.color.surface,
    allocating: vars.color.primaryDim,
    loading: vars.color.primaryFixedDim,
    resident: vars.color.primary,
    cpuOffload: vars.color.tertiary,
    error: vars.color.error,
    activeGlow: vars.color.primary,
    anomaly: vars.color.error,
  },

  type: {
    mono: '"JetBrains Mono", "Berkeley Mono", "Commit Mono", Menlo, Consolas, monospace',
    monoStream: "12px",
    monoHeader: "13px",
    monoCompact: "11px",
  },

  motion: {
    snapTransition: "120ms",
    ambientSlow: "2000ms",
    ambientFast: "500ms",
    persistFade: "600ms",
    ease: motion.ease.outExpo,
  },
});

// `prefers-reduced-motion` overrides: suspend continuous animation cycles for
// non-information-carrying motion. Cursor pulse rates are NOT overridden here
// because the rate encodes system load (FR-064) — the Cursor component itself
// reduces amplitude in reduced-motion mode while preserving cycle length.
globalStyle(":root", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      vars: {
        [terminal.lattice.breathCycle]: "0ms",
        [terminal.motion.ambientSlow]: "0ms",
        [terminal.motion.ambientFast]: "0ms",
        [terminal.motion.persistFade]: "0ms",
      },
    },
  },
});
