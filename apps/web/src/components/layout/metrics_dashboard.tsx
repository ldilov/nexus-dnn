import type { ReactNode } from "react";
import * as styles from "./layout_styles.css";

type MetricDef = {
  key: string;
  label: string;
  unit?: string;
  format?: "number" | "percent" | "bytes" | "duration";
};

type MetricsDashboardProps = {
  layout?: "default" | "compact" | "large";
  metrics?: MetricDef[];
  data?: Record<string, unknown>;
  children?: ReactNode;
};

function formatMetricValue(value: unknown, format?: string): string {
  if (value === undefined || value === null) return "--";
  const num = Number(value);
  if (isNaN(num)) return String(value);

  switch (format) {
    case "percent":
      return `${(num * 100).toFixed(1)}%`;
    case "bytes": {
      if (num >= 1073741824) return `${(num / 1073741824).toFixed(1)} GB`;
      if (num >= 1048576) return `${(num / 1048576).toFixed(1)} MB`;
      if (num >= 1024) return `${(num / 1024).toFixed(1)} KB`;
      return `${num} B`;
    }
    case "duration": {
      if (num >= 3600) return `${(num / 3600).toFixed(1)}h`;
      if (num >= 60) return `${(num / 60).toFixed(1)}m`;
      return `${num.toFixed(1)}s`;
    }
    default:
      return Number.isInteger(num) ? String(num) : num.toFixed(2);
  }
}

export function MetricsDashboard({
  layout = "default",
  metrics = [],
  data = {},
  children,
}: MetricsDashboardProps) {
  const containerCls = layout === "compact"
    ? `${styles.metricsDashboard} ${styles.metricsDashboardCompact}`
    : styles.metricsDashboard;

  const isLarge = layout === "large";

  return (
    <div className={containerCls}>
      {metrics.map((metric) => (
        <div key={metric.key} className={styles.metricCard}>
          <span className={styles.metricLabel}>{metric.label}</span>
          <span className={isLarge ? styles.metricValueLarge : styles.metricValue}>
            {formatMetricValue(data[metric.key], metric.format)}
            {isLarge && metric.unit && (
              <span className={styles.metricUnit}>{metric.unit}</span>
            )}
          </span>
        </div>
      ))}
      {children}
    </div>
  );
}
