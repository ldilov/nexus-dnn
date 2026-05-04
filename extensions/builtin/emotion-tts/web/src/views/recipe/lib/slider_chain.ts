import type {
  EditChain,
  EditOp,
  Eq3Op,
  FadeInOp,
  FadeOutOp,
  GainOp,
  NormalizeOp,
  PitchShiftOp,
  SilenceStripOp,
  SpeedOp,
} from "../../../services/audio_edit_client";
import { newOperationId } from "../../../services/audio_edit_client";

export type Eq3PresetKey = "flat" | "warm" | "bright" | "voice" | "telephone";

export interface Eq3SliderState {
  low: number;
  mid: number;
  high: number;
  preset: Eq3PresetKey | "custom";
}

export interface SpeedSliderState {
  mode: "audio" | "synth";
  value: number;
}

export interface NormalizeSliderState {
  mode: "off" | "peak" | "loudness";
  targetDbOrLufs: number;
}

export type FadeCurve = "linear" | "equal_power" | "logarithmic" | "s_curve";

export interface FadeSliderState {
  inS: number;
  outS: number;
  inCurve: FadeCurve;
  outCurve: FadeCurve;
}

export interface SilenceSliderState {
  enabled: boolean;
  thresholdDb: number;
}

export interface DirectModSliderState {
  volumeDb: number;
  eq3: Eq3SliderState;
  speed: SpeedSliderState;
  pitchSt: number;
  normalize: NormalizeSliderState;
  fade: FadeSliderState;
  silence: SilenceSliderState;
}

export const EQ3_PRESETS: Record<Eq3PresetKey, { low: number; mid: number; high: number }> = {
  flat: { low: 0, mid: 0, high: 0 },
  warm: { low: 3, mid: 0, high: -2 },
  bright: { low: -1, mid: 0, high: 4 },
  voice: { low: -2, mid: 3, high: 2 },
  telephone: { low: -8, mid: 6, high: -8 },
};

export const IDENTITY_SLIDER_STATE: DirectModSliderState = {
  volumeDb: 0,
  eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
  speed: { mode: "audio", value: 1.0 },
  pitchSt: 0,
  normalize: { mode: "off", targetDbOrLufs: -16.0 },
  fade: { inS: 0, outS: 0, inCurve: "equal_power", outCurve: "equal_power" },
  silence: { enabled: false, thresholdDb: -45 },
};

const EPSILON = 1e-3;

function eqPresetFor(low: number, mid: number, high: number): Eq3PresetKey | "custom" {
  for (const key of Object.keys(EQ3_PRESETS) as Eq3PresetKey[]) {
    const preset = EQ3_PRESETS[key];
    if (
      Math.abs(preset.low - low) < EPSILON &&
      Math.abs(preset.mid - mid) < EPSILON &&
      Math.abs(preset.high - high) < EPSILON
    ) {
      return key;
    }
  }
  return "custom";
}

export function chainToSliderState(chain: EditChain): DirectModSliderState {
  let state: DirectModSliderState = cloneIdentity();
  for (const op of chain.ops) {
    state = projectOp(state, op);
  }
  return state;
}

function projectOp(state: DirectModSliderState, op: EditOp): DirectModSliderState {
  switch (op.mode) {
    case "gain":
      return { ...state, volumeDb: op.gain_db };
    case "eq3":
      return {
        ...state,
        eq3: {
          low: op.low_db,
          mid: op.mid_db,
          high: op.high_db,
          preset: eqPresetFor(op.low_db, op.mid_db, op.high_db),
        },
      };
    case "speed":
      return { ...state, speed: { mode: "audio", value: op.factor } };
    case "pitch_shift":
      return { ...state, pitchSt: op.semitones };
    case "normalize":
      return {
        ...state,
        normalize: { mode: "loudness", targetDbOrLufs: op.target_lufs },
      };
    case "fade_in":
      return {
        ...state,
        fade: { ...state.fade, inS: op.duration_ms / 1000.0 },
      };
    case "fade_out":
      return {
        ...state,
        fade: { ...state.fade, outS: op.duration_ms / 1000.0 },
      };
    case "silence_strip":
      return {
        ...state,
        silence: { enabled: true, thresholdDb: op.threshold_db },
      };
    default:
      return state;
  }
}

function cloneIdentity(): DirectModSliderState {
  return {
    volumeDb: 0,
    eq3: { low: 0, mid: 0, high: 0, preset: "flat" },
    speed: { mode: "audio", value: 1.0 },
    pitchSt: 0,
    normalize: { mode: "off", targetDbOrLufs: -16.0 },
    fade: {
      inS: 0,
      outS: 0,
      inCurve: "equal_power",
      outCurve: "equal_power",
    },
    silence: { enabled: false, thresholdDb: -45 },
  };
}

function withoutMode(chain: EditChain, mode: EditOp["mode"]): EditOp[] {
  return chain.ops.filter((op) => op.mode !== mode);
}

function append(ops: EditOp[], op: EditOp): EditOp[] {
  return [...ops, op];
}

export function upsertGain(chain: EditChain, gainDb: number): EditChain {
  const filtered = withoutMode(chain, "gain");
  if (Math.abs(gainDb) < EPSILON) return { ...chain, ops: filtered };
  const op: GainOp = { id: newOperationId(), mode: "gain", gain_db: gainDb };
  return { ...chain, ops: append(filtered, op) };
}

export function upsertEq3(chain: EditChain, low: number, mid: number, high: number): EditChain {
  const filtered = withoutMode(chain, "eq3");
  if (Math.abs(low) < EPSILON && Math.abs(mid) < EPSILON && Math.abs(high) < EPSILON) {
    return { ...chain, ops: filtered };
  }
  const op: Eq3Op = {
    id: newOperationId(),
    mode: "eq3",
    low_db: low,
    mid_db: mid,
    high_db: high,
  };
  return { ...chain, ops: append(filtered, op) };
}

export function upsertSpeed(chain: EditChain, factor: number): EditChain {
  const filtered = withoutMode(chain, "speed");
  if (Math.abs(factor - 1.0) < EPSILON) return { ...chain, ops: filtered };
  const op: SpeedOp = { id: newOperationId(), mode: "speed", factor };
  return { ...chain, ops: append(filtered, op) };
}

export function upsertPitchShift(chain: EditChain, semitones: number): EditChain {
  const filtered = withoutMode(chain, "pitch_shift");
  if (Math.abs(semitones) < EPSILON) return { ...chain, ops: filtered };
  const op: PitchShiftOp = {
    id: newOperationId(),
    mode: "pitch_shift",
    semitones,
  };
  return { ...chain, ops: append(filtered, op) };
}

export function upsertNormalize(chain: EditChain, mode: "off" | "loudness", targetLufs: number): EditChain {
  const filtered = withoutMode(chain, "normalize");
  if (mode === "off") return { ...chain, ops: filtered };
  const op: NormalizeOp = {
    id: newOperationId(),
    mode: "normalize",
    target_lufs: targetLufs,
  };
  return { ...chain, ops: append(filtered, op) };
}

export function upsertFadeIn(chain: EditChain, durationS: number): EditChain {
  const filtered = withoutMode(chain, "fade_in");
  if (durationS <= 0) return { ...chain, ops: filtered };
  const op: FadeInOp = {
    id: newOperationId(),
    mode: "fade_in",
    duration_ms: Math.round(durationS * 1000),
  };
  return { ...chain, ops: append(filtered, op) };
}

export function upsertFadeOut(chain: EditChain, durationS: number): EditChain {
  const filtered = withoutMode(chain, "fade_out");
  if (durationS <= 0) return { ...chain, ops: filtered };
  const op: FadeOutOp = {
    id: newOperationId(),
    mode: "fade_out",
    duration_ms: Math.round(durationS * 1000),
  };
  return { ...chain, ops: append(filtered, op) };
}

export function upsertSilenceStrip(chain: EditChain, enabled: boolean, thresholdDb: number): EditChain {
  const filtered = withoutMode(chain, "silence_strip");
  if (!enabled) return { ...chain, ops: filtered };
  const op: SilenceStripOp = {
    id: newOperationId(),
    mode: "silence_strip",
    threshold_db: thresholdDb,
  };
  return { ...chain, ops: append(filtered, op) };
}

export function applySliderState(
  chain: EditChain,
  state: DirectModSliderState,
): EditChain {
  let next = chain;
  next = upsertGain(next, state.volumeDb);
  next = upsertEq3(next, state.eq3.low, state.eq3.mid, state.eq3.high);
  if (state.speed.mode === "audio") {
    next = upsertSpeed(next, state.speed.value);
  } else {
    next = { ...next, ops: withoutMode(next, "speed") };
  }
  next = upsertPitchShift(next, state.pitchSt);
  next = upsertNormalize(
    next,
    state.normalize.mode === "off" ? "off" : "loudness",
    state.normalize.targetDbOrLufs,
  );
  next = upsertFadeIn(next, state.fade.inS);
  next = upsertFadeOut(next, state.fade.outS);
  next = upsertSilenceStrip(next, state.silence.enabled, state.silence.thresholdDb);
  return next;
}

const SLIDER_MANAGED_MODES: ReadonlySet<EditOp["mode"]> = new Set([
  "gain",
  "eq3",
  "speed",
  "pitch_shift",
  "normalize",
  "fade_in",
  "fade_out",
  "silence_strip",
]);

export function mergeSliderEffectsIntoChain(
  chain: EditChain,
  state: DirectModSliderState,
): EditChain {
  const carry: EditChain = {
    ...chain,
    ops: chain.ops.filter((op) => !SLIDER_MANAGED_MODES.has(op.mode)),
  };
  const fresh: EditChain = { version: 1, ops: [] };
  let withSliderOps = upsertGain(fresh, state.volumeDb);
  withSliderOps = upsertEq3(
    withSliderOps,
    state.eq3.low,
    state.eq3.mid,
    state.eq3.high,
  );
  if (state.speed.mode === "audio") {
    withSliderOps = upsertSpeed(withSliderOps, state.speed.value);
  }
  withSliderOps = upsertPitchShift(withSliderOps, state.pitchSt);
  withSliderOps = upsertNormalize(
    withSliderOps,
    state.normalize.mode === "off" ? "off" : "loudness",
    state.normalize.targetDbOrLufs,
  );
  withSliderOps = upsertFadeIn(withSliderOps, state.fade.inS);
  withSliderOps = upsertFadeOut(withSliderOps, state.fade.outS);
  withSliderOps = upsertSilenceStrip(
    withSliderOps,
    state.silence.enabled,
    state.silence.thresholdDb,
  );
  return { ...carry, ops: [...carry.ops, ...withSliderOps.ops] };
}

export function deriveSliderEffectsFromChain(chain: EditChain): DirectModSliderState {
  const filtered: EditChain = {
    ...chain,
    ops: chain.ops.filter((op) => SLIDER_MANAGED_MODES.has(op.mode)),
  };
  return chainToSliderState(filtered);
}

export function isIdentityState(state: DirectModSliderState): boolean {
  return (
    Math.abs(state.volumeDb) < EPSILON &&
    Math.abs(state.eq3.low) < EPSILON &&
    Math.abs(state.eq3.mid) < EPSILON &&
    Math.abs(state.eq3.high) < EPSILON &&
    state.speed.mode === "audio" &&
    Math.abs(state.speed.value - 1.0) < EPSILON &&
    Math.abs(state.pitchSt) < EPSILON &&
    state.normalize.mode === "off" &&
    state.fade.inS <= 0 &&
    state.fade.outS <= 0 &&
    !state.silence.enabled
  );
}
