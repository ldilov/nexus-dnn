import { useCallback, useId, useMemo, useRef, type KeyboardEvent } from "react";
import type { CharacterMapping } from "../../../../services/mappings_client";
import type { VectorPreset } from "../../../../services/presets_client";
import { newEmptyRow, type PerCharacterRow } from "../../lib/serialise_rows";
import * as css from "./character_rows_editor.css";

interface CharacterRowsEditorProps {
  rows: PerCharacterRow[];
  onRowsChange: (next: PerCharacterRow[]) => void;
  presets: readonly VectorPreset[];
  mappingsByLower: ReadonlyMap<string, CharacterMapping>;
}

export function CharacterRowsEditor({
  rows,
  onRowsChange,
  presets,
  mappingsByLower,
}: CharacterRowsEditorProps): JSX.Element {
  const datalistId = useId();
  const lastRowTextRef = useRef<HTMLInputElement | null>(null);

  const totalLines = rows.filter((r) => r.text.trim().length > 0).length;
  const unmappedCount = useMemo(() => {
    const seen = new Set<string>();
    for (const r of rows) {
      const lower = r.character.trim().toLowerCase();
      if (!lower || lower === "narrator") continue;
      if (mappingsByLower.has(lower)) continue;
      seen.add(lower);
    }
    return seen.size;
  }, [rows, mappingsByLower]);

  const characterSuggestions = useMemo(() => {
    const out = new Set<string>();
    mappingsByLower.forEach((m) => out.add(m.characterName));
    return Array.from(out).sort((a, b) => a.localeCompare(b));
  }, [mappingsByLower]);

  const updateRow = useCallback(
    (id: string, patch: Partial<PerCharacterRow>) => {
      onRowsChange(rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    },
    [rows, onRowsChange],
  );

  const removeRow = useCallback(
    (id: string) => {
      onRowsChange(rows.filter((r) => r.id !== id));
    },
    [rows, onRowsChange],
  );

  const addRow = useCallback(
    (afterId: string | null) => {
      const next = newEmptyRow();
      if (afterId === null) {
        onRowsChange([...rows, next]);
      } else {
        const idx = rows.findIndex((r) => r.id === afterId);
        if (idx < 0) onRowsChange([...rows, next]);
        else onRowsChange([...rows.slice(0, idx + 1), next, ...rows.slice(idx + 1)]);
      }
      requestAnimationFrame(() => lastRowTextRef.current?.focus());
    },
    [rows, onRowsChange],
  );

  const handleTextKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, rowId: string) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        addRow(rowId);
      }
    },
    [addRow],
  );

  return (
    <section className={css.root} aria-label="Per-character lines">
      <header className={css.header}>
        <span className={css.headerEyebrow}>02 / Per-character lines</span>
        <span className={css.counter}>
          <span className={css.counterValue}>{totalLines.toString().padStart(2, "0")}</span> lines
          {unmappedCount > 0 && (
            <span className={css.unmappedBadge} title="Characters without a mapping will fail at run time">
              ⚠ {unmappedCount} unmapped
            </span>
          )}
        </span>
      </header>

      {rows.length === 0 ? (
        <p className={css.emptyHint}>
          No lines yet — add a character line to start. Each row produces one utterance.
        </p>
      ) : (
        <ul className={css.list}>
          {rows.map((row, idx) => (
            <li key={row.id} className={css.row}>
              <span className={css.ordinal} aria-hidden="true">
                {(idx + 1).toString().padStart(2, "0")}
              </span>
              <input
                type="text"
                value={row.character}
                onChange={(e) => updateRow(row.id, { character: e.target.value })}
                placeholder="Character"
                className={css.characterInput}
                aria-label={`Character for line ${idx + 1}`}
                list={characterSuggestions.length > 0 ? datalistId : undefined}
                spellCheck={false}
              />
              <select
                value={row.presetId ?? ""}
                onChange={(e) =>
                  updateRow(row.id, { presetId: e.target.value === "" ? null : e.target.value })
                }
                className={css.presetSelect}
                aria-label={`Emotion preset for line ${idx + 1}`}
              >
                <option value="">No emotion</option>
                {presets.map((p) => (
                  <option key={p.presetId} value={p.presetId}>
                    {p.presetName}
                  </option>
                ))}
              </select>
              <span className={css.alphaWrap}>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={row.alpha}
                  onChange={(e) => updateRow(row.id, { alpha: Number.parseFloat(e.target.value) })}
                  className={css.alphaSlider}
                  aria-label={`Emotion intensity for line ${idx + 1}`}
                  disabled={!row.presetId && Math.abs(row.alpha - 1) < 0.001}
                />
                <span className={css.alphaValue} aria-live="polite">
                  {(Math.round(row.alpha * 100) / 100).toFixed(2)}
                </span>
              </span>
              <input
                ref={idx === rows.length - 1 ? lastRowTextRef : null}
                type="text"
                value={row.text}
                onChange={(e) => updateRow(row.id, { text: e.target.value })}
                onKeyDown={(e) => handleTextKeyDown(e, row.id)}
                placeholder="Line text…"
                className={css.textInput}
                aria-label={`Line text for line ${idx + 1}`}
              />
              <button
                type="button"
                className={css.removeButton}
                aria-label={`Remove line ${idx + 1}`}
                title="Remove this line"
                onClick={() => removeRow(row.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <button type="button" className={css.addRowButton} onClick={() => addRow(null)}>
        <span className={css.addGlyph} aria-hidden="true">＋</span>
        Add line
      </button>

      {characterSuggestions.length > 0 && (
        <datalist id={datalistId}>
          {characterSuggestions.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      )}
    </section>
  );
}
