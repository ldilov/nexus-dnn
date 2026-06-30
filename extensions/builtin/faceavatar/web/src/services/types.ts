export interface ErrorEnvelope {
  category?: string;
  message?: string;
  requestId?: string;
}

/** Memory residency profile for the worker — controls block-swap / offload. */
export type ResidencyProfile = "low_vram" | "balanced";

/** FLAME expression applied to the fitted identity head. */
export type ExpressionMode = "neutral" | "source";

/** Crop framing of the produced bust. */
export type CropMode = "bust" | "head";

/** Tunable inputs for the `faceavatar.generate_head` operator. The input photo
 * ref is carried TOP-LEVEL in the start body, not inside params. */
export interface GenerateParams {
  seed?: number;
  /** FLAME expression: neutral or copy the photo's expression. */
  expression?: ExpressionMode;
  /** Back-project the real photo as texture (default true). */
  texture?: boolean;
  /** Bust vs head crop (default bust). */
  crop?: CropMode;
  /** Arc2Avatar per-image optimization steps — latency/quality knob. */
  arc_iters?: number;
  residency?: ResidencyProfile;
}

/** Where the FLAME face-shell is cut into the base mesh. */
export type SeamMode = "neck" | "hairline";

/** Landmark auto-align vs a manual fallback transform. */
export type AlignMode = "landmark" | "manual";

/** Tunable inputs for the `faceavatar.graft_head` operator. The base_mesh +
 * photo refs are carried TOP-LEVEL in the start body, not inside params. */
export interface GraftParams {
  seed?: number;
  /** Cut/weld boundary: neck ring or hairline. */
  seam?: SeamMode;
  /** Keep the base mesh's hair/back (default true). */
  keep_hair?: boolean;
  /** Laplacian blend width at the seam, 0..1. */
  blend_ring?: number;
  /** Landmark auto-align or manual transform. */
  align?: AlignMode;
  /** Blend textures across the seam (default true). */
  texture_blend?: boolean;
  /** Arc2Avatar per-image optimization steps — latency/quality knob. */
  arc_iters?: number;
  residency?: ResidencyProfile;
}

export type GenerationJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

/** Which operator produced a job — drives history badges + base-mesh sourcing. */
export type JobKind = "generate" | "graft";

/** The metadata_json object the worker attaches to a finished mesh. Shape is
 * open — only the fields the UI surfaces are typed; the rest pass through. */
export interface GenerationMetadata {
  attention_backend?: string;
  compute_cap?: string;
  stage_timings?: Record<string, number>;
  mesh?: { vertices?: number; faces?: number };
  textured?: boolean;
  identity_score?: number;
  seam?: string;
  sha256?: string;
  [key: string]: unknown;
}

export interface GenerationJob {
  id: string;
  /** Which operator produced this job. */
  kind: JobKind;
  /** Host artifact ref of the input photo (soft FK). */
  inputImageRef: string;
  /** Host artifact ref of the base mesh for graft jobs; null for generate. */
  baseMeshRef: string | null;
  /** Params union — generate or graft, by `kind`. */
  params: GenerateParams | GraftParams;
  status: GenerationJobStatus;
  /** Media ref of the produced GLB (mime model/gltf-binary) → GET /media/{glbRef}. */
  glbRef: string | null;
  metadata: GenerationMetadata | null;
  errorCode: number | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}
