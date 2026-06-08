import type { Edge, Node } from "@xyflow/react";
import { PIPELINE_STAGES, type PipelineStage, type RenderState } from "../../domain/render_state";
import type { PipelineNodeData } from "./nodes/pipeline_node";
import type { RenderParams } from "../../services/types";

interface GraphInput {
  render: RenderState;
  params: RenderParams;
  qwenEditEnabled: boolean;
}

const NODE_GAP_X = 220;
const NODE_Y = 80;

function stageLabel(stage: PipelineStage): string {
  switch (stage) {
    case "anchor":
      return "Anchor";
    case "qwen_edit":
      return "Qwen edit";
    case "diffusion":
      return "Diffusion";
    case "stitch":
      return "Stitch";
    case "interpolate":
      return "Interpolate";
    case "mux":
      return "Mux";
  }
}

function stageSubtitle(stage: PipelineStage, input: GraphInput): string {
  const p = input.params;
  switch (stage) {
    case "anchor":
      return "Reference image";
    case "qwen_edit":
      return input.qwenEditEnabled ? "Edit-then-animate" : "Skipped";
    case "diffusion": {
      const clips = p.num_clips ?? 1;
      const active = input.render.clipIndex + 1;
      return input.render.phase === "running"
        ? `Clip ${Math.min(active, clips)}/${clips}`
        : `${clips} clip${clips === 1 ? "" : "s"}`;
    }
    case "stitch":
      return p.stitch_mode === "crossfade" ? "Crossfade" : "Overlap trim";
    case "interpolate":
      return p.interpolate_fps && p.interpolate_fps > 0
        ? `→ ${p.interpolate_fps} fps`
        : "Off";
    case "mux":
      return "Encode mp4";
  }
}

export function buildPipelineGraph(input: GraphInput): { nodes: Node[]; edges: Edge[] } {
  const visible = PIPELINE_STAGES.filter(
    (stage) => stage !== "qwen_edit" || input.qwenEditEnabled,
  );

  const nodes: Node[] = visible.map((stage, index) => {
    const data: PipelineNodeData = {
      title: stageLabel(stage),
      subtitle: stageSubtitle(stage, input),
      state: input.render.stageStates[stage],
      hasInput: index > 0,
      hasOutput: index < visible.length - 1,
    };
    return {
      id: stage,
      type: "pipeline",
      position: { x: index * NODE_GAP_X, y: NODE_Y },
      data,
    };
  });

  const edges: Edge[] = [];
  for (let i = 1; i < visible.length; i += 1) {
    const from = visible[i - 1];
    const to = visible[i];
    if (!from || !to) continue;
    edges.push({
      id: `${from}->${to}`,
      source: from,
      target: to,
      animated: input.render.stageStates[to] === "active",
    });
  }

  return { nodes, edges };
}
