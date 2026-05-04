import { useCallback, useRef, useState } from "react";
import * as css from "./etts_axis_bars.css";
import {
  AXIS_KEYS,
  AXIS_LABELS,
  type AxisKey,
  type EmotionVec,
  clampVec,
} from "../lib/preset_naming";

const KEYBOARD_STEP = 0.05;
const KEYBOARD_PAGE = 0.2;

export interface EttsAxisBarsProps {
  vec: EmotionVec;
  onChange: (next: EmotionVec) => void;
  readOnly?: boolean;
  reduceMotion?: boolean;
}

export function EttsAxisBars({
  vec,
  onChange,
  readOnly = false,
  reduceMotion = false,
}: EttsAxisBarsProps): JSX.Element {
  const [activeAxis, setActiveAxis] = useState<AxisKey | null>(null);
  const draggingAxisRef = useRef<AxisKey | null>(null);
  const trackRectsRef = useRef<Map<AxisKey, DOMRect>>(new Map());

  const setAxis = useCallback(
    (axis: AxisKey, value: number) => {
      const clamped = Math.max(0, Math.min(1, value));
      onChange(clampVec({ ...vec, [axis]: clamped }));
    },
    [onChange, vec],
  );

  const valueFromClientX = useCallback((axis: AxisKey, clientX: number): number => {
    const rect = trackRectsRef.current.get(axis);
    if (!rect || rect.width <= 0) return 0;
    return (clientX - rect.left) / rect.width;
  }, []);

  const handlePointerDown = useCallback(
    (axis: AxisKey, e: React.PointerEvent<HTMLButtonElement>) => {
      if (readOnly) return;
      e.preventDefault();
      const track = e.currentTarget.querySelector("[data-track]");
      if (track instanceof HTMLElement) {
        trackRectsRef.current.set(axis, track.getBoundingClientRect());
      }
      e.currentTarget.setPointerCapture(e.pointerId);
      draggingAxisRef.current = axis;
      setActiveAxis(axis);
      setAxis(axis, valueFromClientX(axis, e.clientX));
    },
    [readOnly, setAxis, valueFromClientX],
  );

  const handlePointerMove = useCallback(
    (axis: AxisKey, e: React.PointerEvent<HTMLButtonElement>) => {
      if (readOnly || reduceMotion) return;
      if (draggingAxisRef.current !== axis) return;
      setAxis(axis, valueFromClientX(axis, e.clientX));
    },
    [readOnly, reduceMotion, setAxis, valueFromClientX],
  );

  const handlePointerUp = useCallback(
    (axis: AxisKey, e: React.PointerEvent<HTMLButtonElement>) => {
      if (draggingAxisRef.current !== axis) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore — capture may already be lost
      }
      draggingAxisRef.current = null;
      trackRectsRef.current.delete(axis);
    },
    [],
  );

  const handleKeyDown = useCallback(
    (axis: AxisKey, e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (readOnly) return;
      const current = vec[axis] ?? 0;
      let next = current;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          next = current + KEYBOARD_STEP;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          next = current - KEYBOARD_STEP;
          break;
        case "PageUp":
          next = current + KEYBOARD_PAGE;
          break;
        case "PageDown":
          next = current - KEYBOARD_PAGE;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = 1;
          break;
        default:
          return;
      }
      e.preventDefault();
      setActiveAxis(axis);
      setAxis(axis, next);
    },
    [readOnly, setAxis, vec],
  );

  return (
    <div className={css.root} role="group" aria-label="Emotion axis sliders">
      {AXIS_KEYS.map((axis) => {
        const value = clamp(vec[axis] ?? 0);
        const isOn = value > 0.05;
        const isActive = activeAxis === axis;
        const label = AXIS_LABELS[axis];
        return (
          <button
            key={axis}
            type="button"
            className={`${css.row}${isOn ? ` ${css.rowOn}` : ""}${isActive ? ` ${css.rowActive}` : ""}`}
            role="slider"
            aria-label={`${label} intensity`}
            aria-valuemin={0}
            aria-valuemax={1}
            aria-valuenow={Number(value.toFixed(2))}
            aria-readonly={readOnly}
            disabled={readOnly}
            onPointerDown={(e) => handlePointerDown(axis, e)}
            onPointerMove={(e) => handlePointerMove(axis, e)}
            onPointerUp={(e) => handlePointerUp(axis, e)}
            onPointerCancel={(e) => handlePointerUp(axis, e)}
            onKeyDown={(e) => handleKeyDown(axis, e)}
            onFocus={() => setActiveAxis(axis)}
            onBlur={() => setActiveAxis(null)}
          >
            <span className={css.name}>{label}</span>
            <span className={css.track} data-track="true">
              <span
                className={css.fill}
                style={{ width: `${value * 100}%` }}
                aria-hidden="true"
              />
            </span>
            <span className={css.value}>{value.toFixed(2)}</span>
          </button>
        );
      })}
    </div>
  );
}

function clamp(v: number): number {
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}
