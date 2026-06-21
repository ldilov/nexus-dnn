import type { ExtensionSettings } from "../services/types";

export const ATTENTION_OPTIONS = [
  { value: "auto", label: "Auto (flash2 → sdpa)" },
  { value: "sdpa", label: "SDPA (always works)" },
  { value: "flash2", label: "Flash Attention 2 (recommended)" },
  { value: "flash3_fp4", label: "FlashAttention 3 FP4" },
  { value: "sage2", label: "SageAttention 2" },
  { value: "sage3_fp4", label: "SageAttention 3 FP4" },
] as const;

export const FP8_COMPUTE_OPTIONS = [
  { value: "bf16", label: "bf16 (Blackwell colour fix, recommended)" },
  { value: "fp8", label: "fp8" },
] as const;

export const SVI_LORA_TIER_OPTIONS = [
  { value: "high", label: "High-noise SVI LoRA" },
  { value: "low", label: "Low-noise SVI LoRA" },
  { value: "off", label: "No SVI LoRA" },
] as const;

export const TORCH_COMPILE_MODE_OPTIONS = [
  { value: "default", label: "Default (inductor)" },
  { value: "reduce-overhead", label: "Reduce-overhead (CUDA graphs)" },
  { value: "max-autotune", label: "Max-autotune (slow first build)" },
] as const;

export const DEFAULT_SETTINGS: ExtensionSettings = {
  modelsDir: "",
  attentionBackend: "flash2",
  fp8Compute: "bf16",
  blocksToSwap: 40,
  interpolateMethod: "rife",
  interpolateFps: 48,
  fastParallel: true,
  batchPromptEncode: false,
  outputDir: "",
  baseModelFamilyId: "",
  ditHighPath: "",
  ditLowPath: "",
  sviLoraTier: "high",
};

export const BUNDLED_BASE_MODEL_LABEL = "Wan2.2-I2V-A14B fp8 (Kijai, bundled)";
