import * as styles from "./thread_rail.css";
import type { ChatThreadSummary } from "./chat_surface";

interface ThreadRailProps {
  threads: ReadonlyArray<ChatThreadSummary>;
  activeThreadId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

export function ThreadRail({ threads, activeThreadId, onSelect, onCreate }: ThreadRailProps) {
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
        <button
          key={t.id}
          type="button"
          className={styles.item}
          onClick={() => onSelect(t.id)}
          aria-current={t.id === activeThreadId}
          title={t.title}
        >
          <span className={styles.itemTitle}>{t.title}</span>
          {t.modelLabel ? <span className={styles.itemMeta}>{t.modelLabel}</span> : null}
        </button>
      ))}
    </nav>
  );
}
