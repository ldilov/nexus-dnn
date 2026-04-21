import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  fetchInstalled,
  type InstalledArtifact,
} from "../../services/model_store";
import {
  fetchActiveModelStatus,
  setActiveModel,
  type RuntimeTuning,
} from "../../services/local_llm_chat";
import { subscribeSessionEvents } from "../../services/event_streams";
import { RuntimePanel } from "./runtime_panel";
import * as css from "./model_picker.css";

type PickerRow = {
  key: string;
  family_id: string;
  variant_id: string;
  family_label: string;
  quant: string;
  size_label: string;
  format_label: string;
  source_repo: string;
};

function formatBytes(size: number | undefined | null): string | null {
  if (!size || size <= 0) return null;
  const units = ["B", "KB", "MB", "GB", "TB"];
  let n = size;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${n < 10 && i > 0 ? n.toFixed(1) : Math.round(n)} ${units[i]}`;
}

function toRows(installed: InstalledArtifact[]): PickerRow[] {
  const ggufOnly = installed.filter(
    (a) => a.format === "gguf" || a.format === "ggml",
  );
  const dedup = new Map<string, PickerRow>();
  for (const a of ggufOnly) {
    const variant = a.variant_id ?? a.artifact_id;
    const key = `${a.family_id}::${variant}`;
    if (dedup.has(key)) continue;
    const size = formatBytes(a.size_bytes);
    const quantMatch = variant.match(/@?([A-Za-z0-9_]+)$/);
    const quant = quantMatch?.[1] ?? variant;
    const authorMatch = a.family_id.match(/^([^/]+)/);
    dedup.set(key, {
      key,
      family_id: a.family_id,
      variant_id: variant,
      family_label: a.family_id.replace(/^[^/]+\//, ""),
      quant,
      size_label: size ?? "—",
      format_label: a.format.toUpperCase(),
      source_repo: authorMatch?.[1] ?? a.source_repo,
    });
  }
  return Array.from(dedup.values()).sort((a, b) =>
    a.family_label.localeCompare(b.family_label),
  );
}

type PickPhase =
  | { kind: "idle" }
  | { kind: "binding"; key: string }
  | { kind: "loading"; key: string; label: string };

export function ModelPicker() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<PickerRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [focusIdx, setFocusIdx] = useState(0);
  const [phase, setPhase] = useState<PickPhase>({ kind: "idle" });
  const activeThreadRef = useRef<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const tuningByFamily = useRef<Map<string, RuntimeTuning>>(new Map());

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setFocusIdx(0);
      setQuery("");
      setPhase({ kind: "idle" });
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
    if (open) {
      (searchRef.current ?? dialogRef.current)?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (phase.kind !== "loading") return;
    const threadId = activeThreadRef.current;
    if (!threadId) return;
    let done = false;
    const finish = (cause: "ready" | "failed", reason?: string) => {
      if (done) return;
      done = true;
      if (cause === "ready") {
        toast.success(`Loaded ${phase.label}`);
        setPhase({ kind: "idle" });
        setOpen(false);
      } else {
        toast.error(`Load failed: ${reason ?? "unknown"}`);
        setPhase({ kind: "idle" });
      }
    };
    const sub = subscribeSessionEvents(threadId, (ev) => {
      if (ev.cause === "model_ready") finish("ready");
      else if (ev.cause === "model_load_failed") finish("failed", ev.reason);
      else if (ev.cause === "model_unavailable") finish("failed", "unavailable");
    });
    const pollTimer = setTimeout(() => {
      if (done) return;
      fetchActiveModelStatus(threadId)
        .then((s) => {
          if (!s) return;
          if (s.status === "ready") finish("ready");
          else if (s.status === "failed") finish("failed", s.reason);
        })
        .catch(() => {});
    }, 250);
    return () => {
      clearTimeout(pollTimer);
      sub.close();
    };
  }, [phase]);

  const close = useCallback(() => {
    if (phase.kind === "binding") return;
    setOpen(false);
  }, [phase]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.family_label, r.family_id, r.quant, r.source_repo, r.variant_id]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [rows, query]);

  useEffect(() => {
    if (focusIdx >= filtered.length) setFocusIdx(0);
  }, [filtered, focusIdx]);

  const pick = useCallback(
    async (row: PickerRow) => {
      const threadId = activeThreadRef.current;
      if (!threadId) {
        toast.error("Select a session first");
        return;
      }
      setPhase({ kind: "binding", key: row.key });
      try {
        const runtime = tuningByFamily.current.get(row.family_id);
        const res = await setActiveModel(
          threadId,
          row.family_id,
          row.variant_id,
          runtime,
        );
        const label = res.label ?? `${row.family_label} ${row.quant}`;
        if (res.status === "ready") {
          toast.success(`Model set to ${label}`);
          setPhase({ kind: "idle" });
          setOpen(false);
          return;
        }
        setPhase({ kind: "loading", key: row.key, label });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "failed to bind model";
        const isRuntimeMissing =
          typeof (e as { payload?: unknown })?.payload === "object" &&
          (
            (e as { payload?: { error?: { code?: string } } }).payload
              ?.error?.code === "RUNTIME_NOT_INSTALLED"
          );
        if (isRuntimeMissing) {
          toast.error("llama.cpp backend not installed", {
            description: "Install it first, then try again.",
            action: {
              label: "Open Backends",
              onClick: () => {
                window.location.hash = "#/backends";
              },
            },
          });
        } else {
          toast.error(msg);
        }
        setPhase({ kind: "idle" });
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
      if (filtered.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusIdx((i) => (i + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusIdx((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const row = filtered[focusIdx];
        if (row && phase.kind === "idle") void pick(row);
      }
    },
    [filtered, focusIdx, pick, close, phase],
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
    if (filtered.length === 0) {
      return (
        <div className={css.statusRow}>No models match "{query}"</div>
      );
    }
    return (
      <ul className={css.list} role="listbox" aria-label="Downloaded models">
        {filtered.map((r, i) => {
          const isBusy =
            (phase.kind === "binding" || phase.kind === "loading") &&
            phase.key === r.key;
          const focused = i === focusIdx;
          return (
            <li
              key={r.key}
              role="option"
              aria-selected={focused}
              tabIndex={focused ? 0 : -1}
              className={[
                css.option,
                focused ? css.optionSelected : "",
                isBusy ? css.optionBusy : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                if (phase.kind !== "idle") return;
                setFocusIdx(i);
                void pick(r);
              }}
              onFocus={() => setFocusIdx(i)}
            >
              <div className={css.optionRow1}>
                <span className={css.familyLabel} title={r.family_id}>
                  {r.family_label}
                </span>
                <span
                  className={css.sizeLabel}
                  title="File size on disk — runtime RAM/VRAM is larger (add ~20–60% for KV cache, compute buffers, activations)."
                >
                  {r.size_label} <span style={{ opacity: 0.55 }}>on disk</span>
                </span>
              </div>
              <div className={css.optionRow2}>
                <span className={css.quantChip}>{r.quant}</span>
                <span className={css.metaSep}>·</span>
                <span className={css.metaText}>{r.format_label}</span>
                <span className={css.metaSep}>·</span>
                <span className={css.metaText} title={r.source_repo}>
                  {r.source_repo}
                </span>
                {isBusy && (
                  <span className={css.inlineStatus}>
                    <span className={css.inlineSpinner} aria-hidden />
                    {phase.kind === "loading"
                      ? "Loading model…"
                      : "Binding…"}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  }, [loading, error, rows, filtered, focusIdx, pick, close, phase, query]);

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
            disabled={phase.kind === "binding"}
          >
            ×
          </button>
        </div>
        {rows.length > 0 && !loading && !error && (
          <div className={css.searchWrap}>
            <input
              ref={searchRef}
              type="text"
              className={css.search}
              placeholder="Search models, quants, authors…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Filter models"
              autoComplete="off"
            />
          </div>
        )}
        {rows.length > 0 &&
          !loading &&
          !error &&
          filtered[focusIdx] &&
          phase.kind === "idle" && (
            <RuntimePanel
              key={filtered[focusIdx].family_id}
              familyId={filtered[focusIdx].family_id}
              onChange={(t) => {
                const row = filtered[focusIdx];
                if (row) tuningByFamily.current.set(row.family_id, t);
              }}
            />
          )}
        {body}
      </div>
    </div>
  );
}
