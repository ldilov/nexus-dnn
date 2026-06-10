import type { RenderParams } from "../services/types";

export const LENGTH_OPTIONS_SECONDS = [10, 20, 30, 60, 120] as const;
export const DEFAULT_LENGTH_SECONDS = 30;
export const CUSTOM_LENGTH = "custom" as const;

export type LengthSelection = number | typeof CUSTOM_LENGTH;

export interface SegmentDefaults {
  framesPerClip: number;
  fps: number;
  overlap: number;
}

const FALLBACK: SegmentDefaults = { framesPerClip: 85, fps: 16, overlap: 5 };

export function segmentDefaults(params: Partial<RenderParams>): SegmentDefaults {
  return {
    framesPerClip: params.frames_per_clip ?? FALLBACK.framesPerClip,
    fps: params.fps ?? FALLBACK.fps,
    overlap: params.num_overlap_frame ?? FALLBACK.overlap,
  };
}

export function stitchedFrames(numClips: number, defaults: SegmentDefaults): number {
  const { framesPerClip, overlap } = defaults;
  return framesPerClip + (numClips - 1) * (framesPerClip - overlap);
}

export function actualSeconds(numClips: number, defaults: SegmentDefaults): number {
  if (defaults.fps <= 0) return 0;
  return stitchedFrames(numClips, defaults) / defaults.fps;
}

export function deriveNumClips(durationSeconds: number, defaults: SegmentDefaults): number {
  const { framesPerClip, fps, overlap } = defaults;
  const stride = framesPerClip - overlap;
  if (stride <= 0 || fps <= 0) return 1;
  const targetFrames = durationSeconds * fps;
  return Math.max(1, Math.ceil((targetFrames - framesPerClip) / stride) + 1);
}

export function matchLengthOption(
  numClips: number,
  defaults: SegmentDefaults,
): LengthSelection {
  for (const seconds of LENGTH_OPTIONS_SECONDS) {
    if (deriveNumClips(seconds, defaults) === numClips) return seconds;
  }
  return CUSTOM_LENGTH;
}

export function lengthSummary(params: Partial<RenderParams>): string {
  const defaults = segmentDefaults(params);
  const numClips = params.num_clips ?? 1;
  const seconds = actualSeconds(numClips, defaults);
  const base = `${numClips} × ${defaults.framesPerClip} frames @ ${defaults.fps} fps → ${seconds.toFixed(1)}s native`;
  const interp = params.interpolate_fps ?? 0;
  return interp > 0 ? `${base} (RIFE → ${interp} fps)` : base;
}
