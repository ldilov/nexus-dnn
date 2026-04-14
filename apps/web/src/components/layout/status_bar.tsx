import type { ReactNode } from "react";
import * as styles from "./layout_styles.css";

type StatusItem = {
  label: string;
  value?: string;
  status?: "ok" | "warning" | "error";
};

type StatusBarProps = {
  compact?: boolean;
  items?: StatusItem[];
  children?: ReactNode;
};

function statusColor(status?: string): string | undefined {
  if (status === "warning") return "var(--warning-base)";
  if (status === "error") return "var(--error-base)";
  return undefined;
}

export function LayoutStatusBar({ compact = false, items = [], children }: StatusBarProps) {
  const cls = compact
    ? `${styles.statusBar} ${styles.statusBarCompact}`
    : styles.statusBar;

  return (
    <div className={cls}>
      {items.map((item, i) => (
        <span key={i} className={styles.statusIndicator}>
          <span
            className={styles.statusDot}
            style={statusColor(item.status) ? { backgroundColor: statusColor(item.status) } : undefined}
          />
          {item.label}
          {item.value && <span>: {item.value}</span>}
        </span>
      ))}
      {children}
    </div>
  );
}
