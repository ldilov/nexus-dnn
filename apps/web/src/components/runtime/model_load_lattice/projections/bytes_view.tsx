import { useMemo } from "react";
import type { LatticeState } from "../../../../services/derived/lattice_state";
import * as styles from "./projections.css";

export interface BytesViewProps {
  state: LatticeState;
  totalBytes?: number;
}

function humanBytes(value: number): string {
  if (value <= 0) return "0 B";
  const units = ["B", "KiB", "MiB", "GiB", "TiB"];
  let v = value;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v.toFixed(v < 10 ? 2 : 1)} ${units[i]}`;
}

export function BytesView({ state, totalBytes }: BytesViewProps) {
  const { loadedBytes, plannedBytes, markers } = useMemo(() => {
    let loaded = 0;
    let planned = 0;
    const offsets: number[] = [];
    for (const cell of state.cells.values()) {
      if (cell.bytes !== undefined) planned += cell.bytes;
      if (
        cell.bytes !== undefined &&
        (cell.phase === "ready" || cell.phase === "reserved")
      ) {
        loaded += cell.bytes;
      }
      if (cell.ggufOffset !== undefined) offsets.push(cell.ggufOffset);
    }
    return {
      loadedBytes: loaded,
      plannedBytes: planned,
      markers: offsets,
    };
  }, [state]);

  const denominator = totalBytes ?? plannedBytes;
  const pct = denominator > 0 ? Math.min(100, (loadedBytes / denominator) * 100) : 0;

  return (
    <div className={styles.wrapper}>
      <span className={styles.eyebrow}>01 / BYTES</span>
      <div className={styles.bytesBar} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.bytesFill} style={{ width: `${pct}%` }} />
        {markers.map((offset, i) =>
          denominator > 0 ? (
            <span
              key={`${offset}:${i}`}
              className={styles.bytesMarker}
              style={{ left: `${Math.min(100, (offset / denominator) * 100)}%` }}
            />
          ) : null,
        )}
      </div>
      <div className={styles.bytesMeta}>
        <span>{humanBytes(loadedBytes)} resident</span>
        <span>{humanBytes(denominator)} planned</span>
      </div>
    </div>
  );
}
