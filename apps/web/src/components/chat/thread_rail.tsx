import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import * as styles from "./thread_rail.css";
import type { ChatThreadSummary } from "./chat_surface";

interface ThreadRailProps {
  threads: ReadonlyArray<ChatThreadSummary>;
  activeThreadId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onRename?: (id: string, nextTitle: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

interface ThreadRowProps {
  thread: ChatThreadSummary;
  active: boolean;
  onSelect: (id: string) => void;
  onRename?: (id: string, nextTitle: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

function ThreadRow({ thread, active, onSelect, onRename, onDelete }: ThreadRowProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(thread.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = async () => {
    const next = draft.trim();
    setEditing(false);
    if (!next || next === thread.title || !onRename) return;
    await onRename(thread.id, next);
  };

  const cancel = () => {
    setDraft(thread.title);
    setEditing(false);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void commit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
  };

  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.item}
        onClick={() => !editing && onSelect(thread.id)}
        aria-current={active}
        title={thread.title}
      >
        {editing ? (
          <input
            ref={inputRef}
            className={styles.renameInput}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            onBlur={() => void commit()}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Rename thread ${thread.title}`}
          />
        ) : (
          <span className={styles.itemTitle}>{thread.title}</span>
        )}
        {thread.modelLabel && !editing ? (
          <span className={styles.itemMeta}>{thread.modelLabel}</span>
        ) : null}
      </button>
      {!editing && onRename ? (
        <button
          type="button"
          className={styles.iconBtn}
          onClick={(e) => {
            e.stopPropagation();
            setDraft(thread.title);
            setEditing(true);
          }}
          aria-label={`Rename thread ${thread.title}`}
          title="Rename"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            edit
          </span>
        </button>
      ) : null}
      {!editing && onDelete ? (
        <button
          type="button"
          className={styles.iconBtn}
          onClick={(e) => {
            e.stopPropagation();
            void onDelete(thread.id);
          }}
          aria-label={`Delete thread ${thread.title}`}
          title="Delete"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            delete
          </span>
        </button>
      ) : null}
    </div>
  );
}

export function ThreadRail({ threads, activeThreadId, onSelect, onCreate, onRename, onDelete }: ThreadRailProps) {
  return (
    <nav className={styles.rail} aria-label="Chat threads">
      <div className={styles.railHeader}>
        <span>Threads</span>
        <button
          type="button"
          className={styles.newThreadBtn}
          onClick={onCreate}
          aria-label="New thread"
          title="New thread"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            add
          </span>
        </button>
      </div>
      {threads.map((t) => (
        <ThreadRow
          key={t.id}
          thread={t}
          active={t.id === activeThreadId}
          onSelect={onSelect}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </nav>
  );
}
