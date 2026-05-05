import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import { toast } from "sonner";
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
  const unmappedPopoverId = useId();
  const addRowButtonRef = useRef<HTMLButtonElement | null>(null);
  const textInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const removeButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const characterInputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const [pendingFocus, setPendingFocus] = useState<{ kind: "text" | "remove" | "addBtn" | "character" | "unmappedFirstItem"; rowId?: string } | null>(null);
  const [unmappedOpen, setUnmappedOpen] = useState(false);
  const unmappedAnchorRef = useRef<HTMLButtonElement | null>(null);
  const unmappedPopoverRef = useRef<HTMLDivElement | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState("");

  useEffect(() => {
    if (!pendingFocus) return;
    if (pendingFocus.kind === "addBtn") {
      addRowButtonRef.current?.focus();
    } else if (pendingFocus.kind === "text" && pendingFocus.rowId) {
      textInputRefs.current.get(pendingFocus.rowId)?.focus();
    } else if (pendingFocus.kind === "remove" && pendingFocus.rowId) {
      removeButtonRefs.current.get(pendingFocus.rowId)?.focus();
    } else if (pendingFocus.kind === "character" && pendingFocus.rowId) {
      characterInputRefs.current.get(pendingFocus.rowId)?.focus();
    } else if (pendingFocus.kind === "unmappedFirstItem") {
      const firstItem = unmappedPopoverRef.current?.querySelector<HTMLButtonElement>("button");
      firstItem?.focus();
    }
    setPendingFocus(null);
  }, [pendingFocus]);

  const totalLines = rows.filter((r) => r.text.trim().length > 0).length;
  const unmappedNames = useMemo(() => {
    const seen = new Map<string, string>();
    for (const r of rows) {
      const display = r.character.trim();
      const lower = display.toLowerCase();
      if (!lower || lower === "narrator") continue;
      if (mappingsByLower.has(lower)) continue;
      if (!seen.has(lower)) seen.set(lower, display);
    }
    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
  }, [rows, mappingsByLower]);
  const unmappedCount = unmappedNames.length;

  const prevUnmappedRef = useRef(unmappedCount);
  const [nudgeKey, setNudgeKey] = useState(0);
  useEffect(() => {
    if (unmappedCount > prevUnmappedRef.current) setNudgeKey((k) => k + 1);
    prevUnmappedRef.current = unmappedCount;
  }, [unmappedCount]);

  useEffect(() => {
    if (!unmappedOpen) return;
    setPendingFocus({ kind: "unmappedFirstItem" });
    const onMouseDown = (event: MouseEvent): void => {
      if (!unmappedPopoverRef.current || !unmappedAnchorRef.current) return;
      const target = event.target as Node;
      if (
        unmappedPopoverRef.current.contains(target) ||
        unmappedAnchorRef.current.contains(target)
      ) {
        return;
      }
      setUnmappedOpen(false);
    };
    const onKey = (event: KeyboardEvent | globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") {
        setUnmappedOpen(false);
        unmappedAnchorRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey as EventListener);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey as EventListener);
    };
  }, [unmappedOpen]);

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

  const rowsRef = useRef(rows);
  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);
  const removeRow = useCallback(
    (id: string) => {
      const idx = rows.findIndex((r) => r.id === id);
      if (idx < 0) return;
      const removed = rows[idx];
      if (!removed) return;
      const next = rows.filter((r) => r.id !== id);
      onRowsChange(next);
      const labelChar = removed.character.trim() || `Line ${idx + 1}`;
      toast(`Removed ${labelChar}`, {
        action: {
          label: "Undo",
          onClick: () => {
            const current = rowsRef.current;
            if (current.some((r) => r.id === removed.id)) return;
            const restored = [...current];
            const insertAt = Math.min(idx, restored.length);
            restored.splice(insertAt, 0, removed);
            onRowsChange(restored);
          },
        },
        duration: 5000,
      });
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

  const moveRow = useCallback(
    (id: string, direction: -1 | 1) => {
      const idx = rows.findIndex((r) => r.id === id);
      if (idx < 0) return;
      const target = idx + direction;
      if (target < 0 || target >= rows.length) return;
      const next = [...rows];
      const a = next[idx];
      const b = next[target];
      if (!a || !b) return;
      next[idx] = b;
      next[target] = a;
      onRowsChange(next);
      const label = a.character.trim() || `Line ${idx + 1}`;
      setLiveMessage(`Moved ${label} to position ${target + 1} of ${next.length}`);
    },
    [rows, onRowsChange],
  );

  const handleTextKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, rowId: string) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        addRow(rowId);
      } else if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        moveRow(rowId, -1);
      } else if (event.altKey && event.key === "ArrowDown") {
        event.preventDefault();
        moveRow(rowId, 1);
      }
    },
    [addRow, moveRow],
  );

  const handleDragStart = useCallback((event: DragEvent<HTMLElement>, id: string) => {
    setDraggingId(id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLLIElement>, id: string) => {
    if (!draggingId) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    if (dragOverId !== id) setDragOverId(id);
  }, [draggingId, dragOverId]);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLLIElement>, targetId: string) => {
      event.preventDefault();
      const sourceId = draggingId ?? event.dataTransfer.getData("text/plain");
      setDraggingId(null);
      setDragOverId(null);
      if (!sourceId || sourceId === targetId) return;
      const sourceIdx = rows.findIndex((r) => r.id === sourceId);
      const targetIdx = rows.findIndex((r) => r.id === targetId);
      if (sourceIdx < 0 || targetIdx < 0) return;
      const next = [...rows];
      const [moved] = next.splice(sourceIdx, 1);
      if (!moved) return;
      next.splice(targetIdx, 0, moved);
      onRowsChange(next);
      const label = moved.character.trim() || `Line ${sourceIdx + 1}`;
      setLiveMessage(`Moved ${label} to position ${targetIdx + 1} of ${next.length}`);
    },
    [rows, onRowsChange, draggingId],
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setDragOverId(null);
  }, []);

  const handleUnmappedClick = useCallback(
    (name: string) => {
      const target = rows.find((r) => r.character.trim().toLowerCase() === name.toLowerCase());
      if (target) {
        setPendingFocus({ kind: "character", rowId: target.id });
      }
      setUnmappedOpen(false);
    },
    [rows],
  );

  return (
    <section className={css.root} aria-labelledby={headerId}>
      <header className={css.header}>
        <span className={css.headerEyebrow} id={headerId}>02 / Per-character lines</span>
        <span className={css.counter} aria-live="polite">
          <span className={css.counterValue}>{totalLines.toString().padStart(2, "0")}</span> lines
          {unmappedCount > 0 && (
            <span className={css.unmappedAnchor}>
              <button
                ref={unmappedAnchorRef}
                key={nudgeKey}
                type="button"
                className={css.unmappedBadge}
                aria-haspopup="dialog"
                aria-expanded={unmappedOpen}
                aria-controls={unmappedPopoverId}
                title="Click to see unmapped characters"
                onClick={() => setUnmappedOpen((v) => !v)}
              >
                ⚠ {unmappedCount} unmapped
              </button>
              {unmappedOpen && (
                <div
                  ref={unmappedPopoverRef}
                  id={unmappedPopoverId}
                  role="dialog"
                  aria-label="Unmapped characters"
                  className={css.unmappedPopover}
                >
                  <p className={css.unmappedPopoverHint}>
                    These characters have no voice mapping. Click a name to jump to its row.
                  </p>
                  <ul className={css.unmappedList}>
                    {unmappedNames.map((name) => (
                      <li key={name}>
                        <button
                          type="button"
                          className={css.unmappedListItem}
                          onClick={() => handleUnmappedClick(name)}
                        >
                          {name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
            const isDragging = draggingId === row.id;
            const isDragOver = dragOverId === row.id && draggingId !== row.id;
            return (
              <li
                key={row.id}
                className={css.row}
                data-mapped={isMapped || undefined}
                data-dragging={isDragging || undefined}
                data-drag-over={isDragOver || undefined}
                onDragOver={(e) => handleDragOver(e, row.id)}
                onDrop={(e) => handleDrop(e, row.id)}
                onDragEnd={handleDragEnd}
              >
                <button
                  type="button"
                  className={css.dragHandle}
                  draggable
                  aria-label={`Drag to reorder ${characterLabel}. Use Alt+ArrowUp / Alt+ArrowDown for keyboard reorder.`}
                  title="Drag to reorder · Alt+↑ / Alt+↓"
                  onDragStart={(e) => handleDragStart(e, row.id)}
                  onKeyDown={(e) => {
                    if (e.altKey && e.key === "ArrowUp") {
                      e.preventDefault();
                      moveRow(row.id, -1);
                    } else if (e.altKey && e.key === "ArrowDown") {
                      e.preventDefault();
                      moveRow(row.id, 1);
                    }
                  }}
                >
                  ⋮⋮
                </button>
                <span className={css.ordinal} aria-hidden="true">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <input
                  ref={(el) => {
                    if (el) characterInputRefs.current.set(row.id, el);
                    else characterInputRefs.current.delete(row.id);
                  }}
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
                {idx < rows.length - 1 && (
                  <button
                    type="button"
                    className={css.interRowAdd}
                    aria-label={`Insert line after ${characterLabel}`}
                    title="Insert line below"
                    onClick={() => addRow(row.id)}
                    tabIndex={-1}
                  >
                    <span aria-hidden="true">＋</span>
                  </button>
                )}
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

      <div className={css.srOnly} role="status" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>
    </section>
  );
}
