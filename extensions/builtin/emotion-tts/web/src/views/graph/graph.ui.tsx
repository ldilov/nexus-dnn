import type { WorkflowDocument, WorkflowEdge, WorkflowNode } from "../../services/workflows_client";
import * as css from "./graph.css";

const CURATED_NODE_IDS = new Set([
  "script_parse_1",
  "mapping_resolve_1",
  "emotion_resolve_1",
  "synthesize_1",
  "postprocess_1",
  "preview_mix_1",
  "export_bundle_1",
]);

const NODE_WIDTH = 220;
const NODE_HEIGHT = 92;
const COL_GAP = 60;
const ROW_GAP = 36;

interface LayoutNode extends WorkflowNode {
  x: number;
  y: number;
}

interface Props {
  document: WorkflowDocument;
  backHref: string;
  title: string;
}

export function GraphUi({ document, backHref, title }: Props): JSX.Element {
  const layout = layoutNodes(document.nodes);
  const width = Math.max(...layout.map((n) => n.x + NODE_WIDTH)) + 40;
  const height = Math.max(...layout.map((n) => n.y + NODE_HEIGHT)) + 40;

  return (
    <div className={css.shell}>
      <div className={css.header}>
        <div>
          <h1 className={css.title}>{title}</h1>
          <p className={css.subtitle}>
            Template <code>{document.templateId}</code> · {document.nodes.length} nodes ·{" "}
            {document.edges.length} edges
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {document.customised && (
            <span className={css.badge}>Customised — recipe binds mappable fields only</span>
          )}
          <a href={backHref} className={css.backLink}>
            ← Back to recipe
          </a>
        </div>
      </div>

      <div className={css.legend}>
        <span>
          <span className={`${css.legendSwatch} ${css.legendSwatchCurated}`} />
          curated node
        </span>
        <span>
          <span className={`${css.legendSwatch} ${css.legendSwatchCustom}`} />
          custom node
        </span>
        <span>Read-only in v1 — edit via the recipe panel.</span>
      </div>

      <div className={css.canvas}>
        <svg
          className={css.svgRoot}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="EmotionTTS workflow graph"
        >
          <g>
            {document.edges.map((e) => (
              <EdgePath key={`${e.from}->${e.to}`} edge={e} layout={layout} />
            ))}
          </g>
          <g>
            {layout.map((n) => (
              <NodeCard key={n.id} node={n} />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}

function NodeCard({ node }: { node: LayoutNode }): JSX.Element {
  const isCurated = CURATED_NODE_IDS.has(node.id);
  const configPreview = Object.entries(node.config)
    .slice(0, 2)
    .map(([k, v]) => `${k}: ${formatValue(v)}`);

  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <rect
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        rx={10}
        className={isCurated ? css.nodeCardCurated : css.nodeCard}
      />
      <text x={14} y={24} className={css.nodeTitle}>
        {node.id}
      </text>
      <text x={14} y={42} className={css.nodeOperator}>
        {node.operatorId}
      </text>
      {configPreview.map((line, i) => (
        <text key={i} x={14} y={62 + i * 14} className={css.nodeConfigBlock}>
          {line}
        </text>
      ))}
    </g>
  );
}

function EdgePath({
  edge,
  layout,
}: {
  edge: WorkflowEdge;
  layout: LayoutNode[];
}): JSX.Element | null {
  const from = layout.find((n) => n.id === edge.from);
  const to = layout.find((n) => n.id === edge.to);
  if (!from || !to) return null;
  const x1 = from.x + NODE_WIDTH;
  const y1 = from.y + NODE_HEIGHT / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_HEIGHT / 2;
  const midX = (x1 + x2) / 2;
  const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  return <path d={d} className={css.edgeLine} />;
}

function layoutNodes(nodes: WorkflowNode[]): LayoutNode[] {
  const columns = assignColumns(nodes);
  const byCol = new Map<number, WorkflowNode[]>();
  for (const n of nodes) {
    const c = columns.get(n.id) ?? 0;
    const arr = byCol.get(c) ?? [];
    arr.push(n);
    byCol.set(c, arr);
  }
  const out: LayoutNode[] = [];
  for (const [col, entries] of byCol.entries()) {
    const x = 40 + col * (NODE_WIDTH + COL_GAP);
    entries.forEach((node, rowIdx) => {
      const y = 40 + rowIdx * (NODE_HEIGHT + ROW_GAP);
      out.push({ ...node, x, y });
    });
  }
  return out;
}

function assignColumns(nodes: WorkflowNode[]): Map<string, number> {
  const order = [
    "script_parse_1",
    "mapping_resolve_1",
    "emotion_resolve_1",
    "synthesize_1",
    "postprocess_1",
    "export_bundle_1",
  ];
  const columns = new Map<string, number>();
  order.forEach((id, idx) => columns.set(id, idx));
  columns.set("preview_mix_1", 4);
  let fallback = order.length;
  for (const n of nodes) {
    if (!columns.has(n.id)) {
      columns.set(n.id, fallback);
      fallback += 1;
    }
  }
  return columns;
}

function formatValue(v: unknown): string {
  if (typeof v === "string") return `"${v}"`;
  if (Array.isArray(v)) return `[${v.length}]`;
  if (v === null) return "null";
  if (typeof v === "object") return "{…}";
  return String(v);
}
