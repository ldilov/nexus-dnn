import {
  type KeyboardEvent,
  type ReactElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import * as styles from "./searchable_select.css";

export interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  /** Id for the trigger button so an external <label htmlFor> can target it. */
  id: string;
  value: string;
  options: SearchableSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  /** Accessible name for the search box and listbox. */
  searchLabel?: string;
}

function ChevronIcon(): ReactElement {
  return (
    <span className={styles.chevron} aria-hidden="true">
      <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none" aria-hidden="true">
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CheckIcon(): ReactElement {
  return (
    <span className={styles.check} aria-hidden="true">
      <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none" aria-hidden="true">
        <path
          d="M3.5 8.5l3 3 6-7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Single-select combobox with an in-popover search box. Replaces a native
 * <select> when the option list is long enough that scanning it is slow.
 * Follows the ARIA combobox + listbox + aria-activedescendant pattern:
 * keyboard navigation lives on the search input, options are non-focusable.
 */
export function SearchableSelect({
  id,
  value,
  options,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  searchLabel = "Search options",
}: SearchableSelectProps): ReactElement {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const selected = useMemo(() => options.find((o) => o.value === value) ?? null, [options, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const close = useCallback((focusTrigger: boolean) => {
    setOpen(false);
    setQuery("");
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  const choose = useCallback(
    (option: SearchableSelectOption) => {
      onChange(option.value);
      close(true);
    },
    [onChange, close],
  );

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const idx = options.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [open, options, value]);

  useEffect(() => {
    setActiveIndex((i) => Math.min(Math.max(0, i), Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  useEffect(() => {
    if (!open) return;
    const node = listRef.current?.children[activeIndex] as HTMLElement | undefined;
    node?.scrollIntoView?.({ block: "nearest" });
  }, [open, activeIndex]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, close]);

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(filtered.length - 1, Math.max(0, i) + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(Math.max(0, filtered.length - 1));
        break;
      case "Enter": {
        e.preventDefault();
        const opt = filtered[activeIndex];
        if (opt) choose(opt);
        break;
      }
      case "Escape":
        e.preventDefault();
        close(true);
        break;
      default:
        break;
    }
  };

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const activeOptionId =
    open && filtered[activeIndex] ? `${listboxId}-opt-${activeIndex}` : undefined;

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        id={id}
        ref={triggerRef}
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => (open ? close(false) : setOpen(true))}
        onKeyDown={onTriggerKeyDown}
      >
        <span className={selected ? styles.triggerText : styles.triggerPlaceholder}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronIcon />
      </button>

      {open && (
        <div className={styles.popover}>
          <div className={styles.searchRow}>
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded
              aria-controls={listboxId}
              aria-activedescendant={activeOptionId}
              aria-autocomplete="list"
              aria-label={searchLabel}
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
            />
          </div>
          <div
            ref={listRef}
            id={listboxId}
            // biome-ignore lint/a11y/useSemanticElements: searchable combobox cannot use a native <select>
            role="listbox"
            aria-label={searchLabel}
            tabIndex={-1}
            className={styles.list}
          >
            {filtered.length === 0 ? (
              <div className={styles.empty}>No matches</div>
            ) : (
              filtered.map((o, idx) => {
                const isSelected = o.value === value;
                const isActive = idx === activeIndex;
                const cls = [
                  styles.option,
                  isActive ? styles.optionActive : "",
                  isSelected ? styles.optionSelected : "",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <button
                    key={o.value}
                    type="button"
                    id={`${listboxId}-opt-${idx}`}
                    // biome-ignore lint/a11y/useSemanticElements: combobox option cannot be a native <option>
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={-1}
                    data-active={isActive || undefined}
                    className={cls}
                    onClick={() => choose(o)}
                    onMouseMove={() => setActiveIndex(idx)}
                  >
                    <span className={styles.optionLabel}>{o.label}</span>
                    {isSelected && <CheckIcon />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
