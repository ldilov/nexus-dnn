import { useCallback, useEffect, useState } from "react";
import { fetchDeployments, type DeploymentSummary } from "../api/client";
import * as s from "./deployments_view.css";

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; items: readonly DeploymentSummary[] }
  | { kind: "error"; message: string };

export function DeploymentsView() {
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  const refresh = useCallback(() => {
    setState({ kind: "loading" });
    fetchDeployments()
      .then((items) => setState({ kind: "ready", items }))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to load deployments";
        setState({ kind: "error", message });
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className={s.root}>
      <header className={s.header}>
        <div>
          {/* scan-terminology: allow — canonical page name per FR-T02 glossary */}
          <h1 className={s.title}>Deployments</h1>
          <p className={s.subtitle}>
            Saved working states of workflows and recipes — name, restore, and
            re-run them without touching the source.
          </p>
        </div>
      </header>

      {state.kind === "loading" && (
        // scan-terminology: allow
        <p className={s.subtitle}>Loading deployments…</p>
      )}

      {state.kind === "error" && (
        <div className={s.error} role="alert">
          {state.message}
        </div>
      )}

      {state.kind === "ready" && state.items.length === 0 && (
        <div className={s.empty}>
          <span className={`material-symbols-outlined ${s.emptyIcon}`}>
            rocket_launch
          </span>
          {/* scan-terminology: allow */}
          <span className={s.emptyTitle}>No deployments yet</span>
          <p className={s.subtitle}>
            Save a workflow or recipe as a deployment to capture its current
            runtime, model, and parameter selections for later reuse.
          </p>
        </div>
      )}

      {state.kind === "ready" && state.items.length > 0 && (
        // scan-terminology: allow
        <ul className={s.list} aria-label="Deployments">
          {state.items.map((item) => (
            <li key={item.id} className={s.card}>
              <div>
                <div className={s.cardTitle}>{item.display_name}</div>
                <div className={s.cardSlug}>{item.slug}</div>
                <div className={s.cardMeta}>
                  <span>created from {item.created_from_surface}</span>
                  <span>{item.run_count} runs</span>
                  <span>updated {formatTimestamp(item.updated_at)}</span>
                </div>
              </div>
              <span className={s.badge}>{item.state}</span>
              <span className={s.badge}>{item.restore_state}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
