import { memo, type CSSProperties } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { colorForPortType } from "./port_types";
import type { BoundaryNodeData } from "./types";
import * as styles from "./boundary_nodes.css";

export type { BoundaryNodeData, BoundaryPort } from "./types";

const ROW_HEIGHT = 28;
const HEADER_HEIGHT = 44;

export function boundaryNodeHeight(portCount: number): number {
  return HEADER_HEIGHT + Math.max(portCount, 1) * ROW_HEIGHT + 10;
}

export type BoundaryFlowNode = Node<BoundaryNodeData, "boundary">;

export const BoundaryNode = memo(function BoundaryNode({ data }: NodeProps<BoundaryFlowNode>) {
  const isInputs = data.direction === "inputs";
  const cls = [styles.node, isInputs ? styles.nodeInput : styles.nodeOutput].join(" ");
  const containerStyle: CSSProperties = { minHeight: `${boundaryNodeHeight(data.ports.length)}px` };

  return (
    <div className={cls} style={containerStyle}>
      <div className={styles.title}>
        <span aria-hidden="true">{isInputs ? "◆" : "◇"}</span>
        {data.label}
      </div>
      <div className={styles.subtitle}>{data.subtitle}</div>
      {data.ports.map((port) => {
        const color = colorForPortType(port.portType);
        const handleStyle = {
          top: "50%",
          background: color.base,
          borderColor: "rgba(12, 14, 16, 0.9)",
        };
        return (
          <div
            key={port.name}
            className={`${styles.portRow} ${isInputs ? "" : styles.portRowSource}`}
            title={port.portType}
          >
            {isInputs ? (
              <>
                <span>{port.name}</span>
                <span className={styles.portType} style={{ color: color.dim, marginLeft: "auto" }}>
                  {color.label}
                </span>
                <Handle type="source" position={Position.Right} id={port.name} style={handleStyle} />
              </>
            ) : (
              <>
                <Handle type="target" position={Position.Left} id={port.name} style={handleStyle} />
                <span className={styles.portType} style={{ color: color.dim, marginRight: "auto" }}>
                  {color.label}
                </span>
                <span>{port.name}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
});
