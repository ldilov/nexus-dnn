import type { RuntimeTuning } from "../../services/local_llm_chat";

export type SamplerPresetId = "chat" | "code" | "creative";

export interface SamplerPresetDefinition {
  readonly tuning: Partial<RuntimeTuning>;
  readonly topK: number | null;
  readonly temperature: number | null;
}

export const SAMPLER_PRESETS: Record<SamplerPresetId, SamplerPresetDefinition> = {
  chat: {
    tuning: {
      dry_multiplier: undefined,
      min_p: undefined,
    },
    topK: null,
    temperature: null,
  },
  code: {
    tuning: {
      dry_multiplier: undefined,
      min_p: 0.1,
    },
    topK: 40,
    temperature: 0.2,
  },
  creative: {
    tuning: {
      dry_multiplier: 0.8,
      dry_base: 1.75,
      dry_allowed_length: 2,
      min_p: 0.02,
    },
    topK: 40,
    temperature: 1.0,
  },
};

export interface SamplerPresetSnapshot {
  topK: number | null;
  temperature: number | null;
}

export function applyPreset(
  current: RuntimeTuning,
  presetId: SamplerPresetId,
): RuntimeTuning {
  const preset = SAMPLER_PRESETS[presetId];
  return { ...current, ...preset.tuning };
}

export function presetIsModified(
  current: RuntimeTuning,
  presetId: SamplerPresetId,
  sampler: SamplerPresetSnapshot,
): boolean {
  const preset = SAMPLER_PRESETS[presetId];
  for (const [key, expected] of Object.entries(preset.tuning) as [
    keyof RuntimeTuning,
    RuntimeTuning[keyof RuntimeTuning],
  ][]) {
    const actual = current[key];
    if (!sampleEquals(actual, expected)) return true;
  }
  if (preset.topK != null && sampler.topK !== preset.topK) return true;
  if (preset.temperature != null && sampler.temperature !== preset.temperature)
    return true;
  return false;
}

function sampleEquals(a: unknown, b: unknown): boolean {
  if (a == null && b == null) return true;
  return a === b;
}
