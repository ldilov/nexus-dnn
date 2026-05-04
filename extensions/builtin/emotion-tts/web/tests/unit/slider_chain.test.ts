import { describe, expect, it } from "vitest";
import type { EditChain, TrimOp, NormalizeOp } from "../../src/services/audio_edit_client";
import {
  applySliderState,
  chainToSliderState,
  deriveSliderEffectsFromChain,
  EQ3_PRESETS,
  IDENTITY_SLIDER_STATE,
  isIdentityState,
  mergeSliderEffectsIntoChain,
  upsertEq3,
  upsertFadeIn,
  upsertFadeOut,
  upsertGain,
  upsertNormalize,
  upsertPitchShift,
  upsertSilenceStrip,
  upsertSpeed,
} from "../../src/views/recipe/lib/slider_chain";

const EMPTY_CHAIN: EditChain = { version: 1, ops: [] };

describe("slider_chain", () => {
  it("derives identity state from empty chain", () => {
    const state = chainToSliderState(EMPTY_CHAIN);
    expect(state).toEqual(IDENTITY_SLIDER_STATE);
    expect(isIdentityState(state)).toBe(true);
  });

  it("upsertGain with zero removes the op", () => {
    let chain = upsertGain(EMPTY_CHAIN, 6);
    expect(chain.ops).toHaveLength(1);
    expect(chain.ops[0].mode).toBe("gain");
    chain = upsertGain(chain, 0);
    expect(chain.ops).toHaveLength(0);
  });

  it("upsertGain replaces existing gain op (one-of-a-kind)", () => {
    let chain = upsertGain(EMPTY_CHAIN, 3);
    chain = upsertGain(chain, -2);
    const gainOps = chain.ops.filter((o) => o.mode === "gain");
    expect(gainOps).toHaveLength(1);
    if (gainOps[0].mode === "gain") expect(gainOps[0].gain_db).toBe(-2);
  });

  it("upsertEq3 with all zero removes the op", () => {
    let chain = upsertEq3(EMPTY_CHAIN, 3, 0, -2);
    expect(chain.ops).toHaveLength(1);
    chain = upsertEq3(chain, 0, 0, 0);
    expect(chain.ops).toHaveLength(0);
  });

  it("chainToSliderState detects warm preset", () => {
    const chain = upsertEq3(EMPTY_CHAIN, EQ3_PRESETS.warm.low, EQ3_PRESETS.warm.mid, EQ3_PRESETS.warm.high);
    const state = chainToSliderState(chain);
    expect(state.eq3.preset).toBe("warm");
  });

  it("chainToSliderState detects custom EQ", () => {
    const chain = upsertEq3(EMPTY_CHAIN, 1.5, -3, 4.2);
    const state = chainToSliderState(chain);
    expect(state.eq3.preset).toBe("custom");
    expect(state.eq3.low).toBe(1.5);
    expect(state.eq3.mid).toBe(-3);
    expect(state.eq3.high).toBe(4.2);
  });

  it("speed identity (1.0×) removes op", () => {
    let chain = upsertSpeed(EMPTY_CHAIN, 0.92);
    expect(chain.ops).toHaveLength(1);
    chain = upsertSpeed(chain, 1.0);
    expect(chain.ops).toHaveLength(0);
  });

  it("pitch_shift zero removes op", () => {
    let chain = upsertPitchShift(EMPTY_CHAIN, 4);
    expect(chain.ops).toHaveLength(1);
    chain = upsertPitchShift(chain, 0);
    expect(chain.ops).toHaveLength(0);
  });

  it("normalize off removes op", () => {
    let chain = upsertNormalize(EMPTY_CHAIN, "loudness", -16);
    expect(chain.ops).toHaveLength(1);
    chain = upsertNormalize(chain, "off", -16);
    expect(chain.ops).toHaveLength(0);
  });

  it("fade durations convert seconds to ms", () => {
    let chain = upsertFadeIn(EMPTY_CHAIN, 0.25);
    chain = upsertFadeOut(chain, 0.5);
    const fadeIn = chain.ops.find((o) => o.mode === "fade_in");
    const fadeOut = chain.ops.find((o) => o.mode === "fade_out");
    expect(fadeIn?.mode === "fade_in" && fadeIn.duration_ms).toBe(250);
    expect(fadeOut?.mode === "fade_out" && fadeOut.duration_ms).toBe(500);
  });

  it("silence_strip disabled removes op", () => {
    let chain = upsertSilenceStrip(EMPTY_CHAIN, true, -40);
    expect(chain.ops).toHaveLength(1);
    chain = upsertSilenceStrip(chain, false, -40);
    expect(chain.ops).toHaveLength(0);
  });

  it("mergeSliderEffectsIntoChain preserves trim (the only non-slider-managed op)", () => {
    const trim: TrimOp = { id: "T1", mode: "trim", start_ms: 100, end_ms: 5000 };
    const base: EditChain = { version: 1, ops: [trim] };
    const merged = mergeSliderEffectsIntoChain(base, {
      ...IDENTITY_SLIDER_STATE,
      volumeDb: 3,
    });
    expect(merged.ops.find((o) => o.mode === "trim")).toEqual(trim);
    expect(merged.ops.find((o) => o.mode === "gain")).toBeDefined();
  });

  it("mergeSliderEffectsIntoChain replaces a pre-existing normalize op according to slider state", () => {
    const normalize: NormalizeOp = { id: "N1", mode: "normalize", target_lufs: -16 };
    const base: EditChain = { version: 1, ops: [normalize] };
    const mergedOff = mergeSliderEffectsIntoChain(base, IDENTITY_SLIDER_STATE);
    expect(mergedOff.ops.find((o) => o.mode === "normalize")).toBeUndefined();
    const mergedNew = mergeSliderEffectsIntoChain(base, {
      ...IDENTITY_SLIDER_STATE,
      normalize: { mode: "loudness", targetDbOrLufs: -20 },
    });
    const normOp = mergedNew.ops.find((o) => o.mode === "normalize");
    if (normOp?.mode === "normalize") expect(normOp.target_lufs).toBe(-20);
  });

  it("mergeSliderEffectsIntoChain replaces previous slider effects", () => {
    const trim: TrimOp = { id: "T1", mode: "trim", start_ms: 0, end_ms: 1000 };
    const base: EditChain = upsertGain(
      { version: 1, ops: [trim] },
      6,
    );
    expect(base.ops.filter((o) => o.mode === "gain")).toHaveLength(1);
    const merged = mergeSliderEffectsIntoChain(base, {
      ...IDENTITY_SLIDER_STATE,
      volumeDb: -2,
    });
    const gainOps = merged.ops.filter((o) => o.mode === "gain");
    expect(gainOps).toHaveLength(1);
    if (gainOps[0]?.mode === "gain") expect(gainOps[0].gain_db).toBe(-2);
    expect(merged.ops.find((o) => o.mode === "trim")).toEqual(trim);
  });

  it("deriveSliderEffectsFromChain preserves trim but exposes normalize as slider state", () => {
    const trim: TrimOp = { id: "T1", mode: "trim", start_ms: 0, end_ms: 1000 };
    const normalize: NormalizeOp = { id: "N1", mode: "normalize", target_lufs: -18 };
    const withGain = upsertGain({ version: 1, ops: [trim, normalize] }, 4);
    const state = deriveSliderEffectsFromChain(withGain);
    expect(state.volumeDb).toBe(4);
    expect(state.normalize.mode).toBe("loudness");
    expect(state.normalize.targetDbOrLufs).toBe(-18);
  });

  it("mergeSliderEffectsIntoChain wires speed when mode='audio'", () => {
    const base: EditChain = { version: 1, ops: [] };
    const merged = mergeSliderEffectsIntoChain(base, {
      ...IDENTITY_SLIDER_STATE,
      speed: { mode: "audio", value: 0.92 },
    });
    const speedOps = merged.ops.filter((o) => o.mode === "speed");
    expect(speedOps).toHaveLength(1);
    if (speedOps[0]?.mode === "speed") expect(speedOps[0].factor).toBeCloseTo(0.92, 5);
  });

  it("mergeSliderEffectsIntoChain drops speed when mode='synth'", () => {
    const base: EditChain = { version: 1, ops: [] };
    const merged = mergeSliderEffectsIntoChain(base, {
      ...IDENTITY_SLIDER_STATE,
      speed: { mode: "synth", value: 0.92 },
    });
    expect(merged.ops.filter((o) => o.mode === "speed")).toHaveLength(0);
  });

  it("mergeSliderEffectsIntoChain wires normalize when mode='loudness'", () => {
    const base: EditChain = { version: 1, ops: [] };
    const merged = mergeSliderEffectsIntoChain(base, {
      ...IDENTITY_SLIDER_STATE,
      normalize: { mode: "loudness", targetDbOrLufs: -16 },
    });
    const normOps = merged.ops.filter((o) => o.mode === "normalize");
    expect(normOps).toHaveLength(1);
    if (normOps[0]?.mode === "normalize") expect(normOps[0].target_lufs).toBe(-16);
  });

  it("bijection: chainToSliderState ∘ applySliderState = identity-state shape", () => {
    const variants = [
      IDENTITY_SLIDER_STATE,
      { ...IDENTITY_SLIDER_STATE, volumeDb: 3 },
      {
        ...IDENTITY_SLIDER_STATE,
        eq3: { low: 3, mid: 0, high: -2, preset: "warm" as const },
      },
      {
        ...IDENTITY_SLIDER_STATE,
        speed: { mode: "audio" as const, value: 0.92 },
        pitchSt: 2,
      },
      {
        ...IDENTITY_SLIDER_STATE,
        normalize: { mode: "loudness" as const, targetDbOrLufs: -18 },
        fade: {
          inS: 0.1,
          outS: 0.25,
          inCurve: "equal_power" as const,
          outCurve: "equal_power" as const,
        },
      },
      {
        ...IDENTITY_SLIDER_STATE,
        silence: { enabled: true, thresholdDb: -45 },
      },
    ];
    for (const state of variants) {
      const chain = applySliderState(EMPTY_CHAIN, state);
      const derived = chainToSliderState(chain);
      expect(derived.volumeDb).toBeCloseTo(state.volumeDb, 5);
      expect(derived.eq3.low).toBeCloseTo(state.eq3.low, 5);
      expect(derived.eq3.mid).toBeCloseTo(state.eq3.mid, 5);
      expect(derived.eq3.high).toBeCloseTo(state.eq3.high, 5);
      expect(derived.pitchSt).toBeCloseTo(state.pitchSt, 5);
      expect(derived.normalize.mode).toBe(state.normalize.mode);
      if (state.speed.mode === "audio") {
        expect(derived.speed.value).toBeCloseTo(state.speed.value, 5);
      }
      expect(derived.fade.inS).toBeCloseTo(state.fade.inS, 3);
      expect(derived.fade.outS).toBeCloseTo(state.fade.outS, 3);
      expect(derived.silence.enabled).toBe(state.silence.enabled);
    }
  });
});
