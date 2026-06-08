import { type KeyboardEvent, type ReactElement, useCallback, useMemo, useRef } from "react";
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

function tagline(description: string): string {
  const trimmed = description.trim();
  const firstSentence = trimmed.split(/(?<=[.!?])\s/)[0] ?? trimmed;
  return firstSentence.replace(/[.!?]+$/, "");
}

export function PresetGallery({
  presets,
  selectedId,
  onSelect,
}: PresetGalleryProps): ReactElement {
  const ordered = useMemo(() => sortPresets(presets), [presets]);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusIndex = useCallback(
    (index: number) => {
      const next = ordered[index];
      if (!next) return;
      refs.current[index]?.focus();
      onSelect(next);
    },
    [ordered, onSelect],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = ordered.length - 1;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          focusIndex(index === last ? 0 : index + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          focusIndex(index === 0 ? last : index - 1);
          break;
        case "Home":
          e.preventDefault();
          focusIndex(0);
          break;
        case "End":
          e.preventDefault();
          focusIndex(last);
          break;
        default:
          break;
      }
    },
    [ordered, focusIndex],
  );

  if (presets.length === 0) {
    return (
      <EmptyState
        title="No presets available"
        detail="The preset catalog could not be loaded from the extension."
      />
    );
  }

  const activeIndex = Math.max(
    0,
    ordered.findIndex((preset) => preset.id === selectedId),
  );

  return (
    <div className={styles.grid} role="radiogroup" aria-label="Render presets">
      {ordered.map((preset, index) => {
        const badges = presetBadges(preset);
        const isSelected = preset.id === selectedId;
        const isCanonical = preset.id === CANONICAL_PRESET_ID;
        const cls = [
          styles.card,
          isCanonical ? styles.cardCanonical : "",
          isSelected ? styles.cardSelected : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <button
            key={preset.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            // biome-ignore lint/a11y/useSemanticElements: radiogroup of clickable preset cards
            role="radio"
            aria-checked={isSelected}
            tabIndex={index === activeIndex ? 0 : -1}
            title={preset.description}
            className={cls}
            onClick={() => onSelect(preset)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <div className={styles.titleRow}>
              <span className={styles.cardTitle}>{preset.label}</span>
              {isCanonical && <Badge tone="accent">Default</Badge>}
            </div>
            <span className={styles.cardTagline}>{tagline(preset.description)}</span>
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
