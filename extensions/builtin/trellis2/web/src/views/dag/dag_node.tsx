import { Handle, type NodeProps, type NodeTypes, Position } from "@xyflow/react";
import type { ReactElement } from "react";
import type { StageState } from "../../domain/generate_state";
import type { DagNodeData } from "./build_graph";
import * as styles from "./dag_node.css";

const STATE_TEXT: Record<StageState, string> = {
  idle: "idle",
  active: "running",
  done: "done",
  error: "failed",
};

function DagStageNode({ data }: NodeProps): ReactElement {
  const node = data as DagNodeData;
  const { state } = node;
  const stepLabel = `${node.index + 1}/${node.total}`;
  return (
    <div className={styles.node[state]}>
      <Handle type="target" position={Position.Left} className={styles.handle} />
      <div className={styles.topRow}>
        <span className={styles.step}>{stepLabel}</span>
        <span className={styles.chip[state]}>
          <span className={styles.dot[state]} aria-hidden="true" />
          {STATE_TEXT[state]}
        </span>
      </div>
      <span className={styles.label}>{node.label}</span>
      <span className={styles.caption}>{node.caption}</span>
      <Handle type="source" position={Position.Right} className={styles.handle} />
    </div>
  );
}

export const TRELLIS2_NODE_TYPES: NodeTypes = {
  dagStage: DagStageNode,
};
