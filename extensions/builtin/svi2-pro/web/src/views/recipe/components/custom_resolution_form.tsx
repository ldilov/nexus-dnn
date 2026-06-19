import { type ReactElement, useEffect, useState } from "react";
import {
  ASPECT_PRESETS,
  type Dimensions,
  MAX_DIM,
  MIN_DIM,
  describeResolution,
  fitAspectToBudget,
  matchAspectPreset,
  pixelCount,
  snapDim,
  snapDimensions,
  stepDim,
  swapDimensions,
} from "../../../domain/custom_resolution";
import * as styles from "./quick_controls.css";

interface CustomResolutionFormProps {
  width: number;
  height: number;
  onChange: (dims: Dimensions) => void;
}

function SwapIcon(): ReactElement {
  return (
    <svg viewBox="0 0 20 20" width="100%" height="100%" fill="none" aria-hidden="true">
      <title>swap</title>
      <path
        d="M6.5 3.5L3.5 6.5l3 3M3.5 6.5h9M13.5 16.5l3-3-3-3M16.5 13.5h-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface DimStepperProps {
  id: string;
  label: string;
  value: number;
  draft: string;
  onDraft: (text: string) => void;
  onCommit: (value: number) => void;
  onStep: (direction: 1 | -1) => void;
}

function DimStepper({
  id,
  label,
  value,
  draft,
  onDraft,
  onCommit,
  onStep,
}: DimStepperProps): ReactElement {
  return (
    <div className={styles.dimField}>
      <label className={styles.dimLabel} htmlFor={id}>
        {label}
      </label>
      <div className={styles.stepperWrap}>
        <button
          type="button"
          className={styles.stepBtn}
          aria-label={`Decrease ${label} by 16`}
          disabled={value <= MIN_DIM}
          onClick={() => onStep(-1)}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          className={styles.dimInput}
          aria-label={label}
          min={MIN_DIM}
          max={MAX_DIM}
          step={16}
          value={draft}
          onChange={(e) => onDraft(e.target.value)}
          onBlur={(e) => onCommit(Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onCommit(Number((e.target as HTMLInputElement).value));
            }
          }}
        />
        <button
          type="button"
          className={styles.stepBtn}
          aria-label={`Increase ${label} by 16`}
          disabled={value >= MAX_DIM}
          onClick={() => onStep(1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function CustomResolutionForm({
  width,
  height,
  onChange,
}: CustomResolutionFormProps): ReactElement {
  const [widthDraft, setWidthDraft] = useState(() => String(width));
  const [heightDraft, setHeightDraft] = useState(() => String(height));

  // Mirror external param changes (preset clicks, swap, aspect refit) back into
  // the text inputs so the draft never diverges from the committed dimensions.
  useEffect(() => {
    setWidthDraft(String(width));
  }, [width]);
  useEffect(() => {
    setHeightDraft(String(height));
  }, [height]);

  const dims: Dimensions = { width, height };
  const summary = describeResolution(dims);
  const activeAspect = matchAspectPreset(dims);

  const commitWidth = (raw: number): void => {
    const snapped = snapDim(raw);
    setWidthDraft(String(snapped));
    if (snapped !== width) onChange({ width: snapped, height });
  };

  const commitHeight = (raw: number): void => {
    const snapped = snapDim(raw);
    setHeightDraft(String(snapped));
    if (snapped !== height) onChange({ width, height: snapped });
  };

  const stepWidth = (direction: 1 | -1): void => {
    onChange({ width: stepDim(width, direction), height });
  };

  const stepHeight = (direction: 1 | -1): void => {
    onChange({ width, height: stepDim(height, direction) });
  };

  const swap = (): void => onChange(swapDimensions(dims));

  const applyAspect = (arW: number, arH: number): void => {
    // "Same pixel count, different aspect" — refit the current budget to the
    // chosen ratio so swapping shape keeps the render cost roughly constant.
    onChange(fitAspectToBudget(arW, arH, pixelCount(dims)));
  };

  return (
    <div className={styles.customForm}>
      <div className={styles.dimRow}>
        <DimStepper
          id="svi2-custom-width"
          label="Width"
          value={width}
          draft={widthDraft}
          onDraft={setWidthDraft}
          onCommit={commitWidth}
          onStep={stepWidth}
        />
        <span className={styles.dimTimes} aria-hidden="true">
          ×
        </span>
        <DimStepper
          id="svi2-custom-height"
          label="Height"
          value={height}
          draft={heightDraft}
          onDraft={setHeightDraft}
          onCommit={commitHeight}
          onStep={stepHeight}
        />
        <button
          type="button"
          className={styles.swapBtn}
          onClick={swap}
          title="Reverse the aspect ratio — swap width and height at the same pixel count"
        >
          <span className={styles.swapIcon}>
            <SwapIcon />
          </span>
          Swap
        </button>
      </div>

      <div className={styles.aspectRow}>
        <span className={styles.dimLabel}>Aspect ratio · same pixel budget</span>
        <div
          className={styles.aspectChips}
          // biome-ignore lint/a11y/useSemanticElements: action chips, not a form fieldset
          role="group"
          aria-label="Aspect ratio presets"
        >
          {ASPECT_PRESETS.map((preset) => {
            const isActive = activeAspect === preset.id;
            const cls = [styles.aspectChip, isActive ? styles.aspectChipActive : ""]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={preset.id}
                type="button"
                className={cls}
                aria-pressed={isActive}
                onClick={() => applyAspect(preset.w, preset.h)}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <output className={styles.customReadout} aria-live="polite">
        {snapDimensions(width, height).width}×{snapDimensions(width, height).height}
        <span className={styles.readoutDot}>·</span>
        {summary.megapixels} MP
        <span className={styles.readoutDot}>·</span>
        {summary.aspect} {summary.orientation}
        <span className={styles.readoutDot}>·</span>
        {summary.budgetPct}% of 480p budget
      </output>
    </div>
  );
}
