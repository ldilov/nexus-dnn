import { FIELDS } from "./fields";
import type { ExtensionSettings, PresetSummary, RenderParams } from "../services/types";

function fieldDefaults(): Partial<RenderParams> {
  const out: Record<string, unknown> = {};
  for (const field of FIELDS) {
    if (field.default !== undefined) out[field.key] = field.default;
  }
  return out as Partial<RenderParams>;
}

export function defaultParamsFromSettings(settings: ExtensionSettings): RenderParams {
  return {
    ...fieldDefaults(),
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    blocks_to_swap: settings.blocksToSwap,
    interpolate_method: settings.interpolateMethod,
    interpolate_fps: settings.interpolateFps,
    models_dir: settings.modelsDir || undefined,
    output_path: settings.outputDir ? `${settings.outputDir}/svi2_out.mp4` : undefined,
  } as RenderParams;
}

export function applyPreset(base: RenderParams, preset: PresetSummary): RenderParams {
  return {
    ...base,
    ...preset.params,
    ref_image_path: base.ref_image_path,
    last_image_path: base.last_image_path ?? null,
    prompts: base.prompts,
  };
}
