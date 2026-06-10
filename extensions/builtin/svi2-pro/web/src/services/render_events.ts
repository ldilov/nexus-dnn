import type { RenderReport } from "./types";

export const RENDER_METHODS = {
  progress: "svi2.video.progress",
  clipStarted: "svi2.video.clip.started",
  clipStep: "svi2.video.clip.step",
  clipCompleted: "svi2.video.clip.completed",
  memoryStats: "runtime.memory_stats",
  done: "svi2.video.done",
  error: "svi2.video.error",
} as const;

export interface ProgressFrame {
  method: "svi2.video.progress";
  params: { fraction: number; stage?: string };
}

export interface ClipStartedFrame {
  method: "svi2.video.clip.started";
  params: { clip_index: number; num_clips: number };
}

export interface ClipStepFrame {
  method: "svi2.video.clip.step";
  params: { clip_index: number; step: number; total_steps: number };
}

export interface ClipCompletedFrame {
  method: "svi2.video.clip.completed";
  params: { clip_index: number; num_clips: number };
}

export interface MemoryStatsFrame {
  method: "runtime.memory_stats";
  params: { vram_peak_gib?: number; vram_used_gib?: number };
}

export interface DoneFrame {
  method: "svi2.video.done";
  params: { output_path: string; render_report?: RenderReport };
}

export interface ErrorFrame {
  method: "svi2.video.error";
  params: { code: number; message: string };
}

export type RenderFrame =
  | ProgressFrame
  | ClipStartedFrame
  | ClipStepFrame
  | ClipCompletedFrame
  | MemoryStatsFrame
  | DoneFrame
  | ErrorFrame;
