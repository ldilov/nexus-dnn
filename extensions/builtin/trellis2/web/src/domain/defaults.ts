import type { GenerateParams } from "../services/types";

/** Operator defaults for `trellis2.generate_3d`. MVP-0 ships MeshOnly
 * (texture OFF). The input image is supplied top-level, not in params.
 * These mirror the worker defaults so the form can always send the full set. */
export const DEFAULT_PARAMS: GenerateParams = {
  seed: 0,
  pipeline_type: "1024_cascade",
  sparse_steps: 12,
  shape_steps: 12,
  texture_steps: 12,
  max_num_tokens: 49_152,
  texture_size: 2048,
  metallic: 0,
  simplify_target: 1_000_000,
  texture: false,
  residency: "balanced",
};
