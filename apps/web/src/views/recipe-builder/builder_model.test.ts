import { describe, expect, it } from "vitest";
import type { ExposableTargetDto } from "../../api/generated/ExposableTargetDto";
import {
  buildProjection,
  controlFromTarget,
  lockConflicts,
  seedDefault,
  slugify,
  targetKind,
  type ExposedControl,
} from "./builder_model";

function inputTarget(over: Partial<ExposableTargetDto> = {}): ExposableTargetDto {
  return {
    target: "input:prompt",
    kind: "input",
    label: "prompt",
    schema: null,
    node_id: null,
    port_type: "string",
    required: false,
    current_default: null,
    ...over,
  };
}

function nodeTarget(over: Partial<ExposableTargetDto> = {}): ExposableTargetDto {
  return {
    target: "node:gen.config.steps",
    kind: "node_config",
    label: "steps",
    schema: { type: "integer" },
    node_id: "gen",
    port_type: null,
    required: true,
    current_default: 16,
    ...over,
  };
}

describe("slugify", () => {
  it("lowercases and collapses non-alnum runs", () => {
    expect(slugify("Speech Speed!")).toBe("speech-speed");
  });
  it("falls back to 'field' for empty slugs", () => {
    expect(slugify("***")).toBe("field");
  });
});

describe("targetKind", () => {
  it("maps input port types", () => {
    expect(targetKind(inputTarget({ port_type: "string" }))).toBe("string");
    expect(targetKind(inputTarget({ port_type: "integer" }))).toBe("int");
    expect(targetKind(inputTarget({ port_type: "boolean" }))).toBe("bool");
  });
  it("maps node-config schema types and enums", () => {
    expect(targetKind(nodeTarget({ schema: { type: "integer" } }))).toBe("int");
    expect(targetKind(nodeTarget({ schema: { type: "number" } }))).toBe("float");
    expect(targetKind(nodeTarget({ schema: { type: "boolean" } }))).toBe("bool");
    expect(targetKind(nodeTarget({ schema: { enum: ["a", "b"] } }))).toBe("enum");
  });
});

describe("seedDefault", () => {
  it("uses current_default when present", () => {
    expect(seedDefault(nodeTarget({ current_default: 8 }), "int")).toBe(8);
  });
  it("never returns null/undefined", () => {
    expect(seedDefault(inputTarget({ current_default: null }), "string")).toBe("");
    expect(seedDefault(nodeTarget({ current_default: null }), "int")).toBe(0);
    expect(seedDefault(nodeTarget({ current_default: null }), "bool")).toBe(false);
    expect(
      seedDefault(
        nodeTarget({ current_default: null, schema: { enum: ["fast", "slow"] } }),
        "enum",
      ),
    ).toBe("fast");
  });
});

describe("controlFromTarget", () => {
  it("starts in basic mode, binds the target, seeds a non-null default", () => {
    const c = controlFromTarget(nodeTarget({ current_default: null }));
    expect(c.mode).toBe("basic");
    expect(c.help_text).toBe("");
    expect(c.target).toBe("node:gen.config.steps");
    expect(c.kind).toBe("int");
    expect(c.default_value).toBe(0);
    expect(c.control_id).toBe("steps");
  });
});

describe("buildProjection", () => {
  function exposed(over: Partial<ExposedControl> = {}): ExposedControl {
    return {
      control_id: "steps",
      target: "node:gen.config.steps",
      kind: "int",
      label: "Steps",
      help_text: "",
      mode: "basic",
      default_value: 16,
      section: "Sampler",
      ...over,
    };
  }

  it("emits one control per exposed target with its binding", () => {
    const proj = buildProjection(
      [exposed()],
      [],
      { primary_artifact: "image", preview_style: "image", show_intermediate: false },
    );
    expect(proj.controls).toHaveLength(1);
    expect(proj.controls[0]!.bindings).toEqual(["node:gen.config.steps"]);
    expect(proj.controls[0]!.help_text).toBeNull();
    expect(proj.output.primary_artifact).toBe("image");
  });

  it("groups controls into sections by section name, in first-seen order", () => {
    const proj = buildProjection(
      [
        exposed({ control_id: "a", section: "First" }),
        exposed({ control_id: "b", section: "Second" }),
        exposed({ control_id: "c", section: "First" }),
      ],
      [],
      { primary_artifact: "", preview_style: "none", show_intermediate: false },
    );
    expect(proj.sections.map((s) => s.title)).toEqual(["First", "Second"]);
    expect(proj.sections[0]!.control_ids).toEqual(["a", "c"]);
    expect(Number(proj.sections[0]!.order)).toBe(0);
  });

  it("authors recipe-scoped presets", () => {
    const proj = buildProjection(
      [exposed()],
      [{ preset_id: "fast", label: "Fast", values: { steps: 8 } }],
      { primary_artifact: "", preview_style: "none", show_intermediate: false },
    );
    expect(proj.presets[0]!.source).toBe("recipe");
    expect(proj.presets[0]!.values).toEqual({ steps: 8 });
  });
});

describe("lockConflicts", () => {
  const ctrl = (mode: ExposedControl["mode"]): ExposedControl => ({
    control_id: "steps",
    target: "node:gen.config.steps",
    kind: "int",
    label: "Steps",
    help_text: "",
    mode,
    default_value: 16,
    section: "Configure",
  });

  it("flags a preset that writes a locked or hidden control", () => {
    expect(
      lockConflicts([ctrl("locked")], [
        { preset_id: "p", label: "P", values: { steps: 8 } },
      ]),
    ).toEqual([{ preset_id: "p", control_id: "steps" }]);
  });

  it("does not flag a basic control", () => {
    expect(
      lockConflicts([ctrl("basic")], [
        { preset_id: "p", label: "P", values: { steps: 8 } },
      ]),
    ).toEqual([]);
  });
});
