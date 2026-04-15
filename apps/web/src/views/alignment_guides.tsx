import { useMemo, type CSSProperties } from "react";
import { useStore, type Node } from "@xyflow/react";

export type AlignmentGuide = {
  orientation: "horizontal" | "vertical";
  position: number;
};

const GUIDE_TOLERANCE = 6;

/**
 * Given the active drag target and a snapshot of the other nodes, return the
 * set of guide lines that the dragged node currently aligns with.
 *
 * Matching axes:
 *  - vertical: source node's left / center / right vs. target left / center / right
 *  - horizontal: source top / center / bottom vs. target top / center / bottom
 *
 * Tolerance is intentionally small (6 px in flow coordinates) so guides only
 * appear when the alignment is close — matches how Figma / Sketch behave.
 */
export function computeAlignmentGuides(
  dragged: { x: number; y: number; width: number; height: number },
  others: ReadonlyArray<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>,
): AlignmentGuide[] {
  const guides: AlignmentGuide[] = [];

  const dxs = [dragged.x, dragged.x + dragged.width / 2, dragged.x + dragged.width];
  const dys = [dragged.y, dragged.y + dragged.height / 2, dragged.y + dragged.height];

  for (const other of others) {
    const oxs = [other.x, other.x + other.width / 2, other.x + other.width];
    const oys = [other.y, other.y + other.height / 2, other.y + other.height];

    for (const dx of dxs) {
      for (const ox of oxs) {
        if (Math.abs(dx - ox) <= GUIDE_TOLERANCE) {
          guides.push({ orientation: "vertical", position: ox });
        }
      }
    }
    for (const dy of dys) {
      for (const oy of oys) {
        if (Math.abs(dy - oy) <= GUIDE_TOLERANCE) {
          guides.push({ orientation: "horizontal", position: oy });
        }
      }
    }
  }

  const deduped = new Map<string, AlignmentGuide>();
  for (const g of guides) {
    deduped.set(`${g.orientation}:${Math.round(g.position)}`, g);
  }
  return Array.from(deduped.values());
}

const overlayStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 4,
  overflow: "hidden",
};

type RawNode = Node & { width?: number; height?: number };

/**
 * Renders dashed purple lines on the canvas for every alignment the dragging
 * node currently satisfies with another node. Reads the node state directly
 * from the React Flow store so it reacts to every drag tick without us having
 * to thread callbacks through.
 */
export function AlignmentGuides() {
  const { nodes, viewport } = useStore((s) => ({
    nodes: s.nodes as RawNode[],
    viewport: { x: s.transform[0], y: s.transform[1], zoom: s.transform[2] },
  }));

  const dragged = nodes.find((n) => n.dragging);

  const guides = useMemo<AlignmentGuide[]>(() => {
    if (!dragged) return [];
    const draggedRect = {
      x: dragged.position.x,
      y: dragged.position.y,
      width: dragged.measured?.width ?? dragged.width ?? 200,
      height: dragged.measured?.height ?? dragged.height ?? 60,
    };
    const others = nodes
      .filter((n) => n.id !== dragged.id && !n.hidden)
      .map((n) => ({
        x: n.position.x,
        y: n.position.y,
        width: n.measured?.width ?? n.width ?? 200,
        height: n.measured?.height ?? n.height ?? 60,
      }));
    return computeAlignmentGuides(draggedRect, others);
  }, [dragged, nodes]);

  if (guides.length === 0) return null;

  return (
    <div style={overlayStyle}>
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <g transform={`translate(${viewport.x} ${viewport.y}) scale(${viewport.zoom})`}>
          {guides.map((g, i) => {
            const isVertical = g.orientation === "vertical";
            return (
              <line
                key={`${isVertical ? "v" : "h"}-${i}`}
                x1={isVertical ? g.position : -100000}
                x2={isVertical ? g.position : 100000}
                y1={isVertical ? -100000 : g.position}
                y2={isVertical ? 100000 : g.position}
                stroke="#22D3EE"
                strokeWidth={1.2 / viewport.zoom}
                strokeDasharray={`${6 / viewport.zoom} ${4 / viewport.zoom}`}
                opacity={0.9}
                style={{ filter: "drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))" }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={0}
                  to={20 / viewport.zoom}
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </line>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
