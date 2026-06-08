import type { ReactElement } from "react";
import { Badge, type BadgeTone } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/ui/empty_state";
import type { RenderJob, RenderJobStatus } from "../../../services/types";
import * as styles from "./history_list.css";

interface HistoryListProps {
  jobs: RenderJob[];
  onOpen: (job: RenderJob) => void;
}

const STATUS_TONE: Record<RenderJobStatus, BadgeTone> = {
  queued: "neutral",
  running: "accent",
  succeeded: "success",
  failed: "warning",
  cancelled: "neutral",
};

export function HistoryList({ jobs, onOpen }: HistoryListProps): ReactElement {
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
        <button key={job.id} type="button" className={styles.row} onClick={() => onOpen(job)}>
          <span className={styles.meta}>
            <span className={styles.preset}>{job.presetId ?? "custom"}</span>
            <span className={styles.summary}>{paramsSummary(job)}</span>
          </span>
          <span className={styles.right}>
            <Badge tone={STATUS_TONE[job.status]}>{job.status}</Badge>
          </span>
        </button>
      ))}
    </div>
  );
}

function paramsSummary(job: RenderJob): string {
  const p = job.params;
  const parts: string[] = [];
  if (p.width && p.height) parts.push(`${p.width}×${p.height}`);
  if (p.num_clips) parts.push(`${p.num_clips} clips`);
  if (p.num_inference_steps) parts.push(`${p.num_inference_steps} steps`);
  return parts.join(" · ") || "—";
}
