import { useEffect, useMemo, useState } from "react";
import { useRunEvents } from "../../../hooks/use_run_events";
import { createRunEventStore } from "../../../services/run_events";
import {
  reduceLatticeState,
  AUX_LAYER_INDEX,
  type LatticeCell,
  type LatticeState,
} from "../../../services/derived/lattice_state";
import {
  runId as brandRunId,
  type RunId,
  type TensorGroup,
} from "../../../services/run_events_types";
import { Ladder, DEFAULT_LADDER_RUNG, type LadderRung } from "./ladder";
import type { CellSelection, LatticeUiProps } from "./lattice.ui";
import { BytesView } from "./projections/bytes_view";
import { TensorsView } from "./projections/tensors_view";
import { PhasesView } from "./projections/phases_view";
import { StoryBanner } from "./projections/story_banner";
import { InspectorDrawer } from "./inspector_drawer";
import * as styles from "./lattice.css";

const GROUP_ORDER: readonly TensorGroup[] = [
  "embed",
  "attn",
  "ffn",
  "norm",
  "kv_cache",
  "output",
  "other",
];

const TRAIL_WINDOW_MS = 600;

const defaultStore = createRunEventStore();

export interface LatticeViewProps {
  runId: RunId;
  deploymentId?: string | null;
}

function partitionCells(
  state: LatticeState,
): {
  cellsByLayer: Map<number, Map<TensorGroup, LatticeCell>>;
  auxCells: Map<TensorGroup, LatticeCell>;
  readyCount: number;
  errorCount: number;
  cpuOffloadCount: number;
} {
  const byLayer = new Map<number, Map<TensorGroup, LatticeCell>>();
  const aux = new Map<TensorGroup, LatticeCell>();
  let ready = 0;
  let err = 0;
  let cpu = 0;
  for (const cell of state.cells.values()) {
    if (cell.phase === "ready") ready += 1;
    if (cell.phase === "error") err += 1;
    if (cell.phase === "cpu_offloaded") cpu += 1;
    if (cell.layer === AUX_LAYER_INDEX) {
      aux.set(cell.group, cell);
      continue;
    }
    const row = byLayer.get(cell.layer) ?? new Map();
    row.set(cell.group, cell);
    byLayer.set(cell.layer, row);
  }
  return {
    cellsByLayer: byLayer,
    auxCells: aux,
    readyCount: ready,
    errorCount: err,
    cpuOffloadCount: cpu,
  };
}

export function LatticeView(props: LatticeViewProps) {
  const { runId, deploymentId = null } = props;
  const events = useRunEvents(defaultStore, runId);
  const [rung, setRung] = useState<LadderRung>(DEFAULT_LADDER_RUNG);
  const [selection, setSelection] = useState<CellSelection>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  const state = useMemo(() => reduceLatticeState(events), [events]);

  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }
      switch (e.key) {
        case "1":
          setRung("bytes");
          break;
        case "2":
          setRung("tensors");
          break;
        case "3":
          setRung("phases");
          break;
        case "4":
          setRung("story");
          break;
        case "Escape":
          setSelection(null);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const tick = (): number => window.setTimeout(() => setNow(Date.now()), 200);
    let id = tick();
    const reset = (): void => {
      window.clearTimeout(id);
      id = tick();
    };
    const interval = window.setInterval(reset, 200);
    return () => {
      window.clearTimeout(id);
      window.clearInterval(interval);
    };
  }, []);

  const partition = useMemo(() => partitionCells(state), [state]);
  const nLayer = state.nLayer ?? 0;

  const uiProps: LatticeUiProps = {
    nLayer,
    groupOrder: GROUP_ORDER,
    cellsByLayer: partition.cellsByLayer,
    auxCells: partition.auxCells,
    selection,
    trailWindowMs: TRAIL_WINDOW_MS,
    nowMs: now,
    totalCells: state.cells.size,
    readyCount: partition.readyCount,
    errorCount: partition.errorCount,
    cpuOffloadCount: partition.cpuOffloadCount,
    onSelect: (sel) => setSelection(sel),
  };

  const selectedCell = useMemo(() => {
    if (selection === null) return null;
    if (selection.layer === AUX_LAYER_INDEX) {
      return partition.auxCells.get(selection.group) ?? null;
    }
    return partition.cellsByLayer.get(selection.layer)?.get(selection.group) ?? null;
  }, [partition, selection]);

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        {rung === "bytes" ? <BytesView state={state} /> : null}
        {rung === "tensors" ? <TensorsView ui={uiProps} /> : null}
        {rung === "phases" ? (
          <div className={styles.projectionsHost}>
            <PhasesView state={state} />
            <TensorsView ui={uiProps} />
          </div>
        ) : null}
        {rung === "story" ? (
          <div className={styles.projectionsHost}>
            <StoryBanner state={state} />
            <TensorsView ui={uiProps} />
          </div>
        ) : null}
      </div>
      <div className={styles.ladderColumn}>
        <Ladder active={rung} onChange={setRung} />
      </div>
      {selectedCell ? (
        <InspectorDrawer
          cell={selectedCell}
          deploymentId={deploymentId}
          onClose={() => setSelection(null)}
        />
      ) : null}
    </div>
  );
}

export function latticeRunId(raw: string): RunId {
  return brandRunId(raw);
}
