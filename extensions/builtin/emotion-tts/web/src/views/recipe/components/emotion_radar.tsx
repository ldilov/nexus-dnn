import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { vars } from "../../../theme/tokens.css";
import * as css from "./emotion_radar.css";

const AXIS_LABELS = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm",
] as const;

type AxisIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Props {
  vector: number[];
  pulseKey?: string | number;
  size?: number;
  onChange?: (next: number[]) => void;
  disabled?: boolean;
}

export function EmotionRadar({
  vector,
  pulseKey,
  size = 220,
  onChange,
  disabled = false,
}: Props): JSX.Element {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeAxis, setActiveAxis] = useState<AxisIndex | null>(null);
  const liveRegionId = useId();

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 28;
  const axisCount = AXIS_LABELS.length;
  const interactive = !!onChange && !disabled;

  const points = AXIS_LABELS.map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / axisCount;
    const v = clamp01(vector[i] ?? 0);
    return { x: cx + Math.cos(angle) * r * v, y: cy + Math.sin(angle) * r * v };
  });

  const outerPoints = AXIS_LABELS.map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / axisCount;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, angle };
  });

  const poly = points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");

  const dominant = computeDominant(vector);

  const updateAxisFromPoint = useCallback(
    (clientX: number, clientY: number, lockedAxis?: AxisIndex): void => {
      if (!interactive || !onChange || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const scale = size / rect.width;
      const px = (clientX - rect.left) * scale - cx;
      const py = (clientY - rect.top) * scale - cy;
      const axis = lockedAxis ?? nearestAxis(px, py, axisCount);
      const axisAngle = -Math.PI / 2 + (2 * Math.PI * axis) / axisCount;
      const ax = Math.cos(axisAngle);
      const ay = Math.sin(axisAngle);
      const projection = (px * ax + py * ay) / r;
      const next = clamp01(projection);
      const updated = vector.slice();
      updated[axis] = roundToStep(next, 0.01);
      onChange(updated);
      setActiveAxis(axis);
    },
    [axisCount, cx, cy, interactive, onChange, r, size, vector],
  );

  const handlePointerDown = (event: PointerEvent<SVGSVGElement>): void => {
    if (!interactive) return;
    event.preventDefault();
    (event.target as Element).setPointerCapture?.(event.pointerId);
    updateAxisFromPoint(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: PointerEvent<SVGSVGElement>): void => {
    if (!interactive || activeAxis === null || event.buttons === 0) return;
    updateAxisFromPoint(event.clientX, event.clientY, activeAxis);
  };

  const handlePointerUp = (event: PointerEvent<SVGSVGElement>): void => {
    (event.target as Element).releasePointerCapture?.(event.pointerId);
    setActiveAxis(null);
  };

  const handleKeyDown = (event: KeyboardEvent<SVGSVGElement>): void => {
    if (!interactive || !onChange) return;
    const focusAxis = activeAxis ?? (dominant.index as AxisIndex);
    const step = event.shiftKey ? 0.1 : 0.05;
    let nextValue = vector[focusAxis] ?? 0;
    let nextAxis: AxisIndex | null = focusAxis;
    switch (event.key) {
      case "ArrowUp":
      case "ArrowRight":
        nextValue = clamp01(nextValue + step);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        nextValue = clamp01(nextValue - step);
        break;
      case "Tab":
        return;
      case "Home":
        nextValue = 0;
        break;
      case "End":
        nextValue = 1;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8": {
        const target = (Number(event.key) - 1) as AxisIndex;
        nextAxis = target;
        nextValue = vector[target] ?? 0;
        setActiveAxis(target);
        event.preventDefault();
        return;
      }
      default:
        return;
    }
    event.preventDefault();
    const updated = vector.slice();
    updated[nextAxis] = roundToStep(nextValue, 0.01);
    onChange(updated);
    setActiveAxis(nextAxis);
  };

  return (
    <div className={css.wrap}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role={interactive ? "application" : "img"}
        aria-label={
          interactive
            ? "Emotion vector radar — drag a vertex or press 1-8 then ↑↓ to adjust"
            : "Emotion vector radar"
        }
        aria-describedby={liveRegionId}
        tabIndex={interactive ? 0 : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        className={interactive ? css.svgInteractive : undefined}
      >
        <g stroke="currentColor" strokeOpacity={0.18} fill="none">
          {[0.25, 0.5, 0.75, 1].map((ring) => (
            <polygon
              key={ring}
              points={outerPoints
                .map((p) => `${cx + (p.x - cx) * ring},${cy + (p.y - cy) * ring}`)
                .join(" ")}
            />
          ))}
          {outerPoints.map((p, i) => (
            <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} />
          ))}
        </g>
        <motion.polygon
          key={pulseKey ?? "static"}
          points={poly}
          fill="currentColor"
          fillOpacity={0.32}
          stroke="currentColor"
          strokeWidth={1.5}
          initial={reduceMotion || pulseKey === undefined ? false : { scale: 0.92, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        />
        {points.map((p, i) => {
          const isActive = activeAxis === i;
          const isDominant = i === dominant.index && dominant.value > 0;
          const radius = isActive ? 6 : isDominant ? 5 : 3;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={radius}
              fill={isActive || isDominant ? "currentColor" : vars.color.surfaceMuted}
              stroke="currentColor"
              strokeWidth={isActive ? 2 : 1}
            />
          );
        })}
        {outerPoints.map((p, i) => (
          <text
            key={AXIS_LABELS[i]}
            x={cx + Math.cos(p.angle) * (r + 16)}
            y={cy + Math.sin(p.angle) * (r + 16) + 3}
            textAnchor="middle"
            fontSize={10}
            fill="currentColor"
            opacity={i === dominant.index && dominant.value > 0 ? 1 : 0.72}
            fontWeight={i === dominant.index && dominant.value > 0 ? 600 : 400}
          >
            {AXIS_LABELS[i]}
          </text>
        ))}
      </svg>
      <div id={liveRegionId} className={css.dominant} aria-live="polite">
        {dominant.value > 0 ? (
          <>
            <span className={css.dominantAxis}>{AXIS_LABELS[dominant.index]}</span>
            <span className={css.dominantValue}>{dominant.value.toFixed(2)}</span>
          </>
        ) : (
          <span className={css.dominantNeutral}>neutral · 0.00</span>
        )}
      </div>
    </div>
  );
}

function clamp01(x: number): number {
  if (!Number.isFinite(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

function roundToStep(x: number, step: number): number {
  return Math.round(x / step) * step;
}

function nearestAxis(px: number, py: number, axisCount: number): AxisIndex {
  let pointerAngle = Math.atan2(py, px);
  pointerAngle += Math.PI / 2;
  if (pointerAngle < 0) pointerAngle += 2 * Math.PI;
  const idx = Math.round((pointerAngle * axisCount) / (2 * Math.PI)) % axisCount;
  return idx as AxisIndex;
}

function computeDominant(vector: number[]): { index: AxisIndex; value: number } {
  let bestIndex: AxisIndex = 0;
  let bestValue = 0;
  for (let i = 0; i < AXIS_LABELS.length; i += 1) {
    const v = vector[i] ?? 0;
    if (v > bestValue) {
      bestValue = v;
      bestIndex = i as AxisIndex;
    }
  }
  return { index: bestIndex, value: bestValue };
}
