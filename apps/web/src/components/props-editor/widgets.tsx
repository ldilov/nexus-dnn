import { useId, type ChangeEvent } from "react";
import type { FieldDescriptor } from "./schema_to_widgets";
import * as styles from "./props_editor.css";

export interface WidgetProps {
  descriptor: FieldDescriptor;
  value: unknown;
  error: string | null;
  onChange: (next: unknown) => void;
}

export function FieldWidget(props: WidgetProps) {
  const { descriptor } = props;
  switch (descriptor.kind) {
    case "string":
      return <StringWidget {...props} />;
    case "number":
      return <NumberWidget {...props} />;
    case "boolean":
      return <BooleanWidget {...props} />;
    case "enum":
      return <EnumWidget {...props} />;
    default:
      return <RawWidget {...props} />;
  }
}

function FieldShell({
  descriptor,
  error,
  children,
  inputId,
}: {
  descriptor: FieldDescriptor;
  error: string | null;
  children: React.ReactNode;
  inputId: string;
}) {
  return (
    <div className={styles.field} data-field-name={descriptor.name}>
      <label className={styles.fieldLabel} htmlFor={inputId}>
        <span className={styles.fieldName}>{descriptor.name}</span>
        {descriptor.required ? (
          <span className={styles.fieldRequired} aria-label="required">
            •
          </span>
        ) : null}
      </label>
      {descriptor.description ? (
        <p className={styles.fieldDescription}>{descriptor.description}</p>
      ) : null}
      {children}
      {error ? (
        <p className={styles.fieldError} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function StringWidget({ descriptor, value, error, onChange }: WidgetProps) {
  const id = useId();
  return (
    <FieldShell descriptor={descriptor} error={error} inputId={id}>
      <input
        id={id}
        className={styles.inputText}
        type="text"
        value={typeof value === "string" ? value : ""}
        minLength={descriptor.min ?? undefined}
        maxLength={descriptor.max ?? undefined}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </FieldShell>
  );
}

function NumberWidget({ descriptor, value, error, onChange }: WidgetProps) {
  const id = useId();
  const current =
    typeof value === "number"
      ? String(value)
      : typeof value === "string"
      ? value
      : "";
  return (
    <FieldShell descriptor={descriptor} error={error} inputId={id}>
      <input
        id={id}
        className={styles.inputText}
        type="number"
        value={current}
        min={descriptor.min ?? undefined}
        max={descriptor.max ?? undefined}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const raw = e.target.value;
          if (raw === "") {
            onChange(undefined);
            return;
          }
          const parsed = Number(raw);
          onChange(Number.isNaN(parsed) ? raw : parsed);
        }}
      />
    </FieldShell>
  );
}

function BooleanWidget({ descriptor, value, error, onChange }: WidgetProps) {
  const id = useId();
  return (
    <FieldShell descriptor={descriptor} error={error} inputId={id}>
      <label className={styles.toggle}>
        <input
          id={id}
          type="checkbox"
          checked={value === true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        />
        <span>{value === true ? "true" : "false"}</span>
      </label>
    </FieldShell>
  );
}

function EnumWidget({ descriptor, value, error, onChange }: WidgetProps) {
  const id = useId();
  const options = descriptor.enumValues ?? [];
  const current = typeof value === "string" ? value : "";
  return (
    <FieldShell descriptor={descriptor} error={error} inputId={id}>
      <select
        id={id}
        className={styles.inputSelect}
        value={current}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function RawWidget({ descriptor, value, error, onChange }: WidgetProps) {
  const id = useId();
  const text = serializeRaw(value);
  return (
    <FieldShell descriptor={descriptor} error={error} inputId={id}>
      <textarea
        id={id}
        className={styles.inputTextarea}
        value={text}
        rows={4}
        spellCheck={false}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          const raw = e.target.value;
          if (raw.trim() === "") {
            onChange(undefined);
            return;
          }
          try {
            onChange(JSON.parse(raw));
          } catch {
            onChange(raw);
          }
        }}
      />
    </FieldShell>
  );
}

function serializeRaw(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
