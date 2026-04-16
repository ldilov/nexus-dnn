import { useCallback, useEffect, useState } from "react";
import {
  deployFromModule,
  dryRunModuleBlueprint,
  fetchModule,
  type DryRunPlan,
  type ModuleDetail,
  type RecipeRef,
} from "../api/client";
import * as s from "./blueprint_view.css";

interface BlueprintViewProps {
  moduleId: string;
  recipeId?: string;
  onNavigate: (hash: string) => void;
}

type State =
  | { kind: "loading" }
  | { kind: "ready"; detail: ModuleDetail; selectedRecipeId: string | null }
  | { kind: "error"; message: string };

export function BlueprintView({
  moduleId,
  recipeId: initialRecipeId,
  onNavigate,
}: BlueprintViewProps) {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [plan, setPlan] = useState<DryRunPlan | null>(null);
  const [dryRunning, setDryRunning] = useState(false);
  const [cloning, setCloning] = useState(false);

  useEffect(() => {
    setState({ kind: "loading" });
    fetchModule(moduleId)
      .then((detail) => {
        const primary =
          detail.summary.blueprints.find((b) => b.is_primary) ??
          detail.summary.blueprints[0];
        const selectedRecipeId =
          initialRecipeId ?? primary?.recipe_id ?? null;
        setState({ kind: "ready", detail, selectedRecipeId });
      })
      .catch((err: unknown) =>
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "Failed to load blueprint",
        }),
      );
  }, [moduleId, initialRecipeId]);

  const selected = useCallback(
    (detail: ModuleDetail, recipeId: string | null): RecipeRef | null => {
      if (!recipeId) return null;
      return (
        detail.summary.blueprints.find((b) => b.recipe_id === recipeId) ?? null
      );
    },
    [],
  );

  const handleBack = useCallback(() => {
    onNavigate(`#/modules/${encodeURIComponent(moduleId)}`);
  }, [onNavigate, moduleId]);

  const handlePick = useCallback((recipeId: string) => {
    setState((prev) =>
      prev.kind === "ready" ? { ...prev, selectedRecipeId: recipeId } : prev,
    );
    setPlan(null);
  }, []);

  const handleDryRun = useCallback(async () => {
    if (state.kind !== "ready") return;
    setDryRunning(true);
    try {
      const result = await dryRunModuleBlueprint(moduleId, {
        recipe_id: state.selectedRecipeId ?? undefined,
      });
      setPlan(result);
    } catch (err: unknown) {
      setPlan({
        plan_id: "error",
        steps: [],
        warnings: [],
        diagnostics: [
          err instanceof Error ? err.message : "Dry-run failed",
        ],
      });
    } finally {
      setDryRunning(false);
    }
  }, [state, moduleId]);

  const handleClone = useCallback(async () => {
    if (state.kind !== "ready") return;
    setCloning(true);
    try {
      const result = await deployFromModule(moduleId, {
        recipe_id: state.selectedRecipeId ?? undefined,
      });
      onNavigate(`#/deployments/${encodeURIComponent(result.deployment_id)}`);
    } catch (err: unknown) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Clone failed",
      });
    } finally {
      setCloning(false);
    }
  }, [state, moduleId, onNavigate]);

  if (state.kind === "loading") {
    return (
      <div className={s.root}>
        <button type="button" className={s.backLink} onClick={handleBack}>
          ← Back to module
        </button>
        <p>Loading blueprint…</p>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className={s.root}>
        <button type="button" className={s.backLink} onClick={handleBack}>
          ← Back to module
        </button>
        <p role="alert">{state.message}</p>
      </div>
    );
  }

  const { detail, selectedRecipeId } = state;
  const current = selected(detail, selectedRecipeId);
  const multi = detail.summary.blueprints.length > 1;
  const hasDeployments = detail.deployments.length > 0;
  const lastDeployment = hasDeployments ? detail.deployments[0] : null;

  return (
    <div className={s.root}>
      <div className={s.stickyHeader}>
        <div>
          <button type="button" className={s.backLink} onClick={handleBack}>
            ← Back to module
          </button>
          <h1 className={s.title}>
            {detail.summary.display_name}
            {current ? ` — ${current.display_name}` : ""}
          </h1>
        </div>
        <div className={s.actions}>
          <button
            type="button"
            className={s.secondaryBtn}
            onClick={handleDryRun}
            disabled={dryRunning || !selectedRecipeId}
          >
            {dryRunning ? "Planning…" : "Dry Run"}
          </button>
          <button
            type="button"
            className={s.primaryBtn}
            onClick={handleClone}
            disabled={cloning || !selectedRecipeId}
          >
            {cloning ? "Cloning…" : "Clone to Deployment"}
            {/* scan-terminology: allow — CTA per FR-018 */}
          </button>
          {hasDeployments && lastDeployment && (
            <a
              href={`/api/v1/deployments/${encodeURIComponent(lastDeployment.deployment_id)}/export`}
              className={s.secondaryBtn}
              rel="nofollow"
            >
              Export .nx
            </a>
          )}
        </div>
      </div>

      {multi && (
        <div
          className={s.pillRow}
          role="group"
          aria-label="Pick blueprint"
        >
          {detail.summary.blueprints.map((bp) => (
            <button
              key={bp.recipe_id}
              type="button"
              className={s.pill}
              aria-pressed={selectedRecipeId === bp.recipe_id}
              onClick={() => handlePick(bp.recipe_id)}
            >
              {bp.is_primary ? "★ " : ""}
              {bp.display_name}
            </button>
          ))}
        </div>
      )}

      {current && (
        <section>
          <h2 style={{ fontSize: "0.875rem", textTransform: "uppercase", opacity: 0.7, letterSpacing: "0.05em" }}>
            Overview
          </h2>
          <p style={{ maxWidth: "70ch", opacity: 0.9 }}>
            {current.description ?? "No description provided."}
          </p>
        </section>
      )}

      <section>
        <h2 style={{ fontSize: "0.875rem", textTransform: "uppercase", opacity: 0.7, letterSpacing: "0.05em" }}>
          Steps
        </h2>
        {current && current.step_count === 0 && (
          <p style={{ opacity: 0.6, fontStyle: "italic" }}>
            Step-level recipe projection lands in a later iteration. Use "Dry
            Run" below to preview the execution plan.
          </p>
        )}
        {current && current.step_count > 0 && (
          <ol className={s.stepList}>
            {Array.from({ length: current.step_count }, (_, i) => (
              <li key={i} className={s.step}>
                <span className={s.stepNumber}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={s.stepBody}>
                  <span className={s.opCode}>op.step.{i + 1}</span>
                  <span className={s.stepTitle}>Step {i + 1}</span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      {plan && (
        <section>
          <h2 style={{ fontSize: "0.875rem", textTransform: "uppercase", opacity: 0.7, letterSpacing: "0.05em" }}>
            Dry-run plan — {plan.plan_id}
          </h2>
          <pre className={s.planBox}>
            {plan.steps.length === 0
              ? "(plan has no steps yet — server-side projector is still being built)"
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

      <section>
        <h2 style={{ fontSize: "0.875rem", textTransform: "uppercase", opacity: 0.7, letterSpacing: "0.05em" }}>
          {/* scan-terminology: allow — provenance list */}
          Instances of this module ({detail.deployments.length})
        </h2>
        {detail.deployments.length === 0 && (
          <p style={{ opacity: 0.6, fontStyle: "italic" }}>
            No instances yet.
          </p>
        )}
        {detail.deployments.map((d) => (
          <div
            key={d.deployment_id}
            className={s.deploymentItem}
          >
            <span>{d.display_name}</span>
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
        ))}
      </section>
    </div>
  );
}
