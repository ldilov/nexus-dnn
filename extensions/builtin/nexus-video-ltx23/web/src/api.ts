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

export interface CreateRenderRequest {
  prompt: string;
  negative_prompt?: string;
  duration_seconds: number;
  runtime_profile: RuntimeProfilePreference;
  quality_preset: QualityPreset;
  seed?: number;
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
};

export function artifactUrl(artifactId: string): string {
  return `${API_BASE}/artifacts/${artifactId}`;
}
