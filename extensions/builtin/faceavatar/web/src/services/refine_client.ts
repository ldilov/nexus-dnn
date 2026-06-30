import { apiFetch } from "./http";
import type { RefineParams } from "./types";

export interface StartRefineRequest {
  /** Media ref of the finished GLB mesh to refine (from a prior generation). */
  mesh: string;
  /** Host artifact ref of the source input image the mesh was built from. */
  image: string;
  /** Optional host artifact ref of a high-res face crop used as a 2nd view. */
  face_image?: string;
  params: RefineParams;
}

export interface StartRefineResponse {
  jobId: string;
}

export async function startRefine(
  body: StartRefineRequest,
): Promise<StartRefineResponse> {
  return apiFetch("/refine/start", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
