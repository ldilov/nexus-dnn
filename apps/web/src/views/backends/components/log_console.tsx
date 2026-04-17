import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import * as s from "./log_console.css";

export interface LogLine {
  timestamp: number;
  source: string;
  runtime_id: string | null;
  deployment_id: string | null;
  severity: string;
  namespace: string;
  message: string;
}

interface Props {
  lines: LogLine[];
}

type Severity = "trace" | "debug" | "info" | "warn" | "error";

// llama-server emits `[INFO  ]`, `[WARN  ]`, `[ERROR ]` prefixes with padding,
// plus `DEBUG`/`TRACE` in verbose mode. When the backend's inferred severity
// is `info` but the message itself starts with a native level prefix, trust
// the prefix — it's the authoritative signal from the process.
const LEVEL_PREFIX = /^\s*\[?\s*(TRACE|DEBUG|INFO|WARN|WARNING|ERROR|ERR|FATAL)\s*\]?\s*/i;

function refineSeverity(rawSeverity: string, message: string): Severity {
  const match = message.match(LEVEL_PREFIX);
  if (match) {
    const raw = match[1]!.toUpperCase();
    if (raw === "TRACE") return "trace";
    if (raw === "DEBUG") return "debug";
    if (raw === "INFO") return "info";
    if (raw === "WARN" || raw === "WARNING") return "warn";
    if (raw === "ERR" || raw === "ERROR" || raw === "FATAL") return "error";
  }
  switch (rawSeverity) {
    case "trace":
      return "trace";
    case "debug":
      return "debug";
    case "warn":
      return "warn";
    case "error":
      return "error";
    default:
      return "info";
  }
}

// Strip the level prefix once we've parsed it so the rendered message doesn't
// repeat what the pill already shows.
function cleanMessage(message: string): string {
  return message.replace(LEVEL_PREFIX, "").trimStart();
}

interface Parsed extends LogLine {
  level: Severity;
  clean: string;
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  return `${hh}:${mm}:${ss}.${ms}`;
}

// Filter key is presence-based: if the Set is empty, everything passes.
// That lets the "ALL" pill always render as un-pressed by default.
function passesFilter<T>(value: T, filter: ReadonlySet<T>): boolean {
  return filter.size === 0 || filter.has(value);
}

const SEVERITY_ORDER: readonly Severity[] = ["trace", "debug", "info", "warn", "error"];

export function LogConsole({ lines }: Props) {
  const [sevFilter, setSevFilter] = useState<ReadonlySet<Severity>>(() => new Set());
  const [sourceFilter, setSourceFilter] = useState<ReadonlySet<string>>(() => new Set());
  const [autoScroll, setAutoScroll] = useState(true);
  const [paused, setPaused] = useState(false);
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Parse once per incoming line — cheap enough to recompute per render since
  // upstream already memoizes the array via a buffer.
  const parsed: Parsed[] = useMemo(() => {
    return lines.map((l) => ({
      ...l,
      level: refineSeverity(l.severity, l.message),
      clean: cleanMessage(l.message),
    }));
  }, [lines]);

  const knownSources = useMemo(() => {
    const set = new Set<string>();
    for (const l of parsed) set.add(l.source);
    return [...set].sort();
  }, [parsed]);

  const filtered: Parsed[] = useMemo(() => {
    const q = search.trim().toLowerCase();
    return parsed.filter((l) => {
      if (!passesFilter(l.level, sevFilter)) return false;
      if (!passesFilter(l.source, sourceFilter)) return false;
      if (q && !l.clean.toLowerCase().includes(q) && !l.namespace.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [parsed, sevFilter, sourceFilter, search]);

  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 22,
    overscan: 20,
  });

  // Auto-scroll tails new lines unless the user pauses or scrolls up.
  useEffect(() => {
    if (!autoScroll || paused) return;
    const el = scrollRef.current;
    if (!el) return;
    // Use raf so the virtualizer has committed its latest measurement.
    const raf = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
    return () => cancelAnimationFrame(raf);
  }, [filtered.length, autoScroll, paused]);

  // Toggling a chip adds/removes from the filter set (multi-select).
  const toggle = useCallback(
    <T,>(
      set: ReadonlySet<T>,
      value: T,
      setter: (next: ReadonlySet<T>) => void,
    ) => {
      const next = new Set(set);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      setter(next);
    },
    [],
  );

  const handleCopy = useCallback(() => {
    const text = filtered
      .map((l) => `[${formatTime(l.timestamp)}] ${l.level.toUpperCase().padEnd(5)} ${l.namespace} ${l.clean}`)
      .join("\n");
    void navigator.clipboard?.writeText(text);
  }, [filtered]);

  // Severity tallies drive the pill labels — operators want to see at a
  // glance how many errors vs warnings are in the current view.
  const sevCounts = useMemo(() => {
    const c: Record<Severity, number> = { trace: 0, debug: 0, info: 0, warn: 0, error: 0 };
    for (const l of parsed) c[l.level] += 1;
    return c;
  }, [parsed]);

  return (
    <div className={s.root} data-testid="log-console">
      <div className={s.toolbar}>
        <div className={s.filterGroup} role="toolbar" aria-label="Severity filter">
          {SEVERITY_ORDER.map((sev) => (
            <button
              key={sev}
              type="button"
              className={s.filterChip}
              aria-pressed={sevFilter.has(sev)}
              onClick={() => toggle(sevFilter, sev, setSevFilter)}
            >
              {sev} · {sevCounts[sev]}
            </button>
          ))}
        </div>

        {knownSources.length > 1 && (
          <div className={s.filterGroup} role="toolbar" aria-label="Source filter">
            {knownSources.map((src) => (
              <button
                key={src}
                type="button"
                className={s.filterChip}
                aria-pressed={sourceFilter.has(src)}
                onClick={() => toggle(sourceFilter, src, setSourceFilter)}
              >
                {src}
              </button>
            ))}
          </div>
        )}

        <input
          type="search"
          placeholder="search message or namespace…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search logs"
          className={`${s.tallyChip} ${s.searchInput}`}
        />

        <span className={s.spacer} />

        <span className={s.tallyChip}>{filtered.length} / {parsed.length} lines</span>

        <button
          type="button"
          className={s.controlButton}
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? "▶ Resume" : "⏸ Pause"}
        </button>
        <button
          type="button"
          className={s.controlButton}
          aria-pressed={autoScroll}
          onClick={() => setAutoScroll((a) => !a)}
        >
          {autoScroll ? "↓ Follow" : "↧ Manual"}
        </button>
        <button
          type="button"
          className={s.controlButton}
          onClick={handleCopy}
          title="Copy visible lines to clipboard"
        >
          Copy
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className={s.empty} data-testid="log-empty">
          {parsed.length === 0 ? "No log lines yet." : "No lines match the current filters."}
        </div>
      ) : (
        <div className={s.scroll} ref={scrollRef} data-testid="log-lines">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((vr) => {
              const line = filtered[vr.index]!;
              const msgCls =
                line.level === "error"
                  ? `${s.message} ${s.messageError}`
                  : line.level === "warn"
                    ? `${s.message} ${s.messageWarn}`
                    : s.message;
              return (
                <div
                  key={vr.key}
                  ref={rowVirtualizer.measureElement}
                  data-index={vr.index}
                  className={s.line}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${vr.start}px)`,
                  }}
                >
                  <span className={s.timestamp}>{formatTime(line.timestamp)}</span>
                  <span className={s.severity[line.level]}>{line.level}</span>
                  <span
                    className={s.namespace}
                    onClick={() => setSearch(line.namespace)}
                    role="button"
                    tabIndex={0}
                    title={`Filter by "${line.namespace}"`}
                  >
                    {line.namespace}
                  </span>
                  <span className={msgCls}>{line.clean}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
