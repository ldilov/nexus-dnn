import type { RuntimeMetrics } from "../../../api/client";
import { Button } from "../../../components/base/button";
import * as styles from "./workflow_action_bar.css";

export type WorkflowActionView = "stage" | "graph" | "trace" | "timeline";

interface WorkflowActionBarProps {
  activeView: WorkflowActionView;
  onViewChange: (view: WorkflowActionView) => void;
  metrics: RuntimeMetrics | null;
  metricsConnected: boolean;
  isRunning: boolean;
  onRun: () => void;
  onCancel: () => void;
  onValidate: () => void;
}

const VIEW_TABS: ReadonlyArray<{ id: WorkflowActionView; label: string }> = [
  { id: "stage", label: "Stage" },
  { id: "graph", label: "Graph" },
  { id: "trace", label: "Trace" },
  { id: "timeline", label: "Timeline" },
];

function formatVram(bytes: number): string {
  if (bytes === 0) return "—";
  return `${(bytes / 1024 ** 3).toFixed(1)}GB`;
}

function levelOf(value: number, green: number, amber: number): "normal" | "good" | "warning" | "danger" {
  if (value === 0) return "normal";
  if (value <= green) return "good";
  if (value <= amber) return "warning";
  return "danger";
}

export function WorkflowActionBar({
  activeView,
  onViewChange,
  metrics,
  metricsConnected,
  isRunning,
  onRun,
  onCancel,
  onValidate,
}: WorkflowActionBarProps) {
  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist">
        {VIEW_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeView}
            className={styles.tab({ active: tab.id === activeView })}
            onClick={() => onViewChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {metrics && metricsConnected && (
        <div className={styles.metrics}>
          <span className={styles.metricChip}>
            <span className={styles.metricLabel}>VRAM</span>
            <span className={styles.metricValue({ level: "normal" })}>
              {formatVram(metrics.vram_used_bytes)}
            </span>
          </span>
          <span className={styles.metricChip}>
            <span className={styles.metricLabel}>LAT</span>
            <span className={styles.metricValue({ level: levelOf(metrics.latency_ms, 50, 200) })}>
              {metrics.latency_ms}ms
            </span>
          </span>
          <span className={styles.metricChip}>
            <span className={styles.metricLabel}>LOAD</span>
            <span
              className={styles.metricValue({ level: levelOf(metrics.gpu_utilization_pct, 60, 85) })}
            >
              {metrics.gpu_utilization_pct}%
            </span>
          </span>
        </div>
      )}
      <div className={styles.actions}>
        <Button variant="secondary" size="sm" onClick={onValidate}>
          Validate
        </Button>
        {isRunning ? (
          <Button variant="tertiary" size="sm" onClick={onCancel}>
            Running…
          </Button>
        ) : (
          <Button variant="tertiary" size="sm" onClick={onRun}>
            Run
          </Button>
        )}
      </div>
    </div>
  );
}
