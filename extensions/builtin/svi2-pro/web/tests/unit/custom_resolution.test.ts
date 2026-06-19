import { describe, expect, test } from "vitest";
import {
  ASPECT_PRESETS,
  DEFAULT_CUSTOM_RESOLUTION,
  MAX_DIM,
  MIN_DIM,
  NATIVE_BUDGET,
  WAN_ALIGN,
  aspectLabel,
  describeResolution,
  fitAspectToBudget,
  matchAspectPreset,
  orientationOf,
  snapDim,
  snapDimensions,
  stepDim,
  swapDimensions,
} from "../../src/domain/custom_resolution";

describe("snapDim", () => {
  test("rounds to the nearest Wan2.2-compatible multiple of 16", () => {
    expect(snapDim(833) % WAN_ALIGN).toBe(0);
    expect(snapDim(833)).toBe(832);
    expect(snapDim(481)).toBe(480);
    expect(snapDim(488)).toBe(496); // halfway rounds up
  });

  test("clamps into the supported envelope", () => {
    expect(snapDim(10)).toBe(MIN_DIM);
    expect(snapDim(100_000)).toBe(MAX_DIM);
  });

  test("non-finite input falls back to the minimum", () => {
    expect(snapDim(Number.NaN)).toBe(MIN_DIM);
  });
});

describe("snapDimensions", () => {
  test("an already-compatible canvas is left unchanged (1280×720 stays)", () => {
    expect(snapDimensions(1280, 720)).toEqual({ width: 1280, height: 720 });
  });

  test("an off-grid canvas snaps both edges (833×481 → 832×480)", () => {
    expect(snapDimensions(833, 481)).toEqual({ width: 832, height: 480 });
  });
});

describe("stepDim", () => {
  test("moves exactly one 16px step in each direction", () => {
    expect(stepDim(832, 1)).toBe(848);
    expect(stepDim(832, -1)).toBe(816);
  });

  test("re-aligns an off-grid value before stepping", () => {
    expect(stepDim(833, 1)).toBe(848);
    expect(stepDim(833, -1)).toBe(816);
  });

  test("respects the clamp bounds", () => {
    expect(stepDim(MAX_DIM, 1)).toBe(MAX_DIM);
    expect(stepDim(MIN_DIM, -1)).toBe(MIN_DIM);
  });
});

describe("swapDimensions", () => {
  test("reverses the aspect ratio while preserving pixel count", () => {
    expect(swapDimensions({ width: 832, height: 480 })).toEqual({ width: 480, height: 832 });
    expect(swapDimensions({ width: 720, height: 1920 })).toEqual({ width: 1920, height: 720 });
  });

  test("is its own inverse", () => {
    const dims = { width: 1280, height: 720 };
    expect(swapDimensions(swapDimensions(dims))).toEqual(dims);
  });
});

describe("fitAspectToBudget", () => {
  test("keeps the pixel count within a couple percent of the source budget", () => {
    const dims = fitAspectToBudget(9, 16, NATIVE_BUDGET);
    const realised = dims.width * dims.height;
    // 9:16 at the 480p budget — both edges land on the Wan2.2 grid.
    expect(dims).toEqual({ width: 480, height: 848 });
    expect(Math.abs(realised - NATIVE_BUDGET) / NATIVE_BUDGET).toBeLessThan(0.05);
  });

  test("produces a portrait canvas for a portrait ratio and landscape for landscape", () => {
    expect(orientationOf(fitAspectToBudget(9, 16, NATIVE_BUDGET))).toBe("portrait");
    expect(orientationOf(fitAspectToBudget(16, 9, NATIVE_BUDGET))).toBe("landscape");
  });

  test("every fitted edge is Wan2.2-aligned", () => {
    for (const preset of ASPECT_PRESETS) {
      const dims = fitAspectToBudget(preset.w, preset.h, NATIVE_BUDGET);
      expect(dims.width % WAN_ALIGN).toBe(0);
      expect(dims.height % WAN_ALIGN).toBe(0);
    }
  });

  test("rejects degenerate input without throwing", () => {
    expect(fitAspectToBudget(0, 16, NATIVE_BUDGET)).toEqual({ width: MIN_DIM, height: MIN_DIM });
    expect(fitAspectToBudget(9, 16, 0)).toEqual({ width: MIN_DIM, height: MIN_DIM });
  });
});

describe("matchAspectPreset", () => {
  test("recognises the native landscape and its reverse", () => {
    expect(matchAspectPreset({ width: 832, height: 480 })).toBe("16:9");
    expect(matchAspectPreset({ width: 480, height: 832 })).toBe("9:16");
  });

  test("recognises a square canvas", () => {
    expect(matchAspectPreset({ width: 640, height: 640 })).toBe("1:1");
  });

  test("an off-ladder ratio (≈1.64) matches nothing", () => {
    expect(matchAspectPreset({ width: 820, height: 500 })).toBeNull();
  });
});

describe("aspectLabel", () => {
  test("prefers a named preset", () => {
    expect(aspectLabel({ width: 1280, height: 720 })).toBe("16:9");
  });

  test("returns a named preset's label even for an off-grid edge (832×624 → 4:3)", () => {
    expect(aspectLabel({ width: 832, height: 624 })).toBe("4:3");
  });

  test("falls back to a reduced fraction for a genuinely off-ladder shape", () => {
    expect(aspectLabel({ width: 820, height: 500 })).toBe("41:25");
  });
});

describe("describeResolution", () => {
  test("reports budget percentage relative to the trained 480p budget", () => {
    const summary = describeResolution({ width: 832, height: 480 });
    expect(summary.budgetPct).toBe(100);
    expect(summary.orientation).toBe("landscape");
  });

  test("portrait reverse at the same pixel count is still 100% of budget", () => {
    expect(describeResolution({ width: 480, height: 832 }).budgetPct).toBe(100);
  });

  test("a 720p canvas reads well above the 480p budget", () => {
    expect(describeResolution({ width: 1280, height: 720 }).budgetPct).toBeGreaterThan(200);
  });
});

describe("DEFAULT_CUSTOM_RESOLUTION", () => {
  test("is a Wan2.2-aligned 16:9 canvas at native height", () => {
    expect(DEFAULT_CUSTOM_RESOLUTION).toEqual({ width: 848, height: 480 });
    expect(DEFAULT_CUSTOM_RESOLUTION.width % WAN_ALIGN).toBe(0);
    expect(DEFAULT_CUSTOM_RESOLUTION.height % WAN_ALIGN).toBe(0);
    expect(matchAspectPreset(DEFAULT_CUSTOM_RESOLUTION)).toBe("16:9");
  });

  test("sits within a few percent of the native 480p budget", () => {
    expect(describeResolution(DEFAULT_CUSTOM_RESOLUTION).budgetPct).toBe(102);
  });
});
