import { useEffect, useState } from "react";
import { apiFetch } from "../../services/http";
import { EmptyState } from "../../components/empty_state";
import { sectionLabel } from "../../components/section_label.css";
import { Banner } from "../../components/banner";
import { Panel } from "../../components/panel";
import * as css from "./runtime_queue.css";

interface QueueEntry {
  runId: string;
  deploymentId: string;
  deploymentName?: string;
  kind: "batch" | "test_line" | "resume";
  position: number;
  utteranceTotal?: number;
  etaSeconds?: number;
}

export function RuntimeQueueView(): JSX.Element {
  const [entries, setEntries] = useState<QueueEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async (): Promise<void> => {
      try {
        const data = await apiFetch<{ entries: QueueEntry[] }>("/runtime/queue");
        if (!cancelled) {
          setEntries(data.entries);
          setError(null);
        }
      } catch (err: unknown) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unknown error");
      }
    };
    void load();
    const id = setInterval(() => void load(), 3000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <main className={css.shell}>
      <div className={css.frame}>
        <header className={css.hero}>
          <p className={css.eyebrow}>EmotionTTS · Runtime queue</p>
          <div className={css.titleRow}>
            <h1 className={css.title}>Queue</h1>
            <span className={css.liveChip}>live · 3 s</span>
          </div>
          <p className={css.lede}>
            Work in flight on this host's backend lease. Position 1 is running now; the rest are
            waiting for GPU. Polls every three seconds.
          </p>
        </header>

        {error ? (
          <Banner severity="error">{error}</Banner>
        ) : entries === null ? null : entries.length === 0 ? (
          <Panel density="compact">
            <EmptyState title="Queue is quiet." hint="Recipe → Generate" />
          </Panel>
        ) : (
          <Panel density="compact" aria-labelledby="runtime-queue-section">
            <h2 id="runtime-queue-section" className={sectionLabel}>
              01 / In flight
            </h2>
            <ul className={css.list}>
              {entries.map((entry) => {
                const isActive = entry.position === 1;
                return (
                  <li
                    key={entry.runId}
                    className={isActive ? `${css.row} ${css.rowActive}` : css.row}
                  >
                    <span className={isActive ? css.positionActive : css.position}>
                      {entry.position}
                    </span>
                    <span className={css.identity}>
                      <span className={css.deployment}>
                        {entry.deploymentName ?? entry.deploymentId}
                      </span>
                      <span className={css.runId}>{entry.runId}</span>
                    </span>
                    <span className={kindBadgeClass(entry.kind)}>{formatKind(entry.kind)}</span>
                    <span className={css.eta}>
                      {entry.etaSeconds !== undefined && entry.etaSeconds !== null ? (
                        <>
                          <span className={css.etaValue}>{formatEta(entry.etaSeconds)}</span>
                          <span className={css.etaLabel}>eta</span>
                        </>
                      ) : entry.utteranceTotal !== undefined && entry.utteranceTotal !== null ? (
                        <>
                          <span className={css.etaValue}>{entry.utteranceTotal}</span>
                          <span className={css.etaLabel}>lines</span>
                        </>
                      ) : (
                        <>
                          <span className={css.etaValue}>—</span>
                          <span className={css.etaLabel}>pending</span>
                        </>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        )}
      </div>
    </main>
  );
}

function kindBadgeClass(kind: QueueEntry["kind"]): string {
  switch (kind) {
    case "batch":
      return css.kindBadgeBatch;
    case "test_line":
      return css.kindBadgeTest;
    case "resume":
      return css.kindBadgeResume;
    default:
      return css.kindBadge;
  }
}

function formatKind(kind: QueueEntry["kind"]): string {
  switch (kind) {
    case "test_line":
      return "test line";
    default:
      return kind;
  }
}

function formatEta(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest === 0 ? `${minutes}m` : `${minutes}m ${rest}s`;
}
