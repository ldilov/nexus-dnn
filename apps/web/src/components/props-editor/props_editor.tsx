import { useMemo } from "react";
import type { ComponentMetadata } from "../../services/ui_catalog";
import {
  extractDefaults,
  schemaToWidgets,
  type FieldDescriptor,
} from "./schema_to_widgets";
import { FieldWidget } from "./widgets";
import * as styles from "./props_editor.css";

export interface PropsEditorProps {
  metadata: ComponentMetadata;
  values: Record<string, unknown>;
  errors: Record<string, string>;
  onChange: (next: Record<string, unknown>) => void;
}

export function PropsEditor({
  metadata,
  values,
  errors,
  onChange,
}: PropsEditorProps) {
  const descriptors = useMemo(
    () => schemaToWidgets(metadata.props_schema.schema),
    [metadata.props_schema.schema],
  );

  if (descriptors.length === 0) {
    return (
      <div className={styles.emptyState}>
        This component takes no configurable props.
      </div>
    );
  }

  return (
    <form
      className={styles.root}
      onSubmit={(e) => e.preventDefault()}
      aria-label={`Props editor for ${metadata.name}`}
    >
      {descriptors.map((descriptor) => (
        <FieldWidget
          key={descriptor.name}
          descriptor={descriptor}
          value={values[descriptor.name]}
          error={errors[descriptor.name] ?? null}
          onChange={(next) => {
            const updated = { ...values };
            if (next === undefined) {
              delete updated[descriptor.name];
            } else {
              updated[descriptor.name] = next;
            }
            onChange(updated);
          }}
        />
      ))}
    </form>
  );
}

export function validateValues(
  descriptors: FieldDescriptor[],
  values: Record<string, unknown>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const d of descriptors) {
    const v = values[d.name];
    if (d.required && (v === undefined || v === "" || v === null)) {
      errors[d.name] = `Required`;
      continue;
    }
    if (v === undefined) continue;
    if (d.kind === "string" && typeof v !== "string") {
      errors[d.name] = `Expected a string`;
    }
    if (d.kind === "number" && typeof v !== "number") {
      errors[d.name] = `Expected a number`;
    }
    if (d.kind === "boolean" && typeof v !== "boolean") {
      errors[d.name] = `Expected true or false`;
    }
    if (d.kind === "enum") {
      if (typeof v !== "string" || !(d.enumValues ?? []).includes(v)) {
        errors[d.name] = `Must be one of ${(d.enumValues ?? []).join(", ")}`;
      }
    }
    if (d.kind === "number" && typeof v === "number") {
      if (d.min !== null && v < d.min) errors[d.name] = `Must be ≥ ${d.min}`;
      if (d.max !== null && v > d.max) errors[d.name] = `Must be ≤ ${d.max}`;
    }
    if (d.kind === "string" && typeof v === "string") {
      if (d.min !== null && v.length < d.min)
        errors[d.name] = `Must be at least ${d.min} chars`;
      if (d.max !== null && v.length > d.max)
        errors[d.name] = `Must be at most ${d.max} chars`;
    }
  }
  return errors;
}

export { extractDefaults, schemaToWidgets };
export type { FieldDescriptor };
