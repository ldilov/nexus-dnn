import type { GenerateParams, GraftParams } from "../services/types";

/** Operator defaults for `faceavatar.generate_head`. Texture defaults ON
 * (back-project the real photo); neutral expression; bust crop. The input
 * photo is supplied top-level, not in params. */
export const DEFAULT_PARAMS: GenerateParams = {
  seed: 0,
  expression: "neutral",
  texture: true,
  crop: "bust",
  arc_iters: 600,
  residency: "balanced",
};

/** Defaults for `faceavatar.graft_head`. Keep the base hair/back, weld at the
 * neck with a moderate Laplacian blend, landmark auto-align, blend textures. */
export const DEFAULT_GRAFT_PARAMS: GraftParams = {
  seed: 0,
  seam: "neck",
  keep_hair: true,
  blend_ring: 0.35,
  align: "landmark",
  texture_blend: true,
  arc_iters: 600,
  residency: "balanced",
};
