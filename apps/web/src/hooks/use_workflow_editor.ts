import { useCallback, useEffect, useMemo, useReducer } from "react";
import type {
  WorkflowDto,
  WorkflowNodeInputDto,
  WorkflowUpdatePayloadDto,
} from "../api/client";
import type { WorkflowEdgeDto } from "../api/generated/WorkflowEdgeDto";
import type { WorkflowNodeDto } from "../api/generated/WorkflowNodeDto";
import type { WorkflowStageDefDto } from "../api/generated/WorkflowStageDefDto";
import type { OperatorSpecMap } from "./use_operator_specs";
import { arePortsCompatible } from "../nodes/port_types";

export type WorkflowDraft = {
  id: string;
  title: string;
  version: string;
  inputs: { name: string; port_type: string }[];
  outputs: { name: string; from: string }[];
  nodes: WorkflowNodeDto[];
  edges: WorkflowEdgeDto[];
  stages: WorkflowStageDefDto[];
};

export type ValidationError = {
  code: string;
  message: string;
  nodeId?: string;
  edgeId?: string;
};

type EditorState = {
  initial: WorkflowDraft | null;
  draft: WorkflowDraft | null;
  dirty: boolean;
  errors: ValidationError[];
};

type Action =
  | { type: "load"; dto: WorkflowDto }
  | {
      type: "connect";
      sourceNode: string;
      sourcePort: string;
      targetNode: string;
      targetPort: string;
    }
  | { type: "disconnect"; edgeId: string }
  | {
      type: "bindOutput";
      outputName: string;
      sourceNode: string;
      sourcePort: string;
    }
  | { type: "unbindOutput"; outputName: string }
  | { type: "setLiteral"; nodeId: string; portName: string; value: unknown }
  | { type: "clearLiteral"; nodeId: string; portName: string }
  | { type: "addNode"; node: WorkflowNodeDto }
  | { type: "removeNode"; nodeId: string }
  | { type: "reset" };

function dtoToDraft(dto: WorkflowDto): WorkflowDraft {
  return {
    id: dto.id,
    title: dto.title,
    version: dto.version,
    inputs: dto.inputs.map((p) => ({
      name: p.name,
      port_type: (p as { type?: string }).type ?? (p as { port_type?: string }).port_type ?? "any",
    })),
    outputs: dto.outputs.map((o) => ({ name: o.name, from: o.from })),
    nodes: dto.nodes,
    edges: dto.edges,
    stages: dto.stages.map((s) => ({ id: s.id, label: s.label ?? s.name })),
  };
}

function draftsEqual(a: WorkflowDraft | null, b: WorkflowDraft | null): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function edgeId(e: WorkflowEdgeDto): string {
  return `${e.source_node}:${e.source_port}->${e.target_node}:${e.target_port}`;
}

function reducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case "load": {
      const draft = dtoToDraft(action.dto);
      return { initial: draft, draft, dirty: false, errors: [] };
    }
    case "reset": {
      return { ...state, draft: state.initial, dirty: false };
    }
    case "connect": {
      if (!state.draft) return state;
      const filteredEdges = state.draft.edges.filter(
        (e) => !(e.target_node === action.targetNode && e.target_port === action.targetPort),
      );
      const newEdge: WorkflowEdgeDto = {
        source_node: action.sourceNode,
        source_port: action.sourcePort,
        target_node: action.targetNode,
        target_port: action.targetPort,
      };
      const refFrom = `${action.sourceNode}:${action.sourcePort}`;
      const nodes = state.draft.nodes.map((n) => {
        if (n.id !== action.targetNode) return n;
        return {
          ...n,
          inputs: { ...n.inputs, [action.targetPort]: { from: refFrom } as WorkflowNodeInputDto },
        };
      });
      const draft = { ...state.draft, edges: [...filteredEdges, newEdge], nodes };
      return { ...state, draft, dirty: !draftsEqual(draft, state.initial) };
    }
    case "disconnect": {
      if (!state.draft) return state;
      const kept: WorkflowEdgeDto[] = [];
      let removed: WorkflowEdgeDto | null = null;
      for (const e of state.draft.edges) {
        if (edgeId(e) === action.edgeId) removed = e;
        else kept.push(e);
      }
      if (!removed) return state;
      const cleared = removed;
      const nodes = state.draft.nodes.map((n) => {
        if (n.id !== cleared.target_node) return n;
        const { [cleared.target_port]: _drop, ...rest } = n.inputs;
        return { ...n, inputs: rest };
      });
      const draft = { ...state.draft, edges: kept, nodes };
      return { ...state, draft, dirty: !draftsEqual(draft, state.initial) };
    }
    case "bindOutput": {
      if (!state.draft) return state;
      const from = `${action.sourceNode}:${action.sourcePort}`;
      const exists = state.draft.outputs.some((o) => o.name === action.outputName);
      const outputs = exists
        ? state.draft.outputs.map((o) =>
            o.name === action.outputName ? { ...o, from } : o,
          )
        : [...state.draft.outputs, { name: action.outputName, from }];
      const draft = { ...state.draft, outputs };
      return { ...state, draft, dirty: !draftsEqual(draft, state.initial) };
    }
    case "unbindOutput": {
      if (!state.draft) return state;
      const outputs = state.draft.outputs.map((o) =>
        o.name === action.outputName ? { ...o, from: "" } : o,
      );
      const draft = { ...state.draft, outputs };
      return { ...state, draft, dirty: !draftsEqual(draft, state.initial) };
    }
    case "setLiteral": {
      if (!state.draft) return state;
      const nodes = state.draft.nodes.map((n) => {
        if (n.id !== action.nodeId) return n;
        return {
          ...n,
          inputs: {
            ...n.inputs,
            [action.portName]: { value: action.value } as WorkflowNodeInputDto,
          },
        };
      });
      const edges = state.draft.edges.filter(
        (e) => !(e.target_node === action.nodeId && e.target_port === action.portName),
      );
      const draft = { ...state.draft, nodes, edges };
      return { ...state, draft, dirty: !draftsEqual(draft, state.initial) };
    }
    case "clearLiteral": {
      if (!state.draft) return state;
      const nodes = state.draft.nodes.map((n) => {
        if (n.id !== action.nodeId) return n;
        const { [action.portName]: _drop, ...rest } = n.inputs;
        return { ...n, inputs: rest };
      });
      const draft = { ...state.draft, nodes };
      return { ...state, draft, dirty: !draftsEqual(draft, state.initial) };
    }
    case "addNode": {
      if (!state.draft) return state;
      if (state.draft.nodes.some((n) => n.id === action.node.id)) return state;
      const draft = { ...state.draft, nodes: [...state.draft.nodes, action.node] };
      return { ...state, draft, dirty: !draftsEqual(draft, state.initial) };
    }
    case "removeNode": {
      if (!state.draft) return state;
      const nodes = state.draft.nodes.filter((n) => n.id !== action.nodeId);
      const edges = state.draft.edges.filter(
        (e) => e.source_node !== action.nodeId && e.target_node !== action.nodeId,
      );
      const outputs = state.draft.outputs.filter((o) => {
        const [srcNode] = o.from.split(":");
        return srcNode !== action.nodeId;
      });
      const draft = { ...state.draft, nodes, edges, outputs };
      return { ...state, draft, dirty: !draftsEqual(draft, state.initial) };
    }
    default:
      return state;
  }
}

function runValidator(
  draft: WorkflowDraft,
  specs: OperatorSpecMap,
): ValidationError[] {
  const errors: ValidationError[] = [];
  const nodeById = new Map(draft.nodes.map((n) => [n.id, n]));

  for (const node of draft.nodes) {
    const spec = specs.get(node.operator);
    if (!spec) continue;
    for (const input of spec.inputs) {
      if (!input.required) continue;
      const value = node.inputs[input.name];
      if (!value) {
        errors.push({
          code: "required_input_missing",
          nodeId: node.id,
          message: `required input \`${input.name}\` on \`${node.id}\` is not connected`,
        });
      }
    }
  }

  const workflowInputs = new Map(draft.inputs.map((p) => [p.name, p.port_type]));
  for (const e of draft.edges) {
    const id = edgeId(e);
    let sourceType: string | null = null;
    if (e.source_node === "input") {
      sourceType = workflowInputs.get(e.source_port) ?? null;
      if (sourceType === null) {
        errors.push({
          code: "unknown_workflow_input",
          edgeId: id,
          message: `edge source references unknown workflow input \`${e.source_port}\``,
        });
      }
    } else {
      const node = nodeById.get(e.source_node);
      const spec = node ? specs.get(node.operator) : undefined;
      const port = spec?.outputs.find((p) => p.name === e.source_port);
      if (!port) {
        errors.push({
          code: "unknown_source_port",
          edgeId: id,
          message: `edge source \`${e.source_node}:${e.source_port}\` does not exist`,
        });
      } else {
        sourceType = port.port_type;
      }
    }

    const targetNode = nodeById.get(e.target_node);
    const targetSpec = targetNode ? specs.get(targetNode.operator) : undefined;
    const targetPort = targetSpec?.inputs.find((p) => p.name === e.target_port);
    let targetType: string | null = null;
    if (!targetNode) {
      errors.push({
        code: "unknown_target_node",
        edgeId: id,
        message: `edge target node \`${e.target_node}\` does not exist`,
      });
    } else if (!targetPort) {
      errors.push({
        code: "unknown_target_port",
        edgeId: id,
        nodeId: e.target_node,
        message: `edge target \`${e.target_node}:${e.target_port}\` does not exist`,
      });
    } else {
      targetType = targetPort.port_type;
    }

    if (sourceType && targetType && !arePortsCompatible(sourceType, targetType)) {
      errors.push({
        code: "type_mismatch",
        edgeId: id,
        nodeId: e.target_node,
        message: `type mismatch: \`${sourceType}\` → \`${targetType}\``,
      });
    }
  }

  const adjacency = new Map<string, string[]>();
  for (const e of draft.edges) {
    if (e.source_node === "input") continue;
    const list = adjacency.get(e.source_node) ?? [];
    list.push(e.target_node);
    adjacency.set(e.source_node, list);
  }
  const VISITING = 1;
  const VISITED = 2;
  const state = new Map<string, number>();
  const dfs = (n: string): boolean => {
    const s = state.get(n);
    if (s === VISITED) return false;
    if (s === VISITING) return true;
    state.set(n, VISITING);
    for (const next of adjacency.get(n) ?? []) {
      if (dfs(next)) return true;
    }
    state.set(n, VISITED);
    return false;
  };
  for (const n of draft.nodes) {
    if (dfs(n.id)) {
      errors.push({
        code: "cycle",
        nodeId: n.id,
        message: `cycle detected involving node \`${n.id}\``,
      });
      break;
    }
  }

  for (const o of draft.outputs) {
    const [srcNode, srcPort] = o.from.split(":");
    if (!srcNode || !srcPort) {
      errors.push({
        code: "bad_output_binding",
        message: `output \`${o.name}\` has malformed source \`${o.from}\``,
      });
      continue;
    }
    const node = nodeById.get(srcNode);
    const spec = node ? specs.get(node.operator) : undefined;
    if (!spec?.outputs.find((p) => p.name === srcPort)) {
      errors.push({
        code: "bad_output_binding",
        nodeId: srcNode,
        message: `output \`${o.name}\` references unknown port \`${o.from}\``,
      });
    }
  }

  return errors;
}

export type UseWorkflowEditor = {
  draft: WorkflowDraft | null;
  dirty: boolean;
  errors: ValidationError[];
  userEditedAt: string | null;
  load: (dto: WorkflowDto) => void;
  reset: () => void;
  connect: (sourceNode: string, sourcePort: string, targetNode: string, targetPort: string) => void;
  disconnect: (edgeId: string) => void;
  bindOutput: (outputName: string, sourceNode: string, sourcePort: string) => void;
  unbindOutput: (outputName: string) => void;
  setLiteral: (nodeId: string, portName: string, value: unknown) => void;
  clearLiteral: (nodeId: string, portName: string) => void;
  addNode: (node: WorkflowNodeDto) => void;
  removeNode: (nodeId: string) => void;
  toPayload: () => WorkflowUpdatePayloadDto | null;
};

export function useWorkflowEditor(
  source: WorkflowDto | null,
  specs: OperatorSpecMap,
): UseWorkflowEditor {
  const [state, dispatch] = useReducer(reducer, {
    initial: null,
    draft: null,
    dirty: false,
    errors: [],
  });

  useEffect(() => {
    if (source) dispatch({ type: "load", dto: source });
  }, [source]);

  const errors = useMemo(
    () => (state.draft ? runValidator(state.draft, specs) : []),
    [state.draft, specs],
  );

  const load = useCallback((dto: WorkflowDto) => dispatch({ type: "load", dto }), []);
  const reset = useCallback(() => dispatch({ type: "reset" }), []);
  const connect = useCallback(
    (s: string, sp: string, t: string, tp: string) =>
      dispatch({
        type: "connect",
        sourceNode: s,
        sourcePort: sp,
        targetNode: t,
        targetPort: tp,
      }),
    [],
  );
  const disconnect = useCallback((eid: string) => dispatch({ type: "disconnect", edgeId: eid }), []);
  const bindOutput = useCallback(
    (outputName: string, sourceNode: string, sourcePort: string) =>
      dispatch({ type: "bindOutput", outputName, sourceNode, sourcePort }),
    [],
  );
  const unbindOutput = useCallback(
    (outputName: string) => dispatch({ type: "unbindOutput", outputName }),
    [],
  );
  const setLiteral = useCallback(
    (nodeId: string, portName: string, value: unknown) =>
      dispatch({ type: "setLiteral", nodeId, portName, value }),
    [],
  );
  const clearLiteral = useCallback(
    (nodeId: string, portName: string) =>
      dispatch({ type: "clearLiteral", nodeId, portName }),
    [],
  );
  const addNode = useCallback((node: WorkflowNodeDto) => dispatch({ type: "addNode", node }), []);
  const removeNode = useCallback(
    (nodeId: string) => dispatch({ type: "removeNode", nodeId }),
    [],
  );

  const toPayload = useCallback((): WorkflowUpdatePayloadDto | null => {
    if (!state.draft) return null;
    return {
      title: state.draft.title,
      version: state.draft.version,
      inputs: state.draft.inputs.map((p) => ({ name: p.name, type: p.port_type })),
      outputs: state.draft.outputs,
      nodes: state.draft.nodes,
      stages: state.draft.stages,
    };
  }, [state.draft]);

  return {
    draft: state.draft,
    dirty: state.dirty,
    errors,
    userEditedAt: source?.user_edited_at ?? null,
    load,
    reset,
    connect,
    disconnect,
    bindOutput,
    unbindOutput,
    setLiteral,
    clearLiteral,
    addNode,
    removeNode,
    toPayload,
  };
}
