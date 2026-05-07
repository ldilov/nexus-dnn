import { apiFetch } from "./api_client";

export interface ActiveModelBinding {
  family_id: string;
  variant_id: string;
  artifact_id: string;
  absolute_path: string;
  label: string;
}

export function fetchActiveModel(
  threadId: string,
  signal?: AbortSignal,
): Promise<ActiveModelBinding | null> {
  return apiFetch<ActiveModelBinding | null>(
    // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
    `/extensions/nexus.local-llm/chat/threads/${encodeURIComponent(threadId)}/active_model`,
    { signal },
  );
}

export interface GenerationParams {
  temperature: number;
  top_p: number;
  top_k: number;
  max_tokens: number;
  repeat_penalty: number;
  system_prompt: string;
}

export const DEFAULT_GENERATION_PARAMS: GenerationParams = {
  temperature: 0.8,
  top_p: 0.95,
  top_k: 40,
  max_tokens: 4096,
  repeat_penalty: 1.1,
  system_prompt: "You are a helpful assistant.",
};

export function fetchGenerationSettings(
  threadId: string,
  signal?: AbortSignal,
): Promise<GenerationParams> {
  return apiFetch<GenerationParams>(
    // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
    `/extensions/nexus.local-llm/chat/threads/${encodeURIComponent(threadId)}/generation_settings`,
    { signal },
  );
}

export function setGenerationSettings(
  threadId: string,
  params: GenerationParams,
  signal?: AbortSignal,
): Promise<GenerationParams> {
  return apiFetch<GenerationParams>(
    // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
    `/extensions/nexus.local-llm/chat/threads/${encodeURIComponent(threadId)}/generation_settings`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      signal,
    },
  );
}

export type KvCacheKind = "fp16" | "q8_0" | "q4_0";

export type FlashAttnMode = "auto" | "on" | "off";

export function isFlashAttnEffectivelyOn(
  mode: FlashAttnMode | boolean | undefined,
): boolean {
  if (mode === undefined) return false;
  if (typeof mode === "boolean") return mode;
  return mode === "auto" || mode === "on";
}

export interface RuntimeTuning {
  n_gpu_layers?: number;
  threads?: number;
  flash_attn?: FlashAttnMode | boolean;
  ctx_size?: number;
  cache_type_k?: KvCacheKind;
  cache_type_v?: KvCacheKind;
  mmap?: boolean;
  mlock?: boolean;
  n_batch?: number;
  n_ubatch?: number;
  n_parallel?: number;
  cont_batching?: boolean;
  seed?: number;
  cache_reuse?: number;
  cram_mb?: number;
  checkpoint_every_n_tokens?: number;
  n_cpu_moe?: number;
  min_p?: number;
  dry_multiplier?: number;
  dry_base?: number;
  dry_allowed_length?: number;
  dry_penalty_last_n?: number;
  swa_full?: boolean;
  kv_unified?: boolean;
  lookup_decoding?: boolean;
  experts_per_token?: number;
}

export interface RuntimeDefaults {
  hardware_concurrency: number;
  threads_default: number;
  supports_cuda: boolean;
  platform: "windows" | "macos" | "linux";
}

export function fetchRuntimeDefaults(
  signal?: AbortSignal,
): Promise<RuntimeDefaults> {
  return apiFetch<RuntimeDefaults>("/backends/runtime-defaults", { signal });
}

export interface ActiveModelStatusPayload {
  status: "loading" | "ready" | "failed";
  family_id?: string;
  variant_id?: string;
  label?: string;
  reason?: string;
  binding?: ActiveModelBinding;
  lease_id?: string;
  port?: number;
}

export function setActiveModel(
  threadId: string,
  familyId: string,
  variantId: string,
  runtime?: RuntimeTuning,
  signal?: AbortSignal,
): Promise<ActiveModelStatusPayload> {
  const body: Record<string, unknown> = {
    family_id: familyId,
    variant_id: variantId,
  };
  if (runtime && Object.keys(runtime).length > 0) {
    body.runtime = runtime;
  }
  return apiFetch<ActiveModelStatusPayload>(
    // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
    `/extensions/nexus.local-llm/chat/threads/${encodeURIComponent(threadId)}/active_model`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    },
  );
}

export function unloadActiveModel(
  threadId: string,
  signal?: AbortSignal,
): Promise<void> {
  return apiFetch<void>(
    // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
    `/extensions/nexus.local-llm/chat/threads/${encodeURIComponent(threadId)}/active_model`,
    { method: "DELETE", signal },
  );
}

export function fetchActiveModelStatus(
  threadId: string,
  signal?: AbortSignal,
): Promise<ActiveModelStatusPayload | null> {
  return apiFetch<ActiveModelStatusPayload | null>(
    // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
    `/extensions/nexus.local-llm/chat/threads/${encodeURIComponent(threadId)}/active_model/status`,
    { signal },
  );
}

export function fetchRuntimeStatus(
  signal?: AbortSignal,
): Promise<ActiveModelStatusPayload | null> {
  return apiFetch<ActiveModelStatusPayload | null>(
    // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
    "/extensions/nexus.local-llm/chat/runtime_status",
    { signal },
  );
}

export interface AvailableModel {
  family_id: string;
  variant_id: string | null;
  label: string;
  format: string;
  size_bytes: number | null;
  max_context: number | null;
  is_moe: boolean;
  expert_layer_count: number | null;
}

interface AvailableModelsResponse {
  models: AvailableModel[];
}

export async function fetchAvailableModels(
  signal?: AbortSignal,
): Promise<AvailableModel[]> {
  const res = await apiFetch<AvailableModelsResponse>(
    // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
    `/extensions/nexus.local-llm/chat/available_models`,
    { signal },
  );
  return res.models;
}

export async function cancelInference(threadId: string): Promise<void> {
  try {
    await apiFetch<null>(
      // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
      `/extensions/nexus.local-llm/chat/threads/${encodeURIComponent(threadId)}/inference/cancel`,
      { method: "POST" },
    );
  } catch {
    /* fire-and-forget — TCP disconnect is the actual cancel pathway */
  }
}

export interface StreamStats {
  latencyMs: number;
  tokensPerSec?: number;
  promptTokens?: number;
  completionTokens?: number;
  params: {
    temperature: number;
    top_p: number;
    top_k: number;
    max_tokens: number;
    repeat_penalty: number;
  };
}

export interface StreamMessageHandlers {
  onToken: (delta: string) => void;
  onDone?: (stats: StreamStats) => void;
  onError?: (err: Error) => void;
}

export interface ChatTurn {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface StreamRequest {
  port: number;
  messages: ChatTurn[];
  systemPrompt?: string;
  temperature?: number;
  top_p?: number;
  top_k?: number;
  max_tokens?: number;
  repeat_penalty?: number;
  deploymentId?: string;
  threadId?: string;
  requestId?: string;
}

export function streamMessage(
  req: StreamRequest,
  handlers: StreamMessageHandlers,
): { abort: () => void } {
  const controller = new AbortController();
  const url = `http://127.0.0.1:${req.port}/v1/chat/completions`;
  const trimmedSystemPrompt = req.systemPrompt?.trim() ?? "";
  const fullMessages: ChatTurn[] =
    trimmedSystemPrompt.length > 0
      ? [{ role: "system" as const, content: req.systemPrompt as string }, ...req.messages]
      : req.messages;
  const samplerParams = {
    temperature: req.temperature ?? 0.8,
    top_p: req.top_p ?? 0.95,
    top_k: req.top_k ?? 40,
    max_tokens: req.max_tokens ?? 4096,
    repeat_penalty: req.repeat_penalty ?? 1.1,
  };
  const body: Record<string, unknown> = {
    messages: fullMessages,
    ...samplerParams,
    stream: true,
    stream_options: { include_usage: true },
  };
  if (req.deploymentId) body.deployment_id = req.deploymentId;
  if (req.threadId) body.thread_id = req.threadId;
  if (req.requestId) body.request_id = req.requestId;

  const startTs = performance.now();
  let firstTokenTs: number | null = null;
  const stats: StreamStats = {
    latencyMs: 0,
    params: { ...samplerParams },
  };

  let doneFired = false;
  const fireDone = () => {
    if (doneFired) return;
    doneFired = true;
    const now = performance.now();
    if (firstTokenTs != null && stats.tokensPerSec == null && stats.completionTokens) {
      const genSec = Math.max(1, now - firstTokenTs) / 1000;
      stats.tokensPerSec = stats.completionTokens / genSec;
    }
    stats.latencyMs = Math.round(
      firstTokenTs != null ? firstTokenTs - startTs : now - startTs,
    );
    handlers.onDone?.(stats);
  };

  const captureToken = (delta: string) => {
    if (firstTokenTs == null) firstTokenTs = performance.now();
    handlers.onToken(delta);
  };

  const captureUsage = (raw: unknown) => {
    if (!raw || typeof raw !== "object") return;
    const obj = raw as Record<string, unknown>;
    const usage = obj.usage as Record<string, unknown> | undefined;
    const timings = obj.timings as Record<string, unknown> | undefined;
    if (usage && typeof usage.completion_tokens === "number") {
      stats.completionTokens = usage.completion_tokens;
    }
    if (usage && typeof usage.prompt_tokens === "number") {
      stats.promptTokens = usage.prompt_tokens;
    }
    if (timings && typeof timings.predicted_per_second === "number") {
      stats.tokensPerSec = timings.predicted_per_second;
    }
  };

  (async () => {
    let res: Response;
    try {
      res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (e) {
      if (controller.signal.aborted) return;
      handlers.onError?.(e instanceof Error ? e : new Error(String(e)));
      return;
    }

    if (!res.ok || !res.body) {
      let msg = `HTTP ${res.status}`;
      try {
        const text = await res.text();
        try {
          const parsed = JSON.parse(text);
          msg = parsed?.error?.message ?? text.slice(0, 300) ?? msg;
        } catch {
          msg = text.slice(0, 300) || msg;
        }
      } catch {
        // ignore
      }
      handlers.onError?.(new Error(msg));
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf("\n\n")) >= 0) {
          const frame = buf.slice(0, idx);
          buf = buf.slice(idx + 2);
          handleFrame(frame, captureToken, captureUsage, fireDone);
        }
      }
      if (buf.trim().length > 0)
        handleFrame(buf, captureToken, captureUsage, fireDone);
      fireDone();
    } catch (e) {
      if (controller.signal.aborted) return;
      handlers.onError?.(e instanceof Error ? e : new Error(String(e)));
    }
  })();

  return { abort: () => controller.abort() };
}

function handleFrame(
  frame: string,
  onToken: (delta: string) => void,
  captureUsage: (raw: unknown) => void,
  fireDone: () => void,
): void {
  for (const rawLine of frame.split("\n")) {
    const line = rawLine.trim();
    if (!line || !line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (payload === "[DONE]") {
      fireDone();
      continue;
    }
    try {
      const json = JSON.parse(payload) as {
        choices?: Array<{ delta?: { content?: string } }>;
      };
      const delta = json.choices?.[0]?.delta?.content;
      if (delta) onToken(delta);
      captureUsage(json);
    } catch {
      // skip malformed frame
    }
  }
}
