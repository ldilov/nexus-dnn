import type { RenderParams } from "../services/types";

export const LENGTH_OPTIONS_SECONDS = [10, 20, 30, 60, 120] as const;
export const DEFAULT_LENGTH_SECONDS = 30;
export const CUSTOM_LENGTH = "custom" as const;
export const NATIVE_FRAMES_PER_CLIP = 85;

export type LengthSelection = number | typeof CUSTOM_LENGTH;

export interface SegmentDefaults {
  framesPerClip: number;
  fps: number;
  overlap: number;
}

const FALLBACK: SegmentDefaults = { framesPerClip: NATIVE_FRAMES_PER_CLIP, fps: 16, overlap: 5 };

export interface LengthPlan {
  numClips: number;
  framesPerClip: number;
}

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

export function deriveLengthPlan(durationSeconds: number, defaults: SegmentDefaults): LengthPlan {
  const { fps, overlap } = defaults;
  if (fps <= 0) return { numClips: 1, framesPerClip: NATIVE_FRAMES_PER_CLIP };
  const targetFrames = Math.round(durationSeconds * fps);
  if (targetFrames <= FLF2V_MAX_FRAMES) {
    return { numClips: 1, framesPerClip: snapToValidFrames(targetFrames) };
  }
  const stride = NATIVE_FRAMES_PER_CLIP - overlap;
  if (stride <= 0) return { numClips: 1, framesPerClip: NATIVE_FRAMES_PER_CLIP };
  const numClips = Math.max(2, Math.round((targetFrames - NATIVE_FRAMES_PER_CLIP) / stride) + 1);
  return { numClips, framesPerClip: NATIVE_FRAMES_PER_CLIP };
}

export const FLF2V_MIN_FRAMES = 5;
export const FLF2V_MAX_FRAMES = 129;
export const FLF2V_PRESET_SECONDS = [2, 3, 4, 5, 6, 8] as const;

export function snapToValidFrames(frames: number): number {
  const snapped = Math.round((frames - 1) / 4) * 4 + 1;
  return Math.min(FLF2V_MAX_FRAMES, Math.max(FLF2V_MIN_FRAMES, snapped));
}

export function flf2vFramesForSeconds(seconds: number, fps: number): number {
  return snapToValidFrames(seconds * fps);
}

export function flf2vMaxSeconds(fps: number): number {
  if (fps <= 0) return 0;
  return Math.floor(FLF2V_MAX_FRAMES / fps);
}

export function flf2vSeconds(params: Partial<RenderParams>): number {
  const { framesPerClip, fps } = segmentDefaults(params);
  if (fps <= 0) return 0;
  return framesPerClip / fps;
}

export function flf2vSummary(params: Partial<RenderParams>): string {
  const { framesPerClip, fps } = segmentDefaults(params);
  const base = `1 × ${framesPerClip} frames @ ${fps} fps → ${flf2vSeconds(params).toFixed(1)}s morph`;
  const interp = params.interpolate_fps ?? 0;
  return interp > 0 ? `${base} (RIFE → ${interp} fps)` : base;
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
