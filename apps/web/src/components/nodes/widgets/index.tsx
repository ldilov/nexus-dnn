import { useState, type ChangeEvent } from "react";
import type { WidgetProps, WidgetSpec } from "./types";
import * as styles from "./widgets.css";

export { type WidgetKind, type WidgetSpec } from "./types";

function toNumber(raw: unknown, fallback = 0): number {
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function toString(raw: unknown, fallback = ""): string {
  if (raw === undefined || raw === null) return fallback;
  return typeof raw === "string" ? raw : String(raw);
}

function SliderWidget({ spec, value, editable, onChange }: WidgetProps) {
  if (spec.kind !== "slider") return null;
  const min = spec.min ?? 0;
  const max = spec.max ?? 1;
  const step = spec.step ?? 0.01;
  const current = toNumber(value, min);
  if (!editable) {
    return (
      <span className={styles.readOnlyValue}>
        {current}
        {spec.unit ?? ""}
      </span>
    );
  }
  return (
    <div className={styles.wrapper}>
      <input
        type="range"
        className={styles.slider}
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
      />
      <span className={styles.sliderValue}>
        {current}
        {spec.unit ?? ""}
      </span>
    </div>
  );
}

function NumberWidget({ spec, value, editable, onChange }: WidgetProps) {
  if (spec.kind !== "number") return null;
  const current = toNumber(value, 0);
  if (!editable) return <span className={styles.readOnlyValue}>{current}</span>;
  return (
    <input
      type="number"
      className={styles.input}
      min={spec.min}
      max={spec.max}
      step={spec.step}
      value={current}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
    />
  );
}

function ToggleWidget({ value, editable, onChange }: WidgetProps) {
  const on = value === true || value === "true";
  if (!editable) return <span className={styles.readOnlyValue}>{on ? "true" : "false"}</span>;
  const cls = `${styles.toggle} ${on ? styles.toggleOn : ""}`.trim();
  const knobCls = `${styles.toggleKnob} ${on ? styles.toggleKnobOn : ""}`.trim();
  return (
    <button
      type="button"
      className={cls}
      onClick={() => onChange(!on)}
      aria-pressed={on}
    >
      <span className={knobCls} />
    </button>
  );
}

function SelectWidget({ spec, value, editable, onChange }: WidgetProps) {
  if (spec.kind !== "select") return null;
  const current = toString(value);
  if (!editable) return <span className={styles.readOnlyValue}>{current}</span>;
  return (
    <select
      className={styles.select}
      value={current}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        const option = spec.options.find((o) => String(o.value) === e.target.value);
        onChange(option ? option.value : e.target.value);
      }}
    >
      {spec.options.map((o) => (
        <option key={String(o.value)} value={String(o.value)}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function TextWidget({ spec, value, editable, onChange }: WidgetProps) {
  if (spec.kind !== "text") return null;
  const current = toString(value);
  if (!editable) return <span className={styles.readOnlyValue}>{current}</span>;
  return (
    <input
      type="text"
      className={styles.input}
      placeholder={spec.placeholder}
      maxLength={spec.maxLength}
      value={current}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}

function TextareaWidget({ spec, value, editable, onChange }: WidgetProps) {
  if (spec.kind !== "textarea") return null;
  const [draft, setDraft] = useState<string>(toString(value));
  if (!editable) return <span className={styles.readOnlyValue}>{toString(value)}</span>;
  return (
    <textarea
      className={styles.textarea}
      rows={spec.rows ?? 3}
      placeholder={spec.placeholder}
      value={draft}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)}
      onBlur={() => {
        if (draft !== toString(value)) onChange(draft);
      }}
    />
  );
}

function CodeWidget({ spec, value, editable, onChange }: WidgetProps) {
  if (spec.kind !== "code") return null;
  const [draft, setDraft] = useState<string>(toString(value));
  if (!editable) {
    return <pre className={styles.readOnlyValue}>{toString(value)}</pre>;
  }
  return (
    <textarea
      className={styles.textarea}
      rows={5}
      value={draft}
      spellCheck={false}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDraft(e.target.value)}
      onBlur={() => {
        if (draft !== toString(value)) onChange(draft);
      }}
      data-language={spec.language ?? "text"}
    />
  );
}

function ColorWidget({ value, editable, onChange }: WidgetProps) {
  // audit-allow: hex — hex — neon decorative palette per design lang
  const current = toString(value, "#ba9eff");
  if (!editable) {
    return (
      <span
        className={styles.readOnlyValue}
        // audit-allow: px — px — node graph layout primitive (xy-flow contract)
        style={{ background: current, width: "28px", height: "14px", borderRadius: "3px" }}
      />
    );
  }
  return (
    <input
      type="color"
      value={current}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}

function FileWidget({ value, editable }: WidgetProps) {
  const current = toString(value);
  if (!editable) return <span className={styles.readOnlyValue}>{current || "—"}</span>;
  return <span className={styles.readOnlyValue}>{current || "choose file…"}</span>;
}

function ModelPickerWidget({ value, editable }: WidgetProps) {
  const current = toString(value);
  if (!editable) return <span className={styles.readOnlyValue}>{current || "—"}</span>;
  return <span className={styles.readOnlyValue}>{current || "pick model…"}</span>;
}

export function Widget(props: WidgetProps) {
  switch (props.spec.kind) {
    case "slider":
      return <SliderWidget {...props} />;
    case "number":
      return <NumberWidget {...props} />;
    case "toggle":
      return <ToggleWidget {...props} />;
    case "select":
      return <SelectWidget {...props} />;
    case "text":
      return <TextWidget {...props} />;
    case "textarea":
      return <TextareaWidget {...props} />;
    case "code":
      return <CodeWidget {...props} />;
    case "color":
      return <ColorWidget {...props} />;
    case "file":
      return <FileWidget {...props} />;
    case "model_picker":
      return <ModelPickerWidget {...props} />;
    default:
      return null;
  }
}

export function isSupportedWidget(spec: unknown): spec is WidgetSpec {
  if (!spec || typeof spec !== "object") return false;
  const kind = (spec as { kind?: unknown }).kind;
  return (
    kind === "slider" ||
    kind === "number" ||
    kind === "toggle" ||
    kind === "select" ||
    kind === "text" ||
    kind === "textarea" ||
    kind === "code" ||
    kind === "color" ||
    kind === "file" ||
    kind === "model_picker"
  );
}
