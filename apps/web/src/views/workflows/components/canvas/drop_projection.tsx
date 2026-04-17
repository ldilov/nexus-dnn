import { useMemo, type CSSProperties } from "react";
import { useStore, type Node } from "@xyflow/react";

export type ProjectedDrop = {
  x: number;
  y: number;
  width: number;
  height: number;
  /** True when the projection is locked to another node's anchor (not just grid). */
  snappedTo: { axis: "x" | "y"; otherId: string; position: number } | null;
};

export type ProjectionInput = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ProjectionContext = {
  gridSize: number;
  snapThreshold: number;
  others: ReadonlyArray<{ id: string; x: number; y: number; width: number; height: number }>;
};

const DEFAULT_GRID = 16;
const SNAP_THRESHOLD = 8;

function snap(value: number, grid: number): number {
  return Math.round(value / grid) * grid;
}

/**
 * Compute where a dragged node should actually land if the user released
 * right now. First looks for close alignment with any other node's anchors
 * (left/center/right, top/center/bottom). If any anchor is within the snap
 * threshold, it overrides the free position. Otherwise the position is
 * snapped to the background grid.
 */
export function computeProjection(
  dragged: ProjectionInput,
  ctx: ProjectionContext,
): ProjectedDrop {
  const grid = ctx.gridSize ?? DEFAULT_GRID;
  const threshold = ctx.snapThreshold ?? SNAP_THRESHOLD;

  let projectedX = snap(dragged.x, grid);
  let projectedY = snap(dragged.y, grid);
  let snappedTo: ProjectedDrop["snappedTo"] = null;

  const draggedCenterX = dragged.x + dragged.width / 2;
  const draggedCenterY = dragged.y + dragged.height / 2;
  const draggedRight = dragged.x + dragged.width;
  const draggedBottom = dragged.y + dragged.height;

  let bestX: { id: string; delta: number; offset: number; pos: number } | null = null;
  let bestY: { id: string; delta: number; offset: number; pos: number } | null = null;

  for (const other of ctx.others) {
    const otherCenterX = other.x + other.width / 2;
    const otherCenterY = other.y + other.height / 2;
    const otherRight = other.x + other.width;
    const otherBottom = other.y + other.height;

    const xCandidates: { delta: number; offset: number; pos: number }[] = [
      { delta: Math.abs(dragged.x - other.x), offset: 0, pos: other.x },
      { delta: Math.abs(draggedCenterX - otherCenterX), offset: dragged.width / 2, pos: otherCenterX },
      { delta: Math.abs(draggedRight - otherRight), offset: dragged.width, pos: otherRight },
      { delta: Math.abs(dragged.x - otherRight), offset: 0, pos: otherRight },
      { delta: Math.abs(draggedRight - other.x), offset: dragged.width, pos: other.x },
    ];
    for (const c of xCandidates) {
      if (c.delta <= threshold && (!bestX || c.delta < bestX.delta)) {
        bestX = { id: other.id, ...c };
      }
    }

    const yCandidates: { delta: number; offset: number; pos: number }[] = [
      { delta: Math.abs(dragged.y - other.y), offset: 0, pos: other.y },
      { delta: Math.abs(draggedCenterY - otherCenterY), offset: dragged.height / 2, pos: otherCenterY },
      { delta: Math.abs(draggedBottom - otherBottom), offset: dragged.height, pos: otherBottom },
      { delta: Math.abs(dragged.y - otherBottom), offset: 0, pos: otherBottom },
      { delta: Math.abs(draggedBottom - other.y), offset: dragged.height, pos: other.y },
    ];
    for (const c of yCandidates) {
      if (c.delta <= threshold && (!bestY || c.delta < bestY.delta)) {
        bestY = { id: other.id, ...c };
      }
    }
  }

  if (bestX) {
    projectedX = bestX.pos - bestX.offset;
    snappedTo = { axis: "x", otherId: bestX.id, position: bestX.pos };
  }
  if (bestY) {
    projectedY = bestY.pos - bestY.offset;
    snappedTo = snappedTo
      ? snappedTo
      : { axis: "y", otherId: bestY.id, position: bestY.pos };
  }

  return {
    x: projectedX,
    y: projectedY,
    width: dragged.width,
    height: dragged.height,
    snappedTo,
  };
}

const overlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 4,
  overflow: "hidden",
};

type RawNode = Node & { width?: number; height?: number };

function nodeRect(n: RawNode) {
  return {
    id: n.id,
    x: n.position.x,
    y: n.position.y,
    width: n.measured?.width ?? n.width ?? 200,
    height: n.measured?.height ?? n.height ?? 60,
  };
}

export type DropProjectionProps = {
  gridSize?: number;
  snapThreshold?: number;
};

/**
 * Reads the live dragging node from the React Flow store and renders a
 * dashed "ghost" outline at the position the node will land on release.
 * Also emits short crosshair ticks and a pill label showing the projected
 * x / y coordinates. Nothing renders when no node is being dragged.
 */
export function DropProjection({
  gridSize = DEFAULT_GRID,
  snapThreshold = SNAP_THRESHOLD,
}: DropProjectionProps) {
  const { nodes, viewport } = useStore((s) => ({
    nodes: s.nodes as RawNode[],
    viewport: { x: s.transform[0], y: s.transform[1], zoom: s.transform[2] },
  }));

  const dragged = nodes.find((n) => n.dragging);

  const projection = useMemo(() => {
    if (!dragged) return null;
    const draggedRect = nodeRect(dragged);
    const others = nodes
      .filter((n) => n.id !== dragged.id && !n.hidden)
      .map(nodeRect);
    return computeProjection(draggedRect, { gridSize, snapThreshold, others });
  }, [dragged, nodes, gridSize, snapThreshold]);

  if (!projection || !dragged) return null;

  const draggedRect = nodeRect(dragged);
  const deltaX = projection.x - draggedRect.x;
  const deltaY = projection.y - draggedRect.y;
  const isMoved = Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5;

  const strokeWidth = 1.5 / viewport.zoom;
  const dash = `${6 / viewport.zoom} ${4 / viewport.zoom}`;
  const cornerLen = 14 / viewport.zoom;
  const labelFont = Math.max(9, 10 / viewport.zoom);

  return (
    <div style={overlayStyle}>
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <g transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.zoom})`}>
          {isMoved && (
            <>
              <line
                x1={draggedRect.x + draggedRect.width / 2}
                y1={draggedRect.y + draggedRect.height / 2}
                x2={projection.x + projection.width / 2}
                y2={projection.y + projection.height / 2}
                stroke="#ba9eff"
                strokeWidth={strokeWidth}
                strokeDasharray={`${3 / viewport.zoom} ${3 / viewport.zoom}`}
                opacity={0.45}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={0}
                  to={12 / viewport.zoom}
                  dur="0.7s"
                  repeatCount="indefinite"
                />
              </line>
              <circle
                cx={projection.x + projection.width / 2}
                cy={projection.y + projection.height / 2}
                r={4 / viewport.zoom}
                fill="#ba9eff"
                opacity={0.9}
              >
                <animate
                  attributeName="r"
                  values={`${3 / viewport.zoom};${6 / viewport.zoom};${3 / viewport.zoom}`}
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          <rect
            x={projection.x}
            y={projection.y}
            width={projection.width}
            height={projection.height}
            rx={12}
            fill="rgba(186, 158, 255, 0.06)"
            stroke="#ba9eff"
            strokeWidth={strokeWidth}
            strokeDasharray={dash}
            opacity={0.9}
          >
            <animate
              attributeName="stroke-dashoffset"
              from={0}
              to={20 / viewport.zoom}
              dur="0.9s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.55;0.95;0.55"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </rect>

          {[
            { x: projection.x, y: projection.y, dx: cornerLen, dy: cornerLen },
            { x: projection.x + projection.width, y: projection.y, dx: -cornerLen, dy: cornerLen },
            { x: projection.x, y: projection.y + projection.height, dx: cornerLen, dy: -cornerLen },
            {
              x: projection.x + projection.width,
              y: projection.y + projection.height,
              dx: -cornerLen,
              dy: -cornerLen,
            },
          ].map((c, i) => (
            <g key={i}>
              <line
                x1={c.x}
                y1={c.y}
                x2={c.x + c.dx}
                y2={c.y}
                stroke="#ba9eff"
                strokeWidth={strokeWidth * 2}
                opacity={0.95}
              />
              <line
                x1={c.x}
                y1={c.y}
                x2={c.x}
                y2={c.y + c.dy}
                stroke="#ba9eff"
                strokeWidth={strokeWidth * 2}
                opacity={0.95}
              />
            </g>
          ))}

          <g
            transform={`translate(${projection.x + projection.width / 2}, ${
              projection.y - 14 / viewport.zoom
            })`}
          >
            <rect
              x={-44 / viewport.zoom}
              y={-16 / viewport.zoom}
              width={88 / viewport.zoom}
              height={14 / viewport.zoom}
              rx={4 / viewport.zoom}
              fill="rgba(17, 20, 22, 0.95)"
              stroke="#ba9eff"
              strokeWidth={strokeWidth}
              opacity={0.95}
            />
            <text
              x={0}
              y={-5 / viewport.zoom}
              textAnchor="middle"
              fill="#ba9eff"
              fontFamily="JetBrains Mono, monospace"
              fontSize={labelFont}
              fontWeight={600}
              letterSpacing={0.5}
            >
              {Math.round(projection.x)}, {Math.round(projection.y)}
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
