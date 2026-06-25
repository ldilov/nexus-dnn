import type { GenerateParams } from "../services/types";

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

/** Fast → Balanced (== operator defaults) → Max detail. Balanced mirrors
 * DEFAULT_PARAMS exactly so a fresh form shows Balanced selected. */
export const PRESETS: readonly GeneratePreset[] = [
  {
    id: "fast",
    label: "Fast",
    hint: "512 · quick draft",
    params: {
      pipeline_type: "512",
      sparse_steps: 8,
      shape_steps: 8,
      texture_steps: 8,
      texture_size: 1024,
      max_num_tokens: 49_152,
      simplify_target: 100_000,
    },
  },
  {
    id: "balanced",
    label: "Balanced",
    hint: "1024 cascade · default",
    params: {
      pipeline_type: "1024_cascade",
      sparse_steps: 12,
      shape_steps: 12,
      texture_steps: 12,
      texture_size: 2048,
      max_num_tokens: 49_152,
      simplify_target: 1_000_000,
    },
  },
  {
    id: "max",
    label: "Max detail",
    hint: "1536 cascade · slow",
    params: {
      pipeline_type: "1536_cascade",
      sparse_steps: 20,
      shape_steps: 25,
      texture_steps: 25,
      texture_size: 4096,
      max_num_tokens: 98_304,
      simplify_target: 1_000_000,
    },
  },
] as const;

/** The id of the preset whose pinned keys all match params, or null (custom). */
export function matchPreset(params: Partial<GenerateParams>): PresetId | null {
  for (const preset of PRESETS) {
    if (PRESET_KEYS.every((key) => params[key] === preset.params[key])) {
      return preset.id;
    }
  }
  return null;
}
