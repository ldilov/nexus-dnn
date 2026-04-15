import { memo, type CSSProperties } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { OperatorDto } from "../api/client";
import type { PortSpecDto } from "../api/generated/PortSpecDto";
import { colorForPortType } from "./port_types";
import { readNodeUiSpec } from "./node_ui_spec";
import { Widget } from "./widgets";
import { Preview } from "./previews";
import type { NodeStatus, OperatorNodeData } from "./types";
import * as styles from "./operator_node.css";

export type { NodeStatus, OperatorNodeData } from "./types";

const HEADER_HEIGHT = 56;
const ROW_HEIGHT = 28;
const WIDGET_ROW_HEIGHT = 28;
const FOOTER_HEIGHT = 30;

function formatLiteral(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    const str = JSON.stringify(value);
    return str.length > 48 ? `${str.slice(0, 45)}…` : str;
  } catch {
    return String(value);
  }
}

function statusClass(status: NodeStatus): string | undefined {
  switch (status) {
    case "running":
      return styles.nodeRunning;
    case "completed":
      return styles.nodeCompleted;
    case "failed":
      return styles.nodeFailed;
    default:
      return undefined;
  }
}

function statusDotClass(status: NodeStatus): string {
  switch (status) {
    case "running":
      return `${styles.statusDot} ${styles.statusDotRunning}`;
    case "completed":
      return `${styles.statusDot} ${styles.statusDotCompleted}`;
    case "failed":
      return `${styles.statusDot} ${styles.statusDotFailed}`;
    default:
      return styles.statusDot;
  }
}

export function operatorNodeHeight(
  inputCount: number,
  outputCount: number,
  literalCount: number,
): number {
  const BODY_PAD = 16;
  return (
    HEADER_HEIGHT +
    BODY_PAD +
    (inputCount + outputCount) * ROW_HEIGHT +
    literalCount * WIDGET_ROW_HEIGHT +
    FOOTER_HEIGHT
  );
}

function PortMarker({ type }: { type: string | null | undefined }) {
  const color = colorForPortType(type);
  return (
    <span
      aria-hidden="true"
      style={{
        width: "8px",
        height: "8px",
        borderRadius: "999px",
        background: color.base,
        boxShadow: `0 0 10px ${color.glow}`,
        flexShrink: 0,
      }}
    />
  );
}

function InputRow({ port }: { port: PortSpecDto }) {
  const color = colorForPortType(port.port_type);
  return (
    <div className={`${styles.portRow} ${styles.portRowTarget}`} title={port.port_type}>
      <Handle
        type="target"
        position={Position.Left}
        id={port.name}
        style={{
          top: "50%",
          background: color.base,
          borderColor: "rgba(12, 14, 16, 0.9)",
        }}
      />
      <PortMarker type={port.port_type} />
      <span className={styles.portName}>{port.name}</span>
      {port.required && <span className={styles.requiredMark}>*</span>}
      <span className={styles.portType} style={{ color: color.dim, marginLeft: "auto" }}>
        {color.label}
      </span>
    </div>
  );
}

function formatLive(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") {
    return value.length > 160 ? `${value.slice(0, 157)}…` : value;
  }
  try {
    const s = JSON.stringify(value);
    return s.length > 160 ? `${s.slice(0, 157)}…` : s;
  } catch {
    return String(value);
  }
}

function OutputRow({
  port,
  liveValue,
}: {
  port: PortSpecDto;
  liveValue?: unknown;
}) {
  const color = colorForPortType(port.port_type);
  const hasLive = liveValue !== undefined && liveValue !== null;
  const tooltip = hasLive ? `${port.port_type} · ${formatLive(liveValue)}` : port.port_type;
  return (
    <div className={`${styles.portRow} ${styles.portRowSource}`} title={tooltip}>
      <Handle
        type="source"
        position={Position.Right}
        id={port.name}
        style={{
          top: "50%",
          background: color.base,
          borderColor: "rgba(12, 14, 16, 0.9)",
          boxShadow: hasLive ? `0 0 0 3px ${color.glow}` : undefined,
        }}
      />
      <span className={styles.portType} style={{ color: color.dim, marginRight: "auto" }}>
        {color.label}
      </span>
      <span className={styles.portName}>{port.name}</span>
      {hasLive && (
        <span
          style={{
            width: "4px",
            height: "4px",
            borderRadius: "999px",
            background: color.base,
            marginRight: "4px",
          }}
        />
      )}
      <PortMarker type={port.port_type} />
    </div>
  );
}

function executionBadge(spec: OperatorDto | null): { label: string; cls: string } | null {
  if (!spec) return null;
  if (spec.execution_mode) {
    return { label: spec.execution_mode, cls: styles.chipAccent };
  }
  return null;
}

function gpuBadge(spec: OperatorDto | null): boolean {
  if (!spec || !spec.resource_hints || typeof spec.resource_hints !== "object") return false;
  const hints = spec.resource_hints as { gpu?: unknown };
  return hints.gpu === true;
}

export type OperatorFlowNode = Node<OperatorNodeData, "operator">;

export const OperatorNode = memo(function OperatorNode({
  data,
  selected,
}: NodeProps<OperatorFlowNode>) {
  const {
    spec,
    literals,
    status,
    label,
    operator,
    latencyMs,
    editable = false,
    onLiteralChange,
    nodeId,
  } = data;

  const inputs: PortSpecDto[] = spec?.inputs ?? [];
  const outputs: PortSpecDto[] = spec?.outputs ?? [];
  const literalList = literals;
  const uiSpec = readNodeUiSpec(spec);

  const classNames = [styles.node];
  if (selected) classNames.push(styles.nodeSelected);
  const statusCls = statusClass(status);
  if (statusCls) classNames.push(statusCls);
  if (!spec) classNames.push(styles.nodeMissingSpec);

  const execBadge = executionBadge(spec);
  const hasGpu = gpuBadge(spec);

  const height = operatorNodeHeight(inputs.length, outputs.length, literalList.length);
  const containerStyle: CSSProperties = { minHeight: `${height}px` };

  const previewValue = (() => {
    if (!uiSpec.preview) return null;
    const sourceName = uiSpec.preview.source;
    if (!sourceName) return null;
    const literal = literals.find((l) => l.name === sourceName);
    return literal ? literal.value : null;
  })();

  return (
    <div className={classNames.join(" ")} style={containerStyle}>
      <div
        className={`${styles.header} ${status === "running" ? styles.headerRunning : ""}`}
      >
        <div className={styles.titleRow}>
          <span className={statusDotClass(status)} />
          <span className={styles.title}>{label}</span>
          <span className={styles.badgeRow}>
            {execBadge && <span className={`${styles.chip} ${execBadge.cls}`}>{execBadge.label}</span>}
            {hasGpu && <span className={`${styles.chip} ${styles.chipGpu}`}>GPU</span>}
          </span>
        </div>
        <span className={styles.operatorId}>{operator}</span>
      </div>

      <div className={styles.body}>
        {inputs.length === 0 && !spec && (
          <div className={styles.portRow} style={{ color: "var(--color-warning, #F59E0B)" }}>
            ⚠ operator spec missing
          </div>
        )}

        {inputs.map((port) => (
          <InputRow key={`in-${port.name}`} port={port} />
        ))}

        {literalList.map((lit) => {
          const widgetSpec = uiSpec.widgets[lit.name];
          return (
            <div key={`lit-${lit.name}`} className={styles.widgetRow}>
              <span className={styles.widgetLabel}>{lit.name}</span>
              {widgetSpec ? (
                <Widget
                  spec={widgetSpec}
                  value={lit.value}
                  editable={editable}
                  onChange={(v) => onLiteralChange?.(nodeId, lit.name, v)}
                />
              ) : (
                <span className={styles.widgetValue} title={formatLiteral(lit.value)}>
                  {formatLiteral(lit.value)}
                </span>
              )}
            </div>
          );
        })}

        {outputs.map((port) => (
          <OutputRow
            key={`out-${port.name}`}
            port={port}
            liveValue={data.livePortValues?.[port.name]}
          />
        ))}

        {uiSpec.preview && <Preview spec={uiSpec.preview} value={previewValue} />}
      </div>

      <div className={styles.footer}>
        <span className={styles.footerMetric}>
          {spec?.category ?? "operator"}
        </span>
        <span className={styles.footerMetric}>
          {latencyMs !== undefined && latencyMs !== null ? (
            <>
              lat <span className={styles.footerValueAccent}>{latencyMs}ms</span>
            </>
          ) : (
            <>
              in <span className={styles.footerValueAccent}>{inputs.length}</span> · out{" "}
              <span className={styles.footerValueAccent}>{outputs.length}</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
});
