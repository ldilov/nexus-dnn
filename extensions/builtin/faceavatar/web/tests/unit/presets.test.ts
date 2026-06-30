import { describe, expect, test } from "vitest";
import { DEFAULT_PARAMS } from "../../src/domain/defaults";
import {
  matchPreset,
  PRESET_KEYS,
  PRESETS,
  type PresetId,
} from "../../src/domain/presets";

describe("quality presets", () => {
  test("exposes Fast / Balanced / Max detail in order", () => {
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

  test("Fast is the 512 draft pipeline", () => {
    const fast = PRESETS.find((p) => p.id === "fast");
    expect(fast?.params.pipeline_type).toBe("512");
    expect(fast?.params.simplify_target).toBe(100_000);
    expect(matchPreset(fast?.params ?? {})).toBe("fast");
  });

  test("Max detail is the 1536 cascade", () => {
    const max = PRESETS.find((p) => p.id === "max");
    expect(max?.params.pipeline_type).toBe("1536_cascade");
    expect(matchPreset(max?.params ?? {})).toBe("max");
  });

  test("a tweaked param set matches no preset (custom)", () => {
    expect(matchPreset({ ...DEFAULT_PARAMS, shape_steps: 17 })).toBeNull();
  });

  test("non-pinned keys do not affect the match", () => {
    expect(matchPreset({ ...DEFAULT_PARAMS, seed: 99, metallic: 0.4, texture: true })).toBe(
      "balanced",
    );
  });
});
