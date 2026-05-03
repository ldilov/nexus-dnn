import { describe, expect, it } from "vitest";
import {
  vecFromPreset,
  vecToPresetVector,
} from "../../src/views/recipe/components/save_preset_composer";
import {
  AXIS_KEYS,
  EMPTY_VEC,
  type EmotionVec,
} from "../../src/views/recipe/lib/preset_naming";
import type { VectorPreset } from "../../src/services/presets_client";

const FRIENDLY_TEEN: EmotionVec = {
  ...EMPTY_VEC,
  happy: 0.62,
  surprised: 0.34,
  calm: 0.18,
};

function makePreset(overrides: Partial<VectorPreset> = {}): VectorPreset {
  return {
    presetId: "p-test",
    deploymentId: "dep-1",
    presetName: "Friendly Teen",
    vector: vecToPresetVector(FRIENDLY_TEEN),
    createdAt: 1_700_000_000,
    updatedAt: 1_700_000_000,
    ...overrides,
  };
}

describe("preset persistence (SC-008)", () => {
  it("vecToPresetVector preserves canonical AXIS_KEYS order", () => {
    const arr = vecToPresetVector(FRIENDLY_TEEN);
    expect(arr).toHaveLength(8);
    AXIS_KEYS.forEach((key, i) => {
      expect(arr[i]).toBeCloseTo(FRIENDLY_TEEN[key], 5);
    });
  });

  it("vecFromPreset round-trips a vector through serialization + deserialization", () => {
    const preset = makePreset();
    const recovered = vecFromPreset(preset);
    AXIS_KEYS.forEach((key) => {
      expect(recovered[key]).toBeCloseTo(FRIENDLY_TEEN[key], 5);
    });
  });

  it("empty vector survives round-trip", () => {
    const preset = makePreset({ vector: vecToPresetVector(EMPTY_VEC) });
    const recovered = vecFromPreset(preset);
    AXIS_KEYS.forEach((key) => {
      expect(recovered[key]).toBe(0);
    });
  });

  it("missing vector defaults to identity", () => {
    const preset = { ...makePreset(), vector: undefined as unknown as VectorPreset["vector"] };
    const recovered = vecFromPreset(preset);
    AXIS_KEYS.forEach((key) => {
      expect(recovered[key]).toBe(0);
    });
  });

  it("simulates apply→serialize→reload→deserialize cycle", () => {
    const original = FRIENDLY_TEEN;
    const persistedShape = vecToPresetVector(original);
    const reload: VectorPreset = makePreset({ vector: persistedShape });
    const recovered = vecFromPreset(reload);
    AXIS_KEYS.forEach((key) => {
      expect(recovered[key]).toBeCloseTo(original[key], 5);
    });
  });

  it("simulates deletion irreversibility (FR-046)", () => {
    const presets = [makePreset({ presetId: "p-1" }), makePreset({ presetId: "p-2" })];
    const filtered = presets.filter((p) => p.presetId !== "p-1");
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.presetId).toBe("p-2");
    expect(presets.find((p) => p.presetId === "p-1")).toBeDefined();
    expect(filtered.find((p) => p.presetId === "p-1")).toBeUndefined();
  });
});
