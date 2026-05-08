import { useMemo } from "react";
import type { LatticeState } from "../../../../services/derived/lattice_state";
import * as styles from "./projections.css";

export interface StoryBannerProps {
  state: LatticeState;
}

function buildStory(state: LatticeState): string {
  if (state.cells.size === 0) {
    return state.currentPhase
      ? `Initialising — phase ${state.currentPhase}`
      : "Awaiting first event from the worker...";
  }
  if (state.ready) {
    let resident = 0;
    let bytes = 0;
    for (const c of state.cells.values()) {
      if (c.phase === "ready") resident += 1;
      if (c.bytes !== undefined) bytes += c.bytes;
    }
    const gib = (bytes / (1024 * 1024 * 1024)).toFixed(2);
    return `Resident — ${resident} cells live across ${gib} GiB. Ready to serve.`;
  }
  let active: { layer: number; group: string } | null = null;
  let activeTs = -1;
  let cpu = 0;
  let err = 0;
  for (const c of state.cells.values()) {
    if (c.lastTransitionTs > activeTs) {
      activeTs = c.lastTransitionTs;
      active = { layer: c.layer, group: c.group };
    }
    if (c.phase === "cpu_offloaded") cpu += 1;
    if (c.phase === "error") err += 1;
  }
  const phaseLabel = state.currentPhase ?? "loading";
  const tail = active
    ? ` — head at L${active.layer >= 0 ? active.layer.toString().padStart(2, "0") : "AUX"}/${active.group}`
    : "";
  const cpuTail = cpu > 0 ? ` · ${cpu} layer(s) on CPU` : "";
  const errTail = err > 0 ? ` · ${err} cell(s) error` : "";
  return `Loading model — phase ${phaseLabel}${tail}${cpuTail}${errTail}`;
}

export function StoryBanner({ state }: StoryBannerProps) {
  const text = useMemo(() => buildStory(state), [state]);
  return (
    <div className={styles.wrapper}>
      <span className={styles.eyebrow}>04 / STORY</span>
      <p className={styles.story} aria-live="polite">
        {text}
      </p>
    </div>
  );
}
