import { apiFetch } from "./http";
import type { RenderJob } from "./types";

export async function listRenderJobs(limit = 25): Promise<{ jobs: RenderJob[] }> {
  return apiFetch(`/render/jobs?limit=${limit}`);
}

export async function getRenderJob(jobId: string): Promise<RenderJob> {
  return apiFetch(`/render/jobs/${jobId}`);
}

/** Remove a render job from history. The produced mp4 (if any) stays on disk. */
export async function deleteRenderJob(jobId: string): Promise<void> {
  await apiFetch(`/render/jobs/${encodeURIComponent(jobId)}`, { method: "DELETE" });
}
