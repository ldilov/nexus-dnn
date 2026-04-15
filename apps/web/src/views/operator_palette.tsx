import { useMemo, useState } from "react";
import type { OperatorDto } from "../api/client";
import { colorForPortType } from "../nodes/port_types";
import * as styles from "./operator_palette.css";

export type OperatorPaletteProps = {
  operators: OperatorDto[];
  onSelect: (operator: OperatorDto) => void;
  onClose: () => void;
};

export function OperatorPalette({ operators, onSelect, onClose }: OperatorPaletteProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return operators;
    return operators.filter((op) => {
      const haystack = [
        op.id,
        op.display_name ?? "",
        op.description ?? "",
        op.category ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [operators, query]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Add Operator</span>
        <button type="button" className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Search operators…"
          value={query}
          autoFocus
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className={styles.list}>
        {filtered.length === 0 && <div className={styles.emptyState}>No operators match.</div>}
        {filtered.map((op) => {
          const name = op.display_name ?? op.id;
          return (
            <div
              key={`${op.id}@${op.version}`}
              className={styles.item}
              onClick={() => onSelect(op)}
            >
              <div className={styles.itemTop}>{name}</div>
              <div className={styles.itemMeta}>
                {op.id}@{op.version}
                {op.category ? ` · ${op.category}` : ""}
              </div>
              {(op.inputs.length > 0 || op.outputs.length > 0) && (
                <div className={styles.portChips}>
                  {op.inputs.map((p) => {
                    const c = colorForPortType(p.port_type);
                    return (
                      <span
                        key={`in-${p.name}`}
                        className={styles.portChip}
                        style={{ color: c.dim }}
                      >
                        ◂{p.name}
                      </span>
                    );
                  })}
                  {op.outputs.map((p) => {
                    const c = colorForPortType(p.port_type);
                    return (
                      <span
                        key={`out-${p.name}`}
                        className={styles.portChip}
                        style={{ color: c.dim }}
                      >
                        {p.name}▸
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
