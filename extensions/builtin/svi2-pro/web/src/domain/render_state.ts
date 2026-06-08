import type { RenderFrame } from "../services/render_events";
import type { RenderReport } from "../services/types";

export type RenderPhase = "idle" | "running" | "done" | "error" | "cancelled";

export type PipelineStage =
  | "anchor"
  | "qwen_edit"
  | "diffusion"
  | "stitch"
  | "interpolate"
  | "mux";

export type StageState = "idle" | "active" | "done" | "error";

export interface RenderState {
  phase: RenderPhase;
  jobId: string | null;
  overallFraction: number;
  clipIndex: number;
  numClips: number;
  step: number;
  totalSteps: number;
  vramPeakGib: number | null;
  outputPath: string | null;
  renderReport: RenderReport | null;
  errorCode: number | null;
  errorMessage: string | null;
  stageStates: Record<PipelineStage, StageState>;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  "anchor",
  "qwen_edit",
  "diffusion",
  "stitch",
  "interpolate",
  "mux",
];

function idleStages(): Record<PipelineStage, StageState> {
  return {
    anchor: "idle",
    qwen_edit: "idle",
    diffusion: "idle",
    stitch: "idle",
    interpolate: "idle",
    mux: "idle",
  };
}

export function initialRenderState(): RenderState {
  return {
    phase: "idle",
    jobId: null,
    overallFraction: 0,
    clipIndex: 0,
    numClips: 0,
    step: 0,
    totalSteps: 0,
    vramPeakGib: null,
    outputPath: null,
    renderReport: null,
    errorCode: null,
    errorMessage: null,
    stageStates: idleStages(),
  };
}

export function startedState(jobId: string, hasQwenEdit: boolean): RenderState {
  const base = initialRenderState();
  return {
    ...base,
    phase: "running",
    jobId,
    stageStates: {
      ...idleStages(),
      anchor: "done",
      qwen_edit: hasQwenEdit ? "active" : "idle",
      diffusion: hasQwenEdit ? "idle" : "active",
    },
  };
}

export function reduceRenderFrame(state: RenderState, frame: RenderFrame): RenderState {
  switch (frame.method) {
    case "svi2.video.progress":
      return { ...state, overallFraction: clamp(frame.params.fraction) };
    case "svi2.video.clip.started":
      return {
        ...state,
        clipIndex: frame.params.clip_index,
        numClips: frame.params.num_clips,
        step: 0,
        stageStates: { ...state.stageStates, qwen_edit: doneIfActive(state, "qwen_edit"), diffusion: "active" },
      };
    case "svi2.video.clip.step":
      return {
        ...state,
        clipIndex: frame.params.clip_index,
        step: frame.params.step,
        totalSteps: frame.params.total_steps,
      };
    case "svi2.video.clip.completed":
      return {
        ...state,
        clipIndex: frame.params.clip_index,
        numClips: frame.params.num_clips,
        stageStates:
          frame.params.clip_index >= frame.params.num_clips - 1
            ? { ...state.stageStates, diffusion: "done", stitch: "active" }
            : state.stageStates,
      };
    case "runtime.memory_stats": {
      const peak = frame.params.vram_peak_gib ?? frame.params.vram_used_gib ?? null;
      if (peak === null) return state;
      return { ...state, vramPeakGib: Math.max(peak, state.vramPeakGib ?? 0) };
    }
    case "svi2.video.done":
      return {
        ...state,
        phase: "done",
        overallFraction: 1,
        outputPath: frame.params.output_path,
        renderReport: frame.params.render_report ?? null,
        vramPeakGib: frame.params.render_report?.vram_peak_gib ?? state.vramPeakGib,
        stageStates: {
          anchor: "done",
          qwen_edit: state.stageStates.qwen_edit === "idle" ? "idle" : "done",
          diffusion: "done",
          stitch: "done",
          interpolate: "done",
          mux: "done",
        },
      };
    case "svi2.video.error":
      return {
        ...state,
        phase: "error",
        errorCode: frame.params.code,
        errorMessage: frame.params.message,
        stageStates: markActiveAsError(state.stageStates),
      };
    default:
      return state;
  }
}

export function cancelledState(state: RenderState): RenderState {
  return { ...state, phase: "cancelled", stageStates: idleStages() };
}

function clamp(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function doneIfActive(state: RenderState, stage: PipelineStage): StageState {
  return state.stageStates[stage] === "active" ? "done" : state.stageStates[stage];
}

function markActiveAsError(
  states: Record<PipelineStage, StageState>,
): Record<PipelineStage, StageState> {
  const next = { ...states };
  for (const stage of PIPELINE_STAGES) {
    if (next[stage] === "active") next[stage] = "error";
  }
  return next;
}
