import * as css from "./recent_runs.css";
import { sizeStyle as pillSize, toneStyle as pillTone } from "../../../components/status_pill.css";
import type { RunStatus, RunSummary } from "../../../services/types";

export interface RecentRunsProps {
  runs: readonly RunSummary[];
  deploymentId: string;
  onOpenQueue?: () => void;
  onOpenRun?: (runId: string) => void;
  emptyHint?: string;
}

const STATUS_TO_TONE: Record<RunStatus, keyof typeof pillTone> = {
  completed: "success",
  running: "accent",
  queued: "neutral",
  failed: "danger",
  cancelled: "faint",
  partial: "warning",
};

export function RecentRuns({
  runs,
  deploymentId,
  onOpenQueue,
  onOpenRun,
  emptyHint,
}: RecentRunsProps): JSX.Element {
  if (runs.length === 0) {
    return (
      <div className={css.root}>
        <header className={css.headerRow}>
          <a
            className={css.link}
            href={`/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(deploymentId)}/queue`}
            onClick={
              onOpenQueue
                ? (e) => {
                    e.preventDefault();
                    onOpenQueue();
                  }
                : undefined
            }
          >
            Open queue →
          </a>
        </header>
        <p className={css.empty}>No runs yet.</p>
        <p className={css.emptyHint}>
          {emptyHint ?? "Hit Generate to enqueue a batch."}
        </p>
      </div>
    );
  }

  return (
    <div className={css.root}>
      <header className={css.headerRow}>
        <span />
        <a
          className={css.link}
          href={`/#/extensions/nexus.audio.emotiontts/${encodeURIComponent(deploymentId)}/queue`}
          onClick={
            onOpenQueue
              ? (e) => {
                  e.preventDefault();
                  onOpenQueue();
                }
              : undefined
          }
        >
          Open queue →
        </a>
      </header>
      <ul className={css.list}>
        {runs.slice(0, 5).map((run) => (
          <li key={run.runId}>
            <button
              type="button"
              className={css.row}
              onClick={onOpenRun ? () => onOpenRun(run.runId) : undefined}
            >
              <span className={css.runId}>{run.runId}</span>
              <span className={`${pillSize.sm} ${pillTone[STATUS_TO_TONE[run.status] ?? "neutral"]}`}>
                {run.status}
              </span>
              <span className={css.meta}>
                {formatTime(run.startedAt ?? run.queuedAt)}
              </span>
              <span className={css.meta}>
                {run.kind}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatTime(epochSeconds: number | null | undefined): string {
  if (!epochSeconds) return "—";
  const seconds = epochSeconds > 1e12 ? Math.floor(epochSeconds / 1000) : epochSeconds;
  const date = new Date(seconds * 1000);
  if (Number.isNaN(date.getTime())) return "—";
  const now = Date.now();
  const deltaMs = now - date.getTime();
  if (deltaMs < 60_000) return "just now";
  if (deltaMs < 3_600_000) return `${Math.floor(deltaMs / 60_000)}m ago`;
  if (deltaMs < 86_400_000) return `${Math.floor(deltaMs / 3_600_000)}h ago`;
  return date.toISOString().slice(0, 16).replace("T", " ");
}
