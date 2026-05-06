import { useId, useMemo } from "react";
import type {
  AvailableModel,
  KvCacheKind,
  RuntimeDefaults,
  RuntimeTuning,
} from "../../services/local_llm_chat";
import type { ModelMetadata } from "../../services/host_api";
import {
  GPU_LAYERS_FALLBACK_MAX,
  defaultTuningFor,
} from "./default_tuning";
import * as styles from "./runtime_tuning_form.css";

const KV_OPTIONS: ReadonlyArray<KvCacheKind> = ["fp16", "q8_0", "q4_0"];

interface RuntimeTuningFormProps {
  model: AvailableModel;
  value: RuntimeTuning;
  defaults: RuntimeDefaults;
  modelMetadata?: ModelMetadata;
  onChange: (next: RuntimeTuning) => void;
}

function clamp(n: number, min: number, max: number): number {
  if (n < min) return min;
  if (n > max) return max;
  return n;
}

function readKvKind(raw: string): KvCacheKind {
  if (raw === "fp16" || raw === "q8_0" || raw === "q4_0") return raw;
  return "q8_0";
}

export function RuntimeTuningForm({
  model,
  value,
  defaults,
  modelMetadata,
  onChange,
}: RuntimeTuningFormProps) {
  const ids = {
    ctx: useId(),
    gpu: useId(),
    threads: useId(),
    kv: useId(),
    fa: useId(),
    batch: useId(),
    ubatch: useId(),
    parallel: useId(),
    mmap: useId(),
    mlock: useId(),
    contBatching: useId(),
    seed: useId(),
  };

  const gpuMax = modelMetadata?.layer_count ?? GPU_LAYERS_FALLBACK_MAX;
  const ctxMax = model.max_context ?? 8192;
  const gpuDisabled = !defaults.supports_cuda;
  const faDisabled = !defaults.supports_cuda;
  const kvDisabled = !value.flash_attn;

  const gpuValue = clamp(value.n_gpu_layers ?? 0, 0, gpuMax);
  const ctxValue = clamp(value.ctx_size ?? 8192, 512, ctxMax);
  const threadsValue = clamp(
    value.threads ?? defaults.threads_default,
    1,
    defaults.hardware_concurrency,
  );
  const seedValue = value.seed === undefined || value.seed === null
    ? ""
    : String(value.seed);

  const update = (patch: Partial<RuntimeTuning>) => {
    onChange({ ...value, ...patch });
  };

  const reset = () => {
    onChange(defaultTuningFor(model, defaults, modelMetadata));
  };

  const advancedHint = useMemo(() => {
    const parts: string[] = [];
    if (value.n_batch !== undefined) parts.push(`batch ${value.n_batch}`);
    if (value.n_parallel !== undefined && value.n_parallel > 1)
      parts.push(`${value.n_parallel} slots`);
    if (value.mlock) parts.push("mlock");
    if (!value.cont_batching) parts.push("no cont-batching");
    if (value.seed !== undefined) parts.push(`seed ${value.seed}`);
    return parts.join(" · ");
  }, [
    value.n_batch,
    value.n_parallel,
    value.mlock,
    value.cont_batching,
    value.seed,
  ]);

  return (
    <div className={styles.root}>
      <section className={styles.section} aria-labelledby={`${ids.ctx}-title`}>
        <h3 id={`${ids.ctx}-title`} className={styles.sectionTitle}>
          Memory
        </h3>

        <div className={styles.row}>
          <label htmlFor={ids.ctx} className={styles.label}>
            Context length
          </label>
          <input
            id={ids.ctx}
            type="range"
            min={512}
            max={ctxMax}
            step={512}
            value={ctxValue}
            className={styles.slider}
            onChange={(e) => update({ ctx_size: Number(e.target.value) })}
          />
          <span className={styles.value}>{ctxValue.toLocaleString()}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor={ids.gpu} className={styles.label}>
            GPU offload
          </label>
          <input
            id={ids.gpu}
            type="range"
            min={0}
            max={gpuMax}
            step={1}
            disabled={gpuDisabled}
            value={gpuValue}
            className={styles.slider}
            onChange={(e) =>
              update({ n_gpu_layers: Number(e.target.value) })
            }
          />
          <span className={styles.value}>
            {gpuDisabled ? "—" : `${gpuValue}/${gpuMax}`}
          </span>
        </div>
        {gpuDisabled ? (
          <p className={styles.hint}>
            No CUDA runtime installed — GPU offload unavailable.
          </p>
        ) : modelMetadata?.layer_count != null ? (
          <p className={styles.hint}>
            This model has {modelMetadata.layer_count} transformer layers.
          </p>
        ) : (
          <p className={styles.hint}>
            Exact layer count unknown for this model — using fallback maximum.
          </p>
        )}

        <div className={styles.rowFull}>
          <label htmlFor={ids.kv} className={styles.label}>
            KV cache
          </label>
          <select
            id={ids.kv}
            className={styles.select}
            disabled={kvDisabled}
            value={value.cache_type_k ?? "q8_0"}
            onChange={(e) => {
              const next = readKvKind(e.target.value);
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

        <div className={styles.rowFull}>
          <label
            htmlFor={ids.fa}
            className={
              faDisabled
                ? `${styles.checkboxRow} ${styles.checkboxRowDisabled}`
                : styles.checkboxRow
            }
          >
            <input
              id={ids.fa}
              type="checkbox"
              className={styles.checkbox}
              disabled={faDisabled}
              checked={value.flash_attn ?? false}
              onChange={(e) => update({ flash_attn: e.target.checked })}
            />
            <span className={styles.label}>Flash Attention</span>
          </label>
        </div>
      </section>

      <details className={styles.advanced}>
        <summary className={styles.advancedSummary}>
          <span>Performance / Advanced</span>
          <span className={styles.summaryHint}>
            {advancedHint || "defaults"}
          </span>
        </summary>

        <div className={styles.row}>
          <label htmlFor={ids.threads} className={styles.label}>
            Threads
          </label>
          <input
            id={ids.threads}
            type="range"
            min={1}
            max={defaults.hardware_concurrency}
            step={1}
            value={threadsValue}
            className={styles.slider}
            onChange={(e) => update({ threads: Number(e.target.value) })}
          />
          <span className={styles.value}>
            {threadsValue}/{defaults.hardware_concurrency}
          </span>
        </div>

        <div className={styles.rowFull}>
          <label htmlFor={ids.batch} className={styles.label}>
            Batch size
          </label>
          <input
            id={ids.batch}
            type="number"
            min={32}
            max={2048}
            step={32}
            value={value.n_batch ?? 512}
            className={styles.number}
            onChange={(e) => update({ n_batch: Number(e.target.value) })}
          />
        </div>

        <div className={styles.rowFull}>
          <label htmlFor={ids.ubatch} className={styles.label}>
            uBatch size
          </label>
          <input
            id={ids.ubatch}
            type="number"
            min={8}
            max={512}
            step={8}
            value={value.n_ubatch ?? 128}
            className={styles.number}
            onChange={(e) => update({ n_ubatch: Number(e.target.value) })}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor={ids.parallel} className={styles.label}>
            Parallel slots
          </label>
          <input
            id={ids.parallel}
            type="range"
            min={1}
            max={16}
            step={1}
            value={value.n_parallel ?? 1}
            className={styles.slider}
            onChange={(e) => update({ n_parallel: Number(e.target.value) })}
          />
          <span className={styles.value}>{value.n_parallel ?? 1}</span>
        </div>

        <div className={styles.rowFull}>
          <label htmlFor={ids.mmap} className={styles.checkboxRow}>
            <input
              id={ids.mmap}
              type="checkbox"
              className={styles.checkbox}
              checked={value.mmap ?? true}
              onChange={(e) => update({ mmap: e.target.checked })}
            />
            <span className={styles.label}>mmap</span>
          </label>
        </div>

        <div className={styles.rowFull}>
          <label htmlFor={ids.mlock} className={styles.checkboxRow}>
            <input
              id={ids.mlock}
              type="checkbox"
              className={styles.checkbox}
              checked={value.mlock ?? false}
              onChange={(e) => update({ mlock: e.target.checked })}
            />
            <span className={styles.label}>mlock</span>
          </label>
        </div>

        <div className={styles.rowFull}>
          <label htmlFor={ids.contBatching} className={styles.checkboxRow}>
            <input
              id={ids.contBatching}
              type="checkbox"
              className={styles.checkbox}
              checked={value.cont_batching ?? true}
              onChange={(e) =>
                update({ cont_batching: e.target.checked })
              }
            />
            <span className={styles.label}>Continuous batching</span>
          </label>
        </div>

        <div className={styles.rowFull}>
          <label htmlFor={ids.seed} className={styles.label}>
            Seed
          </label>
          <input
            id={ids.seed}
            type="number"
            placeholder="random"
            value={seedValue}
            className={styles.number}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "") {
                update({ seed: undefined });
                return;
              }
              const parsed = Number(raw);
              if (Number.isFinite(parsed)) update({ seed: parsed });
            }}
          />
        </div>
      </details>

      <div className={styles.resetRow}>
        <button type="button" className={styles.reset} onClick={reset}>
          Reset to defaults
        </button>
      </div>
    </div>
  );
}
