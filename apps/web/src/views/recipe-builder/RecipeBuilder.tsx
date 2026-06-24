import { useEffect, useMemo, useState, type ReactElement } from "react";
import {
  createRecipe,
  fetchExposableTargets,
  fetchWorkflowVersions,
} from "../../api/client";
import type { ExposableTargetDto } from "../../api/generated/ExposableTargetDto";
import type { ExposableTargetsResponseDto } from "../../api/generated/ExposableTargetsResponseDto";
import type { ControlMode } from "../../api/generated/ControlMode";
import type { WorkflowVersionDto } from "../../api/generated/WorkflowVersionDto";
import { RecipeFieldWidget } from "../recipe-form/RecipeFieldWidget";
import {
  buildProjection,
  controlFromTarget,
  lockConflicts,
  slugify,
  type BuilderOutput,
  type BuilderPreset,
  type ExposedControl,
} from "./builder_model";
import * as styles from "./recipe_builder.css";

export interface RecipeBuilderProps {
  workflowId: string;
  initialVersion: string;
}

const MODES: ControlMode[] = ["basic", "advanced", "locked", "hidden"];
const PREVIEW_STYLES = ["player", "image", "gallery", "text", "none"];

/** Generic, host-owned no-code recipe builder over a pinned workflow version. */
export function RecipeBuilder({
  workflowId,
  initialVersion,
}: RecipeBuilderProps): ReactElement {
  const [version, setVersion] = useState(initialVersion);
  const [versions, setVersions] = useState<WorkflowVersionDto[]>([]);
  const [scan, setScan] = useState<ExposableTargetsResponseDto | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const [exposed, setExposed] = useState<Record<string, ExposedControl>>({});
  const [displayName, setDisplayName] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("general");

  const [presets, setPresets] = useState<BuilderPreset[]>([]);
  const [presetLabel, setPresetLabel] = useState("");

  const [output, setOutput] = useState<BuilderOutput>({
    primary_artifact: "",
    preview_style: "none",
    show_intermediate: false,
  });

  const [previewValues, setPreviewValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Best-effort version list for the picker; failures fall back to a text field.
  useEffect(() => {
    let active = true;
    fetchWorkflowVersions(workflowId)
      .then((list) => {
        if (!active) return;
        setVersions(list);
        setVersion((cur) => {
          if (cur.trim().length > 0) return cur;
          const latest = list[list.length - 1];
          return latest ? latest.version : cur;
        });
      })
      .catch(() => {
        /* picker stays a free-text input */
      });
    return () => {
      active = false;
    };
  }, [workflowId]);

  const exposedList = useMemo(() => {
    if (!scan) return [];
    return [...scan.inputs, ...scan.node_configs]
      .map((t) => exposed[t.target])
      .filter((c): c is ExposedControl => Boolean(c));
  }, [scan, exposed]);

  const conflicts = useMemo(
    () => lockConflicts(exposedList, presets),
    [exposedList, presets],
  );

  const projection = useMemo(
    () => buildProjection(exposedList, presets, output),
    [exposedList, presets, output],
  );

  const canSave =
    exposedList.length > 0 &&
    displayName.trim().length > 0 &&
    version.trim().length > 0 &&
    conflicts.length === 0 &&
    !saving;

  async function handleScan(): Promise<void> {
    setScanning(true);
    setScanError(null);
    try {
      const result = await fetchExposableTargets(workflowId, version.trim());
      setScan(result);
      setExposed({});
      setPresets([]);
    } catch (err: unknown) {
      setScanError(err instanceof Error ? err.message : "Scan failed");
    } finally {
      setScanning(false);
    }
  }

  function toggleExpose(target: ExposableTargetDto): void {
    setExposed((prev) => {
      const next = { ...prev };
      if (next[target.target]) {
        delete next[target.target];
      } else {
        next[target.target] = controlFromTarget(target);
      }
      return next;
    });
  }

  function patchExposed(target: string, patch: Partial<ExposedControl>): void {
    setExposed((prev) => {
      const cur = prev[target];
      if (!cur) return prev;
      return { ...prev, [target]: { ...cur, ...patch } };
    });
  }

  function capturePreset(): void {
    const label = presetLabel.trim();
    if (label.length === 0 || exposedList.length === 0) return;
    const base = slugify(label);
    const taken = new Set(presets.map((p) => p.preset_id));
    let preset_id = base;
    let n = 2;
    while (taken.has(preset_id)) {
      preset_id = `${base}-${n}`;
      n += 1;
    }
    const values: Record<string, unknown> = {};
    for (const c of exposedList) {
      values[c.control_id] = previewValues[c.control_id] ?? c.default_value;
    }
    setPresets((prev) => [...prev, { preset_id, label, values }]);
    setPresetLabel("");
  }

  function removePreset(id: string): void {
    setPresets((prev) => prev.filter((p) => p.preset_id !== id));
  }

  async function handleSave(): Promise<void> {
    if (!canSave) return;
    setSaving(true);
    setSaveError(null);
    setSavedId(null);
    try {
      const created = await createRecipe({
        display_name: displayName.trim(),
        summary: summary.trim(),
        category: category.trim() || "general",
        workflow_id: workflowId,
        workflow_version: version.trim(),
        projection,
      });
      setSavedId(created.id);
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.root} data-testid="recipe-builder">
      <header className={styles.header}>
        <h1 className={styles.title}>Recipe Builder</h1>
        <span className={styles.subtitle}>
          Compose a runnable recipe over workflow{" "}
          <code className={styles.targetName}>{workflowId}</code>
        </span>
      </header>

      <section className={styles.step}>
        <h2 className={styles.stepTitle}>
          <span className={styles.stepIndex}>01</span> Workflow version
        </h2>
        <div className={styles.inlineRow}>
          <label className={styles.label} htmlFor="builder-version">
            Version
          </label>
          {versions.length > 0 ? (
            <select
              id="builder-version"
              className={styles.select}
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            >
              {versions.map((v) => (
                <option key={v.version} value={v.version}>
                  {v.version}
                  {v.label ? ` · ${v.label}` : ""}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="builder-version"
              className={styles.input}
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          )}
          <button
            type="button"
            className={styles.button}
            data-testid="scan-targets"
            onClick={handleScan}
            disabled={scanning || version.trim().length === 0}
          >
            {scanning ? "Scanning…" : "Scan targets"}
          </button>
        </div>
        {scanError && (
          <span className={styles.warning} role="alert">
            {scanError}
          </span>
        )}
      </section>

      <section className={styles.step}>
        <h2 className={styles.stepTitle}>
          <span className={styles.stepIndex}>02</span> Details
        </h2>
        <div className={styles.fieldRow}>
          <label className={styles.label} htmlFor="builder-name">
            Display name
          </label>
          <input
            id="builder-name"
            className={styles.input}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className={styles.fieldRow}>
          <label className={styles.label} htmlFor="builder-summary">
            Summary
          </label>
          <input
            id="builder-summary"
            className={styles.input}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div className={styles.fieldRow}>
          <label className={styles.label} htmlFor="builder-category">
            Category
          </label>
          <input
            id="builder-category"
            className={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </section>

      {scan && (
        <section className={styles.step}>
          <h2 className={styles.stepTitle}>
            <span className={styles.stepIndex}>03</span> Targets
          </h2>
          {scan.inputs.length + scan.node_configs.length === 0 && (
            <span className={styles.emptyNote}>
              This workflow version exposes no inputs or node configs.
            </span>
          )}
          <div className={styles.targetList}>
            {[...scan.inputs, ...scan.node_configs].map((t) => (
              <TargetRow
                key={t.target}
                target={t}
                control={exposed[t.target]}
                onToggle={() => toggleExpose(t)}
                onPatch={(patch) => patchExposed(t.target, patch)}
              />
            ))}
          </div>
        </section>
      )}

      {exposedList.length > 0 && (
        <section className={styles.step}>
          <h2 className={styles.stepTitle}>
            <span className={styles.stepIndex}>04</span> Presets
          </h2>
          <div className={styles.inlineRow}>
            <input
              className={styles.input}
              data-testid="preset-label"
              placeholder="Preset name"
              value={presetLabel}
              onChange={(e) => setPresetLabel(e.target.value)}
            />
            <button
              type="button"
              className={styles.button}
              data-testid="capture-preset"
              onClick={capturePreset}
              disabled={presetLabel.trim().length === 0}
            >
              Capture current values
            </button>
          </div>
          <div className={styles.presetList}>
            {presets.map((p) => (
              <div key={p.preset_id} className={styles.presetItem}>
                <span>
                  {p.label}{" "}
                  <span className={styles.targetKind}>
                    ({Object.keys(p.values).length})
                  </span>
                </span>
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => removePreset(p.preset_id)}
                  aria-label={`Remove preset ${p.label}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {conflicts.length > 0 && (
            <span className={styles.warning} role="alert" data-testid="lock-conflict">
              {conflicts.length} preset value(s) target a locked or hidden control:{" "}
              {conflicts.map((c) => c.control_id).join(", ")}. Remove them or change
              the control mode before saving.
            </span>
          )}
        </section>
      )}

      <section className={styles.step}>
        <h2 className={styles.stepTitle}>
          <span className={styles.stepIndex}>05</span> Output
        </h2>
        <div className={styles.targetMeta}>
          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor="builder-primary">
              Primary artifact
            </label>
            <input
              id="builder-primary"
              className={styles.input}
              value={output.primary_artifact}
              onChange={(e) =>
                setOutput((o) => ({ ...o, primary_artifact: e.target.value }))
              }
            />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor="builder-preview-style">
              Preview style
            </label>
            <select
              id="builder-preview-style"
              className={styles.select}
              value={output.preview_style}
              onChange={(e) =>
                setOutput((o) => ({ ...o, preview_style: e.target.value }))
              }
            >
              {PREVIEW_STYLES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <label className={styles.inlineRow}>
            <input
              type="checkbox"
              checked={output.show_intermediate}
              onChange={(e) =>
                setOutput((o) => ({ ...o, show_intermediate: e.target.checked }))
              }
            />
            <span className={styles.label}>Show intermediate artifacts</span>
          </label>
        </div>
      </section>

      {exposedList.length > 0 && (
        <section className={styles.step}>
          <h2 className={styles.stepTitle}>
            <span className={styles.stepIndex}>06</span> Preview
          </h2>
          <div className={styles.preview} data-testid="builder-preview">
            {projection.controls.map((ctrl) => (
              <RecipeFieldWidget
                key={ctrl.control_id}
                control={ctrl}
                value={previewValues[ctrl.control_id] ?? ctrl.default_value}
                onChange={(v) =>
                  setPreviewValues((prev) => ({ ...prev, [ctrl.control_id]: v }))
                }
              />
            ))}
          </div>
        </section>
      )}

      <div className={styles.saveRow}>
        <button
          type="button"
          className={styles.primaryButton}
          data-testid="save-recipe"
          onClick={handleSave}
          disabled={!canSave}
        >
          {saving ? "Saving…" : "Save recipe"}
        </button>
        {saveError && (
          <span className={styles.warning} role="alert">
            {saveError}
          </span>
        )}
        {savedId && (
          <span className={styles.success} data-testid="save-success">
            Saved · {savedId}
          </span>
        )}
      </div>
    </div>
  );
}

interface TargetRowProps {
  target: ExposableTargetDto;
  control: ExposedControl | undefined;
  onToggle: () => void;
  onPatch: (patch: Partial<ExposedControl>) => void;
}

function TargetRow({
  target,
  control,
  onToggle,
  onPatch,
}: TargetRowProps): ReactElement {
  const exposed = Boolean(control);
  return (
    <div
      className={`${styles.targetRow} ${exposed ? styles.targetRowExposed : ""}`}
    >
      <div className={styles.targetHead}>
        <label className={styles.inlineRow}>
          <input
            type="checkbox"
            checked={exposed}
            data-testid={`expose-${target.target}`}
            onChange={onToggle}
          />
          <span className={styles.targetName}>{target.target}</span>
        </label>
        <span className={styles.targetKind}>
          {target.kind}
          {target.required ? " · required" : ""}
        </span>
      </div>

      {control && (
        <div className={styles.targetMeta}>
          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor={`f-label-${target.target}`}>
              Label
            </label>
            <input
              id={`f-label-${target.target}`}
              className={styles.input}
              value={control.label}
              onChange={(e) =>
                onPatch({ label: e.target.value, control_id: slugify(e.target.value) })
              }
            />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor={`f-mode-${target.target}`}>
              Mode
            </label>
            <select
              id={`f-mode-${target.target}`}
              className={styles.select}
              data-testid={`mode-${control.control_id}`}
              value={control.mode}
              onChange={(e) => onPatch({ mode: e.target.value as ControlMode })}
            >
              {MODES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor={`f-section-${target.target}`}>
              Section
            </label>
            <input
              id={`f-section-${target.target}`}
              className={styles.input}
              value={control.section}
              onChange={(e) => onPatch({ section: e.target.value })}
            />
          </div>
          <div className={styles.fieldRow}>
            <label className={styles.label} htmlFor={`f-help-${target.target}`}>
              Help text
            </label>
            <input
              id={`f-help-${target.target}`}
              className={styles.input}
              value={control.help_text}
              onChange={(e) => onPatch({ help_text: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
