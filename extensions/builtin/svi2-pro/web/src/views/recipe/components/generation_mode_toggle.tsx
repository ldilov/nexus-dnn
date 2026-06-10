import type { ReactElement } from "react";
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

function segmentClass(active: boolean): string {
  return [styles.segment, active ? styles.segmentActive : ""].filter(Boolean).join(" ");
}

export function GenerationModeToggle({ value, onChange }: GenerationModeToggleProps): ReactElement {
  return (
    <div className={styles.group}>
      <span className={styles.groupLabel} id="svi2-mode-label">
        Mode
      </span>
      <div className={styles.controlRow}>
        <div className={styles.segmentWrap} role="radiogroup" aria-labelledby="svi2-mode-label">
          {OPTIONS.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                // biome-ignore lint/a11y/useSemanticElements: segmented radiogroup
                role="radio"
                aria-checked={isSelected}
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
