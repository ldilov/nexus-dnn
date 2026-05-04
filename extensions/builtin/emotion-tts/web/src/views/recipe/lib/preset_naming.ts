export type AxisKey =
  | "happy"
  | "angry"
  | "sad"
  | "afraid"
  | "disgusted"
  | "melancholic"
  | "surprised"
  | "calm";

export type EmotionVec = Record<AxisKey, number>;

export const AXIS_KEYS: readonly AxisKey[] = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm",
];

export const AXIS_LABELS: Record<AxisKey, string> = {
  happy: "Happy",
  angry: "Angry",
  sad: "Sad",
  afraid: "Afraid",
  disgusted: "Disgusted",
  melancholic: "Melancholic",
  surprised: "Surprised",
  calm: "Calm",
};

export const EMPTY_VEC: EmotionVec = {
  happy: 0,
  angry: 0,
  sad: 0,
  afraid: 0,
  disgusted: 0,
  melancholic: 0,
  surprised: 0,
  calm: 0,
};

const NOISE_THRESHOLD = 0.05;

export function dominantAxis(vec: EmotionVec): AxisKey | null {
  let best: AxisKey | null = null;
  let bestVal = -Infinity;
  for (const key of AXIS_KEYS) {
    const v = vec[key];
    if (v > bestVal) {
      bestVal = v;
      best = key;
    }
  }
  if (!best || bestVal <= NOISE_THRESHOLD) return null;
  return best;
}

export function topAxes(vec: EmotionVec, limit = 3): { key: AxisKey; label: string; value: number }[] {
  return AXIS_KEYS.map((key) => ({ key, label: AXIS_LABELS[key], value: vec[key] }))
    .filter((entry) => entry.value > NOISE_THRESHOLD)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export function magnitude(vec: EmotionVec): number {
  let sum = 0;
  for (const key of AXIS_KEYS) sum += vec[key] * vec[key];
  return Math.sqrt(sum);
}

export function suggestPresetName(vec: EmotionVec): string {
  const top = topAxes(vec, 2);
  const first = top[0];
  if (!first) return "";
  const second = top[1];
  if (!second) return capitalise(first.label);
  if (first.value - second.value > 0.25) return capitalise(first.label);
  return `${capitalise(first.label)} + ${second.label.toLowerCase()}`;
}

function capitalise(label: string): string {
  if (!label) return label;
  const first = label[0];
  if (!first) return label;
  return first.toUpperCase() + label.slice(1);
}

export function clampVec(vec: EmotionVec): EmotionVec {
  const out: EmotionVec = { ...EMPTY_VEC };
  for (const key of AXIS_KEYS) {
    const v = vec[key];
    out[key] = Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0;
  }
  return out;
}

export function blendVecs(a: EmotionVec, b: EmotionVec, alpha: number): EmotionVec {
  const t = Math.max(0, Math.min(1, alpha));
  const out: EmotionVec = { ...EMPTY_VEC };
  for (const key of AXIS_KEYS) {
    out[key] = a[key] * (1 - t) + b[key] * t;
  }
  return out;
}
