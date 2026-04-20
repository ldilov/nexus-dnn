import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  fetchInstalled,
  type InstalledArtifact,
} from "../../services/model_store";
import { setActiveModel } from "../../services/local_llm_chat";
import * as css from "./model_picker.css";

type PickerRow = {
  key: string;
  family_id: string;
  variant_id: string;
  label: string;
  meta: string;
};

function toRows(installed: InstalledArtifact[]): PickerRow[] {
  const ggufOnly = installed.filter(
    (a) => a.format === "gguf" || a.format === "ggml",
  );
  const dedup = new Map<string, PickerRow>();
  for (const a of ggufOnly) {
    const variant = a.variant_id ?? a.artifact_id;
    const key = `${a.family_id}::${variant}`;
    if (dedup.has(key)) continue;
    const sizeMb =
      a.size_bytes && a.size_bytes > 0
        ? `${(a.size_bytes / (1024 * 1024)).toFixed(0)} MB`
        : a.format.toUpperCase();
    dedup.set(key, {
      key,
      family_id: a.family_id,
      variant_id: variant,
      label: `${a.family_id} / ${variant}`,
      meta: `${sizeMb} · ${a.source_repo}`,
    });
  }
  return Array.from(dedup.values()).sort((a, b) =>
    a.label.localeCompare(b.label),
  );
}

export function ModelPicker() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<PickerRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const activeThreadRef = useRef<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setFocusIdx(0);
    };
    const onSelected = (e: Event) => {
      const ce = e as CustomEvent<{ id?: string }>;
      if (ce.detail?.id) activeThreadRef.current = ce.detail.id;
    };
    window.addEventListener("local-llm/model-picker:open", onOpen);
    window.addEventListener("local-llm/thread:selected", onSelected);
    return () => {
      window.removeEventListener("local-llm/model-picker:open", onOpen);
      window.removeEventListener("local-llm/thread:selected", onSelected);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    fetchInstalled(ctrl.signal)
      .then((idx) => setRows(toRows(idx.installed)))
      .catch((e) => {
        if (ctrl.signal.aborted) return;
        setError(e instanceof Error ? e.message : "failed to load");
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false);
      });
    return () => ctrl.abort();
  }, [open]);

  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const pick = useCallback(
    async (row: PickerRow) => {
      const threadId = activeThreadRef.current;
      if (!threadId) {
        toast.error("Select a session first");
        return;
      }
      try {
        await setActiveModel(threadId, row.family_id, row.variant_id);
        toast.success(`Model set to ${row.label}`);
        window.dispatchEvent(
          new CustomEvent("local-llm/session.state.changed", {
            detail: { id: threadId, cause: "active_model" },
          }),
        );
        setOpen(false);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "failed to bind model");
      }
    },
    [],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (rows.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIdx((i) => (i + 1) % rows.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIdx((i) => (i - 1 + rows.length) % rows.length);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const row = rows[focusIdx];
        if (row) void pick(row);
      }
    },
    [rows, focusIdx, pick, close],
  );

  const body = useMemo(() => {
    if (loading) {
      return <div className={css.statusRow}>Loading downloaded models…</div>;
    }
    if (error) {
      return (
        <div className={css.statusRow} role="alert">
          {error}
        </div>
      );
    }
    if (rows.length === 0) {
      return (
        <div className={css.empty}>
          <div>No downloaded GGUF models yet.</div>
          <a
            href="/models?installed=installed&format=gguf"
            className={css.emptyLink}
            onClick={close}
          >
            Go to Model Foundry →
          </a>
        </div>
      );
    }
    return (
      <ul className={css.list} role="listbox" aria-label="Downloaded models">
        {rows.map((r, i) => (
          <li
            key={r.key}
            role="option"
            aria-selected={i === focusIdx}
            tabIndex={i === focusIdx ? 0 : -1}
            className={
              i === focusIdx
                ? `${css.option} ${css.optionSelected}`
                : css.option
            }
            onClick={() => {
              setFocusIdx(i);
              void pick(r);
            }}
            onFocus={() => setFocusIdx(i)}
          >
            <span className={css.optionLabel}>{r.label}</span>
            <span className={css.optionMeta}>{r.meta}</span>
          </li>
        ))}
      </ul>
    );
  }, [loading, error, rows, focusIdx, pick, close]);

  if (!open) return null;

  return (
    <div
      className={css.backdrop}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className={css.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="model-picker-title"
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        <div className={css.header}>
          <div>
            <h2 className={css.title} id="model-picker-title">
              Choose Model
            </h2>
            <div className={css.subtitle}>
              Bind a downloaded GGUF to this session.
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            className={css.closeButton}
            onClick={close}
          >
            ×
          </button>
        </div>
        {body}
      </div>
    </div>
  );
}
