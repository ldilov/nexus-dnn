import type { ReactElement } from "react";
import { Badge } from "../../../components/ui/badge";
import { EmptyState } from "../../../components/ui/empty_state";
import { CANONICAL_PRESET_ID, presetBadges, sortPresets } from "../../../domain/preset_meta";
import type { PresetSummary } from "../../../services/types";
import * as styles from "./preset_gallery.css";

interface PresetGalleryProps {
  presets: PresetSummary[];
  selectedId: string | null;
  onSelect: (preset: PresetSummary) => void;
}

export function PresetGallery({
  presets,
  selectedId,
  onSelect,
}: PresetGalleryProps): ReactElement {
  if (presets.length === 0) {
    return (
      <EmptyState
        title="No presets available"
        detail="The preset catalog could not be loaded from the extension."
      />
    );
  }

  const ordered = sortPresets(presets);

  return (
    <div className={styles.grid} role="radiogroup" aria-label="Render presets">
      {ordered.map((preset) => {
        const badges = presetBadges(preset);
        const isSelected = preset.id === selectedId;
        const isCanonical = preset.id === CANONICAL_PRESET_ID;
        const cls = [styles.card, isSelected ? styles.cardSelected : ""]
          .filter(Boolean)
          .join(" ");
        return (
          <button
            key={preset.id}
            type="button"
            // biome-ignore lint/a11y/useSemanticElements: radiogroup of clickable preset cards
            role="radio"
            aria-checked={isSelected}
            className={cls}
            onClick={() => onSelect(preset)}
          >
            <div className={styles.titleRow}>
              <span className={styles.cardTitle}>{preset.label}</span>
              {isCanonical && <Badge tone="accent">Default</Badge>}
            </div>
            {isCanonical && (
              <span className={styles.recommendedHint}>Recommended baseline</span>
            )}
            <span className={styles.cardDescription}>{preset.description}</span>
            <div className={styles.badgeRow}>
              <Badge tone="neutral">{badges.resolution}</Badge>
              <Badge tone="neutral">{badges.duration}</Badge>
              <Badge tone={badges.isLowVram ? "success" : "neutral"}>{badges.vram}</Badge>
              {badges.isOffDistribution && <Badge tone="warning">off-distribution</Badge>}
              {badges.requiresLastImage && <Badge tone="warning">needs last image</Badge>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
