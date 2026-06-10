import { type ReactElement, useState } from "react";
import {
  CUSTOM_LENGTH,
  LENGTH_OPTIONS_SECONDS,
  deriveNumClips,
  lengthSummary,
  matchLengthOption,
  segmentDefaults,
} from "../../../domain/length";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./quick_controls.css";

export function LengthControl(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  const defaults = segmentDefaults(params);
  const selection = matchLengthOption(params.num_clips ?? 1, defaults);
  const [customSeconds, setCustomSeconds] = useState(60);
  const [customMode, setCustomMode] = useState(false);
  const isCustom = customMode || selection === CUSTOM_LENGTH;

  const applySeconds = (seconds: number): void => {
    updateParam("num_clips", deriveNumClips(seconds, defaults));
  };

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel} id="svi2-length-label">
        Length
      </span>
      <div className={styles.chipRow} role="radiogroup" aria-labelledby="svi2-length-label">
        {LENGTH_OPTIONS_SECONDS.map((seconds) => {
          const isSelected = !isCustom && selection === seconds;
          return (
            <button
              key={seconds}
              type="button"
              // biome-ignore lint/a11y/useSemanticElements: chip radiogroup
              role="radio"
              aria-checked={isSelected}
              className={[styles.chip, isSelected ? styles.chipSelected : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                setCustomMode(false);
                applySeconds(seconds);
              }}
            >
              {seconds}s
            </button>
          );
        })}
        <button
          type="button"
          // biome-ignore lint/a11y/useSemanticElements: chip radiogroup
          role="radio"
          aria-checked={isCustom}
          className={[styles.chip, isCustom ? styles.chipSelected : ""].filter(Boolean).join(" ")}
          onClick={() => setCustomMode(true)}
        >
          Custom
        </button>
      </div>
      {isCustom && (
        <div className={styles.customRow}>
          <input
            type="number"
            inputMode="numeric"
            aria-label="Custom length in seconds"
            className={styles.customInput}
            min={1}
            max={600}
            value={customSeconds}
            onChange={(e) => {
              const seconds = Number(e.target.value);
              setCustomSeconds(seconds);
              if (Number.isFinite(seconds) && seconds >= 1 && seconds <= 600) {
                applySeconds(seconds);
              }
            }}
          />
          <span className={styles.hint}>seconds (1–600)</span>
        </div>
      )}
      <output className={styles.summary} aria-live="polite">
        {lengthSummary(params)}
      </output>
    </div>
  );
}
