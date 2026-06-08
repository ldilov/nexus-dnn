import type { PresetSummary, RenderParams } from "../services/types";

export interface PresetBadges {
  resolution: string;
  duration: string;
  vram: string;
  isLowVram: boolean;
  isOffDistribution: boolean;
  requiresLastImage: boolean;
}

export const CANONICAL_PRESET_ID = "svi-canonical";
const LOW_VRAM_PRESET_IDS = new Set([
  "natural-reference-lowvram",
  "natural-rife48-lowvram",
  "forced-motion-24-lowvram",
  "flf2v-morph-lowvram",
  "chained-single-prompt-lowvram",
]);
const OFF_DISTRIBUTION_PRESET_IDS = new Set(["svi-canonical-704", "svi-canonical-640"]);
const REQUIRES_LAST_IMAGE = new Set(["flf2v-morph-lowvram"]);

function stitchedFrames(params: Partial<RenderParams>): number | null {
  const fpc = params.frames_per_clip;
  const clips = params.num_clips;
  const overlap = params.num_overlap_frame ?? 4;
  if (!fpc || !clips) return null;
  return fpc + (clips - 1) * (fpc - overlap);
}

export function presetBadges(preset: PresetSummary): PresetBadges {
  const p = preset.params;
  const width = p.width ?? 480;
  const height = p.height ?? 832;
  const resolution = `${width}×${height}`;

  const frames = stitchedFrames(p);
  const playbackFps = p.interpolate_fps && p.interpolate_fps > 0 ? p.fps : p.fps;
  let duration = "—";
  if (frames !== null && playbackFps) {
    duration = `${(frames / playbackFps).toFixed(1)}s`;
  }

  const isLowVram = LOW_VRAM_PRESET_IDS.has(preset.id);
  const swap = p.blocks_to_swap ?? 0;
  const vram = swap >= 40 ? "~10–11 GiB (16 GB)" : swap > 0 ? "mid-VRAM" : "~26 GiB (high-VRAM)";

  return {
    resolution,
    duration,
    vram,
    isLowVram,
    isOffDistribution: OFF_DISTRIBUTION_PRESET_IDS.has(preset.id),
    requiresLastImage: REQUIRES_LAST_IMAGE.has(preset.id),
  };
}

export function sortPresets(presets: PresetSummary[]): PresetSummary[] {
  return [...presets].sort((a, b) => {
    if (a.id === CANONICAL_PRESET_ID) return -1;
    if (b.id === CANONICAL_PRESET_ID) return 1;
    return 0;
  });
}
