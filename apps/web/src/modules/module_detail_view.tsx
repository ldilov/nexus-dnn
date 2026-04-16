import { useCallback, useEffect, useState } from "react";
import {
  deployFromModule,
  fetchModule,
  type ModuleDetail,
} from "../api/client";
import { ModuleIcon } from "../components/module_icon";
import * as s from "./module_detail_view.css";

interface ModuleDetailViewProps {
  moduleId: string;
  onNavigate: (hash: string) => void;
}

type State =
  | { kind: "loading" }
  | { kind: "ready"; detail: ModuleDetail }
  | { kind: "error"; message: string };

export function ModuleDetailView({
  moduleId,
  onNavigate,
}: ModuleDetailViewProps) {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [deploying, setDeploying] = useState(false);

  const load = useCallback(() => {
    setState({ kind: "loading" });
    fetchModule(moduleId)
      .then((detail) => setState({ kind: "ready", detail }))
      .catch((err: unknown) =>
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "Failed to load module",
        }),
      );
  }, [moduleId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleBack = useCallback(() => {
    onNavigate("#/modules");
  }, [onNavigate]);

  const handleViewBlueprint = useCallback(() => {
    onNavigate(`#/modules/${encodeURIComponent(moduleId)}/blueprint`);
  }, [onNavigate, moduleId]);

  const handleDeploy = useCallback(async () => {
    if (state.kind !== "ready") return;
    setDeploying(true);
    try {
      const result = await deployFromModule(moduleId, {});
      onNavigate(`#/deployments/${encodeURIComponent(result.deployment_id)}`);
    } catch (err: unknown) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Deploy failed",
      });
    } finally {
      setDeploying(false);
    }
  }, [moduleId, onNavigate, state.kind]);

  if (state.kind === "loading") {
    return (
      <div className={s.root}>
        <button type="button" className={s.backLink} onClick={handleBack}>
          ← Back to Modules
        </button>
        <p>Loading…</p>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className={s.root}>
        <button type="button" className={s.backLink} onClick={handleBack}>
          ← Back to Modules
        </button>
        <div className={s.errorBox} role="alert">
          {state.message}
        </div>
      </div>
    );
  }

  const { detail } = state;
  const { summary } = detail;
  const compatChipClass =
    summary.compatibility_summary.overall === "ok"
      ? `${s.chip} ${s.chipOk}`
      : summary.compatibility_summary.warning_count > 0
        ? `${s.chip} ${s.chipWarn}`
        : s.chip;

  return (
    <div className={s.root}>
      <button type="button" className={s.backLink} onClick={handleBack}>
        ← Back to Modules
      </button>

      <header className={s.header}>
        <ModuleIcon icon={summary.icon} size={64} />
        <div className={s.headerText}>
          <h1 className={s.title}>{summary.display_name}</h1>
          <p className={s.meta}>
            {summary.module_id}
            {summary.version ? ` · v${summary.version}` : ""}
            {summary.extension_id ? ` · ${summary.extension_id}` : ""}
          </p>
          <div>
            <span className={compatChipClass}>
              {summary.compatibility_summary.overall}
              {summary.compatibility_summary.warning_count > 0
                ? ` (${summary.compatibility_summary.warning_count} warnings)`
                : ""}
            </span>
          </div>
        </div>
        <div className={s.actions}>
          <button
            type="button"
            className={s.secondaryBtn}
            onClick={handleViewBlueprint}
            disabled={summary.blueprints.length === 0}
          >
            View Blueprint
          </button>
          <button
            type="button"
            className={s.primaryBtn}
            onClick={handleDeploy}
            disabled={deploying || summary.blueprints.length === 0}
          >
            {deploying ? "Deploying…" : "Deploy Instance"}{" "}
            {/* scan-terminology: allow — CTA */}
          </button>
        </div>
      </header>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          Blueprints ({summary.blueprints.length})
        </h2>
        {summary.blueprints.length === 0 && (
          <p className={s.empty}>This module has no blueprints.</p>
        )}
        {summary.blueprints.map((bp) => (
          <div key={bp.recipe_id} className={`${s.card} ${s.blueprintCard}`}>
            <div>
              <div style={{ fontWeight: 600 }}>
                {bp.display_name}
                {bp.is_primary && (
                  <span className={`${s.chip} ${s.chipOk}`} style={{ marginLeft: "0.5rem" }}>
                    primary
                  </span>
                )}
              </div>
              {bp.description && (
                <div style={{ opacity: 0.7, fontSize: "0.875rem" }}>
                  {bp.description}
                </div>
              )}
            </div>
            <button
              type="button"
              className={s.secondaryBtn}
              onClick={() =>
                onNavigate(
                  `#/modules/${encodeURIComponent(moduleId)}/blueprint?recipe_id=${encodeURIComponent(bp.recipe_id)}`,
                )
              }
            >
              View
            </button>
          </div>
        ))}
      </section>

      <section className={s.section}>
        <h2 className={s.sectionTitle}>
          {/* scan-terminology: allow — module detail lists its deployments */}
          Deployments of this module ({detail.deployments.length})
        </h2>
        {detail.deployments.length === 0 && (
          <p className={s.empty}>
            No instances yet — click "Deploy Instance" to create one.
          </p>
        )}
        {detail.deployments.map((d) => (
          <div key={d.deployment_id} className={s.deploymentRow}>
            <div>
              <div style={{ fontWeight: 500 }}>{d.display_name}</div>
              <div className={s.meta}>{d.deployment_id}</div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <span className={s.chip}>{d.state}</span>
              <span className={s.chip}>{d.restore_state}</span>
              <button
                type="button"
                className={s.secondaryBtn}
                onClick={() =>
                  onNavigate(`#/deployments/${encodeURIComponent(d.deployment_id)}`)
                }
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </section>

      {detail.recent_runs.length > 0 && (
        <section className={s.section}>
          <h2 className={s.sectionTitle}>Recent runs</h2>
          {detail.recent_runs.map((r) => (
            <div key={r.run_id} className={s.deploymentRow}>
              <div>
                <div style={{ fontWeight: 500 }}>{r.run_id}</div>
                <div className={s.meta}>{r.created_at}</div>
              </div>
              <span className={s.chip}>{r.status}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
