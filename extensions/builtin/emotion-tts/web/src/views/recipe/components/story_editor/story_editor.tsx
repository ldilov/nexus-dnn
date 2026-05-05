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
import { activeTriggerAt, tokeniseStory, type StoryToken } from "../../lib/story_tokens";
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
  const [popover, setPopover] = useState<PopoverState | null>(null);

  const tokens = useMemo(() => tokeniseStory(value), [value]);

  const characterSuggestions = useMemo(() => {
    const out = new Set<string>();
    mappingsByLower.forEach((m) => out.add(m.characterName));
    for (const c of characters) out.add(c);
    return Array.from(out).sort((a, b) => a.localeCompare(b));
  }, [characters, mappingsByLower]);

  const filteredCandidates = useMemo(() => {
    if (!popover) return [] as { value: string; hint?: string }[];
    const q = popover.query.toLowerCase();
    if (popover.kind === "character") {
      const items = characterSuggestions
        .filter((c) => c.toLowerCase().includes(q))
        .slice(0, 8)
        .map((c) => {
          const mapping = mappingsByLower.get(c.toLowerCase());
          return { value: c, hint: mapping ? "mapped" : "unmapped" };
        });
      return items;
    }
    return presets
      .filter((p) => p.presetName.toLowerCase().includes(q))
      .slice(0, 8)
      .map((p) => ({ value: p.presetName, hint: "vector" }));
  }, [popover, characterSuggestions, mappingsByLower, presets]);

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
    const trigger = activeTriggerAt(value, caret);
    if (!trigger) {
      setPopover(null);
      return;
    }
    setPopover((prev) => ({
      triggerStart: trigger.start,
      query: trigger.query,
      kind: trigger.kind,
      selected: prev && prev.kind === trigger.kind ? Math.min(prev.selected, 0) : 0,
    }));
  }, [value]);

  useEffect(() => {
    if (popover && filteredCandidates.length === 0) {
      setPopover(null);
    } else if (popover && popover.selected >= filteredCandidates.length) {
      setPopover({ ...popover, selected: 0 });
    }
  }, [popover, filteredCandidates]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const ta = textareaRef.current;
    if (!overlay || !ta) return;
    overlay.scrollTop = ta.scrollTop;
    overlay.scrollLeft = ta.scrollLeft;
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
      requestAnimationFrame(updatePopoverFromSelection);
    },
    [onChange, updatePopoverFromSelection],
  );

  const handleSelect = useCallback(() => {
    updatePopoverFromSelection();
  }, [updatePopoverFromSelection]);

  const insertCompletion = useCallback(
    (replacement: string) => {
      const ta = textareaRef.current;
      if (!ta || !popover) return;
      const sigil = popover.kind === "character" ? "@" : "/";
      const tokenEnd = popover.triggerStart + 1 + popover.query.length;
      const before = value.slice(0, popover.triggerStart);
      const after = value.slice(tokenEnd);
      const insertion = `${sigil}${replacement} `;
      const next = `${before}${insertion}${after}`;
      onChange(next);
      const caretPos = before.length + insertion.length;
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(caretPos, caretPos);
        }
      });
      setPopover(null);
    },
    [popover, value, onChange],
  );

  const handleKey = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (!popover || filteredCandidates.length === 0) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setPopover((p) => (p ? { ...p, selected: (p.selected + 1) % filteredCandidates.length } : p));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setPopover((p) =>
          p ? { ...p, selected: (p.selected - 1 + filteredCandidates.length) % filteredCandidates.length } : p,
        );
      } else if (event.key === "Enter" || event.key === "Tab") {
        const choice = filteredCandidates[popover.selected];
        if (choice) {
          event.preventDefault();
          insertCompletion(choice.value);
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        setPopover(null);
      }
    },
    [popover, filteredCandidates, insertCompletion],
  );

  const popoverHeader = popover?.kind === "character" ? "Character" : "Emotion preset";

  return (
    <div className={css.root}>
      <div className={css.stage}>
        <div ref={overlayRef} className={css.overlay} aria-hidden="true">
          {renderOverlay(tokens)}
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
          aria-controls={popover ? popoverId : undefined}
          aria-expanded={popover ? true : undefined}
          aria-autocomplete="list"
        />
        {popover && filteredCandidates.length > 0 && (
          <ul
            id={popoverId}
            role="listbox"
            aria-label={popoverHeader}
            className={css.popover}
            style={{ left: "1rem", bottom: "1rem" }}
          >
            <li className={css.popoverHeader} aria-hidden="true">
              {popoverHeader}
            </li>
            {filteredCandidates.map((c, idx) => (
              <li
                key={c.value}
                role="option"
                aria-selected={idx === popover.selected}
                data-active={idx === popover.selected || undefined}
                className={css.popoverItem}
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertCompletion(c.value);
                }}
              >
                <span>{c.value}</span>
                {c.hint && <span className={css.popoverItemHint}>{c.hint}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className={css.helpRow}>
        Type <span className={css.helpKbd}>@</span> for a character,{" "}
        <span className={css.helpKbd}>/</span> for an emotion. Newlines do not split lines —
        a new <span className={css.helpKbd}>@</span> does.
      </p>
    </div>
  );
}

function renderOverlay(tokens: readonly StoryToken[]): JSX.Element[] {
  return tokens.map((t, idx) => {
    if (t.kind === "character") {
      return (
        <span key={`${t.start}-${idx}`} className={css.characterBadge}>
          @{t.value}
        </span>
      );
    }
    if (t.kind === "emotion") {
      return (
        <span key={`${t.start}-${idx}`} className={css.emotionBadge}>
          /{t.value}
        </span>
      );
    }
    return (
      <span key={`${t.start}-${idx}`} className={css.tokenText}>
        {t.value}
      </span>
    );
  });
}
