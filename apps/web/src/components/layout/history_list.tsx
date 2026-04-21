import { useState, type ReactNode } from "react";
import { Badge } from "../base/badge";
import * as styles from "./backend_styles.css";
import * as layoutStyles from "./layout_styles.css";

type HistoryEntry = {
  id: string;
  action: string;
  result: string;
  startedAt: string;
  finishedAt?: string;
  summary?: string;
};

type HistoryListProps = {
  entries?: HistoryEntry[];
  children?: ReactNode;
};

type BadgeIntent = "neutral" | "info" | "success" | "warning" | "error";

const ACTION_ICONS: Record<string, string> = {
  install: "download",
  validate: "verified",
  start: "play_arrow",
  stop: "stop",
  restart: "refresh",
  repair: "build",
  failure: "error",
};

const RESULT_INTENT: Record<string, BadgeIntent> = {
  success: "success",
  running: "info",
  failed: "error",
  cancelled: "warning",
  pending: "neutral",
};

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function HistoryList({ entries = [], children }: HistoryListProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  if (entries.length === 0) {
    return (
      <div className={styles.historyContainer}>
        <div className={styles.historyEmpty}>No history entries</div>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.historyContainer}>
      {entries.map((entry) => {
        const icon = ACTION_ICONS[entry.action] ?? "terminal";
        const intent = RESULT_INTENT[entry.result] ?? "neutral";
        const isOpen = expanded.has(entry.id);

        return (
          <div key={entry.id} className={styles.historyEntry}>
            <div
              className={styles.historyEntryHeader}
              onClick={() => toggleExpand(entry.id)}
            >
              <div className={styles.historyIcon}>
                <span className={`material-symbols-outlined ${layoutStyles.iconInherit}`}>
                  {icon}
                </span>
              </div>
              <span className={styles.historyAction}>{entry.action}</span>
              <Badge label={entry.result} intent={intent} size="sm" />
              <span className={styles.historyTimestamp}>
                {formatTimestamp(entry.startedAt)}
              </span>
            </div>
            {isOpen && entry.summary && (
              <div className={styles.historyDetail}>
                {entry.summary}
                {entry.finishedAt && (
                  <div>Finished: {formatTimestamp(entry.finishedAt)}</div>
                )}
              </div>
            )}
          </div>
        );
      })}
      {children}
    </div>
  );
}
