import { useEffect, useRef, useState, type KeyboardEvent, type Ref } from "react";
import * as styles from "./thread_rail.css";
import type { ChatThreadSummary } from "./chat_surface";

/** Shared element id so the chat header toggle can `aria-controls` the rail. */
export const CHAT_THREAD_RAIL_ID = "chat-thread-rail";

interface ThreadRailProps {
  threads: ReadonlyArray<ChatThreadSummary>;
  activeThreadId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onRename?: (id: string, nextTitle: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  reconciling?: boolean;
  /** When true the rail is slid in as an off-canvas drawer (phones only). */
  mobileOpen?: boolean;
  /** Id for the rail nav, referenced by the chat header toggle's aria-controls. */
  id?: string;
  /** Remove the rail from the tab order + a11y tree (closed drawer on phones). */
  inert?: boolean;
  /** Ref to the rail nav so the chat surface can move focus into the drawer. */
  navRef?: Ref<HTMLElement>;
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

export function ThreadRail({ threads, activeThreadId, onSelect, onCreate, onRename, onDelete, reconciling, mobileOpen = false, id, inert, navRef }: ThreadRailProps) {
  const railCls = [
    styles.rail,
    mobileOpen ? styles.railMobileOpen : styles.railMobileClosed,
  ].join(" ");
  return (
    <nav
      id={id}
      ref={navRef}
      tabIndex={-1}
      className={railCls}
      aria-label="Chat threads"
      inert={inert || undefined}
    >
      <div className={styles.railHeader}>
        <span>Threads</span>
        {reconciling ? (
          <span
            className={styles.reconcilePulse}
            role="status"
            aria-live="polite"
            title="Syncing with backend"
          >
            <span className={styles.reconcileDot} aria-hidden="true" />
            syncing
          </span>
        ) : null}
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
