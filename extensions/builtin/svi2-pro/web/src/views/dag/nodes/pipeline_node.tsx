import type { ReactElement } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { StageState } from "../../../domain/render_state";
import * as styles from "./pipeline_node.css";

export interface PipelineNodeData extends Record<string, unknown> {
  title: string;
  subtitle: string;
  state: StageState;
  hasInput: boolean;
  hasOutput: boolean;
}

export function PipelineNode({ data }: NodeProps): ReactElement {
  const d = data as PipelineNodeData;
  const cls = [styles.node, styles.stateNode[d.state]].join(" ");
  const dotCls = [styles.dotBase, styles.dot[d.state]].join(" ");

  return (
    <div className={cls}>
      {d.hasInput && <Handle type="target" position={Position.Left} />}
      <div className={styles.titleRow}>
        <span className={styles.title}>{d.title}</span>
        <span className={dotCls} aria-hidden="true" />
      </div>
      <span className={styles.subtitle}>{d.subtitle}</span>
      {d.hasOutput && <Handle type="source" position={Position.Right} />}
    </div>
  );
}

export const SVI2_NODE_TYPES = { pipeline: PipelineNode };
