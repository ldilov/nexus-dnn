import type { ReactElement } from "react";
import * as styles from "./speed_gauge.css";

interface SpeedGaugeProps {
  secondsPerStep: number | null;
}

const CX = 60;
const CY = 62;
const R = 46;
const SWEEP_DEG = 180;
const SLOW_END_S_PER_IT = 75;
const FAST_END_S_PER_IT = 45;
const TICK_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];

function tickLine(fraction: number): { x1: number; y1: number; x2: number; y2: number } {
  const angle = Math.PI * (1 - fraction);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x1: CX + cos * (R - 9),
    y1: CY - sin * (R - 9),
    x2: CX + cos * (R - 14),
    y2: CY - sin * (R - 14),
  };
}

function fractionFor(secondsPerStep: number): number {
  const span = SLOW_END_S_PER_IT - FAST_END_S_PER_IT;
  const raw = (SLOW_END_S_PER_IT - secondsPerStep) / span;
  return Math.min(1, Math.max(0.02, raw));
}

function fillClass(fraction: number): string {
  if (fraction >= 0.55) return styles.fillFast;
  if (fraction >= 0.25) return styles.fillMid;
  return styles.fillSlow;
}

export function SpeedGauge({ secondsPerStep }: SpeedGaugeProps): ReactElement {
  const hasValue = secondsPerStep !== null && secondsPerStep > 0;
  const fraction = hasValue ? fractionFor(secondsPerStep) : 0;
  const needleDeg = SWEEP_DEG * fraction;
  const valueLabel = hasValue ? secondsPerStep.toFixed(1) : "—";

  return (
    <div
      className={styles.card}
      role="meter"
      aria-label="render speed"
      aria-valuemin={FAST_END_S_PER_IT}
      aria-valuemax={SLOW_END_S_PER_IT}
      aria-valuenow={hasValue ? Number(secondsPerStep.toFixed(1)) : undefined}
      aria-valuetext={hasValue ? `${valueLabel} seconds per step` : "no data yet"}
    >
      <span className={styles.label}>Speed</span>
      <svg className={styles.svg} viewBox="0 0 120 78" aria-hidden="true">
        <title>speedometer</title>
        <path
          className={styles.track}
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
          strokeWidth={8}
          pathLength={100}
        />
        {TICK_FRACTIONS.map((tickFraction) => {
          const line = tickLine(tickFraction);
          return (
            <line
              key={tickFraction}
              className={styles.tick}
              strokeWidth={1.4}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
            />
          );
        })}
        <text className={styles.scaleText} x={CX - R} y={CY + 12} fontSize={6} textAnchor="middle">
          {SLOW_END_S_PER_IT}
        </text>
        <text className={styles.scaleText} x={CX} y={9} fontSize={6} textAnchor="middle">
          {(SLOW_END_S_PER_IT + FAST_END_S_PER_IT) / 2}
        </text>
        <text className={styles.scaleText} x={CX + R} y={CY + 12} fontSize={6} textAnchor="middle">
          {FAST_END_S_PER_IT}
        </text>
        {hasValue && (
          <path
            className={fillClass(fraction)}
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            strokeWidth={8}
            pathLength={100}
            strokeDasharray={`${Math.max(1.5, fraction * 100)} 100`}
          />
        )}
        <g
          className={styles.needleGroup}
          style={{
            transform: `rotate(${hasValue ? needleDeg : 0}deg)`,
            transformOrigin: `${CX}px ${CY}px`,
          }}
        >
          <line
            className={styles.needle}
            strokeWidth={2.4}
            x1={CX}
            y1={CY}
            x2={CX - R + 16}
            y2={CY}
          />
        </g>
        <circle className={styles.hub} cx={CX} cy={CY} r={3.6} />
        <text className={styles.valueText} x={CX} y={44} fontSize={15} textAnchor="middle">
          {valueLabel}
        </text>
        <text className={styles.suffixText} x={CX} y={55} fontSize={7.5} textAnchor="middle">
          s/it
        </text>
      </svg>
    </div>
  );
}
