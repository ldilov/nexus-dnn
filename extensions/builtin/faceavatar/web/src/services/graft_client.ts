import { apiFetch } from "./http";
import type { GraftParams } from "./types";

export interface StartGraftRequest {
  /** Host artifact ref / media ref of the base mesh GLB to graft onto. */
  base_mesh: string;
  /** Host artifact ref of the uploaded input photo (from POST /uploads). */
  image: string;
  params: GraftParams;
}

export interface StartGraftResponse {
  jobId: string;
}

export async function startGraft(
  body: StartGraftRequest,
): Promise<StartGraftResponse> {
  return apiFetch("/graft/start", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
