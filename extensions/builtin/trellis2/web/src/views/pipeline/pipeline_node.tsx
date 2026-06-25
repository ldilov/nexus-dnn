import { Handle, type NodeProps, type NodeTypes, Position } from "@xyflow/react";
import type { ReactElement } from "react";
import type { StageState } from "../../domain/generate_state";
import type { PipelineNodeData } from "./build_graph";
import * as styles from "./pipeline_node.css";

const STATE_TEXT: Record<StageState, string> = {
  idle: "idle",
  active: "running",
  done: "done",
  error: "error",
};

function PipelineStageNode({ data }: NodeProps): ReactElement {
  const nodeData = data as PipelineNodeData;
  const state = nodeData.state;
  return (
    <div className={styles.node[state]}>
      <Handle type="target" position={Position.Left} className={styles.handle} />
      <span className={styles.label}>{nodeData.label}</span>
      <span className={styles.stateText[state]}>{STATE_TEXT[state]}</span>
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </div>
  );
}

export const TRELLIS2_NODE_TYPES: NodeTypes = {
  pipelineStage: PipelineStageNode,
};
