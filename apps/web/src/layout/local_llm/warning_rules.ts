import {
  isFlashAttnEffectivelyOn,
  type AvailableModel,
  type RuntimeTuning,
} from "../../services/local_llm_chat";

export type WarningSeverity = "info" | "warning" | "error";

export interface WarningAction {
  label: string;
  apply: (form: RuntimeTuning) => Partial<RuntimeTuning>;
}

export interface WarningContext {
  form: RuntimeTuning;
  model: AvailableModel | null;
}

export interface WarningRule {
  id: string;
  predicate: (ctx: WarningContext) => boolean;
  severity: WarningSeverity;
  copy: string;
  action?: WarningAction;
}

function isGemma3(model: AvailableModel | null): boolean {
  if (!model) return false;
  const id = (model.family_id ?? "").toLowerCase();
  return id.includes("gemma-3") || id.includes("gemma3");
}

export const WARNING_RULES: WarningRule[] = [
  {
    id: "gemma3-flash-q8",
    severity: "warning",
    copy:
      "Flash Attention + Q8 KV is known to collapse Gemma 3 GPU utilization (drops to 20-30%). Recommend FP16 KV.",
    predicate: ({ form, model }) =>
      isGemma3(model) &&
      isFlashAttnEffectivelyOn(form.flash_attn) &&
      (form.cache_type_k === "q8_0" || form.cache_type_v === "q8_0"),
    action: {
      label: "Force FP16 KV",
      apply: () => ({ cache_type_k: "fp16", cache_type_v: "fp16" }),
    },
  },
  {
    id: "top-k-zero",
    severity: "info",
    copy:
      "top_k=0 disables filtering and causes a measured ~2-5x slowdown (llama.cpp #15223). Clamped to 40.",
    predicate: () => false,
  },
  {
    id: "n-parallel-advisory",
    severity: "info",
    copy:
      "Each slot reserves a full KV cache (~ ctx_size * KV bytes per slot). n_parallel > 1 is for multi-user serving — not real concurrent batching for single-user chat.",
    predicate: ({ form }) => (form.n_parallel ?? 1) > 1,
  },
  {
    id: "cpu-batch-regression",
    severity: "warning",
    copy:
      "CPU-only workloads regress above batch size 1024 (llama.cpp #6075). Lower n_batch unless you have profiled otherwise.",
    predicate: ({ form }) =>
      (form.n_gpu_layers ?? 0) === 0 && (form.n_batch ?? 0) > 1024,
  },
];

export function activeWarnings(ctx: WarningContext): WarningRule[] {
  return WARNING_RULES.filter((rule) => rule.predicate(ctx));
}
