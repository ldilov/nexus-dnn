import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
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
  const headerId = useId();
  const addRowButtonRef = useRef<HTMLButtonElement | null>(null);
  const textInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const removeButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pendingFocus, setPendingFocus] = useState<{ kind: "text" | "remove" | "addBtn"; rowId?: string } | null>(null);

  useEffect(() => {
    if (!pendingFocus) return;
    if (pendingFocus.kind === "addBtn") {
      addRowButtonRef.current?.focus();
    } else if (pendingFocus.kind === "text" && pendingFocus.rowId) {
      textInputRefs.current.get(pendingFocus.rowId)?.focus();
    } else if (pendingFocus.kind === "remove" && pendingFocus.rowId) {
      removeButtonRefs.current.get(pendingFocus.rowId)?.focus();
    }
    setPendingFocus(null);
  }, [pendingFocus]);

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

  const prevUnmappedRef = useRef(unmappedCount);
  const [nudgeKey, setNudgeKey] = useState(0);
  useEffect(() => {
    if (unmappedCount > prevUnmappedRef.current) setNudgeKey((k) => k + 1);
    prevUnmappedRef.current = unmappedCount;
  }, [unmappedCount]);

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
      const idx = rows.findIndex((r) => r.id === id);
      if (idx < 0) return;
      const next = rows.filter((r) => r.id !== id);
      onRowsChange(next);
      if (next.length === 0) {
        setPendingFocus({ kind: "addBtn" });
      } else {
        const focusIdx = idx < next.length ? idx : next.length - 1;
        const focusRow = next[focusIdx];
        if (focusRow) {
          setPendingFocus({ kind: "remove", rowId: focusRow.id });
        } else {
          setPendingFocus({ kind: "addBtn" });
        }
      }
    },
    [rows, onRowsChange],
  );

  const addRow = useCallback(
    (afterId: string | null) => {
      const next = newEmptyRow();
      let newRows: PerCharacterRow[];
      if (afterId === null) {
        newRows = [...rows, next];
      } else {
        const idx = rows.findIndex((r) => r.id === afterId);
        newRows = idx < 0
          ? [...rows, next]
          : [...rows.slice(0, idx + 1), next, ...rows.slice(idx + 1)];
      }
      onRowsChange(newRows);
      setPendingFocus({ kind: "text", rowId: next.id });
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
    <section className={css.root} aria-labelledby={headerId}>
      <header className={css.header}>
        <span className={css.headerEyebrow} id={headerId}>02 / Per-character lines</span>
        <span className={css.counter} aria-live="polite">
          <span className={css.counterValue}>{totalLines.toString().padStart(2, "0")}</span> lines
          {unmappedCount > 0 && (
            <span
              key={nudgeKey}
              className={css.unmappedBadge}
              title="Characters without a mapping will fail at run time"
            >
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
          {rows.map((row, idx) => {
            const characterLabel = row.character.trim() || `line ${idx + 1}`;
            const isMapped = mappingsByLower.has(row.character.trim().toLowerCase());
            return (
              <li key={row.id} className={css.row} data-mapped={isMapped || undefined}>
                <span className={css.ordinal} aria-hidden="true">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <input
                  type="text"
                  value={row.character}
                  onChange={(e) => updateRow(row.id, { character: e.target.value })}
                  placeholder="Character"
                  className={css.characterInput}
                  aria-label={`Character name for ${characterLabel}`}
                  list={characterSuggestions.length > 0 ? datalistId : undefined}
                  autoComplete="off"
                  spellCheck={false}
                />
                <select
                  value={row.presetId ?? ""}
                  onChange={(e) =>
                    updateRow(row.id, { presetId: e.target.value === "" ? null : e.target.value })
                  }
                  className={css.presetSelect}
                  aria-label={`Emotion preset for ${characterLabel}`}
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
                    aria-label={`Emotion intensity for ${characterLabel}`}
                    aria-valuetext={`${Math.round(row.alpha * 100)} percent`}
                  />
                  <span
                    className={css.alphaValue}
                    aria-hidden="true"
                    data-hot={row.alpha >= 0.85 || undefined}
                  >
                    {(Math.round(row.alpha * 100) / 100).toFixed(2)}
                  </span>
                </span>
                <input
                  ref={(el) => {
                    if (el) textInputRefs.current.set(row.id, el);
                    else textInputRefs.current.delete(row.id);
                  }}
                  type="text"
                  value={row.text}
                  onChange={(e) => updateRow(row.id, { text: e.target.value })}
                  onKeyDown={(e) => handleTextKeyDown(e, row.id)}
                  placeholder="Line text…"
                  className={css.textInput}
                  aria-label={`Line text for ${characterLabel}`}
                />
                <button
                  ref={(el) => {
                    if (el) removeButtonRefs.current.set(row.id, el);
                    else removeButtonRefs.current.delete(row.id);
                  }}
                  type="button"
                  className={css.removeButton}
                  aria-label={`Remove ${characterLabel}`}
                  title="Remove this line"
                  onClick={() => removeRow(row.id)}
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button
        ref={addRowButtonRef}
        type="button"
        className={css.addRowButton}
        onClick={() => addRow(null)}
        aria-label="Add character line"
      >
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
