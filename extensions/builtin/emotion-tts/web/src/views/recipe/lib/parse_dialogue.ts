export type OverrideKind = "vector" | "qwen" | "preset" | "audio" | "raw";

export interface ParsedOverride {
  kind: OverrideKind;
  label: string;
}

export interface ParsedLine {
  idx: number;
  character: string | null;
  text: string;
  override: ParsedOverride | null;
}

export const CHARACTER_PALETTE: readonly string[] = [
  // audit-allow: hex — neon decorative palette per design lang
  "#ba9eff",
  // audit-allow: hex — neon decorative palette per design lang
  "#9093ff",
  // audit-allow: hex — neon decorative palette per design lang
  "#ff8439",
  // audit-allow: hex — neon decorative palette per design lang
  "#22c55e",
  // audit-allow: hex — neon decorative palette per design lang
  "#ffd34a",
  // audit-allow: hex — neon decorative palette per design lang
  "#ff7aa8",
];

const TAG_REGEX = /^\[(?<body>[^\]]*)\]\s?(?<rest>.*)$/;

export function parseDialogue(text: string): ParsedLine[] {
  const out: ParsedLine[] = [];
  if (!text) return out;
  const lines = text.split(/\r?\n/);
  for (let idx = 0; idx < lines.length; idx += 1) {
    const raw = lines[idx] ?? "";
    const trimmed = raw.trim();
    if (trimmed.length === 0) continue;
    const match = trimmed.match(TAG_REGEX);
    if (!match || !match.groups) {
      out.push({ idx, character: null, text: trimmed, override: null });
      continue;
    }
    const body = match.groups.body ?? "";
    const rest = (match.groups.rest ?? "").trim();
    const [headRaw = "", ...overrideParts] = body.split("|");
    const head = headRaw.trim();
    if (!head) {
      out.push({ idx, character: null, text: rest || trimmed, override: null });
      continue;
    }
    const character = head.split(":")[0]?.trim() || null;
    const overrideRaw = overrideParts.join("|").trim();
    const override = overrideRaw ? overrideKind(overrideRaw) : null;
    out.push({
      idx,
      character,
      text: rest,
      override,
    });
  }
  return out;
}

export function overrideKind(rawOverride: string): ParsedOverride {
  const trimmed = rawOverride.trim();
  if (!trimmed) return { kind: "raw", label: "" };
  const colon = trimmed.indexOf(":");
  const prefix = colon >= 0 ? trimmed.slice(0, colon).trim().toLowerCase() : trimmed.toLowerCase();
  const value = colon >= 0 ? trimmed.slice(colon + 1).trim() : "";
  switch (prefix) {
    case "emotion_vector":
    case "vector":
      return { kind: "vector", label: value || trimmed };
    case "qwen":
    case "qwen_template":
      return { kind: "qwen", label: value || trimmed };
    case "preset":
      return { kind: "preset", label: value || trimmed };
    case "audio":
      return { kind: "audio", label: value || trimmed };
    default:
      return { kind: "raw", label: trimmed };
  }
}

export function uniqueCharacters(lines: readonly ParsedLine[]): string[] {
  const seen = new Set<string>();
  const order: string[] = [];
  for (const line of lines) {
    if (!line.character) continue;
    const key = line.character.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    order.push(line.character);
  }
  return order;
}

export function assignCharacterColors(characters: readonly string[]): Record<string, string> {
  const colors: Record<string, string> = {};
  for (let i = 0; i < characters.length; i += 1) {
    const name = characters[i];
    if (!name) continue;
    colors[name] = CHARACTER_PALETTE[i % CHARACTER_PALETTE.length] ?? CHARACTER_PALETTE[0]!;
  }
  return colors;
}

export function lineCountByCharacter(lines: readonly ParsedLine[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const line of lines) {
    if (!line.character) continue;
    counts[line.character] = (counts[line.character] ?? 0) + 1;
  }
  return counts;
}
