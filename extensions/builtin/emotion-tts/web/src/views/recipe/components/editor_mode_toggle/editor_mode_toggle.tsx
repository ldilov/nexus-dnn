import { useCallback, useRef, type KeyboardEvent } from "react";
import * as css from "./editor_mode_toggle.css";

export type EditorMode = "quick" | "rows" | "story";

interface EditorModeToggleProps {
  value: EditorMode;
  onChange: (next: EditorMode) => void;
  storyDisabled?: boolean;
}

interface Option {
  id: EditorMode;
  label: string;
  glyph: string;
  description: string;
}

const OPTIONS: readonly Option[] = [
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice · plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line · multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
];

export const EDITOR_MODE_OPTIONS = OPTIONS;

export function EditorModeToggle({
  value,
  onChange,
  storyDisabled = false,
}: EditorModeToggleProps): JSX.Element {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusByOffset = useCallback(
    (currentIndex: number, offset: number) => {
      const total = OPTIONS.length;
      let next = currentIndex;
      for (let step = 1; step <= total; step += 1) {
        const candidate = (currentIndex + offset * step + total) % total;
        const opt = OPTIONS[candidate];
        if (!opt) continue;
        const disabled = opt.id === "story" && storyDisabled;
        if (!disabled) {
          next = candidate;
          break;
        }
      }
      const nextOpt = OPTIONS[next];
      if (!nextOpt) return;
      onChange(nextOpt.id);
      refs.current[next]?.focus();
    },
    [onChange, storyDisabled],
  );

  const handleKey = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, idx: number) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        focusByOffset(idx, 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        focusByOffset(idx, -1);
      } else if (event.key === "Home") {
        event.preventDefault();
        focusByOffset(-1, 1);
      } else if (event.key === "End") {
        event.preventDefault();
        focusByOffset(OPTIONS.length, -1);
      }
    },
    [focusByOffset],
  );

  return (
    <div className={css.root} role="radiogroup" aria-label="Editor mode">
      {OPTIONS.map((opt, idx) => {
        const active = opt.id === value;
        const disabled = opt.id === "story" && storyDisabled;
        const labelText = disabled ? `${opt.label} (coming soon)` : opt.label;
        return (
          <button
            key={opt.id}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-disabled={disabled || undefined}
            tabIndex={active ? 0 : -1}
            title={disabled ? `${opt.description} — coming soon` : opt.description}
            className={active ? css.segment.active : css.segment.idle}
            onClick={() => {
              if (disabled) return;
              onChange(opt.id);
            }}
            onKeyDown={(e) => handleKey(e, idx)}
          >
            <span className={css.glyph} aria-hidden="true">{opt.glyph}</span>
            <span>{labelText}</span>
          </button>
        );
      })}
    </div>
  );
}
