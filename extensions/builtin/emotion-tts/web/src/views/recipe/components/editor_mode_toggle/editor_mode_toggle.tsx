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
  { id: "quick", label: "Quick", glyph: "01", description: "Single voice, plain prose" },
  { id: "rows", label: "Per-character", glyph: "02", description: "One row per line, multi-voice" },
  { id: "story", label: "Story", glyph: "03", description: "Free-form text with @character and /emotion commands" },
];

export function EditorModeToggle({
  value,
  onChange,
  storyDisabled = false,
}: EditorModeToggleProps): JSX.Element {
  return (
    <div className={css.root} role="tablist" aria-label="Editor mode">
      {OPTIONS.map((opt) => {
        const active = opt.id === value;
        const disabled = opt.id === "story" && storyDisabled;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-pressed={active}
            disabled={disabled}
            title={disabled ? `${opt.description} — coming soon` : opt.description}
            className={active ? css.segment.active : css.segment.idle}
            onClick={() => onChange(opt.id)}
          >
            <span className={css.glyph} aria-hidden="true">{opt.glyph}</span>
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
