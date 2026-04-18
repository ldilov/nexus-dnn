import { useState, useRef, useEffect, type ReactNode } from "react";
import * as styles from "./layout_styles.css";

type LogLevel = "debug" | "info" | "warn" | "error";

type LogEntry = {
  timestamp?: string;
  level: LogLevel;
  message: string;
};

type LogViewerProps = {
  entries?: LogEntry[];
  autoScroll?: boolean;
  children?: ReactNode;
};

const LEVELS: LogLevel[] = ["debug", "info", "warn", "error"];

const LEVEL_STYLES: Record<LogLevel, string> = {
  debug: styles.logLevelDebug,
  info: styles.logLevelInfo,
  warn: styles.logLevelWarn,
  error: styles.logLevelError,
};

export function LogViewer({ entries = [], autoScroll = true, children }: LogViewerProps) {
  const [activeFilter, setActiveFilter] = useState<LogLevel | "all">("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries.length, autoScroll]);

  const filtered = activeFilter === "all"
    ? entries
    : entries.filter((e) => e.level === activeFilter);

  return (
    <div className={styles.logViewer}>
      <div className={styles.logToolbar}>
        <button
          className={activeFilter === "all"
            ? `${styles.logFilterButton} ${styles.logFilterActive}`
            : styles.logFilterButton}
          onClick={() => setActiveFilter("all")}
        >
          All
        </button>
        {LEVELS.map((level) => (
          <button
            key={level}
            className={activeFilter === level
              ? `${styles.logFilterButton} ${styles.logFilterActive}`
              : styles.logFilterButton}
            onClick={() => setActiveFilter(level)}
          >
            {level.toUpperCase()}
          </button>
        ))}
      </div>
      <div ref={scrollRef} className={styles.logContent}>
        {filtered.map((entry, i) => (
          <div key={i} className={styles.logLine}>
            {entry.timestamp && (
              <span className={styles.logTimestamp}>{entry.timestamp}</span>
            )}
            <span className={LEVEL_STYLES[entry.level]}>
              [{entry.level.toUpperCase()}]
            </span>
            <span className={styles.logMessage}>{entry.message}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className={styles.centeredHint}>
            No log entries
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
