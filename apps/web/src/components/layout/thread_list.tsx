import { useCallback, useEffect, useState } from "react";
import * as styles from "./layout_styles.css";

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

export function ThreadListComponent({
  emptyMessage = "No conversations yet",
  selectedId: controlledSelectedId,
  onSelect,
}: ThreadListProps) {
  const [threads, setThreads] = useState<ThreadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
  const selectedId = controlledSelectedId ?? internalSelectedId;

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
    const first = threads[0];
    if (!controlledSelectedId && first && !internalSelectedId) {
      setInternalSelectedId(first.id);
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
      <div className={styles.listContainer}>
        <div className={styles.listItemEmpty}>Loading…</div>
      </div>
    );
  }

  if (error && threads.length === 0) {
    return (
      <div className={styles.listContainer}>
        <div className={styles.listItemEmpty} role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className={styles.listContainer}>
        <div className={styles.listItemEmpty}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={styles.listContainer} role="listbox">
      {threads.map((t) => {
        const isSelected = selectedId === t.id;
        const cls = isSelected
          ? `${styles.listItem} ${styles.listItemSelected}`
          : styles.listItem;
        const subtitle =
          t.message_count > 0
            ? `${t.message_count} ${t.message_count === 1 ? "message" : "messages"}`
            : "empty";
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
          >
            <div>
              <div>{t.title}</div>
              <div className={styles.descSmall}>{subtitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
