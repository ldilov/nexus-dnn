import { useEffect, useRef } from "react";
import type { ExtensionDto } from "../api/generated/ExtensionDto";
import * as styles from "./catalog_controls.css";

export type StatusKey = "stable" | "modified" | "user";

export interface ControlsState {
  query: string;
  statusFilters: ReadonlySet<StatusKey>;
  extensionFilter: string | null;
}

export interface CatalogControlsProps {
  state: ControlsState;
  onChange: (next: ControlsState) => void;
  availableExtensions: ReadonlyArray<ExtensionDto>;
  availableStatuses: ReadonlyArray<StatusKey>;
  placeholder?: string;
  resultCount?: number;
  totalCount?: number;
}

const STATUS_LABEL: Record<StatusKey, string> = {
  stable: "Stable",
  modified: "Modified",
  user: "User",
};

export function CatalogControls({
  state,
  onChange,
  availableExtensions,
  availableStatuses,
  placeholder = "Search by name, id, extension…",
  resultCount,
  totalCount,
}: CatalogControlsProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typingInInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable);
      if (event.key === "/" && !typingInInput) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        event.preventDefault();
        onChange({ ...state, query: "" });
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state, onChange]);

  const hasAny =
    state.query.length > 0 || state.statusFilters.size > 0 || state.extensionFilter !== null;

  const toggleStatus = (key: StatusKey) => {
    const next = new Set(state.statusFilters);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onChange({ ...state, statusFilters: next });
  };

  return (
    <div className={styles.bar} role="search">
      <label className={styles.searchWrap}>
        <span className={`material-symbols-outlined ${styles.searchIcon}`} aria-hidden="true">
          search
        </span>
        <input
          ref={inputRef}
          type="search"
          value={state.query}
          onChange={(event) => onChange({ ...state, query: event.target.value })}
          onKeyDown={(event) => {
            if (event.key === "Enter") event.preventDefault();
          }}
          placeholder={placeholder}
          className={styles.searchInput}
          aria-label="Search catalog"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </label>

      {availableStatuses.length > 0 ? (
        <div className={styles.filterGroup} role="group" aria-label="Filter by status">
          {availableStatuses.map((key) => {
            const active = state.statusFilters.has(key);
            const cls = [styles.filterChip, active ? styles.filterChipActive : ""]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={key}
                type="button"
                className={cls}
                aria-pressed={active}
                onClick={() => toggleStatus(key)}
              >
                {STATUS_LABEL[key]}
              </button>
            );
          })}
        </div>
      ) : null}

      {availableExtensions.length > 1 ? (
        <select
          className={styles.extensionSelect}
          value={state.extensionFilter ?? ""}
          onChange={(event) =>
            onChange({
              ...state,
              extensionFilter: event.target.value === "" ? null : event.target.value,
            })
          }
          aria-label="Filter by extension"
        >
          <option value="">All extensions</option>
          {availableExtensions.map((ext) => (
            <option key={ext.id} value={ext.id}>
              {ext.name ?? ext.id}
            </option>
          ))}
        </select>
      ) : null}

      {typeof resultCount === "number" && typeof totalCount === "number" && hasAny ? (
        <span className={styles.resultCount} aria-live="polite">
          {resultCount} of {totalCount}
        </span>
      ) : null}

      {hasAny ? (
        <button
          type="button"
          className={styles.clearAll}
          onClick={() =>
            onChange({ query: "", statusFilters: new Set(), extensionFilter: null })
          }
        >
          Clear all
        </button>
      ) : null}
    </div>
  );
}
