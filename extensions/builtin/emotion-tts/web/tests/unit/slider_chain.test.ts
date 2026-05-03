import { describe, expect, it } from "vitest";
import type { EditChain } from "../../src/services/audio_edit_client";
import {
  applySliderState,
  chainToSliderState,
  EQ3_PRESETS,
  IDENTITY_SLIDER_STATE,
  isIdentityState,
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
