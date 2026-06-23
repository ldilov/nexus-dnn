import type { CSSProperties, ReactElement } from "react";
import * as styles from "./skeleton.css";

type SkeletonRadius = "control" | "card" | "full" | "text";

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: SkeletonRadius;
  className?: string;
  style?: CSSProperties;
}

/** A single shimmering placeholder block. Compose into rows/cards for content-shaped loading states. */
export function Skeleton({
  width,
  height,
  radius = "control",
  className,
  style,
}: SkeletonProps): ReactElement {
  return (
    <span
      aria-hidden="true"
      className={[styles.skeleton, styles.radii[radius], className]
        .filter(Boolean)
        .join(" ")}
      style={{ width, height, ...style }}
    />
  );
}

interface SkeletonTextProps {
  /** Number of lines to render. */
  lines?: number;
  className?: string;
}

/** Stacked text-line skeletons; the last line is shortened to mimic prose. */
export function SkeletonText({
  lines = 3,
  className,
}: SkeletonTextProps): ReactElement {
  return (
    <span
      aria-hidden="true"
      className={[styles.textBlock, className].filter(Boolean).join(" ")}
    >
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          radius="text"
          // audit-allow: px — single text-line height; last line truncated for rhythm.
          height="12px"
          width={index === lines - 1 ? "62%" : "100%"}
        />
      ))}
    </span>
  );
}

interface SkeletonCardProps {
  className?: string;
}

/** Card-shaped placeholder: a title bar plus three prose lines. */
export function SkeletonCard({ className }: SkeletonCardProps): ReactElement {
  return (
    <div
      aria-hidden="true"
      className={[styles.card, className].filter(Boolean).join(" ")}
    >
      {/* audit-allow: px — placeholder header bar height. */}
      <Skeleton height="20px" width="48%" />
      <SkeletonText lines={3} />
    </div>
  );
}

interface SkeletonGridProps {
  count?: number;
  className?: string;
}

/** Auto-fill grid of {@link SkeletonCard}s, matching the host's card-grid layout. */
export function SkeletonGrid({
  count = 6,
  className,
}: SkeletonGridProps): ReactElement {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={[styles.grid, className].filter(Boolean).join(" ")}
    >
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
