import { Button } from "../components/button";
import * as styles from "./top_bar.css";

export type ViewId = "stage" | "graph" | "trace" | "artifacts";

const VIEW_LABELS: Record<ViewId, string> = {
  stage: "Stage",
  graph: "Graph",
  trace: "Trace",
  artifacts: "Artifacts",
};

type TopBarProps = {
  workflowName: string;
  activeView: ViewId;
  onViewChange: (view: ViewId) => void;
  onRun: () => void;
  onCancel: () => void;
  isRunning: boolean;
};

export function TopBar({
  workflowName,
  activeView,
  onViewChange,
  onRun,
  onCancel,
  isRunning,
}: TopBarProps) {
  return (
    <>
      <span className={styles.title}>{workflowName}</span>
      <div className={styles.viewSwitcher}>
        {(Object.keys(VIEW_LABELS) as ViewId[]).map((id) => {
          const active = id === activeView;
          const cls = active
            ? `${styles.viewTab} ${styles.viewTabActive}`
            : styles.viewTab;
          return (
            <button key={id} className={cls} onClick={() => onViewChange(id)}>
              {VIEW_LABELS[id]}
            </button>
          );
        })}
      </div>
      {isRunning ? (
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      ) : (
        <Button variant="primary" size="sm" onClick={onRun}>
          Run
        </Button>
      )}
    </>
  );
}
