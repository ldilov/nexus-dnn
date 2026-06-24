import { useState, useMemo, type ReactElement } from "react";
import useSWR from "swr";
import { fetchRecipeForm, submitRecipeRun } from "../../api/client";
import { useRootOutletContext } from "../../root_layout";
import type { Control } from "../../api/generated/Control";
import type { Section } from "../../api/generated/Section";
import { RecipeFieldWidget } from "./RecipeFieldWidget";
import { PresetRail } from "./PresetRail";
import { ResultPanel } from "./ResultPanel";
import { RecipePinnedGraph } from "./RecipePinnedGraph";
import { validateControls } from "./validate";
import * as styles from "./recipe_form.css";

export interface RecipeFormProps {
  recipeId: string;
}

/** Seed initial values from `default_value`, but never for locked/hidden controls. */
function seedValues(controls: Control[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const ctrl of controls) {
    if (ctrl.mode === "hidden") continue;
    out[ctrl.control_id] = ctrl.default_value;
  }
  return out;
}

/** Status badge text for a node progress entry. */
function statusLabel(status: string): string {
  if (status === "running") return "↻ running";
  if (status === "completed" || status === "cache_hit") return "✓ done";
  if (status === "failed" || status === "cancelled") return "✕ failed";
  return status;
}

export function RecipeForm({ recipeId }: RecipeFormProps): ReactElement {
  const { data, isLoading, error } = useSWR(
    ["recipe-form", recipeId],
    () => fetchRecipeForm(recipeId),
  );

  const { runId, nodeProgress } = useRootOutletContext();

  const [controlValues, setControlValues] = useState<Record<string, unknown>>({});
  const [valuesSeeded, setValuesSeeded] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [runStarted, setRunStarted] = useState(false);
  const [runDone, setRunDone] = useState(false);
  const [runArtifacts, setRunArtifacts] = useState<Record<string, unknown>>({});

  // Seed control values once data arrives.
  if (data && !valuesSeeded) {
    const seeded = seedValues(data.projection.controls);
    setControlValues(seeded);
    setValuesSeeded(true);
  }

  const projection = data?.projection;
  const hints = data?.control_hints ?? [];
  const pinWorkflowId = data?.workflow_id ?? null;
  const pinWorkflowVersion = data?.workflow_version ?? null;

  // Validation runs on current values.
  const { errors } = useMemo(() => {
    if (!projection) return { errors: {} };
    return validateControls(projection, hints, controlValues);
  }, [projection, hints, controlValues]);

  const hasErrors = Object.keys(errors).length > 0;

  // Sort sections by order.
  const sortedSections: Section[] = useMemo(() => {
    if (!projection) return [];
    return [...projection.sections].sort((a, b) => (a.order < b.order ? -1 : 1));
  }, [projection]);

  const controlById = useMemo(() => {
    const map = new Map<string, Control>();
    for (const ctrl of projection?.controls ?? []) {
      map.set(ctrl.control_id, ctrl);
    }
    return map;
  }, [projection]);

  const hintById = useMemo(() => {
    const map = new Map(hints.map((h) => [h.control_id, h]));
    return map;
  }, [hints]);

  /** A section is "advanced" when every non-hidden control it contains has mode "advanced". */
  function isAllAdvanced(section: Section): boolean {
    const controls = section.control_ids
      .map((id) => controlById.get(id))
      .filter((c): c is Control => c !== undefined && c.mode !== "hidden");
    if (controls.length === 0) return false;
    return controls.every((c) => c.mode === "advanced");
  }

  function handlePresetSelect(presetId: string): void {
    setSelectedPresetId(presetId);
    const preset = projection?.presets.find((p) => p.preset_id === presetId);
    if (!preset) return;
    setControlValues((prev) => {
      const next = { ...prev };
      for (const [key, val] of Object.entries(preset.values)) {
        const ctrl = controlById.get(key);
        // Never override locked or hidden controls from a preset.
        if (ctrl && (ctrl.mode === "locked" || ctrl.mode === "hidden")) continue;
        next[key] = val;
      }
      return next;
    });
  }

  function handleControlChange(controlId: string, value: unknown): void {
    setControlValues((prev) => ({ ...prev, [controlId]: value }));
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (hasErrors || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Strip out locked/hidden from submitted values.
      const filteredValues: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(controlValues)) {
        const ctrl = controlById.get(k);
        if (ctrl && (ctrl.mode === "locked" || ctrl.mode === "hidden")) continue;
        filteredValues[k] = v;
      }
      await submitRecipeRun(recipeId, {
        control_values: filteredValues,
        preset_id: selectedPresetId ?? undefined,
      });
      setRunStarted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  // Detect run completion by checking for terminal node statuses.
  const allNodes = Object.entries(nodeProgress ?? {});
  const isTerminal =
    runStarted &&
    allNodes.length > 0 &&
    allNodes.every(([, v]) =>
      v.status === "completed" || v.status === "failed" || v.status === "cancelled",
    );

  if (!runDone && isTerminal) {
    setRunDone(true);
    // Best-effort artifact collection: not yet wired to a real artifact store.
    setRunArtifacts({});
  }

  // ─── Loading / error states ──────────────────────────────────────────────

  if (isLoading) {
    return <div className={styles.root}><p className={styles.emptyNote}>Loading form…</p></div>;
  }

  if (error || !projection) {
    return (
      <div className={styles.root}>
        <p className={styles.emptyNote}>
          {error instanceof Error ? error.message : "Failed to load recipe form."}
        </p>
      </div>
    );
  }

  // ─── Empty/legacy recipe ─────────────────────────────────────────────────

  if (projection.controls.length === 0) {
    return (
      <div className={styles.root}>
        <p className={styles.emptyNote} data-testid="recipe-form-empty">
          No generated form for this recipe.
        </p>
      </div>
    );
  }

  // ─── Run progress panel ──────────────────────────────────────────────────

  if (runStarted) {
    return (
      <div className={styles.root}>
        <div
          className={styles.progressPanel}
          data-testid="recipe-run-progress"
          role="status"
          aria-live="polite"
        >
          <div className={styles.progressTitle}>
            {runDone ? "Run complete" : `Run in progress${runId ? ` · ${runId}` : ""}`}
          </div>
          {allNodes.length > 0 && (
            <div className={styles.nodeProgressList}>
              {allNodes.map(([nodeId, prog]) => {
                const statusCls =
                  prog.status === "running"
                    ? styles.nodeStatusRunning
                    : prog.status === "completed"
                      ? styles.nodeStatusCompleted
                      : prog.status === "failed" || prog.status === "cancelled"
                        ? styles.nodeStatusFailed
                        : "";
                return (
                  <div key={nodeId} className={styles.nodeProgressRow}>
                    <span className={styles.nodeId}>{nodeId}</span>
                    <span className={`${styles.nodeStatus} ${statusCls}`}>
                      {statusLabel(prog.status)}
                    </span>
                    {prog.progress > 0 && (
                      <span>{Math.round(prog.progress * 100)}%</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {runDone && (
          <div className={styles.resultSection}>
            <ResultPanel
              output={projection.output}
              artifacts={runArtifacts}
            />
          </div>
        )}
      </div>
    );
  }

  // ─── Main form ───────────────────────────────────────────────────────────

  return (
    <div className={styles.root}>
      {projection.presets.length > 0 && (
        <div className={styles.presetRow}>
          <span className={styles.presetLabel}>Presets</span>
          <PresetRail
            presets={projection.presets}
            selectedPresetId={selectedPresetId}
            onSelect={handlePresetSelect}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.section}>
          {sortedSections.map((sec) => {
            const controls = sec.control_ids
              .map((id) => controlById.get(id))
              .filter((c): c is Control => c !== undefined);

            if (controls.length === 0) return null;

            const advanced = isAllAdvanced(sec);

            const fieldList = (
              <div className={advanced ? styles.advancedContent : styles.section}>
                {controls.map((ctrl) => {
                  const hint = hintById.get(ctrl.control_id);
                  const fieldError = errors[ctrl.control_id];
                  return (
                    <div key={ctrl.control_id} className={styles.fieldWrapper}>
                      <RecipeFieldWidget
                        control={ctrl}
                        hint={hint}
                        value={controlValues[ctrl.control_id] ?? ctrl.default_value}
                        onChange={(v) => handleControlChange(ctrl.control_id, v)}
                      />
                      {fieldError && (
                        <span className={styles.errorText} role="alert">
                          {fieldError}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );

            if (advanced) {
              return (
                <details key={sec.id} className={styles.advancedDetails}>
                  <summary className={styles.advancedSummary}>{sec.title}</summary>
                  {fieldList}
                </details>
              );
            }

            return (
              <div key={sec.id} className={styles.section}>
                <h3 className={styles.sectionTitle}>{sec.title}</h3>
                {fieldList}
              </div>
            );
          })}
        </div>

        <div className={styles.submitRow}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={hasErrors || submitting}
            aria-label="Run recipe"
          >
            {submitting ? "Submitting…" : "Run"}
          </button>
          {submitError && (
            <span className={styles.errorText} role="alert">
              {submitError}
            </span>
          )}
        </div>
      </form>

      {pinWorkflowId && pinWorkflowVersion && (
        <RecipePinnedGraph
          workflowId={pinWorkflowId}
          workflowVersion={pinWorkflowVersion}
        />
      )}
    </div>
  );
}
