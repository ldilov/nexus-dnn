import type { Edge, Node } from "@xyflow/react";
import { PIPELINE_STAGES, type PipelineStage } from "../../services/generate_events";
import type { StageState } from "../../domain/generate_state";

export interface PipelineNodeData {
  label: string;
  state: StageState;
  [key: string]: unknown;
}

const STAGE_LABELS: Record<PipelineStage, string> = {
  preprocess: "Preprocess",
  dinov3: "DINOv3",
  sparse: "Sparse structure",
  shape: "Shape",
  decode: "Decode",
  mesh: "Mesh",
  texture: "Texture",
  glb: "Export GLB",
};

const NODE_GAP = 180;

export interface BuildGraphArgs {
  stageStates: Record<PipelineStage, StageState>;
  textureEnabled: boolean;
}

export function buildPipelineGraph({
  stageStates,
  textureEnabled,
}: BuildGraphArgs): { nodes: Node<PipelineNodeData>[]; edges: Edge[] } {
  const visible = PIPELINE_STAGES.filter(
    (stage) => stage !== "texture" || textureEnabled,
  );

  const nodes: Node<PipelineNodeData>[] = visible.map((stage, index) => ({
    id: stage,
    type: "pipelineStage",
    position: { x: index * NODE_GAP, y: 0 },
    data: { label: STAGE_LABELS[stage], state: stageStates[stage] },
  }));

  const edges: Edge[] = [];
  for (let i = 1; i < visible.length; i += 1) {
    const from = visible[i - 1];
    const to = visible[i];
    if (!from || !to) continue;
    edges.push({
      id: `${from}->${to}`,
      source: from,
      target: to,
      animated: stageStates[to] === "active",
    });
  }

  return { nodes, edges };
}
