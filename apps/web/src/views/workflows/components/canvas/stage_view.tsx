import type { Workflow, WorkflowNode } from "../../../../api/client";
import { StatusBadge, type BadgeStatus } from "../../../../components/base/status_badge";
import * as styles from "./stage_view.css";

type NodeProgress = { status: string; progress: number };

type StageViewProps = {
  workflow: Workflow | null;
  nodeProgress: Record<string, NodeProgress>;
  selectedNodeId: string | null;
  onSelectNode: (node: WorkflowNode) => void;
};

export function StageView({
  workflow,
  nodeProgress,
  selectedNodeId,
  onSelectNode,
}: StageViewProps) {
  if (!workflow) {
    return <p className={styles.emptyState}>Select a workflow to view stages</p>;
  }

  return (
    <div className={styles.stageRow}>
      {workflow.stages.map((stage) => (
        <div key={stage.name} className={styles.stageColumn}>
          <div className={styles.stageHeader}>{stage.name}</div>
          {stage.nodes.map((node) => {
            const progress = nodeProgress[node.id];
            const isSelected = node.id === selectedNodeId;
            const cls = isSelected
              ? `${styles.nodeCard} ${styles.nodeCardSelected}`
              : styles.nodeCard;
            return (
              <div key={node.id} className={cls} onClick={() => onSelectNode(node)}>
                <div className={styles.nodeName}>{node.id}</div>
                <div className={styles.nodeOperator}>{node.operator}</div>
                {progress && (
                  <div className={styles.nodeStatusRow}>
                    <StatusBadge status={progress.status as BadgeStatus} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
