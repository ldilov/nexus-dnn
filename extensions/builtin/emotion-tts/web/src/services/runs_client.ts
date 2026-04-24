import { apiFetch, subscribeSse } from "./http";
import type {
  CreateRunRequest,
  CreateRunResponse,
  Preflight,
  ProgressEvent,
  Run,
  RunSummary,
  RunStatus,
  TestLineRequest,
  TestLineResponse,
} from "./types";

export async function listRuns(
  deploymentId: string,
  opts: { limit?: number; status?: RunStatus } = {},
): Promise<{ runs: RunSummary[] }> {
  const params = new URLSearchParams();
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.status) params.set("status", opts.status);
  const query = params.toString();
  const suffix = query ? `?${query}` : "";
  return apiFetch(`/deployments/${deploymentId}/runs${suffix}`);
}

export async function createRun(
  deploymentId: string,
  body: CreateRunRequest,
): Promise<CreateRunResponse> {
  return apiFetch(`/deployments/${deploymentId}/runs`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function getRun(deploymentId: string, runId: string): Promise<Run> {
  return apiFetch(`/deployments/${deploymentId}/runs/${runId}`);
}

export async function cancelRun(
  deploymentId: string,
  runId: string,
): Promise<{ status: "cancelled" | "cancelling" }> {
  return apiFetch(`/deployments/${deploymentId}/runs/${runId}/cancel`, { method: "POST" });
}

export async function testLine(
  deploymentId: string,
  body: TestLineRequest,
): Promise<TestLineResponse> {
  return apiFetch(`/deployments/${deploymentId}/runs/test-line`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function subscribeRunProgress(
  deploymentId: string,
  runId: string,
  onEvent: (event: ProgressEvent) => void,
  onError?: (err: Event) => void,
): () => void {
  return subscribeSse<ProgressEvent>(
    `/deployments/${deploymentId}/runs/${runId}/progress`,
    onEvent,
    onError,
  );
}

export function extractPreflight(resp: CreateRunResponse): Preflight {
  return resp.preflight;
}
