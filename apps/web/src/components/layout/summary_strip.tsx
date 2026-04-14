import type { ReactNode } from "react";
import * as styles from "./backend_styles.css";

type SummaryItem = {
  label: string;
  value: string;
  badge?: string;
};

type SummaryStripProps = {
  items?: SummaryItem[];
  children?: ReactNode;
};

export function SummaryStrip({ items = [], children }: SummaryStripProps) {
  return (
    <div className={styles.summaryStripContainer}>
      {items.map((item, i) => (
        <div key={i} className={styles.summaryItem}>
          {i > 0 && <div className={styles.summarySeparator} />}
          <span className={styles.summaryLabel}>{item.label}:</span>
          <span className={styles.summaryValue}>{item.value}</span>
          {item.badge && (
            <span className={styles.summaryBadge}>{item.badge}</span>
          )}
        </div>
      ))}
      {children}
    </div>
  );
}
