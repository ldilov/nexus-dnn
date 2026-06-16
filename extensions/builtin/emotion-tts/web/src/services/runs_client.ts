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

/** Issue several runs concurrently — the unit of worker concurrency is the run,
 * so fanning out N payloads lets the pool process them across N workers in
 * parallel (storyboard chunked generation). */
export async function createRuns(
  deploymentId: string,
  payloads: readonly CreateRunRequest[],
): Promise<CreateRunResponse[]> {
  return Promise.all(payloads.map((p) => createRun(deploymentId, p)));
}

/** Split jobs into `min(max(workers,1), jobs.length)` balanced contiguous
 * chunks, preserving order. Earlier chunks absorb the remainder so the largest
 * chunks come first (12/3 → [4,4,4]; 5/3 → [2,2,1]; 2/4 → [1,1]; 0 → []). */
export function chunkJobs<T>(jobs: readonly T[], workers: number): T[][] {
  if (jobs.length === 0) return [];
  const count = Math.min(Math.max(Math.floor(workers), 1), jobs.length);
  const base = Math.floor(jobs.length / count);
  const remainder = jobs.length % count;
  const chunks: T[][] = [];
  let cursor = 0;
  for (let i = 0; i < count; i += 1) {
    const size = base + (i < remainder ? 1 : 0);
    chunks.push(jobs.slice(cursor, cursor + size));
    cursor += size;
  }
  return chunks;
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

export interface ResumeRunResponse {
  runId: string;
  originalRunId: string;
  queuePosition: number;
}

export async function resumeRun(
  deploymentId: string,
  runId: string,
): Promise<ResumeRunResponse> {
  return apiFetch(`/deployments/${deploymentId}/runs/${runId}/resume`, {
    method: "POST",
    body: "{}",
  });
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
