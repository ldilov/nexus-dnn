//! Pure builder-state helpers: map exposable targets to controls, seed non-null
//! defaults, assemble a RecipeProjection, and detect preset/lock conflicts.
//! Host-generic — no extension-id or node-id assumptions.

import type { Control } from "../../api/generated/Control";
import type { ControlKind } from "../../api/generated/ControlKind";
import type { ControlMode } from "../../api/generated/ControlMode";
import type { ExposableTargetDto } from "../../api/generated/ExposableTargetDto";
import type { Preset } from "../../api/generated/Preset";
import type { RecipeProjection } from "../../api/generated/RecipeProjection";
import type { Section } from "../../api/generated/Section";

export interface ExposedControl {
  control_id: string;
  target: string;
  kind: ControlKind;
  label: string;
  help_text: string;
  mode: ControlMode;
  default_value: unknown;
  section: string;
}

export interface BuilderPreset {
  preset_id: string;
  label: string;
  values: Record<string, unknown>;
}

export interface BuilderOutput {
  primary_artifact: string;
  preview_style: string;
  show_intermediate: boolean;
}

const DEFAULT_SECTION = "Configure";

/** Slugify a label into an id: lowercase ASCII alnum, other runs collapse to `-`. */
export function slugify(label: string): string {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 0 ? slug : "field";
}

function enumOptions(schema: unknown): unknown[] {
  if (!schema || typeof schema !== "object") return [];
  const e = (schema as Record<string, unknown>).enum;
  return Array.isArray(e) ? e : [];
}

/** Map a target's port type / config sub-schema to a control kind. */
export function targetKind(target: ExposableTargetDto): ControlKind {
  if (target.kind === "input") {
    switch (target.port_type) {
      case "int":
      case "integer":
        return "int";
      case "float":
      case "number":
        return "float";
      case "bool":
      case "boolean":
        return "bool";
      default:
        return "string";
    }
  }
  if (enumOptions(target.schema).length > 0) return "enum";
  const type =
    target.schema && typeof target.schema === "object"
      ? (target.schema as Record<string, unknown>).type
      : undefined;
  switch (type) {
    case "integer":
      return "int";
    case "number":
      return "float";
    case "boolean":
      return "bool";
    default:
      return "string";
  }
}

/**
 * A non-null seed default for a freshly exposed control. The save-gate's
 * defaults run rejects a bound control whose effective value is null
 * (MissingRequired), so every exposed control must carry a concrete default:
 * the target's `current_default`, else the first enum option, else a
 * type-appropriate zero.
 */
export function seedDefault(target: ExposableTargetDto, kind: ControlKind): unknown {
  if (target.current_default !== null && target.current_default !== undefined) {
    return target.current_default;
  }
  if (kind === "enum") {
    const opt = enumOptions(target.schema).find(
      (v) => v !== null && v !== undefined,
    );
    if (opt !== undefined) return opt;
  }
  switch (kind) {
    case "int":
    case "float":
      return 0;
    case "bool":
      return false;
    default:
      return "";
  }
}

/** Initial exposed-control config for a target (basic mode, label from target). */
export function controlFromTarget(target: ExposableTargetDto): ExposedControl {
  const kind = targetKind(target);
  return {
    control_id: slugify(target.label),
    target: target.target,
    kind,
    label: target.label,
    help_text: "",
    mode: "basic",
    default_value: seedDefault(target, kind),
    section: DEFAULT_SECTION,
  };
}

/** Assemble a RecipeProjection from the exposed controls, presets, and output. */
export function buildProjection(
  controls: ExposedControl[],
  presets: BuilderPreset[],
  output: BuilderOutput,
): RecipeProjection {
  const sectionOrder: string[] = [];
  const bySection = new Map<string, string[]>();
  const projControls: Control[] = [];

  for (const c of controls) {
    const sec = c.section.trim() || DEFAULT_SECTION;
    if (!bySection.has(sec)) {
      bySection.set(sec, []);
      sectionOrder.push(sec);
    }
    bySection.get(sec)?.push(c.control_id);
    projControls.push({
      control_id: c.control_id,
      kind: c.kind,
      label: c.label,
      help_text: c.help_text.trim() || null,
      mode: c.mode,
      default_value: c.default_value,
      widget_hint: null,
      bindings: [c.target],
    });
  }

  const sections: Section[] = sectionOrder.map((title, i) => ({
    id: slugify(title),
    title,
    // ts-rs types i64 as bigint, but the wire value is a JSON number; a real
    // BigInt would make JSON.stringify throw, so keep a number at runtime.
    order: i as unknown as bigint,
    control_ids: bySection.get(title) ?? [],
  }));

  const projPresets: Preset[] = presets.map((p) => ({
    preset_id: p.preset_id,
    label: p.label,
    description: null,
    source: "recipe",
    values: p.values,
  }));

  return {
    schema_version: 1,
    sections,
    controls: projControls,
    presets: projPresets,
    output: {
      primary_artifact: output.primary_artifact,
      secondary: [],
      preview_style: output.preview_style,
      show_intermediate: output.show_intermediate,
    },
    custom_ui: null,
  };
}

/**
 * Preset keys that write a `locked` or `hidden` control. The compiler accepts a
 * preset overlaying a locked/hidden control, but in the builder it is almost
 * always an authoring mistake, so it is surfaced as a blocking warning.
 */
export function lockConflicts(
  controls: ExposedControl[],
  presets: BuilderPreset[],
): Array<{ preset_id: string; control_id: string }> {
  const modeById = new Map(controls.map((c) => [c.control_id, c.mode]));
  const out: Array<{ preset_id: string; control_id: string }> = [];
  for (const p of presets) {
    for (const key of Object.keys(p.values)) {
      const mode = modeById.get(key);
      if (mode === "locked" || mode === "hidden") {
        out.push({ preset_id: p.preset_id, control_id: key });
      }
    }
  }
  return out;
}
