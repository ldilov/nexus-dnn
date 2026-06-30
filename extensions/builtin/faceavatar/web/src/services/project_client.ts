import { apiFetch } from "./http";
import type { ProjectParams } from "./types";

export interface StartProjectRequest {
  /** Media ref of the finished GLB mesh to texture (from a prior generation). */
  mesh: string;
  /** Host artifact ref of the source input image to project onto the mesh. */
  image: string;
  params: ProjectParams;
}

export interface StartProjectResponse {
  jobId: string;
}

export async function startProject(
  body: StartProjectRequest,
): Promise<StartProjectResponse> {
  return apiFetch("/project/start", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
