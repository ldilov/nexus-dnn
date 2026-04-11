import type { WorkflowNode } from "../api/client";
import { StatusBadge, type BadgeStatus } from "../components/status_badge";
import * as styles from "./right_inspector.css";

type InspectorProps = {
  selectedNode: WorkflowNode | null;
  nodeStatus?: string;
};

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
        <StatusBadge status={nodeStatus as BadgeStatus} />
      )}
      <InspectorField label="Operator" value={selectedNode.operator} />
      {Object.entries(selectedNode.inputs).map(([key, val]) => (
        <InspectorField key={key} label={key} value={val} />
      ))}
    </div>
  );
}
