import { useMemo } from "react";
import { ReactFlow, Background, Controls, type Node, type Edge } from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import type { Workflow } from "../api/client";
import * as styles from "./graph_view.css";

type NodeProgress = { status: string; progress: number };

type GraphViewProps = {
  workflow: Workflow | null;
  nodeProgress: Record<string, NodeProgress>;
};

const NODE_WIDTH = 160;
const NODE_HEIGHT = 60;

function statusClass(status: string | undefined): string {
  if (status === "running") return `${styles.graphNode} ${styles.graphNodeRunning}`;
  if (status === "completed") return `${styles.graphNode} ${styles.graphNodeCompleted}`;
  if (status === "failed") return `${styles.graphNode} ${styles.graphNodeFailed}`;
  return styles.graphNode;
}

function buildLayout(workflow: Workflow, progress: Record<string, NodeProgress>) {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", nodesep: 40, ranksep: 80 });
  g.setDefaultEdgeLabel(() => ({}));

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const knownNodeIds = new Set<string>();

  workflow.stages.forEach((stage) => {
    stage.nodes.forEach((wfNode) => {
      if (knownNodeIds.has(wfNode.id)) return;
      knownNodeIds.add(wfNode.id);
      g.setNode(wfNode.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
      nodes.push({
        id: wfNode.id,
        position: { x: 0, y: 0 },
        data: { label: wfNode.id, operator: wfNode.operator },
        className: statusClass(progress[wfNode.id]?.status),
      });
    });
  });

  // Use the structured edges the backend returns. Drop any that reference a
  // node we didn't add (e.g. workflow-level inputs surfaced as edge sources),
  // since dagre requires both endpoints to be registered nodes.
  (workflow.edges ?? []).forEach((e) => {
    if (!knownNodeIds.has(e.source_node) || !knownNodeIds.has(e.target_node)) {
      return;
    }
    const edgeId = `${e.source_node}:${e.source_port}->${e.target_node}:${e.target_port}`;
    edges.push({
      id: edgeId,
      source: e.source_node,
      target: e.target_node,
      sourceHandle: e.source_port,
      targetHandle: e.target_port,
    });
    g.setEdge(e.source_node, e.target_node);
  });

  dagre.layout(g);

  const positioned = nodes.map((n) => {
    const pos = g.node(n.id);
    return { ...n, position: { x: pos.x - NODE_WIDTH / 2, y: pos.y - NODE_HEIGHT / 2 } };
  });

  return { nodes: positioned, edges };
}

export function GraphView({ workflow, nodeProgress }: GraphViewProps) {
  const { nodes, edges } = useMemo(
    () => (workflow ? buildLayout(workflow, nodeProgress) : { nodes: [], edges: [] }),
    [workflow, nodeProgress],
  );

  return (
    <div className={styles.container}>
      <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
