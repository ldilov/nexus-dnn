import type { GenerateParams } from "../services/types";

/** Operator defaults for `trellis2.generate_3d`. MVP-0 ships MeshOnly
 * (texture OFF). The input image is supplied top-level, not in params. */
export const DEFAULT_PARAMS: GenerateParams = {
  seed: 0,
  sparse_steps: 12,
  shape_steps: 12,
  simplify_target: 1_000_000,
  texture: false,
  residency: "balanced",
};
