import type { RenderParams } from "../services/types";

// Wan2.2 latent geometry: the VAE downsamples space by 8× and the DiT patchifies
// 2×2, so any frame edge must land on a 16px macro-block. Every compatible
// resolution is therefore a multiple of 16 — the same rule validation enforces.
export const WAN_ALIGN = 16;

// Keep custom edits inside a sane video envelope. The upper bound is wide enough
// for a portrait 720×1920 (and its 1920×720 mirror); the lower bound stays above
// the smallest preset step (640×368) so the form can't collapse to a thumbnail.
export const MIN_DIM = 128;
export const MAX_DIM = 1920;

// The SVI 2.0 Pro LoRA is trained at the 480p landscape budget (832×480). We use
// it as the reference pixel count so the form can report how far a custom canvas
// drifts from the trained budget, regardless of its aspect ratio.
export const NATIVE_BUDGET = 832 * 480;

export interface Dimensions {
  width: number;
  height: number;
}

// Seeded when the user opens the custom form from a preset: a Wan2.2-aligned
// 16:9 canvas one block above native (832×480), so Custom starts on-aspect.
export const DEFAULT_CUSTOM_RESOLUTION: Dimensions = { width: 848, height: 480 };

export interface AspectPreset {
  id: string;
  label: string;
  /** Aspect numerator (width units). */
  w: number;
  /** Aspect denominator (height units). */
  h: number;
}

// Landscape on the left, square in the middle, portrait on the right — the same
// reading order a user scans. 9:16 is the canonical reverse of the native 16:9.
export const ASPECT_PRESETS: AspectPreset[] = [
  { id: "16:9", label: "16:9", w: 16, h: 9 },
  { id: "3:2", label: "3:2", w: 3, h: 2 },
  { id: "4:3", label: "4:3", w: 4, h: 3 },
  { id: "1:1", label: "1:1", w: 1, h: 1 },
  { id: "3:4", label: "3:4", w: 3, h: 4 },
  { id: "9:16", label: "9:16", w: 9, h: 16 },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Snap an arbitrary edge length to the nearest Wan2.2-compatible multiple of 16. */
export function snapDim(value: number): number {
  if (!Number.isFinite(value)) return MIN_DIM;
  const snapped = Math.round(value / WAN_ALIGN) * WAN_ALIGN;
  return clamp(snapped, MIN_DIM, MAX_DIM);
}

/** Nudge an edge by one Wan2.2 step (±16px), staying aligned and in range. */
export function stepDim(value: number, direction: 1 | -1): number {
  const aligned = snapDim(value);
  return clamp(aligned + direction * WAN_ALIGN, MIN_DIM, MAX_DIM);
}

/** Format a free-typed canvas to the closest compatible resolution (e.g. 1280×720 stays, 833×481 → 832×480). */
export function snapDimensions(width: number, height: number): Dimensions {
  return { width: snapDim(width), height: snapDim(height) };
}

/** Reverse the aspect ratio by swapping edges — 832×480 ⇄ 480×832, exactly preserving the pixel count. */
export function swapDimensions(dims: Dimensions): Dimensions {
  return { width: dims.height, height: dims.width };
}

export function pixelCount(dims: Dimensions): number {
  return dims.width * dims.height;
}

export function aspectRatioValue(dims: Dimensions): number {
  return dims.height === 0 ? 0 : dims.width / dims.height;
}

/**
 * Solve for the Wan2.2-aligned canvas that holds `budget` pixels at the given
 * aspect ratio. This is what powers "same pixel count, different aspect ratio":
 * width·height stays near the source budget while the shape changes (16:9 → 9:16
 * etc.). Edges are snapped to 16, so the realised budget lands within a block of
 * the target rather than exactly on it.
 */
export function fitAspectToBudget(arW: number, arH: number, budget: number): Dimensions {
  if (arW <= 0 || arH <= 0 || budget <= 0) {
    return snapDimensions(MIN_DIM, MIN_DIM);
  }
  const ratio = arW / arH;
  const widthExact = Math.sqrt(budget * ratio);
  const heightExact = budget / widthExact;
  return snapDimensions(widthExact, heightExact);
}

/** The aspect preset whose ratio matches these dims (within rounding), or null for an off-ladder shape. */
export function matchAspectPreset(dims: Dimensions): string | null {
  const ratio = aspectRatioValue(dims);
  if (ratio <= 0) return null;
  let best: { id: string; delta: number } | null = null;
  for (const preset of ASPECT_PRESETS) {
    const delta = Math.abs(ratio - preset.w / preset.h);
    // 0.06 is wide enough to read the native 832×480 (1.733) as 16:9 while still
    // staying inside the half-gap between adjacent preset ratios (≥0.083).
    if (delta < 0.06 && (best === null || delta < best.delta)) {
      best = { id: preset.id, delta };
    }
  }
  return best?.id ?? null;
}

export type Orientation = "landscape" | "portrait" | "square";

export function orientationOf(dims: Dimensions): Orientation {
  if (dims.width === dims.height) return "square";
  return dims.width > dims.height ? "landscape" : "portrait";
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/** A friendly aspect label: a named preset when one fits, else a reduced w:h fraction. */
export function aspectLabel(dims: Dimensions): string {
  const matched = matchAspectPreset(dims);
  if (matched) return matched;
  const divisor = gcd(dims.width, dims.height) || 1;
  const w = dims.width / divisor;
  const h = dims.height / divisor;
  // Only show a clean fraction when it stays readable; otherwise fall back to a decimal.
  if (w <= 64 && h <= 64) return `${w}:${h}`;
  return `${aspectRatioValue(dims).toFixed(2)}:1`;
}

export interface ResolutionSummary {
  megapixels: string;
  aspect: string;
  orientation: Orientation;
  /** Pixel budget as a percentage of the trained 480p budget (100 = on budget). */
  budgetPct: number;
}

export function describeResolution(dims: Dimensions): ResolutionSummary {
  const px = pixelCount(dims);
  return {
    megapixels: (px / 1_000_000).toFixed(2),
    aspect: aspectLabel(dims),
    orientation: orientationOf(dims),
    budgetPct: Math.round((px / NATIVE_BUDGET) * 100),
  };
}

export function dimensionsFromParams(params: Partial<RenderParams>): Dimensions {
  return {
    width: params.width ?? 832,
    height: params.height ?? 480,
  };
}
