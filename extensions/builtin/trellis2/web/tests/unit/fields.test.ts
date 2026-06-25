import { describe, expect, test } from "vitest";
import { DEFAULT_PARAMS } from "../../src/domain/defaults";
import { FIELD_SPECS } from "../../src/domain/fields";

describe("operator fields", () => {
  test("default params match the frozen contract", () => {
    expect(DEFAULT_PARAMS.sparse_steps).toBe(12);
    expect(DEFAULT_PARAMS.simplify_target).toBe(1_000_000);
    expect(DEFAULT_PARAMS.texture).toBe(false);
    expect(DEFAULT_PARAMS.residency).toBe("balanced");
  });

  test("every field spec carries help text and a control", () => {
    for (const spec of FIELD_SPECS) {
      expect(spec.help.length).toBeGreaterThan(0);
      expect(spec.control).toBeTruthy();
    }
  });

  test("residency is a select with both profiles", () => {
    const residency = FIELD_SPECS.find((f) => f.key === "residency");
    expect(residency?.control).toBe("select");
    expect(residency?.options?.map((o) => o.value)).toEqual(["balanced", "low_vram"]);
  });
});
