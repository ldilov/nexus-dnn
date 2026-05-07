import type {
  AvailableModel,
  RuntimeTuning,
} from "../../services/local_llm_chat";
import type { ModelMetadata } from "../../services/host_api";
import { GPU_LAYERS_FALLBACK_MAX } from "./default_tuning";
import { computeVramBudget } from "./vram_budget";
import * as styles from "./selected_model_summary.css";

interface SelectedModelSummaryProps {
  model: AvailableModel;
  tuning: RuntimeTuning;
  metadata?: ModelMetadata;
  hostVramBytes?: number | null;
}

function formatBytes(size: number | null | undefined): string {
  if (!size || size <= 0) return "—";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let n = size;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n < 10 && i > 0 ? n.toFixed(1) : Math.round(n)} ${units[i]}`;
}

function formatContextSize(n: number | null | undefined): string {
  if (!n || n <= 0) return "—";
  if (n < 1000) return String(n);
  const inK = n / 1000;
  return Number.isInteger(inK) ? `${inK}K` : `${inK.toFixed(1)}K`;
}

function friendlyModelLabel(raw: string): string {
  if (!raw) return raw;
  const stripped = raw.replace(/^huggingface:/, "");
  const beforeQuant = stripped.split("@")[0] ?? stripped;
  const lastSegment = beforeQuant.split("/").pop() ?? beforeQuant;
  return lastSegment;
}

function compactVariant(
  variantId: string | null,
  format: string,
): string {
  if (!variantId) return format.toUpperCase();
  const afterAt = variantId.includes("@") ? variantId.split("@").pop()! : variantId;
  return afterAt.toUpperCase();
}

export function SelectedModelSummary({
  model,
  tuning,
  metadata,
  hostVramBytes,
}: SelectedModelSummaryProps) {
  const totalLayers = metadata?.layer_count ?? GPU_LAYERS_FALLBACK_MAX;
  const expertLayerCount =
    model.expert_layer_count ?? metadata?.layer_count ?? GPU_LAYERS_FALLBACK_MAX;
  const budget = computeVramBudget({
    modelSizeBytes: model.size_bytes ?? 0,
    nGpuLayers: tuning.n_gpu_layers ?? 0,
    totalLayers,
    nCpuMoe: tuning.n_cpu_moe ?? 0,
    expertLayerCount,
    hostVramBytes: hostVramBytes ?? null,
  });
  const ctxValue = tuning.ctx_size ?? model.max_context ?? 0;
  const variantLabel = compactVariant(model.variant_id, model.format);
  const displayLabel = friendlyModelLabel(model.label);

  return (
    <header className={styles.root} aria-label="Selected model summary">
      <div className={styles.titleRow}>
        <h3 className={styles.title} title={model.label}>
          {displayLabel}
        </h3>
        <div className={styles.chips}>
          {model.is_moe ? (
            <span className={styles.chipMoe} aria-label="Mixture of experts">
              MoE
            </span>
          ) : null}
          <span className={styles.chip}>{variantLabel}</span>
        </div>
      </div>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Size</dt>
          <dd className={styles.factValue}>{formatBytes(model.size_bytes)}</dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Context</dt>
          <dd className={styles.factValue}>{formatContextSize(ctxValue)}</dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Layers</dt>
          <dd className={styles.factValue}>
            {tuning.n_gpu_layers ?? 0}/{totalLayers}
          </dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Est. VRAM</dt>
          <dd className={styles.factValue}>
            {formatBytes(budget.gpuBytesUsed)}
            {budget.gpuBytesRemaining != null && hostVramBytes ? (
              <span className={styles.factSubValue}>
                {" "}
                / {formatBytes(hostVramBytes)}
              </span>
            ) : null}
          </dd>
        </div>
      </dl>
    </header>
  );
}
