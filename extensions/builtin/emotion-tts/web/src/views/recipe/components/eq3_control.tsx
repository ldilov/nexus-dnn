import type { CSSProperties } from "react";
import { EQ3_PRESETS, type Eq3PresetKey } from "../lib/slider_chain";
import * as css from "./eq3_control.css";

export interface Eq3ControlProps {
  low: number;
  mid: number;
  high: number;
  preset: Eq3PresetKey | "custom";
  onChange: (low: number, mid: number, high: number, preset: Eq3PresetKey | "custom") => void;
  disabled?: boolean;
}

const PRESET_KEYS: Eq3PresetKey[] = ["flat", "warm", "bright", "voice", "telephone"];
const BAND_MIN = -12;
const BAND_MAX = 12;
const BAND_STEP = 0.5;

export function Eq3Control(props: Eq3ControlProps): JSX.Element {
  const { low, mid, high, preset, onChange, disabled } = props;

  const selectPreset = (key: Eq3PresetKey) => {
    const p = EQ3_PRESETS[key];
    onChange(p.low, p.mid, p.high, key);
  };

  const updateBand = (band: "low" | "mid" | "high", value: number) => {
    const next = { low, mid, high, [band]: value } as { low: number; mid: number; high: number };
    const matched = matchPreset(next.low, next.mid, next.high);
    onChange(next.low, next.mid, next.high, matched);
  };

  return (
    <div className={css.root}>
      <div className={css.presetRow} role="group" aria-label="EQ presets">
        {PRESET_KEYS.map((key) => (
          <button
            key={key}
            type="button"
            className={css.presetChip}
            data-active={preset === key}
            onClick={() => selectPreset(key)}
            disabled={disabled}
          >
            {key}
          </button>
        ))}
        {preset === "custom" ? <span className={css.customLabel}>custom</span> : null}
      </div>

      <div className={css.sliderGrid}>
        <BandSlider
          label="Low"
          value={low}
          onChange={(v) => updateBand("low", v)}
          disabled={disabled}
        />
        <BandSlider
          label="Mid"
          value={mid}
          onChange={(v) => updateBand("mid", v)}
          disabled={disabled}
        />
        <BandSlider
          label="High"
          value={high}
          onChange={(v) => updateBand("high", v)}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

interface BandSliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean | undefined;
}

function BandSlider({ label, value, onChange, disabled }: BandSliderProps): JSX.Element {
  const fillPct = ((value - BAND_MIN) / (BAND_MAX - BAND_MIN)) * 100;
  const id = `eq3-${label.toLowerCase()}`;
  return (
    <div className={css.bandColumn}>
      <label htmlFor={id} className={css.bandLabel}>
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={BAND_MIN}
        max={BAND_MAX}
        step={BAND_STEP}
        value={value}
        disabled={disabled}
        className={css.verticalSlider}
        style={{ "--fill": `${fillPct}%` } as CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={BAND_MIN}
        aria-valuemax={BAND_MAX}
        aria-valuenow={value}
      />
      <span className={css.bandValue}>{formatDb(value)}</span>
      <span className={css.tickLabels} aria-hidden="true">
        <span>{BAND_MIN}</span>
        <span>0</span>
        <span>+{BAND_MAX}</span>
      </span>
    </div>
  );
}

function formatDb(v: number): string {
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(1)} dB`;
}

const EPSILON = 1e-3;

function matchPreset(low: number, mid: number, high: number): Eq3PresetKey | "custom" {
  for (const key of PRESET_KEYS) {
    const p = EQ3_PRESETS[key];
    if (
      Math.abs(p.low - low) < EPSILON &&
      Math.abs(p.mid - mid) < EPSILON &&
      Math.abs(p.high - high) < EPSILON
    ) {
      return key;
    }
  }
  return "custom";
}
