import { useId, type ChangeEvent } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import * as css from "./gpu_layers_slider.css";

export interface GpuLayersSliderProps {
  value: number;
  max: number;
  layerCountKnown: boolean;
  onChange: (n: number) => void;
}

function computeReadout(
  value: number,
  max: number,
  layerCountKnown: boolean,
): { primary: string; suffix?: string } {
  if (value === max) {
    return { primary: "max" };
  }
  if (value === 0) {
    return { primary: "CPU" };
  }
  if (layerCountKnown) {
    return { primary: String(value), suffix: `of ${max} layers` };
  }
  return { primary: String(value), suffix: "layers" };
}

function GpuLayersSlider({
  value,
  max,
  layerCountKnown,
  onChange,
}: GpuLayersSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const inputId = useId();
  const hintId = useId();

  const safeMax = Math.max(1, max);
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const percent = (clamped / safeMax) * 100;

  const readout = computeReadout(clamped, safeMax, layerCountKnown);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const next = Number.parseInt(event.target.value, 10);
    if (Number.isFinite(next)) {
      onChange(next);
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className={css.wrapper}>
        <label htmlFor={inputId} className={css.label}>
          GPU Layers
        </label>
        <div className={css.row}>
          <div className={css.trackWrapper}>
            <div className={css.track}>
              <div
                className={`${css.fill} ${prefersReducedMotion ? css.fillReduced : ""}`}
                style={{ transform: `scaleX(${clamped / safeMax})` }}
              />
            </div>
            <div
              className={`${css.thumb} ${prefersReducedMotion ? css.thumbReduced : ""}`}
              style={{ left: `${percent}%` }}
              aria-hidden="true"
            />
            <input
              id={inputId}
              type="range"
              min={0}
              max={safeMax}
              step={1}
              value={clamped}
              onChange={handleChange}
              className={css.nativeInput}
              aria-label="GPU layers to offload"
              aria-describedby={!layerCountKnown ? hintId : undefined}
            />
            <div className={css.focusRing} aria-hidden="true" />
          </div>
          <div className={css.readout} aria-live="polite">
            {prefersReducedMotion ? (
              <span>{readout.primary}</span>
            ) : (
              <m.span
                key={readout.primary}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              >
                {readout.primary}
              </m.span>
            )}
            {readout.suffix ? (
              <span className={css.readoutSuffix}>{readout.suffix}</span>
            ) : null}
          </div>
        </div>
        {!layerCountKnown ? (
          <p id={hintId} className={css.hint}>
            Exact layer count unknown for this model — using fallback maximum.
          </p>
        ) : null}
      </div>
    </LazyMotion>
  );
}

export default GpuLayersSlider;
