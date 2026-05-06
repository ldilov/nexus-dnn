import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  AvailableModel,
  RuntimeDefaults,
  RuntimeTuning,
} from "../../services/local_llm_chat";
import type { ModelMetadata } from "../../services/host_api";
import { defaultTuningFor } from "./default_tuning";
import { RuntimeTuningForm } from "./runtime_tuning_form";
import * as styles from "./model_load_dialog.css";

interface ModelLoadDialogProps {
  open: boolean;
  models: AvailableModel[];
  defaults: RuntimeDefaults;
  metadataByInstallId?: Record<string, ModelMetadata>;
  initialTuningByFamily?: Record<string, RuntimeTuning>;
  onLoad: (model: AvailableModel, tuning: RuntimeTuning) => void | Promise<void>;
  onClose: () => void;
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
  metadataByInstallId,
  initialTuningByFamily,
  onLoad,
  onClose,
}: ModelLoadDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [tuning, setTuning] = useState<RuntimeTuning | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

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
    ? metadataByInstallId?.[selected.family_id]
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
    dialogRef.current?.focus();
  }, [open]);

  const pickModel = useCallback(
    (m: AvailableModel) => {
      setSelectedKey(modelKey(m));
      const stored = initialTuningByFamily?.[m.family_id];
      const seed = stored
        ? {
            ...defaultTuningFor(m, defaults, metadataByInstallId?.[m.family_id]),
            ...stored,
          }
        : defaultTuningFor(m, defaults, metadataByInstallId?.[m.family_id]);
      setTuning(seed);
    },
    [defaults, initialTuningByFamily, metadataByInstallId],
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
      }
    },
    [onClose],
  );

  if (!open) return null;

  const renderList = () => {
    if (models.length === 0) {
      return (
        <div className={styles.empty}>
          No downloaded GGUF models yet.
        </div>
      );
    }
    if (filtered.length === 0) {
      return <div className={styles.empty}>No models match "{query}"</div>;
    }
    return (
      <ul className={styles.list} role="listbox" aria-label="Downloaded models">
        {filtered.map((m, i) => {
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
                <span className={styles.optionIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.optionLabel} title={m.family_id}>
                  {m.label}
                </span>
              </div>
              <div className={styles.optionMeta}>
                <span>{variantLabel}</span>
                <span>·</span>
                <span>{sizeLabel}</span>
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
          <h2 id={titleId} className={styles.title}>
            Load Model
          </h2>
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
                <input
                  type="text"
                  className={styles.search}
                  placeholder="Search models…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Filter models"
                  autoComplete="off"
                />
              </div>
            )}
            {renderList()}
          </div>
          <div className={styles.detailColumn}>{renderDetail()}</div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.loadButton}
            disabled={!selected || !tuning || submitting}
            onClick={() => {
              void handleLoad();
            }}
          >
            {submitting ? "Loading…" : "Load Model"}
          </button>
        </div>
      </div>
    </div>
  );
}
