import { type KeyboardEvent, type ReactElement, useId } from "react";
import type { GenerationMode } from "../../../services/types";
import * as note from "./generation_mode_toggle.css";
import * as styles from "./quick_controls.css";

interface ModeOption {
  value: GenerationMode;
  label: string;
}

const OPTIONS: ModeOption[] = [
  { value: "image_to_video", label: "Image-to-Video" },
  { value: "text_to_video", label: "Text-to-Video" },
];

const T2V_EXPECTATION =
  "In Text-to-Video, the prompt sets content and motion — appearance is locked to the synthesized seed and won't restyle mid-take.";

interface GenerationModeToggleProps {
  value: GenerationMode;
  onChange: (value: GenerationMode) => void;
}

const ARROW_FORWARD = new Set(["ArrowRight", "ArrowDown"]);
const ARROW_BACKWARD = new Set(["ArrowLeft", "ArrowUp"]);

function segmentClass(active: boolean): string {
  return [styles.segment, active ? styles.segmentActive : ""].filter(Boolean).join(" ");
}

export function GenerationModeToggle({ value, onChange }: GenerationModeToggleProps): ReactElement {
  const labelId = useId();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const forward = ARROW_FORWARD.has(event.key);
    const backward = ARROW_BACKWARD.has(event.key);
    if (!forward && !backward) return;
    event.preventDefault();
    const current = OPTIONS.findIndex((option) => option.value === value);
    const delta = forward ? 1 : -1;
    const next = OPTIONS[(current + delta + OPTIONS.length) % OPTIONS.length];
    if (next && next.value !== value) onChange(next.value);
  };

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel} id={labelId}>
        Mode
      </span>
      <div className={styles.controlRow}>
        <div
          className={styles.segmentWrap}
          role="radiogroup"
          aria-labelledby={labelId}
          onKeyDown={handleKeyDown}
        >
          {OPTIONS.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                // biome-ignore lint/a11y/useSemanticElements: segmented radiogroup
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={segmentClass(isSelected)}
                onClick={() => onChange(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
      {value === "text_to_video" && (
        <p className={note.note} aria-live="polite">
          {T2V_EXPECTATION}
        </p>
      )}
    </div>
  );
}
