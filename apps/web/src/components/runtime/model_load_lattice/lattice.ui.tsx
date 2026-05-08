import { memo, useMemo } from "react";
import type { TensorGroup } from "../../../services/run_events_types";
import type { CellPhase, LatticeCell } from "../../../services/derived/lattice_state";
import * as styles from "./lattice.css";

export type CellSelection = { layer: number; group: TensorGroup } | null;

export interface LatticeUiProps {
  nLayer: number;
  groupOrder: readonly TensorGroup[];
  cellsByLayer: ReadonlyMap<number, ReadonlyMap<TensorGroup, LatticeCell>>;
  auxCells: ReadonlyMap<TensorGroup, LatticeCell>;
  selection: CellSelection;
  trailWindowMs: number;
  nowMs: number;
  totalCells: number;
  readyCount: number;
  errorCount: number;
  cpuOffloadCount: number;
  onSelect: (sel: CellSelection) => void;
}

interface CellNodeProps {
  cell: LatticeCell;
  isSelected: boolean;
  isTrailing: boolean;
  isAux: boolean;
  onSelect: () => void;
}

const CellNode = memo(function CellNode({
  cell,
  isSelected,
  isTrailing,
  isAux,
  onSelect,
}: CellNodeProps) {
  const phaseClass = styles.cellPhase[cell.phase as CellPhase];
  const cls = [
    styles.cellBase,
    isAux ? styles.cellAux : "",
    phaseClass,
    isTrailing ? styles.cellTrail : "",
    isSelected ? styles.cellSelected : "",
  ]
    .filter(Boolean)
    .join(" ");
  const labelTitle = `${cell.tensorName ?? `${cell.group}@${cell.layer}`} — ${cell.phase}`;
  return (
    <button
      type="button"
      className={cls}
      data-cell-phase={cell.phase}
      data-cell-layer={cell.layer}
      data-cell-group={cell.group}
      onClick={onSelect}
      title={labelTitle}
      aria-label={labelTitle}
    />
  );
});

function GroupHeaderRow({
  groups,
}: {
  groups: readonly TensorGroup[];
}) {
  return (
    <div className={styles.gridRow} aria-hidden="true">
      <span className={styles.layerLabel}>L</span>
      {groups.map((g) => (
        <span key={g} className={styles.layerLabel} title={g}>
          {g.slice(0, 1).toUpperCase()}
        </span>
      ))}
    </div>
  );
}

export function LatticeUi(props: LatticeUiProps) {
  const {
    nLayer,
    groupOrder,
    cellsByLayer,
    auxCells,
    selection,
    trailWindowMs,
    nowMs,
    totalCells,
    readyCount,
    errorCount,
    cpuOffloadCount,
    onSelect,
  } = props;

  const auxList = useMemo(() => {
    const out: LatticeCell[] = [];
    for (const g of groupOrder) {
      const cell = auxCells.get(g);
      if (cell) out.push(cell);
    }
    return out;
  }, [auxCells, groupOrder]);

  const layerRows = useMemo(() => {
    const out: { layer: number; cells: LatticeCell[] }[] = [];
    for (let i = 0; i < nLayer; i += 1) {
      const row = cellsByLayer.get(i);
      const cells: LatticeCell[] = [];
      for (const g of groupOrder) {
        const cell = row?.get(g) ?? {
          layer: i,
          group: g,
          phase: "pending" as const,
          lastTransitionTs: 0,
        };
        cells.push(cell);
      }
      out.push({ layer: i, cells });
    }
    return out;
  }, [cellsByLayer, groupOrder, nLayer]);

  const isSelected = (cell: LatticeCell): boolean =>
    selection !== null &&
    selection.layer === cell.layer &&
    selection.group === cell.group;

  const isTrailing = (cell: LatticeCell): boolean =>
    cell.lastTransitionTs > 0 && nowMs - cell.lastTransitionTs < trailWindowMs;

  return (
    <section className={styles.main} aria-label="Model load lattice">
      <div className={styles.headerRow}>
        <span className={styles.headerLabel}>LATTICE</span>
        <span aria-hidden="true" />
        <span className={styles.headerCounters}>
          <span>
            ready<span className={styles.counterValue}>{readyCount}</span>
          </span>
          <span>
            err<span className={styles.counterValue}>{errorCount}</span>
          </span>
          <span>
            cpu<span className={styles.counterValue}>{cpuOffloadCount}</span>
          </span>
          <span>
            total<span className={styles.counterValue}>{totalCells}</span>
          </span>
        </span>
      </div>

      {auxList.length > 0 ? (
        <div className={styles.auxBlock}>
          <span className={styles.auxLabel}>aux · vocab · embed · output</span>
          <div className={styles.auxRow}>
            {auxList.map((cell) => (
              <CellNode
                key={`aux:${cell.group}`}
                cell={cell}
                isAux
                isSelected={isSelected(cell)}
                isTrailing={isTrailing(cell)}
                onSelect={() => onSelect({ layer: cell.layer, group: cell.group })}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className={styles.grid}>
        <GroupHeaderRow groups={groupOrder} />
        {nLayer === 0 ? (
          <div className={styles.empty}>
            no layer count yet — waiting for `n_layer` metric
          </div>
        ) : null}
        {layerRows.map(({ layer, cells }) => (
          <div key={layer} className={styles.gridRow}>
            <span className={styles.layerLabel}>{layer.toString().padStart(2, "0")}</span>
            {cells.map((cell) => (
              <CellNode
                key={`${layer}:${cell.group}`}
                cell={cell}
                isAux={false}
                isSelected={isSelected(cell)}
                isTrailing={isTrailing(cell)}
                onSelect={() => onSelect({ layer: cell.layer, group: cell.group })}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
