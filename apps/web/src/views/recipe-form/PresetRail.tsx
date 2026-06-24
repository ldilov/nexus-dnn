import type { ReactElement } from "react";
import type { Preset } from "../../api/generated/Preset";
import type { PresetSource } from "../../api/generated/PresetSource";
import * as styles from "./preset_rail.css";

export interface PresetRailProps {
  presets: Preset[];
  selectedPresetId: string | null;
  onSelect: (presetId: string) => void;
}

const SOURCE_GROUPS: ReadonlyArray<{ source: PresetSource; label: string }> = [
  { source: "extension", label: "Extension" },
  { source: "recipe", label: "Recipe" },
  { source: "user", label: "User" },
];

function PresetChip({
  preset,
  isSelected,
  onSelect,
}: {
  preset: Preset;
  isSelected: boolean;
  onSelect: (presetId: string) => void;
}): ReactElement {
  return (
    <button
      type="button"
      className={`${styles.chip}${isSelected ? ` ${styles.chipSelected}` : ""}`}
      aria-pressed={isSelected}
      title={preset.description ?? preset.label}
      onClick={() => onSelect(preset.preset_id)}
    >
      {preset.label}
    </button>
  );
}

// LANDMINE(PROP-CONTRACT): prop is Preset[] (projection), NOT PresetDto[] — RecipeForm passes projection.presets · see .claude/checkpoints/LATEST.md
/**
 * Preset chips grouped by source (Extension, Recipe, User) in a stable order.
 * Renders preset names from the projection — no extension-id knowledge. Empty
 * groups render nothing. Selection overlay is handled by the parent container.
 */
export function PresetRail({
  presets,
  selectedPresetId,
  onSelect,
}: PresetRailProps): ReactElement {
  return (
    <div className={styles.rail} role="group" aria-label="Recipe presets">
      {SOURCE_GROUPS.map(({ source, label }) => {
        const groupPresets = presets.filter((preset) => preset.source === source);
        if (groupPresets.length === 0) return null;
        return (
          <div
            key={source}
            className={styles.group}
            role="group"
            aria-label={label}
          >
            <div className={styles.groupLabel} aria-hidden="true">
              {label}
            </div>
            <div className={styles.groupChips}>
              {groupPresets.map((preset) => (
                <PresetChip
                  key={preset.preset_id}
                  preset={preset}
                  isSelected={preset.preset_id === selectedPresetId}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
