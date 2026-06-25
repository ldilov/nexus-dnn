export interface ErrorEnvelope {
  category?: string;
  message?: string;
  requestId?: string;
}

/** Memory residency profile for the worker — controls block-swap / offload. */
export type ResidencyProfile = "low_vram" | "balanced";

/** TRELLIS 2 pipeline preset — trades detail for speed/VRAM. */
export type PipelineType = "512" | "1024" | "1024_cascade" | "1536_cascade";

/** Tunable inputs for the single `trellis2.generate_3d` operator. The input
 * image ref is carried TOP-LEVEL in the start body, not inside params. */
export interface GenerateParams {
  seed?: number;
  /** Detail/quality pipeline preset. Higher = more detail, more VRAM. */
  pipeline_type?: PipelineType;
  /** O-Voxel sparse-structure flow steps. */
  sparse_steps?: number;
  /** Mesh/shape refinement flow steps. */
  shape_steps?: number;
  /** Texture-bake refinement flow steps. */
  texture_steps?: number;
  /** Advanced VRAM/quality cap on the token budget. */
  max_num_tokens?: number;
  /** Baked texture resolution in pixels (square). */
  texture_size?: number;
  /** Metallic factor 0..1 baked into the material (0 = matte/dielectric). */
  metallic?: number;
  /** Target triangle budget for decimation. */
  simplify_target?: number;
  /** Bake a texture onto the mesh. MVP-0 default OFF (MeshOnly). */
  texture?: boolean;
  residency?: ResidencyProfile;
}

export type GenerationJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

/** The metadata_json object the worker attaches to a finished mesh. Shape is
 * open — only the fields the UI surfaces are typed; the rest pass through. */
export interface GenerationMetadata {
  attention_backend?: string;
  compute_cap?: string;
  stage_timings?: Record<string, number>;
  mesh?: { vertices?: number; faces?: number };
  textured?: boolean;
  sha256?: string;
  [key: string]: unknown;
}

export interface GenerationJob {
  id: string;
  /** Host artifact ref of the input image (soft FK). */
  inputImageRef: string;
  params: GenerateParams;
  status: GenerationJobStatus;
  /** Media ref of the produced GLB (mime model/gltf-binary) → GET /media/{glbRef}. */
  glbRef: string | null;
  metadata: GenerationMetadata | null;
  errorCode: number | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}
