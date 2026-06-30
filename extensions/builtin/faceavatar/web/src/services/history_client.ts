import { apiFetch } from "./http";
import type { GenerationJob } from "./types";

export async function listGenerationJobs(limit = 25): Promise<{ jobs: GenerationJob[] }> {
  return apiFetch(`/generate/jobs?limit=${limit}`);
}

export async function getGenerationJob(jobId: string): Promise<GenerationJob> {
  return apiFetch(`/generate/jobs/${encodeURIComponent(jobId)}`);
}

/** Remove a generation job from history. The produced GLB (if any) stays on disk. */
export async function deleteGenerationJob(jobId: string): Promise<void> {
  await apiFetch(`/generate/jobs/${encodeURIComponent(jobId)}`, { method: "DELETE" });
}
