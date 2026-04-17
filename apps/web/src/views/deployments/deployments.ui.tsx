import type { DeploymentSummary, ModuleSummary } from "../../api/client";
import { ModuleBadge } from "../modules/module_badge";
import * as s from "./deployments.css";

export interface DeploymentsFilter {
  userOnly: boolean;
  moduleId: string | null;
}

export interface DeploymentsUIProps {
  items: readonly DeploymentSummary[];
  modules: readonly ModuleSummary[];
  filter: DeploymentsFilter;
  onFilterChange: (next: DeploymentsFilter) => void;
  resolveModule: (d: DeploymentSummary) => ModuleSummary | null;
  isLoading: boolean;
  errorMessage: string | null;
  onOpenDeployment: (id: string) => void;
  onOpenModule: (moduleId: string) => void;
  onGoToModules: () => void;
}

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function DeploymentsUI({
  items,
  modules,
  filter,
  onFilterChange,
  resolveModule,
  isLoading,
  errorMessage,
  onOpenDeployment,
  onOpenModule,
  onGoToModules,
}: DeploymentsUIProps) {
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
        <div className={s.filterBar}>
          <label className={s.filterCheckbox}>
            <input
              type="checkbox"
              checked={filter.userOnly}
              onChange={(e) =>
                onFilterChange({ ...filter, userOnly: e.target.checked })
              }
            />
            User modules only
          </label>
          <select
            value={filter.moduleId ?? ""}
            onChange={(e) =>
              onFilterChange({ ...filter, moduleId: e.target.value || null })
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

      {isLoading && (
        // scan-terminology: allow
        <p className={s.subtitle}>Loading deployments…</p>
      )}

      {errorMessage && (
        <div className={s.error} role="alert">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && items.length === 0 && (
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
                      className={s.cardTitleButton}
                      onClick={() => onOpenDeployment(item.id)}
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
                        onOpen={onOpenModule}
                      />
                    ) : (
                      <ModuleBadge
                        moduleId="user:blank"
                        displayName="Module"
                        icon={{ kind: "symbol", value: "apps" }}
                        onOpen={onGoToModules}
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
