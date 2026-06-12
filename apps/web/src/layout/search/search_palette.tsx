import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DeploymentSummary, LayoutSummary } from "../../services/api_client";
import {
  buildSearchItems,
  filterSearchItems,
  groupSearchItems,
  type SearchItem,
} from "./search_results";
import * as styles from "./search_palette.css";

interface SearchPaletteProps {
  open: boolean;
  deployments: ReadonlyArray<DeploymentSummary>;
  extensions: ReadonlyArray<LayoutSummary>;
  loading?: boolean;
  onClose: () => void;
  onSelect: (item: SearchItem) => void;
}

export function SearchPalette({
  open,
  deployments,
  extensions,
  loading = false,
  onClose,
  onSelect,
}: SearchPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allItems = useMemo(
    () => buildSearchItems(deployments, extensions),
    [deployments, extensions],
  );
  const results = useMemo(
    () => filterSearchItems(allItems, query),
    [allItems, query],
  );
  const groups = useMemo(() => groupSearchItems(results), [results]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>(
      "[data-active='true']",
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, results]);

  const commit = useCallback(
    (item: SearchItem | undefined) => {
      if (!item) return;
      onSelect(item);
      onClose();
    },
    [onSelect, onClose],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((i) =>
          results.length ? (i - 1 + results.length) % results.length : 0,
        );
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        commit(results[activeIndex]);
      }
    },
    [results, activeIndex, commit, onClose],
  );

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.palette}
        role="dialog"
        aria-modal="true"
        aria-label="Search deployments and extensions"
        onKeyDown={onKeyDown}
      >
        <div className={styles.inputRow}>
          <span
            className={`material-symbols-outlined ${styles.inputIcon}`}
            aria-hidden="true"
          >
            search
          </span>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Search deployments and extensions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search query"
            autoComplete="off"
            spellCheck={false}
          />
          <span className={styles.kbdHint}>esc</span>
        </div>

        <div className={styles.list} ref={listRef} role="listbox">
          {results.length === 0 ? (
            <div className={styles.empty}>
              {loading
                ? "Loading…"
                : query
                  ? `No matches for “${query}”`
                  : "Nothing to search yet"}
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.kind}>
                <div className={styles.groupTitle}>{group.title}</div>
                {group.items.map((item) => {
                  flatIndex += 1;
                  const isActive = flatIndex === activeIndex;
                  const index = flatIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      className={`${styles.row} ${isActive ? styles.rowActive : ""}`}
                      onMouseMove={() => setActiveIndex(index)}
                      onClick={() => commit(item)}
                    >
                      <span
                        className={`material-symbols-outlined ${styles.rowIcon}`}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className={styles.rowBody}>
                        <span className={styles.rowLabel}>{item.label}</span>
                        {item.sublabel && (
                          <span className={styles.rowSub}>{item.sublabel}</span>
                        )}
                      </span>
                      {item.state && (
                        <span className={styles.stateChip}>{item.state}</span>
                      )}
                      {isActive && <span className={styles.enterHint}>↵</span>}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
