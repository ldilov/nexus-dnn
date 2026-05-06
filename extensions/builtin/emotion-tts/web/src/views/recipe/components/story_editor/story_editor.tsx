import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import type { CharacterMapping } from "../../../../services/mappings_client";
import type { VectorPreset } from "../../../../services/presets_client";
import { caretCoordsInTextarea } from "../../lib/caret_position";
import {
  SIGIL_FOR_KIND,
  activeTriggerAt,
  sanitizeTokenName,
  tokeniseStory,
  type StoryPillKind,
  type StoryToken,
} from "../../lib/story_tokens";
import * as css from "./story_editor.css";

interface StoryEditorProps {
  value: string;
  onChange: (next: string) => void;
  characters: readonly string[];
  presets: readonly VectorPreset[];
  mappingsByLower: ReadonlyMap<string, CharacterMapping>;
}

interface PopoverState {
  triggerStart: number;
  query: string;
  kind: "character" | "emotion";
  selected: number;
  caretTop: number;
  caretLeft: number;
  caretHeight: number;
}

const PLACEHOLDER =
  "Type @character to set the speaker, /emotion to set the emotion preset.\n\n" +
  "@bob /happy I love mornings!\n@alice /melancholic I prefer evenings.";

export function StoryEditor({
  value,
  onChange,
  characters,
  presets,
  mappingsByLower,
}: StoryEditorProps): JSX.Element {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const popoverId = useId();
  const optionIdPrefix = `${popoverId}-opt`;
  const [popover, setPopover] = useState<PopoverState | null>(null);

  const tokens = useMemo(() => tokeniseStory(value), [value]);

  const characterSuggestions = useMemo(() => {
    const out = new Map<string, string>();
    mappingsByLower.forEach((m) => out.set(m.characterName.toLowerCase(), m.characterName));
    for (const c of characters) {
      const key = c.toLowerCase();
      if (!out.has(key)) out.set(key, c);
    }
    return Array.from(out.values()).sort((a, b) => a.localeCompare(b));
  }, [characters, mappingsByLower]);

  const filteredCandidates = useMemo(() => {
    if (!popover) return [] as { value: string; hint?: string }[];
    const q = popover.query.toLowerCase();
    if (popover.kind === "character") {
      return characterSuggestions
        .filter((c) => c.toLowerCase().includes(q))
        .slice(0, 8)
        .map((c) => {
          const mapping = mappingsByLower.get(c.toLowerCase());
          return { value: c, hint: mapping ? "mapped" : "unmapped" };
        });
    }
    const seen = new Set<string>();
    const out: { value: string; hint?: string }[] = [];
    for (const p of presets) {
      const key = p.presetName.toLowerCase();
      if (!key.includes(q)) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ value: p.presetName, hint: "vector" });
      if (out.length >= 8) break;
    }
    return out;
  }, [popover, characterSuggestions, mappingsByLower, presets]);

  const computePopoverFor = useCallback((nextValue: string, caret: number, prev: PopoverState | null): PopoverState | null => {
    if (caret < 0) return null;
    const trigger = activeTriggerAt(nextValue, caret);
    if (!trigger) return null;
    const ta = textareaRef.current;
    const coords = ta ? caretCoordsInTextarea(ta, caret) : { top: 0, left: 0, height: 0 };
    return {
      triggerStart: trigger.start,
      query: trigger.query,
      kind: trigger.kind,
      selected: prev && prev.kind === trigger.kind ? prev.selected : 0,
      caretTop: coords.top,
      caretLeft: coords.left,
      caretHeight: coords.height,
    };
  }, []);

  const updatePopoverFromSelection = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) {
      setPopover(null);
      return;
    }
    const caret = ta.selectionStart;
    if (caret !== ta.selectionEnd) {
      setPopover(null);
      return;
    }
    setPopover((prev) => computePopoverFor(value, caret, prev));
  }, [value, computePopoverFor]);

  useEffect(() => {
    if (!popover) return;
    const max = filteredCandidates.length;
    const desired = max === 0 ? 0 : Math.min(popover.selected, max - 1);
    if (popover.selected !== desired) {
      setPopover({ ...popover, selected: desired });
    }
  }, [popover, filteredCandidates]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const ta = textareaRef.current;
    if (!overlay || !ta) return;
    overlay.scrollTop = ta.scrollTop;
    overlay.scrollLeft = ta.scrollLeft;
  });

  useEffect(() => {
    const ta = textareaRef.current;
    const overlay = overlayRef.current;
    if (!ta || !overlay) return;
    const sync = (): void => {
      overlay.scrollTop = ta.scrollTop;
      overlay.scrollLeft = ta.scrollLeft;
    };
    ta.addEventListener("scroll", sync, { passive: true });
    return () => ta.removeEventListener("scroll", sync);
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.target.value;
      onChange(nextValue);
      const ta = event.target;
      requestAnimationFrame(() => {
        const caret = ta.selectionStart;
        if (caret !== ta.selectionEnd) {
          setPopover(null);
          return;
        }
        setPopover((prev) => computePopoverFor(nextValue, caret, prev));
      });
    },
    [onChange, computePopoverFor],
  );

  const handleSelect = useCallback(() => {
    updatePopoverFromSelection();
  }, [updatePopoverFromSelection]);

  const insertCompletion = useCallback(
    (replacement: string, opts: { advanceFocus: boolean }) => {
      if (!popover) return;
      const sigil = SIGIL_FOR_KIND[popover.kind];
      const tokenEnd = popover.triggerStart + 1 + popover.query.length;
      const before = value.slice(0, popover.triggerStart);
      const after = value.slice(tokenEnd);
      const safeName = sanitizeTokenName(replacement);
      if (!safeName) return;
      const insertion = `${sigil}${safeName} `;
      const next = `${before}${insertion}${after}`;
      onChange(next);
      const caretPos = before.length + insertion.length;
      setPopover(null);
      if (!opts.advanceFocus) {
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(caretPos, caretPos);
          }
        });
      }
    },
    [popover, value, onChange],
  );

  const handleKey = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (!popover) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setPopover(null);
        return;
      }
      if (filteredCandidates.length === 0) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setPopover((p) => (p ? { ...p, selected: (p.selected + 1) % filteredCandidates.length } : p));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setPopover((p) =>
          p ? { ...p, selected: (p.selected - 1 + filteredCandidates.length) % filteredCandidates.length } : p,
        );
      } else if (event.key === "Enter") {
        const choice = filteredCandidates[popover.selected];
        if (choice) {
          event.preventDefault();
          insertCompletion(choice.value, { advanceFocus: false });
        }
      } else if (event.key === "Tab") {
        const choice = filteredCandidates[popover.selected];
        if (choice) {
          insertCompletion(choice.value, { advanceFocus: true });
        }
      }
    },
    [popover, filteredCandidates, insertCompletion],
  );

  const popoverElRef = useRef<HTMLDivElement | null>(null);
  const [clampedLeft, setClampedLeft] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!popover) {
      setClampedLeft(null);
      return;
    }
    const popoverEl = popoverElRef.current;
    const ta = textareaRef.current;
    if (!popoverEl || !ta) return;
    const popoverWidth = popoverEl.offsetWidth;
    const stageWidth = ta.clientWidth;
    const maxLeft = Math.max(0, stageWidth - popoverWidth - 8);
    const desiredLeft = Math.max(0, popover.caretLeft);
    setClampedLeft(Math.min(desiredLeft, maxLeft));
  }, [popover]);

  const popoverHeader = popover?.kind === "character" ? "Character" : "Emotion preset";
  const activeOptionId =
    popover && filteredCandidates.length > 0
      ? `${optionIdPrefix}-${popover.selected}`
      : undefined;
  const popoverEmptyHint = (() => {
    if (!popover || filteredCandidates.length > 0) return null;
    if (popover.kind === "emotion") {
      return presets.length === 0
        ? "No emotion presets yet — create one in Mappings."
        : `No preset matches "${popover.query}". Type a different name or pick from Mappings.`;
    }
    if (popover.query.length === 0) {
      return "Type a name — we'll create a new character on the fly.";
    }
    return `No character "${popover.query}" yet — keep typing to define a new one.`;
  })();

  return (
    <div className={css.root}>
      <div className={css.stage}>
        <div ref={overlayRef} className={css.overlay} aria-hidden="true">
          {renderOverlay(tokens, popover?.triggerStart ?? null)}
        </div>
        <textarea
          ref={textareaRef}
          className={css.textarea}
          value={value}
          onChange={handleChange}
          onSelect={handleSelect}
          onKeyDown={handleKey}
          placeholder={PLACEHOLDER}
          rows={10}
          spellCheck
          aria-label="Story script"
          aria-controls={popover && filteredCandidates.length > 0 ? popoverId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
        />
        {popover && (filteredCandidates.length > 0 || popoverEmptyHint) && (
          <div
            ref={popoverElRef}
            className={css.popover}
            style={{
              top: `${popover.caretTop + popover.caretHeight + 6}px`,
              left: `${clampedLeft ?? Math.max(0, popover.caretLeft)}px`,
            }}
          >
            <div className={css.popoverHeader} aria-hidden="true">
              {popoverHeader}
            </div>
            {filteredCandidates.length > 0 ? (
              <ul
                id={popoverId}
                role="listbox"
                aria-label={popoverHeader}
                className={css.popoverList}
              >
                {filteredCandidates.map((c, idx) => {
                  const id = `${optionIdPrefix}-${idx}`;
                  const isActive = idx === popover.selected;
                  return (
                    <li
                      id={id}
                      key={`${c.value}-${idx}`}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive || undefined}
                      className={css.popoverItem}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        insertCompletion(c.value, { advanceFocus: false });
                      }}
                    >
                      <span>{c.value}</span>
                      {c.hint && <span className={css.popoverItemHint}>{c.hint}</span>}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div id={popoverId} role="status" className={css.popoverEmpty}>
                {popoverEmptyHint}
              </div>
            )}
          </div>
        )}
      </div>
      <p className={css.helpRow}>
        <span><kbd className={css.helpKbd}>@</kbd> character</span>
        <span><kbd className={css.helpKbd}>/</kbd> emotion</span>
        <span><kbd className={css.helpKbd}>⏎</kbd> commits</span>
        <span><kbd className={css.helpKbd}>⇥</kbd> commits + advance</span>
      </p>
    </div>
  );
}

function renderOverlay(tokens: readonly StoryToken[], activeStart: number | null): JSX.Element[] {
  return tokens.map((t, idx) => {
    if (t.kind === "text") {
      return (
        <span key={`${t.start}-${idx}`} className={css.tokenText}>
          {t.value}
        </span>
      );
    }
    const kind: StoryPillKind = t.kind;
    const isActive = activeStart !== null && t.start === activeStart;
    const display = t.value.replace(/_/g, " ");
    return (
      <span
        key={`${t.start}-${idx}`}
        className={css.storyPill}
        data-kind={kind}
        data-active={isActive ? "true" : undefined}
      >
        <span className={css.badgeSigil}>{SIGIL_FOR_KIND[kind]}</span>
        {display}
      </span>
    );
  });
}
