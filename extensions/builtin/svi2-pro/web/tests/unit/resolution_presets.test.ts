import { describe, expect, test } from "vitest";
import {
  CUSTOM_RESOLUTION,
  buildResolutionOptions,
  matchResolutionOption,
} from "../../src/domain/resolution_presets";
import type { PresetSummary } from "../../src/services/types";

const catalog: PresetSummary[] = [
  {
    id: "svi-canonical",
    label: "Canonical",
    description: "native",
    params: { width: 832, height: 480 },
  },
  {
    id: "svi-canonical-704",
    label: "704",
    description: "one step down",
    params: { width: 704, height: 400 },
    hidden: true,
  },
  {
    id: "svi-canonical-640",
    label: "640",
    description: "two steps down",
    params: { width: 640, height: 368 },
    hidden: true,
  },
  {
    id: "flf2v-morph-lowvram",
    label: "FLF2V",
    description: "morph",
    params: { width: 960, height: 544 },
  },
];

describe("buildResolutionOptions", () => {
  test("yields exactly the three canonical steps sourced from the catalog", () => {
    const options = buildResolutionOptions(catalog);
    expect(options.map((o) => [o.width, o.height])).toEqual([
      [832, 480],
      [704, 400],
      [640, 368],
    ]);
  });

  test("native step is on-distribution; both step-downs are off-distribution", () => {
    const options = buildResolutionOptions(catalog);
    expect(options[0]?.offDistribution).toBe(false);
    expect(options[1]?.offDistribution).toBe(true);
    expect(options[2]?.offDistribution).toBe(true);
  });

  test("missing catalog entries are skipped, not invented", () => {
    const options = buildResolutionOptions(catalog.slice(0, 1));
    expect(options).toHaveLength(1);
    expect(options[0]?.id).toBe("svi-canonical");
  });
});

describe("matchResolutionOption", () => {
  const options = buildResolutionOptions(catalog);

  test("default 832×480 matches the native option", () => {
    expect(matchResolutionOption({ width: 832, height: 480 }, options)).toBe("svi-canonical");
  });

  test("step-down params match their option", () => {
    expect(matchResolutionOption({ width: 704, height: 400 }, options)).toBe("svi-canonical-704");
    expect(matchResolutionOption({ width: 640, height: 368 }, options)).toBe("svi-canonical-640");
  });

  test("manual width/height edits report custom", () => {
    expect(matchResolutionOption({ width: 816, height: 480 }, options)).toBe(CUSTOM_RESOLUTION);
  });
});
