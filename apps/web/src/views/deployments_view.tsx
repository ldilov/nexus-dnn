import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchDeployments,
  fetchModules,
  type DeploymentSummary,
  type ModuleSummary,
} from "../api/client";
import { ModuleBadge } from "../modules/module_badge";
import * as s from "./deployments_view.css";

type LoadState =
  | { kind: "loading" }
  | { kind: "ready"; items: readonly DeploymentSummary[] }
  | { kind: "error"; message: string };

type Filter = {
  userOnly: boolean;
  moduleId: string | null;
};

interface DeploymentsViewProps {
  onNavigate?: (hash: string) => void;
}

export function DeploymentsView({ onNavigate }: DeploymentsViewProps = {}) {
  const [state, setState] = useState<LoadState>({ kind: "loading" });
  const [modules, setModules] = useState<readonly ModuleSummary[]>([]);
  const [filter, setFilter] = useState<Filter>({
    userOnly: false,
    moduleId: null,
  });

  const refresh = useCallback(() => {
    setState({ kind: "loading" });
    Promise.all([fetchDeployments(), fetchModules({ limit: 200 })])
      .then(([items, modEnvelope]) => {
        setState({ kind: "ready", items });
        setModules(modEnvelope.modules);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to load deployments";
        setState({ kind: "error", message });
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Reverse index: map each deployment id to the module whose blueprint
  // produced it. The server doesn't expose this mapping on the flat
  // DeploymentSummary row yet, so we fall back to a generic badge for rows
  // whose provenance we can't resolve.
  const deploymentModuleLookup = useMemo(() => {
    const map = new Map<string, ModuleSummary>();
    // Without deployment_id → module_id indexing on ModuleSummary, we leave
    // the map empty; individual rows will render a generic "Module" badge
    // as a visual placeholder until the API surfaces source metadata on
    // the flat deployments list.
    return map;
  }, []);

  const items = useMemo(() => {
    if (state.kind !== "ready") return [];
    return state.items.filter((d) => {
      const linked = deploymentModuleLookup.get(d.id);
      if (filter.userOnly && (!linked || linked.source_kind !== "user")) {
        return false;
      }
      if (filter.moduleId && linked?.module_id !== filter.moduleId) {
        return false;
      }
      return true;
    });
  }, [state, filter, deploymentModuleLookup]);

  const handleOpenModule = useCallback(
    (moduleId: string) => {
      onNavigate?.(`#/modules/${encodeURIComponent(moduleId)}`);
    },
    [onNavigate],
  );

  return (
    <div className={s.root}>
      <header className={s.header}>
        <div>
          {/* scan-terminology: allow — canonical page name per FR-T02 glossary */}
          <h1 className={s.title}>Deployments</h1>
          <p className={s.subtitle}>
            Saved working states of modules — name, restore, and re-run them
            without touching the source.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={filter.userOnly}
              onChange={(e) =>
                setFilter((f) => ({ ...f, userOnly: e.target.checked }))
              }
            />
            User modules only
          </label>
          <select
            value={filter.moduleId ?? ""}
            onChange={(e) =>
              setFilter((f) => ({
                ...f,
                moduleId: e.target.value || null,
              }))
            }
            aria-label="Filter by module"
          >
            <option value="">All modules</option>
            {modules.map((m) => (
              <option key={m.module_id} value={m.module_id}>
                {m.display_name}
              </option>
            ))}
          </select>
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

      {state.kind === "ready" && items.length === 0 && (
        <div className={s.empty}>
          <span className={`material-symbols-outlined ${s.emptyIcon}`}>
            rocket_launch
          </span>
          {/* scan-terminology: allow */}
          <span className={s.emptyTitle}>No deployments match your filters</span>
          <p className={s.subtitle}>
            Save a module as a deployment to capture its current runtime,
            model, and parameter selections for later reuse.
          </p>
        </div>
      )}

      {state.kind === "ready" && items.length > 0 && (
        // scan-terminology: allow
        <ul className={s.list} aria-label="Deployments">
          {items.map((item) => {
            const linked = deploymentModuleLookup.get(item.id);
            return (
              <li key={item.id} className={s.card}>
                <div>
                  <div className={s.cardTitle}>
                    <button
                      type="button"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "inherit",
                        font: "inherit",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      onClick={() =>
                        onNavigate?.(`#/deployments/${encodeURIComponent(item.id)}`)
                      }
                    >
                      {item.display_name}
                    </button>
                  </div>
                  <div className={s.cardSlug}>{item.slug}</div>
                  <div className={s.cardMeta}>
                    <span>created from {item.created_from_surface}</span>
                    <span>{item.run_count} runs</span>
                    <span>updated {formatTimestamp(item.updated_at)}</span>
                    {linked ? (
                      <ModuleBadge
                        moduleId={linked.module_id}
                        displayName={linked.display_name}
                        icon={linked.icon}
                        onOpen={handleOpenModule}
                      />
                    ) : (
                      <ModuleBadge
                        moduleId="user:blank"
                        displayName="Module"
                        icon={{ kind: "symbol", value: "apps" }}
                        onOpen={() => onNavigate?.("#/modules")}
                      />
                    )}
                  </div>
                </div>
                <span className={s.badge}>{item.state}</span>
                <span className={s.badge}>{item.restore_state}</span>
              </li>
            );
          })}
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
