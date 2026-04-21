import { useEffect, useMemo, useState } from "react";
import {
  fetchRuntimeDefaults,
  type RuntimeDefaults,
  type RuntimeTuning,
} from "../../services/local_llm_chat";
import * as css from "./model_picker.css";

const CTX_OPTIONS = [2048, 4096, 8192, 16384, 32768];
const KV_OPTIONS: Array<"fp16" | "q8_0" | "q4_0"> = ["fp16", "q8_0", "q4_0"];
const STORAGE_KEY = "local-llm:runtime-tuning";
const GPU_LAYERS_MAX = 128;
const GPU_LAYERS_MAX_LABEL_THRESHOLD = 120;

type StoredTuning = Record<string, RuntimeTuning>;

function loadStored(): StoredTuning {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") return parsed as StoredTuning;
    return {};
  } catch {
    return {};
  }
}

function persistForFamily(familyId: string, tuning: RuntimeTuning): void {
  try {
    const all = loadStored();
    all[familyId] = tuning;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // ignore storage errors (quota, private mode, etc.)
  }
}

function readForFamily(familyId: string): RuntimeTuning | null {
  const all = loadStored();
  return all[familyId] ?? null;
}

function defaultTuning(d: RuntimeDefaults): RuntimeTuning {
  return {
    n_gpu_layers: d.supports_cuda ? GPU_LAYERS_MAX : 0,
    threads: d.threads_default,
    flash_attn: d.supports_cuda,
    ctx_size: 8192,
    cache_type_k: "q8_0",
    cache_type_v: "q8_0",
  };
}

function clampGpuLayers(v: number | undefined): number {
  if (v == null) return 0;
  if (v < 0) return 0;
  if (v > GPU_LAYERS_MAX) return GPU_LAYERS_MAX;
  return v;
}

function gpuLayersLabel(v: number | undefined, disabled: boolean): string {
  if (disabled) return "—";
  const clamped = clampGpuLayers(v);
  if (clamped >= GPU_LAYERS_MAX_LABEL_THRESHOLD) return "max";
  if (clamped === 0) return "CPU";
  return String(clamped);
}

interface RuntimePanelProps {
  familyId: string;
  onChange: (tuning: RuntimeTuning) => void;
}

export function RuntimePanel({ familyId, onChange }: RuntimePanelProps) {
  const [defaults, setDefaults] = useState<RuntimeDefaults | null>(null);
  const [tuning, setTuning] = useState<RuntimeTuning>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchRuntimeDefaults(ctrl.signal)
      .then((d) => {
        setDefaults(d);
        const stored = readForFamily(familyId);
        const rawSeed = stored ?? defaultTuning(d);
        const seed: RuntimeTuning = {
          ...rawSeed,
          n_gpu_layers: clampGpuLayers(rawSeed.n_gpu_layers),
        };
        setTuning(seed);
        onChange(seed);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, [familyId, onChange]);

  const update = (patch: Partial<RuntimeTuning>) => {
    const next = { ...tuning, ...patch };
    setTuning(next);
    persistForFamily(familyId, next);
    onChange(next);
  };

  const reset = () => {
    if (!defaults) return;
    const fresh = defaultTuning(defaults);
    setTuning(fresh);
    persistForFamily(familyId, fresh);
    onChange(fresh);
  };

  const summary = useMemo(() => {
    const parts: string[] = [];
    if (tuning.n_gpu_layers !== undefined) {
      parts.push(
        tuning.n_gpu_layers >= GPU_LAYERS_MAX_LABEL_THRESHOLD
          ? "max GPU"
          : tuning.n_gpu_layers === 0
            ? "CPU only"
            : `${tuning.n_gpu_layers} layers`,
      );
    }
    if (tuning.threads !== undefined) parts.push(`${tuning.threads}T`);
    if (tuning.flash_attn) parts.push("FA");
    if (tuning.ctx_size) parts.push(`${tuning.ctx_size}ctx`);
    return parts.join(" · ");
  }, [tuning]);

  if (!defaults) return null;

  const gpuDisabled = !defaults.supports_cuda;
  const faDisabled = !defaults.supports_cuda;
  const kvDisabled = !tuning.flash_attn;

  return (
    <details
      className={css.runtimePanel}
      open={open}
      onToggle={(e) =>
        setOpen((e.target as HTMLDetailsElement).open)
      }
    >
      <summary className={css.runtimeHeader}>
        <span>Runtime tuning</span>
        <span className={css.runtimeHeaderBadge}>
          {summary || "defaults"}
        </span>
      </summary>

      <div className={css.runtimeRow}>
        <label className={css.runtimeLabel} title="OOM if too high. Crash → we flip to Failed and you can retry with less.">
          GPU layers
        </label>
        <input
          className={css.runtimeSlider}
          type="range"
          min={0}
          max={GPU_LAYERS_MAX}
          step={1}
          disabled={gpuDisabled}
          value={clampGpuLayers(tuning.n_gpu_layers)}
          onChange={(e) =>
            update({ n_gpu_layers: Number(e.target.value) })
          }
        />
        <span className={css.runtimeValue}>
          {gpuLayersLabel(tuning.n_gpu_layers, gpuDisabled)}
        </span>
      </div>
      {gpuDisabled ? (
        <div className={css.runtimeHint}>
          No CUDA runtime installed — GPU offload unavailable.
        </div>
      ) : (
        <div className={css.runtimeHint}>
          Most GGUFs have 20–100 layers. Above the model's layer count
          llama.cpp silently caps to the actual total, so use "max" to offload
          everything.
        </div>
      )}

      <div className={css.runtimeRow}>
        <label
          className={css.runtimeLabel}
          title="Recommended: physical cores. Going higher rarely helps, often hurts."
        >
          CPU threads
        </label>
        <input
          className={css.runtimeSlider}
          type="range"
          min={1}
          max={defaults.hardware_concurrency}
          step={1}
          value={tuning.threads ?? defaults.threads_default}
          onChange={(e) => update({ threads: Number(e.target.value) })}
        />
        <span className={css.runtimeValue}>
          {tuning.threads ?? defaults.threads_default}/
          {defaults.hardware_concurrency}
        </span>
      </div>

      <div className={css.runtimeRowFull}>
        <label
          className={
            faDisabled
              ? `${css.runtimeCheckboxRow} ${css.runtimeCheckboxRowDisabled}`
              : css.runtimeCheckboxRow
          }
          title="Requires CUDA. ~+20% prompt-eval, −30% KV VRAM."
        >
          <input
            className={css.runtimeCheckbox}
            type="checkbox"
            disabled={faDisabled}
            checked={tuning.flash_attn ?? false}
            onChange={(e) => update({ flash_attn: e.target.checked })}
          />
          <span className={css.runtimeLabel}>Flash Attention</span>
        </label>
      </div>

      <div className={css.runtimeRowFull}>
        <label className={css.runtimeLabel}>Context window</label>
        <select
          className={css.runtimeSelect}
          value={tuning.ctx_size ?? 8192}
          onChange={(e) => update({ ctx_size: Number(e.target.value) })}
        >
          {CTX_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n.toLocaleString()} tokens
            </option>
          ))}
        </select>
      </div>

      <div className={css.runtimeRowFull}>
        <label
          className={css.runtimeLabel}
          title={
            kvDisabled
              ? "KV cache quantization requires Flash Attention"
              : "q8_0 ≈ halves KV VRAM with negligible quality loss. q4_0 is noticeably lossy."
          }
        >
          KV cache quant
        </label>
        <select
          className={css.runtimeSelect}
          disabled={kvDisabled}
          value={tuning.cache_type_k ?? "q8_0"}
          onChange={(e) => {
            const next = e.target.value as "fp16" | "q8_0" | "q4_0";
            update({ cache_type_k: next, cache_type_v: next });
          }}
        >
          {KV_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          type="button"
          className={css.runtimeReset}
          onClick={reset}
        >
          Reset to defaults
        </button>
      </div>
    </details>
  );
}
