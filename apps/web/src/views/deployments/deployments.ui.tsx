import type { DeploymentSummary, ModuleSummary } from "../../api/client";
import { PageHero } from "../../components/base/page_hero";
import { Section } from "../../components/base/section";
import { Pill } from "../../components/base/pill";
import { StatusChip, type StatusKind } from "../../components/base/status_chip";
import { EmptyState } from "../../components/layout/empty_state";
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
  onRequestDelete: (deployment: DeploymentSummary) => void;
}

function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function deploymentChipKind(state: string): StatusKind {
  const normalized = state.toLowerCase();
  if (normalized === "failed" || normalized === "error") return "failed";
  if (normalized === "active" || normalized === "running" || normalized === "live") return "live";
  if (normalized === "draft") return "draft";
  return "idle";
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
  onRequestDelete,
}: DeploymentsUIProps) {
  const userCount = items.filter((d) => {
    const m = resolveModule(d);
    return m?.source_kind === "user";
  }).length;
  const totalRuns = items.reduce((acc, d) => acc + (d.run_count ?? 0), 0);

  return (
    <div className={s.root}>
      <PageHero
        eyebrow="Operator surface · Saved working states"
        title="Deployments"
        meta={
          <span className={s.subtitle}>
            Saved working states of modules — name, restore, and re-run them without
            touching the source.
          </span>
        }
      />

      <div className={s.summaryGrid}>
        <div className={s.summaryStat}>
          <span className={s.summaryStatLabel}>Total</span>
          <span className={s.summaryStatValue}>{items.length}</span>
        </div>
        <div className={s.summaryStat}>
          <span className={s.summaryStatLabel}>User modules</span>
          <span className={s.summaryStatValue}>{userCount}</span>
        </div>
        <div className={s.summaryStat}>
          <span className={s.summaryStatLabel}>Runs total</span>
          <span className={s.summaryStatValue}>{totalRuns || "—"}</span>
        </div>
      </div>

      <div className={s.filterBar} role="toolbar" aria-label="Filter deployments">
        <Pill
          active={filter.userOnly}
          onClick={() => onFilterChange({ ...filter, userOnly: !filter.userOnly })}
        >
          User modules only
        </Pill>
        <select
          className={s.moduleSelect}
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

      {isLoading && <p className={s.subtitle}>Loading deployments…</p>}

      {errorMessage && (
        <div className={s.error} role="alert">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && items.length === 0 && (
        <EmptyState
          count="0"
          line="Save a module as a deployment to capture its current runtime, model, and parameter selections for later reuse."
          primaryAction={{ label: "Browse modules", onClick: onGoToModules }}
        />
      )}

      {items.length > 0 && (
        <Section number="01" title="All deployments">
          <ul className={s.cardGrid} aria-label="Deployments">
            {items.map((item) => {
              const linked = resolveModule(item);
              const stateKind = deploymentChipKind(item.state);
              return (
                <li key={item.id} className={s.cardWrapper}>
                  <button
                    type="button"
                    className={s.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRequestDelete(item);
                    }}
                    aria-label={`Delete deployment ${item.display_name}`}
                    title="Delete deployment"
                  >
                    <span
                      className={`material-symbols-outlined ${s.deleteIcon}`}
                      aria-hidden="true"
                    >
                      delete
                    </span>
                  </button>
                  <button
                    type="button"
                    className={s.card}
                    onClick={() => onOpenDeployment(item.id)}
                  >
                    <div className={s.cardHeader}>
                      <h3 className={s.cardTitle}>{item.display_name}</h3>
                      <StatusChip
                        kind={stateKind}
                        label={item.state}
                        pulse={stateKind === "live"}
                      />
                    </div>
                    <span className={s.cardSlug}>{item.slug}</span>
                    <div className={s.cardMeta}>
                      <span className={s.cardMetaItem}>
                        <span className={s.cardMetaLabel}>From</span>
                        {item.created_from_surface}
                      </span>
                      <span className={s.cardMetaItem}>
                        <span className={s.cardMetaLabel}>Runs</span>
                        {item.run_count}
                      </span>
                      <span className={s.cardMetaItem}>
                        <span className={s.cardMetaLabel}>Updated</span>
                        {formatTimestamp(item.updated_at)}
                      </span>
                    </div>
                    <div className={s.cardModuleRow}>
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
                  </button>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </div>
  );
}
