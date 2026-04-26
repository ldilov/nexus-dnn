export interface ModelDownloadProgress {
  familyId: string;
  state: "queued" | "downloading" | "verifying" | "extracting" | "complete" | "failed";
  percent: number;
  bytesDownloaded: number;
  bytesTotal: number;
  errorCategory?: string;
}

export const INDEXTTS_FAMILY_ID = "huggingface/IndexTeam/IndexTTS-2";

export async function startModelDownload(familyId: string): Promise<{ jobId: string }> {
  const resp = await fetch(`/api/v1/model-store/families/${encodeURIComponent(familyId)}/download`, {
    method: "POST",
    headers: { "content-type": "application/json" },
  });
  if (!resp.ok) {
    throw new Error(`Model download start failed: ${resp.status}`);
  }
  return (await resp.json()) as { jobId: string };
}

export function subscribeDownloadProgress(
  jobId: string,
  onEvent: (event: ModelDownloadProgress) => void,
  onError?: (err: Event) => void,
): () => void {
  const es = new EventSource(`/api/v1/model-store/jobs/${encodeURIComponent(jobId)}/progress`);
  es.onmessage = (ev) => {
    if (!ev.data) return;
    try {
      onEvent(JSON.parse(ev.data) as ModelDownloadProgress);
    } catch {
      /* drop malformed frame */
    }
  };
  // Without an onerror handler the browser silently retries the SSE
  // connection every 3 seconds forever on persistent failure (404,
  // network drop, host restart). Close on terminal error and surface
  // to the caller so the UI can decide whether to retry or show an
  // error state.
  es.onerror = (err) => {
    es.close();
    onError?.(err);
  };
  return () => es.close();
}
