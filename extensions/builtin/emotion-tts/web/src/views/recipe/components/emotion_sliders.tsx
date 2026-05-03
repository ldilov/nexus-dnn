import type { EmotionVector } from "../../../services/presets_client";
import * as css from "./emotion_panel.css";

const AXIS_LABELS: readonly string[] = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm",
];

interface Props {
  vector: EmotionVector;
  onChange: (next: EmotionVector) => void;
  disabled?: boolean;
}

export function EmotionSliders({ vector, onChange, disabled = false }: Props): JSX.Element {
  const setAxis = (index: number, next: number): void => {
    const clamped = Math.max(0, Math.min(1, Number.isFinite(next) ? next : 0));
    const copy = [...vector] as EmotionVector;
    copy[index] = clamped;
    onChange(copy);
  };

  return (
    <fieldset className={css.sliderGrid} aria-label="Emotion axes">
      {AXIS_LABELS.map((key, idx) => (
        <div key={key} className={css.sliderRow}>
          <label htmlFor={`emo-slider-${idx}`} className={css.sliderLabel}>
            {key}
          </label>
          <input
            id={`emo-slider-${idx}`}
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={vector[idx] ?? 0}
            disabled={disabled}
            onChange={(e) => setAxis(idx, Number(e.currentTarget.value))}
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={vector[idx] ?? 0}
            className={css.slider}
          />
          <input
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={Number((vector[idx] ?? 0).toFixed(2))}
            disabled={disabled}
            onChange={(e) => setAxis(idx, Number(e.currentTarget.value))}
            className={css.sliderNumber}
            aria-label={`${key} numeric value`}
          />
        </div>
      ))}
    </fieldset>
  );
}
