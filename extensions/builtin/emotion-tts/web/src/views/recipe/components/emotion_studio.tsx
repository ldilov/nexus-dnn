import { useEffect, useMemo, useRef, useState } from "react";
import * as css from "./emotion_studio.css";
import * as recipeCss from "../recipe.css";
import { ExtensionApiError } from "../../../services/http";
import {
  createPreset,
  deletePreset,
  listPresets,
  type VectorPreset,
} from "../../../services/presets_client";
import type { EmotionMode, GlobalEmotion } from "../../../services/types";
import { EttsRadar } from "./etts_radar";
import { EttsAxisBars } from "./etts_axis_bars";
import {
  PresetLibrary,
  vecToPresetVector,
} from "./save_preset_composer";
import {
  AXIS_KEYS,
  AXIS_LABELS,
  type EmotionVec,
  EMPTY_VEC,
  clampVec,
  dominantAxis,
  magnitude,
  suggestPresetName,
  topAxes,
} from "../lib/preset_naming";
import { mapPromptToVector } from "../lib/qwen_mapping";
import { Button } from "../../../components/button";

export interface EmotionStudioProps {
  value: GlobalEmotion;
  onChange: (next: GlobalEmotion) => void;
  deploymentId: string;
}

const MODES: readonly { id: EmotionMode; label: string }[] = [
  { id: "none", label: "None" },
  { id: "audio_ref", label: "Audio ref" },
  { id: "emotion_vector", label: "Vector" },
  { id: "qwen_template", label: "Qwen" },
];

export function EmotionStudio({
  value,
  onChange,
  deploymentId,
}: EmotionStudioProps): JSX.Element {
  const mode: EmotionMode = value.mode ?? "none";
  const vec = useMemo(() => normaliseVec(value.vector), [value.vector]);
  const alpha = value.emotionAlpha ?? 1.0;

  const [presets, setPresets] = useState<VectorPreset[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [presetName, setPresetName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    listPresets(deploymentId)
      .then((r) => {
        if (!cancelled) setPresets(sortByRecent(r.presets));
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(describe(err));
      });
    return () => {
      cancelled = true;
    };
  }, [deploymentId]);

  useEffect(() => {
    if (!nameTouched) setPresetName(suggestPresetName(vec));
  }, [vec, nameTouched]);

  const setMode = (next: EmotionMode): void => {
    onChange({ ...value, mode: next });
  };

  const setVec = (next: EmotionVec): void => {
    onChange({
      ...value,
      mode: "emotion_vector",
      vector: vecToPresetVector(next),
    });
    if (activePresetId) setActivePresetId(null);
  };

  const resetVec = (): void => {
    setVec(clampVec(EMPTY_VEC));
  };

  const setAlpha = (next: number): void => {
    const clamped = Math.max(0, Math.min(10, Number.isFinite(next) ? next : 1));
    onChange({ ...value, emotionAlpha: clamped });
  };

  const handleSavePreset = async (): Promise<void> => {
    const trimmed = presetName.trim();
    if (!trimmed) return;
    setBusy(true);
    setError(null);
    try {
      const created = await createPreset(deploymentId, trimmed, vecToPresetVector(vec));
      if (!mounted.current) return;
      setPresets((prev) =>
        sortByRecent([created, ...prev.filter((p) => p.presetId !== created.presetId)]),
      );
      setActivePresetId(created.presetId);
      setNameTouched(false);
    } catch (err: unknown) {
      if (mounted.current) setError(describe(err));
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  const handleDeletePreset = async (presetId: string): Promise<void> => {
    const snapshot = presets;
    setPresets((prev) => prev.filter((p) => p.presetId !== presetId));
    if (activePresetId === presetId) setActivePresetId(null);
    try {
      await deletePreset(deploymentId, presetId);
    } catch (err: unknown) {
      if (mounted.current) {
        setPresets(snapshot);
        setError(describe(err));
      }
    }
  };

  const handleSelectPreset = (preset: VectorPreset): void => {
    setActivePresetId(preset.presetId);
    onChange({
      ...value,
      mode: "emotion_vector",
      vector: preset.vector,
    });
  };

  const setQwenTemplate = (template: string): void => {
    onChange({ ...value, mode: "qwen_template", qwenTemplate: template });
  };

  const dominant = dominantAxis(vec);
  const mag = magnitude(vec);
  const top = topAxes(vec, 3);
  const canSave = top.length > 0 && presetName.trim().length > 0 && !busy;
  const suggestion = suggestPresetName(vec) || "name your preset…";
  const readOnly = mode !== "emotion_vector";

  return (
    <div className={css.root}>
      <div className={css.header}>
        <span className={css.eyebrow}>Emotion mode</span>
        <div className={css.modeBar} role="radiogroup" aria-label="Emotion mode">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={mode === m.id}
              className={`${css.modeButton}${mode === m.id ? ` ${css.modeButtonActive}` : ""}`}
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {mode === "none" && (
        <div className={css.noneNotice}>
          Neutral default. Per-line <code>[Char|emotion_vector:…]</code> overrides
          still apply when present.
        </div>
      )}

      {mode === "audio_ref" && (
        <div className={css.noneNotice}>
          Audio reference uses the voice asset assigned per character. Open the cast
          section to assign references; per-character overrides take precedence.
        </div>
      )}

      {mode === "qwen_template" && (
        <div className={css.qwenColumn}>
          <textarea
            className={css.qwenInput}
            placeholder='e.g. "Friendly teen, slightly skeptical"'
            value={value.qwenTemplate ?? ""}
            onChange={(e) => setQwenTemplate(e.target.value)}
          />
          <div className={css.qwenActions}>
            <Button
              variant="secondary"
              onClick={() => {
                const prompt = (value.qwenTemplate ?? "").trim();
                if (!prompt) return;
                const mapped = mapPromptToVector(prompt);
                onChange({
                  ...value,
                  mode: "emotion_vector",
                  vector: vecToPresetVector(mapped),
                });
              }}
              disabled={!(value.qwenTemplate ?? "").trim()}
            >
              Map to vector →
            </Button>
            <span className={css.qwenHint}>
              Heuristic v1: keyword-based mapping. Switches to vector mode on success.
            </span>
          </div>
          <span className={css.qwenHint}>
            The Qwen prompt is mapped to a vector at synth time. Per-line{" "}
            <code>[Char|qwen:…]</code> overrides take precedence.
          </span>
        </div>
      )}

      {(mode === "emotion_vector" || mode === "none" || mode === "audio_ref") && (
        <div className={css.splitBody}>
          <div className={`${recipeCss.splitColumn} ${css.radarColumn}`}>
            <EttsRadar
              vec={vec}
              onChange={setVec}
              readOnly={readOnly}
            />
          </div>
          <div className={`${recipeCss.splitColumn} ${css.barsColumn}`}>
            <div className={css.dominantBlock}>
              <span className={css.eyebrow}>Dominant</span>
              <span className={css.dominantName}>
                {dominant ? AXIS_LABELS[dominant].toLowerCase() : "neutral"}
              </span>
              <span className={css.dominantMag}>‖v‖ = {mag.toFixed(2)}</span>
            </div>
            <EttsAxisBars vec={vec} onChange={setVec} readOnly={readOnly} />
            <div className={css.barsActions}>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetVec}
                disabled={readOnly || mag < 0.001}
                aria-label="Reset emotion vector"
              >
                <svg
                  className={css.resetIcon}
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  aria-hidden="true"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12a9 9 0 1 0 3-6.7L3 8"
                  />
                  <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="3 3 3 8 8 8"
                  />
                </svg>
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}

      {mode === "emotion_vector" && (
        <>
          <div className={css.alphaRow}>
            <span>
              <span className={css.alphaLabel}>Alpha</span>
              <br />
              <span className={css.alphaHint}>Global mix · per-line overrides bypass it</span>
            </span>
            <input
              type="range"
              min={0}
              max={10}
              step={0.01}
              value={alpha}
              className={css.range}
              style={{ "--fill": `${alpha * 10}%` } as React.CSSProperties}
              onChange={(e) => setAlpha(Number(e.target.value))}
              aria-label="Emotion alpha"
            />
            <span className={css.value}>{(alpha * 100).toFixed(0)}%</span>
          </div>

          <div
            className={`${css.savePreset}${top.length === 0 ? ` ${css.savePresetDisabled}` : ""}`}
          >
            <div className={css.savePresetHead}>
              <span className={css.savePresetTitle}>Save current as preset</span>
              {top.length === 0 && (
                <span className={css.savePresetHint}>adjust the radar to enable</span>
              )}
            </div>
            <div className={css.savePresetBody}>
              <div className={css.savePresetChips}>
                {top.length === 0 ? (
                  <span className={`${css.chip} ${css.chipEmpty}`}>no axes set</span>
                ) : (
                  top.map((entry) => (
                    <span key={entry.key} className={css.chip}>
                      {entry.label.toLowerCase()}
                      <b className={css.chipValue}>{entry.value.toFixed(2)}</b>
                    </span>
                  ))
                )}
              </div>
              <div className={css.savePresetForm}>
                <input
                  type="text"
                  className={css.savePresetInput}
                  placeholder={suggestion}
                  value={presetName}
                  disabled={top.length === 0 || busy}
                  onChange={(e) => {
                    setPresetName(e.target.value);
                    setNameTouched(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canSave) handleSavePreset();
                  }}
                  aria-label="Preset name"
                />
                <Button
                  variant="primary"
                  disabled={!canSave}
                  onClick={handleSavePreset}
                >
                  {busy ? "Saving…" : "+ Save"}
                </Button>
              </div>
            </div>
          </div>

          <PresetLibrary
            presets={presets}
            activePresetId={activePresetId}
            onSelect={handleSelectPreset}
            onDelete={handleDeletePreset}
          />
        </>
      )}

      {mode === "qwen_template" && (
        <div className={css.alphaRow}>
          <span className={css.alphaLabel}>Alpha</span>
          <input
            type="range"
            min={0}
            max={10}
            step={0.01}
            value={alpha}
            className={css.range}
            style={{ "--fill": `${alpha * 10}%` } as React.CSSProperties}
            onChange={(e) => setAlpha(Number(e.target.value))}
            aria-label="Emotion alpha"
          />
          <span className={css.value}>{(alpha * 100).toFixed(0)}%</span>
        </div>
      )}

      {error && <div className={css.errorBanner}>{error}</div>}
    </div>
  );
}

function normaliseVec(vector: GlobalEmotion["vector"]): EmotionVec {
  if (!vector || !Array.isArray(vector)) return clampVec(EMPTY_VEC);
  const out: EmotionVec = { ...EMPTY_VEC };
  AXIS_KEYS.forEach((key, i) => {
    const v = vector[i];
    out[key] = Number.isFinite(v) ? Math.max(0, Math.min(1, v as number)) : 0;
  });
  return out;
}

function sortByRecent(presets: VectorPreset[]): VectorPreset[] {
  return [...presets].sort((a, b) => b.updatedAt - a.updatedAt);
}

function describe(err: unknown): string {
  if (err instanceof ExtensionApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Unknown error";
}
