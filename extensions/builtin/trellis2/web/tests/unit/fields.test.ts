import { describe, expect, test } from "vitest";
import { DEFAULT_PARAMS } from "../../src/domain/defaults";
import {
  ADVANCED_FIELDS,
  FIELD_SPECS,
  isFieldActive,
  PRIMARY_FIELDS,
} from "../../src/domain/fields";

describe("operator fields", () => {
  test("default params match the frozen contract", () => {
    expect(DEFAULT_PARAMS.sparse_steps).toBe(12);
    expect(DEFAULT_PARAMS.simplify_target).toBe(1_000_000);
    expect(DEFAULT_PARAMS.texture).toBe(false);
    expect(DEFAULT_PARAMS.residency).toBe("balanced");
  });

  test("new quality defaults match the worker contract", () => {
    expect(DEFAULT_PARAMS.pipeline_type).toBe("1024_cascade");
    expect(DEFAULT_PARAMS.texture_steps).toBe(12);
    expect(DEFAULT_PARAMS.max_num_tokens).toBe(49_152);
    expect(DEFAULT_PARAMS.texture_size).toBe(2048);
    expect(DEFAULT_PARAMS.metallic).toBe(0);
  });

  test("every field spec carries help text and a control", () => {
    for (const spec of FIELD_SPECS) {
      expect(spec.help.length).toBeGreaterThan(0);
      expect(spec.control).toBeTruthy();
    }
  });

  test("each field spec default matches DEFAULT_PARAMS", () => {
    for (const spec of FIELD_SPECS) {
      expect(spec.default).toBe(DEFAULT_PARAMS[spec.key]);
    }
  });

  test("residency is a select with both profiles", () => {
    const residency = FIELD_SPECS.find((f) => f.key === "residency");
    expect(residency?.control).toBe("select");
    expect(residency?.options?.map((o) => o.value)).toEqual(["balanced", "low_vram"]);
  });

  test("pipeline_type select exposes all four presets", () => {
    const pipeline = FIELD_SPECS.find((f) => f.key === "pipeline_type");
    expect(pipeline?.control).toBe("select");
    expect(pipeline?.options?.map((o) => o.value)).toEqual([
      "512",
      "1024",
      "1024_cascade",
      "1536_cascade",
    ]);
  });

  test("texture_size is a numeric select with the four resolutions", () => {
    const tex = FIELD_SPECS.find((f) => f.key === "texture_size");
    expect(tex?.control).toBe("select");
    expect(tex?.numeric).toBe(true);
    expect(tex?.options?.map((o) => o.value)).toEqual(["1024", "2048", "4096", "8192"]);
  });

  test("metallic is a 0..1 slider", () => {
    const metallic = FIELD_SPECS.find((f) => f.key === "metallic");
    expect(metallic?.control).toBe("slider");
    expect(metallic?.min).toBe(0);
    expect(metallic?.max).toBe(1);
    expect(metallic?.step).toBeLessThan(1);
  });

  test("texture_steps respects the 1..100 bounds", () => {
    const spec = FIELD_SPECS.find((f) => f.key === "texture_steps");
    expect(spec?.min).toBe(1);
    expect(spec?.max).toBe(100);
  });

  test("max_num_tokens has a floor of zero and a tightened ceiling", () => {
    const spec = FIELD_SPECS.find((f) => f.key === "max_num_tokens");
    expect(spec?.min).toBe(0);
    expect(spec?.max).toBe(131_072);
  });

  test("max_num_tokens is gated to the 1536 cascade", () => {
    const spec = FIELD_SPECS.find((f) => f.key === "max_num_tokens");
    expect(spec?.gate?.key).toBe("pipeline_type");
    expect(spec?.gate?.in).toEqual(["1536_cascade"]);
  });

  test("isFieldActive disables max_num_tokens outside the 1536 cascade", () => {
    const spec = FIELD_SPECS.find((f) => f.key === "max_num_tokens");
    if (!spec) throw new Error("max_num_tokens spec missing");
    expect(isFieldActive(spec, { pipeline_type: "1024_cascade" })).toBe(false);
    expect(isFieldActive(spec, { pipeline_type: "1536_cascade" })).toBe(true);
  });

  test("isFieldActive leaves ungated fields always active", () => {
    const seed = FIELD_SPECS.find((f) => f.key === "seed");
    if (!seed) throw new Error("seed spec missing");
    expect(isFieldActive(seed, {})).toBe(true);
  });

  test("primary keeps seed + sparse_steps; advanced holds the rest", () => {
    expect(PRIMARY_FIELDS.map((f) => f.key)).toEqual(["seed", "sparse_steps"]);
    const advancedKeys = ADVANCED_FIELDS.map((f) => f.key);
    expect(advancedKeys).toContain("pipeline_type");
    expect(advancedKeys).toContain("texture_steps");
    expect(advancedKeys).toContain("max_num_tokens");
    expect(advancedKeys).toContain("texture_size");
    expect(advancedKeys).toContain("metallic");
    expect(advancedKeys).toContain("shape_steps");
    expect(advancedKeys).toContain("simplify_target");
    expect(advancedKeys).toContain("residency");
  });

  test("primary and advanced partition FIELD_SPECS exactly", () => {
    expect(PRIMARY_FIELDS.length + ADVANCED_FIELDS.length).toBe(FIELD_SPECS.length);
  });
});
