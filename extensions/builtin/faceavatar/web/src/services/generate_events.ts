import type { GenerationMetadata } from "./types";

/** Canonical JSON-RPC-shaped notification methods on the progress SSE stream.
 * The rust shim is the wire authority; these names are FROZEN. Both operators
 * reuse the same `generate.*` frame vocabulary. */
export const GENERATE_METHODS = {
  progress: "faceavatar.generate.progress",
  done: "faceavatar.generate.done",
  error: "faceavatar.generate.error",
} as const;

/** Worker stage vocabulary, in emission order. `align`/`weld` only fire for the
 * graft operator; generate leaves them idle. The UI tolerates unknown stages —
 * this list only drives ordering, never frame parsing. */
export const WORKFLOW_STAGES = [
  "fit",
  "align",
  "weld",
  "texture",
  "glb",
] as const;

export type WorkflowStage = (typeof WORKFLOW_STAGES)[number];

export interface ProgressFrame {
  method: "faceavatar.generate.progress";
  params: { stage: string; step: number; total: number };
}

export interface DoneFrame {
  method: "faceavatar.generate.done";
  params: { glbRef: string; metadata?: GenerationMetadata | null };
}

export interface ErrorFrame {
  method: "faceavatar.generate.error";
  params: { code: number; message: string };
}

export type GenerateFrame = ProgressFrame | DoneFrame | ErrorFrame;
