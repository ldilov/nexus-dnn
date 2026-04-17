import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type DeploymentSummary,
  type ModuleSummary,
} from "../api/client";
import { useDeploymentsList, useModules } from "../hooks/use_api";
import { ModuleBadge } from "../modules/module_badge";
import * as s from "./deployments_view.css";

type Filter = {
  userOnly: boolean;
  moduleId: string | null;
};

export function DeploymentsView() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>({
    userOnly: false,
    moduleId: null,
  });

  const {
    data: deployments,
    error: deploymentsError,
    isLoading: deploymentsLoading,
  } = useDeploymentsList();

  const { data: modulesEnvelope } = useModules({ limit: 200 });
  const modules = modulesEnvelope?.modules ?? [];

  // Spec 019 T407 — resolve each deployment row's module by consulting the
  // new `source_extension_id` / `source_workflow_id` fields projected on
  // the flat list. Both NULL on legacy rows → generic fallback badge.
  const moduleByKey = useMemo(() => {
    const map = new Map<string, ModuleSummary>();
    for (const m of modules) {
      map.set(m.module_id, m);
      if (m.extension_id) map.set(`ext:${m.extension_id}`, m);
    }
    return map;
  }, [modules]);

  const resolveModule = useCallback(
    (d: DeploymentSummary): ModuleSummary | null => {
      if (d.source_extension_id) {
        return moduleByKey.get(`ext:${d.source_extension_id}`) ?? null;
      }
      if (d.source_workflow_id) {
        return moduleByKey.get(`user:${d.source_workflow_id}`) ?? null;
      }
      return null;
    },
    [moduleByKey],
  );

  const items = useMemo(() => {
    if (!deployments) return [] as readonly DeploymentSummary[];
    return deployments.filter((d) => {
      const linked = resolveModule(d);
      if (filter.userOnly && (!linked || linked.source_kind !== "user")) {
        return false;
      }
      if (filter.moduleId && linked?.module_id !== filter.moduleId) {
        return false;
      }
      return true;
    });
  }, [deployments, filter, resolveModule]);

  const handleOpenModule = useCallback(
    (moduleId: string) => {
      navigate(`/modules/${encodeURIComponent(moduleId)}`);
    },
    [navigate],
  );

  const errorMessage =
    deploymentsError instanceof Error
      ? deploymentsError.message
      : deploymentsError
        ? "Failed to load deployments"
        : null;

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

      {deploymentsLoading && (
        // scan-terminology: allow
        <p className={s.subtitle}>Loading deployments…</p>
      )}

      {errorMessage && (
        <div className={s.error} role="alert">
          {errorMessage}
        </div>
      )}

      {!deploymentsLoading && !errorMessage && items.length === 0 && (
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

      {items.length > 0 && (
        // scan-terminology: allow
        <ul className={s.list} aria-label="Deployments">
          {items.map((item) => {
            const linked = resolveModule(item);
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
                        navigate(`/deployments/${encodeURIComponent(item.id)}`)
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
                        onOpen={() => navigate("/modules")}
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
