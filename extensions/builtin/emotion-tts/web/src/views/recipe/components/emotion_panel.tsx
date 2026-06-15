import { useEffect, useMemo, useRef, useState } from "react";
import { ExtensionApiError } from "../../../services/http";
import {
  createPreset,
  deletePreset,
  listPresets,
  type EmotionVector,
  type VectorPreset,
} from "../../../services/presets_client";
import type { EmotionMode, GlobalEmotion } from "../../../services/types";
import { Banner } from "../../../components/banner";
import { Button } from "../../../components/button";
import * as css from "./emotion_panel.css";
import { EmotionRadar } from "./emotion_radar";
import { EmotionSliders } from "./emotion_sliders";

const MODES: readonly { id: EmotionMode; label: string }[] = [
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" },
];

const ZERO_VECTOR: EmotionVector = [0, 0, 0, 0, 0, 0, 0, 0];

const OVERRIDE_DOCS = `Per-line overrides (inside the [Char|…] tag):

  [Bob|emotion_vector:happy=0.7,surprised=0.2]  text…
  [Alice|qwen:Friendly teen voice]              text…
  [Carol:happy_sarah]                           text…   (legacy compat ref)

Precedence (highest wins): inline → legacy compat ref → mapping default → global panel.
Global alpha applies to every line unless a mapping overrides it.`;

interface Props {
  value: GlobalEmotion;
  onChange: (next: GlobalEmotion) => void;
  deploymentId: string;
}

export function EmotionPanel({ value, onChange, deploymentId }: Props): JSX.Element {
  const rawMode = value.mode ?? "emotion_vector";
  const mode = rawMode === "none" || rawMode === "audio_ref" ? "emotion_vector" : rawMode;
  const vector = normaliseVector(value.vector);
  const alpha = value.emotionAlpha ?? 1.0;

  const [presets, setPresets] = useState<VectorPreset[]>([]);
  const [presetsError, setPresetsError] = useState<string | null>(null);
  const [savingName, setSavingName] = useState("");
  const [selectedPresetId, setSelectedPresetId] = useState<string>("");
  const [pulseKey, setPulseKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setPresetsError(null);
    listPresets(deploymentId)
      .then((r) => {
        if (!cancelled) setPresets(sortByRecent(r.presets));
      })
      .catch((err: unknown) => {
        if (!cancelled) setPresetsError(describeError(err));
      });
    return () => {
      cancelled = true;
    };
  }, [deploymentId]);

  const selectedPreset = useMemo(
    () => presets.find((p) => p.presetId === selectedPresetId) ?? null,
    [presets, selectedPresetId],
  );

  const setMode = (next: EmotionMode): void => {
    onChange({ ...value, mode: next });
  };

  const setVector = (next: EmotionVector): void => {
    onChange({ ...value, mode: "emotion_vector", vector: next });
    if (selectedPreset && !vectorsEqual(selectedPreset.vector, next)) {
      setSelectedPresetId("");
    }
  };

  const setAlpha = (next: number): void => {
    const clamped = Math.max(0, Math.min(10, Number.isFinite(next) ? next : 1));
    onChange({ ...value, emotionAlpha: clamped });
  };

  const applyPreset = (presetId: string): void => {
    const preset = presets.find((p) => p.presetId === presetId);
    if (!preset) return;
    setSelectedPresetId(presetId);
    onChange({ ...value, mode: "emotion_vector", vector: preset.vector });
    setPulseKey((k) => k + 1);
  };

  const savePreset = async (): Promise<void> => {
    const name = savingName.trim();
    if (!name) return;
    setBusy(true);
    setPresetsError(null);
    try {
      const created = await createPreset(deploymentId, name, vector);
      if (!mounted.current) return;
      setPresets((prev) => sortByRecent([created, ...prev.filter((p) => p.presetId !== created.presetId)]));
      setSelectedPresetId(created.presetId);
      setSavingName("");
      setPulseKey((k) => k + 1);
    } catch (err: unknown) {
      if (mounted.current) setPresetsError(describeError(err));
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  const removePreset = async (presetId: string): Promise<void> => {
    const snapshot = presets;
    setPresets((prev) => prev.filter((p) => p.presetId !== presetId));
    if (selectedPresetId === presetId) setSelectedPresetId("");
    try {
      await deletePreset(deploymentId, presetId);
    } catch (err: unknown) {
      if (mounted.current) {
        setPresets(snapshot);
        setPresetsError(describeError(err));
      }
    }
  };

  const resetVector = (): void => setVector(ZERO_VECTOR);

  const randomVector = (): void => {
    const next = Array.from({ length: 8 }, () => Math.round(Math.random() * 100) / 100) as EmotionVector;
    setVector(next);
    setPulseKey((k) => k + 1);
  };

  return (
    <div className={css.shell}>
      <div className={css.radarColumn}>
        <EmotionRadar
          vector={vector}
          pulseKey={pulseKey}
          onChange={(next) => setVector(next as EmotionVector)}
          disabled={mode !== "emotion_vector"}
        />
        <span className={css.helpText}>{summariseMode(mode, selectedPreset?.presetName)}</span>
      </div>

      <div className={css.controlsColumn}>
        <div className={css.modeBar} role="radiogroup" aria-label="Emotion source">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              // biome-ignore lint/a11y/useSemanticElements: button-based radio preserves focus styles + click semantics across browsers — native radio doesn't fit the segmented bar visual
              role="radio"
              aria-checked={mode === m.id}
              className={mode === m.id ? css.modeButtonActive : css.modeButton}
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {mode === "emotion_vector" && (
          <>
            <div className={css.presetBar}>
              <select
                className={css.presetSelect}
                value={selectedPresetId}
                onChange={(e) => applyPreset(e.currentTarget.value)}
                aria-label="Load preset"
              >
                <option value="">— Load preset —</option>
                {presets.map((p) => (
                  <option key={p.presetId} value={p.presetId}>
                    {p.presetName}
                  </option>
                ))}
              </select>
              {selectedPresetId && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => void removePreset(selectedPresetId)}
                  disabled={busy}
                >
                  Delete preset
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={resetVector}>
                Reset
              </Button>
              <Button variant="ghost" size="sm" onClick={randomVector}>
                Random
              </Button>
            </div>

            <EmotionSliders vector={vector} onChange={setVector} />

            <form
              className={css.savePresetForm}
              onSubmit={(e) => {
                e.preventDefault();
                void savePreset();
              }}
            >
              <input
                type="text"
                className={css.presetNameInput}
                value={savingName}
                placeholder="Name current vector"
                onChange={(e) => setSavingName(e.currentTarget.value)}
                maxLength={120}
                aria-label="Preset name"
              />
              <Button
                type="submit"
                size="sm"
                disabled={busy || savingName.trim().length === 0}
              >
                Save preset
              </Button>
            </form>
          </>
        )}

        {mode === "qwen_template" && (
          <label>
            <span className={css.helpText}>Qwen template — use {"{seg}"} for the line text.</span>
            <textarea
              className={css.templateArea}
              value={value.qwenTemplate ?? ""}
              onChange={(e) =>
                onChange({ ...value, mode: "qwen_template", qwenTemplate: e.currentTarget.value })
              }
              rows={4}
            />
          </label>
        )}

        <div className={css.alphaRow}>
          <span className={css.sliderLabel}>alpha</span>
          <input
            type="range"
            min={0}
            max={10}
            step={0.01}
            value={alpha}
            className={css.slider}
            onChange={(e) => setAlpha(Number(e.currentTarget.value))}
            aria-label="Emotion alpha"
          />
          <input
            type="number"
            min={0}
            max={10}
            step={0.01}
            value={Number(alpha.toFixed(2))}
            className={css.sliderNumber}
            onChange={(e) => setAlpha(Number(e.currentTarget.value))}
            aria-label="Emotion alpha numeric"
          />
        </div>

        {presetsError && <Banner severity="error">{presetsError}</Banner>}

        <pre className={css.overrideDocs} >{OVERRIDE_DOCS}</pre>
      </div>
    </div>
  );
}

function normaliseVector(input: GlobalEmotion["vector"]): EmotionVector {
  if (!input || input.length !== 8) return [...ZERO_VECTOR] as EmotionVector;
  return input.map((x) => clamp01(x)) as EmotionVector;
}

function clamp01(x: number): number {
  if (!Number.isFinite(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function vectorsEqual(a: EmotionVector, b: EmotionVector): boolean {
  for (let i = 0; i < 8; i += 1) {
    const ai = a[i] ?? 0;
    const bi = b[i] ?? 0;
    if (Math.abs(ai - bi) > 1e-6) return false;
  }
  return true;
}

function sortByRecent(list: VectorPreset[]): VectorPreset[] {
  return [...list].sort((a, b) => b.updatedAt - a.updatedAt);
}

function summariseMode(mode: EmotionMode, presetName: string | undefined): string {
  switch (mode) {
    case "none":
      return "No global emotion — mappings and inline overrides still apply.";
    case "audio_ref":
      return "Audio reference — wire per-character refs in the mapping editor.";
    case "emotion_vector":
      return presetName ? `Vector preset: ${presetName}` : "Free-form vector.";
    case "qwen_template":
      return "Qwen template drives emotion for every utterance.";
  }
}

function describeError(err: unknown): string {
  if (err instanceof ExtensionApiError) return `${err.category}: ${err.message}`;
  if (err instanceof Error) return err.message;
  return "Unexpected error";
}
