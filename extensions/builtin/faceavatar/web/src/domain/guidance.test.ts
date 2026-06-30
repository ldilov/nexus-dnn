import { describe, expect, it } from "vitest";
import {
  buildGuidancePatch,
  GUIDANCE_KEYS,
  GUIDANCE_STAGES,
  type GuidanceDraft,
  isGuidanceKey,
} from "./guidance";

describe("GUIDANCE_STAGES", () => {
  it("declares three stages of five fields each (15 levers total)", () => {
    expect(GUIDANCE_STAGES.map((stage) => stage.id)).toEqual(["sparse", "shape", "texture"]);
    for (const stage of GUIDANCE_STAGES) {
      expect(stage.fields).toHaveLength(5);
    }
    expect(GUIDANCE_KEYS).toHaveLength(15);
  });

  it("carries the baked-default hint as the placeholder per stage", () => {
    const sparse = GUIDANCE_STAGES.find((stage) => stage.id === "sparse");
    const strength = sparse?.fields.find((f) => f.key === "sparse_guidance_strength");
    expect(strength?.placeholder).toBe("7.5");
    const texture = GUIDANCE_STAGES.find((stage) => stage.id === "texture");
    const texStrength = texture?.fields.find((f) => f.key === "texture_guidance_strength");
    expect(texStrength?.placeholder).toBe("1.0");
  });
});

describe("buildGuidancePatch — empty omitted", () => {
  it("returns an empty patch when nothing is filled", () => {
    expect(buildGuidancePatch({})).toEqual({});
  });

  it("omits blank and whitespace-only entries", () => {
    const draft: GuidanceDraft = {
      sparse_guidance_strength: "",
      shape_guidance_rescale: "   ",
    };
    expect(buildGuidancePatch(draft)).toEqual({});
  });

  it("omits non-numeric entries", () => {
    const draft: GuidanceDraft = { sparse_guidance_strength: "abc" };
    expect(buildGuidancePatch(draft)).toEqual({});
  });
});

describe("buildGuidancePatch — filled included", () => {
  it("includes only the scalar fields the user filled", () => {
    const draft: GuidanceDraft = {
      sparse_guidance_strength: "9.5",
      shape_rescale_t: "2",
    };
    expect(buildGuidancePatch(draft)).toEqual({
      sparse_guidance_strength: 9.5,
      shape_rescale_t: 2,
    });
  });

  it("parses zero as a set value (not omitted)", () => {
    const draft: GuidanceDraft = { texture_guidance_rescale: "0" };
    expect(buildGuidancePatch(draft)).toEqual({ texture_guidance_rescale: 0 });
  });
});

describe("buildGuidancePatch — interval pair rule", () => {
  it("drops a lone interval bound (worker ignores it)", () => {
    expect(buildGuidancePatch({ sparse_guidance_interval_start: "0.3" })).toEqual({});
    expect(buildGuidancePatch({ shape_guidance_interval_end: "1.0" })).toEqual({});
  });

  it("includes both bounds only when both are set", () => {
    const draft: GuidanceDraft = {
      sparse_guidance_interval_start: "0.3",
      sparse_guidance_interval_end: "1.0",
    };
    expect(buildGuidancePatch(draft)).toEqual({
      sparse_guidance_interval_start: 0.3,
      sparse_guidance_interval_end: 1.0,
    });
  });

  it("keeps interval pairs independent per stage", () => {
    const draft: GuidanceDraft = {
      sparse_guidance_interval_start: "0.3",
      sparse_guidance_interval_end: "1.0",
      texture_guidance_interval_start: "0.6",
    };
    expect(buildGuidancePatch(draft)).toEqual({
      sparse_guidance_interval_start: 0.3,
      sparse_guidance_interval_end: 1.0,
    });
  });
});

describe("buildGuidancePatch — mixed realistic draft", () => {
  it("merges scalars and a complete interval, omitting the rest", () => {
    const draft: GuidanceDraft = {
      sparse_guidance_strength: "8",
      sparse_guidance_rescale: "",
      shape_guidance_interval_start: "0.3",
      shape_guidance_interval_end: "0.9",
      texture_guidance_interval_start: "0.6",
    };
    const patch = buildGuidancePatch(draft);
    expect(patch).toEqual({
      sparse_guidance_strength: 8,
      shape_guidance_interval_start: 0.3,
      shape_guidance_interval_end: 0.9,
    });
    expect(Object.keys(patch)).not.toContain("texture_guidance_interval_start");
  });
});

describe("payload merge semantics", () => {
  it("only set guidance keys land in the start-body params", () => {
    const baseParams = { seed: 0, pipeline_type: "1024_cascade" as const };
    const draft: GuidanceDraft = { sparse_guidance_strength: "7.5" };
    const body = { params: { ...baseParams, ...buildGuidancePatch(draft) } };
    expect(body.params).toEqual({
      seed: 0,
      pipeline_type: "1024_cascade",
      sparse_guidance_strength: 7.5,
    });
    expect(Object.keys(body.params)).not.toContain("shape_guidance_strength");
  });
});

describe("isGuidanceKey", () => {
  it("accepts known keys and rejects others", () => {
    expect(isGuidanceKey("sparse_guidance_strength")).toBe(true);
    expect(isGuidanceKey("seed")).toBe(false);
  });
});
