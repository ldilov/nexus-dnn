import type {
  AvailableModel,
  RuntimeDefaults,
  RuntimeTuning,
} from "../../services/local_llm_chat";
import type { ModelMetadata } from "../../services/host_api";

export const GPU_LAYERS_FALLBACK_MAX = 128;
export const DEFAULT_CTX_SIZE = 8192;
export const DEFAULT_N_BATCH = 512;
export const DEFAULT_N_UBATCH = 128;
export const DEFAULT_N_PARALLEL = 1;

export function defaultTuningFor(
  model: AvailableModel,
  defaults: RuntimeDefaults,
  metadata?: ModelMetadata,
): RuntimeTuning {
  const hasCuda = defaults.supports_cuda;
  const layerCount = metadata?.layer_count ?? GPU_LAYERS_FALLBACK_MAX;
  const ctxCandidate = model.max_context ?? DEFAULT_CTX_SIZE;
  const ctxSize = Math.min(DEFAULT_CTX_SIZE, ctxCandidate);
  const kv = hasCuda ? "q8_0" : "fp16";
  return {
    n_gpu_layers: hasCuda ? layerCount : 0,
    threads: defaults.threads_default,
    flash_attn: "auto",
    ctx_size: ctxSize,
    cache_type_k: kv,
    cache_type_v: kv,
    mmap: true,
    mlock: false,
    n_batch: DEFAULT_N_BATCH,
    n_ubatch: DEFAULT_N_UBATCH,
    n_parallel: DEFAULT_N_PARALLEL,
    cont_batching: true,
    seed: undefined,
    kv_unified: true,
    lookup_decoding: true,
  };
}
