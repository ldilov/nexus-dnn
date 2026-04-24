import { motion } from "motion/react";

const AXIS_LABELS = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm",
];

interface Props {
  vector: number[];
  pulseKey?: string | number;
  size?: number;
}

export function EmotionRadar({ vector, pulseKey, size = 220 }: Props): JSX.Element {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 28;
  const axisCount = AXIS_LABELS.length;

  const points = AXIS_LABELS.map((_, i) => {
    const angle = (-Math.PI / 2) + (2 * Math.PI * i) / axisCount;
    const v = Math.max(0, Math.min(1, vector[i] ?? 0));
    return { x: cx + Math.cos(angle) * r * v, y: cy + Math.sin(angle) * r * v };
  });

  const outerPoints = AXIS_LABELS.map((_, i) => {
    const angle = (-Math.PI / 2) + (2 * Math.PI * i) / axisCount;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, angle };
  });

  const poly = points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Emotion vector radar"
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
        initial={pulseKey !== undefined ? { scale: 0.92, opacity: 0.2 } : false}
        animate={{ scale: 1, opacity: 1 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
      {outerPoints.map((p, i) => (
        <text
          key={AXIS_LABELS[i]}
          x={cx + Math.cos(p.angle) * (r + 16)}
          y={cy + Math.sin(p.angle) * (r + 16) + 3}
          textAnchor="middle"
          fontSize={10}
          fill="currentColor"
          opacity={0.72}
        >
          {AXIS_LABELS[i]}
        </text>
      ))}
    </svg>
  );
}
