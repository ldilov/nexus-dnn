import { describe, expect, test } from "vitest";
import { DEFAULT_PARAMS } from "../../src/domain/defaults";
import {
  matchPreset,
  PRESET_KEYS,
  PRESETS,
  type PresetId,
} from "../../src/domain/presets";

describe("quality presets", () => {
  test("exposes Fast / Balanced / Max identity in order", () => {
    expect(PRESETS.map((p) => p.id)).toEqual<PresetId[]>(["fast", "balanced", "max"]);
  });

  test("every preset pins exactly the preset keys", () => {
    for (const preset of PRESETS) {
      expect(Object.keys(preset.params).sort()).toEqual([...PRESET_KEYS].sort());
    }
  });

  test("Balanced mirrors the operator defaults so a fresh form selects it", () => {
    expect(matchPreset(DEFAULT_PARAMS)).toBe("balanced");
  });

  test("Fast is the quick identity pass", () => {
    const fast = PRESETS.find((p) => p.id === "fast");
    expect(fast?.params.arc_iters).toBe(250);
    expect(fast?.params.crop).toBe("bust");
    expect(matchPreset(fast?.params ?? {})).toBe("fast");
  });

  test("Max identity is the sharpest likeness", () => {
    const max = PRESETS.find((p) => p.id === "max");
    expect(max?.params.arc_iters).toBe(1200);
    expect(max?.params.expression).toBe("source");
    expect(matchPreset(max?.params ?? {})).toBe("max");
  });

  test("a tweaked param set matches no preset (custom)", () => {
    expect(matchPreset({ ...DEFAULT_PARAMS, arc_iters: 777 })).toBeNull();
  });

  test("non-pinned keys do not affect the match", () => {
    expect(matchPreset({ ...DEFAULT_PARAMS, seed: 99, texture: false })).toBe("balanced");
  });
});
