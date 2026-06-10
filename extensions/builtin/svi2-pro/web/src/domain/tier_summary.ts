import type { RenderParams } from "../services/types";
import { FIELDS, type FieldTier } from "./fields";

const INTERP_LABELS: Record<string, string> = {
  rife: "RIFE (auto)",
  rife_torch: "RIFE torch",
  rife_ncnn: "RIFE ncnn",
  ffmpeg: "ffmpeg",
};

function fmt1(value: number): string {
  return (Math.round(value * 10) / 10).toFixed(1);
}

function defaultFor(key: keyof RenderParams): number | boolean | string | undefined {
  return FIELDS.find((f) => f.key === key)?.default;
}

function numParam(params: Partial<RenderParams>, key: keyof RenderParams): number {
  const value = params[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const fallback = defaultFor(key);
  return typeof fallback === "number" ? fallback : 0;
}

export function tierSummary(tier: FieldTier, params: Partial<RenderParams>): string | null {
  if (tier === "core") {
    const fps = numParam(params, "fps");
    const interpFps = numParam(params, "interpolate_fps");
    const outFps = interpFps > 0 ? interpFps : fps;
    const method = typeof params.interpolate_method === "string" ? params.interpolate_method : "rife";
    const interpLabel = INTERP_LABELS[method] ?? method;
    const upscale = numParam(params, "upscale_factor");
    const base = `${fps} → ${outFps} fps · ${interpLabel}`;
    return upscale > 0 ? `${base} · ${upscale}× VSR` : base;
  }
  if (tier === "quality") {
    const steps = numParam(params, "num_inference_steps");
    const cfg = numParam(params, "cfg_scale");
    const shift = numParam(params, "sigma_shift");
    return `${steps} steps · CFG ${fmt1(cfg)} · shift ${fmt1(shift)}`;
  }
  return null;
}
