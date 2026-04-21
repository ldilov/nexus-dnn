import { useCallback, useEffect, useState } from "react";
import * as css from "./thread_list.css";

export interface ThreadRow {
  id: string;
  title: string;
  message_count: number;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
}

interface ThreadListEnvelope {
  data?: { items?: ThreadRow[] };
}

async function fetchThreads(signal?: AbortSignal): Promise<ThreadRow[]> {
  const res = await fetch("/api/v1/extensions/local-llm/chat/threads", {
    signal,
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const body = (await res.json()) as ThreadListEnvelope;
  return body.data?.items ?? [];
}

type ThreadListProps = {
  emptyMessage?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
};

function relativeTime(iso: string, now = Date.now()): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const diff = Math.max(0, now - t);
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d`;
  const wk = Math.floor(day / 7);
  if (wk < 4) return `${wk}w`;
  const mo = Math.floor(day / 30);
  return `${mo}mo`;
}

function messageCountLabel(n: number): string {
  if (n === 0) return "empty";
  if (n === 1) return "1 message";
  return `${n} messages`;
}

export function ThreadListComponent({
  emptyMessage = "No conversations yet",
  selectedId: controlledSelectedId,
  onSelect,
}: ThreadListProps) {
  const [threads, setThreads] = useState<ThreadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    null,
  );
  const selectedId = controlledSelectedId ?? internalSelectedId;
  const [, forceNow] = useState(0);

  const reload = useCallback((signal?: AbortSignal) => {
    setLoading(true);
    fetchThreads(signal)
      .then((rows) => {
        setThreads(rows);
        setError(null);
      })
      .catch((e) => {
        if (signal?.aborted) return;
        setError(e instanceof Error ? e.message : "failed to load");
      })
      .finally(() => {
        if (!signal?.aborted) setLoading(false);
      });
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    reload(ctrl.signal);
    const onCreated = () => reload();
    const onChanged = () => reload();
    window.addEventListener("local-llm/thread:created", onCreated);
    window.addEventListener("local-llm/session.state.changed", onChanged);
    return () => {
      ctrl.abort();
      window.removeEventListener("local-llm/thread:created", onCreated);
      window.removeEventListener("local-llm/session.state.changed", onChanged);
    };
  }, [reload]);

  useEffect(() => {
    const id = setInterval(() => forceNow((n) => n + 1), 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const first = threads[0];
    if (!controlledSelectedId && first && !internalSelectedId) {
      setInternalSelectedId(first.id);
      window.dispatchEvent(
        new CustomEvent("local-llm/thread:selected", {
          detail: { id: first.id },
        }),
      );
    }
  }, [controlledSelectedId, threads, internalSelectedId]);

  const handleSelect = (id: string) => {
    setInternalSelectedId(id);
    onSelect?.(id);
    window.dispatchEvent(
      new CustomEvent("local-llm/thread:selected", { detail: { id } }),
    );
  };

  if (loading && threads.length === 0) {
    return (
      <div className={css.container}>
        <div className={css.loadingRow}>Loading sessions…</div>
      </div>
    );
  }

  if (error && threads.length === 0) {
    return (
      <div className={css.container}>
        <div className={css.emptyState} role="alert">
          <span className={`material-symbols-outlined ${css.emptyIcon}`}>
            error
          </span>
          {error}
        </div>
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className={css.container}>
        <div className={css.emptyState}>
          <span className={`material-symbols-outlined ${css.emptyIcon}`}>
            forum
          </span>
          <div>{emptyMessage}</div>
          <div style={{ opacity: 0.6, fontSize: "11.5px" }}>
            Start one with <strong>+ New Session</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={css.container} role="listbox" aria-label="Chat sessions">
      <div className={css.sectionLabel}>Recent</div>
      {threads.map((t) => {
        const isSelected = selectedId === t.id;
        const cls = isSelected
          ? `${css.item} ${css.itemSelected}`
          : css.item;
        const titleCls = isSelected
          ? `${css.title} ${css.titleSelected}`
          : css.title;
        return (
          <div
            key={t.id}
            className={cls}
            role="option"
            aria-selected={isSelected}
            tabIndex={0}
            onClick={() => handleSelect(t.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(t.id);
              }
            }}
            title={t.title}
          >
            <div className={css.rowTop}>
              {isSelected && (
                <span className={css.liveDot} aria-hidden />
              )}
              <span className={titleCls}>{t.title}</span>
              <span className={css.timestamp}>
                {relativeTime(t.updated_at)}
              </span>
            </div>
            <div className={css.rowMeta}>
              <span>{messageCountLabel(t.message_count)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
