import { useState, type ReactNode } from "react";
import * as styles from "./layout_styles.css";

type ColumnDef = {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
};

type DataTableProps = {
  columns?: ColumnDef[];
  rows?: Record<string, unknown>[];
  selectable?: boolean;
  children?: ReactNode;
};

type SortState = {
  key: string;
  direction: "asc" | "desc";
} | null;

function formatCellValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function compareValues(a: unknown, b: unknown, direction: "asc" | "desc"): number {
  const aStr = String(a ?? "");
  const bStr = String(b ?? "");
  const aNum = Number(aStr);
  const bNum = Number(bStr);
  const bothNumbers = !isNaN(aNum) && !isNaN(bNum) && aStr !== "" && bStr !== "";
  const result = bothNumbers ? aNum - bNum : aStr.localeCompare(bStr);
  return direction === "asc" ? result : -result;
}

export function DataTable({ columns = [], rows = [], selectable = false, children }: DataTableProps) {
  const [sort, setSort] = useState<SortState>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSort = (key: string) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const sortedRows = sort
    ? [...rows].sort((a, b) => compareValues(a[sort.key], b[sort.key], sort.direction))
    : rows;

  const sortIndicator = (key: string): string => {
    if (sort?.key !== key) return "";
    return sort.direction === "asc" ? " \u2191" : " \u2193";
  };

  return (
    <div className={styles.overflowAuto}>
      <table className={styles.dataTable}>
        <thead className={styles.dataTableHead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={styles.dataTableTh}
                style={col.width ? { width: col.width } : undefined}
                onClick={col.sortable !== false ? () => handleSort(col.key) : undefined}
              >
                {col.label}{sortIndicator(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, rowIdx) => {
            const isSelected = selectable && selectedIndex === rowIdx;
            const rowCls = isSelected
              ? `${styles.dataTableRow} ${styles.dataTableRowSelected}`
              : styles.dataTableRow;
            return (
              <tr
                key={rowIdx}
                className={rowCls}
                onClick={selectable ? () => setSelectedIndex(rowIdx) : undefined}
              >
                {columns.map((col) => (
                  <td key={col.key} className={styles.dataTableTd}>
                    {formatCellValue(row[col.key])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {children}
    </div>
  );
}
