import { type ReactNode, useMemo, useState } from "react";
import { toast } from "sonner";
import type { RecipeFormDto } from "../../../api/generated/RecipeFormDto";
import { runRecipe } from "../../../services/api_client";
import { ControlWidget } from "./widgets";
import { validateControlValues } from "./validation";
import * as s from "./recipe_form.css";

interface RecipeFormProps {
  form: RecipeFormDto;
  onLaunched: (runId: string) => void;
}

const isUserSettable = (mode: string): boolean => mode !== "locked" && mode !== "hidden";

export function RecipeForm({ form, onLaunched }: RecipeFormProps) {
  const initial = useMemo(() => {
    const v: Record<string, unknown> = {};
    for (const c of form.controls) {
      if (!isUserSettable(c.mode)) continue;
      if (c.default_value !== null && c.default_value !== undefined) v[c.control_id] = c.default_value;
    }
    return v;
  }, [form]);

  const [values, setValues] = useState<Record<string, unknown>>(initial);
  const [presetId, setPresetId] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);

  const editable = useMemo(
    () => form.controls.filter((c) => isUserSettable(c.mode)),
    [form.controls],
  );
  const byId = useMemo(() => new Map(form.controls.map((c) => [c.control_id, c])), [form.controls]);
  const validation = validateControlValues(form.controls, values);

  const setValue = (id: string, value: unknown): void =>
    setValues((prev) => ({ ...prev, [id]: value }));

  const sections = [...form.sections].sort((a, b) => a.order - b.order);

  async function submit(): Promise<void> {
    if (!validation.ok) {
      toast.error("Fix the highlighted fields before running");
      return;
    }
    setSubmitting(true);
    try {
      const payload: Record<string, unknown> = {};
      for (const c of editable) {
        if (c.control_id in values) payload[c.control_id] = values[c.control_id];
      }
      const res = await runRecipe(form.recipe_id, { control_values: payload, preset_id: presetId });
      toast.success("Run started");
      onLaunched(res.run_id);
    } catch (err: unknown) {
      toast.error("Run failed", { description: err instanceof Error ? err.message : "unknown" });
    } finally {
      setSubmitting(false);
    }
  }

  const renderControl = (id: string): ReactNode => {
    const c = byId.get(id);
    if (!c || c.mode === "hidden") return null;
    const displayValue = isUserSettable(c.mode) ? values[id] : c.default_value;
    return (
      <div key={id} className={s.field}>
        <label className={s.label} htmlFor={id}>
          {c.label}
        </label>
        <ControlWidget control={c} value={displayValue} onChange={(v) => setValue(id, v)} />
        {c.help_text && <span className={s.help}>{c.help_text}</span>}
        {validation.errors[id] && <span className={s.error}>{validation.errors[id]}</span>}
      </div>
    );
  };

  return (
    <div className={s.root}>
      {form.presets.length > 0 && (
        <div className={s.presetRail}>
          {form.presets.map((p) => (
            <button
              key={p.preset_id}
              type="button"
              className={s.presetPill}
              aria-pressed={presetId === p.preset_id}
              onClick={() => setPresetId(presetId === p.preset_id ? undefined : p.preset_id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {sections.length > 0
        ? sections.map((sec) => (
            <fieldset key={sec.id} className={s.section}>
              <legend className={s.sectionTitle}>{sec.title}</legend>
              {sec.control_ids.map(renderControl)}
            </fieldset>
          ))
        : form.controls.map((c) => renderControl(c.control_id))}

      <div className={s.actions}>
        <button type="button" className={s.runButton} disabled={submitting || !validation.ok} onClick={submit}>
          {submitting ? "Starting…" : "Run"}
        </button>
      </div>
    </div>
  );
}
