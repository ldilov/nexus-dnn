import type { DownloadState } from "../../../services/model_store";
import * as s from "./DownloadProgress.css";

function formatSize(bytes: number | null | undefined): string {
  if (
    bytes === null ||
    bytes === undefined ||
    !Number.isFinite(bytes) ||
    bytes <= 0
  ) {
    return "—";
  }
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[unit]}`;
}

function computePercent(progress: number, total: number | null): number | null {
  if (!total || total <= 0) return null;
  return Math.min(100, Math.max(0, (progress / total) * 100));
}

interface DownloadProgressProps {
  state: Extract<DownloadState, "queued" | "downloading" | "paused">;
  progressBytes: number;
  totalBytes: number | null;
  onPause?: () => void;
  onResume?: () => void;
}

export function DownloadProgress({
  state,
  progressBytes,
  totalBytes,
  onPause,
  onResume,
}: DownloadProgressProps) {
  const pct = computePercent(progressBytes, totalBytes);
  const pctLabel = pct !== null ? Math.round(pct) : null;
  const fillCls =
    state === "paused" ? `${s.fill} ${s.fillPaused}` : s.fill;
  const labelCls = state === "paused" ? `${s.label} ${s.labelDim}` : s.label;

  const counter =
    totalBytes && totalBytes > 0
      ? `${formatSize(progressBytes)} / ${formatSize(totalBytes)}${
          pctLabel !== null ? ` · ${pctLabel}%` : ""
        }`
      : progressBytes > 0
        ? `${formatSize(progressBytes)} downloaded`
        : "starting…";

  const ariaLabel =
    state === "queued"
      ? "Download queued"
      : state === "paused"
        ? `Download paused at ${pctLabel ?? 0} percent`
        : `Downloading, ${pctLabel ?? 0} percent`;

  if (state === "queued") {
    return (
      <div className={s.row} role="status" aria-label="Download queued">
        <span className={s.queuedBadge}>
          <span className="material-symbols-outlined" aria-hidden="true">
            schedule
          </span>
          Queued
        </span>
      </div>
    );
  }

  return (
    <div className={s.row}>
      <div className={s.wrap}>
        <div className={s.header}>
          <span className={labelCls}>
            {state === "paused" ? `Paused · ${counter}` : counter}
          </span>
        </div>
        <div
          className={s.bar}
          role="progressbar"
          aria-label={ariaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pctLabel ?? 0}
        >
          <div
            className={fillCls}
            style={{ width: pct !== null ? `${pct}%` : "8%" }}
          />
        </div>
      </div>
      {state === "downloading" && onPause && (
        <button
          type="button"
          className={s.inlineButton}
          aria-label="Pause download"
          onClick={onPause}
        >
          Pause
        </button>
      )}
      {state === "paused" && onResume && (
        <button
          type="button"
          className={`${s.inlineButton} ${s.inlineButtonAccent}`}
          aria-label="Resume download"
          onClick={onResume}
        >
          Resume
        </button>
      )}
    </div>
  );
}

interface DownloadedChipProps {
  sizeBytes: number | null;
  onReDownload?: () => void;
  onDelete?: () => void;
}

export function DownloadedChip({
  sizeBytes,
  onReDownload,
  onDelete,
}: DownloadedChipProps) {
  return (
    <div className={s.row}>
      <span className={s.downloadedChip} role="status" aria-label="Downloaded">
        <span
          className={`material-symbols-outlined ${s.downloadedIcon}`}
          aria-hidden="true"
        >
          check_circle
        </span>
        Downloaded{sizeBytes && sizeBytes > 0 ? ` · ${formatSize(sizeBytes)}` : ""}
      </span>
      {onReDownload && (
        <button
          type="button"
          className={s.inlineButton}
          aria-label="Re-download"
          onClick={onReDownload}
        >
          Re-download
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          className={s.inlineButton}
          aria-label="Delete download"
          onClick={onDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
}

interface DownloadFailedProps {
  errorReason: string | null;
  onRetry: () => void;
}

export function DownloadFailed({ errorReason, onRetry }: DownloadFailedProps) {
  return (
    <div className={s.failedRow} role="alert">
      <span className={s.failedText}>
        Download failed
        {errorReason ? ` — ${errorReason}` : ""}
      </span>
      <button
        type="button"
        className={`${s.inlineButton} ${s.inlineButtonDanger}`}
        aria-label="Retry download"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}
