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
    `/extensions/local-llm/chat/threads/${encodeURIComponent(threadId)}/active_model`,
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
    `/extensions/local-llm/chat/threads/${encodeURIComponent(threadId)}/generation_settings`,
    { signal },
  );
}

export function setGenerationSettings(
  threadId: string,
  params: GenerationParams,
  signal?: AbortSignal,
): Promise<GenerationParams> {
  return apiFetch<GenerationParams>(
    `/extensions/local-llm/chat/threads/${encodeURIComponent(threadId)}/generation_settings`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
      signal,
    },
  );
}

export function setActiveModel(
  threadId: string,
  familyId: string,
  variantId: string,
  signal?: AbortSignal,
): Promise<ActiveModelBinding | null> {
  return apiFetch<ActiveModelBinding | null>(
    `/extensions/local-llm/chat/threads/${encodeURIComponent(threadId)}/active_model`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ family_id: familyId, variant_id: variantId }),
      signal,
    },
  );
}
