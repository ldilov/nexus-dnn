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
    expect(DEFAULT_PARAMS.expression).toBe("neutral");
    expect(DEFAULT_PARAMS.crop).toBe("bust");
    expect(DEFAULT_PARAMS.texture).toBe(true);
    expect(DEFAULT_PARAMS.residency).toBe("balanced");
  });

  test("identity defaults match the worker contract", () => {
    expect(DEFAULT_PARAMS.seed).toBe(0);
    expect(DEFAULT_PARAMS.arc_iters).toBe(600);
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

  test("expression select exposes neutral + source", () => {
    const expression = FIELD_SPECS.find((f) => f.key === "expression");
    expect(expression?.control).toBe("select");
    expect(expression?.options?.map((o) => o.value)).toEqual(["neutral", "source"]);
  });

  test("crop select exposes bust + head", () => {
    const crop = FIELD_SPECS.find((f) => f.key === "crop");
    expect(crop?.control).toBe("select");
    expect(crop?.options?.map((o) => o.value)).toEqual(["bust", "head"]);
  });

  test("arc_iters is a slider with sane bounds", () => {
    const spec = FIELD_SPECS.find((f) => f.key === "arc_iters");
    expect(spec?.control).toBe("slider");
    expect(spec?.min).toBe(100);
    expect(spec?.max).toBe(1_500);
  });

  test("isFieldActive leaves ungated fields always active", () => {
    const seed = FIELD_SPECS.find((f) => f.key === "seed");
    if (!seed) throw new Error("seed spec missing");
    expect(isFieldActive(seed, {})).toBe(true);
  });

  test("primary keeps seed + expression + crop; advanced holds the rest", () => {
    expect(PRIMARY_FIELDS.map((f) => f.key)).toEqual(["seed", "expression", "crop"]);
    const advancedKeys = ADVANCED_FIELDS.map((f) => f.key);
    expect(advancedKeys).toContain("arc_iters");
    expect(advancedKeys).toContain("residency");
  });

  test("primary and advanced partition FIELD_SPECS exactly", () => {
    expect(PRIMARY_FIELDS.length + ADVANCED_FIELDS.length).toBe(FIELD_SPECS.length);
  });
});
