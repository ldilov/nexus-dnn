import {
  type GenerateFrame,
  WORKFLOW_STAGES,
  type WorkflowStage,
} from "../services/generate_events";
import type { GenerationMetadata } from "../services/types";

export type GeneratePhase = "idle" | "running" | "done" | "error" | "cancelled";

export type StageState = "idle" | "active" | "done" | "error";

/** Live state of a single generation, derived purely from the SSE frame
 * stream. Kept immutable — every reducer step returns a fresh object. */
export interface GenerateState {
  phase: GeneratePhase;
  /** Raw stage string from the latest progress frame (may be unknown vocab). */
  stage: string | null;
  step: number;
  totalSteps: number;
  overallFraction: number;
  stageStates: Record<WorkflowStage, StageState>;
  glbRef: string | null;
  /** No thumbnail at MVP-0 — kept nullable for forward-compat, always null. */
  thumbnailRef: string | null;
  /** Source image ref the result was built from. Carried so a finished mesh can
   * be re-fed to the refine pass without re-uploading. Null until known. */
  inputImageRef: string | null;
  metadata: GenerationMetadata | null;
  errorCode: number | null;
  errorMessage: string | null;
}

function freshStageStates(): Record<WorkflowStage, StageState> {
  const states = {} as Record<WorkflowStage, StageState>;
  for (const stage of WORKFLOW_STAGES) states[stage] = "idle";
  return states;
}

export const INITIAL_STATE: GenerateState = {
  phase: "idle",
  stage: null,
  step: 0,
  totalSteps: 0,
  overallFraction: 0,
  stageStates: freshStageStates(),
  glbRef: null,
  thumbnailRef: null,
  inputImageRef: null,
  metadata: null,
  errorCode: null,
  errorMessage: null,
};

export function startedState(inputImageRef: string | null = null): GenerateState {
  return {
    ...INITIAL_STATE,
    stageStates: freshStageStates(),
    phase: "running",
    inputImageRef,
  };
}

function isWorkflowStage(value: string): value is WorkflowStage {
  return (WORKFLOW_STAGES as readonly string[]).includes(value);
}

/** Advance the known-stage graph: every stage up to `current` is done, the
 * current one is active, the rest stay idle. Unknown stages leave the graph
 * untouched (we cannot place them on the canonical line). */
function advanceStages(
  prev: Record<WorkflowStage, StageState>,
  current: string,
): Record<WorkflowStage, StageState> {
  if (!isWorkflowStage(current)) return prev;
  const next = { ...prev };
  let reached = false;
  for (const stage of WORKFLOW_STAGES) {
    if (stage === current) {
      next[stage] = "active";
      reached = true;
    } else if (!reached) {
      next[stage] = "done";
    }
  }
  return next;
}

/** Overall fraction from the stage's position on the canonical line plus its
 * within-stage step ratio. Unknown stages contribute only the step ratio. */
function fractionFor(stage: string, step: number, total: number): number {
  const within = total > 0 ? Math.min(1, step / total) : 0;
  const index = isWorkflowStage(stage) ? WORKFLOW_STAGES.indexOf(stage) : 0;
  const span = 1 / WORKFLOW_STAGES.length;
  return Math.min(0.99, span * (index + within));
}

export function reduceFrame(state: GenerateState, frame: GenerateFrame): GenerateState {
  switch (frame.method) {
    case "faceavatar.generate.progress": {
      const { stage, step, total } = frame.params;
      const overall = fractionFor(stage, step, total);
      return {
        ...state,
        phase: "running",
        stage,
        step,
        totalSteps: total,
        overallFraction: Math.max(state.overallFraction, overall),
        stageStates: advanceStages(state.stageStates, stage),
      };
    }
    case "faceavatar.generate.done": {
      const completed = freshStageStates();
      for (const stage of WORKFLOW_STAGES) completed[stage] = "done";
      return {
        ...state,
        phase: "done",
        overallFraction: 1,
        stageStates: completed,
        glbRef: frame.params.glbRef,
        thumbnailRef: null,
        metadata: frame.params.metadata ?? null,
      };
    }
    case "faceavatar.generate.error": {
      const errored = { ...state.stageStates };
      if (state.stage && isWorkflowStage(state.stage)) errored[state.stage] = "error";
      return {
        ...state,
        phase: "error",
        stageStates: errored,
        errorCode: frame.params.code,
        errorMessage: frame.params.message,
      };
    }
    default:
      return state;
  }
}

export function cancelledState(state: GenerateState): GenerateState {
  return { ...state, phase: "cancelled" };
}
