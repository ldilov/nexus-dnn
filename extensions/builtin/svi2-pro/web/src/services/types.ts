export interface ErrorEnvelope {
  category?: string;
  message?: string;
  requestId?: string;
}

export type GenerationMode = "image_to_video" | "text_to_video";
export type SviLoraTier = "high" | "low" | "off";
export type TorchCompileMode = "default" | "reduce-overhead" | "max-autotune";
export type InterpolateMethod = "rife" | "rife_torch" | "rife_ncnn" | "ffmpeg";
export type StitchMode = "trim" | "crossfade";
export type UpscaleQuality =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "ULTRA"
  | "HIGHBITRATE_LOW"
  | "HIGHBITRATE_MEDIUM"
  | "HIGHBITRATE_HIGH"
  | "HIGHBITRATE_ULTRA";
export type UpscaleModel =
  | "auto"
  | "maxine"
  | "drct-l-hq"
  | "drct-l-real"
  | "hat-l"
  | "swinir-l"
  | "realesrgan";

export interface RenderParams {
  mode?: GenerationMode;
  ref_image_path: string;
  prompts: string[];
  last_image_path?: string | null;
  num_clips?: number;
  width?: number;
  height?: number;
  fps?: number;
  interpolate_fps?: number;
  interpolate_method?: InterpolateMethod;
  upscale_factor?: number;
  upscale_quality?: UpscaleQuality;
  upscale_model?: UpscaleModel;
  frames_per_clip?: number;
  num_inference_steps?: number;
  sigma_shift?: number;
  switch_boundary?: number;
  stitch_mode?: StitchMode;
  ref_pad_num?: number;
  adain_factor?: number;
  cfg_scale?: number;
  num_overlap_frame?: number;
  num_motion_latent?: number;
  image_cond_noise_scale?: number;
  image_cond_noise_bg_protect?: number;
  pixel_re_encode?: boolean;
  num_motion_frame?: number;
  blocks_to_swap?: number;
  teacache_multiplier?: number;
  solver?: "euler" | "heun";
  use_torch_compile?: boolean;
  torch_compile_mode?: TorchCompileMode;
  svi_lora_tier?: SviLoraTier;
  attention?: string;
  seed?: number;
  seed_multiplier?: number;
  requires_last_image?: boolean;
  output_path?: string;
  models_dir?: string;
  dit_high_path?: string | null;
  dit_low_path?: string | null;
  user_loras?: Array<{ path: string; weight: number }>;
}

export interface PresetSummary {
  id: string;
  label: string;
  description: string;
  params: Partial<RenderParams>;
  notes?: string;
  legacy?: boolean;
  hidden?: boolean;
}

export interface PresetCatalog {
  version: number;
  description: string;
  presets: PresetSummary[];
}

export type RenderJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface RenderReport {
  frames?: number;
  duration_seconds?: number;
  vram_peak_gib?: number;
  sha256?: string;
  resolution_warning?: string | null;
  [key: string]: unknown;
}

export interface RenderJob {
  id: string;
  presetId: string | null;
  params: RenderParams;
  status: RenderJobStatus;
  outputPath: string | null;
  renderReport: RenderReport | null;
  errorCode: number | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ExtensionSettings {
  modelsDir: string;
  attentionBackend: string;
  fp8Compute: string;
  blocksToSwap: number;
  interpolateMethod: InterpolateMethod;
  interpolateFps: number;
  outputDir: string;
  baseModelFamilyId?: string;
  ditHighPath?: string;
  ditLowPath?: string;
  sviLoraTier?: SviLoraTier;
}

export interface InstalledModelArtifact {
  artifact_id: string;
  family_id: string;
  variant_id: string | null;
  format: string;
  role: string;
  filename: string;
  size_bytes: number | null;
  source_repo: string;
  install_path: string | null;
}

export interface InstalledModelsIndex {
  family_ids: string[];
  installed: InstalledModelArtifact[];
  truncated: boolean;
}
