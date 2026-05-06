import { describe, expect, it } from "vitest";
import { defaultTuningFor } from "../default_tuning";
import type {
  AvailableModel,
  RuntimeDefaults,
} from "../../../services/local_llm_chat";
import type { ModelMetadata } from "../../../services/host_api";

const baseModel: AvailableModel = {
  family_id: "meta-llama/Llama-3.1-8B-Instruct",
  variant_id: "Q4_K_M",
  label: "Llama 3.1 8B Instruct",
  format: "gguf",
  size_bytes: 4_500_000_000,
  max_context: 131_072,
};

const cudaDefaults: RuntimeDefaults = {
  hardware_concurrency: 16,
  threads_default: 8,
  supports_cuda: true,
  platform: "windows",
};

const cpuDefaults: RuntimeDefaults = {
  hardware_concurrency: 16,
  threads_default: 8,
  supports_cuda: false,
  platform: "linux",
};

const metadata: ModelMetadata = {
  install_id: "install-1",
  format: "gguf",
  layer_count: 40,
  max_context: 131_072,
  architecture: "llama",
  hidden_size: 4096,
  extraction_status: "ok",
  extracted_at: 0,
};

describe("defaultTuningFor", () => {
  it("defaults_for_cuda_uses_q8_kv_and_flash_attn", () => {
    const result = defaultTuningFor(baseModel, cudaDefaults, metadata);
    expect(result.cache_type_k).toBe("q8_0");
    expect(result.cache_type_v).toBe("q8_0");
    expect(result.flash_attn).toBe(true);
  });

  it("defaults_for_cpu_uses_fp16_and_zero_gpu_layers", () => {
    const result = defaultTuningFor(baseModel, cpuDefaults, metadata);
    expect(result.cache_type_k).toBe("fp16");
    expect(result.cache_type_v).toBe("fp16");
    expect(result.flash_attn).toBe(false);
    expect(result.n_gpu_layers).toBe(0);
  });

  it("defaults_clamp_ctx_to_model_max", () => {
    const small: AvailableModel = { ...baseModel, max_context: 2048 };
    const result = defaultTuningFor(small, cudaDefaults, metadata);
    expect(result.ctx_size).toBe(2048);
  });

  it("defaults_use_metadata_layer_count_when_available", () => {
    const meta: ModelMetadata = { ...metadata, layer_count: 40 };
    const result = defaultTuningFor(baseModel, cudaDefaults, meta);
    expect(result.n_gpu_layers).toBe(40);
  });

  it("defaults_fallback_layer_count_when_metadata_missing", () => {
    const result = defaultTuningFor(baseModel, cudaDefaults, undefined);
    expect(result.n_gpu_layers).toBe(128);
  });

  it("defaults_seed_is_undefined", () => {
    const result = defaultTuningFor(baseModel, cudaDefaults, metadata);
    expect(result.seed).toBeUndefined();
  });

  it("defaults_threads_use_runtime_default", () => {
    const result = defaultTuningFor(baseModel, cudaDefaults, metadata);
    expect(result.threads).toBe(cudaDefaults.threads_default);
  });

  it("defaults_mmap_on_mlock_off_cont_batching_on", () => {
    const result = defaultTuningFor(baseModel, cudaDefaults, metadata);
    expect(result.mmap).toBe(true);
    expect(result.mlock).toBe(false);
    expect(result.cont_batching).toBe(true);
  });

  it("defaults_batch_sizes_match_rust_sensible_defaults", () => {
    const result = defaultTuningFor(baseModel, cudaDefaults, metadata);
    expect(result.n_batch).toBe(512);
    expect(result.n_ubatch).toBe(128);
    expect(result.n_parallel).toBe(1);
  });

  it("defaults_ctx_at_8192_when_model_max_is_higher", () => {
    const result = defaultTuningFor(baseModel, cudaDefaults, metadata);
    expect(result.ctx_size).toBe(8192);
  });

  it("defaults_ctx_at_8192_when_model_max_null", () => {
    const noMax: AvailableModel = { ...baseModel, max_context: null };
    const result = defaultTuningFor(noMax, cudaDefaults, metadata);
    expect(result.ctx_size).toBe(8192);
  });
});
