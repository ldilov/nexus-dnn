import { describe, expect, it } from "vitest";
import {
  blendVecs,
  clampVec,
  dominantAxis,
  EMPTY_VEC,
  magnitude,
  suggestPresetName,
  topAxes,
} from "../../src/views/recipe/lib/preset_naming";

describe("preset_naming", () => {
  it("zero vector → empty preset name", () => {
    expect(suggestPresetName(EMPTY_VEC)).toBe("");
  });

  it("single dominant axis → 'Happy'", () => {
    expect(suggestPresetName({ ...EMPTY_VEC, happy: 0.8 })).toBe("Happy");
  });

  it("two close axes → 'Happy + surprised'", () => {
    expect(
      suggestPresetName({ ...EMPTY_VEC, happy: 0.62, surprised: 0.55 }),
    ).toBe("Happy + surprised");
  });

  it("single dominant axis (significant gap) → only dominant", () => {
    expect(suggestPresetName({ ...EMPTY_VEC, happy: 0.9, surprised: 0.1 })).toBe(
      "Happy",
    );
  });

  it("dominantAxis returns null below noise threshold", () => {
    expect(dominantAxis({ ...EMPTY_VEC, happy: 0.04 })).toBeNull();
  });

  it("topAxes orders descending and respects limit", () => {
    const top = topAxes(
      { ...EMPTY_VEC, happy: 0.8, sad: 0.6, calm: 0.4, surprised: 0.2 },
      3,
    );
    expect(top.map((t) => t.key)).toEqual(["happy", "sad", "calm"]);
  });

  it("magnitude is L2 norm", () => {
    expect(magnitude({ ...EMPTY_VEC, happy: 0.6, calm: 0.8 })).toBeCloseTo(1.0, 5);
  });

  it("clampVec clamps to [0,1] and replaces NaN with 0", () => {
    const out = clampVec({
      ...EMPTY_VEC,
      happy: 1.5,
      sad: -0.2,
      calm: Number.NaN,
    });
    expect(out.happy).toBe(1);
    expect(out.sad).toBe(0);
    expect(out.calm).toBe(0);
  });

  it("blendVecs interpolates linearly", () => {
    const a = { ...EMPTY_VEC, happy: 1 };
    const b = { ...EMPTY_VEC, sad: 1 };
    const mid = blendVecs(a, b, 0.5);
    expect(mid.happy).toBeCloseTo(0.5, 5);
    expect(mid.sad).toBeCloseTo(0.5, 5);
  });
});
