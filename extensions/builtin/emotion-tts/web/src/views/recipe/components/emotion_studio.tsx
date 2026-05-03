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
import {
  PresetLibrary,
  SavePresetComposer,
  vecToPresetVector,
} from "./save_preset_composer";
import {
  AXIS_KEYS,
  type EmotionVec,
  EMPTY_VEC,
  clampVec,
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

  const setAlpha = (next: number): void => {
    const clamped = Math.max(0, Math.min(1, Number.isFinite(next) ? next : 1));
    onChange({ ...value, emotionAlpha: clamped });
  };

  const handleSavePreset = async (name: string): Promise<void> => {
    setBusy(true);
    setError(null);
    try {
      const created = await createPreset(deploymentId, name, vecToPresetVector(vec));
      if (!mounted.current) return;
      setPresets((prev) =>
        sortByRecent([created, ...prev.filter((p) => p.presetId !== created.presetId)]),
      );
      setActivePresetId(created.presetId);
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

  return (
    <>
      <div className={`${recipeCss.splitColumn} ${css.radarColumn}`}>
        <EttsRadar
          vec={vec}
          onChange={setVec}
          readOnly={mode !== "emotion_vector"}
        />
      </div>
      <div className={recipeCss.splitColumn}>
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

        {mode === "none" && (
          <div className={css.noneNotice}>
            Neutral default. Per-line <code>[Char|emotion_vector:…]</code> overrides
            still apply when present.
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
                max={1}
                step={0.01}
                value={alpha}
                className={css.range}
                style={{ "--fill": `${alpha * 100}%` } as React.CSSProperties}
                onChange={(e) => setAlpha(Number(e.target.value))}
                aria-label="Emotion alpha"
              />
              <span className={css.value}>{(alpha * 100).toFixed(0)}%</span>
            </div>
            <SavePresetComposer
              vec={vec}
              onSave={handleSavePreset}
              saving={busy}
            />
            <PresetLibrary
              presets={presets}
              activePresetId={activePresetId}
              onSelect={handleSelectPreset}
              onDelete={handleDeletePreset}
            />
          </>
        )}

        {mode === "qwen_template" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <textarea
              className={css.qwenInput}
              placeholder='e.g. "Friendly teen, slightly skeptical"'
              value={value.qwenTemplate ?? ""}
              onChange={(e) => setQwenTemplate(e.target.value)}
            />
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
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
            <div className={css.alphaRow}>
              <span className={css.alphaLabel}>Alpha</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={alpha}
                className={css.range}
                style={{ "--fill": `${alpha * 100}%` } as React.CSSProperties}
                onChange={(e) => setAlpha(Number(e.target.value))}
                aria-label="Emotion alpha"
              />
              <span className={css.value}>{(alpha * 100).toFixed(0)}%</span>
            </div>
          </div>
        )}

        {mode === "audio_ref" && (
          <div className={css.noneNotice}>
            Audio reference uses the voice asset assigned per character. Open the cast
            section to assign references; per-character overrides take precedence.
          </div>
        )}

        {error && <div className={css.errorBanner}>{error}</div>}
      </div>
    </>
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

