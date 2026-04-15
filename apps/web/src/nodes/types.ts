import type { OperatorDto } from "../api/client";

export type NodeStatus = "idle" | "running" | "completed" | "failed";

export type LiteralSnapshot = {
  name: string;
  value: unknown;
};

export type OperatorNodeData = {
  label: string;
  operator: string;
  status: NodeStatus;
  progress?: number;
  spec: OperatorDto | null;
  literals: LiteralSnapshot[];
  latencyMs?: number | null;
  editable?: boolean;
  errors?: string[];
  onLiteralChange?: (nodeId: string, portName: string, value: unknown) => void;
  nodeId: string;
  /** Keyed by output port name; last value observed on the event stream. */
  livePortValues?: Record<string, unknown>;
};

export type BoundaryPort = {
  name: string;
  portType: string;
};

export type BoundaryNodeData = {
  label: string;
  subtitle: string;
  ports: BoundaryPort[];
  direction: "inputs" | "outputs";
};
