import { apiFetch } from "./http";
import type { RenderJob } from "./types";

export async function listRenderJobs(limit = 25): Promise<{ jobs: RenderJob[] }> {
  return apiFetch(`/render/jobs?limit=${limit}`);
}

export async function getRenderJob(jobId: string): Promise<RenderJob> {
  return apiFetch(`/render/jobs/${jobId}`);
}
