import { describe, expect, test } from "vitest";
import { FIELDS } from "../../src/domain/fields";
import { defaultParamsFromSettings } from "../../src/domain/build_params";
import { DEFAULT_SETTINGS } from "../../src/domain/settings_defaults";

const spec = FIELDS.find((f) => f.key === "teacache_multiplier");

describe("teacache_multiplier FieldSpec", () => {
  test("exists in FIELDS", () => {
    expect(spec).toBeDefined();
  });

  test("is in the perf tier", () => {
    expect(spec?.tier).toBe("perf");
  });

  test("is a numeric select", () => {
    expect(spec?.control).toBe("select");
    expect(spec?.numeric).toBe(true);
  });

  test("default is 1 (off)", () => {
    expect(spec?.default).toBe(1);
  });

  test("has exactly 7 options", () => {
    expect(spec?.options).toHaveLength(7);
  });

  test("option values are the 7 multipliers as strings", () => {
    const values = spec?.options?.map((o) => o.value);
    expect(values).toEqual(["1", "1.25", "1.5", "1.75", "2", "2.25", "2.5"]);
  });

  test("first option label is Off (1×)", () => {
    expect(spec?.options?.[0].label).toBe("Off (1×)");
  });

  test("last option label warns of artifacts", () => {
    expect(spec?.options?.[6].label).toBe("2.5× (artifacts likely)");
  });
});

describe("defaultParamsFromSettings includes teacache_multiplier default", () => {
  test("teacache_multiplier defaults to 1", () => {
    const params = defaultParamsFromSettings(DEFAULT_SETTINGS);
    expect(params.teacache_multiplier).toBe(1);
  });
});
