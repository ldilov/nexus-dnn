import { memo } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { vars } from "../theme/contract.css";
import { colorForPortType } from "./port_types";
import * as styles from "./reroute_node.css";

export type RerouteNodeData = {
  portType: string;
};

export type RerouteFlowNode = Node<RerouteNodeData, "reroute">;

export const RerouteNode = memo(function RerouteNode({ data, selected }: NodeProps<RerouteFlowNode>) {
  const color = colorForPortType(data.portType);
  const borderColor = selected ? color.base : vars.color.outline.variant;
  return (
    <div className={styles.reroute} style={{ borderColor, background: color.base + "33" }}>
      <Handle
        type="target"
        position={Position.Left}
        id="in"
        style={{ top: "50%", background: color.base, borderColor: "rgba(12,14,16,0.9)" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ top: "50%", background: color.base, borderColor: "rgba(12,14,16,0.9)" }}
      />
    </div>
  );
});
