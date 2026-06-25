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
}

/** The advanced generation knobs (image upload + texture are rendered as
 * dedicated controls; these are the numeric / select tunables). */
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
    key: "shape_steps",
    label: "Shape steps",
    help: "Mesh refinement flow steps. More steps add surface detail.",
    control: "slider",
    min: 4,
    max: 50,
    step: 1,
    default: 12,
  },
  {
    key: "simplify_target",
    label: "Triangle budget",
    help: "Decimation target. Lower budgets export lighter, game-ready meshes.",
    control: "number",
    min: 1_000,
    max: 5_000_000,
    step: 1_000,
    default: 1_000_000,
  },
  {
    key: "residency",
    label: "Residency",
    help: "Balanced keeps weights resident; Low VRAM offloads between stages.",
    control: "select",
    default: "balanced",
    options: [
      { value: "balanced", label: "Balanced" },
      { value: "low_vram", label: "Low VRAM" },
    ],
  },
] as const;
