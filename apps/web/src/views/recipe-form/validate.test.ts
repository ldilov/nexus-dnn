import { describe, expect, it } from "vitest";
import { validateControls } from "./validate";
import type { RecipeProjection } from "../../api/generated/RecipeProjection";
import type { ControlHintDto } from "../../api/generated/ControlHintDto";
import type { Control } from "../../api/generated/Control";

function makeProjection(controls: Control[]): RecipeProjection {
  return {
    schema_version: 1,
    sections: [],
    controls,
    presets: [],
    output: {
      primary_artifact: "output",
      secondary: [],
      preview_style: "image",
      show_intermediate: false,
    },
    custom_ui: null,
  };
}

function makeControl(overrides: Partial<Control> = {}): Control {
  return {
    control_id: "ctrl_1",
    kind: "string",
    label: "Prompt",
    help_text: null,
    mode: "basic",
    default_value: "",
    widget_hint: null,
    bindings: [],
    ...overrides,
  };
}

function makeHint(overrides: Partial<ControlHintDto> = {}): ControlHintDto {
  return {
    control_id: "ctrl_1",
    kind: null,
    min: null,
    max: null,
    step: null,
    enum_values: null,
    required: null,
    ...overrides,
  };
}

describe("validateControls", () => {
  it("flags a missing required control", () => {
    const proj = makeProjection([makeControl({ control_id: "prompt" })]);
    const hints = [makeHint({ control_id: "prompt", required: true })];
    const { errors } = validateControls(proj, hints, {});
    expect(errors["prompt"]).toBeTruthy();
  });

  it("flags empty string as missing for a required control", () => {
    const proj = makeProjection([makeControl({ control_id: "prompt" })]);
    const hints = [makeHint({ control_id: "prompt", required: true })];
    const { errors } = validateControls(proj, hints, { prompt: "" });
    expect(errors["prompt"]).toBeTruthy();
  });

  it("passes when a required control has a non-empty value", () => {
    const proj = makeProjection([makeControl({ control_id: "prompt" })]);
    const hints = [makeHint({ control_id: "prompt", required: true })];
    const { errors } = validateControls(proj, hints, { prompt: "hello" });
    expect(errors["prompt"]).toBeUndefined();
  });

  it("rejects an enum value outside the allowed set", () => {
    const proj = makeProjection([makeControl({ control_id: "mode", kind: "enum" })]);
    const hints = [makeHint({ control_id: "mode", enum_values: ["fast", "quality"] })];
    const { errors } = validateControls(proj, hints, { mode: "turbo" });
    expect(errors["mode"]).toBeTruthy();
  });

  it("passes a valid enum value", () => {
    const proj = makeProjection([makeControl({ control_id: "mode", kind: "enum" })]);
    const hints = [makeHint({ control_id: "mode", enum_values: ["fast", "quality"] })];
    const { errors } = validateControls(proj, hints, { mode: "fast" });
    expect(errors["mode"]).toBeUndefined();
  });

  it("rejects a number below min", () => {
    const proj = makeProjection([makeControl({ control_id: "steps", kind: "int" })]);
    const hints = [makeHint({ control_id: "steps", min: 1, max: 50 })];
    const { errors } = validateControls(proj, hints, { steps: 0 });
    expect(errors["steps"]).toBeTruthy();
  });

  it("rejects a number above max", () => {
    const proj = makeProjection([makeControl({ control_id: "steps", kind: "int" })]);
    const hints = [makeHint({ control_id: "steps", min: 1, max: 50 })];
    const { errors } = validateControls(proj, hints, { steps: 51 });
    expect(errors["steps"]).toBeTruthy();
  });

  it("passes a number within min/max", () => {
    const proj = makeProjection([makeControl({ control_id: "steps", kind: "int" })]);
    const hints = [makeHint({ control_id: "steps", min: 1, max: 50 })];
    const { errors } = validateControls(proj, hints, { steps: 25 });
    expect(errors["steps"]).toBeUndefined();
  });

  it("rejects a user value on a locked control", () => {
    const proj = makeProjection([makeControl({ control_id: "seed", mode: "locked" })]);
    const hints = [makeHint({ control_id: "seed" })];
    const { errors } = validateControls(proj, hints, { seed: 42 });
    expect(errors["seed"]).toBeTruthy();
  });

  it("rejects a user value on a hidden control", () => {
    const proj = makeProjection([makeControl({ control_id: "internal", mode: "hidden" })]);
    const hints = [makeHint({ control_id: "internal" })];
    const { errors } = validateControls(proj, hints, { internal: "x" });
    expect(errors["internal"]).toBeTruthy();
  });

  it("passes a fully valid value set", () => {
    const controls: Control[] = [
      makeControl({ control_id: "prompt", kind: "string" }),
      makeControl({ control_id: "steps", kind: "int" }),
      makeControl({ control_id: "mode", kind: "enum" }),
    ];
    const hints: ControlHintDto[] = [
      makeHint({ control_id: "prompt", required: true }),
      makeHint({ control_id: "steps", min: 1, max: 50 }),
      makeHint({ control_id: "mode", enum_values: ["fast", "quality"] }),
    ];
    const values = { prompt: "hello", steps: 20, mode: "fast" };
    const { errors } = validateControls(makeProjection(controls), hints, values);
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
