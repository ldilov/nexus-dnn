import type { FormControlDto } from "../../../api/generated/FormControlDto";
import * as s from "./recipe_form.css";

interface WidgetProps {
  control: FormControlDto;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function ControlWidget({ control, value, onChange }: WidgetProps) {
  const disabled = control.mode === "locked";
  const hint = control.schema_hint;

  if (hint?.enum_values && hint.enum_values.length > 0) {
    return (
      <select
        className={s.select}
        aria-label={control.label}
        disabled={disabled}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
      >
        {hint.enum_values.map((opt) => (
          <option key={String(opt)} value={String(opt)}>
            {String(opt)}
          </option>
        ))}
      </select>
    );
  }

  switch (control.kind) {
    case "bool":
      return (
        <input
          type="checkbox"
          className={s.checkbox}
          aria-label={control.label}
          disabled={disabled}
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
    case "int":
    case "float":
      return (
        <input
          type="number"
          className={s.input}
          aria-label={control.label}
          disabled={disabled}
          min={hint?.minimum ?? undefined}
          max={hint?.maximum ?? undefined}
          value={value === undefined || value === null ? "" : Number(value)}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
        />
      );
    case "asset":
      return (
        <input
          type="text"
          className={s.input}
          aria-label={control.label}
          disabled={disabled}
          placeholder="artifact id or path"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return (
        <textarea
          className={s.textarea}
          aria-label={control.label}
          disabled={disabled}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}
