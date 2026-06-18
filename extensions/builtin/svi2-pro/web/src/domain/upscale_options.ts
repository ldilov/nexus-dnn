import type { UpscaleModel, UpscaleQuality } from "../services/types";

export const UPSCALE_ENGINE_OFF = "off";

export interface UpscaleEngineOption {
  value: typeof UPSCALE_ENGINE_OFF | UpscaleModel;
  label: string;
}

/** One dropdown for the whole super-resolution stage. "Off" replaces the old
 * factor=0 sentinel; every other value is the engine the worker runs. Maxine
 * (RTX) is just another engine here, not a separate control. */
export const UPSCALE_ENGINE_OPTIONS: UpscaleEngineOption[] = [
  { value: "off", label: "Off (native resolution)" },
  { value: "auto", label: "Auto (best available)" },
  { value: "maxine", label: "Maxine VSR — RTX (Windows only)" },
  { value: "drct-l-hq", label: "DRCT-L HQ (best, slow)" },
  { value: "drct-l-real", label: "DRCT-L Real (degraded sources)" },
  { value: "hat-l", label: "HAT-L (transformer)" },
  { value: "swinir-l", label: "SwinIR-L (real-world)" },
  { value: "realesrgan", label: "Real-ESRGAN (fast)" },
];

export const UPSCALE_SCALE_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 2, label: "2×" },
  { value: 3, label: "3×" },
  { value: 4, label: "4×" },
];

export const UPSCALE_QUALITY_OPTIONS: Array<{ value: UpscaleQuality; label: string }> = [
  { value: "LOW", label: "Low (fastest)" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "ULTRA", label: "Ultra (best)" },
  { value: "HIGHBITRATE_HIGH", label: "High-bitrate High" },
  { value: "HIGHBITRATE_ULTRA", label: "High-bitrate Ultra" },
];

const DEFAULT_SCALE = 2;

/** Maxine's quality preset only applies to the Maxine engine (and Auto, which
 * can pick Maxine on Windows). Transformer/ESRGAN engines ignore it. */
export function engineUsesMaxineQuality(engine: string): boolean {
  return engine === "maxine" || engine === "auto";
}

export function engineFromParams(
  upscaleFactor: number | undefined,
  upscaleModel: string | undefined,
): string {
  if (!upscaleFactor || upscaleFactor <= 0) return UPSCALE_ENGINE_OFF;
  return upscaleModel ?? "auto";
}

export interface UpscaleEngineChange {
  upscale_factor: number;
  upscale_model?: UpscaleModel;
}

/** Translate an engine pick into the underlying params. "Off" zeroes the
 * factor (the worker skips the stage); any engine restores a non-zero factor
 * so the selection actually runs. */
export function applyEngineChange(
  engine: string,
  currentFactor: number | undefined,
): UpscaleEngineChange {
  if (engine === UPSCALE_ENGINE_OFF) return { upscale_factor: 0 };
  const factor = currentFactor && currentFactor > 0 ? currentFactor : DEFAULT_SCALE;
  return { upscale_factor: factor, upscale_model: engine as UpscaleModel };
}
