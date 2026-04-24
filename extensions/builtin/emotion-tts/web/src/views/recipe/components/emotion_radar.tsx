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
}

export function EmotionRadar({ vector }: Props): JSX.Element {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 24;
  const axisCount = AXIS_LABELS.length;

  const points = AXIS_LABELS.map((_, i) => {
    const angle = (-Math.PI / 2) + (2 * Math.PI * i) / axisCount;
    const v = Math.max(0, Math.min(1, vector[i] ?? 0));
    return { x: cx + Math.cos(angle) * r * v, y: cy + Math.sin(angle) * r * v, angle };
  });

  const outerPoints = AXIS_LABELS.map((_, i) => {
    const angle = (-Math.PI / 2) + (2 * Math.PI * i) / axisCount;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, angle };
  });

  const poly = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Emotion radar">
      <g stroke="currentColor" strokeOpacity={0.15} fill="none">
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
        points={poly}
        fill="currentColor"
        fillOpacity={0.35}
        stroke="currentColor"
        strokeWidth={1.5}
        transition={{ duration: 0.25 }}
      />
      {outerPoints.map((p, i) => (
        <text
          key={AXIS_LABELS[i]}
          x={cx + Math.cos(p.angle) * (r + 14)}
          y={cy + Math.sin(p.angle) * (r + 14)}
          textAnchor="middle"
          fontSize={10}
          fill="currentColor"
          opacity={0.7}
        >
          {AXIS_LABELS[i]}
        </text>
      ))}
    </svg>
  );
}
