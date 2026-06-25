import type { GenerationMetadata } from "./types";

/** Canonical JSON-RPC-shaped notification methods on the progress SSE stream.
 * The rust shim is the wire authority; these names are FROZEN. */
export const GENERATE_METHODS = {
  progress: "trellis2.generate.progress",
  done: "trellis2.generate.done",
  error: "trellis2.generate.error",
} as const;

/** Worker stage vocabulary, in emission order. `texture` only fires for the
 * default `1024_cascade` pipeline_type; other presets leave it idle. The UI
 * tolerates unknown stages — this list only drives the workflow DAG and default
 * ordering, never frame parsing. */
export const WORKFLOW_STAGES = [
  "load",
  "encode",
  "sparse",
  "shape",
  "texture",
  "decode",
  "glb",
] as const;

export type WorkflowStage = (typeof WORKFLOW_STAGES)[number];

export interface ProgressFrame {
  method: "trellis2.generate.progress";
  params: { stage: string; step: number; total: number };
}

export interface DoneFrame {
  method: "trellis2.generate.done";
  params: { glbRef: string; metadata?: GenerationMetadata | null };
}

export interface ErrorFrame {
  method: "trellis2.generate.error";
  params: { code: number; message: string };
}

export type GenerateFrame = ProgressFrame | DoneFrame | ErrorFrame;
