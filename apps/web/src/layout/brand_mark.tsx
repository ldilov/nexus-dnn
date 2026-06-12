import * as styles from "./brand_mark.css";

interface BrandMarkProps {
  wordmark?: boolean;
  size?: number;
  ariaLabel?: string;
}

export function BrandMark({ wordmark = true, size = 20, ariaLabel = "NexusDNN" }: BrandMarkProps) {
  return (
    <span role="img" aria-label={ariaLabel} className={styles.root}>
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id="nexus-brand-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-primary)" />
            <stop offset="1" stopColor="var(--color-secondary)" />
          </linearGradient>
        </defs>
        <path
          d="M4 20 L4 4 L8 4 L20 16 L20 4"
          fill="none"
          stroke="url(#nexus-brand-grad)"
          strokeWidth="2.4"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <circle cx="20" cy="20" r="2.4" fill="var(--color-tertiary)" />
      </svg>
      {wordmark ? <span className={styles.wordmark}>NexusDNN</span> : null}
    </span>
  );
}
