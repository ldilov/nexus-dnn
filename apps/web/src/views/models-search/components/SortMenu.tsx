import { useEffect, useMemo, useRef, useState } from "react";
import { FEATURE_FLAGS } from "../../../constants/feature_flags";
import type { ParsedSearchParams } from "../../../services/model_store";
import * as s from "../models_search.css";

type SortValue = ParsedSearchParams["sort"];

const BASE_SORT_OPTIONS: readonly { value: SortValue; label: string }[] = [
  { value: "relevance", label: "Most relevant" },
  { value: "most_downloaded", label: "Most downloaded" },
  { value: "trending", label: "Trending" },
  { value: "recently_updated", label: "Recently updated" },
  { value: "alphabetical", label: "Alphabetical" },
];

const COMPATIBLE_FIRST_OPTION: { value: SortValue; label: string } = {
  value: "compatible_first",
  label: "Compatible first",
};

interface SortMenuProps {
  value: SortValue;
  onChange: (next: SortValue) => void;
}

/**
 * Sort dropdown. Closes on outside click / Escape. All options are
 * keyboard-reachable; the trigger carries an `aria-haspopup` + current
 * selection so assistive tech announces "Sort by: Most downloaded".
 */
export function SortMenu({ value, onChange }: SortMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const SORT_OPTIONS = useMemo(
    () =>
      FEATURE_FLAGS.compatibleFirstSort
        ? [...BASE_SORT_OPTIONS, COMPATIBLE_FIRST_OPTION]
        : BASE_SORT_OPTIONS,
    [],
  );

  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current =
    SORT_OPTIONS.find((o) => o.value === value) ?? {
      value: "relevance" as SortValue,
      label: "Most relevant",
    };

  return (
    <div className={s.sortMenu} ref={containerRef}>
      <button
        type="button"
        className={s.sortButton}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Sort by ${current.label}`}
        onClick={() => setOpen((v) => !v)}
      >
        Sort — {current.label}
        <span className="material-symbols-outlined" aria-hidden="true">
          expand_more
        </span>
      </button>
      {open && (
        <div className={s.sortPanel} role="listbox">
          {SORT_OPTIONS.map((opt) => {
            const active = opt.value === value;
            const cls = active
              ? `${s.sortOption} ${s.sortOptionActive}`
              : s.sortOption;
            return (
              <button
                key={opt.value}
                type="button"
                className={cls}
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
