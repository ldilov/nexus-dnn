import {
  isNodeInputReference,
  renderNodeInput,
  type OperatorDto,
  type WorkflowNode,
} from "../api/client";
import type { PortSpecDto } from "../api/generated/PortSpecDto";
import { Badge } from "../components/badge";
import { colorForPortType } from "../views/port_types";
import * as styles from "./right_inspector.css";

type InspectorProps = {
  selectedNode: WorkflowNode | null;
  selectedSpec?: OperatorDto | null;
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

function PortItem({ port }: { port: PortSpecDto }) {
  const color = colorForPortType(port.port_type);
  return (
    <div className={styles.portItem}>
      <span
        className={styles.portDot}
        style={{ background: color.base, boxShadow: `0 0 8px ${color.glow}` }}
      />
      <span className={styles.portName}>
        {port.name}
        {port.required && <span className={styles.requiredMark}>*</span>}
      </span>
      <span className={styles.portType} style={{ color: color.dim }}>
        {port.port_type}
      </span>
    </div>
  );
}

function resourceChips(spec: OperatorDto | null | undefined): string[] {
  if (!spec) return [];
  const chips: string[] = [];
  if (spec.execution_mode) chips.push(spec.execution_mode);
  if (spec.cacheable) chips.push("cacheable");
  if (spec.resumable) chips.push("resumable");
  if (spec.resource_hints && typeof spec.resource_hints === "object") {
    const hints = spec.resource_hints as { gpu?: unknown; min_vram_mb?: unknown; cpu_cores?: unknown };
    if (hints.gpu === true) chips.push("gpu");
    if (typeof hints.min_vram_mb === "number") chips.push(`${hints.min_vram_mb} MB VRAM`);
    if (typeof hints.cpu_cores === "number") chips.push(`${hints.cpu_cores} CPU`);
  }
  return chips;
}

export function RightInspector({ selectedNode, selectedSpec, nodeStatus }: InspectorProps) {
  if (!selectedNode) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyState}>Select a node to inspect</p>
      </div>
    );
  }

  const chips = resourceChips(selectedSpec);
  const connectedInputs = Object.entries(selectedNode.inputs).filter(
    ([, v]) => v && isNodeInputReference(v),
  );
  const literalInputs = Object.entries(selectedNode.inputs).filter(
    ([, v]) => v && !isNodeInputReference(v),
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{selectedSpec?.display_name ?? selectedNode.id}</h2>
      {nodeStatus && <Badge label={nodeStatus} intent={resolveIntent(nodeStatus)} showDot />}

      <InspectorField label="Node ID" value={selectedNode.id} />
      <InspectorField label="Operator" value={selectedNode.operator} />
      {selectedSpec?.category && (
        <InspectorField label="Category" value={selectedSpec.category} />
      )}

      {selectedSpec?.description && (
        <>
          <span className={styles.sectionLabel}>About</span>
          <p className={styles.description}>{selectedSpec.description}</p>
        </>
      )}

      {chips.length > 0 && (
        <>
          <span className={styles.sectionLabel}>Runtime</span>
          <div className={styles.chipRow}>
            {chips.map((c) => (
              <span key={c} className={styles.chip}>
                {c}
              </span>
            ))}
          </div>
        </>
      )}

      {selectedSpec && selectedSpec.inputs.length > 0 && (
        <>
          <span className={styles.sectionLabel}>Inputs</span>
          <div className={styles.portList}>
            {selectedSpec.inputs.map((p) => (
              <PortItem key={p.name} port={p} />
            ))}
          </div>
        </>
      )}

      {selectedSpec && selectedSpec.outputs.length > 0 && (
        <>
          <span className={styles.sectionLabel}>Outputs</span>
          <div className={styles.portList}>
            {selectedSpec.outputs.map((p) => (
              <PortItem key={p.name} port={p} />
            ))}
          </div>
        </>
      )}

      {connectedInputs.length > 0 && (
        <>
          <span className={styles.sectionLabel}>Connections</span>
          {connectedInputs.map(([key, val]) => (
            <InspectorField
              key={`conn-${key}`}
              label={`${key} ←`}
              value={val ? renderNodeInput(val) : ""}
            />
          ))}
        </>
      )}

      {literalInputs.length > 0 && (
        <>
          <span className={styles.sectionLabel}>Literals</span>
          {literalInputs.map(([key, val]) => (
            <InspectorField
              key={`lit-${key}`}
              label={key}
              value={val ? renderNodeInput(val) : ""}
            />
          ))}
        </>
      )}
    </div>
  );
}
