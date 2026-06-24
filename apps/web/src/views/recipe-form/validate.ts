import type { ControlHintDto } from "../../api/generated/ControlHintDto";
import type { RecipeProjection } from "../../api/generated/RecipeProjection";

/**
 * Client-side surface validation for recipe control values.
 * Mirrors the P2 compiler's surface rules for fast feedback.
 * The server remains authoritative — this is best-effort UX only.
 */
export function validateControls(
  projection: RecipeProjection,
  hints: ControlHintDto[],
  values: Record<string, unknown>,
): { errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const hintMap = new Map<string, ControlHintDto>();
  for (const h of hints) {
    hintMap.set(h.control_id, h);
  }

  for (const control of projection.controls) {
    const { control_id, kind, mode } = control;
    const hint = hintMap.get(control_id);
    const value = values[control_id];
    const hasValue = value !== undefined && value !== null && value !== "";

    // Locked/hidden controls must not carry user-supplied values.
    if (mode === "locked" || mode === "hidden") {
      if (hasValue) {
        errors[control_id] = `"${control_id}" is ${mode} and may not be set by the user.`;
      }
      continue;
    }

    // Required check.
    if (hint?.required === true && !hasValue) {
      errors[control_id] = `"${control.label}" is required.`;
      continue;
    }

    if (!hasValue) continue;

    // Enum membership check.
    if (kind === "enum" && hint?.enum_values) {
      const allowed = hint.enum_values.map(String);
      if (!allowed.includes(String(value))) {
        errors[control_id] = `"${String(value)}" is not a valid option for "${control.label}".`;
      }
      continue;
    }

    // Numeric range check.
    if ((kind === "int" || kind === "float") && typeof value === "number") {
      if (hint?.min !== null && hint?.min !== undefined && value < hint.min) {
        errors[control_id] = `"${control.label}" must be at least ${hint.min}.`;
        continue;
      }
      if (hint?.max !== null && hint?.max !== undefined && value > hint.max) {
        errors[control_id] = `"${control.label}" must be at most ${hint.max}.`;
        continue;
      }
    }
  }

  return { errors };
}
