import { describe, it, expect } from "vitest";
import { validateControlValues } from "./validation";
import type { FormControlDto } from "../../../api/generated/FormControlDto";

const ctrl = (over: Partial<FormControlDto>): FormControlDto => ({
  control_id: "c",
  kind: "float",
  label: "C",
  help_text: null,
  mode: "basic",
  default_value: null,
  widget_hint: null,
  schema_hint: null,
  ...over,
});

describe("validateControlValues", () => {
  it("rejects locked override", () => {
    const r = validateControlValues([ctrl({ control_id: "c", mode: "locked" })], { c: 1 });
    expect(r.ok).toBe(false);
    expect(r.errors.c).toMatch(/locked/);
  });
  it("rejects hidden override", () => {
    const r = validateControlValues([ctrl({ control_id: "c", mode: "hidden" })], { c: 1 });
    expect(r.ok).toBe(false);
    expect(r.errors.c).toMatch(/not settable/);
  });
  it("enforces numeric range", () => {
    const r = validateControlValues(
      [ctrl({ control_id: "c", schema_hint: { value_type: "integer", enum_values: null, minimum: 1, maximum: 10 } })],
      { c: 99 },
    );
    expect(r.ok).toBe(false);
  });
  it("passes valid values", () => {
    const r = validateControlValues([ctrl({ control_id: "c" })], { c: 3 });
    expect(r.ok).toBe(true);
  });
  it("flags unknown controls", () => {
    const r = validateControlValues([ctrl({ control_id: "c" })], { ghost: 1 });
    expect(r.ok).toBe(false);
    expect(r.errors.ghost).toMatch(/unknown/);
  });
  it("rejects out-of-range enum values", () => {
    const r = validateControlValues(
      [ctrl({ control_id: "c", kind: "enum", schema_hint: { value_type: "string", enum_values: ["a", "b"], minimum: null, maximum: null } })],
      { c: "z" },
    );
    expect(r.ok).toBe(false);
    expect(r.errors.c).toMatch(/allowed/);
  });
});
