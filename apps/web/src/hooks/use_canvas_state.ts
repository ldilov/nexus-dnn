import { useCallback, useEffect, useReducer, useRef } from "react";
import useSWR from "swr";
import type { CanvasStateDto } from "../api/client";
import { fetchWorkflowCanvas, updateWorkflowCanvas } from "../api/client";

const EMPTY: CanvasStateDto = {
  notes: [],
  reroutes: [],
  node_positions: {},
  updated_at: null,
};

type Action =
  | { type: "load"; state: CanvasStateDto }
  | { type: "addNote"; id: string; text: string; position: { x: number; y: number } }
  | { type: "updateNote"; id: string; text?: string; position?: { x: number; y: number } }
  | { type: "removeNote"; id: string }
  | {
      type: "addReroute";
      id: string;
      portType: string;
      position: { x: number; y: number };
      sourceNode: string;
      sourcePort: string;
      targetNode: string;
      targetPort: string;
    }
  | { type: "removeReroute"; id: string }
  | { type: "setNodePosition"; nodeId: string; position: { x: number; y: number } };

function reducer(state: CanvasStateDto, action: Action): CanvasStateDto {
  switch (action.type) {
    case "load":
      return action.state;
    case "addNote":
      return {
        ...state,
        notes: [
          ...state.notes,
          { id: action.id, text: action.text, position: action.position, accent: null },
        ],
      };
    case "updateNote":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.id
            ? {
                ...n,
                text: action.text !== undefined ? action.text : n.text,
                position: action.position ?? n.position,
              }
            : n,
        ),
      };
    case "removeNote":
      return { ...state, notes: state.notes.filter((n) => n.id !== action.id) };
    case "addReroute":
      return {
        ...state,
        reroutes: [
          ...state.reroutes,
          {
            id: action.id,
            port_type: action.portType,
            position: action.position,
            source_node: action.sourceNode,
            source_port: action.sourcePort,
            target_node: action.targetNode,
            target_port: action.targetPort,
          },
        ],
      };
    case "removeReroute":
      return { ...state, reroutes: state.reroutes.filter((r) => r.id !== action.id) };
    case "setNodePosition":
      return {
        ...state,
        node_positions: { ...state.node_positions, [action.nodeId]: action.position },
      };
    default:
      return state;
  }
}

export type UseCanvasState = {
  state: CanvasStateDto;
  loaded: boolean;
  addNote: (text: string, position: { x: number; y: number }) => string;
  updateNote: (id: string, patch: { text?: string; position?: { x: number; y: number } }) => void;
  removeNote: (id: string) => void;
  addReroute: (args: {
    portType: string;
    position: { x: number; y: number };
    sourceNode: string;
    sourcePort: string;
    targetNode: string;
    targetPort: string;
  }) => string;
  removeReroute: (id: string) => void;
  setNodePosition: (nodeId: string, position: { x: number; y: number }) => void;
};

function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

async function persistCanvas(
  workflowId: string,
  state: CanvasStateDto,
  lastSavedRef: { current: string },
): Promise<void> {
  try {
    const saved = await updateWorkflowCanvas(workflowId, state);
    lastSavedRef.current = JSON.stringify(saved);
  } catch (err: unknown) {
    console.warn("[canvas] save failed", err);
  }
}

export function useCanvasState(workflowId: string | null): UseCanvasState {
  const [state, dispatch] = useReducer(reducer, EMPTY);
  const loadedRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>("");

  const { data: loaded, error: loadError } = useSWR<CanvasStateDto>(
    workflowId ? `canvas:${workflowId}` : null,
    () => fetchWorkflowCanvas(workflowId as string),
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    if (!workflowId) {
      loadedRef.current = false;
      dispatch({ type: "load", state: EMPTY });
      lastSavedRef.current = JSON.stringify(EMPTY);
      return;
    }
    if (loaded) {
      loadedRef.current = true;
      lastSavedRef.current = JSON.stringify(loaded);
      dispatch({ type: "load", state: loaded });
      return;
    }
    if (loadError) {
      loadedRef.current = true;
      lastSavedRef.current = JSON.stringify(EMPTY);
      dispatch({ type: "load", state: EMPTY });
    }
  }, [workflowId, loaded, loadError]);

  useEffect(() => {
    if (!workflowId || !loadedRef.current) return;
    const serialized = JSON.stringify(state);
    if (serialized === lastSavedRef.current) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      void persistCanvas(workflowId, state, lastSavedRef);
    }, 500);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state, workflowId]);

  const addNote = useCallback(
    (text: string, position: { x: number; y: number }): string => {
      const id = generateId("note");
      dispatch({ type: "addNote", id, text, position });
      return id;
    },
    [],
  );

  const updateNote = useCallback(
    (id: string, patch: { text?: string; position?: { x: number; y: number } }) =>
      dispatch({ type: "updateNote", id, ...patch }),
    [],
  );

  const removeNote = useCallback((id: string) => dispatch({ type: "removeNote", id }), []);

  const addReroute = useCallback(
    (args: {
      portType: string;
      position: { x: number; y: number };
      sourceNode: string;
      sourcePort: string;
      targetNode: string;
      targetPort: string;
    }): string => {
      const id = generateId("reroute");
      dispatch({ type: "addReroute", id, ...args });
      return id;
    },
    [],
  );

  const removeReroute = useCallback(
    (id: string) => dispatch({ type: "removeReroute", id }),
    [],
  );

  const setNodePosition = useCallback(
    (nodeId: string, position: { x: number; y: number }) =>
      dispatch({ type: "setNodePosition", nodeId, position }),
    [],
  );

  return {
    state,
    loaded: loadedRef.current,
    addNote,
    updateNote,
    removeNote,
    addReroute,
    removeReroute,
    setNodePosition,
  };
}
