import { memo, type ReactElement } from "react";
import { Badge, type BadgeTone } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/ui/empty_state";
import type { RenderJob, RenderJobStatus } from "../../../services/types";
import * as styles from "./history_list.css";

interface HistoryListProps {
  jobs: RenderJob[];
  onOpen: (job: RenderJob) => void;
  onDelete: (job: RenderJob) => void;
}

const STATUS_TONE: Record<RenderJobStatus, BadgeTone> = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral",
};

function HistoryListImpl({ jobs, onOpen, onDelete }: HistoryListProps): ReactElement {
  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No renders yet"
        detail="Completed renders appear here with their preset, parameters and status."
      />
    );
  }

  return (
    <div className={styles.list}>
      {jobs.map((job) => (
        <div key={job.id} className={styles.row}>
          <button type="button" className={styles.openBtn} onClick={() => onOpen(job)}>
            <span className={styles.meta}>
              <span className={styles.preset}>{job.presetId ?? "custom"}</span>
              <span className={styles.summary}>{paramsSummary(job)}</span>
            </span>
            <span className={styles.right}>
              <time
                className={styles.time}
                dateTime={job.createdAt}
                title={absoluteTime(job.createdAt)}
              >
                {relativeTime(job.createdAt)}
              </time>
              <Badge tone={STATUS_TONE[job.status]}>{job.status}</Badge>
            </span>
          </button>
          <button
            type="button"
            className={styles.deleteBtn}
            aria-label={`Delete ${job.presetId ?? "custom"} render from history`}
            title="Delete from history"
            onClick={() => onDelete(job)}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              <title>delete</title>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

/** Memoized so a stable `onOpen` prevents re-renders on every keystroke in the
 * sibling form. The store's single big context memo means `onOpen` is stable
 * only because handleOpenJob reads dirty via getIsDirty() instead of the state. */
export const HistoryList = memo(HistoryListImpl);

function paramsSummary(job: RenderJob): string {
  const p = job.params;
  const parts: string[] = [];
  if (p.width && p.height) parts.push(`${p.width}×${p.height}`);
  if (p.num_clips) parts.push(`${p.num_clips} clips`);
  if (p.num_inference_steps) parts.push(`${p.num_inference_steps} steps`);
  return parts.join(" · ") || "—";
}

function absoluteTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString();
}

function relativeTime(iso: string): string {
  const date = new Date(iso);
  const ms = date.getTime();
  if (Number.isNaN(ms)) return "";
  const diff = Date.now() - ms;
  if (diff < 0) return "just now";
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
