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
    mode: "image_to_video",
    ref_image_path: "",
    prompts: [""],
    last_image_path: null,
    upscale_factor: 0,
    upscale_model: "auto",
    upscale_quality: "HIGH",
    blocks_to_swap: settings.blocksToSwap,
    attention: settings.attentionBackend,
    interpolate_method: settings.interpolateMethod,
    interpolate_fps: settings.interpolateFps,
    models_dir: settings.modelsDir || undefined,
    output_path: settings.outputDir ? `${settings.outputDir}/svi2_out.mp4` : undefined,
    dit_high_path: settings.ditHighPath || undefined,
    dit_low_path: settings.ditLowPath || undefined,
    svi_lora_tier: settings.sviLoraTier ?? "high",
    torch_compile_mode: "default",
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
