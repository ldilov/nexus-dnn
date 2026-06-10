import { apiFetch, subscribeSse } from "./http";
import type { RenderFrame } from "./render_events";
import type { RenderParams } from "./types";

export interface StartRenderRequest {
  presetId: string | null;
  params: RenderParams;
}

export interface StartRenderResponse {
  jobId: string;
}

export async function startRender(body: StartRenderRequest): Promise<StartRenderResponse> {
  return apiFetch("/render/start", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function cancelRender(jobId: string): Promise<{ status: "cancelled" | "cancelling" }> {
  return apiFetch(`/render/jobs/${jobId}/cancel`, { method: "POST", body: "{}" });
}

export function subscribeRenderStream(
  jobId: string,
  onFrame: (frame: RenderFrame) => void,
  onError?: (err: Event) => void,
): () => void {
  return subscribeSse<RenderFrame>(`/render/jobs/${jobId}/events`, onFrame, onError);
}
