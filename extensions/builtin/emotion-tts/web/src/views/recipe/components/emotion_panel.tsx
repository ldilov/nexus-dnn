import type { EmotionMode, GlobalEmotion } from "../../../services/types";
import * as css from "../recipe.css";
import { EmotionRadar } from "./emotion_radar";

const VECTOR_KEYS = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm",
] as const;

type VectorKey = (typeof VECTOR_KEYS)[number];

interface Props {
  value: GlobalEmotion;
  onChange: (next: GlobalEmotion) => void;
}

export function EmotionPanel({ value, onChange }: Props): JSX.Element {
  const mode = value.mode ?? "none";
  const vector = value.vector ?? (new Array(8).fill(0) as GlobalEmotion["vector"]);

  const setMode = (next: EmotionMode): void => {
    onChange({ ...value, mode: next });
  };

  const setAxis = (index: number, next: number): void => {
    const current = [...(vector ?? new Array(8).fill(0))] as [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
    ];
    current[index] = Math.max(0, Math.min(1, next));
    onChange({ ...value, mode: "emotion_vector", vector: current });
  };

  return (
    <div>
      <div className={css.controlRow} role="radiogroup" aria-label="Emotion source">
        {(["none", "audio_ref", "emotion_vector", "qwen_template"] as EmotionMode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            className={mode === m ? css.primaryButton : css.secondaryButton}
            onClick={() => setMode(m)}
          >
            {modeLabel(m)}
          </button>
        ))}
      </div>

      {mode === "emotion_vector" && (
        <div>
          <EmotionRadar vector={vector ?? (new Array(8).fill(0) as never)} />
          <div>
            {VECTOR_KEYS.map((key, idx) => (
              <label key={key} className={css.controlRow}>
                <span className={css.label}>{key}</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={(vector ?? [])[idx] ?? 0}
                  onChange={(e) => setAxis(idx, Number(e.currentTarget.value))}
                />
                <output>{((vector ?? [])[idx] ?? 0).toFixed(2)}</output>
              </label>
            ))}
          </div>
        </div>
      )}

      {mode === "qwen_template" && (
        <label>
          <span className={css.label}>Qwen template (use {"{seg}"} for the line text)</span>
          <textarea
            value={value.qwenTemplate ?? ""}
            onChange={(e) =>
              onChange({ ...value, mode: "qwen_template", qwenTemplate: e.currentTarget.value })
            }
            rows={3}
            className={css.scriptTextarea}
          />
        </label>
      )}

      {mode === "audio_ref" && (
        <p className={css.label}>Attach a voice-asset reference in the mapping editor.</p>
      )}
    </div>
  );
}

function modeLabel(mode: VectorLike): string {
  switch (mode) {
    case "none":
      return "None";
    case "audio_ref":
      return "Audio ref";
    case "emotion_vector":
      return "Vector";
    case "qwen_template":
      return "Qwen";
  }
}

type VectorLike = EmotionMode;
