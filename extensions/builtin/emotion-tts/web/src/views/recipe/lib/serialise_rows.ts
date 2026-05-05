import type { EmotionVector, VectorPreset } from "../../../services/presets_client";

export interface PerCharacterRow {
  id: string;
  character: string;
  presetId: string | null;
  alpha: number;
  text: string;
}

export const VECTOR_KEYS = [
  "happy",
  "angry",
  "sad",
  "afraid",
  "disgusted",
  "melancholic",
  "surprised",
  "calm",
] as const;

const VECTOR_EPS = 1e-3;

function sanitiseCharacterName(raw: string): string {
  return raw.replace(/[\[\]|\r\n]/g, "").trim();
}

function sanitiseText(raw: string): string {
  return raw.replace(/[\r\n]/g, " ").trim();
}

function clamp01(n: number): number {
  if (Number.isNaN(n)) return 1;
  if (n < 0) return 0;
  if (n > 1) return 1;
  return n;
}

function formatNum(n: number): string {
  const rounded = Math.round(n * 1000) / 1000;
  return Number.isInteger(rounded) ? rounded.toFixed(1) : String(rounded);
}

function encodeVector(vec: EmotionVector): string | null {
  const parts: string[] = [];
  for (let i = 0; i < VECTOR_KEYS.length; i += 1) {
    const v = vec[i];
    if (typeof v !== "number") continue;
    if (Math.abs(v) < VECTOR_EPS) continue;
    parts.push(`${VECTOR_KEYS[i]}=${formatNum(clamp01(v))}`);
  }
  return parts.length === 0 ? null : parts.join(",");
}

export function rowToLine(
  row: PerCharacterRow,
  presetsById: Map<string, VectorPreset>,
): string | null {
  const character = sanitiseCharacterName(row.character) || "Narrator";
  const text = sanitiseText(row.text);
  if (!text) return null;

  const overrides: string[] = [];
  if (row.presetId) {
    const preset = presetsById.get(row.presetId);
    if (preset) {
      const encoded = encodeVector(preset.vector);
      if (encoded) overrides.push(`emotion_vector:${encoded}`);
    }
  }
  const alpha = clamp01(row.alpha);
  const alphaIsDefault = Math.abs(alpha - 1) < VECTOR_EPS && overrides.length === 0;
  if (!alphaIsDefault && overrides.length > 0) {
    overrides.push(`emotion_alpha:${formatNum(alpha)}`);
  } else if (overrides.length === 0 && Math.abs(alpha - 1) >= VECTOR_EPS) {
    overrides.push(`emotion_alpha:${formatNum(alpha)}`);
  }

  const tag = overrides.length > 0
    ? `[${character}|${overrides.join("|")}]`
    : `[${character}]`;
  return `${tag} ${text}`;
}

export function serialiseRowsToScript(
  rows: readonly PerCharacterRow[],
  presets: readonly VectorPreset[],
): string {
  const presetsById = new Map<string, VectorPreset>();
  for (const p of presets) presetsById.set(p.presetId, p);

  const lines: string[] = [];
  for (const row of rows) {
    const line = rowToLine(row, presetsById);
    if (line) lines.push(line);
  }
  return lines.join("\n");
}

export function newEmptyRow(): PerCharacterRow {
  return {
    id: `row_${Math.random().toString(36).slice(2, 10)}`,
    character: "",
    presetId: null,
    alpha: 1.0,
    text: "",
  };
}
