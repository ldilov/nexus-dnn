import type { GenerateParams } from "../services/types";
import presetData from "./presets.json";

export type PresetId = "fast" | "balanced" | "max";

/** The quality knobs a preset pins. Seed, texture (bake), residency, and
 * metallic stay user-controlled — presets only move the speed/detail dial. */
export type PresetParams = Readonly<
  Pick<
    GenerateParams,
    | "pipeline_type"
    | "sparse_steps"
    | "shape_steps"
    | "texture_steps"
    | "texture_size"
    | "max_num_tokens"
    | "simplify_target"
  >
>;

export interface GeneratePreset {
  id: PresetId;
  label: string;
  hint: string;
  params: PresetParams;
}

/** The keys a preset owns. matchPreset compares exactly these against params. */
export const PRESET_KEYS = [
  "pipeline_type",
  "sparse_steps",
  "shape_steps",
  "texture_steps",
  "texture_size",
  "max_num_tokens",
  "simplify_target",
] as const;

/** Raw shape of a preset entry in presets.json (untyped JSON before mapping). */
interface RawPreset {
  id: string;
  label: string;
  hint: string;
  params: Record<string, unknown>;
}

/** Fast → Balanced (== operator defaults) → Max detail. Definitions ship as
 * declarative data in presets.json, installed with the extension; this module
 * adds types + the active-preset matcher. Balanced mirrors DEFAULT_PARAMS so a
 * fresh form selects it. */
export const PRESETS: readonly GeneratePreset[] = (
  presetData.presets as readonly RawPreset[]
).map((preset) => ({
  id: preset.id as PresetId,
  label: preset.label,
  hint: preset.hint,
  params: preset.params as PresetParams,
}));

/** The id of the preset whose pinned keys all match params, or null (custom). */
export function matchPreset(params: Partial<GenerateParams>): PresetId | null {
  for (const preset of PRESETS) {
    if (PRESET_KEYS.every((key) => params[key] === preset.params[key])) {
      return preset.id;
    }
  }
  return null;
}
