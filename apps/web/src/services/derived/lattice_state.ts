/**
 * Spec 042 — LatticeCellState reducer (T049).
 *
 * Pure fold over a `RunEventItem[]` stream into a `(layer, group) → LatticeCell`
 * map plus run-level metadata (current phase, n_layer, ready flag). Phase-staged
 * fill per research.md R4: cell phase advances at real llama.cpp phase
 * boundaries, NOT a fictional per-tensor stream.
 *
 * No side effects, no I/O. Consumers in `lattice.view.tsx` reduce on every
 * event-store update and pass `LatticeUiProps` to the dumb markup component.
 */

import type {
  AllocationTarget,
  ErrorReason,
  PhaseName,
  RunEventItem,
  TensorGroup,
} from "../run_events_types";

export type CellPhase =
  | "pending"
  | "discovered"
  | "assigned"
  | "reserved"
  | "ready"
  | "error"
  | "cpu_offloaded";

export interface LatticeCell {
  layer: number;
  group: TensorGroup;
  phase: CellPhase;
  bytes?: number;
  target?: AllocationTarget;
  device?: string;
  tensorName?: string;
  dtype?: string;
  errorReason?: ErrorReason;
  ggufOffset?: number;
  lastTransitionTs: number;
}

export interface LatticeState {
  nLayer?: number;
  cells: Map<string, LatticeCell>;
  currentPhase?: PhaseName;
  ready: boolean;
}

const AUX_LAYER = -1;

export function cellKey(layer: number, group: TensorGroup): string {
  return `${layer}:${group}`;
}

export function emptyLatticeState(): LatticeState {
  return {
    nLayer: undefined,
    cells: new Map(),
    currentPhase: undefined,
    ready: false,
  };
}

function isCpuTarget(target: AllocationTarget): boolean {
  return target.kind === "cpu" || target.kind === "cpu_mmap";
}

function advancePhase(prev: CellPhase, next: CellPhase): CellPhase {
  const order: CellPhase[] = [
    "pending",
    "discovered",
    "assigned",
    "reserved",
    "ready",
  ];
  if (next === "error" || next === "cpu_offloaded") return next;
  if (prev === "error") return prev;
  const a = order.indexOf(prev);
  const b = order.indexOf(next);
  if (a < 0 || b < 0) return next;
  return b > a ? next : prev;
}

function updateCell(
  state: LatticeState,
  layer: number,
  group: TensorGroup,
  ts: number,
  patch: (cell: LatticeCell) => LatticeCell,
): LatticeState {
  const key = cellKey(layer, group);
  const existing: LatticeCell = state.cells.get(key) ?? {
    layer,
    group,
    phase: "pending",
    lastTransitionTs: ts,
  };
  const updated = patch(existing);
  const next = new Map(state.cells);
  next.set(key, updated);
  return { ...state, cells: next };
}

function applyTensorAllocate(
  state: LatticeState,
  ev: Extract<RunEventItem, { kind: "tensor_allocate" }>,
): LatticeState {
  const layer = ev.layer ?? AUX_LAYER;
  return updateCell(state, layer, ev.group, ev.ts_ms, (cell) => {
    const cpu = isCpuTarget(ev.target);
    const nextPhase: CellPhase = cpu
      ? "cpu_offloaded"
      : advancePhase(cell.phase, "assigned");
    const phaseChanged = nextPhase !== cell.phase;
    const merged: LatticeCell = {
      ...cell,
      phase: nextPhase,
      bytes: ev.bytes ?? cell.bytes,
      target: ev.target,
      tensorName: ev.tensor_name ?? cell.tensorName,
      dtype: ev.dtype ?? cell.dtype,
      lastTransitionTs: phaseChanged ? ev.ts_ms : cell.lastTransitionTs,
    };
    if (
      cell.bytes === undefined &&
      ev.bytes !== undefined &&
      cell.phase === "pending"
    ) {
      merged.phase = nextPhase === "cpu_offloaded" ? nextPhase : "discovered";
    }
    return merged;
  });
}

function applyMetric(
  state: LatticeState,
  ev: Extract<RunEventItem, { kind: "metric" }>,
): LatticeState {
  if (ev.name === "model.n_layer") {
    return { ...state, nLayer: Math.trunc(ev.value) };
  }
  if (ev.name !== "buffer.bytes") return state;
  const device = ev.labels.device;
  if (device === undefined) return state;
  let next = state;
  for (const [, cell] of state.cells) {
    if (cell.target?.kind === "cpu" || cell.target?.kind === "cpu_mmap") continue;
    if (cell.phase === "error") continue;
    next = updateCell(next, cell.layer, cell.group, ev.ts_ms, (c) => {
      const advanced = advancePhase(c.phase, "reserved");
      const phaseChanged = advanced !== c.phase;
      return {
        ...c,
        phase: advanced,
        device: c.device ?? device,
        lastTransitionTs: phaseChanged ? ev.ts_ms : c.lastTransitionTs,
      };
    });
  }
  return next;
}

function applyPhase(
  state: LatticeState,
  ev: Extract<RunEventItem, { kind: "phase" }>,
): LatticeState {
  const ready =
    state.ready ||
    (ev.phase === "ready" && ev.state === "completed");
  return { ...state, currentPhase: ev.phase, ready };
}

function applyError(
  state: LatticeState,
  ev: Extract<RunEventItem, { kind: "error" }>,
): LatticeState {
  if (ev.layer === undefined || ev.group === undefined) return state;
  return updateCell(state, ev.layer, ev.group, ev.ts_ms, (cell) => ({
    ...cell,
    phase: "error",
    errorReason: ev.reason,
    device: ev.device ?? cell.device,
    lastTransitionTs: ev.ts_ms,
  }));
}

export function reduceLatticeState(events: RunEventItem[]): LatticeState {
  let state = emptyLatticeState();
  for (const ev of events) {
    switch (ev.kind) {
      case "phase":
        state = applyPhase(state, ev);
        break;
      case "metric":
        state = applyMetric(state, ev);
        break;
      case "tensor_allocate":
        state = applyTensorAllocate(state, ev);
        break;
      case "error":
        state = applyError(state, ev);
        break;
      default:
        break;
    }
  }
  if (state.ready) {
    const cells = new Map(state.cells);
    for (const [k, c] of cells) {
      if (c.phase === "reserved") {
        cells.set(k, { ...c, phase: "ready" });
      }
    }
    state = { ...state, cells };
  }
  return state;
}

export const AUX_LAYER_INDEX = AUX_LAYER;
