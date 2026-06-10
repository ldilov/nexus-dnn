import { type ReactElement, useMemo } from "react";
import { Badge } from "../../../components/ui/badge";
import {
  CUSTOM_RESOLUTION,
  buildResolutionOptions,
  matchResolutionOption,
} from "../../../domain/resolution_presets";
import type { PresetSummary } from "../../../services/types";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./quick_controls.css";

interface ResolutionControlProps {
  presets: PresetSummary[];
}

export function ResolutionControl({ presets }: ResolutionControlProps): ReactElement | null {
  const { params, updateParam } = useRenderRequest();
  const options = useMemo(() => buildResolutionOptions(presets), [presets]);
  if (options.length === 0) return null;

  const selection = matchResolutionOption(params, options);

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel} id="svi2-resolution-label">
        Generation resolution
      </span>
      <div className={styles.chipRow} role="radiogroup" aria-labelledby="svi2-resolution-label">
        {options.map((option) => {
          const isSelected = selection === option.id;
          return (
            <button
              key={option.id}
              type="button"
              // biome-ignore lint/a11y/useSemanticElements: chip radiogroup
              role="radio"
              aria-checked={isSelected}
              className={[styles.chip, isSelected ? styles.chipSelected : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                updateParam("width", option.width);
                updateParam("height", option.height);
              }}
            >
              {option.width}×{option.height}
              <span className={styles.chipMeta}>{option.label}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.customRow}>
        {selection === CUSTOM_RESOLUTION && (
          <Badge tone="warning">
            custom {params.width}×{params.height}
          </Badge>
        )}
        {options.find((o) => o.id === selection)?.offDistribution && (
          <Badge tone="warning">off-distribution</Badge>
        )}
      </div>
    </div>
  );
}
