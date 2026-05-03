import type { CSSProperties } from "react";
import { Button } from "../../../components/button";
import * as css from "./speed_control.css";

export type SpeedMode = "audio" | "synth";

export interface SpeedControlProps {
  mode: SpeedMode;
  value: number;
  supportsSynthSpeed: boolean;
  onChange: (mode: SpeedMode, value: number) => void;
  onReRenderAtSynthTime?: () => void;
  disabled?: boolean;
}

const SPEED_MIN = 0.5;
const SPEED_MAX = 2.0;
const SPEED_STEP = 0.05;

export function SpeedControl(props: SpeedControlProps): JSX.Element {
  const { mode, value, supportsSynthSpeed, onChange, onReRenderAtSynthTime, disabled } = props;
  const fillPct = ((value - SPEED_MIN) / (SPEED_MAX - SPEED_MIN)) * 100;
  const id = "speed-slider";

  const setMode = (next: SpeedMode) => onChange(next, value);
  const setValue = (next: number) => onChange(mode, next);

  return (
    <div className={css.root}>
      {supportsSynthSpeed ? (
        <div className={css.segmentedRow} role="group" aria-label="Speed mode">
          <button
            type="button"
            className={css.segmentButton}
            data-active={mode === "audio"}
            onClick={() => setMode("audio")}
            disabled={disabled}
          >
            Audio
          </button>
          <button
            type="button"
            className={css.segmentButton}
            data-active={mode === "synth"}
            onClick={() => setMode("synth")}
            disabled={disabled}
          >
            Synth
          </button>
        </div>
      ) : null}

      <div className={css.sliderRow}>
        <input
          id={id}
          type="range"
          min={SPEED_MIN}
          max={SPEED_MAX}
          step={SPEED_STEP}
          value={value}
          disabled={disabled}
          className={css.range}
          style={{ "--fill": `${fillPct}%` } as CSSProperties}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-valuemin={SPEED_MIN}
          aria-valuemax={SPEED_MAX}
          aria-valuenow={value}
          aria-label="Speed factor"
        />
        <span className={css.value}>{`${value.toFixed(2)}×`}</span>
      </div>

      {mode === "synth" && supportsSynthSpeed ? (
        <div className={css.reRenderRow}>
          <Button
            variant="primary"
            size="sm"
            onClick={onReRenderAtSynthTime}
            disabled={disabled || !onReRenderAtSynthTime}
          >
            Re-render at synth-time
          </Button>
          <span className={css.hint}>Synth-time speed re-runs the worker for new utterances.</span>
        </div>
      ) : null}
    </div>
  );
}
