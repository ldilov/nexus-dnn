import { type ReactElement, useState } from "react";
import {
  FLF2V_PRESET_SECONDS,
  LENGTH_OPTIONS_SECONDS,
  actualSeconds,
  deriveLengthPlan,
  flf2vFramesForSeconds,
  flf2vMaxSeconds,
  flf2vSeconds,
  flf2vSummary,
  lengthSummary,
  matchLengthOption,
  segmentDefaults,
} from "../../../domain/length";
import { isFlf2vMode } from "../../../domain/validation";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./quick_controls.css";

export function LengthControl(): ReactElement {
  const { presetId, params } = useRenderRequest();
  if (isFlf2vMode(presetId, params)) {
    return <Flf2vLengthControl />;
  }
  return <ChainedLengthControl />;
}

function segmentClass(active: boolean): string {
  return [styles.segment, active ? styles.segmentActive : ""].filter(Boolean).join(" ");
}

function ChainedLengthControl(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  const defaults = segmentDefaults(params);
  const selection = matchLengthOption(params.num_clips ?? 1, defaults);
  const [seconds, setSeconds] = useState(() =>
    Number(actualSeconds(params.num_clips ?? 1, defaults).toFixed(1)),
  );

  const applySeconds = (value: number): void => {
    const plan = deriveLengthPlan(value, defaults);
    updateParam("num_clips", plan.numClips);
    updateParam("frames_per_clip", plan.framesPerClip);
  };

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel} id="svi2-length-label">
        Length
      </span>
      <div className={styles.controlRow}>
        <div className={styles.segmentWrap} role="radiogroup" aria-labelledby="svi2-length-label">
          {LENGTH_OPTIONS_SECONDS.map((preset) => {
            const isSelected = selection === preset;
            return (
              <button
                key={preset}
                type="button"
                // biome-ignore lint/a11y/useSemanticElements: segmented radiogroup
                role="radio"
                aria-checked={isSelected}
                className={segmentClass(isSelected)}
                onClick={() => {
                  setSeconds(preset);
                  applySeconds(preset);
                }}
              >
                {preset}s
              </button>
            );
          })}
        </div>
        <div className={styles.secondsWrap}>
          <input
            type="number"
            inputMode="numeric"
            aria-label="Length in seconds"
            className={styles.secondsInput}
            min={1}
            max={600}
            step={1}
            value={seconds}
            onChange={(e) => {
              const value = Number(e.target.value);
              setSeconds(value);
              if (Number.isFinite(value) && value >= 1 && value <= 600) {
                applySeconds(value);
              }
            }}
          />
          <span className={styles.secondsSuffix}>sec</span>
        </div>
      </div>
      <output className={styles.summary} aria-live="polite">
        {lengthSummary(params)}
      </output>
    </div>
  );
}

function Flf2vLengthControl(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  const defaults = segmentDefaults(params);
  const maxSeconds = flf2vMaxSeconds(defaults.fps);
  const [seconds, setSeconds] = useState(() => Number(flf2vSeconds(params).toFixed(1)));

  const presets = FLF2V_PRESET_SECONDS.filter((preset) => preset <= maxSeconds);

  const applySeconds = (value: number): void => {
    const clamped = Math.min(maxSeconds, Math.max(1, value));
    if (params.num_clips !== 1) updateParam("num_clips", 1);
    updateParam("frames_per_clip", flf2vFramesForSeconds(clamped, defaults.fps));
  };

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel} id="svi2-length-label">
        Length
      </span>
      <div className={styles.controlRow}>
        <div className={styles.segmentWrap} role="radiogroup" aria-labelledby="svi2-length-label">
          {presets.length > 0 ? (
            presets.map((preset) => {
              const isSelected =
                flf2vFramesForSeconds(preset, defaults.fps) === defaults.framesPerClip;
              return (
                <button
                  key={preset}
                  type="button"
                  // biome-ignore lint/a11y/useSemanticElements: segmented radiogroup
                  role="radio"
                  aria-checked={isSelected}
                  className={segmentClass(isSelected)}
                  onClick={() => {
                    setSeconds(preset);
                    applySeconds(preset);
                  }}
                >
                  {preset}s
                </button>
              );
            })
          ) : (
            <span className={styles.segment} aria-hidden="true">
              1–{maxSeconds}s
            </span>
          )}
        </div>
        <div className={styles.secondsWrap}>
          <input
            type="number"
            inputMode="numeric"
            aria-label="Morph length in seconds"
            className={styles.secondsInput}
            min={1}
            max={maxSeconds}
            step={0.5}
            value={seconds}
            onChange={(e) => {
              const value = Number(e.target.value);
              setSeconds(value);
              if (Number.isFinite(value) && value > 0) {
                applySeconds(value);
              }
            }}
          />
          <span className={styles.secondsSuffix}>sec</span>
        </div>
        <span className={styles.hint}>
          1–{maxSeconds}s morph · single clip, frames = {defaults.fps} fps × seconds (4n+1)
        </span>
      </div>
      <output className={styles.summary} aria-live="polite">
        {flf2vSummary(params)}
      </output>
    </div>
  );
}
