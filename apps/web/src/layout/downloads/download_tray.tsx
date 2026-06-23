import { useMemo, useState } from "react";
import { useDownloadManager } from "../../services/download_manager";
import {
  DownloadFailed,
  DownloadProgress,
  DownloadedChip,
} from "../../views/models-search/components/DownloadProgress";
import { isTerminalState, type DownloadJob } from "../../services/model_store";
import * as s from "./download_tray.css";

/** Human label for a job row: the variant id, else the family + filename. */
function jobLabel(job: DownloadJob, variantId: string | undefined): string {
  if (variantId) return variantId;
  const filename = job.targets[0]?.filename;
  if (filename) return `${job.family_id} · ${filename}`;
  return job.family_id;
}

function ActiveRow({
  job,
  variantId,
  onPause,
  onResume,
  onCancel,
}: {
  job: DownloadJob;
  variantId: string | undefined;
  onPause: (jobId: string) => void;
  onResume: (jobId: string) => void;
  onCancel: (jobId: string) => void;
}) {
  const progressState =
    job.state === "downloading" || job.state === "paused" ? job.state : "queued";
  return (
    <div className={s.jobRow}>
      <div className={s.jobHead}>
        <span className={s.jobLabel} title={jobLabel(job, variantId)}>
          {jobLabel(job, variantId)}
        </span>
        <button
          type="button"
          className={s.iconButton}
          aria-label="Cancel download"
          onClick={() => onCancel(job.job_id)}
        >
          <span
            className={`material-symbols-outlined ${s.iconGlyph}`}
            aria-hidden="true"
          >
            close
          </span>
        </button>
      </div>
      <div className={s.jobProgressSlot}>
        <DownloadProgress
          state={progressState}
          progressBytes={job.progress_bytes}
          totalBytes={job.total_bytes}
          jobId={job.job_id}
          onPause={
            job.state === "downloading" ? () => onPause(job.job_id) : undefined
          }
          onResume={
            job.state === "paused" ? () => onResume(job.job_id) : undefined
          }
        />
      </div>
    </div>
  );
}

function TerminalRow({
  job,
  variantId,
  onResume,
  onDismiss,
}: {
  job: DownloadJob;
  variantId: string | undefined;
  onResume: (jobId: string) => void;
  onDismiss: (jobId: string) => void;
}) {
  return (
    <div className={s.jobRow}>
      <div className={s.jobHead}>
        <span className={s.jobLabel} title={jobLabel(job, variantId)}>
          {jobLabel(job, variantId)}
        </span>
        <button
          type="button"
          className={`${s.iconButton} ${s.iconButtonNeutral}`}
          aria-label="Dismiss"
          onClick={() => onDismiss(job.job_id)}
        >
          <span
            className={`material-symbols-outlined ${s.iconGlyph}`}
            aria-hidden="true"
          >
            close
          </span>
        </button>
      </div>
      {job.state === "downloaded" ? (
        <DownloadedChip sizeBytes={job.total_bytes} />
      ) : (
        <DownloadFailed
          errorReason={job.error_reason}
          onRetry={() => onResume(job.job_id)}
        />
      )}
    </div>
  );
}

const TRAY_BODY_ID = "download-tray-body";

export function DownloadTray() {
  const { jobs, jobVariantMap, pauseJob, resumeJob, cancelJob, dismissJob } =
    useDownloadManager();
  const [collapsed, setCollapsed] = useState(false);

  const { active, terminal } = useMemo(() => {
    const rows = Object.values(jobs).sort((a, b) =>
      (a.created_at ?? "").localeCompare(b.created_at ?? ""),
    );
    return {
      active: rows.filter((j) => !isTerminalState(j.state)),
      terminal: rows.filter((j) => isTerminalState(j.state)),
    };
  }, [jobs]);

  const total = active.length + terminal.length;
  if (total === 0) return null;

  const countText =
    active.length > 0
      ? `${active.length} active`
      : `${terminal.length} finished`;

  const clearFinished = () => {
    for (const job of terminal) dismissJob(job.job_id);
  };

  return (
    <section
      className={collapsed ? `${s.dock} ${s.dockCollapsed}` : s.dock}
      aria-label="Downloads"
    >
      <header className={s.header}>
        <span
          className={`material-symbols-outlined ${s.headerIcon}`}
          aria-hidden="true"
        >
          downloading
        </span>
        <span className={s.headerTitle}>
          <span className={s.titleLabel}>Downloads</span>
          <span className={s.countLabel} role="status">
            {countText}
          </span>
        </span>
        <span className={s.headerActions}>
          {terminal.length > 0 && (
            <button
              type="button"
              className={s.headerButton}
              onClick={clearFinished}
            >
              Clear finished
            </button>
          )}
          <button
            type="button"
            className={s.headerButton}
            aria-expanded={!collapsed}
            aria-controls={collapsed ? undefined : TRAY_BODY_ID}
            aria-label={collapsed ? "Expand downloads" : "Collapse downloads"}
            onClick={() => setCollapsed((c) => !c)}
          >
            <span
              className={`material-symbols-outlined ${s.headerButtonIcon}`}
              aria-hidden="true"
            >
              {collapsed ? "expand_less" : "expand_more"}
            </span>
          </button>
        </span>
      </header>

      {!collapsed && (
        <div className={s.body} id={TRAY_BODY_ID}>
          {active.map((job) => (
            <ActiveRow
              key={job.job_id}
              job={job}
              variantId={jobVariantMap[job.job_id]}
              onPause={pauseJob}
              onResume={resumeJob}
              onCancel={cancelJob}
            />
          ))}
          {terminal.map((job) => (
            <TerminalRow
              key={job.job_id}
              job={job}
              variantId={jobVariantMap[job.job_id]}
              onResume={resumeJob}
              onDismiss={dismissJob}
            />
          ))}
        </div>
      )}
    </section>
  );
}
