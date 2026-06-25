import type { GenerateParams } from "../services/types";

export type FieldControlKind = "number" | "slider" | "select" | "toggle";

/** Operator inputs surfaced as generic FieldControls. The image (dropzone) is
 * top-level, not a param; `texture` gets a dedicated toggle — both excluded. */
export type TunableFieldKey = Exclude<keyof GenerateParams, "texture">;

export interface FieldOption {
  value: string;
  label: string;
}

/** Declarative spec for a tunable operator field, rendered by FieldControl. */
export interface FieldSpec {
  key: TunableFieldKey;
  label: string;
  help: string;
  control: FieldControlKind;
  min?: number;
  max?: number;
  step?: number;
  numeric?: boolean;
  options?: FieldOption[];
  default?: number | boolean | string;
  /** When true, the field belongs in the collapsible Advanced / Quality section. */
  advanced?: boolean;
  /** When set, the control is active only while another field's value is in this
   * set; otherwise it renders disabled because its value is inert for the current
   * pipeline (e.g. max_num_tokens only bites in the 1536 cascade). */
  gate?: { key: TunableFieldKey; in: readonly string[] };
}

/** The advanced generation knobs (image upload + texture are rendered as
 * dedicated controls; these are the numeric / select tunables). Fields flagged
 * `advanced` render in the collapsible Advanced / Quality section. */
export const FIELD_SPECS: readonly FieldSpec[] = [
  {
    key: "seed",
    label: "Seed",
    help: "Deterministic seed. 0 draws a fresh random structure each run.",
    control: "number",
    min: 0,
    max: 2_147_483_647,
    step: 1,
    default: 0,
  },
  {
    key: "sparse_steps",
    label: "Sparse steps",
    help: "O-Voxel sparse-structure flow steps. More steps sharpen coarse shape.",
    control: "slider",
    min: 4,
    max: 50,
    step: 1,
    default: 12,
  },
  {
    key: "pipeline_type",
    label: "Detail preset",
    help: "512 is fastest and lowest detail; 1536 cascade is the highest detail (more VRAM and time).",
    control: "select",
    default: "1024_cascade",
    advanced: true,
    options: [
      { value: "512", label: "512 — fastest" },
      { value: "1024", label: "1024" },
      { value: "1024_cascade", label: "1024 cascade" },
      { value: "1536_cascade", label: "1536 cascade — highest" },
    ],
  },
  {
    key: "shape_steps",
    label: "Shape steps",
    help: "Mesh refinement flow steps. More steps add surface detail; past ~25 the gain is negligible.",
    control: "slider",
    min: 4,
    max: 50,
    step: 1,
    default: 12,
    advanced: true,
  },
  {
    key: "texture_steps",
    label: "Texture steps",
    help: "Texture-bake flow steps. Only used when Bake texture is on; past ~25 the gain is negligible.",
    control: "slider",
    min: 1,
    max: 100,
    step: 1,
    default: 12,
    advanced: true,
  },
  {
    key: "texture_size",
    label: "Texture resolution",
    help: "Baked texture size in pixels. 4096 is sharper but larger file and more VRAM.",
    control: "select",
    numeric: true,
    default: 2048,
    advanced: true,
    options: [
      { value: "1024", label: "1024" },
      { value: "2048", label: "2048" },
      { value: "4096", label: "4096" },
      { value: "8192", label: "8192" },
    ],
  },
  {
    key: "metallic",
    label: "Metallic",
    help: "0 = matte/dielectric (default); raise for metal subjects. TRELLIS bakes a spurious full-metalness, so 0 makes the baked color render correctly.",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0,
    advanced: true,
  },
  {
    key: "max_num_tokens",
    label: "Max tokens",
    help: "Voxel-token cap on the high-res shape stage — only affects the 1536 cascade. Lower forces a smaller effective resolution; 0 = uncapped (full resolution).",
    control: "number",
    min: 0,
    max: 131_072,
    step: 4_096,
    default: 49_152,
    advanced: true,
    gate: { key: "pipeline_type", in: ["1536_cascade"] },
  },
  {
    key: "simplify_target",
    label: "Triangle budget",
    help: "Decimation target (faces). ~50K game-ready · ~500K balanced · 1M+ archival. Lower exports lighter meshes.",
    control: "number",
    min: 1_000,
    max: 5_000_000,
    step: 1_000,
    default: 1_000_000,
    advanced: true,
  },
  {
    key: "residency",
    label: "Residency",
    help: "Balanced keeps weights resident; Low VRAM offloads between stages.",
    control: "select",
    default: "balanced",
    advanced: true,
    options: [
      { value: "balanced", label: "Balanced" },
      { value: "low_vram", label: "Low VRAM" },
    ],
  },
] as const;

/** Primary fields render above the fold; advanced ones in the collapsible. */
export const PRIMARY_FIELDS: readonly FieldSpec[] = FIELD_SPECS.filter(
  (spec) => !spec.advanced,
);

export const ADVANCED_FIELDS: readonly FieldSpec[] = FIELD_SPECS.filter(
  (spec) => spec.advanced,
);

/** A gated field is active only while its gate key holds an allowed value;
 * ungated fields are always active. Drives the disabled state in the form. */
export function isFieldActive(
  spec: FieldSpec,
  params: Partial<Record<TunableFieldKey, unknown>>,
): boolean {
  if (!spec.gate) return true;
  return spec.gate.in.includes(String(params[spec.gate.key]));
}
