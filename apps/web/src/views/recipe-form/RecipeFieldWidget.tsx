import type { ReactElement } from "react";
import type { Control } from "../../api/generated/Control";
import type { ControlHintDto } from "../../api/generated/ControlHintDto";
import * as styles from "./recipe_field_widget.css";

export interface RecipeFieldWidgetProps {
  control: Control;
  hint?: ControlHintDto;
  value: unknown;
  onChange: (v: unknown) => void;
}

/**
 * Renders a single recipe control as the appropriate HTML widget.
 * Generic by control_id — no extension-id assumptions.
 * hidden → nothing; locked → widget disabled (read-only); preset_selector → nothing.
 */
export function RecipeFieldWidget({
  control,
  hint,
  value,
  onChange,
}: RecipeFieldWidgetProps): ReactElement | null {
  const { kind, mode, label, control_id } = control;

  if (mode === "hidden") return null;
  if (kind === "preset_selector") return null;

  const disabled = mode === "locked";

  const id = `recipe-field-${control_id}`;

  if (kind === "bool") {
    return (
      <div className={styles.root}>
        <div className={styles.checkboxRow}>
          <input
            id={id}
            type="checkbox"
            className={styles.checkbox}
            checked={value === true}
            disabled={disabled}
            aria-label={label}
            onChange={(e) => onChange(e.target.checked)}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      </div>
    );
  }

  if (kind === "int" || kind === "float") {
    return (
      <div className={styles.root}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type="number"
          className={styles.input}
          value={value as number}
          disabled={disabled}
          min={hint?.min ?? undefined}
          max={hint?.max ?? undefined}
          step={hint?.step ?? (kind === "float" ? "any" : 1)}
          onChange={(e) => onChange(kind === "float" ? parseFloat(e.target.value) : parseInt(e.target.value, 10))}
        />
      </div>
    );
  }

  if (kind === "enum") {
    const options = (hint?.enum_values as string[] | null | undefined) ?? [];
    return (
      <div className={styles.root}>
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          className={styles.select}
          value={value as string}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={String(opt)} value={String(opt)}>
              {String(opt)}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (kind === "asset") {
    return (
      <div className={styles.root}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type="file"
          className={styles.assetPicker}
          disabled={disabled}
          data-testid="asset-picker"
          aria-label={label}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        />
      </div>
    );
  }

  // Fallback: string
  return (
    <div className={styles.root}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        className={styles.input}
        value={value as string}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
