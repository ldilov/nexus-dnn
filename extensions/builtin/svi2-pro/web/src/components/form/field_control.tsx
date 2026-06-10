import { type CSSProperties, type ReactElement, useId } from "react";
import type { FieldSpec } from "../../domain/fields";
import type { RenderParams } from "../../services/types";
import * as styles from "./field_control.css";

interface FieldControlProps {
  spec: FieldSpec;
  value: RenderParams[keyof RenderParams];
  error?: string | undefined;
  onChange: (value: number | boolean | string) => void;
  disabled?: boolean;
  disabledReason?: string | undefined;
}

export function FieldControl({
  spec,
  value,
  error,
  onChange,
  disabled = false,
  disabledReason,
}: FieldControlProps): ReactElement {
  const id = useId();
  const helpId = `${id}-help`;
  const describedBy = error ? `${id}-error` : helpId;

  return (
    <div className={styles.field} title={disabled ? disabledReason : undefined}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>
          {spec.label}
        </label>
        {spec.control === "slider" && (
          <span className={styles.valueReadout}>{formatNumber(value, spec.step)}</span>
        )}
      </div>
      {renderControl(spec, value, onChange, id, describedBy, error !== undefined, disabled)}
      <span id={helpId} className={styles.help}>
        {disabled && disabledReason ? disabledReason : spec.help}
      </span>
      {error && (
        <span id={`${id}-error`} role="alert" className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
}

function renderControl(
  spec: FieldSpec,
  value: RenderParams[keyof RenderParams],
  onChange: (value: number | boolean | string) => void,
  id: string,
  describedBy: string,
  invalid: boolean,
  disabled: boolean,
): ReactElement {
  switch (spec.control) {
    case "toggle": {
      const checked = Boolean(value);
      return (
        <div className={styles.toggleRow}>
          <button
            type="button"
            id={id}
            role="switch"
            aria-checked={checked}
            aria-describedby={describedBy}
            disabled={disabled}
            className={styles.toggle}
            onClick={() => onChange(!checked)}
          >
            <span className={styles.toggleThumb} aria-hidden="true" />
          </button>
          <span className={styles.help}>{checked ? "On" : "Off"}</span>
        </div>
      );
    }
    case "select":
      return (
        <select
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          className={[styles.selectInput, invalid ? styles.invalidInput : ""]
            .filter(Boolean)
            .join(" ")}
          value={String(value ?? spec.default ?? "")}
          onChange={(e) => onChange(spec.numeric ? Number(e.target.value) : e.target.value)}
        >
          {spec.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    case "slider": {
      const current = toNumber(value, spec);
      const min = spec.min ?? 0;
      const max = spec.max ?? 100;
      const pct = max > min ? ((current - min) / (max - min)) * 100 : 0;
      const fillStyle = { "--svi2-slider-fill": `${pct}%` } as CSSProperties;
      return (
        <input
          id={id}
          type="range"
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          className={styles.slider}
          style={fillStyle}
          min={spec.min}
          max={spec.max}
          step={spec.step}
          value={current}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    }
    default:
      return (
        <input
          id={id}
          type="number"
          inputMode="numeric"
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          className={[styles.numberInput, invalid ? styles.invalidInput : ""]
            .filter(Boolean)
            .join(" ")}
          min={spec.min}
          max={spec.max}
          step={spec.step}
          value={toNumber(value, spec)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
  }
}

function toNumber(value: unknown, spec: FieldSpec): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof spec.default === "number") return spec.default;
  return spec.min ?? 0;
}

function formatNumber(value: unknown, step?: number): string {
  if (typeof value !== "number") return "—";
  if (step === undefined || step >= 1) {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
  }
  return value.toFixed(step >= 0.1 ? 1 : 2);
}
