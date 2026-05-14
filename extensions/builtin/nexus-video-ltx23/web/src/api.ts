export const API_BASE = "/api/v1/extensions/nexus.video.ltx23";

export type RuntimeProfilePreference =
  | "auto"
  | "rtx50-nvfp4"
  | "rtx50-fp8"
  | "rtx40-fp8";

export type QualityPreset =
  | "draft"
  | "balanced_16gb"
  | "quality_16gb"
  | "high";

export interface AdvancedSettings {
  /** Classifier-Free Guidance scale ("temperature"). 1.0–7.0. Default 4.0. */
  guidance_scale?: number;
  /** Denoising steps. 4–30. Default 8 (distilled model). */
  num_inference_steps?: number;
  segment_seconds?: number;
  overlap_seconds?: number;
  output_fps?: number;
}

export interface SceneSpec {
  /** What happens in this scene. Composed with character + style anchors. */
  prompt: string;
  /** Defaults to duration_seconds / scenes.length when omitted. */
  duration_seconds?: number;
  /** Per-scene seed override; otherwise derived from the master seed. */
  seed?: number;
}

export interface CreateRenderRequest {
  prompt: string;
  negative_prompt?: string;
  /** Visual-style anchor appended to every scene. e.g. "moody noir,
   * deep teal shadows, neon highlights, 35mm film grain". */
  style_prompt?: string;
  /** Character anchor prepended to every scene. e.g. "a woman in a red
   * coat, short black hair, brown eyes". Strongest tool combined with
   * image conditioning for character preservation. */
  character_prompt?: string;
  /** Optional per-scene script. When empty, global `prompt` drives
   * every segment. */
  scenes?: SceneSpec[];
  duration_seconds: number;
  runtime_profile: RuntimeProfilePreference;
  quality_preset: QualityPreset;
  seed?: number;
  advanced?: AdvancedSettings;
}

export interface RenderPlanSegment {
  index: number;
  start_time_seconds: number;
  duration_seconds: number;
  frame_count: number;
  seed: number;
}

export interface RenderPlan {
  mode: string;
  width: number;
  height: number;
  base_fps: number;
  output_fps: number;
  requested_duration_seconds: number;
  planned_duration_seconds: number;
  segment_count: number;
  segments: RenderPlanSegment[];
  runtime_profile: string;
  gpu_memory_budget_mb: number;
  interpolation: string;
  vram_risk: "safe" | "moderate" | "risky" | "likely_to_fail" | "unsupported";
  warnings: Array<{ code: string; message: string }>;
}

export interface RuntimeProfileSummary {
  runtime_id: string;
  display_name: string;
  installed: boolean;
  healthy: boolean;
  experimental: boolean;
  status_message: string;
}

export interface RenderRunSegment {
  index: number;
  status: string;
  duration_seconds: number;
  started_at?: string | null;
  completed_at?: string | null;
}

export interface RenderRun {
  id: string;
  project_id: string;
  status: string;
  runtime_profile?: string | null;
  progress_percent: number;
  segment_count: number;
  completed_segments: number;
  requested_duration_seconds: number;
  planned_duration_seconds?: number | null;
  width: number;
  height: number;
  base_fps: number;
  output_fps: number;
  final_artifact_id?: string | null;
  error_code?: string | null;
  error_message?: string | null;
  created_at: string;
  started_at?: string | null;
  completed_at?: string | null;
  segments: RenderRunSegment[];
  /** Rung 7L observability: number of transparent VRAM-supervisor
   * restarts that have happened so far on this run. 0 for clean runs. */
  restart_count: number;
  /** Cap this run is running under (snapshot of
   * `NEXUS_VIDEO_LTX23_VRAM_MAX_RESTARTS` at insert time). */
  max_restart_count: number;
}

async function jsonRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${body}`);
  }
  return (await res.json()) as T;
}

export const ltxApi = {
  health: () => jsonRequest<{ status: string; version: string }>("/health"),
  listProfiles: () => jsonRequest<RuntimeProfileSummary[]>("/runtime-profiles"),
  plan: (req: CreateRenderRequest) =>
    jsonRequest<RenderPlan>("/recipe/plan", {
      method: "POST",
      body: JSON.stringify(req),
    }),
  createRender: (req: CreateRenderRequest) =>
    jsonRequest<{ id: string; status: string; runtime_profile: string }>(
      "/renders",
      { method: "POST", body: JSON.stringify(req) },
    ),
  getRender: (runId: string) => jsonRequest<RenderRun>(`/renders/${runId}`),
  cancel: (runId: string) =>
    jsonRequest<void>(`/renders/${runId}/cancel`, { method: "POST" }),
  retrySegment: (runId: string, segmentIndex: number) =>
    jsonRequest<void>(`/renders/${runId}/retry-segment`, {
      method: "POST",
      body: JSON.stringify({ segment_index: segmentIndex }),
    }),
};

export function artifactUrl(artifactId: string): string {
  return `${API_BASE}/artifacts/${artifactId}`;
}

const HOST_BASE = "/api/v1";
const EXTENSION_ID = "nexus.video.ltx23";

export type DepStepStatus =
  | "pending"
  | "running"
  | "ok"
  | "failed"
  | "skipped";

export interface DepStep {
  id: string;
  type: string;
  status: DepStepStatus;
  satisfied: boolean;
  artifact?: { summary: string } | null;
  last_error?: { category: string; message: string } | null;
}

export interface DepStatus {
  steps: DepStep[];
  all_satisfied: boolean;
}

async function hostJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${HOST_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status}: ${body}`);
  }
  const wire = (await res.json()) as { data: T };
  return wire.data;
}

export const hostApi = {
  listDependencies: () =>
    hostJson<DepStatus>(`/extensions/${EXTENSION_ID}/dependencies`),
  startInstall: (force = false) =>
    hostJson<{ install_run_id: string; started_at: string }>(
      `/extensions/${EXTENSION_ID}/install${force ? "?force=true" : ""}`,
      { method: "POST" },
    ),
};

export interface ProfileInstallStatus {
  profile: string;
  installed: boolean;
  repo: string | null;
  dest: string | null;
  in_flight: boolean;
  last_error: string | null;
  phase: string | null;
  recent_progress: string[];
}

export const profileInstallApi = {
  status: (profileId: string) =>
    jsonRequest<ProfileInstallStatus>(`/profiles/${profileId}/install`),
  start: (profileId: string) =>
    jsonRequest<ProfileInstallStatus>(`/profiles/${profileId}/install`, {
      method: "POST",
    }),
};
