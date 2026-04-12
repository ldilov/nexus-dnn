import type { RuntimeMetrics } from "../api/client";
import * as styles from "./top_bar.css";

export type ViewId = "recipe" | "stage" | "graph" | "trace" | "timeline";

type TopBarProps = {
  projectName: string;
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
  showViewTabs: boolean;
  metrics: RuntimeMetrics | null;
  metricsConnected: boolean;
  onRun: () => void;
  onCancel: () => void;
  onValidate: () => void;
  isRunning: boolean;
};

const VIEW_TAB_ITEMS: { id: ViewId; label: string }[] = [
  { id: "recipe", label: "Recipe" },
  { id: "stage", label: "Stage" },
  { id: "graph", label: "Graph" },
  { id: "trace", label: "Trace" },
  { id: "timeline", label: "Timeline" },
];

function formatVram(bytes: number): string {
  if (bytes === 0) return "--";
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)}GB`;
}

function metricLevel(
  value: number,
  greenMax: number,
  amberMax: number,
): "normal" | "good" | "warning" | "danger" {
  if (value === 0) return "normal";
  if (value <= greenMax) return "good";
  if (value <= amberMax) return "warning";
  return "danger";
}

export function TopBar({
  projectName,
  activeView,
  onViewChange,
  showViewTabs,
  metrics,
  metricsConnected,
  onRun,
  onCancel,
  onValidate,
  isRunning,
}: TopBarProps) {
  return (
    <>
      <div className={styles.leftZone}>
        <span className={styles.brand}>{projectName}</span>
        {showViewTabs && (
          <div className={styles.viewTabs}>
            {VIEW_TAB_ITEMS.map((tab) => {
              const cls =
                tab.id === activeView
                  ? `${styles.viewTab} ${styles.viewTabActive}`
                  : styles.viewTab;
              return (
                <button
                  key={tab.id}
                  className={cls}
                  onClick={() => onViewChange(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.centerZone}>
        {metrics && metricsConnected && (
          <>
            <div className={styles.metricChip}>
              <span className={styles.metricLabel}>VRAM</span>
              <span className={styles.metricValue({ level: "normal" })}>
                {formatVram(metrics.vram_used_bytes)}
              </span>
            </div>
            <div className={styles.metricChip}>
              <span className={styles.metricLabel}>LAT</span>
              <span
                className={styles.metricValue({
                  level: metricLevel(metrics.latency_ms, 50, 200),
                })}
              >
                {metrics.latency_ms}ms
              </span>
            </div>
            <div className={styles.metricChip}>
              <span className={styles.metricLabel}>LOAD</span>
              <span
                className={styles.metricValue({
                  level: metricLevel(metrics.gpu_utilization_pct, 60, 85),
                })}
              >
                {metrics.gpu_utilization_pct}%
              </span>
            </div>
          </>
        )}
      </div>

      <div className={styles.rightZone}>
        <button className={styles.iconButton} aria-label="Cluster">
          <span className="material-symbols-outlined">hub</span>
        </button>
        <button className={styles.iconButton} aria-label="Sync">
          <span className="material-symbols-outlined">cloud_sync</span>
        </button>
        <button className={styles.iconButton} aria-label="Quick action">
          <span className="material-symbols-outlined">bolt</span>
        </button>
        {isRunning ? (
          <button
            className={`${styles.runButton} ${styles.runButtonActive}`}
            onClick={onCancel}
          >
            Running
          </button>
        ) : (
          <button className={styles.runButton} onClick={onRun}>
            Run
          </button>
        )}
        <button className={styles.validateButton} onClick={onValidate}>
          Validate
        </button>
      </div>
    </>
  );
}
