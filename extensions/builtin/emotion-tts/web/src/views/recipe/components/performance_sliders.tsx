import * as css from "./performance_sliders.css";

export interface PerformanceSlidersValue {
  intensity: number;
  pace: number;
  pitchSt: number;
}

export interface PerformanceSlidersProps {
  value: PerformanceSlidersValue;
  onChange: (next: PerformanceSlidersValue) => void;
}

export const PERFORMANCE_DEFAULTS: PerformanceSlidersValue = {
  intensity: 0.6,
  pace: 1.0,
  pitchSt: 0,
};

export function PerformanceSliders({ value, onChange }: PerformanceSlidersProps): JSX.Element {
  return (
    <div className={css.root}>
      <SliderRow
        label="Intensity"
        sub="How emotionally amplified each line reads"
        min={0}
        max={1}
        step={0.01}
        format={(v) => `${Math.round(v * 100)}%`}
        value={value.intensity}
        onChange={(intensity) => onChange({ ...value, intensity })}
      />
      <SliderRow
        label="Pace"
        sub="Time-stretched playback per line"
        min={0.5}
        max={2.0}
        step={0.01}
        format={(v) => `${v.toFixed(2)}×`}
        value={value.pace}
        onChange={(pace) => onChange({ ...value, pace })}
      />
      <SliderRow
        label="Pitch"
        sub="Semitone shift, duration-preserving"
        min={-12}
        max={12}
        step={0.5}
        format={(v) => `${v >= 0 ? "+" : ""}${v.toFixed(1)} st`}
        value={value.pitchSt}
        onChange={(pitchSt) => onChange({ ...value, pitchSt })}
      />
    </div>
  );
}

interface SliderRowProps {
  label: string;
  sub: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  value: number;
  onChange: (v: number) => void;
}

function SliderRow({ label, sub, min, max, step, format, value, onChange }: SliderRowProps): JSX.Element {
  const fillPct = ((value - min) / (max - min)) * 100;
  const id = `perf-${label.toLowerCase()}`;
  return (
    <div className={css.sliderRow}>
      <div className={css.labelBlock}>
        <label htmlFor={id} className={css.label}>
          {label}
        </label>
        <span className={css.sub}>{sub}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className={css.range}
        style={{ "--fill": `${fillPct}%` } as React.CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className={css.value}>{format(value)}</span>
    </div>
  );
}
