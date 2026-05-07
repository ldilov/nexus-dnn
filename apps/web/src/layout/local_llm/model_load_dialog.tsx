import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router";
import type {
  AvailableModel,
  RuntimeDefaults,
  RuntimeTuning,
} from "../../services/local_llm_chat";
import type { ModelMetadata } from "../../services/host_api";
import { Button } from "../../components/base/button";
import { defaultTuningFor } from "./default_tuning";
import { RuntimeTuningForm } from "./runtime_tuning_form";
import * as styles from "./model_load_dialog.css";

interface ModelLoadDialogProps {
  open: boolean;
  models: AvailableModel[];
  defaults: RuntimeDefaults;
  metadataByKey?: Record<string, ModelMetadata>;
  initialTuningByFamily?: Record<string, RuntimeTuning>;
  onLoad: (model: AvailableModel, tuning: RuntimeTuning) => void | Promise<void>;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusableElementsIn(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
  );
}

function formatBytes(size: number | null | undefined): string {
  if (!size || size <= 0) return "—";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let n = size;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n < 10 && i > 0 ? n.toFixed(1) : Math.round(n)} ${units[i]}`;
}

function modelKey(m: AvailableModel): string {
  return `${m.family_id}::${m.variant_id ?? ""}`;
}

export function ModelLoadDialog({
  open,
  models,
  defaults,
  metadataByKey,
  initialTuningByFamily,
  onLoad,
  onClose,
}: ModelLoadDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [tuning, setTuning] = useState<RuntimeTuning | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const titleId = useId();
  const hotkeyLabel = useMemo<string>(() => {
    if (typeof navigator === "undefined") return "Ctrl F";
    return /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘ F" : "Ctrl F";
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return models;
    return models.filter((m) =>
      [m.family_id, m.label, m.variant_id ?? "", m.format]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [models, query]);

  const selected = useMemo(() => {
    if (!selectedKey) return null;
    return filtered.find((m) => modelKey(m) === selectedKey) ?? null;
  }, [filtered, selectedKey]);

  const selectedMetadata = selected
    ? metadataByKey?.[selected.family_id]
    : undefined;

  useEffect(() => {
    if (!open) {
      setSelectedKey(null);
      setTuning(null);
      setQuery("");
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = focusableElementsIn(dialog);
    const first = focusables[0] ?? dialog;
    first.focus();
    return () => {
      const restore = previousFocusRef.current;
      previousFocusRef.current = null;
      restore?.focus();
    };
  }, [open]);

  const pickModel = useCallback(
    (m: AvailableModel) => {
      setSelectedKey(modelKey(m));
      const stored = initialTuningByFamily?.[m.family_id];
      const seed = stored
        ? {
            ...defaultTuningFor(m, defaults, metadataByKey?.[m.family_id]),
            ...stored,
          }
        : defaultTuningFor(m, defaults, metadataByKey?.[m.family_id]);
      setTuning(seed);
    },
    [defaults, initialTuningByFamily, metadataByKey],
  );

  const handleLoad = useCallback(async () => {
    if (!selected || !tuning) return;
    setSubmitting(true);
    try {
      await onLoad(selected, tuning);
    } finally {
      setSubmitting(false);
    }
  }, [onLoad, selected, tuning]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "f" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
        return;
      }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        if (selected && tuning && !submitting) {
          e.preventDefault();
          void handleLoad();
        }
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = focusableElementsIn(dialog);
      if (focusables.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !dialog.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose, selected, tuning, submitting, handleLoad],
  );

  if (!open) return null;

  const renderList = () => {
    if (models.length === 0) {
      return (
        <div className={styles.empty}>
          <span className={styles.emptyGlyph} aria-hidden="true">
            0
          </span>
          <p className={styles.emptyTitle}>No GGUF models downloaded</p>
          <span className={styles.emptyHint}>Download one to load it here</span>
          <Link
            to="/models-search"
            className={styles.emptyCta}
            onClick={onClose}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
            Open Models Search
          </Link>
        </div>
      );
    }
    if (filtered.length === 0) {
      return (
        <div className={styles.empty}>
          <span className={styles.emptyGlyph} aria-hidden="true">
            0
          </span>
          <p className={styles.emptyTitle}>No matches for "{query}"</p>
          <span className={styles.emptyHint}>Try a shorter query</span>
        </div>
      );
    }
    return (
      <ul className={styles.list} role="listbox" aria-label="Downloaded models">
        {filtered.map((m) => {
          const key = modelKey(m);
          const isSel = selectedKey === key;
          const sizeLabel = formatBytes(m.size_bytes);
          const variantLabel = m.variant_id ?? m.format;
          return (
            <li
              key={key}
              role="option"
              aria-selected={isSel}
              tabIndex={isSel ? 0 : -1}
              className={
                isSel ? `${styles.option} ${styles.optionSelected}` : styles.option
              }
              onClick={() => pickModel(m)}
            >
              <div className={styles.optionRowTop}>
                <span className={styles.optionLabel} title={m.family_id}>
                  {m.label}
                </span>
                <span className={styles.optionMetaInline}>
                  <span>{variantLabel}</span>
                  <span>·</span>
                  <span>{sizeLabel}</span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderDetail = () => {
    if (!selected || !tuning) {
      return (
        <div className={styles.placeholder}>
          Pick a model to configure load-time params.
        </div>
      );
    }
    return (
      <RuntimeTuningForm
        model={selected}
        value={tuning}
        defaults={defaults}
        modelMetadata={selectedMetadata}
        onChange={setTuning}
      />
    );
  };

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 id={titleId} className={styles.title}>
              Load Model
            </h2>
            <span className={styles.countChip} aria-label={`${models.length} models available`}>
              {models.length} available
            </span>
          </div>
          <button
            type="button"
            aria-label="Close"
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.listColumn}>
            {models.length > 0 && (
              <div className={styles.searchWrap}>
                <span className={styles.searchGlyph} aria-hidden="true">
                  search
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.search}
                  placeholder="Search models…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Filter models"
                  autoComplete="off"
                />
                {query.length > 0 ? (
                  <button
                    type="button"
                    className={styles.searchClear}
                    aria-label="Clear search"
                    onClick={() => {
                      setQuery("");
                      searchInputRef.current?.focus();
                    }}
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      close
                    </span>
                  </button>
                ) : (
                  <span className={styles.searchHotkey} aria-hidden="true">
                    {hotkeyLabel}
                  </span>
                )}
              </div>
            )}
            {renderList()}
          </div>
          <div className={styles.detailColumn}>{renderDetail()}</div>
        </div>

        <div className={styles.footer}>
          <Button variant="ghost" size="md" onClick={onClose}>
            Cancel
            <span className={styles.kbdHint} aria-hidden="true">
              Esc
            </span>
          </Button>
          <Button
            variant="primary"
            size="md"
            loading={submitting}
            disabled={!selected || !tuning}
            onClick={() => {
              void handleLoad();
            }}
          >
            {submitting ? "Loading…" : "Load Model"}
            <span className={styles.kbdHint} aria-hidden="true">
              ⌘ Enter
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
