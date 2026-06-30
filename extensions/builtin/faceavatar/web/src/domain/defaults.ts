import type { GenerateParams, ProjectParams, RefineParams } from "../services/types";

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
  remove_background: true,
  residency: "balanced",
};

/** Defaults for the geometry-refine pass. A refine re-samples the WHOLE shape, so
 * it must run at least as strong as a good generate (1536 / 25 steps / high token
 * budget) or it downgrades the mesh; max_views lets the source image plus an
 * optional face crop both condition the recovered detail. */
export const DEFAULT_REFINE_PARAMS: RefineParams = {
  resolution: 1536,
  max_views: 4,
  shape_steps: 25,
  texture_steps: 25,
  max_num_tokens: 98_304,
};

/** Defaults for the photo-projection pass. v1 projects the source photo from a
 * straight-on front view (azimuth/elevation 0) at a high texture resolution so the
 * mesh inherits the real photo's likeness without re-sampling geometry. */
export const DEFAULT_PROJECT_PARAMS: ProjectParams = {
  azimuth: 0,
  elevation: 0,
  texture_size: 4096,
};
