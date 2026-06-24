import type { ReactElement } from "react";
import * as styles from "./progress_bar.css";

export type ProgressTone = "accent" | "ai" | "success" | "error";

interface ProgressBarProps {
  /** Completion fraction 0–1. Pass `null`/`undefined` for an indeterminate bar. */
  value?: number | null;
  tone?: ProgressTone;
  thick?: boolean;
  label?: string;
  /** Right-aligned mono detail (e.g. "62% · 1.2 GB/s"). */
  detail?: string;
  className?: string;
}

function clampFraction(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.max(0, Math.min(1, value));
}

/** Tokenized progress track — determinate (scaleX) or indeterminate (sliding sweep). */
export function ProgressBar({
  value,
  tone = "accent",
  thick = false,
  label,
  detail,
  className,
}: ProgressBarProps): ReactElement {
  const isIndeterminate = value === null || value === undefined;
  const fraction = isIndeterminate ? 0 : clampFraction(value);
  const fillClass = [
    styles.fill,
    styles.tones[tone],
    isIndeterminate ? styles.indeterminate : "",
  ]
    .filter(Boolean)
    .join(" ");

  const track = (
    <div
      className={[styles.track, thick ? styles.trackThick : "", className]
        .filter(Boolean)
        .join(" ")}
      role="progressbar"
      aria-valuemin={isIndeterminate ? undefined : 0}
      aria-valuemax={isIndeterminate ? undefined : 100}
      aria-valuenow={isIndeterminate ? undefined : Math.round(fraction * 100)}
      aria-label={label}
    >
      <div
        className={fillClass}
        style={isIndeterminate ? undefined : { transform: `scaleX(${fraction})` }}
      />
    </div>
  );

  if (!label && !detail) {
    return track;
  }
  return (
    <div className={styles.row}>
      {label ? <span className={styles.label}>{label}</span> : <span />}
      {track}
      {detail ? <span className={styles.detail}>{detail}</span> : <span />}
    </div>
  );
}
