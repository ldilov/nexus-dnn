import { useState, type ReactNode } from "react";
import { inputRecipe } from "../input.css";
import * as styles from "./layout_styles.css";

type FieldDef = {
  key: string;
  label: string;
  type: "text" | "number" | "slider" | "select" | "toggle" | "textarea";
  default?: unknown;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string }[];
  placeholder?: string;
};

type LayoutFormProps = {
  fields?: FieldDef[];
  values?: Record<string, unknown>;
  children?: ReactNode;
};

function getInitialValues(fields: FieldDef[], provided: Record<string, unknown>): Record<string, unknown> {
  const values: Record<string, unknown> = { ...provided };
  for (const field of fields) {
    if (values[field.key] === undefined && field.default !== undefined) {
      values[field.key] = field.default;
    }
  }
  return values;
}

export function LayoutForm({ fields = [], values: providedValues = {}, children }: LayoutFormProps) {
  const [values, setValues] = useState(() => getInitialValues(fields, providedValues));

  const updateValue = (key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.form}>
      {fields.map((field) => {
        const val = values[field.key];

        if (field.type === "slider") {
          return (
            <div key={field.key} className={styles.formField}>
              <label className={styles.formLabel}>{field.label}</label>
              <div className={styles.formSliderRow}>
                <input
                  type="range"
                  className={styles.formSlider}
                  min={field.min ?? 0}
                  max={field.max ?? 100}
                  step={field.step ?? 1}
                  value={Number(val ?? field.min ?? 0)}
                  onChange={(e) => updateValue(field.key, Number(e.target.value))}
                />
                <span className={styles.formSliderValue}>
                  {Number(val ?? field.min ?? 0).toFixed(field.step && field.step < 1 ? 1 : 0)}
                </span>
              </div>
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.key} className={styles.formField}>
              <label className={styles.formLabel}>{field.label}</label>
              <select
                className={styles.formSelect}
                value={String(val ?? "")}
                onChange={(e) => updateValue(field.key, e.target.value)}
              >
                {(field.options ?? []).map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "toggle") {
          const isActive = Boolean(val);
          const toggleCls = isActive
            ? `${styles.formToggle} ${styles.formToggleActive}`
            : styles.formToggle;
          const knobCls = isActive
            ? `${styles.formToggleKnob} ${styles.formToggleKnobActive}`
            : styles.formToggleKnob;
          return (
            <div key={field.key} className={styles.formField}>
              <div className={styles.formToggleRow}>
                <label className={styles.formLabel}>{field.label}</label>
                <button
                  type="button"
                  className={toggleCls}
                  onClick={() => updateValue(field.key, !isActive)}
                  aria-pressed={isActive}
                >
                  <span className={knobCls} />
                </button>
              </div>
            </div>
          );
        }

        if (field.type === "textarea") {
          return (
            <div key={field.key} className={styles.formField}>
              <label className={styles.formLabel}>{field.label}</label>
              <textarea
                className={styles.formTextarea}
                value={String(val ?? "")}
                onChange={(e) => updateValue(field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            </div>
          );
        }

        if (field.type === "number") {
          return (
            <div key={field.key} className={styles.formField}>
              <label className={styles.formLabel}>{field.label}</label>
              <input
                type="number"
                className={inputRecipe({ variant: "default", size: "md" })}
                value={String(val ?? "")}
                min={field.min}
                max={field.max}
                step={field.step}
                onChange={(e) => updateValue(field.key, Number(e.target.value))}
              />
            </div>
          );
        }

        return (
          <div key={field.key} className={styles.formField}>
            <label className={styles.formLabel}>{field.label}</label>
            <input
              type="text"
              className={inputRecipe({ variant: "default", size: "md" })}
              value={String(val ?? "")}
              placeholder={field.placeholder}
              onChange={(e) => updateValue(field.key, e.target.value)}
            />
          </div>
        );
      })}
      {children}
    </div>
  );
}
