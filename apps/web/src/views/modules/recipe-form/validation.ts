import type { FormControlDto } from "../../../api/generated/FormControlDto";

export interface ValidationResult {
  ok: boolean;
  errors: Record<string, string>;
}

/**
 * Mirror the host compiler's user-input rules client-side: locked controls are
 * never editable, numeric values respect schema min/max, and enum values must be
 * in range. The server re-validates — this is fast feedback, not the gate.
 */
export function validateControlValues(
  controls: FormControlDto[],
  values: Record<string, unknown>,
): ValidationResult {
  const errors: Record<string, string> = {};
  const byId = new Map(controls.map((c) => [c.control_id, c]));
  for (const [id, value] of Object.entries(values)) {
    const control = byId.get(id);
    if (!control) {
      errors[id] = "unknown control";
      continue;
    }
    if (control.mode === "locked") {
      errors[id] = "this value is locked by the recipe";
      continue;
    }
    const hint = control.schema_hint;
    if (hint && typeof value === "number") {
      if (hint.minimum != null && value < hint.minimum) errors[id] = `min ${hint.minimum}`;
      if (hint.maximum != null && value > hint.maximum) errors[id] = `max ${hint.maximum}`;
    }
    if (hint?.enum_values && !hint.enum_values.some((e) => e === value)) {
      errors[id] = "not an allowed value";
    }
  }
  return { ok: Object.keys(errors).length === 0, errors };
}
