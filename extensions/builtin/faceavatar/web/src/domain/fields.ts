import type { GenerateParams } from "../services/types";

export type FieldControlKind = "number" | "slider" | "select" | "toggle";

/** Operator inputs surfaced as generic FieldControls. The photo (dropzone) is
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
  advanced?: boolean;
  gate?: { key: TunableFieldKey; in: readonly string[] };
}

export const FIELD_SPECS: readonly FieldSpec[] = [
  {
    key: "seed",
    label: "Seed",
    help: "Deterministic seed. 0 draws a fresh fit each run.",
    control: "number",
    min: 0,
    max: 2_147_483_647,
    step: 1,
    default: 0,
  },
  {
    key: "expression",
    label: "Expression",
    help: "Neutral resets the FLAME expression; Source copies the photo's expression.",
    control: "select",
    default: "neutral",
    options: [
      { value: "neutral", label: "Neutral" },
      { value: "source", label: "From photo" },
    ],
  },
  {
    key: "crop",
    label: "Crop",
    help: "Bust includes the neck/shoulders; Head is tighter to the face.",
    control: "select",
    default: "bust",
    options: [
      { value: "bust", label: "Bust" },
      { value: "head", label: "Head only" },
    ],
  },
  {
    key: "arc_iters",
    label: "Identity iters",
    help: "Arc2Avatar per-photo optimization steps. More = sharper identity, slower.",
    control: "slider",
    min: 100,
    max: 1_500,
    step: 50,
    default: 600,
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
 * ungated fields are always active. */
export function isFieldActive(
  spec: FieldSpec,
  params: Partial<Record<TunableFieldKey, unknown>>,
): boolean {
  if (!spec.gate) return true;
  return spec.gate.in.includes(String(params[spec.gate.key]));
}
