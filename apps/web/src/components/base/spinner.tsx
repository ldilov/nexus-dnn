import type { ReactElement } from "react";
import * as styles from "./spinner.css";

export type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
  /** Accessible status label. When set the spinner announces itself; otherwise it is decorative. */
  label?: string;
  /** Center the spinner in its container (for full-pane loading states). */
  center?: boolean;
  className?: string;
}

/** Standalone determinate-less loader. The canonical "work in progress" glyph for the host shell. */
export function Spinner({
  size = "md",
  label,
  center,
  className,
}: SpinnerProps): ReactElement {
  const glyph = (
    <span
      className={[styles.spinner, styles.sizes[size], className]
        .filter(Boolean)
        .join(" ")}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
  if (!center) {
    return glyph;
  }
  return <span className={styles.centered}>{glyph}</span>;
}
