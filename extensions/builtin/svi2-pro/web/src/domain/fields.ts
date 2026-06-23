import type { RenderParams } from "../services/types";

export type FieldTier =
  | "core"
  | "quality"
  | "coherence"
  | "identity"
  | "motion"
  | "transform"
  | "perf";

export type FieldControl = "number" | "slider" | "toggle" | "select";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldSpec {
  key: keyof RenderParams;
  label: string;
  tier: FieldTier;
  control: FieldControl;
  help: string;
  min?: number;
  max?: number;
  step?: number;
  default?: number | boolean | string;
  options?: FieldOption[];
  /** Select stores a number in params (option values are stringified). */
  numeric?: boolean;
}

export interface TierMeta {
  id: FieldTier;
  title: string;
  description: string;
  defaultCollapsed: boolean;
}

export const TIERS: TierMeta[] = [
  {
    id: "core",
    title: "Basics",
    description: "Resolution, length and playback — the essentials.",
    defaultCollapsed: false,
  },
  {
    id: "quality",
    title: "Quality",
    description: "Denoise steps, guidance, flow shift and seed.",
    defaultCollapsed: false,
  },
  {
    id: "coherence",
    title: "Coherence (canonical mechanics)",
    description: "Canonical chaining plus exact clip/size overrides. Change only for A/B.",
    defaultCollapsed: true,
  },
  {
    id: "transform",
    title: "Transform (let the prompt change the scene)",
    description: "Loosen the input-image grip so the prompt can reshape the scene. Off = input stays locked (default).",
    defaultCollapsed: true,
  },
  {
    id: "identity",
    title: "Identity (keep the look steady)",
    description: "Hold colour & identity steady across chained clips. Off = default; turn up only if later clips drift.",
    defaultCollapsed: true,
  },
  {
    id: "motion",
    title: "Motion (advanced, diagnostic)",
    description: "RoPE motion scaling. >1.5 deforms faces.",
    defaultCollapsed: true,
  },
  {
    id: "perf",
    title: "Performance / VRAM",
    description: "Block-swap. Higher = less VRAM (counterintuitive).",
    defaultCollapsed: true,
  },
];

export const FIELDS: FieldSpec[] = [
  {
    key: "num_clips",
    label: "Clips",
    tier: "coherence",
    control: "number",
    min: 1,
    max: 64,
    step: 1,
    default: 6,
    help: "Number of chained clips. Driven by the Length control; edit for exact counts.",
  },
  {
    key: "frames_per_clip",
    label: "Frames per clip",
    tier: "coherence",
    control: "number",
    min: 5,
    max: 129,
    step: 4,
    default: 85,
    help: "Must be 4n+1 (49, 65, 85, 129). 85 @ 16 fps ≈ 5.3s per segment.",
  },
  {
    key: "width",
    label: "Width (custom)",
    tier: "coherence",
    control: "number",
    min: 16,
    max: 1280,
    step: 16,
    default: 832,
    help: "Must be divisible by 16. Prefer the Generation resolution presets; 832×480 is the trained budget.",
  },
  {
    key: "height",
    label: "Height (custom)",
    tier: "coherence",
    control: "number",
    min: 16,
    max: 1280,
    step: 16,
    default: 480,
    help: "Must be divisible by 16. Off-budget weakens identity-lock.",
  },
  {
    key: "fps",
    label: "Render fps",
    tier: "core",
    control: "number",
    min: 1,
    max: 60,
    step: 1,
    default: 16,
    help: "Native render fps (playback speed). 16 is the SVI clip rate.",
  },
  {
    key: "interpolate_fps",
    label: "Interpolate to fps",
    tier: "core",
    control: "number",
    min: 0,
    max: 120,
    step: 1,
    default: 48,
    help: "Post-render target fps. Adds in-between frames, no speed-up. 0 = off.",
  },
  {
    key: "interpolate_method",
    label: "Interpolation",
    tier: "core",
    control: "select",
    default: "rife",
    options: [
      { value: "rife", label: "RIFE (auto)" },
      { value: "rife_torch", label: "RIFE torch" },
      { value: "rife_ncnn", label: "RIFE ncnn" },
      { value: "ffmpeg", label: "ffmpeg minterpolate" },
    ],
    help: "rife = torch IFNet on CUDA → ncnn → ffmpeg fallback.",
  },
  {
    key: "num_inference_steps",
    label: "Steps",
    tier: "quality",
    control: "number",
    min: 1,
    max: 100,
    step: 1,
    default: 50,
    help: "Denoise steps per clip. 50 = SVI reference. Fewer = faster, lower quality.",
  },
  {
    key: "cfg_scale",
    label: "Guidance (CFG)",
    tier: "quality",
    control: "slider",
    min: 1,
    max: 12,
    step: 0.5,
    default: 4.0,
    help: "SVI reference = 4.0. Higher = stronger prompt adherence (~1–6).",
  },
  {
    key: "sigma_shift",
    label: "Sigma shift",
    tier: "quality",
    control: "slider",
    min: 0,
    max: 20,
    step: 0.5,
    default: 5.0,
    help: "FlowMatch shift. Wan default 5.0. Lower (3.5–4.0) = more motion.",
  },
  {
    key: "switch_boundary",
    label: "MoE switch boundary",
    tier: "quality",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0.9,
    help: "When the high-noise (structure) expert hands off to the low-noise (detail) expert. Higher = switch sooner = more detail steps; lower = more structure steps. Wan2.2 = 0.9 (2 high + 2 low at 4 steps).",
  },
  {
    key: "solver",
    label: "Solver",
    tier: "quality",
    control: "select",
    default: "euler",
    options: [
      { value: "euler", label: "Euler (standard)" },
      { value: "euler_ancestral", label: "Euler ancestral (distill / lightx2v)" },
      { value: "heun", label: "Heun (2nd-order, ~2× slower)" },
    ],
    help: "Euler = standard flow step (fast). Euler ancestral = re-noises each step; matches ComfyUI euler_ancestral for distill (lightx2v) models. Heun = 2nd-order, ~2× render time. Heun disables TeaCache.",
  },
  {
    key: "sigma_preset",
    label: "Schedule",
    tier: "quality",
    control: "select",
    default: "auto",
    options: [
      { value: "auto", label: "Auto (flow-match)" },
      { value: "distilled_4step", label: "Distilled 4-step (lightx2v / Lightning)" },
    ],
    help: "Auto = standard flow-match for fp8/bf16 base models. Distilled 4-step = exact lightx2v/Lightning sigmas [1.0, 0.9375, 0.833, 0.625] for NVFP4-Sparse / Lightning-distilled weights — forces 4 steps (2 high + 2 low) + CFG off; Steps / Guidance / Sigma-shift are ignored. Pure-noise output on distilled weights means you need this.",
  },
  {
    key: "seed_multiplier",
    label: "Seed multiplier",
    tier: "quality",
    control: "number",
    min: 0,
    max: 1000000,
    step: 1,
    default: 42,
    help: "Per-clip seed = seed × clip_idx. Clip 0 always seed 0. Fix for reproducibility.",
  },
  {
    key: "pixel_re_encode",
    label: "Pixel re-encode",
    tier: "coherence",
    control: "toggle",
    default: false,
    help: "Keep OFF (canonical). On = decode→re-encode tail, injects drift. A/B only.",
  },
  {
    key: "stitch_mode",
    label: "Stitch mode",
    tier: "coherence",
    control: "select",
    default: "trim",
    options: [
      { value: "trim", label: "Trim (canonical)" },
      { value: "crossfade", label: "Crossfade" },
    ],
    help: "trim = concat + drop overlap (canonical). crossfade = blend seams.",
  },
  {
    key: "num_overlap_frame",
    label: "Overlap frames",
    tier: "coherence",
    control: "number",
    min: 1,
    max: 8,
    step: 1,
    default: 5,
    help: "Frames overlapped between clips. SVI reference = 5.",
  },
  {
    key: "num_motion_latent",
    label: "Motion latent frames",
    tier: "coherence",
    control: "number",
    min: 0,
    max: 5,
    step: 1,
    default: 1,
    help: "Latent frames carried as motion conditioning. SVI = 1. Higher can freeze motion.",
  },
  {
    key: "num_motion_frame",
    label: "Motion tail frames",
    tier: "coherence",
    control: "number",
    min: 1,
    max: 16,
    step: 1,
    default: 4,
    help: "Pixel frames for the motion tail / re-encode depth.",
  },
  {
    key: "image_cond_noise_scale",
    label: "ICN scale",
    tier: "transform",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0.0,
    help: "Loosens the input image's grip so the prompt can change the scene. 0 = input locked (default). 0.3–0.45 = transforms while keeping identity. 0.7+ = swaps the subject entirely.",
  },
  {
    key: "image_cond_noise_bg_protect",
    label: "ICN background protect",
    tier: "transform",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0.0,
    help: "Protects edges/background from the Transform change, focusing it on the centre. 0 = whole frame changes; 1 = corners/background kept.",
  },
  {
    key: "ref_pad_num",
    label: "Ref-pad slots",
    tier: "identity",
    control: "number",
    min: -1,
    max: 16,
    step: 1,
    default: 0,
    help: "Anchors each new clip back to the first frame — holds the look/identity, but costs motion. 0 = off (default). Higher = stronger anchor. -1 = max (freezes motion).",
  },
  {
    key: "adain_factor",
    label: "AdaIN factor",
    tier: "identity",
    control: "slider",
    min: 0,
    max: 1,
    step: 0.05,
    default: 0.0,
    help: "Keeps colour & skin-tone consistent across clips by matching each clip to clip 1. Fixes colour/brightness drift in later clips — not shape. 0 = off; 0.2–0.3 if colours shift; 0.5 = strong.",
  },
  {
    key: "blocks_to_swap",
    label: "Blocks to swap",
    tier: "perf",
    control: "slider",
    min: 0,
    max: 40,
    step: 1,
    default: 40,
    help: "DiT blocks offloaded to CPU. Higher = LESS VRAM (40 = lowest peak ~10 GiB). 40 is 16 GB-safe.",
  },
  {
    key: "fp8_compute",
    label: "FP8 compute",
    tier: "perf",
    control: "select",
    default: "bf16",
    options: [
      { value: "bf16", label: "bf16 dequant (Blackwell colour fix)" },
      { value: "scaled_mm", label: "fp8 rowwise _scaled_mm (faster)" },
    ],
    help: "bf16 = dequant→bf16 matmul (safe, slower). scaled_mm = per-row fp8 GEMM (faster; auto-falls back to bf16 if the kernel rejects it).",
  },
  {
    key: "teacache_multiplier",
    label: "TeaCache speedup",
    tier: "perf",
    control: "select",
    numeric: true,
    default: 1,
    options: [
      { value: "1", label: "Off (1×)" },
      { value: "1.25", label: "1.25× (near-lossless)" },
      { value: "1.5", label: "1.5×" },
      { value: "1.75", label: "1.75×" },
      { value: "2", label: "2× (softer)" },
      { value: "2.25", label: "2.25×" },
      { value: "2.5", label: "2.5× (artifacts likely)" },
    ],
    help: "Caches diffusion steps when frame-to-frame change is small — higher = faster but more ghosting/artifacts. Off = full quality.",
  },
];

export function fieldsForTier(tier: FieldTier): FieldSpec[] {
  return FIELDS.filter((f) => f.tier === tier);
}
