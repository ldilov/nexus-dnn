export interface ErrorEnvelope {
  category?: string;
  message?: string;
  requestId?: string;
}

export type InterpolateMethod = "rife" | "rife_torch" | "rife_ncnn" | "ffmpeg";
export type StitchMode = "trim" | "crossfade";

export interface RenderParams {
  ref_image_path: string;
  prompts: string[];
  last_image_path?: string | null;
  num_clips?: number;
  width?: number;
  height?: number;
  fps?: number;
  interpolate_fps?: number;
  interpolate_method?: InterpolateMethod;
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
  seed_multiplier?: number;
  output_path?: string;
  models_dir?: string;
}

export interface PresetSummary {
  id: string;
  label: string;
  description: string;
  params: Partial<RenderParams>;
  notes?: string;
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
}
