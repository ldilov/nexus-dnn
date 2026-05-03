import { useMemo } from "react";
import * as css from "./etts_radar.css";
import { useRadarDrag } from "../hooks/use_radar_drag";
import {
  AXIS_KEYS,
  AXIS_LABELS,
  type AxisKey,
  type EmotionVec,
  dominantAxis,
  magnitude,
} from "../lib/preset_naming";

const RING_LEVELS = [0.25, 0.5, 0.75, 1.0];

export interface EttsRadarProps {
  vec: EmotionVec;
  onChange: (next: EmotionVec) => void;
  size?: number;
  readOnly?: boolean;
  reduceMotion?: boolean;
}

export function EttsRadar({
  vec,
  onChange,
  size = 360,
  readOnly = false,
  reduceMotion = false,
}: EttsRadarProps): JSX.Element {
  const drag = useRadarDrag({ vec, onChange, size, reduceMotion });
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) * 0.78;

  const axisCoords = useMemo(() => computeAxisCoords(cx, cy, radius), [cx, cy, radius]);

  const polygonPoints = useMemo(() => {
    return AXIS_KEYS.map((axis, i) => {
      const value = clamp(drag.liveVec[axis]);
      const a = axisCoords[i];
      if (!a) return "0,0";
      return `${cx + (a.dx * value)},${cy + (a.dy * value)}`;
    }).join(" ");
  }, [axisCoords, cx, cy, drag.liveVec]);

  const dominant = dominantAxis(drag.liveVec);
  const mag = magnitude(drag.liveVec);

  return (
    <div className={css.root}>
      <div className={css.svgWrap} style={{ width: size, height: size }}>
        <svg
          className={css.svgRoot}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label="8-axis emotion radar"
          onPointerDown={readOnly ? undefined : drag.onSurfacePointerDown}
          style={readOnly ? undefined : { cursor: "crosshair", touchAction: "none" }}
        >
          {RING_LEVELS.map((level) => (
            <circle
              key={level}
              className={css.ring}
              cx={cx}
              cy={cy}
              r={radius * level}
            />
          ))}
          {AXIS_KEYS.map((axis, i) => {
            const a = axisCoords[i];
            if (!a) return null;
            const lx = cx + a.dx * 1.18;
            const ly = cy + a.dy * 1.18;
            const isActive = drag.activeAxis === axis;
            return (
              <g key={axis}>
                <line
                  className={css.axisLine}
                  x1={cx}
                  y1={cy}
                  x2={cx + a.dx}
                  y2={cy + a.dy}
                />
                <text
                  className={`${css.axisLabel}${isActive ? ` ${css.axisLabelActive}` : ""}`}
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {AXIS_LABELS[axis]}
                </text>
              </g>
            );
          })}
          {/* Per-axis "petals": a stroke from center to each non-zero axis tip.
              Keeps a sparse vector readable even when the polygon is near-degenerate. */}
          {AXIS_KEYS.map((axis, i) => {
            const value = clamp(drag.liveVec[axis]);
            if (value <= 0.01) return null;
            const a = axisCoords[i];
            if (!a) return null;
            const isActive = drag.activeAxis === axis;
            return (
              <line
                key={`petal-${axis}`}
                className={`${css.petal}${isActive ? ` ${css.petalActive}` : ""}`}
                x1={cx}
                y1={cy}
                x2={cx + a.dx * value}
                y2={cy + a.dy * value}
              />
            );
          })}
          <polygon className={css.polygon} points={polygonPoints} />
          {drag.surfacePing && (
            <circle
              key={drag.surfacePing.key}
              className={css.surfacePing}
              cx={drag.surfacePing.x}
              cy={drag.surfacePing.y}
              r={10}
            />
          )}
          {!readOnly &&
            AXIS_KEYS.map((axis, i) => {
              const value = clamp(drag.liveVec[axis]);
              const a = axisCoords[i];
              if (!a) return null;
              const x = cx + a.dx * value;
              const y = cy + a.dy * value;
              const isActive = drag.activeAxis === axis;
              return (
                <g key={axis}>
                  {/* Transparent hit-circle: 14px radius for a generous touch target. */}
                  <circle
                    className={css.handleHit}
                    cx={x}
                    cy={y}
                    r={14}
                    tabIndex={0}
                    role="slider"
                    aria-label={`${AXIS_LABELS[axis]} axis`}
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-valuenow={value}
                    onPointerDown={(e) => drag.onPointerDown(axis, e)}
                    onKeyDown={(e) => drag.onKeyDown(axis, e)}
                    onFocus={() => drag.setActiveAxis(axis)}
                    onBlur={() => drag.setActiveAxis(null)}
                  />
                  <circle
                    className={`${css.handle}${isActive ? ` ${css.handleActive}` : ""}`}
                    cx={x}
                    cy={y}
                    r={6}
                  />
                </g>
              );
            })}
        </svg>
      </div>
      <div className={css.dominantBlock}>
        <span className={css.dominantValue}>
          {dominant ? AXIS_LABELS[dominant].toLowerCase() : "neutral"}
        </span>
        <span className={css.dominantSub}>
          ‖v‖ = {mag.toFixed(2)}
        </span>
      </div>
      <div className={css.axisChips} role="group" aria-label="Axis values">
        {AXIS_KEYS.map((axis) => {
          const value = clamp(drag.liveVec[axis]);
          const isActive = drag.activeAxis === axis;
          return (
            <button
              key={axis}
              type="button"
              className={`${css.axisChip}${isActive ? ` ${css.axisChipActive}` : ""}`}
              onClick={() =>
                onChange({
                  ...drag.liveVec,
                  [axis]: value > 0.05 ? 0 : 0.5,
                })
              }
              aria-pressed={value > 0.05}
            >
              {AXIS_LABELS[axis].toLowerCase()}
              <span className={css.axisChipValue}>{value.toFixed(2)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface AxisCoord {
  dx: number;
  dy: number;
}

function computeAxisCoords(cx: number, cy: number, radius: number): AxisCoord[] {
  void cx;
  void cy;
  return AXIS_KEYS.map((_, i) => {
    const angle = (i / AXIS_KEYS.length) * Math.PI * 2 - Math.PI / 2;
    return {
      dx: Math.cos(angle) * radius,
      dy: Math.sin(angle) * radius,
    };
  });
}

function clamp(v: number): number {
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

export interface EttsRadarMiniProps {
  vec: EmotionVec;
  size?: number;
}

export function EttsRadarMini({ vec, size = 36 }: EttsRadarMiniProps): JSX.Element {
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size / 2) * 0.86;
  const points = useMemo(() => {
    return AXIS_KEYS.map((axis, i) => {
      const value = clamp(vec[axis]);
      const angle = (i / AXIS_KEYS.length) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius * value;
      const y = cy + Math.sin(angle) * radius * value;
      return `${x},${y}`;
    }).join(" ");
  }, [cx, cy, radius, vec]);
  return (
    <span className={css.mini} aria-hidden="true">
      <svg
        className={css.miniSvg}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle className={css.miniRing} cx={cx} cy={cy} r={radius} />
        <polygon className={css.miniPolygon} points={points} />
      </svg>
    </span>
  );
}
