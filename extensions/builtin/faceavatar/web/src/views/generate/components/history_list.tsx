import { memo, type ReactElement } from "react";
import { Badge, type BadgeTone } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/ui/empty_state";
import { mediaUrlForRef } from "../../../services/media_url";
import type { GenerationJob, GenerationJobStatus } from "../../../services/types";
import * as styles from "./history_list.css";

// No thumbnail at MVP-0 — every row shows the placeholder tile.

interface HistoryListProps {
  jobs: GenerationJob[];
  onOpen: (job: GenerationJob) => void;
  onDelete: (job: GenerationJob) => void;
}

const STATUS_TONE: Record<GenerationJobStatus, BadgeTone> = {
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
        title="No heads yet"
        detail="Completed generations appear here with their preview, parameters and a GLB download."
      />
    );
  }

  return (
    <div className={styles.list}>
      {jobs.map((job) => {
        const glbUrl = mediaUrlForRef(job.glbRef);
        return (
          <div key={job.id} className={styles.row}>
            <span className={styles.thumbFallback} aria-hidden="true">
              3D
            </span>
            <button type="button" className={styles.openBtn} onClick={() => onOpen(job)}>
              <span className={styles.meta}>
                <span className={styles.jobId}>{job.id}</span>
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
            <a
              className={[styles.downloadBtn, glbUrl ? "" : styles.downloadDisabled]
                .filter(Boolean)
                .join(" ")}
              href={glbUrl ?? undefined}
              download={glbUrl ? `${job.glbRef}.glb` : undefined}
              aria-disabled={glbUrl ? undefined : true}
              tabIndex={glbUrl ? 0 : -1}
              aria-label={`Download GLB for ${job.id}`}
              title="Download GLB"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span className={styles.srOnly}>Download GLB</span>
            </a>
            <button
              type="button"
              className={styles.deleteBtn}
              aria-label={`Delete ${job.id} from history`}
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
        );
      })}
    </div>
  );
}

/** Memoized so a stable parent callback prevents re-renders while the sibling
 * form changes. */
export const HistoryList = memo(HistoryListImpl);

function paramsSummary(job: GenerationJob): string {
  const p = job.params;
  const parts: string[] = [job.kind === "graft" ? "graft" : "generate"];
  if (typeof p.seed === "number") parts.push(`seed ${p.seed}`);
  if (typeof p.arc_iters === "number") parts.push(`${p.arc_iters} iters`);
  const faces = job.metadata?.mesh?.faces;
  if (typeof faces === "number") parts.push(`${faces.toLocaleString()} faces`);
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
