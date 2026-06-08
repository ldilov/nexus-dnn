import { describe, expect, test } from "vitest";
import {
  CANONICAL_PRESET_ID,
  presetBadges,
  sortPresets,
} from "../../src/domain/preset_meta";
import type { PresetSummary } from "../../src/services/types";

const canonical: PresetSummary = {
  id: "svi-canonical",
  label: "Canonical",
  description: "reference-faithful",
  params: {
    width: 832,
    height: 480,
    fps: 16,
    interpolate_fps: 48,
    num_clips: 5,
    frames_per_clip: 69,
    num_overlap_frame: 5,
    blocks_to_swap: 40,
  },
};

const off640: PresetSummary = {
  id: "svi-canonical-640",
  label: "640",
  description: "two steps down",
  params: { width: 640, height: 368, num_clips: 5, frames_per_clip: 69, blocks_to_swap: 40 },
};

const flf2v: PresetSummary = {
  id: "flf2v-morph-lowvram",
  label: "FLF2V",
  description: "morph",
  params: { width: 960, height: 544, num_clips: 1, frames_per_clip: 65, blocks_to_swap: 40 },
};

describe("presetBadges", () => {
  test("computes resolution and low-vram badge", () => {
    const badges = presetBadges(canonical);
    expect(badges.resolution).toBe("832×480");
    expect(badges.isLowVram).toBe(false);
    expect(badges.duration).toMatch(/s$/);
  });

  test("duration uses native fps and ignores interpolate_fps", () => {
    const badges = presetBadges(canonical);
    expect(badges.duration).toBe("20.3s");

    const noInterpolate: PresetSummary = {
      ...canonical,
      params: { ...canonical.params, interpolate_fps: 0 },
    };
    expect(presetBadges(noInterpolate).duration).toBe("20.3s");

    const highInterpolate: PresetSummary = {
      ...canonical,
      params: { ...canonical.params, interpolate_fps: 120 },
    };
    expect(presetBadges(highInterpolate).duration).toBe("20.3s");
  });

  test("derives last-image requirement from preset param flag", () => {
    const flagged: PresetSummary = {
      id: "morph-renamed",
      label: "Morph",
      description: "renamed morph",
      params: { ...canonical.params, requires_last_image: true },
    };
    expect(presetBadges(flagged).requiresLastImage).toBe(true);
  });

  test("marks off-distribution presets", () => {
    expect(presetBadges(off640).isOffDistribution).toBe(true);
    expect(presetBadges(canonical).isOffDistribution).toBe(false);
  });

  test("marks last-image requirement", () => {
    expect(presetBadges(flf2v).requiresLastImage).toBe(true);
    expect(presetBadges(flf2v).isLowVram).toBe(true);
  });
});

describe("sortPresets", () => {
  test("canonical sorts first", () => {
    const sorted = sortPresets([off640, flf2v, canonical]);
    expect(sorted[0]?.id).toBe(CANONICAL_PRESET_ID);
  });
});
