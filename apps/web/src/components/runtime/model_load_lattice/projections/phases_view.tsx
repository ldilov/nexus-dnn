import type { PhaseName } from "../../../../services/run_events_types";
import type { LatticeState } from "../../../../services/derived/lattice_state";
import * as styles from "./projections.css";

export interface PhasesViewProps {
  state: LatticeState;
}

const PHASE_ORDER: readonly { id: PhaseName; index: string; label: string }[] = [
  { id: "discover", index: "01", label: "Discover" },
  { id: "print_meta", index: "02", label: "Meta" },
  { id: "tensors", index: "03", label: "Tensors" },
  { id: "kv_reserve", index: "04", label: "KV" },
  { id: "context_build", index: "05", label: "Context" },
  { id: "warmup", index: "06", label: "Warmup" },
  { id: "ready", index: "07", label: "Ready" },
];

type ChipState = "pending" | "active" | "completed" | "failed";

function chipStateFor(
  phase: PhaseName,
  current: PhaseName | undefined,
  ready: boolean,
): ChipState {
  if (ready) return "completed";
  if (current === undefined) return "pending";
  const order = PHASE_ORDER.map((p) => p.id);
  const idxC = order.indexOf(current);
  const idxP = order.indexOf(phase);
  if (idxP < idxC) return "completed";
  if (idxP === idxC) return "active";
  return "pending";
}

export function PhasesView({ state }: PhasesViewProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.eyebrow}>03 / PHASES</span>
      <div className={styles.phasesRow}>
        {PHASE_ORDER.map((p) => {
          const cs = chipStateFor(p.id, state.currentPhase, state.ready);
          const cls = [styles.phaseChipBase, styles.phaseChipState[cs]]
            .filter(Boolean)
            .join(" ");
          return (
            <span key={p.id} className={cls} data-phase={p.id} data-state={cs}>
              <span className={styles.phaseIndex}>{p.index}</span>
              <span>{p.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
