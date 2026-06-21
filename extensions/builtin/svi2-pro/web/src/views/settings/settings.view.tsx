import { type ReactElement, useMemo, useState } from "react";
import { toast } from "sonner";
import * as fc from "../../components/form/field_control.css";
import { Button } from "../../components/ui/button";
import { Panel } from "../../components/ui/panel";
import { ATTENTION_OPTIONS, FP8_COMPUTE_OPTIONS } from "../../domain/settings_defaults";
import { saveSettings } from "../../services/settings_client";
import type { ExtensionSettings, InterpolateMethod } from "../../services/types";
import { useRenderRequest } from "../../store/render_request_store";
import * as styles from "./settings.css";

const INTERP_OPTIONS: Array<{ value: InterpolateMethod; label: string }> = [
  { value: "rife", label: "RIFE (auto)" },
  { value: "rife_torch", label: "RIFE torch" },
  { value: "rife_ncnn", label: "RIFE ncnn" },
  { value: "ffmpeg", label: "ffmpeg minterpolate" },
];

export function SettingsView(): ReactElement {
  const { settings, setSettings } = useRenderRequest();
  const [draft, setDraft] = useState<ExtensionSettings>(settings);
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(
    () =>
      (Object.keys(draft) as Array<keyof ExtensionSettings>).some(
        (key) => draft[key] !== settings[key],
      ),
    [draft, settings],
  );

  const update = <K extends keyof ExtensionSettings>(key: K, value: ExtensionSettings[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const saved = await saveSettings(draft);
      setSettings(saved);
      setDraft(saved);
      toast.success("Settings saved. Applied to new renders.");
    } catch {
      toast.error("Could not save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Panel
      title="Defaults"
      description="Applied as the starting values for new renders. Environment levers tune the backend."
    >
      <div className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Models directory</span>
          <input
            className={styles.input}
            value={draft.modelsDir}
            placeholder="Resolved under the host data dir"
            onChange={(e) => update("modelsDir", e.target.value)}
          />
          <span className={styles.help}>Weights root. Leave empty to use the host data dir.</span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Output directory</span>
          <input
            className={styles.input}
            value={draft.outputDir}
            placeholder="Default workspace output"
            onChange={(e) => update("outputDir", e.target.value)}
          />
          <span className={styles.help}>Where rendered mp4s are written.</span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Attention backend (SVI2_ATTENTION)</span>
          <select
            className={styles.select}
            value={draft.attentionBackend}
            onChange={(e) => update("attentionBackend", e.target.value)}
          >
            {ATTENTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.help}>flash2 recommended; sdpa is the always-works fallback.</span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>FP8 compute (SVI2_FP8_COMPUTE)</span>
          <select
            className={styles.select}
            value={draft.fp8Compute}
            onChange={(e) => update("fp8Compute", e.target.value)}
          >
            {FP8_COMPUTE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.help}>bf16 fixes the Blackwell scaled_mm colour smudge.</span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Blocks to swap</span>
          <input
            className={styles.input}
            type="number"
            min={0}
            max={40}
            value={draft.blocksToSwap}
            onChange={(e) => update("blocksToSwap", Number(e.target.value))}
          />
          <span className={styles.help}>40 = 16 GB-safe (most offload, lowest VRAM peak).</span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Interpolation method</span>
          <select
            className={styles.select}
            value={draft.interpolateMethod}
            onChange={(e) => update("interpolateMethod", e.target.value as InterpolateMethod)}
          >
            {INTERP_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.help}>rife → ffmpeg fallback by default.</span>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Interpolate target fps</span>
          <input
            className={styles.input}
            type="number"
            min={0}
            max={120}
            value={draft.interpolateFps}
            onChange={(e) => update("interpolateFps", Number(e.target.value))}
          />
          <span className={styles.help}>0 = off. 48 from 16 = ×3 smooth playback.</span>
        </label>

        <div className={styles.field}>
          <span className={styles.label} id="svi2-fast-parallel-label">
            Fast parallel (CPU & encode threads)
          </span>
          <div className={fc.toggleRow}>
            <button
              type="button"
              role="switch"
              aria-checked={draft.fastParallel}
              aria-labelledby="svi2-fast-parallel-label"
              className={fc.toggle}
              onClick={() => update("fastParallel", !draft.fastParallel)}
            >
              <span className={fc.toggleThumb} aria-hidden="true" />
            </button>
            <span className={styles.help}>{draft.fastParallel ? "On" : "Off"}</span>
          </div>
          <span className={styles.help}>
            Uses ~half the CPU cores for prompt-encode and ffmpeg. Visually identical; only mp4 sha
            differs.
          </span>
        </div>

        <div className={styles.field}>
          <span className={styles.label} id="svi2-batch-prompt-encode-label">
            Batch prompt encoding (experimental — alters exact output)
          </span>
          <div className={fc.toggleRow}>
            <button
              type="button"
              role="switch"
              aria-checked={draft.batchPromptEncode}
              aria-labelledby="svi2-batch-prompt-encode-label"
              className={fc.toggle}
              onClick={() => update("batchPromptEncode", !draft.batchPromptEncode)}
            >
              <span className={fc.toggleThumb} aria-hidden="true" />
            </button>
            <span className={styles.help}>{draft.batchPromptEncode ? "On" : "Off"}</span>
          </div>
          <span className={styles.help}>
            Encodes all prompts in one forward pass. Faster, but changes text conditioning at the bit
            level — off by default.
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button loading={saving} disabled={!dirty} onClick={() => void handleSave()}>
          Save settings
        </Button>
        <Button
          variant="secondary"
          onClick={() => setDraft(settings)}
          disabled={saving || !dirty}
        >
          Discard changes
        </Button>
        {dirty && <output className={styles.dirtyHint}>Unsaved changes</output>}
      </div>
    </Panel>
  );
}
