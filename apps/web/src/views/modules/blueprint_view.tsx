import {
  useActionState,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  deployFromModule,
  dryRunModuleBlueprint,
  type DryRunPlan,
  type RecipeRef,
  type Workflow,
} from "../../api/client";
import { useModule, useWorkflow } from "../../hooks/use_api";
import { GraphView } from "../workflows/components/canvas/graph_view";
import * as s from "./blueprint_view.css";

type Mode = "recipe" | "workflow";

interface BlueprintViewProps {
  moduleId: string;
  recipeId?: string;
}

export function BlueprintView({
  moduleId,
  recipeId: initialRecipeId,
}: BlueprintViewProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("recipe");
  const [plan, setPlan] = useState<DryRunPlan | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(
    initialRecipeId ?? null,
  );

  const { data: detail, error: moduleError, isLoading } = useModule(moduleId);

  const workflowId = detail?.summary.workflow_id ?? null;
  const { data: workflow, error: workflowFetchError, isLoading: workflowLoading } =
    useWorkflow(workflowId);
  const workflowError =
    !workflowId && detail
      ? "This module has no workflow bound yet — recipes describe the intent but the graph projection is pending."
      : workflowFetchError instanceof Error
        ? workflowFetchError.message
        : workflowFetchError
          ? "Failed to load workflow"
          : null;

  // Derive the active recipe id once detail arrives without racing through
  // `useEffect` — `use_memo` keeps the computation cheap and deterministic.
  const effectiveRecipeId = useMemo(() => {
    if (selectedRecipeId) return selectedRecipeId;
    if (!detail) return null;
    const primary =
      detail.summary.blueprints.find((b) => b.is_primary) ??
      detail.summary.blueprints[0] ??
      null;
    return primary?.recipe_id ?? null;
  }, [detail, selectedRecipeId]);

  const selectedBlueprint = useMemo<RecipeRef | null>(() => {
    if (!detail || !effectiveRecipeId) return null;
    return (
      detail.summary.blueprints.find(
        (b) => b.recipe_id === effectiveRecipeId,
      ) ?? null
    );
  }, [detail, effectiveRecipeId]);

  // React 19 Actions — Dry-run and Clone each own their pending flag and
  // surface failures via toast instead of a single shared error banner.
  const [, dryRunAction, dryRunning] = useActionState(async () => {
    try {
      const result = await dryRunModuleBlueprint(moduleId, {
        recipe_id: effectiveRecipeId ?? undefined,
      });
      setPlan(result);
      return null;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Dry-run failed";
      setPlan({
        plan_id: "error",
        steps: [],
        warnings: [],
        diagnostics: [message],
      });
      toast.error("Dry-run failed", { description: message });
      return message;
    }
  }, null);

  const [, cloneAction, cloning] = useActionState(async () => {
    try {
      const result = await deployFromModule(moduleId, {
        recipe_id: effectiveRecipeId ?? undefined,
      });
      toast.success("Deployment created");
      navigate(`/deployments/${encodeURIComponent(result.deployment_id)}`);
      return null;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Clone failed";
      toast.error("Clone failed", { description: message });
      return message;
    }
  }, null);

  const handleBack = () =>
    navigate(`/modules/${encodeURIComponent(moduleId)}`);

  const handlePick = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
    setPlan(null);
  };

  if (isLoading) {
    return (
      <div className={s.root}>
        <div className={s.canvas}>
          <div className={s.loadingBox}>Loading blueprint…</div>
        </div>
      </div>
    );
  }

  if (moduleError || !detail) {
    const message =
      moduleError instanceof Error
        ? moduleError.message
        : moduleError
          ? "Failed to load blueprint"
          : "Blueprint not found";
    return (
      <div className={s.root}>
        <div className={s.canvas}>
          <button type="button" className={s.backLink} onClick={handleBack}>
            ← Back to module
          </button>
          <div className={s.errorBox} role="alert">
            {message}
          </div>
        </div>
      </div>
    );
  }
  const multi = detail.summary.blueprints.length > 1;
  const hasDeployments = detail.deployments.length > 0;

  return (
    <div className={s.root}>
      <div className={s.ambientGlow} aria-hidden="true" />

      <div className={s.canvas}>
        <button type="button" className={s.backLink} onClick={handleBack}>
          ← Back to module
        </button>

        <header className={s.hero}>
          <div className={s.heroLeft}>
            <h1 className={s.title}>
              {detail.summary.display_name}
              {selectedBlueprint ? (
                <>
                  {" — "}
                  <span className={s.titleAccent}>
                    {selectedBlueprint.display_name}
                  </span>
                </>
              ) : null}
            </h1>
            <div className={s.heroMeta}>
              <span>
                {mode === "recipe" ? "Recipe projection" : "Workflow graph"}
              </span>
              <span>·</span>
              <span>
                {selectedBlueprint?.step_count ?? 0} step
                {selectedBlueprint?.step_count === 1 ? "" : "s"}
              </span>
              {workflow && (
                <>
                  <span>·</span>
                  <span>{workflow.nodes.length} nodes</span>
                  <span>·</span>
                  <span>{workflow.edges.length} edges</span>
                </>
              )}
            </div>
          </div>
          <div className={s.heroActions}>
            <button
              type="button"
              className={s.secondaryBtn}
              onClick={dryRunAction}
              disabled={dryRunning || !effectiveRecipeId}
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
              className={s.primaryBtn}
              onClick={cloneAction}
              disabled={cloning || !effectiveRecipeId}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "18px" }}
                aria-hidden="true"
              >
                rocket_launch
              </span>
              {/* scan-terminology: allow — CTA per FR-018 */}
              {cloning ? "Cloning…" : "Clone to Deployment"}
            </button>
            {hasDeployments && detail.deployments[0] && (
              <a
                href={`/api/v1/deployments/${encodeURIComponent(detail.deployments[0].deployment_id)}/export`}
                className={s.secondaryBtn}
                rel="nofollow"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                  aria-hidden="true"
                >
                  file_download
                </span>
                Export .nx
              </a>
            )}
          </div>
        </header>

        {/* Recipe picker pills (only when > 1 recipe) */}
        {multi && (
          <div
            className={s.pillRow}
            role="group"
            aria-label="Pick a recipe"
          >
            {detail.summary.blueprints.map((bp) => (
              <button
                key={bp.recipe_id}
                type="button"
                className={s.pill}
                aria-pressed={effectiveRecipeId === bp.recipe_id}
                onClick={() => handlePick(bp.recipe_id)}
              >
                {bp.is_primary && (
                  <span className={s.primaryStar} aria-hidden="true">
                    ★
                  </span>
                )}
                {bp.display_name}
              </button>
            ))}
          </div>
        )}

        {/* Recipe | Workflow Graph segmented control */}
        <div
          className={s.modeToggle}
          role="tablist"
          aria-label="Projection mode"
        >
          <button
            type="button"
            role="tab"
            className={s.modeBtn}
            aria-selected={mode === "recipe"}
            aria-controls="panel-recipe"
            onClick={() => setMode("recipe")}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
              aria-hidden="true"
            >
              list_alt
            </span>
            Recipe
          </button>
          <button
            type="button"
            role="tab"
            className={s.modeBtn}
            aria-selected={mode === "workflow"}
            aria-controls="panel-workflow"
            onClick={() => setMode("workflow")}
            disabled={!detail.summary.workflow_id}
            title={
              detail.summary.workflow_id
                ? undefined
                : "This module has no workflow bound yet."
            }
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
              aria-hidden="true"
            >
              account_tree
            </span>
            Workflow graph
          </button>
        </div>

        {mode === "recipe" && (
          <div
            role="tabpanel"
            id="panel-recipe"
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {selectedBlueprint && (
              <section className={s.section}>
                <h2 className={s.sectionNumber}>01 / Overview</h2>
                <p className={s.overview}>
                  {selectedBlueprint.description ??
                    "No description provided by the recipe author."}
                </p>
              </section>
            )}

            <section className={s.section}>
              <h2 className={s.sectionNumber}>
                02 / Steps ({workflow ? workflow.nodes.length : (selectedBlueprint?.step_count ?? 0)})
              </h2>
              {workflowLoading && (
                <p className={s.overview} style={{ fontStyle: "italic" }}>
                  Loading step projection…
                </p>
              )}
              {!workflowLoading && !workflow && workflowError && (
                <p className={s.overview} style={{ fontStyle: "italic" }}>
                  {workflowError}
                </p>
              )}
              {workflow && workflow.nodes.length === 0 && (
                <p className={s.overview} style={{ fontStyle: "italic" }}>
                  This workflow has no operator nodes yet.
                </p>
              )}
              {workflow && workflow.nodes.length > 0 && (
                <RecipeStepList workflow={workflow} />
              )}
            </section>

            {plan && (
              <section className={s.section}>
                <h2 className={s.sectionNumber}>
                  03 / Dry-run plan — {plan.plan_id}
                </h2>
                <pre className={s.planBox}>
                  {plan.steps.length === 0
                    ? "(plan has no steps yet — server-side projector is pending)"
                    : plan.steps
                        .map(
                          (step) =>
                            `${String(step.index).padStart(2, "0")}  ${step.op_code}  ${step.display_name}`,
                        )
                        .join("\n")}
                  {plan.warnings.length > 0
                    ? `\n\nWARNINGS\n${plan.warnings.join("\n")}`
                    : ""}
                  {plan.diagnostics.length > 0
                    ? `\n\nDIAGNOSTICS\n${plan.diagnostics.join("\n")}`
                    : ""}
                </pre>
              </section>
            )}
          </div>
        )}

        {mode === "workflow" && (
          <div
            role="tabpanel"
            id="panel-workflow"
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {workflowLoading && (
              <div className={s.loadingBox}>Loading workflow graph…</div>
            )}
            {!workflowLoading && !workflow && workflowError && (
              <div className={s.errorBox} role="alert">
                {workflowError}
              </div>
            )}
            {workflow && (
              <>
                <section className={s.section}>
                  <h2 className={s.sectionNumber}>01 / Graph</h2>
                  <div className={s.graphBox} style={{ height: "560px", padding: 0 }}>
                    <GraphView workflow={workflow} nodeProgress={{}} />
                  </div>
                </section>

                <section className={s.section}>
                  <h2 className={s.sectionNumber}>
                    02 / Nodes ({workflow.nodes.length})
                  </h2>
                  <div className={s.graphBox}>
                    <table className={s.nodeTable}>
                      <tbody>
                        {workflow.nodes.map((n) => (
                          <tr key={n.id} className={s.nodeRow}>
                            <td className={`${s.nodeCell} ${s.nodeCellBold}`}>
                              {n.id}
                            </td>
                            <td className={s.nodeCell}>
                              <span className={s.nodeKindChip}>
                                {n.operator}
                              </span>
                            </td>
                            <td className={s.nodeCell}>
                              {n.stage ? `stage: ${n.stage}` : ""}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className={s.section}>
                  <h2 className={s.sectionNumber}>
                    03 / Edges ({workflow.edges.length})
                  </h2>
                  <div className={s.graphBox}>
                    {workflow.edges.length === 0 ? (
                      <p
                        className={s.overview}
                        style={{ fontStyle: "italic" }}
                      >
                        No edges — this is a single-node workflow.
                      </p>
                    ) : (
                      <table className={s.nodeTable}>
                        <tbody>
                          {workflow.edges.map((e, idx) => (
                            <tr key={idx} className={s.nodeRow}>
                              <td className={`${s.nodeCell} ${s.nodeCellBold}`}>
                                {e.source_node}.{e.source_port}
                              </td>
                              <td
                                className={s.nodeCell}
                                style={{ textAlign: "center", width: "40px" }}
                              >
                                →
                              </td>
                              <td className={`${s.nodeCell} ${s.nodeCellBold}`}>
                                {e.target_node}.{e.target_port}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        )}

        {/* Instances derived from this module */}
        <section className={s.instancesSection}>
          <h2 className={s.sectionNumber}>
            {/* scan-terminology: allow */}
            Instances of this module ({detail.deployments.length})
          </h2>
          {detail.deployments.length === 0 ? (
            <p
              className={s.overview}
              style={{ fontStyle: "italic", marginTop: "0.5rem" }}
            >
              {/* scan-terminology: allow — "Clone to Deployment" is the CTA name per FR-018 */}
              No instances yet. Click <strong>Clone to Deployment</strong> above
              to spin the first one up from this blueprint.
            </p>
          ) : (
            detail.deployments.map((d) => (
              <div key={d.deployment_id} className={s.instancesRow}>
                <div>
                  <div style={{ fontWeight: 600 }}>{d.display_name}</div>
                  <div className={s.instanceIdText}>{d.deployment_id}</div>
                </div>
                <button
                  type="button"
                  className={s.secondaryBtn}
                  onClick={() =>
                    navigate(
                      `/deployments/${encodeURIComponent(d.deployment_id)}`,
                    )
                  }
                >
                  Open
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

// ─── Recipe step list (nodes-as-steps projection) ────────────────────────

interface RecipeStepListProps {
  workflow: Workflow;
}

/**
 * Renders the workflow as a friendly numbered step list. Nodes are
 * ordered topologically (Kahn's algorithm) so step N depends only on
 * earlier steps. If the workflow declares stages, each stage becomes a
 * section header and its nodes are rendered as the steps under it.
 */
function RecipeStepList({ workflow }: RecipeStepListProps) {
  const ordered = useMemo(() => topoOrderNodes(workflow), [workflow]);

  const stageMap = new Map<string, { label: string; steps: typeof ordered }>();
  const ungrouped: typeof ordered = [];
  for (const node of ordered) {
    if (node.stage) {
      const entry = stageMap.get(node.stage) ?? {
        label: node.stage,
        steps: [],
      };
      entry.steps.push(node);
      stageMap.set(node.stage, entry);
    } else {
      ungrouped.push(node);
    }
  }

  // Preserve stage declaration order from the workflow (not discovery order).
  const stages = workflow.stages
    .map((st) => stageMap.get(st.id))
    .filter((e): e is { label: string; steps: typeof ordered } => e !== undefined);

  // Any stages that appeared on nodes but weren't declared — append last.
  for (const [id, entry] of stageMap) {
    if (!workflow.stages.some((s) => s.id === id)) {
      stages.push(entry);
    }
  }

  if (stages.length === 0) {
    return (
      <ol className={s.stepList}>
        {ordered.map((n, idx) => (
          <StepRow key={n.id} index={idx + 1} node={n} />
        ))}
      </ol>
    );
  }

  let runningIdx = 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {stages.map((stage) => (
        <div key={stage.label}>
          <div className={s.stepsStageHeader}>Stage · {stage.label}</div>
          <ol className={s.stepList}>
            {stage.steps.map((n) => {
              runningIdx += 1;
              return <StepRow key={n.id} index={runningIdx} node={n} />;
            })}
          </ol>
        </div>
      ))}
      {ungrouped.length > 0 && (
        <div>
          <div className={s.stepsStageHeader}>Unstaged</div>
          <ol className={s.stepList}>
            {ungrouped.map((n) => {
              runningIdx += 1;
              return <StepRow key={n.id} index={runningIdx} node={n} />;
            })}
          </ol>
        </div>
      )}
    </div>
  );
}

interface StepRowProps {
  index: number;
  node: Workflow["nodes"][number];
}

function StepRow({ index, node }: StepRowProps) {
  const inputs = Object.entries(node.inputs ?? {});
  return (
    <li className={s.step}>
      <span className={s.stepNumber}>{String(index).padStart(2, "0")}</span>
      <div className={s.stepBody}>
        <div className={s.stepHeadRow}>
          <span className={s.stepTitle}>{humanize(node.id)}</span>
          <span className={s.stepOp}>{node.operator}</span>
        </div>
        {inputs.length > 0 && (
          <div className={s.stepInputs}>
            <span className={s.stepInputsLabel}>Inputs</span>
            {inputs.map(([name, value]) => (
              <div key={name} className={s.stepInputRow}>
                <span className={s.stepInputName}>{name}</span>
                <span className={s.stepInputArrow}>←</span>
                <span>{renderInputSource(value)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {node.stage && <span className={s.stepStageChip}>{node.stage}</span>}
    </li>
  );
}

function renderInputSource(value: unknown): ReactElement {
  if (value && typeof value === "object") {
    const obj = value as { from?: string; value?: unknown };
    if (typeof obj.from === "string") {
      const tone = obj.from.startsWith("input:")
        ? s.stepInputSourceExternal
        : s.stepInputSourceRef;
      return <span className={tone}>{obj.from}</span>;
    }
    if (obj.value !== undefined) {
      const str =
        typeof obj.value === "string"
          ? JSON.stringify(obj.value)
          : JSON.stringify(obj.value);
      return <span className={s.stepInputSource}>{truncate(str, 40)}</span>;
    }
  }
  return <span className={s.stepInputSource}>—</span>;
}

function topoOrderNodes(workflow: Workflow) {
  const indeg = new Map<string, number>();
  const outEdges = new Map<string, string[]>();
  for (const n of workflow.nodes) {
    indeg.set(n.id, 0);
    outEdges.set(n.id, []);
  }
  for (const e of workflow.edges) {
    if (indeg.has(e.target_node)) {
      indeg.set(e.target_node, (indeg.get(e.target_node) ?? 0) + 1);
    }
    if (outEdges.has(e.source_node)) {
      outEdges.get(e.source_node)!.push(e.target_node);
    }
  }
  const ready: string[] = [];
  for (const [id, d] of indeg) if (d === 0) ready.push(id);
  ready.sort();
  const order: string[] = [];
  while (ready.length > 0) {
    const id = ready.shift()!;
    order.push(id);
    for (const next of outEdges.get(id) ?? []) {
      const d = (indeg.get(next) ?? 0) - 1;
      indeg.set(next, d);
      if (d === 0) {
        ready.push(next);
        ready.sort();
      }
    }
  }
  const byId = new Map(workflow.nodes.map((n) => [n.id, n]));
  if (order.length < workflow.nodes.length) {
    // Cycle or disconnected nodes — fall back to declaration order.
    return workflow.nodes;
  }
  return order.map((id) => byId.get(id)!).filter(Boolean);
}

function humanize(id: string): string {
  return id
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}
