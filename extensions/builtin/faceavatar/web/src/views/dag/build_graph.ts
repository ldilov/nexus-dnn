import type { Edge, Node } from "@xyflow/react";
import type { StageState } from "../../domain/generate_state";
import { WORKFLOW_STAGES, type WorkflowStage } from "../../services/generate_events";

export interface DagNodeData {
  label: string;
  caption: string;
  state: StageState;
  index: number;
  total: number;
  [key: string]: unknown;
}

/** Friendly node titles for the real worker vocab (emission order). */
const STAGE_LABELS: Record<WorkflowStage, string> = {
  load: "Load model",
  encode: "Encode image",
  sparse: "Sparse structure",
  shape: "Shape",
  texture: "Texture",
  decode: "Decode mesh",
  glb: "Export GLB",
};

/** One-line mono caption under each node — what the stage actually does. */
const STAGE_CAPTIONS: Record<WorkflowStage, string> = {
  load: "Weights → VRAM",
  encode: "DINOv3 features",
  sparse: "O-Voxel layout",
  shape: "Structured latents",
  texture: "Albedo bake",
  decode: "Watertight mesh",
  glb: "glTF artifact",
};

const NODE_GAP_X = 220;
const NODE_Y = 80;

export interface BuildGraphArgs {
  stageStates: Record<WorkflowStage, StageState>;
  textureEnabled: boolean;
}

/** Build the horizontal workflow DAG from live stage states. `texture` is
 * elided when the active pipeline_type cannot bake one, so the chain stays
 * honest rather than showing a node that never lights up. */
export function buildDagGraph({
  stageStates,
  textureEnabled,
}: BuildGraphArgs): { nodes: Node<DagNodeData>[]; edges: Edge[] } {
  const visible = WORKFLOW_STAGES.filter(
    (stage) => stage !== "texture" || textureEnabled,
  );

  const nodes: Node<DagNodeData>[] = visible.map((stage, index) => ({
    id: stage,
    type: "dagStage",
    position: { x: index * NODE_GAP_X, y: NODE_Y },
    data: {
      label: STAGE_LABELS[stage],
      caption: STAGE_CAPTIONS[stage],
      state: stageStates[stage],
      index,
      total: visible.length,
    },
  }));

  const edges: Edge[] = [];
  for (let i = 1; i < visible.length; i += 1) {
    const from = visible[i - 1];
    const to = visible[i];
    if (!from || !to) continue;
    const downstreamActive = stageStates[to] === "active";
    edges.push({
      id: `${from}->${to}`,
      source: from,
      target: to,
      animated: downstreamActive,
      style: {
        stroke: downstreamActive
          ? "var(--accent, #ba9eff)"
          : "color-mix(in oklab, var(--outline-variant, #46484a) 70%, transparent)",
        strokeWidth: downstreamActive ? 2 : 1.5,
      },
    });
  }

  return { nodes, edges };
}
