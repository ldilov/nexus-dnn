import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  ConnectionMode,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  useReactFlow,
  ReactFlowProvider,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  type IsValidConnection,
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import {
  updateWorkflowGraph,
  type OperatorDto,
  type Workflow,
  type WorkflowNode,
  type WorkflowNodeInputDto,
} from "../../../../api/client";
import { useOperatorSpecs, type OperatorSpecMap } from "../../../../hooks/use_operator_specs";
import { useWorkflowEditor } from "../../../../hooks/use_workflow_editor";
import { useEventStream } from "../../../../hooks/use_event_stream";
import { useLivePortValues } from "../../../../hooks/use_live_port_values";
import { useCanvasState } from "../../../../hooks/use_canvas_state";
import { computePromotions, useDraftNodes } from "../../../../hooks/use_draft_nodes";
import { toast } from "sonner";
import {
  OperatorNode,
  operatorNodeHeight,
  type NodeStatus,
  type OperatorNodeData,
} from "../../../../components/nodes/operator_node";
import {
  BoundaryNode,
  boundaryNodeHeight,
  type BoundaryNodeData,
  type BoundaryPort,
} from "../../../../components/nodes/boundary_nodes";
import { RerouteNode, type RerouteNodeData } from "../../../../components/nodes/reroute_node";
import { NoteNode, type NoteNodeData } from "../../../../components/nodes/note_node";
import { arePortsCompatible, colorForPortType } from "../../../../components/nodes/port_types";
import { GraphToolbar } from "./graph_toolbar";
import { OperatorPalette } from "./operator_palette";
import { CanvasContextMenu, type ContextMenuItem } from "./canvas_context_menu";
import { AlignmentGuides } from "./alignment_guides";
import { DropProjection, computeProjection } from "./drop_projection";
import * as styles from "./graph_view.css";

const GRID_SIZE = 16;
const SNAP_THRESHOLD = 8;

const NODE_WIDTH = 240;
const BOUNDARY_WIDTH = 180;

const INPUTS_NODE_ID = "__inputs__";
const OUTPUTS_NODE_ID = "__outputs__";

type NodeProgress = { status: string; progress: number };

type GraphViewProps = {
  workflow: Workflow | null;
  nodeProgress: Record<string, NodeProgress>;
  onSelectNode?: (node: WorkflowNode) => void;
  runId?: string | null;
  onWorkflowSaved?: (workflow: Workflow) => void;
};

const nodeTypes: NodeTypes = {
  operator: OperatorNode as unknown as NodeTypes[string],
  boundary: BoundaryNode as unknown as NodeTypes[string],
  reroute: RerouteNode as unknown as NodeTypes[string],
  note: NoteNode as unknown as NodeTypes[string],
};

function mapStatus(raw: string | undefined): NodeStatus {
  switch (raw) {
    case "running":
      return "running";
    case "completed":
    case "cache_hit":
      return "completed";
    case "failed":
    case "cancelled":
      return "failed";
    default:
      return "idle";
  }
}

function isLiteralInput(input: WorkflowNodeInputDto): input is { value: unknown } {
  return typeof (input as { from?: unknown }).from !== "string";
}

/**
 * Build the set of nodes and edges React Flow renders. Includes:
 *  - One custom `operator` node per workflow node.
 *  - Two synthetic `boundary` nodes for workflow-level inputs/outputs so every
 *    edge in the DAG has a visible endpoint (no silent drops like the previous
 *    implementation).
 *  - Edges colored and routed by port type (resolved from the operator spec).
 */
function buildLayout(
  workflow: Workflow,
  progress: Record<string, NodeProgress>,
  specs: OperatorSpecMap,
): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", nodesep: 60, ranksep: 140, marginx: 24, marginy: 24 });
  g.setDefaultEdgeLabel(() => ({}));

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const known = new Set<string>();
  const nodeSpecById = new Map<string, ReturnType<OperatorSpecMap["get"]>>();
  const workflowNodesById = new Map<string, WorkflowNode>();

  for (const stage of workflow.stages) {
    for (const wfNode of stage.nodes) {
      if (known.has(wfNode.id)) continue;
      known.add(wfNode.id);
      workflowNodesById.set(wfNode.id, wfNode);

      const spec = specs.get(wfNode.operator) ?? null;
      nodeSpecById.set(wfNode.id, spec ?? undefined);

      const inputs = Object.entries(wfNode.inputs);
      const literals = inputs
        .filter(([, v]) => v && isLiteralInput(v))
        .map(([name, v]) => ({ name, value: (v as { value: unknown }).value }));

      const inputCount = spec?.inputs.length ?? 0;
      const outputCount = spec?.outputs.length ?? 0;
      const height = operatorNodeHeight(inputCount, outputCount, literals.length);
      g.setNode(wfNode.id, { width: NODE_WIDTH, height });

      const status = mapStatus(progress[wfNode.id]?.status);
      const data: OperatorNodeData = {
        label: spec?.display_name ?? wfNode.id,
        operator: wfNode.operator,
        status,
        progress: progress[wfNode.id]?.progress,
        spec,
        literals,
        nodeId: wfNode.id,
      };
      nodes.push({
        id: wfNode.id,
        type: "operator",
        position: { x: 0, y: 0 },
        data: data as unknown as Record<string, unknown>,
      });
    }
  }

  const inputPorts: BoundaryPort[] = workflow.inputs?.map((p) => ({
    name: p.name,
    portType: (p as { type?: string }).type ?? (p as { port_type?: string }).port_type ?? "any",
  })) ?? [];

  if (inputPorts.length > 0) {
    const h = boundaryNodeHeight(inputPorts.length);
    g.setNode(INPUTS_NODE_ID, { width: BOUNDARY_WIDTH, height: h });
    const data: BoundaryNodeData = {
      label: "Inputs",
      subtitle: `${inputPorts.length} port${inputPorts.length === 1 ? "" : "s"}`,
      ports: inputPorts,
      direction: "inputs",
    };
    nodes.push({
      id: INPUTS_NODE_ID,
      type: "boundary",
      position: { x: 0, y: 0 },
      data: data as unknown as Record<string, unknown>,
    });
  }

  const outputPorts: BoundaryPort[] = (workflow.outputs ?? []).map((o) => {
    const raw = (o as { from?: string }).from ?? "";
    const [srcNode, srcPort] = raw.split(":");
    const srcSpec = srcNode ? nodeSpecById.get(srcNode) : undefined;
    const srcPortSpec = srcSpec?.outputs.find((p) => p.name === srcPort);
    return {
      name: (o as { name: string }).name,
      portType: srcPortSpec?.port_type ?? "any",
    };
  });

  if (outputPorts.length > 0) {
    const h = boundaryNodeHeight(outputPorts.length);
    g.setNode(OUTPUTS_NODE_ID, { width: BOUNDARY_WIDTH, height: h });
    const data: BoundaryNodeData = {
      label: "Outputs",
      subtitle: `${outputPorts.length} port${outputPorts.length === 1 ? "" : "s"}`,
      ports: outputPorts,
      direction: "outputs",
    };
    nodes.push({
      id: OUTPUTS_NODE_ID,
      type: "boundary",
      position: { x: 0, y: 0 },
      data: data as unknown as Record<string, unknown>,
    });
  }

  const nodeIds = new Set(nodes.map((n) => n.id));

  for (const e of workflow.edges ?? []) {
    const sourceId = e.source_node === "input" ? INPUTS_NODE_ID : e.source_node;
    const targetId = e.target_node;
    if (!nodeIds.has(sourceId) || !nodeIds.has(targetId)) continue;

    const sourcePortType = resolvePortType(
      sourceId,
      e.source_port,
      "source",
      nodeSpecById,
      inputPorts,
      outputPorts,
    );
    const color = colorForPortType(sourcePortType).base;

    const animated =
      mapStatus(progress[sourceId]?.status) === "running" ||
      mapStatus(progress[targetId]?.status) === "running";

    edges.push({
      id: `${sourceId}:${e.source_port}->${targetId}:${e.target_port}`,
      source: sourceId,
      target: targetId,
      sourceHandle: e.source_port,
      targetHandle: e.target_port,
      animated,
      style: { stroke: color, strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
    });
    g.setEdge(sourceId, targetId);
  }

  for (const out of workflow.outputs ?? []) {
    const raw = (out as { from?: string }).from;
    if (!raw) continue;
    const [srcNode, srcPort] = raw.split(":");
    if (!srcNode || !srcPort) continue;
    if (!nodeIds.has(srcNode) || !nodeIds.has(OUTPUTS_NODE_ID)) continue;

    const sourcePortType = resolvePortType(
      srcNode,
      srcPort,
      "source",
      nodeSpecById,
      inputPorts,
      outputPorts,
    );
    const color = colorForPortType(sourcePortType).base;
    const animated = mapStatus(progress[srcNode]?.status) === "running";

    edges.push({
      id: `${srcNode}:${srcPort}->${OUTPUTS_NODE_ID}:${(out as { name: string }).name}`,
      source: srcNode,
      target: OUTPUTS_NODE_ID,
      sourceHandle: srcPort,
      targetHandle: (out as { name: string }).name,
      animated,
      style: { stroke: color, strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
    });
    g.setEdge(srcNode, OUTPUTS_NODE_ID);
  }

  dagre.layout(g);

  const positioned = nodes.map((n) => {
    const pos = g.node(n.id);
    const w = n.type === "boundary" ? BOUNDARY_WIDTH : NODE_WIDTH;
    return { ...n, position: { x: pos.x - w / 2, y: pos.y - pos.height / 2 } };
  });

  return { nodes: positioned, edges };
}

function resolvePortType(
  nodeId: string,
  portName: string,
  direction: "source" | "target",
  specs: Map<string, { inputs: { name: string; port_type: string }[]; outputs: { name: string; port_type: string }[] } | undefined>,
  inputPorts: BoundaryPort[],
  outputPorts: BoundaryPort[],
): string | null {
  if (nodeId === INPUTS_NODE_ID) {
    return inputPorts.find((p) => p.name === portName)?.portType ?? null;
  }
  if (nodeId === OUTPUTS_NODE_ID) {
    return outputPorts.find((p) => p.name === portName)?.portType ?? null;
  }
  const spec = specs.get(nodeId);
  if (!spec) return null;
  const pool = direction === "source" ? spec.outputs : spec.inputs;
  return pool.find((p) => p.name === portName)?.port_type ?? null;
}

export function GraphView(props: GraphViewProps) {
  return (
    <ReactFlowProvider>
      <GraphViewInner {...props} />
    </ReactFlowProvider>
  );
}

function GraphViewInner({
  workflow,
  nodeProgress,
  onSelectNode,
  runId = null,
  onWorkflowSaved,
}: GraphViewProps) {
  const { specs } = useOperatorSpecs();
  const { events } = useEventStream();
  const live = useLivePortValues(events, runId);
  const flow = useReactFlow();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [editable, setEditable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    flowPos: { x: number; y: number };
  } | null>(null);

  const editor = useWorkflowEditor(workflow, specs);
  const canvas = useCanvasState(workflow?.id ?? null);
  const operatorList = useMemo(() => Array.from(specs.values()), [specs]);
  const draftNodes = useDraftNodes(workflow?.id ?? null);

  const workflowNodesById = useMemo(() => {
    const map = new Map<string, WorkflowNode>();
    workflow?.stages.forEach((s) => s.nodes.forEach((n) => map.set(n.id, n)));
    return map;
  }, [workflow]);

  const handleLiteralChange = useCallback(
    (nodeId: string, portName: string, value: unknown) => {
      editor.setLiteral(nodeId, portName, value);
    },
    [editor],
  );

  const sourceWorkflow = useMemo<Workflow | null>(() => {
    if (!workflow) return null;
    if (!editable || !editor.draft) return workflow;
    return {
      ...workflow,
      nodes: editor.draft.nodes,
      edges: editor.draft.edges,
      stages: workflow.stages.map((s) => ({
        ...s,
        nodes: editor.draft!.nodes.filter((n) => n.stage === s.id),
      })),
    };
  }, [workflow, editable, editor.draft]);

  const { nodes, edges } = useMemo(() => {
    if (!sourceWorkflow) return { nodes: [], edges: [] };
    const built = buildLayout(sourceWorkflow, nodeProgress, specs);
    const editorErrorsByNode = new Map<string, string[]>();
    for (const err of editor.errors) {
      if (!err.nodeId) continue;
      const list = editorErrorsByNode.get(err.nodeId) ?? [];
      list.push(err.message);
      editorErrorsByNode.set(err.nodeId, list);
    }
    const decorated = built.nodes.map((n) => {
      if (n.type !== "operator") return n;
      const data = n.data as unknown as OperatorNodeData;
      const nodeIsDraft = draftNodes.isDraft(n.id);
      const liveStatus = live.nodeStatus[n.id]?.status;
      const nextStatus =
        liveStatus === "cache_hit"
          ? "completed"
          : liveStatus === "running"
            ? "running"
            : liveStatus === "completed"
              ? "completed"
              : liveStatus === "failed"
                ? "failed"
                : data.status;
      const livePortValues: Record<string, unknown> = {};
      for (const [key, snapshot] of Object.entries(live.portValues)) {
        const [srcNode, srcPort] = key.split(":");
        if (srcNode === n.id && srcPort) {
          livePortValues[srcPort] = snapshot.lastValue;
        }
      }
      const rawErrors = editorErrorsByNode.get(n.id);
      const filteredErrors = nodeIsDraft
        ? rawErrors?.filter((msg) => !/required input/i.test(msg))
        : rawErrors;
      return {
        ...n,
        className: nodeIsDraft ? styles.nodeDraft : undefined,
        data: {
          ...data,
          status: nextStatus as OperatorNodeData["status"],
          editable,
          onLiteralChange: handleLiteralChange,
          errors: filteredErrors,
          livePortValues,
          isDraft: nodeIsDraft,
        } as unknown as Record<string, unknown>,
      };
    });
    const withCanvasPositions = decorated.map((n) => {
      const override = canvas.state.node_positions[n.id];
      if (override) {
        return { ...n, position: { x: override.x, y: override.y } };
      }
      return n;
    });

    const extraNodes: Node[] = [];
    for (const note of canvas.state.notes) {
      const data: NoteNodeData = {
        text: note.text,
        accent: "yellow",
        editable,
        nodeId: note.id,
        onTextChange: (_id, next) => canvas.updateNote(note.id, { text: next }),
      };
      extraNodes.push({
        id: note.id,
        type: "note",
        position: { x: note.position.x, y: note.position.y },
        data: data as unknown as Record<string, unknown>,
      });
    }
    for (const reroute of canvas.state.reroutes) {
      const data: RerouteNodeData = { portType: reroute.port_type };
      extraNodes.push({
        id: reroute.id,
        type: "reroute",
        position: { x: reroute.position.x, y: reroute.position.y },
        data: data as unknown as Record<string, unknown>,
      });
    }

    return { nodes: [...withCanvasPositions, ...extraNodes], edges: built.edges };
  }, [
    sourceWorkflow,
    nodeProgress,
    specs,
    editable,
    editor.errors,
    handleLiteralChange,
    live.nodeStatus,
    live.portValues,
    canvas.state.node_positions,
    canvas.state.notes,
    canvas.state.reroutes,
    canvas.updateNote,
  ]);

  const isValidConnection: IsValidConnection = (connection) => {
    if (!connection.source || !connection.target) return false;
    if (!connection.sourceHandle || !connection.targetHandle) return true;
    const specMap = new Map(nodes.map((n) => [n.id, n.data]));
    const sourceData = specMap.get(connection.source);
    const targetData = specMap.get(connection.target);
    const sourceType = findPortType(sourceData, connection.sourceHandle, "source");
    const targetType = findPortType(targetData, connection.targetHandle, "target");
    return arePortsCompatible(sourceType, targetType);
  };

  const onConnect = useCallback(
    (c: Connection) => {
      if (!c.source || !c.target || !c.sourceHandle || !c.targetHandle) return;
      if (c.source === OUTPUTS_NODE_ID || c.target === INPUTS_NODE_ID) return;
      if (!editable) setEditable(true);
      const sourceNode = c.source === INPUTS_NODE_ID ? "input" : c.source;
      if (c.target === OUTPUTS_NODE_ID) {
        editor.bindOutput(c.targetHandle, sourceNode, c.sourceHandle);
        return;
      }
      editor.connect(sourceNode, c.sourceHandle, c.target, c.targetHandle);
    },
    [editable, editor],
  );

  const onEdgesDelete = useCallback(
    (edgesToDelete: Edge[]) => {
      if (!editable) setEditable(true);
      for (const e of edgesToDelete) {
        if (e.target === OUTPUTS_NODE_ID && e.targetHandle) {
          editor.unbindOutput(e.targetHandle);
          continue;
        }
        const canonicalId =
          e.source === INPUTS_NODE_ID
            ? `input:${e.sourceHandle}->${e.target}:${e.targetHandle}`
            : e.id;
        editor.disconnect(canonicalId);
      }
    },
    [editable, editor],
  );

  const makeUniqueNodeId = useCallback(
    (base: string) => {
      const existing = new Set(editor.draft?.nodes.map((n) => n.id) ?? []);
      if (!existing.has(base)) return base;
      for (let i = 2; i < 1000; i += 1) {
        const candidate = `${base}_${i}`;
        if (!existing.has(candidate)) return candidate;
      }
      return `${base}_${Date.now()}`;
    },
    [editor.draft],
  );

  const handleAddOperator = useCallback(
    (op: OperatorDto, centerPos?: { x: number; y: number }) => {
      if (!editable || !editor.draft) return;
      const base = op.id.split(".").pop() ?? op.id;
      const nodeId = makeUniqueNodeId(base);
      editor.addNode({
        id: nodeId,
        operator: `${op.id}@${op.version}`,
        stage: null,
        inputs: {},
        config: null,
      });
      draftNodes.markDraft(nodeId);
      if (centerPos) canvas.setNodePosition(nodeId, centerPos);
      setPaletteOpen(false);
    },
    [editable, editor, canvas, makeUniqueNodeId, draftNodes],
  );

  const handleAddNote = useCallback(
    (pos: { x: number; y: number }) => {
      canvas.addNote("double-click to edit…", pos);
    },
    [canvas],
  );

  useEffect(() => {
    if (!sourceWorkflow) return;
    const toPromote = computePromotions(sourceWorkflow, specs, draftNodes.draftIds());
    if (toPromote.length === 0) return;
    for (const id of toPromote) draftNodes.promote(id);
  }, [sourceWorkflow, specs, draftNodes]);

  const handleSave = useCallback(async () => {
    if (!workflow) return;
    const stillDraft = Array.from(draftNodes.draftIds());
    if (stillDraft.length > 0) {
      toast.error(
        `${stillDraft.length} node${stillDraft.length === 1 ? "" : "s"} still draft`,
        {
          description: `Wire their required inputs or right-click → Mark as live: ${stillDraft.slice(0, 4).join(", ")}${stillDraft.length > 4 ? "…" : ""}`,
        },
      );
      return;
    }
    const payload = editor.toPayload();
    if (!payload) return;
    setSaving(true);
    try {
      const fresh = await updateWorkflowGraph(workflow.id, payload);
      onWorkflowSaved?.(fresh);
      editor.load(fresh);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error("Workflow save failed", { description: msg });
    } finally {
      setSaving(false);
    }
  }, [workflow, editor, onWorkflowSaved, draftNodes]);

  const handleRevert = useCallback(() => {
    editor.reset();
  }, [editor]);

  const onContextMenu = useCallback(
    (event: React.MouseEvent) => {
      if (!editable) return;
      event.preventDefault();
      const bounds = containerRef.current?.getBoundingClientRect();
      const flowPos = flow.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setContextMenu({
        x: event.clientX - (bounds?.left ?? 0),
        y: event.clientY - (bounds?.top ?? 0),
        flowPos,
      });
    },
    [editable, flow],
  );

  const draftCount = draftNodes.draftIds().size;
  const contextItems: ContextMenuItem[] = contextMenu
    ? [
        {
          label: "Add note",
          onClick: () => handleAddNote(contextMenu.flowPos),
        },
        {
          label: "Add operator…",
          onClick: () => setPaletteOpen(true),
          separatorBefore: true,
        },
        ...(draftCount > 0
          ? [
              {
                label: `Mark all ${draftCount} draft node${draftCount === 1 ? "" : "s"} live`,
                onClick: () => {
                  for (const id of Array.from(draftNodes.draftIds())) {
                    draftNodes.promote(id);
                  }
                },
                separatorBefore: true,
              } as ContextMenuItem,
            ]
          : []),
      ]
    : [];

  return (
    <div className={styles.container} ref={containerRef} onContextMenu={onContextMenu}>
      <GraphToolbar
        dirty={editor.dirty}
        saving={saving}
        errors={editor.errors}
        userEditedAt={editor.userEditedAt}
        editable={editable}
        onSave={handleSave}
        onRevert={handleRevert}
        onToggleEdit={() => {
          if (editable && editor.dirty) editor.reset();
          setEditable((p) => !p);
          setPaletteOpen(false);
        }}
        onAddOperator={editable ? () => setPaletteOpen((p) => !p) : undefined}
      />
      {editable && paletteOpen && (
        <OperatorPalette
          operators={operatorList}
          onSelect={(op) => {
            const viewport = flow.getViewport();
            const rect = containerRef.current?.getBoundingClientRect();
            const center = flow.screenToFlowPosition({
              x: (rect?.left ?? 0) + (rect?.width ?? 0) / 2,
              y: (rect?.top ?? 0) + (rect?.height ?? 0) / 2,
            });
            void viewport;
            handleAddOperator(op, center);
          }}
          onClose={() => setPaletteOpen(false)}
        />
      )}
      {contextMenu && (
        <CanvasContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextItems}
          onClose={() => setContextMenu(null)}
        />
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable
        nodesConnectable
        edgesFocusable
        edgesReconnectable
        elementsSelectable
        onNodeClick={(_e, n) => {
          const wfNode = workflowNodesById.get(n.id);
          if (wfNode && onSelectNode) onSelectNode(wfNode);
        }}
        onNodeDragStop={(_e, n) => {
          const nodeSnapshot = flow.getNode(n.id);
          const width = nodeSnapshot?.measured?.width ?? nodeSnapshot?.width ?? 200;
          const height = nodeSnapshot?.measured?.height ?? nodeSnapshot?.height ?? 60;
          const others = flow
            .getNodes()
            .filter((o) => o.id !== n.id && !o.hidden)
            .map((o) => ({
              id: o.id,
              x: o.position.x,
              y: o.position.y,
              width: o.measured?.width ?? o.width ?? 200,
              height: o.measured?.height ?? o.height ?? 60,
            }));
          const projection = computeProjection(
            { x: n.position.x, y: n.position.y, width, height },
            { gridSize: GRID_SIZE, snapThreshold: SNAP_THRESHOLD, others },
          );
          const landedPos = { x: projection.x, y: projection.y };
          flow.setNodes((nodes) =>
            nodes.map((node) =>
              node.id === n.id ? { ...node, position: landedPos } : node,
            ),
          );
          if (n.type === "note") {
            canvas.updateNote(n.id, { position: landedPos });
          } else if (n.type === "operator" || n.type === "reroute") {
            canvas.setNodePosition(n.id, landedPos);
          }
        }}
        onNodesDelete={(toDelete) => {
          const hasOperator = toDelete.some((n) => n.type === "operator");
          if (hasOperator && !editable) setEditable(true);
          for (const n of toDelete) {
            if (n.type === "note") canvas.removeNote(n.id);
            else if (n.type === "reroute") canvas.removeReroute(n.id);
            else if (n.type === "operator") editor.removeNode(n.id);
          }
        }}
        onPaneClick={() => setContextMenu(null)}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        connectionMode={ConnectionMode.Loose}
        isValidConnection={isValidConnection}
        minZoom={0.2}
        maxZoom={1.8}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          id="minor"
          variant={BackgroundVariant.Dots}
          gap={GRID_SIZE}
          size={1.1}
          color="rgba(186, 158, 255, 0.14)"
        />
        <Background
          id="major"
          variant={BackgroundVariant.Lines}
          gap={GRID_SIZE * 5}
          lineWidth={1}
          color="rgba(186, 158, 255, 0.06)"
        />
        <AlignmentGuides />
        <DropProjection gridSize={GRID_SIZE} snapThreshold={SNAP_THRESHOLD} />
        <Controls showInteractive={false} />
        <MiniMap
          pannable
          zoomable
          maskColor="rgba(0, 0, 0, 0.6)"
          nodeColor={(n) => {
            // audit-allow: hex — hex — neon decorative palette per design lang
            if (n.type === "boundary") return "#6D28D9";
            // audit-allow: hex — hex — neon decorative palette per design lang
            if (n.type === "note") return "#F59E0B";
            // audit-allow: hex — hex — neon decorative palette per design lang
            if (n.type === "reroute") return "#94A3B8";
            // audit-allow: hex — hex — neon decorative palette per design lang
            return "#1d2023";
          }}
          // audit-allow: hex — hex — neon decorative palette per design lang
          nodeStrokeColor={() => "#ba9eff"}
          className={styles.miniMapBg}
        />
      </ReactFlow>
    </div>
  );
}

export type { RerouteNodeData, NoteNodeData };

function findPortType(
  data: unknown,
  handle: string,
  direction: "source" | "target",
): string | null {
  if (!data || typeof data !== "object") return null;
  const d = data as { spec?: { inputs: { name: string; port_type: string }[]; outputs: { name: string; port_type: string }[] }; ports?: BoundaryPort[]; direction?: string };
  if (d.ports && d.direction) {
    return d.ports.find((p) => p.name === handle)?.portType ?? null;
  }
  if (d.spec) {
    const pool = direction === "source" ? d.spec.outputs : d.spec.inputs;
    return pool.find((p) => p.name === handle)?.port_type ?? null;
  }
  return null;
}
