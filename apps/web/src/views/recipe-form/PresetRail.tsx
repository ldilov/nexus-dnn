import type { ReactElement } from "react";
import type { Preset } from "../../api/generated/Preset";
import * as styles from "./preset_rail.css";

export interface PresetRailProps {
  presets: Preset[];
  selectedPresetId: string | null;
  onSelect: (presetId: string) => void;
}

/**
 * Horizontal strip of preset chips. Renders the preset name from the
 * projection — no extension-id knowledge. Selection overlay (applying
 * preset values onto control state) is handled by the parent container.
 */
export function PresetRail({
  presets,
  selectedPresetId,
  onSelect,
}: PresetRailProps): ReactElement {
  return (
    <div className={styles.rail} role="group" aria-label="Recipe presets">
      {presets.map((preset) => {
        const isSelected = preset.preset_id === selectedPresetId;
        return (
          <button
            key={preset.preset_id}
            type="button"
            className={`${styles.chip}${isSelected ? ` ${styles.chipSelected}` : ""}`}
            aria-pressed={isSelected}
            title={preset.description ?? preset.label}
            onClick={() => onSelect(preset.preset_id)}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}
