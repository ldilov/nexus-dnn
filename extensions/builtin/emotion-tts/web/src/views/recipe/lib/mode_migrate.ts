import type { VectorPreset } from "../../../services/presets_client";
import type { EditorMode } from "../components/editor_mode_toggle/editor_mode_toggle";
import { newEmptyRow, serialiseRowsToScript, type PerCharacterRow } from "./serialise_rows";
import { tokeniseStory } from "./story_tokens";

export interface MigrationResult {
  script?: string;
  rows?: PerCharacterRow[];
  storyText?: string;
}

export function hasContentForMode(
  mode: EditorMode,
  source: { script: string; rows: readonly PerCharacterRow[]; storyText: string },
): boolean {
  if (mode === "quick") return source.script.trim().length > 0;
  if (mode === "rows") return source.rows.some((r) => r.text.trim().length > 0 || r.character.trim().length > 0);
  return source.storyText.trim().length > 0;
}

export function migrate(
  from: EditorMode,
  to: EditorMode,
  source: { script: string; rows: readonly PerCharacterRow[]; storyText: string },
  presets: readonly VectorPreset[],
): MigrationResult | null {
  if (from === to) return null;

  if (from === "quick" && to === "rows") {
    const lines = source.script.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const rows: PerCharacterRow[] = lines.map((line) => ({
      ...newEmptyRow(),
      text: line.trim(),
    }));
    return { rows: rows.length > 0 ? rows : [newEmptyRow()] };
  }

  if (from === "quick" && to === "story") {
    return { storyText: source.script };
  }

  if (from === "rows" && to === "quick") {
    return { script: serialiseRowsToScript(source.rows, presets) };
  }

  if (from === "rows" && to === "story") {
    const presetsById = new Map<string, VectorPreset>();
    for (const p of presets) presetsById.set(p.presetId, p);
    const lines: string[] = [];
    for (const row of source.rows) {
      const text = row.text.trim();
      if (!text) continue;
      const character = row.character.trim();
      const preset = row.presetId ? presetsById.get(row.presetId) : null;
      const segments: string[] = [];
      if (character) segments.push(`@${sanitiseToken(character)}`);
      if (preset) segments.push(`/${sanitiseToken(preset.presetName)}`);
      segments.push(text);
      lines.push(segments.join(" "));
    }
    return { storyText: lines.join("\n") };
  }

  if (from === "story" && to === "quick") {
    const tokens = tokeniseStory(source.storyText);
    const out: string[] = [];
    for (const t of tokens) {
      if (t.kind === "text") out.push(t.value);
    }
    const stripped = out.join("").replace(/\s+/g, " ").trim();
    return { script: stripped };
  }

  if (from === "story" && to === "rows") {
    const tokens = tokeniseStory(source.storyText);
    const presetsByLowerName = new Map<string, VectorPreset>();
    for (const p of presets) presetsByLowerName.set(p.presetName.toLowerCase(), p);
    const rows: PerCharacterRow[] = [];
    let currentCharacter = "Narrator";
    let currentPresetId: string | null = null;
    let buffer = "";
    let started = false;
    const flush = (): void => {
      const text = buffer.replace(/\s+/g, " ").trim();
      if (text.length > 0) {
        rows.push({
          ...newEmptyRow(),
          character: currentCharacter,
          presetId: currentPresetId,
          alpha: 1,
          text,
        });
      }
      buffer = "";
    };
    for (const t of tokens) {
      if (t.kind === "character") {
        if (started) flush();
        currentCharacter = t.value;
        currentPresetId = null;
        started = true;
      } else if (t.kind === "emotion") {
        if (started) flush();
        const matched = presetsByLowerName.get(t.value.toLowerCase());
        currentPresetId = matched ? matched.presetId : null;
        started = true;
      } else {
        buffer += t.value;
        started = true;
      }
    }
    flush();
    return { rows: rows.length > 0 ? rows : [newEmptyRow()] };
  }

  return null;
}

function sanitiseToken(raw: string): string {
  return raw.replace(/[^\p{L}\p{N}_-]/gu, "_");
}
