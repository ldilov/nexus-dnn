import type { GenerateParams } from "../services/types";

/** The per-stage guidance/CFG params. Every key is OPTIONAL on GenerateParams
 * and opt-in: an unset field inherits the model's baked default for its stage,
 * so the form must only emit a key when the user actually fills it. */
export type GuidanceKey =
  | "sparse_guidance_strength"
  | "sparse_guidance_rescale"
  | "sparse_rescale_t"
  | "sparse_guidance_interval_start"
  | "sparse_guidance_interval_end"
  | "shape_guidance_strength"
  | "shape_guidance_rescale"
  | "shape_rescale_t"
  | "shape_guidance_interval_start"
  | "shape_guidance_interval_end"
  | "texture_guidance_strength"
  | "texture_guidance_rescale"
  | "texture_rescale_t"
  | "texture_guidance_interval_start"
  | "texture_guidance_interval_end";

/** Raw text entered per guidance field; empty string ("") means unset. */
export type GuidanceDraft = Partial<Record<GuidanceKey, string>>;

export interface GuidanceFieldSpec {
  key: GuidanceKey;
  label: string;
  /** Placeholder hint showing the model's baked default for this stage. */
  placeholder: string;
  min: number;
  max: number;
  step: number;
  help: string;
}

export interface GuidanceStageSpec {
  id: "sparse" | "shape" | "texture";
  title: string;
  blurb: string;
  fields: readonly GuidanceFieldSpec[];
}

/** Build the five-field spec for one stage from its baked-default hints. The
 * interval start/end pair is split across two inputs but only takes effect when
 * BOTH are set (the worker ignores a lone bound). */
function stage(
  id: GuidanceStageSpec["id"],
  title: string,
  blurb: string,
  defaults: {
    strength: string;
    rescale: string;
    rescaleT: string;
    intervalStart: string;
    intervalEnd: string;
  },
): GuidanceStageSpec {
  return {
    id,
    title,
    blurb,
    fields: [
      {
        key: `${id}_guidance_strength` as GuidanceKey,
        label: "Strength",
        placeholder: defaults.strength,
        min: 0,
        max: 100,
        step: 0.1,
        help: "Classifier-free guidance scale. Higher pulls harder toward the prompt/image.",
      },
      {
        key: `${id}_guidance_rescale` as GuidanceKey,
        label: "Rescale",
        placeholder: defaults.rescale,
        min: 0,
        max: 1,
        step: 0.05,
        help: "CFG-rescale factor (0–1) that tames over-saturation from high strength.",
      },
      {
        key: `${id}_rescale_t` as GuidanceKey,
        label: "Rescale t",
        placeholder: defaults.rescaleT,
        min: 0,
        max: 10,
        step: 0.1,
        help: "Timestep above which rescale is applied.",
      },
      {
        key: `${id}_guidance_interval_start` as GuidanceKey,
        label: "Interval start",
        placeholder: defaults.intervalStart,
        min: 0,
        max: 1,
        step: 0.05,
        help: "Start of the guided window (0–1). Set both start and end to take effect.",
      },
      {
        key: `${id}_guidance_interval_end` as GuidanceKey,
        label: "Interval end",
        placeholder: defaults.intervalEnd,
        min: 0,
        max: 1,
        step: 0.05,
        help: "End of the guided window (0–1). Set both start and end to take effect.",
      },
    ],
  };
}

/** Three labeled stages, each with strength / rescale / rescale_t / interval
 * start+end. Placeholders carry the model's baked default per the brief. */
export const GUIDANCE_STAGES: readonly GuidanceStageSpec[] = [
  stage("sparse", "Sparse structure", "Coarse O-Voxel structure stage.", {
    strength: "7.5",
    rescale: "0.7",
    rescaleT: "5.0",
    intervalStart: "0.3",
    intervalEnd: "1.0",
  }),
  stage("shape", "Shape", "Mesh refinement stage.", {
    strength: "7.5",
    rescale: "0.5",
    rescaleT: "3.0",
    intervalStart: "0.3",
    intervalEnd: "1.0",
  }),
  stage("texture", "Texture", "Texture-bake stage (used only when Bake texture is on).", {
    strength: "1.0",
    rescale: "0.0",
    rescaleT: "3.0",
    intervalStart: "0.6",
    intervalEnd: "0.9",
  }),
] as const;

/** Every guidance key, in stage/field order. */
export const GUIDANCE_KEYS: readonly GuidanceKey[] = GUIDANCE_STAGES.flatMap(
  (stageSpec) => stageSpec.fields.map((field) => field.key),
);

const GUIDANCE_KEY_SET = new Set<GuidanceKey>(GUIDANCE_KEYS);

const INTERVAL_PAIRS: readonly (readonly [GuidanceKey, GuidanceKey])[] = [
  ["sparse_guidance_interval_start", "sparse_guidance_interval_end"],
  ["shape_guidance_interval_start", "shape_guidance_interval_end"],
  ["texture_guidance_interval_start", "texture_guidance_interval_end"],
];

function isInterval(key: GuidanceKey): boolean {
  return INTERVAL_PAIRS.some(([start, end]) => key === start || key === end);
}

/** Parse one raw guidance entry. Returns a finite number, or null when the
 * field is blank/whitespace/non-numeric (treated as unset → omitted). */
function parseEntry(raw: string | undefined): number | null {
  if (raw === undefined) return null;
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Turn the user's raw guidance draft into a sparse params patch. Only filled,
 * numeric fields are included; blank fields are omitted so the worker keeps its
 * baked default. An interval bound is dropped unless its sibling is also set,
 * because the worker ignores a lone bound.
 */
export function buildGuidancePatch(draft: GuidanceDraft): Partial<GenerateParams> {
  const patch: Partial<GenerateParams> = {};
  for (const key of GUIDANCE_KEYS) {
    if (isInterval(key)) continue;
    const value = parseEntry(draft[key]);
    if (value !== null) patch[key] = value;
  }
  for (const [start, end] of INTERVAL_PAIRS) {
    const startValue = parseEntry(draft[start]);
    const endValue = parseEntry(draft[end]);
    if (startValue !== null && endValue !== null) {
      patch[start] = startValue;
      patch[end] = endValue;
    }
  }
  return patch;
}

/** Type guard narrowing an arbitrary string to a known guidance key. */
export function isGuidanceKey(key: string): key is GuidanceKey {
  return GUIDANCE_KEY_SET.has(key as GuidanceKey);
}
