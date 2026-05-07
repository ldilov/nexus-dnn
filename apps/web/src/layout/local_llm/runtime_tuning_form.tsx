import { useEffect, useId, useMemo, useRef, useState } from "react";
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
import { HelpTooltip } from "./help_tooltip";
import { isKnownBrokenForCacheReuse } from "./known_broken_models";
import { computeVramBudget } from "./vram_budget";
import { activeWarnings } from "./warning_rules";
import { SAMPLER_PRESETS, type SamplerPresetId } from "./sampler_presets";
import * as styles from "./runtime_tuning_form.css";

const KV_OPTIONS: ReadonlyArray<KvCacheKind> = ["fp16", "q8_0", "q4_0"];

const HARD_CTX_CEIL = 131072;
const CTX_WARN_THRESHOLD = 8192;
const CACHE_REUSE_DEFAULT = 256;
const CACHE_REUSE_MIN = 64;
const CACHE_REUSE_MAX = 2048;
const CRAM_MB_DEFAULT = 1024;
const CRAM_MB_MIN = 256;
const CRAM_MB_MAX = 32768;
const CHECKPOINT_DEFAULT = 8192;
const CHECKPOINT_MIN = 1024;
const CHECKPOINT_MAX = 65536;
const MOE_FALLBACK_MAX = 64;
const MOE_AUTO_BUMP_BATCH = 2048;
const MOE_AUTO_BUMP_UBATCH = 2048;
const DRY_BASE_DEFAULT = 1.75;
const DRY_ALLOWED_LENGTH_DEFAULT = 2;

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
    cacheReuse: useId(),
    cacheReuseChunk: useId(),
    cacheReuseOverride: useId(),
    cram: useId(),
    cramSize: useId(),
    checkpointEvery: useId(),
    moeOffload: useId(),
    minP: useId(),
    dryMultiplier: useId(),
    dryBase: useId(),
    dryAllowedLength: useId(),
  };
  const helpIds = {
    ctx: `${ids.ctx}-help`,
    gpu: `${ids.gpu}-help`,
    threads: `${ids.threads}-help`,
    kv: `${ids.kv}-help`,
    fa: `${ids.fa}-help`,
    batch: `${ids.batch}-help`,
    ubatch: `${ids.ubatch}-help`,
    parallel: `${ids.parallel}-help`,
    mmap: `${ids.mmap}-help`,
    mlock: `${ids.mlock}-help`,
    contBatching: `${ids.contBatching}-help`,
    seed: `${ids.seed}-help`,
    cacheReuse: `${ids.cacheReuse}-help`,
    cram: `${ids.cram}-help`,
    moeOffload: `${ids.moeOffload}-help`,
    minP: `${ids.minP}-help`,
    dryMultiplier: `${ids.dryMultiplier}-help`,
  };

  const brokenVerdict = isKnownBrokenForCacheReuse(model.family_id);
  const [cacheReuseOverride, setCacheReuseOverride] = useState(false);
  const [activePreset, setActivePreset] = useState<SamplerPresetId | null>(null);
  const cacheReuseEnabled =
    typeof value.cache_reuse === "number" && value.cache_reuse > 0;
  const cacheReuseLocked = brokenVerdict.broken && !cacheReuseOverride;
  const cramEnabled =
    typeof value.cram_mb === "number" && value.cram_mb > 0;
  const moeOffload = value.n_cpu_moe ?? 0;
  const moeMax = model.expert_layer_count ?? MOE_FALLBACK_MAX;
  const moeFallbackInUse = model.is_moe && model.expert_layer_count == null;

  const prevMoeRef = useRef<number>(moeOffload);
  useEffect(() => {
    if (prevMoeRef.current === 0 && moeOffload > 0) {
      const patch: Partial<RuntimeTuning> = {};
      const currentBatch = value.n_batch ?? 0;
      const currentUbatch = value.n_ubatch ?? 0;
      if (currentBatch < MOE_AUTO_BUMP_BATCH) {
        patch.n_batch = MOE_AUTO_BUMP_BATCH;
      }
      if (currentUbatch < MOE_AUTO_BUMP_UBATCH) {
        patch.n_ubatch = MOE_AUTO_BUMP_UBATCH;
      }
      if (Object.keys(patch).length > 0) {
        onChange({ ...value, ...patch });
      }
    }
    prevMoeRef.current = moeOffload;
  }, [moeOffload]);

  useEffect(() => {
    if (!brokenVerdict.broken) {
      setCacheReuseOverride(false);
    }
  }, [brokenVerdict.broken, model.family_id]);

  useEffect(() => {
    const shouldEmit =
      brokenVerdict.broken && cacheReuseOverride && cacheReuseEnabled;
    const current = value.swa_full ?? false;
    if (shouldEmit && !current) {
      onChange({ ...value, swa_full: true });
    } else if (!shouldEmit && value.swa_full !== undefined) {
      const next = { ...value };
      next.swa_full = undefined;
      onChange(next);
    }
  }, [brokenVerdict.broken, cacheReuseOverride, cacheReuseEnabled]);

  const warnings = useMemo(
    () => activeWarnings({ form: value, model }),
    [value, model],
  );

  const gpuMax = modelMetadata?.layer_count ?? GPU_LAYERS_FALLBACK_MAX;
  const metadataCtxMax = model.max_context ?? 0;
  const ctxMax = Math.max(metadataCtxMax, HARD_CTX_CEIL);
  const gpuDisabled = !defaults.supports_cuda;
  const faDisabled = !defaults.supports_cuda;
  const kvDisabled = !value.flash_attn;

  const gpuValue = clamp(value.n_gpu_layers ?? 0, 0, gpuMax);
  const totalLayers = modelMetadata?.layer_count ?? gpuMax;
  const vramBudget = useMemo(
    () =>
      computeVramBudget({
        modelSizeBytes: model.size_bytes ?? 0,
        nGpuLayers: gpuValue,
        totalLayers,
        nCpuMoe: moeOffload,
        expertLayerCount: model.expert_layer_count ?? 0,
        hostVramBytes: null,
      }),
    [
      model.size_bytes,
      gpuValue,
      totalLayers,
      moeOffload,
      model.expert_layer_count,
    ],
  );
  const ctxValue = clamp(value.ctx_size ?? 8192, 1024, ctxMax);
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

  const ctxAboveWarn = ctxValue > CTX_WARN_THRESHOLD;
  const ctxMultiplier = Math.round((ctxValue / CTX_WARN_THRESHOLD) * 100) / 100;
  const ctxOverridesMetadata =
    metadataCtxMax > 0 && metadataCtxMax < ctxValue;

  return (
    <div className={styles.root}>
      {warnings.length > 0 && (
        <div className={styles.warnings} role="status" aria-live="polite">
          {warnings.map((rule) => (
            <div
              key={rule.id}
              className={styles.warningChip}
              data-severity={rule.severity}
            >
              <span className={styles.warningCopy}>{rule.copy}</span>
              {rule.action && (
                <button
                  type="button"
                  className={styles.warningAction}
                  onClick={() => update(rule.action!.apply(value))}
                >
                  {rule.action.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <section className={styles.section} aria-labelledby={`${ids.ctx}-title`}>
        <h3 id={`${ids.ctx}-title`} className={styles.sectionTitle}>
          Memory
        </h3>

        <div className={styles.row}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.ctx} className={styles.label}>
              Context length
            </label>
            <HelpTooltip
              id={helpIds.ctx}
              title="Context length"
              description="Maximum tokens the model can see at once (prompt + history + response). Doubling this roughly doubles VRAM used by the KV cache."
              recommended="4096–8192 for chat; up to 32K for long documents; above 32K only if you have headroom"
            />
          </span>
          <input
            id={ids.ctx}
            type="range"
            min={1024}
            max={ctxMax}
            step={1024}
            value={ctxValue}
            className={styles.slider}
            aria-describedby={helpIds.ctx}
            onChange={(e) => update({ ctx_size: Number(e.target.value) })}
          />
          <span className={styles.value}>{ctxValue.toLocaleString()}</span>
        </div>
        {ctxOverridesMetadata ? (
          <span className={styles.ctxOverride}>
            Above this model's reported max ({metadataCtxMax.toLocaleString()})
          </span>
        ) : null}
        {ctxAboveWarn ? (
          <div className={styles.ctxWarn} role="status">
            <span className={styles.ctxWarnIcon} aria-hidden="true">⚠</span>
            <span>
              Above 8K context significantly increases KV-cache VRAM use (
              <span className={styles.ctxWarnMultiplier}>{ctxMultiplier}×</span>{" "}
              the 8K baseline). Reduce KV cache to q8_0 or q4_0 if you OOM.
            </span>
          </div>
        ) : null}

        <div className={styles.row}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.gpu} className={styles.label}>
              GPU offload
            </label>
            <HelpTooltip
              id={helpIds.gpu}
              title="GPU offload"
              description="How many model layers to load onto the GPU. Higher = more VRAM but faster. The slider's max is the model's exact layer count."
              recommended="max if it fits in VRAM; reduce until the model loads if you OOM"
            />
          </span>
          <input
            id={ids.gpu}
            type="range"
            min={0}
            max={gpuMax}
            step={1}
            disabled={gpuDisabled}
            value={gpuValue}
            className={styles.slider}
            aria-describedby={helpIds.gpu}
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
          <span className={styles.labelCell}>
            <label htmlFor={ids.kv} className={styles.label}>
              KV cache
            </label>
            <HelpTooltip
              id={helpIds.kv}
              title="KV cache"
              description="Quantization for the key/value cache that holds attention state. q8_0 cuts cache memory ~50% with negligible quality loss. q4_0 is half again at the cost of measurable quality regression — use only when desperate for VRAM."
              recommended="q8_0 with Flash Attention on"
            />
          </span>
          <select
            id={ids.kv}
            className={styles.select}
            disabled={kvDisabled}
            value={value.cache_type_k ?? "q8_0"}
            aria-describedby={helpIds.kv}
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
          <span className={styles.labelCell}>
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
                aria-describedby={helpIds.fa}
                onChange={(e) => update({ flash_attn: e.target.checked })}
              />
              <span className={styles.label}>Flash Attention</span>
            </label>
            <HelpTooltip
              id={helpIds.fa}
              title="Flash Attention"
              description="Faster, more memory-efficient attention math. Required for KV cache quantization beyond fp16. Some older or small models may show numerical drift; if outputs degrade, turn it off."
              recommended="ON for CUDA"
            />
          </span>
        </div>

        <div className={styles.rowFull}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.cacheReuse} className={styles.checkboxRow}>
              <input
                id={ids.cacheReuse}
                type="checkbox"
                className={styles.checkbox}
                disabled={cacheReuseLocked}
                checked={cacheReuseEnabled}
                aria-describedby={helpIds.cacheReuse}
                onChange={(e) =>
                  update({
                    cache_reuse: e.target.checked
                      ? CACHE_REUSE_DEFAULT
                      : undefined,
                  })
                }
              />
              <span className={styles.label}>Reuse KV cache</span>
            </label>
            <HelpTooltip
              id={helpIds.cacheReuse}
              title="Reuse KV cache"
              description="Reuses prefilled KV state across turns when the prompt prefix is unchanged. Skips the dominant cost of inference (prefill) on follow-up turns of the same chat thread."
              recommended="ON for chat workloads; min-chunk 256 is a safe default"
            />
          </span>
        </div>
        {cacheReuseLocked && (
          <div className={styles.warningChip} data-severity="warning">
            <span className={styles.warningCopy}>{brokenVerdict.reason}</span>
            <button
              type="button"
              className={styles.warningAction}
              onClick={() => setCacheReuseOverride(true)}
            >
              Enable anyway
            </button>
          </div>
        )}
        {brokenVerdict.broken && cacheReuseOverride && cacheReuseEnabled && (
          <div className={styles.note}>
            --swa-full will be added automatically to mitigate the SWA regression on this model family.
          </div>
        )}
        {cacheReuseEnabled && (
          <div className={styles.row}>
            <span className={styles.labelCell}>
              <label htmlFor={ids.cacheReuseChunk} className={styles.label}>
                Min chunk
              </label>
            </span>
            <input
              id={ids.cacheReuseChunk}
              type="number"
              min={CACHE_REUSE_MIN}
              max={CACHE_REUSE_MAX}
              step={32}
              value={value.cache_reuse ?? CACHE_REUSE_DEFAULT}
              className={styles.number}
              onChange={(e) => {
                const parsed = Number(e.target.value);
                if (Number.isFinite(parsed)) {
                  update({
                    cache_reuse: clamp(
                      parsed,
                      CACHE_REUSE_MIN,
                      CACHE_REUSE_MAX,
                    ),
                  });
                }
              }}
            />
          </div>
        )}
      </section>

      <details className={styles.advanced}>
        <summary className={styles.advancedSummary}>
          <span>Performance / Advanced</span>
          <span className={styles.summaryHint}>
            {advancedHint || "defaults"}
          </span>
        </summary>

        <div className={styles.row}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.threads} className={styles.label}>
              Threads
            </label>
            <HelpTooltip
              id={helpIds.threads}
              title="Threads"
              description="CPU threads used for prompt processing and any layers running on CPU. More threads = faster prompt evaluation, up to a point."
              recommended="half your physical core count (not logical/SMT count)"
            />
          </span>
          <input
            id={ids.threads}
            type="range"
            min={1}
            max={defaults.hardware_concurrency}
            step={1}
            value={threadsValue}
            className={styles.slider}
            aria-describedby={helpIds.threads}
            onChange={(e) => update({ threads: Number(e.target.value) })}
          />
          <span className={styles.value}>
            {threadsValue}/{defaults.hardware_concurrency}
          </span>
        </div>

        <div className={styles.rowFull}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.batch} className={styles.label}>
              Batch size
            </label>
            <HelpTooltip
              id={helpIds.batch}
              title="Batch size"
              description="Tokens processed in parallel during prompt evaluation. Larger = faster prompt processing, more VRAM during prefill."
              recommended="512 for typical models; 1024 if you have spare VRAM"
            />
          </span>
          <input
            id={ids.batch}
            type="number"
            min={32}
            max={2048}
            step={32}
            value={value.n_batch ?? 512}
            className={styles.number}
            aria-describedby={helpIds.batch}
            onChange={(e) => update({ n_batch: Number(e.target.value) })}
          />
        </div>

        <div className={styles.rowFull}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.ubatch} className={styles.label}>
              uBatch size
            </label>
            <HelpTooltip
              id={helpIds.ubatch}
              title="uBatch size"
              description="Micro-batch size — splits the batch for memory efficiency. Should divide evenly into Batch size."
              recommended="128 for typical setups; match Batch size on small models"
            />
          </span>
          <input
            id={ids.ubatch}
            type="number"
            min={8}
            max={512}
            step={8}
            value={value.n_ubatch ?? 128}
            className={styles.number}
            aria-describedby={helpIds.ubatch}
            onChange={(e) => update({ n_ubatch: Number(e.target.value) })}
          />
        </div>

        <div className={styles.row}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.parallel} className={styles.label}>
              Parallel slots
            </label>
            <HelpTooltip
              id={helpIds.parallel}
              title="Parallel slots"
              description="Concurrent request slots. Each slot duplicates the KV cache, multiplying VRAM use."
              recommended="1 for chat; 2–4 only if you serve multiple users/agents"
            />
          </span>
          <input
            id={ids.parallel}
            type="range"
            min={1}
            max={16}
            step={1}
            value={value.n_parallel ?? 1}
            className={styles.slider}
            aria-describedby={helpIds.parallel}
            onChange={(e) => update({ n_parallel: Number(e.target.value) })}
          />
          <span className={styles.value}>{value.n_parallel ?? 1}</span>
        </div>

        <div className={styles.rowFull}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.mmap} className={styles.checkboxRow}>
              <input
                id={ids.mmap}
                type="checkbox"
                className={styles.checkbox}
                checked={value.mmap ?? true}
                aria-describedby={helpIds.mmap}
                onChange={(e) => update({ mmap: e.target.checked })}
              />
              <span className={styles.label}>mmap</span>
            </label>
            <HelpTooltip
              id={helpIds.mmap}
              title="mmap"
              description="Memory-map the model file instead of loading it into RAM. Lets the OS page model weights on demand."
              recommended="ON unless you're hitting page-cache thrash on a small machine"
            />
          </span>
        </div>

        <div className={styles.rowFull}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.mlock} className={styles.checkboxRow}>
              <input
                id={ids.mlock}
                type="checkbox"
                className={styles.checkbox}
                checked={value.mlock ?? false}
                aria-describedby={helpIds.mlock}
                onChange={(e) => update({ mlock: e.target.checked })}
              />
              <span className={styles.label}>mlock</span>
            </label>
            <HelpTooltip
              id={helpIds.mlock}
              title="mlock"
              description="Lock the model in RAM, preventing the OS from paging it out. Costs RAM but eliminates pause spikes when the model is needed. Requires elevated privileges on Linux."
              recommended="ON only if you have plenty of RAM and need consistent latency"
            />
          </span>
        </div>

        <div className={styles.rowFull}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.contBatching} className={styles.checkboxRow}>
              <input
                id={ids.contBatching}
                type="checkbox"
                className={styles.checkbox}
                checked={value.cont_batching ?? true}
                aria-describedby={helpIds.contBatching}
                onChange={(e) =>
                  update({ cont_batching: e.target.checked })
                }
              />
              <span className={styles.label}>Continuous batching</span>
            </label>
            <HelpTooltip
              id={helpIds.contBatching}
              title="Continuous batching"
              description="Process multiple requests as they arrive instead of waiting for a full batch. Significantly better throughput for chat with negligible downside."
              recommended="ON"
            />
          </span>
        </div>

        <div className={styles.rowFull}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.seed} className={styles.label}>
              Seed
            </label>
            <HelpTooltip
              id={helpIds.seed}
              title="Seed"
              description="Random seed for sampling. Set a number for reproducible outputs (same prompt = same response). Leave empty for normal random sampling."
            />
          </span>
          <input
            id={ids.seed}
            type="number"
            placeholder="random"
            value={seedValue}
            className={styles.number}
            aria-describedby={helpIds.seed}
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

        <div className={styles.rowFull}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.cram} className={styles.checkboxRow}>
              <input
                id={ids.cram}
                type="checkbox"
                className={styles.checkbox}
                checked={cramEnabled}
                aria-describedby={helpIds.cram}
                onChange={(e) =>
                  update({
                    cram_mb: e.target.checked ? CRAM_MB_DEFAULT : undefined,
                    checkpoint_every_n_tokens: e.target.checked
                      ? CHECKPOINT_DEFAULT
                      : undefined,
                  })
                }
              />
              <span className={styles.label}>Persist prompt cache to RAM</span>
            </label>
            <HelpTooltip
              id={helpIds.cram}
              title="Persist prompt cache to RAM"
              description="Caches prefilled prompt state in host memory. Repeat requests with the same prefix skip prefill almost entirely — up to ~93% TTFT reduction on cached requests in upstream benchmarks."
              recommended="ON for RAG-style workloads with stable system prompts"
            />
          </span>
        </div>
        {cramEnabled && (
          <>
            <div className={styles.rowFull}>
              <span className={styles.labelCell}>
                <label htmlFor={ids.cramSize} className={styles.label}>
                  Cache size (MB)
                </label>
              </span>
              <input
                id={ids.cramSize}
                type="number"
                min={CRAM_MB_MIN}
                max={CRAM_MB_MAX}
                step={256}
                value={value.cram_mb ?? CRAM_MB_DEFAULT}
                className={styles.number}
                onChange={(e) => {
                  const parsed = Number(e.target.value);
                  if (Number.isFinite(parsed)) {
                    update({
                      cram_mb: clamp(parsed, CRAM_MB_MIN, CRAM_MB_MAX),
                    });
                  }
                }}
              />
            </div>
            <div className={styles.rowFull}>
              <span className={styles.labelCell}>
                <label htmlFor={ids.checkpointEvery} className={styles.label}>
                  Checkpoint every (tokens)
                </label>
              </span>
              <input
                id={ids.checkpointEvery}
                type="number"
                min={CHECKPOINT_MIN}
                max={CHECKPOINT_MAX}
                step={1024}
                value={value.checkpoint_every_n_tokens ?? CHECKPOINT_DEFAULT}
                className={styles.number}
                onChange={(e) => {
                  const parsed = Number(e.target.value);
                  if (Number.isFinite(parsed)) {
                    update({
                      checkpoint_every_n_tokens: clamp(
                        parsed,
                        CHECKPOINT_MIN,
                        CHECKPOINT_MAX,
                      ),
                    });
                  }
                }}
              />
            </div>
          </>
        )}

        {model.is_moe && (
          <>
            <div className={styles.row}>
              <span className={styles.labelCell}>
                <label htmlFor={ids.moeOffload} className={styles.label}>
                  MoE offload
                </label>
                <HelpTooltip
                  id={helpIds.moeOffload}
                  title="MoE offload (--n-cpu-moe)"
                  description="Pushes expert FFN tensors to CPU RAM while keeping attention on GPU. The only practical way to run 100B+ MoE models on consumer cards. Auto-bumps batch sizes to 2048 to avoid the GGML_OP_OFFLOAD_MIN_BATCH=32 prefill collapse."
                  recommended="RTX 3090: try 28 for GPT-OSS-120B; RTX 4090: try 16; 48GB+: 0 (full GPU)"
                />
              </span>
              <input
                id={ids.moeOffload}
                type="range"
                min={0}
                max={moeMax}
                step={1}
                value={moeOffload}
                className={styles.slider}
                onChange={(e) =>
                  update({ n_cpu_moe: Number(e.target.value) })
                }
              />
              <span className={styles.value}>
                {moeOffload}/{moeMax}
              </span>
            </div>
            {moeFallbackInUse && (
              <div className={styles.note}>
                Exact expert layer count unknown — using fallback maximum.
              </div>
            )}
            <div className={styles.note}>
              ~ {(vramBudget.gpuBytesUsed / 1_000_000_000).toFixed(1)} GB GPU
              used (estimated)
            </div>
            {moeOffload > 0 && (
              <div className={styles.note}>
                Bumped batch and uBatch to ≥ 2048 for MoE offload.
              </div>
            )}
          </>
        )}

        <div className={styles.row}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.minP} className={styles.label}>
              min-p
            </label>
            <HelpTooltip
              id={helpIds.minP}
              title="min-p"
              description="Modern nucleus sampler — keeps tokens whose probability ≥ min-p × top-token probability. Recommended replacement for top-p in 2025+ guides."
              recommended="0.05 chat; 0.10 code/factual; 0.02 creative"
            />
          </span>
          <input
            id={ids.minP}
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={value.min_p ?? 0}
            className={styles.number}
            onChange={(e) => {
              const parsed = Number(e.target.value);
              if (Number.isFinite(parsed) && parsed >= 0 && parsed <= 1) {
                update({ min_p: parsed > 0 ? parsed : undefined });
              }
            }}
          />
        </div>

        <div className={styles.row}>
          <span className={styles.labelCell}>
            <label htmlFor={ids.dryMultiplier} className={styles.label}>
              DRY multiplier
            </label>
            <HelpTooltip
              id={helpIds.dryMultiplier}
              title="DRY (Don't Repeat Yourself)"
              description="Exponential repetition penalty that targets only actual repeating sequences, not natural recurrence. Strictly better than the classic --repeat-penalty for chat repetition control."
              recommended="0.8 multiplier with base 1.75 + allowed-length 2"
            />
          </span>
          <input
            id={ids.dryMultiplier}
            type="number"
            min={0}
            max={5}
            step={0.1}
            value={value.dry_multiplier ?? 0}
            className={styles.number}
            onChange={(e) => {
              const parsed = Number(e.target.value);
              if (!Number.isFinite(parsed) || parsed < 0) return;
              if (parsed > 0) {
                update({
                  dry_multiplier: parsed,
                  dry_base: value.dry_base ?? DRY_BASE_DEFAULT,
                  dry_allowed_length:
                    value.dry_allowed_length ?? DRY_ALLOWED_LENGTH_DEFAULT,
                });
              } else {
                update({
                  dry_multiplier: undefined,
                  dry_base: undefined,
                  dry_allowed_length: undefined,
                });
              }
            }}
          />
        </div>

        <div className={styles.presets}>
          <span className={styles.label}>Sampler preset</span>
          {(["chat", "code", "creative"] as SamplerPresetId[]).map(
            (presetId) => (
              <button
                key={presetId}
                type="button"
                className={styles.presetChip}
                data-active={activePreset === presetId ? "true" : undefined}
                onClick={() => {
                  const preset = SAMPLER_PRESETS[presetId];
                  setActivePreset(presetId);
                  const next: Partial<RuntimeTuning> = { ...preset.tuning };
                  if (preset.tuning.dry_multiplier === undefined) {
                    next.dry_base = undefined;
                    next.dry_allowed_length = undefined;
                  }
                  update(next);
                }}
              >
                {presetId === "chat"
                  ? "Chat"
                  : presetId === "code"
                  ? "Code & factual"
                  : "Creative"}
              </button>
            ),
          )}
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
