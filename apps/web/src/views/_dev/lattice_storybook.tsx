/**
 * Spec 042 US5 (T071) — Lattice storybook (dev-only).
 *
 * Renders the model-load Lattice in three states using mock data:
 *   - Pristine: every cell `pending`, n_layer = 70, no events ingested
 *   - Loading: ~half cells `loading` (mix of discovered/assigned/reserved),
 *              sweep cursor at layer 35, some `discovered` ahead
 *   - Post-load: all cells `resident` (`ready`) with breath animation,
 *                n-cpu-moe pattern — last 3 layers' FFN cells `cpu_offloaded`
 *                showing the amber column
 *
 * Reuses the production `LatticeUi` component with prop-driven mock state.
 * Useful for designer review and as the manual-smoke surface in T079.
 *
 * Gated to `import.meta.env.DEV` — production bundles render a 404.
 */

import * as React from "react";
import { useMemo, useState } from "react";
import {
  LatticeUi,
  type CellSelection,
  type LatticeUiProps,
} from "../../components/runtime/model_load_lattice/lattice.ui";
import type {
  CellPhase,
  LatticeCell,
} from "../../services/derived/lattice_state";
import type { TensorGroup } from "../../services/run_events_types";

type StoryName = "pristine" | "loading" | "post_load";

const N_LAYER = 70;
const SWEEP_LAYER = 35;
const TRAIL_WINDOW_MS = 800;

const GROUP_ORDER: readonly TensorGroup[] = [
  "attn",
  "ffn",
  "norm",
  "kv_cache",
];

const AUX_GROUPS: readonly TensorGroup[] = ["embed", "output"];

function buildCell(
  layer: number,
  group: TensorGroup,
  phase: CellPhase,
  ts: number,
): LatticeCell {
  return {
    layer,
    group,
    phase,
    lastTransitionTs: ts,
    tensorName: `${group}.${layer}`,
    bytes: 16 * 1024 * 1024,
  };
}

function buildAuxRow(
  phase: CellPhase,
  ts: number,
): ReadonlyMap<TensorGroup, LatticeCell> {
  const map = new Map<TensorGroup, LatticeCell>();
  for (const g of AUX_GROUPS) {
    map.set(g, buildCell(-1, g, phase, ts));
  }
  return map;
}

function buildPristine(): {
  cellsByLayer: ReadonlyMap<number, ReadonlyMap<TensorGroup, LatticeCell>>;
  auxCells: ReadonlyMap<TensorGroup, LatticeCell>;
  totals: { ready: number; error: number; cpu: number; total: number };
} {
  const cellsByLayer = new Map<number, ReadonlyMap<TensorGroup, LatticeCell>>();
  for (let i = 0; i < N_LAYER; i += 1) {
    const row = new Map<TensorGroup, LatticeCell>();
    for (const g of GROUP_ORDER) {
      row.set(g, buildCell(i, g, "pending", 0));
    }
    cellsByLayer.set(i, row);
  }
  return {
    cellsByLayer,
    auxCells: buildAuxRow("pending", 0),
    totals: {
      ready: 0,
      error: 0,
      cpu: 0,
      total: N_LAYER * GROUP_ORDER.length + AUX_GROUPS.length,
    },
  };
}

function buildLoading(nowMs: number): {
  cellsByLayer: ReadonlyMap<number, ReadonlyMap<TensorGroup, LatticeCell>>;
  auxCells: ReadonlyMap<TensorGroup, LatticeCell>;
  totals: { ready: number; error: number; cpu: number; total: number };
} {
  const cellsByLayer = new Map<number, ReadonlyMap<TensorGroup, LatticeCell>>();
  let readyCount = 0;
  for (let i = 0; i < N_LAYER; i += 1) {
    const row = new Map<TensorGroup, LatticeCell>();
    let phase: CellPhase;
    let ts = 0;
    if (i < SWEEP_LAYER - 4) {
      phase = "ready";
      readyCount += GROUP_ORDER.length;
    } else if (i < SWEEP_LAYER) {
      phase = "reserved";
      ts = nowMs - (SWEEP_LAYER - i) * 80;
    } else if (i === SWEEP_LAYER) {
      phase = "assigned";
      ts = nowMs;
    } else if (i < SWEEP_LAYER + 6) {
      phase = "discovered";
    } else {
      phase = "pending";
    }
    for (const g of GROUP_ORDER) {
      row.set(g, buildCell(i, g, phase, ts));
    }
    cellsByLayer.set(i, row);
  }
  return {
    cellsByLayer,
    auxCells: buildAuxRow("ready", nowMs - 200),
    totals: {
      ready: readyCount,
      error: 0,
      cpu: 0,
      total: N_LAYER * GROUP_ORDER.length + AUX_GROUPS.length,
    },
  };
}

function buildPostLoad(nowMs: number): {
  cellsByLayer: ReadonlyMap<number, ReadonlyMap<TensorGroup, LatticeCell>>;
  auxCells: ReadonlyMap<TensorGroup, LatticeCell>;
  totals: { ready: number; error: number; cpu: number; total: number };
} {
  const cellsByLayer = new Map<number, ReadonlyMap<TensorGroup, LatticeCell>>();
  const cpuStart = N_LAYER - 3;
  let readyCount = 0;
  let cpuCount = 0;
  for (let i = 0; i < N_LAYER; i += 1) {
    const row = new Map<TensorGroup, LatticeCell>();
    for (const g of GROUP_ORDER) {
      let phase: CellPhase = "ready";
      if (g === "ffn" && i >= cpuStart) {
        phase = "cpu_offloaded";
        cpuCount += 1;
      } else {
        readyCount += 1;
      }
      row.set(g, buildCell(i, g, phase, nowMs - 1000));
    }
    cellsByLayer.set(i, row);
  }
  return {
    cellsByLayer,
    auxCells: buildAuxRow("ready", nowMs - 1500),
    totals: {
      ready: readyCount + AUX_GROUPS.length,
      error: 0,
      cpu: cpuCount,
      total: N_LAYER * GROUP_ORDER.length + AUX_GROUPS.length,
    },
  };
}

function buildStory(name: StoryName, nowMs: number): LatticeUiProps {
  let scene;
  switch (name) {
    case "pristine":
      scene = buildPristine();
      break;
    case "loading":
      scene = buildLoading(nowMs);
      break;
    case "post_load":
      scene = buildPostLoad(nowMs);
      break;
  }
  return {
    nLayer: N_LAYER,
    groupOrder: GROUP_ORDER,
    cellsByLayer: scene.cellsByLayer,
    auxCells: scene.auxCells,
    selection: null,
    trailWindowMs: TRAIL_WINDOW_MS,
    nowMs,
    totalCells: scene.totals.total,
    readyCount: scene.totals.ready,
    errorCount: scene.totals.error,
    cpuOffloadCount: scene.totals.cpu,
    onSelect: () => {},
  };
}

export function Component(): React.ReactElement {
  if (!import.meta.env.DEV) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Not found</h1>
        <p>The Lattice storybook is only available in dev builds.</p>
      </main>
    );
  }
  return <LatticeStorybook />;
}

function LatticeStorybook(): React.ReactElement {
  const [story, setStory] = useState<StoryName>("loading");
  const [selection, setSelection] = useState<CellSelection>(null);
  const nowMs = useMemo(() => Date.now(), []);

  const baseProps = useMemo(() => buildStory(story, nowMs), [story, nowMs]);
  const props: LatticeUiProps = {
    ...baseProps,
    selection,
    onSelect: setSelection,
  };

  const tabs: { id: StoryName; label: string }[] = [
    { id: "pristine", label: "Pristine" },
    { id: "loading", label: "Loading" },
    { id: "post_load", label: "Post-load" },
  ];

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.5rem",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ fontFamily: "var(--mono, monospace)", margin: 0 }}>
          Lattice storybook
        </h1>
        <span style={{ opacity: 0.7 }}>spec 042 · T071</span>
      </header>
      <nav
        aria-label="Story selector"
        style={{ display: "flex", gap: "0.5rem" }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setStory(t.id);
              setSelection(null);
            }}
            aria-pressed={story === t.id}
            style={{
              padding: "0.4rem 0.8rem",
              fontFamily: "var(--mono, monospace)",
              fontSize: "0.85rem",
              cursor: "pointer",
              opacity: story === t.id ? 1 : 0.6,
            }}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <LatticeUi {...props} />
      {selection ? (
        <pre style={{ fontFamily: "var(--mono, monospace)", opacity: 0.8 }}>
          selected: layer {selection.layer} group {selection.group}
        </pre>
      ) : null}
    </main>
  );
}
