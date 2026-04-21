import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEFAULT_GENERATION_PARAMS,
  fetchGenerationSettings,
  setGenerationSettings,
  type GenerationParams,
} from "../../services/local_llm_chat";
import { inputRecipe } from "../base/input.css";
import * as styles from "./layout_styles.css";

type NumericKey =
  | "temperature"
  | "top_p"
  | "top_k"
  | "max_tokens"
  | "repeat_penalty";

type SliderDef = {
  key: NumericKey;
  label: string;
  min: number;
  max: number;
  step: number;
};

const SLIDERS: SliderDef[] = [
  { key: "temperature", label: "Temperature", min: 0, max: 2, step: 0.1 },
  { key: "top_p", label: "Top P", min: 0, max: 1, step: 0.05 },
  { key: "repeat_penalty", label: "Repeat Penalty", min: 0, max: 2, step: 0.1 },
];

const NUMBERS: SliderDef[] = [
  { key: "top_k", label: "Top K", min: 1, max: 100, step: 1 },
  { key: "max_tokens", label: "Max Tokens", min: 1, max: 32768, step: 1 },
];

const DEBOUNCE_MS = 200;

export function GenerationSettingsFormComponent() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [params, setParams] = useState<GenerationParams>(
    DEFAULT_GENERATION_PARAMS,
  );
  const [loading, setLoading] = useState(false);
  const saveTimer = useRef<number | null>(null);

  const load = useCallback((id: string | null, signal?: AbortSignal) => {
    if (!id) {
      setParams(DEFAULT_GENERATION_PARAMS);
      return;
    }
    setLoading(true);
    fetchGenerationSettings(id, signal)
      .then((p) => setParams(p))
      .catch(() => setParams(DEFAULT_GENERATION_PARAMS))
      .finally(() => {
        if (!signal?.aborted) setLoading(false);
      });
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    const onSelected = (e: Event) => {
      const ce = e as CustomEvent<{ id?: string }>;
      const id = ce.detail?.id ?? null;
      setThreadId(id);
      load(id, ctrl.signal);
    };
    window.addEventListener("local-llm/thread:selected", onSelected);
    return () => {
      ctrl.abort();
      window.removeEventListener("local-llm/thread:selected", onSelected);
    };
  }, [load]);

  const schedulePut = useCallback(
    (next: GenerationParams) => {
      if (!threadId) return;
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        setGenerationSettings(threadId, next).catch(() => undefined);
      }, DEBOUNCE_MS);
    },
    [threadId],
  );

  const update = useCallback(
    <K extends keyof GenerationParams>(key: K, value: GenerationParams[K]) => {
      setParams((prev) => {
        const next = { ...prev, [key]: value };
        schedulePut(next);
        return next;
      });
    },
    [schedulePut],
  );

  useEffect(
    () => () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    },
    [],
  );

  const disabled = !threadId || loading;

  return (
    <div
      className={styles.form}
      aria-label="Generation parameters"
      aria-busy={loading}
    >
      {SLIDERS.map((f) => (
        <div key={f.key} className={styles.formField}>
          <label className={styles.formLabel}>{f.label}</label>
          <div className={styles.formSliderRow}>
            <input
              type="range"
              className={styles.formSlider}
              min={f.min}
              max={f.max}
              step={f.step}
              value={params[f.key]}
              disabled={disabled}
              onChange={(e) => update(f.key, Number(e.target.value))}
            />
            <span className={styles.formSliderValue}>
              {params[f.key].toFixed(f.step < 1 ? 2 : 0)}
            </span>
          </div>
        </div>
      ))}
      {NUMBERS.map((f) => (
        <div key={f.key} className={styles.formField}>
          <label className={styles.formLabel}>{f.label}</label>
          <input
            type="number"
            className={inputRecipe({ variant: "default", size: "md" })}
            min={f.min}
            max={f.max}
            step={f.step}
            value={params[f.key]}
            disabled={disabled}
            onChange={(e) => update(f.key, Number(e.target.value))}
          />
        </div>
      ))}
      <div className={styles.formField}>
        <label className={styles.formLabel}>System Prompt</label>
        <textarea
          className={styles.formTextarea}
          value={params.system_prompt}
          disabled={disabled}
          rows={3}
          onChange={(e) => update("system_prompt", e.target.value)}
        />
      </div>
    </div>
  );
}
