import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deployFromModule,
  fetchBlueprint,
  fetchModule,
  type ModuleDetail,
  type RecipeRef,
} from "../../api/client";
import { ModuleIcon } from "../../components/module_icon";
import { mintDraftUuid } from "../draft/draft_uuid";
import { writeDraftEnvelope } from "../draft/draft_envelope";
import * as s from "./instance_view.css";

type TabId = "recipe" | "stage" | "graph" | "trace";

const TABS: readonly { id: TabId; label: string }[] = [
  { id: "recipe", label: "Recipe" },
  { id: "stage", label: "Stage" },
  { id: "graph", label: "Graph" },
  { id: "trace", label: "Trace" },
];

interface InstanceViewProps {
  moduleId: string;
  onNavigate: (hash: string) => void;
}

type State =
  | { kind: "loading" }
  | {
      kind: "ready";
      detail: ModuleDetail;
      primaryBlueprint: RecipeRef | null;
    }
  | { kind: "error"; message: string };

export function InstanceView({ moduleId, onNavigate }: InstanceViewProps) {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [activeTab, setActiveTab] = useState<TabId>("recipe");
  const [forking, setForking] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const load = useCallback(() => {
    setState({ kind: "loading" });
    fetchModule(moduleId)
      .then((detail) => {
        const primary =
          detail.summary.blueprints.find((b) => b.is_primary) ??
          detail.summary.blueprints[0] ??
          null;
        setState({ kind: "ready", detail, primaryBlueprint: primary });
      })
      .catch((err: unknown) =>
        setState({
          kind: "error",
          message:
            err instanceof Error ? err.message : "Failed to load instance",
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

  const handleEdit = useCallback(async () => {
    // Spec 019 FR-050: mint a UUID, fetch the resolved payload, write
    // to sessionStorage, navigate. Zero network POSTs until the user
    // explicitly saves the draft.
    if (state.kind !== "ready") return;
    setForking(true);
    try {
      let resolvedPayload: unknown = { nodes: [], edges: [] };
      const primary = state.primaryBlueprint;
      if (primary) {
        const blueprint = await fetchBlueprint(moduleId, primary.recipe_id);
        resolvedPayload = {
          recipe_id: blueprint.recipe_id,
          display_name: blueprint.display_name,
          description: blueprint.description,
          step_count: blueprint.step_count,
          // The blueprint surface does not yet return workflow nodes/edges;
          // we carry the recipe reference. The real payload assembly happens
          // when the recipe projector lands; until then the draft inherits
          // the recipe id and the deployment editor's overlays do the rest.
        };
      }
      const uuid = mintDraftUuid();
      writeDraftEnvelope(uuid, {
        source_module_id: moduleId,
        source_display_name: state.detail.summary.display_name,
        workflow_payload: resolvedPayload,
        display_name: state.detail.summary.display_name,
        forked_at: new Date().toISOString(),
      });
      onNavigate(
        `#/modules/${encodeURIComponent(moduleId)}/draft/${uuid}`,
      );
    } finally {
      setForking(false);
    }
  }, [moduleId, onNavigate, state]);

  const sourceBadgeLabel = useMemo(() => {
    if (state.kind !== "ready") return "Module";
    const src = state.detail.summary.source_kind;
    if (src === "extension") return state.detail.summary.extension_id ?? "Extension";
    if (src === "user") return "User Module";
    return "Blank Module";
  }, [state]);

  if (state.kind === "loading") {
    return (
      <div className={s.root}>
        <header className={s.identityBanner}>
          <button type="button" className={s.backLink} onClick={handleBack}>
            ← Modules
          </button>
          <span className={s.idText}>Loading instance…</span>
        </header>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className={s.root}>
        <header className={s.identityBanner}>
          <button type="button" className={s.backLink} onClick={handleBack}>
            ← Modules
          </button>
        </header>
        <div className={s.errorBox} role="alert">
          {state.message}
        </div>
      </div>
    );
  }

  const { detail, primaryBlueprint } = state;
  const { summary } = detail;
  const compatBlocked =
    summary.compatibility_summary.overall !== "ok" ||
    summary.compatibility_summary.warning_count > 0;
  const deployBlocked = summary.blueprints.length === 0;

  return (
    <div className={s.root}>
      <header className={s.identityBanner}>
        <button type="button" className={s.backLink} onClick={handleBack}>
          ← Modules
        </button>
        <span className={s.statusDot} aria-hidden="true" />
        <span className={s.idText}>{summary.module_id}</span>
        <span className={s.displayName}>{summary.display_name}</span>
        <span className={s.sourceBadge}>
          <ModuleIcon icon={summary.icon} size={14} />
          {sourceBadgeLabel}
        </span>
        <div className={s.bannerActions}>
          <button
            type="button"
            className={s.secondaryBtn}
            onClick={handleEdit}
            disabled={forking || deployBlocked}
            title={
              deployBlocked
                ? "This module has no blueprints"
                : "Fork a client-side draft; saves as a new deployment"
            }
          >
            {forking ? "Forking…" : "Edit"}
          </button>
          <button
            type="button"
            className={s.secondaryBtn}
            onClick={handleViewBlueprint}
            disabled={deployBlocked}
          >
            View Blueprint
          </button>
          <button
            type="button"
            className={s.primaryBtn}
            onClick={handleDeploy}
            disabled={deploying || deployBlocked}
          >
            {deploying ? "Deploying…" : "Deploy Instance"}
            {/* scan-terminology: allow — CTA */}
          </button>
        </div>
      </header>

      {compatBlocked && (
        <div className={s.warningBanner} role="status">
          Compatibility: {summary.compatibility_summary.overall}
          {summary.compatibility_summary.warning_count > 0
            ? ` (${summary.compatibility_summary.warning_count} warnings)`
            : ""}
        </div>
      )}

      <nav
        className={s.tabBar}
        role="tablist"
        aria-label="Instance view tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={s.tabBtn}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div
        className={s.panel}
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        aria-readonly="true"
      >
        <div className={s.readOnlyNote}>
          This is a read-only preview of the module's default configuration.
          To make changes, click{" "}
          <strong>Edit</strong> — your edits become a new{" "}
          {/* scan-terminology: allow */} Deployment when you save.
        </div>

        {activeTab === "recipe" && primaryBlueprint && (
          <section>
            <h3 style={{ fontWeight: 600, marginTop: 0 }}>
              {primaryBlueprint.display_name}
            </h3>
            {primaryBlueprint.description && (
              <p style={{ opacity: 0.8 }}>{primaryBlueprint.description}</p>
            )}
            {primaryBlueprint.step_count > 0 ? (
              <ol style={{ paddingLeft: 0, listStyle: "none" }}>
                {Array.from({ length: primaryBlueprint.step_count }, (_, i) => (
                  <li key={i} className={s.stepRow}>
                    <span className={s.stepNumber}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>Step {i + 1}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p style={{ opacity: 0.6, fontStyle: "italic" }}>
                Full recipe projection lands in a follow-up slice — click "View
                Blueprint" for the detailed recipe view.
              </p>
            )}
          </section>
        )}

        {activeTab === "stage" && (
          <section>
            <p style={{ opacity: 0.7 }}>
              Stage-level preview of the module's default workflow steps
              (read-only). This is a visualization of what the default{" "}
              {/* scan-terminology: allow */} Deployment would look like.
              Integration with the existing StageView component is deferred
              to a follow-up slice.
            </p>
          </section>
        )}

        {activeTab === "graph" && (
          <section>
            <p style={{ opacity: 0.7 }}>
              Graph-level preview (read-only). Pan + zoom + inspect nodes.
              No drag, no port reconnect — instances are immutable. Integration
              with the existing GraphView (readonly mode) lands in a follow-up
              slice.
            </p>
          </section>
        )}

        {activeTab === "trace" && (
          <section>
            <p style={{ opacity: 0.7 }}>
              Run telemetry across every {/* scan-terminology: allow */} Deployment
              derived from this module. Backed by the existing RunTraceView
              filtered by `deployment_run_links`. Integration pending.
            </p>
            {detail.recent_runs.length > 0 && (
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {detail.recent_runs.map((r) => (
                  <li key={r.run_id} className={s.stepRow}>
                    <span className={s.idText}>{r.run_id}</span>
                    <span>
                      {r.status} · {r.created_at}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
