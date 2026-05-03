import { useId, type CSSProperties } from "react";
import { Button } from "../../../components/button";
import {
  IDENTITY_SLIDER_STATE,
  type DirectModSliderState,
  type NormalizeSliderState,
} from "../lib/slider_chain";
import { Eq3Control } from "./eq3_control";
import { SpeedControl } from "./speed_control";
import * as css from "./direct_mod_slider_strip.css";

export interface DirectModSliderStripProps {
  state: DirectModSliderState;
  onChange: (next: DirectModSliderState) => void;
  supportsSynthSpeed: boolean;
  onReRenderAtSynthTime?: () => void;
  onSliderFlush?: () => void;
  pendingExecution?: boolean;
  reduceMotion?: boolean;
  disabled?: boolean;
  onApply?: () => void;
  applyLabel?: string;
}

const VOLUME_MIN = -24, VOLUME_MAX = 24, VOLUME_STEP = 0.5;
const PITCH_MIN = -12, PITCH_MAX = 12, PITCH_STEP = 0.5;
const NORMALIZE_LUFS_MIN = -30, NORMALIZE_LUFS_MAX = -6;
const NORMALIZE_PEAK_MIN = -12, NORMALIZE_PEAK_MAX = 0;
const SILENCE_MIN = -60, SILENCE_MAX = -20;

export function DirectModSliderStrip(props: DirectModSliderStripProps): JSX.Element {
  const {
    state,
    onChange,
    supportsSynthSpeed,
    onReRenderAtSynthTime,
    onSliderFlush,
    pendingExecution = false,
    disabled = false,
    onApply,
    applyLabel = "Apply edit",
  } = props;

  const update = (patch: Partial<DirectModSliderState>) => {
    onChange({ ...state, ...patch });
  };

  const activeOps = computeActiveOps(state);

  const handlePointerDownCapture = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "BUTTON" ||
      target.closest("input, button")
    ) {
      onSliderFlush?.();
    }
  };

  return (
    <div className={css.root} onPointerDownCapture={handlePointerDownCapture}>
      <div className={css.summaryRow}>
        {activeOps.length === 0 ? (
          <span className={css.summaryEmpty}>No active edits</span>
        ) : (
          <span className={css.summaryChip}>
            <span aria-hidden="true">Active:</span>
            <span>{activeOps.join(" · ")}</span>
          </span>
        )}
        {pendingExecution ? (
          <span className={css.summaryChip} aria-live="polite">
            <span className={css.pendingDot} aria-hidden="true" />
            Re-rendering
          </span>
        ) : null}
      </div>

      <SliderGroup
        label="Volume"
        sub="Pre-mix gain in dB"
        min={VOLUME_MIN}
        max={VOLUME_MAX}
        step={VOLUME_STEP}
        format={formatDb}
        value={state.volumeDb}
        onChange={(v) => update({ volumeDb: v })}
        disabled={disabled}
      />

      <div className={css.subSection}>
        <span className={css.subSectionTitle}>3-band EQ</span>
        <Eq3Control
          low={state.eq3.low}
          mid={state.eq3.mid}
          high={state.eq3.high}
          preset={state.eq3.preset}
          disabled={disabled}
          onChange={(low, mid, high, preset) =>
            update({ eq3: { low, mid, high, preset } })
          }
        />
      </div>

      <div className={css.subSection}>
        <span className={css.subSectionTitle}>Speed</span>
        <SpeedControl
          mode={state.speed.mode}
          value={state.speed.value}
          supportsSynthSpeed={supportsSynthSpeed}
          {...(onReRenderAtSynthTime ? { onReRenderAtSynthTime } : {})}
          disabled={disabled}
          onChange={(mode, value) => update({ speed: { mode, value } })}
        />
      </div>

      <SliderGroup
        label="Pitch"
        sub="Semitone shift, duration-preserving"
        min={PITCH_MIN}
        max={PITCH_MAX}
        step={PITCH_STEP}
        format={formatSemitones}
        value={state.pitchSt}
        onChange={(v) => update({ pitchSt: v })}
        disabled={disabled}
      />

      <NormalizeSection
        normalize={state.normalize}
        disabled={disabled}
        onChange={(next) => update({ normalize: next })}
      />

      <FadeSection
        inS={state.fade.inS}
        outS={state.fade.outS}
        disabled={disabled}
        onChange={(inS, outS) => update({ fade: { ...state.fade, inS, outS } })}
      />

      <SilenceSection
        enabled={state.silence.enabled}
        thresholdDb={state.silence.thresholdDb}
        disabled={disabled}
        onChange={(enabled, thresholdDb) => update({ silence: { enabled, thresholdDb } })}
      />

      {onApply ? (
        <div className={css.applyRow}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(IDENTITY_SLIDER_STATE)}
            disabled={disabled}
          >
            Reset
          </Button>
          <Button variant="primary" size="md" onClick={onApply} disabled={disabled}>
            {applyLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

interface SliderGroupProps {
  label: string;
  sub: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}

function SliderGroup(props: SliderGroupProps): JSX.Element {
  const { label, sub, min, max, step, format, value, onChange, disabled } = props;
  const fillPct = ((value - min) / (max - min)) * 100;
  const id = useId();
  return (
    <div className={css.groupGrid}>
      <div className={css.groupBlock}>
        <label htmlFor={id} className={css.groupLabel}>
          {label}
        </label>
        <span className={css.groupSub}>{sub}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        className={css.range}
        style={{ "--fill": `${fillPct}%` } as CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <span className={css.groupValue}>{format(value)}</span>
    </div>
  );
}

interface NormalizeSectionProps {
  normalize: NormalizeSliderState;
  onChange: (next: NormalizeSliderState) => void;
  disabled?: boolean;
}

function NormalizeSection({ normalize, onChange, disabled }: NormalizeSectionProps): JSX.Element {
  const isLoudness = normalize.mode === "loudness";
  const range = isLoudness
    ? { min: NORMALIZE_LUFS_MIN, max: NORMALIZE_LUFS_MAX, step: 0.5, suffix: "LUFS" }
    : { min: NORMALIZE_PEAK_MIN, max: NORMALIZE_PEAK_MAX, step: 0.5, suffix: "dB" };
  const target = clamp(normalize.targetDbOrLufs, range.min, range.max);
  const fillPct = ((target - range.min) / (range.max - range.min)) * 100;

  const setMode = (mode: NormalizeSliderState["mode"]) => {
    if (mode === "off") {
      onChange({ mode, targetDbOrLufs: normalize.targetDbOrLufs });
      return;
    }
    if (mode === "peak") {
      onChange({ mode, targetDbOrLufs: -1.0 });
      return;
    }
    onChange({ mode, targetDbOrLufs: -16.0 });
  };

  return (
    <div className={css.subSection}>
      <span className={css.subSectionTitle}>Normalize</span>
      <div className={css.radioRow} role="group" aria-label="Normalize mode">
        {(["off", "peak", "loudness"] as const).map((mode) => {
          const peakUnsupported = mode === "peak";
          return (
            <button
              key={mode}
              type="button"
              className={css.radioChip}
              data-active={normalize.mode === mode}
              disabled={disabled || peakUnsupported}
              onClick={() => setMode(mode)}
              title={
                peakUnsupported
                  ? "Peak normalize is not yet supported by the worker. Use Loudness (LUFS) instead."
                  : undefined
              }
            >
              {mode}
              {peakUnsupported ? " (soon)" : ""}
            </button>
          );
        })}
      </div>
      {normalize.mode !== "off" ? (
        <div className={css.groupGrid}>
          <span className={css.groupSub}>Target</span>
          <input
            type="range"
            min={range.min}
            max={range.max}
            step={range.step}
            value={target}
            disabled={disabled}
            className={css.range}
            style={{ "--fill": `${fillPct}%` } as CSSProperties}
            onChange={(e) =>
              onChange({ mode: normalize.mode, targetDbOrLufs: Number(e.target.value) })
            }
            aria-valuemin={range.min}
            aria-valuemax={range.max}
            aria-valuenow={target}
            aria-label={`Normalize target ${range.suffix}`}
          />
          <span className={css.groupValue}>
            {target.toFixed(1)} {range.suffix}
          </span>
        </div>
      ) : null}
    </div>
  );
}

interface FadeSectionProps {
  inS: number;
  outS: number;
  onChange: (inS: number, outS: number) => void;
  disabled?: boolean;
}

function FadeSection({ inS, outS, onChange, disabled }: FadeSectionProps): JSX.Element {
  const inId = useId();
  const outId = useId();
  return (
    <div className={css.subSection}>
      <span className={css.subSectionTitle}>Fade</span>
      <div className={css.fadeRow}>
        <div className={css.fadeField}>
          <label className={css.fadeLabel} htmlFor={inId}>
            Fade in (s)
          </label>
          <input
            id={inId}
            type="number"
            min={0}
            step={0.05}
            value={inS}
            disabled={disabled}
            className={css.fadeInput}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value)), outS)}
          />
        </div>
        <div className={css.fadeField}>
          <label className={css.fadeLabel} htmlFor={outId}>
            Fade out (s)
          </label>
          <input
            id={outId}
            type="number"
            min={0}
            step={0.05}
            value={outS}
            disabled={disabled}
            className={css.fadeInput}
            onChange={(e) => onChange(inS, Math.max(0, Number(e.target.value)))}
          />
        </div>
      </div>
    </div>
  );
}

interface SilenceSectionProps {
  enabled: boolean;
  thresholdDb: number;
  onChange: (enabled: boolean, thresholdDb: number) => void;
  disabled?: boolean;
}

function SilenceSection({ enabled, thresholdDb, onChange, disabled }: SilenceSectionProps): JSX.Element {
  const fillPct = ((thresholdDb - SILENCE_MIN) / (SILENCE_MAX - SILENCE_MIN)) * 100;
  return (
    <div className={css.subSection}>
      <span className={css.subSectionTitle}>Silence trim</span>
      <div className={css.silenceRow}>
        <label className={css.checkboxLabel}>
          <input
            type="checkbox"
            checked={enabled}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked, thresholdDb)}
          />
          Enabled
        </label>
        <input
          type="range"
          min={SILENCE_MIN}
          max={SILENCE_MAX}
          step={1}
          value={thresholdDb}
          disabled={disabled || !enabled}
          className={css.range}
          style={{ "--fill": `${fillPct}%`, flex: 1 } as CSSProperties}
          onChange={(e) => onChange(enabled, Number(e.target.value))}
          aria-valuemin={SILENCE_MIN}
          aria-valuemax={SILENCE_MAX}
          aria-valuenow={thresholdDb}
          aria-label="Silence threshold dB"
        />
        <span className={css.groupValue}>{thresholdDb.toFixed(0)} dB</span>
      </div>
    </div>
  );
}

const EPSILON = 1e-3;

function computeActiveOps(state: DirectModSliderState): string[] {
  const ops: string[] = [];
  if (Math.abs(state.volumeDb) >= EPSILON) ops.push("gain");
  if (
    Math.abs(state.eq3.low) >= EPSILON ||
    Math.abs(state.eq3.mid) >= EPSILON ||
    Math.abs(state.eq3.high) >= EPSILON
  ) {
    ops.push("eq3");
  }
  if (state.speed.mode === "audio" && Math.abs(state.speed.value - 1.0) >= EPSILON) {
    ops.push("speed");
  }
  if (Math.abs(state.pitchSt) >= EPSILON) ops.push("pitch");
  if (state.normalize.mode !== "off") ops.push("normalize");
  if (state.fade.inS > 0) ops.push("fade-in");
  if (state.fade.outS > 0) ops.push("fade-out");
  if (state.silence.enabled) ops.push("silence");
  return ops;
}

function formatDb(v: number): string {
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(1)} dB`;
}

function formatSemitones(v: number): string {
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(1)} st`;
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}
