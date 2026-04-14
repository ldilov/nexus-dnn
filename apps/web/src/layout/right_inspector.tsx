import {
  isNodeInputReference,
  renderNodeInput,
  type WorkflowNode,
} from "../api/client";
import { Badge } from "../components/badge";
import * as styles from "./right_inspector.css";

type InspectorProps = {
  selectedNode: WorkflowNode | null;
  nodeStatus?: string;
};

type BadgeIntent = "neutral" | "info" | "success" | "warning" | "error";

const STATUS_INTENT: Record<string, BadgeIntent> = {
  created: "neutral",
  planning: "info",
  running: "info",
  completed: "success",
  paused: "warning",
  cancelled: "neutral",
  failed: "error",
  pending: "neutral",
};

function resolveIntent(status: string): BadgeIntent {
  return STATUS_INTENT[status] ?? "neutral";
}

function InspectorField({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <span className={styles.fieldValue}>{value}</span>
    </div>
  );
}

export function RightInspector({ selectedNode, nodeStatus }: InspectorProps) {
  if (!selectedNode) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyState}>Select a node to inspect</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{selectedNode.id}</h2>
      {nodeStatus && (
        <Badge
          label={nodeStatus}
          intent={resolveIntent(nodeStatus)}
          showDot
        />
      )}
      <InspectorField label="Operator" value={selectedNode.operator} />
      {Object.entries(selectedNode.inputs).map(([key, val]) => {
        if (!val) return null;
        return (
          <InspectorField
            key={key}
            label={isNodeInputReference(val) ? `${key} ←` : key}
            value={renderNodeInput(val)}
          />
        );
      })}
    </div>
  );
}
