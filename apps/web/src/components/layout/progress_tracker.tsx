import type { ReactNode } from "react";
import { Button } from "../base/button";
import * as styles from "./layout_styles.css";

type ProgressTrackerProps = {
  label?: string;
  percent?: number;
  bytesLoaded?: number;
  bytesTotal?: number;
  showCancel?: boolean;
  onCancel?: () => void;
  children?: ReactNode;
};

function formatBytes(bytes: number): string {
  if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(1)} GB`;
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

export function ProgressTracker({
  label,
  percent,
  bytesLoaded,
  bytesTotal,
  showCancel = false,
  onCancel,
  children,
}: ProgressTrackerProps) {
  const resolvedPercent =
    percent ??
    (bytesTotal !== undefined && bytesTotal > 0 && bytesLoaded !== undefined
      ? (bytesLoaded / bytesTotal) * 100
      : 0);
  const clampedPercent = Math.min(100, Math.max(0, resolvedPercent));
  const bytesLabel = bytesTotal !== undefined && bytesLoaded !== undefined
    ? `${formatBytes(bytesLoaded)} / ${formatBytes(bytesTotal)}`
    : null;

  return (
    <div className={styles.progressTracker}>
      <div className={styles.progressInfo}>
        <span className={styles.progressLabel}>{label ?? "Progress"}</span>
        <span className={styles.progressPercent}>{clampedPercent.toFixed(0)}%</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${clampedPercent}%` }} />
      </div>
      {bytesLabel && (
        <div className={styles.progressInfo}>
          <span className={styles.progressLabel}>{bytesLabel}</span>
          {showCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
