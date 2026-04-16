import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deployFromModule,
  dryRunModuleBlueprint,
  fetchBlueprint,
  fetchModule,
  type DeploymentRow,
  type ModuleDetail,
  type ModuleSummary,
  type RecipeRef,
} from "../../api/client";
import { mintDraftUuid } from "../draft/draft_uuid";
import { writeDraftEnvelope } from "../draft/draft_envelope";
import * as s from "./instance_view.css";

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
  const [forking, setForking] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [dryRunning, setDryRunning] = useState(false);
  const [instanceSearch, setInstanceSearch] = useState("");

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

  const handleDryRun = useCallback(async () => {
    if (state.kind !== "ready") return;
    setDryRunning(true);
    try {
      await dryRunModuleBlueprint(moduleId, {});
      // Dry-run result surfaces on the Blueprint view; this CTA just
      // primes it. For v1 we simply navigate there after the call.
      onNavigate(`#/modules/${encodeURIComponent(moduleId)}/blueprint`);
    } catch {
      // Non-fatal — the Blueprint view will re-run on arrival.
      onNavigate(`#/modules/${encodeURIComponent(moduleId)}/blueprint`);
    } finally {
      setDryRunning(false);
    }
  }, [moduleId, onNavigate, state.kind]);

  const handleEdit = useCallback(async () => {
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
      onNavigate(`#/modules/${encodeURIComponent(moduleId)}/draft/${uuid}`);
    } finally {
      setForking(false);
    }
  }, [moduleId, onNavigate, state]);

  const filteredInstances = useMemo(() => {
    if (state.kind !== "ready") return [] as readonly DeploymentRow[];
    if (!instanceSearch.trim()) return state.detail.deployments;
    const q = instanceSearch.trim().toLowerCase();
    return state.detail.deployments.filter(
      (d) =>
        d.display_name.toLowerCase().includes(q) ||
        d.deployment_id.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q),
    );
  }, [state, instanceSearch]);

  if (state.kind === "loading") {
    return (
      <div className={s.root}>
        <div className={s.canvas}>
          <div className={s.loadingBox}>Loading instance…</div>
        </div>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className={s.root}>
        <div className={s.canvas}>
          <button type="button" className={s.backLink} onClick={handleBack}>
            ← Modules
          </button>
          <div className={s.errorBox} role="alert">
            {state.message}
          </div>
        </div>
      </div>
    );
  }

  const { detail, primaryBlueprint } = state;
  const { summary } = detail;
  const deployBlocked = summary.blueprints.length === 0;
  const totalDeployments = summary.deployments.total;
  const activeDeployments = countByState(summary, ["saved", "active"]);
  const blueprintCount = summary.blueprints.length;
  const installedAgo = formatRelativeTime(summary.installed_at ?? null);

  return (
    <div className={s.root}>
      <div className={s.ambientGlowPrimary} aria-hidden="true" />
      <div className={s.ambientGlowSecondary} aria-hidden="true" />

      <div className={s.canvas}>
        <button type="button" className={s.backLink} onClick={handleBack}>
          ← Modules
        </button>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header className={s.hero}>
          <div className={s.heroLeft}>
            <h1 className={s.heroTitle}>{summary.display_name}</h1>
            <div className={s.heroMeta}>
              {summary.version && (
                <span className={s.buildChip}>build v{summary.version}</span>
              )}
              <span className={s.statusRow}>
                <span
                  className={
                    summary.compatibility_summary.overall === "ok"
                      ? s.statusDotHealthy
                      : summary.compatibility_summary.warning_count > 0
                        ? s.statusDotWarning
                        : s.statusDotIdle
                  }
                  aria-hidden="true"
                />
                {summary.source_kind === "extension"
                  ? "Operational extension module"
                  : summary.source_kind === "user"
                    ? "User module"
                    : "Blank module"}
              </span>
              {summary.runtime_family && (
                <span className={s.statusRow}>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "16px" }}
                    aria-hidden="true"
                  >
                    memory
                  </span>
                  {summary.runtime_family}
                </span>
              )}
            </div>
          </div>
          <div className={s.heroActions}>
            <button
              type="button"
              className={s.secondaryBtn}
              onClick={handleDryRun}
              disabled={dryRunning || deployBlocked}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
                aria-hidden="true"
              >
                play_arrow
              </span>
              {dryRunning ? "Planning…" : "Dry Run"}
            </button>
            <button
              type="button"
              className={s.secondaryBtn}
              onClick={handleViewBlueprint}
              disabled={deployBlocked}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
                aria-hidden="true"
              >
                menu_book
              </span>
              View Blueprint
            </button>
            <button
              type="button"
              className={s.secondaryBtn}
              onClick={handleEdit}
              disabled={forking || deployBlocked}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
                aria-hidden="true"
              >
                edit
              </span>
              {forking ? "Forking…" : "Edit"}
            </button>
            <button
              type="button"
              className={s.primaryBtn}
              onClick={handleDeploy}
              disabled={deploying || deployBlocked}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
                aria-hidden="true"
              >
                rocket_launch
              </span>
              {/* scan-terminology: allow — canonical CTA per FR-012 */}
              {deploying ? "Deploying…" : "Deploy Instance"}
            </button>
          </div>
        </header>

        {/* ── Content grid ─────────────────────────────────────────────── */}
        <div className={s.cardGrid}>
          {/* 01 / Module Purpose */}
          <div className={s.cardWide}>
            <section className={s.card}>
              <div className={s.cardCornerGlow} aria-hidden="true" />
              <h3 className={s.sectionNumber}>01 / Module Purpose</h3>
              <p className={s.aboutLead}>
                {summary.description ? (
                  summary.description
                ) : (
                  <>
                    Read-only preview of{" "}
                    <span className={s.aboutLeadAccent}>
                      {summary.display_name}
                    </span>
                    .
                  </>
                )}
              </p>
              <p className={s.aboutSub}>
                {primaryBlueprint?.description ??
                  "To make changes, click Edit — your edits become a new deployment when you save."}
              </p>

              <div className={s.metaGrid}>
                <div className={`${s.metaItem} ${s.metaItemSecondary}`}>
                  <span className={s.metaLabel}>Blueprints</span>
                  <span className={s.metaValue}>
                    {blueprintCount}
                    <span className={s.metaUnit}>
                      {blueprintCount === 1 ? "recipe" : "recipes"}
                    </span>
                  </span>
                </div>
                <div className={`${s.metaItem} ${s.metaItemTertiary}`}>
                  <span className={s.metaLabel}>Primary recipe</span>
                  <span
                    className={s.metaValue}
                    style={{ fontSize: "1rem", lineHeight: 1.3 }}
                  >
                    {primaryBlueprint?.display_name ?? "—"}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* 02 / Instance Impact */}
          <div className={s.cardNarrow}>
            <section className={s.card}>
              <h3 className={s.sectionNumber}>02 / Instance Impact</h3>
              <div className={s.impactCol}>
                <div className={s.impactRow}>
                  <div className={s.impactHeader}>
                    <span className={s.impactLabel}>
                      {/* scan-terminology: allow */}
                      Total deployments
                    </span>
                    <span className={s.impactValue}>
                      {totalDeployments}
                      <span className={s.impactValueUnit}>
                        {" "}
                        {totalDeployments === 1 ? "instance" : "instances"}
                      </span>
                    </span>
                  </div>
                  <div className={s.progressTrack}>
                    <div
                      className={s.progressFillSecondary}
                      style={{
                        width: `${totalDeployments === 0 ? 0 : Math.min(100, (activeDeployments / Math.max(totalDeployments, 1)) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className={s.impactCaption}>
                    {activeDeployments} active · {totalDeployments - activeDeployments} other
                  </p>
                </div>

                <div className={s.impactRow}>
                  <div className={s.impactHeader}>
                    <span className={s.impactLabel}>Compatibility</span>
                    <span className={s.impactValue}>
                      {summary.compatibility_summary.overall}
                      {summary.compatibility_summary.warning_count > 0 ? (
                        <span className={s.impactValueUnit}>
                          {" "}
                          · {summary.compatibility_summary.warning_count} warnings
                        </span>
                      ) : null}
                    </span>
                  </div>
                  <div className={s.progressTrack}>
                    <div
                      className={
                        summary.compatibility_summary.overall === "ok"
                          ? s.progressFillAcid
                          : summary.compatibility_summary.warning_count > 0
                            ? s.progressFillError
                            : s.progressFillPrimary
                      }
                      style={{
                        width:
                          summary.compatibility_summary.overall === "ok"
                            ? "100%"
                            : summary.compatibility_summary.warning_count > 0
                              ? "40%"
                              : "70%",
                      }}
                    />
                  </div>
                  <p className={s.impactCaption}>
                    {summary.compatibility_summary.overall === "ok"
                      ? "All checks passing"
                      : "See diagnostics on instance rows"}
                  </p>
                </div>

                <div className={s.impactRow}>
                  <div className={s.impactHeader}>
                    <span className={s.impactLabel}>Recent runs</span>
                    <span className={s.impactValue}>
                      {detail.recent_runs.length}
                      <span className={s.impactValueUnit}> in trace</span>
                    </span>
                  </div>
                  <div className={s.progressTrack}>
                    <div
                      className={s.progressFillPrimary}
                      style={{
                        width: `${Math.min(100, detail.recent_runs.length * 10)}%`,
                      }}
                    />
                  </div>
                  <p className={s.impactCaption}>
                    Latest across every derived deployment
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Instances table */}
          <div className={s.instancesSection}>
            <header className={s.instancesHeader}>
              <div>
                <h3 className={s.instancesTitle}>
                  {/* scan-terminology: allow */}
                  Instances of this module
                </h3>
                <p className={s.instancesSubtitle}>
                  {totalDeployments === 0
                    ? "No instances yet — click Deploy Instance to create one."
                    : `Monitoring ${totalDeployments} ${totalDeployments === 1 ? "instance" : "instances"} derived from this module.`}
                </p>
              </div>
              {detail.deployments.length > 0 && (
                <div className={s.searchWrap}>
                  <span
                    className={`material-symbols-outlined ${s.searchIcon}`}
                    aria-hidden="true"
                  >
                    search
                  </span>
                  <input
                    type="search"
                    placeholder="Filter instances…"
                    value={instanceSearch}
                    onChange={(e) => setInstanceSearch(e.target.value)}
                    className={s.searchInput}
                    aria-label="Filter instances"
                  />
                </div>
              )}
            </header>

            {detail.deployments.length === 0 ? (
              <div className={s.emptyInstances}>
                No deployments yet. Deploy the first instance to populate this
                table.
              </div>
            ) : (
              <div className={s.tableWrap}>
                <table className={s.table}>
                  <thead className={s.tableHead}>
                    <tr>
                      <th className={s.tableHeadCell}>Instance ID</th>
                      <th className={s.tableHeadCell}>Display name</th>
                      <th className={s.tableHeadCell}>State</th>
                      <th className={s.tableHeadCell}>Restore state</th>
                      <th className={s.tableHeadCell}>Updated</th>
                      <th className={s.tableHeadCell} style={{ textAlign: "right" }}>
                        Operations
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInstances.map((row) => (
                      <tr key={row.deployment_id} className={s.tableRow}>
                        <td className={`${s.tableCell} ${s.tableCellBold}`}>
                          {shortId(row.deployment_id)}
                        </td>
                        <td className={s.tableCell}>{row.display_name}</td>
                        <td className={s.tableCell}>
                          <StateChip state={row.state} />
                        </td>
                        <td className={s.tableCell}>{row.restore_state}</td>
                        <td className={s.tableCell}>
                          {formatRelativeTime(row.updated_at)}
                        </td>
                        <td
                          className={s.tableCell}
                          style={{ textAlign: "right" }}
                        >
                          <div className={s.rowActions}>
                            <button
                              type="button"
                              className={s.rowActionBtn}
                              aria-label="Open instance editor"
                              title="Open"
                              onClick={() =>
                                onNavigate(
                                  `#/deployments/${encodeURIComponent(row.deployment_id)}`,
                                )
                              }
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "18px" }}
                                aria-hidden="true"
                              >
                                open_in_new
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer info strip ────────────────────────────────────────── */}
        <div className={s.footerGrid}>
          <div className={`${s.footerCard} ${s.footerCardSecondary}`}>
            <span
              className={`material-symbols-outlined ${s.footerIconSecondary}`}
              aria-hidden="true"
            >
              verified_user
            </span>
            <div>
              <p className={s.footerLabel}>Source</p>
              <p className={s.footerValue}>
                {summary.publisher
                  ? `Published by ${summary.publisher}`
                  : summary.source_kind === "user"
                    ? "User-authored workflow"
                    : "Built-in"}
              </p>
            </div>
          </div>

          <div className={`${s.footerCard} ${s.footerCardPrimary}`}>
            <span
              className={`material-symbols-outlined ${s.footerIconPrimary}`}
              aria-hidden="true"
            >
              history
            </span>
            <div>
              <p className={s.footerLabel}>Registered</p>
              <p className={s.footerValue}>
                {installedAgo ? `Installed ${installedAgo}` : "Unknown"}
              </p>
            </div>
          </div>

          <div className={`${s.footerCard} ${s.footerCardTertiary}`}>
            <span
              className={`material-symbols-outlined ${s.footerIconTertiary}`}
              aria-hidden="true"
            >
              fingerprint
            </span>
            <div>
              <p className={s.footerLabel}>Module id</p>
              <p className={s.footerValue} style={{ fontFamily: "var(--font-mono, monospace)" }}>
                {summary.module_id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function countByState(summary: ModuleSummary, states: string[]): number {
  const by = summary.deployments.by_state;
  let total = 0;
  for (const s of states) {
    total += by[s] ?? 0;
  }
  return total;
}

function shortId(id: string): string {
  if (id.length <= 14) return id;
  return `${id.slice(0, 6)}…${id.slice(-6)}`;
}

function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return iso;
  const deltaSec = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (deltaSec < 60) return `${deltaSec}s ago`;
  if (deltaSec < 3600) return `${Math.floor(deltaSec / 60)}m ago`;
  if (deltaSec < 86400) return `${Math.floor(deltaSec / 3600)}h ago`;
  if (deltaSec < 2592000) return `${Math.floor(deltaSec / 86400)}d ago`;
  return `${Math.floor(deltaSec / 2592000)}mo ago`;
}

interface StateChipProps {
  state: string;
}

function StateChip({ state }: StateChipProps) {
  const lower = state.toLowerCase();
  if (lower.includes("active") || lower === "saved") {
    return (
      <span className={s.stateChipActive}>
        <span className={s.stateDotActive} aria-hidden="true" />
        {state}
      </span>
    );
  }
  if (lower.includes("fail") || lower.includes("error")) {
    return (
      <span className={s.stateChipError}>
        <span className={s.stateDotError} aria-hidden="true" />
        {state}
      </span>
    );
  }
  return (
    <span className={s.stateChipIdle}>
      <span className={s.stateDotIdle} aria-hidden="true" />
      {state}
    </span>
  );
}
