import { type ReactElement, useMemo } from "react";
import { useReducedMotion } from "motion/react";
import {
  reducedMotionTrace,
  traceContainer,
  traceLeadingGlow,
  tracePathBase,
  tracePathByMode,
  traceSvg,
} from "./trace.css";

export type TraceMode = "quiet" | "elevated" | "anomaly" | "unavailable";

export interface TraceThresholds {
  warn: number;
  alarm: number;
}

export interface TraceProps {
  id: string;
  metricName: string;
  thresholds: TraceThresholds;
  value: number;
  available: boolean;
  history: ReadonlyArray<number>;
  unavailableReason?: string;
}

const VIEW_WIDTH = 100;
const VIEW_HEIGHT = 4;

function deriveMode(
  value: number,
  available: boolean,
  thresholds: TraceThresholds,
): TraceMode {
  if (!available) return "unavailable";
  if (value >= thresholds.alarm) return "anomaly";
  if (value >= thresholds.warn) return "elevated";
  return "quiet";
}

function buildPath(samples: ReadonlyArray<number>, ymax: number): string {
  if (samples.length === 0) return "";
  const stepX = VIEW_WIDTH / Math.max(samples.length - 1, 1);
  const denom = ymax > 0 ? ymax : 1;
  return samples
    .map((sample, index) => {
      const x = index * stepX;
      const clamped = Math.max(0, Math.min(sample / denom, 1));
      const y = VIEW_HEIGHT - clamped * VIEW_HEIGHT;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function leadingPoint(
  samples: ReadonlyArray<number>,
  ymax: number,
): { cx: number; cy: number } | null {
  if (samples.length === 0) return null;
  const last = samples[samples.length - 1] ?? 0;
  const denom = ymax > 0 ? ymax : 1;
  const clamped = Math.max(0, Math.min(last / denom, 1));
  return {
    cx: VIEW_WIDTH,
    cy: VIEW_HEIGHT - clamped * VIEW_HEIGHT,
  };
}

export function Trace(props: TraceProps): ReactElement {
  const {
    id,
    metricName,
    thresholds,
    value,
    available,
    history,
    unavailableReason,
  } = props;

  const reducedMotion = useReducedMotion() ?? false;
  const mode = deriveMode(value, available, thresholds);
  const ymax = thresholds.alarm > 0 ? thresholds.alarm * 1.1 : 1;

  const path = useMemo(() => buildPath(history, ymax), [history, ymax]);
  const leading = useMemo(
    () => (mode === "anomaly" ? leadingPoint(history, ymax) : null),
    [mode, history, ymax],
  );

  const pathClassName = [
    tracePathBase,
    tracePathByMode[mode],
    reducedMotion ? reducedMotionTrace : "",
  ]
    .filter(Boolean)
    .join(" ");

  const titleText =
    mode === "unavailable"
      ? unavailableReason ?? `${metricName} unavailable`
      : `${metricName}: ${value.toFixed(2)}`;

  return (
    <div
      className={traceContainer}
      data-trace-id={id}
      data-trace-mode={mode}
      data-trace-available={available ? "true" : "false"}
      role="img"
      aria-label={titleText}
    >
      <svg
        className={traceSvg}
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <title>{titleText}</title>
        {path !== "" ? <path d={path} className={pathClassName} /> : null}
        {leading !== null ? (
          <circle
            cx={leading.cx}
            cy={leading.cy}
            r={1.2}
            className={traceLeadingGlow}
          />
        ) : null}
      </svg>
    </div>
  );
}
