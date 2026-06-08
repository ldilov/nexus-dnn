import { type ReactElement, useId } from "react";
import type { FieldSpec } from "../../domain/fields";
import type { RenderParams } from "../../services/types";
import * as styles from "./field_control.css";

interface FieldControlProps {
  spec: FieldSpec;
  value: RenderParams[keyof RenderParams];
  error?: string | undefined;
  onChange: (value: number | boolean | string) => void;
}

export function FieldControl({ spec, value, error, onChange }: FieldControlProps): ReactElement {
  const id = useId();
  const helpId = `${id}-help`;
  const describedBy = error ? `${id}-error` : helpId;

  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={id}>
          {spec.label}
        </label>
        {spec.control === "slider" && (
          <span className={styles.valueReadout}>{formatNumber(value)}</span>
        )}
      </div>
      {renderControl(spec, value, onChange, id, describedBy, error !== undefined)}
      <span id={helpId} className={styles.help}>
        {spec.help}
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
          className={styles.selectInput}
          value={String(value ?? spec.default ?? "")}
          onChange={(e) => onChange(e.target.value)}
        >
          {spec.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    case "slider":
      return (
        <input
          id={id}
          type="range"
          aria-describedby={describedBy}
          className={styles.slider}
          min={spec.min}
          max={spec.max}
          step={spec.step}
          value={toNumber(value, spec)}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      );
    default:
      return (
        <input
          id={id}
          type="number"
          inputMode="numeric"
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
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

function formatNumber(value: unknown): string {
  if (typeof value !== "number") return "—";
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}
