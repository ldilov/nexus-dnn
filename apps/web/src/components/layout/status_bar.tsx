import type { ReactNode } from "react";
import { vars } from "../../theme/contract.css";
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

function statusColor(status?: string): string {
  if (status === "warning") return vars.color.warning.base;
  if (status === "error") return vars.color.error.base;
  if (status === "ok") return vars.color.success.base;
  return vars.color.text.muted;
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
            style={{ backgroundColor: statusColor(item.status) }}
          />
          {item.label}
          {item.value && <span>: {item.value}</span>}
        </span>
      ))}
      {children}
    </div>
  );
}
