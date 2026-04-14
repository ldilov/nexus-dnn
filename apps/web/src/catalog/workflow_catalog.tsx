import { useEffect, useState } from "react";
import { fetchWorkflows, type Workflow } from "../api/client";
import * as sharedStyles from "./catalog.css";
import * as styles from "./recipe_catalog.css";

// The backend `/workflows` endpoint returns `WorkflowRecord` objects which
// expose `title` rather than the `name` used by the execution `Workflow`.
type WorkflowRow = Workflow & { title?: string; version?: string };

export type WorkflowCatalogProps = {
  selectedId?: string | null;
  onSelect?: (id: string) => void;
};

export function WorkflowCatalog({ selectedId, onSelect }: WorkflowCatalogProps) {
  const [workflows, setWorkflows] = useState<WorkflowRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkflows()
      .then((list) => setWorkflows(list as WorkflowRow[]))
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load workflows"),
      );
  }, []);

  if (error) return <p className={sharedStyles.errorState}>{error}</p>;
  if (workflows.length === 0) {
    return <p className={sharedStyles.emptyState}>No workflows available</p>;
  }

  return (
    <div className={styles.grid}>
      {workflows.map((wf) => {
        const label = wf.title ?? wf.name ?? wf.id;
        const selected = selectedId === wf.id;
        const cls = [styles.card, selected ? styles.cardFeatured : ""].filter(Boolean).join(" ");
        return (
          <button
            key={wf.id}
            type="button"
            className={cls}
            onClick={() => onSelect?.(wf.id)}
          >
            <div className={styles.topRow}>
              <div className={styles.iconBox}>
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "22px", fontVariationSettings: "'FILL' 1, 'wght' 500" }}
                >
                  account_tree
                </span>
              </div>
              <span className={styles.categoryBadge}>
                {wf.version ? `v${wf.version}` : "workflow"}
              </span>
            </div>
            <div className={styles.title}>{label}</div>
            <div className={styles.summary}>{wf.id}</div>
            <div className={styles.footer}>
              <span className={styles.workflowRef}>
                {wf.stages?.length ?? 0} stage{(wf.stages?.length ?? 0) === 1 ? "" : "s"}
              </span>
              <span className={styles.openHint}>
                {selected ? "Selected" : "Open"}
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                  arrow_forward
                </span>
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
