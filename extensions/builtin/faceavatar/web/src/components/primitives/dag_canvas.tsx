import {
  Background,
  BackgroundVariant,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  type NodeTypes,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import type { ReactElement, ReactNode } from "react";
import "@xyflow/react/dist/style.css";
import * as styles from "./dag_canvas.css";

const GRID_SIZE = 16;
const DOT_COLOR = "rgba(186, 158, 255, 0.14)";
const LINE_COLOR = "rgba(186, 158, 255, 0.06)";
const MINIMAP_MASK = "rgba(0, 0, 0, 0.6)";
const MINIMAP_NODE = "#1d2023";
const MINIMAP_STROKE = "#ba9eff";

export interface DagCanvasProps {
  nodes: Node[];
  edges: Edge[];
  nodeTypes?: NodeTypes;
  showMiniMap?: boolean;
  showControls?: boolean;
  fitView?: boolean;
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
}

function DagCanvasInner({
  nodes,
  edges,
  nodeTypes,
  showMiniMap = false,
  showControls = true,
  fitView = true,
  className,
  ariaLabel,
  children,
}: DagCanvasProps): ReactElement {
  const cls = [styles.container, className].filter(Boolean).join(" ");
  return (
    <div className={cls} aria-label={ariaLabel ?? "node graph"}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        {...(nodeTypes ? { nodeTypes } : {})}
        fitView={fitView}
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        minZoom={0.2}
        maxZoom={1.8}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          id="minor"
          variant={BackgroundVariant.Dots}
          gap={GRID_SIZE}
          size={1.1}
          color={DOT_COLOR}
        />
        <Background
          id="major"
          variant={BackgroundVariant.Lines}
          gap={GRID_SIZE * 5}
          lineWidth={1}
          color={LINE_COLOR}
        />
        {showControls && <Controls showInteractive={false} />}
        {showMiniMap && (
          <MiniMap
            pannable
            zoomable
            maskColor={MINIMAP_MASK}
            nodeColor={() => MINIMAP_NODE}
            nodeStrokeColor={() => MINIMAP_STROKE}
            className={styles.miniMapBg}
          />
        )}
        {children}
      </ReactFlow>
    </div>
  );
}

export function DagCanvas(props: DagCanvasProps): ReactElement {
  return (
    <ReactFlowProvider>
      <DagCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
