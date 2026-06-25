import { apiFetch, subscribeSse } from "./http";
import type { GenerateFrame } from "./generate_events";
import type { GenerateParams } from "./types";

export interface StartGenerateRequest {
  /** Host artifact ref of the uploaded input image (from POST /uploads). */
  image: string;
  params: GenerateParams;
}

export interface StartGenerateResponse {
  jobId: string;
}

export async function startGenerate(
  body: StartGenerateRequest,
): Promise<StartGenerateResponse> {
  return apiFetch("/generate/start", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function cancelGenerate(
  jobId: string,
): Promise<{ status: "cancelled" | "cancelling" }> {
  return apiFetch(`/generate/jobs/${encodeURIComponent(jobId)}/cancel`, {
    method: "POST",
    body: "{}",
  });
}

export function subscribeGenerateStream(
  jobId: string,
  onFrame: (frame: GenerateFrame) => void,
  onError?: (err: Event) => void,
): () => void {
  return subscribeSse<GenerateFrame>(
    `/generate/jobs/${encodeURIComponent(jobId)}/events`,
    onFrame,
    onError,
  );
}
