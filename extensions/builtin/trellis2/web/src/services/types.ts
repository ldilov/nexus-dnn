export interface ErrorEnvelope {
  category?: string;
  message?: string;
  requestId?: string;
}

/** Memory residency profile for the worker — controls block-swap / offload. */
export type ResidencyProfile = "low_vram" | "balanced";

/** Tunable inputs for the single `trellis2.generate_3d` operator. The input
 * image ref is carried TOP-LEVEL in the start body, not inside params. */
export interface GenerateParams {
  seed?: number;
  /** O-Voxel sparse-structure flow steps. */
  sparse_steps?: number;
  /** Mesh/shape refinement flow steps. */
  shape_steps?: number;
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
