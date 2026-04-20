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
