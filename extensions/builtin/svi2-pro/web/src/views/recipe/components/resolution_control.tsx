import { type ReactElement, useMemo, useState } from "react";
import type { Dimensions } from "../../../domain/custom_resolution";
import {
  CUSTOM_RESOLUTION,
  buildResolutionOptions,
  matchResolutionOption,
} from "../../../domain/resolution_presets";
import type { PresetSummary } from "../../../services/types";
import { useRenderRequest } from "../../../store/render_request_store";
import { CustomResolutionForm } from "./custom_resolution_form";
import * as styles from "./quick_controls.css";

interface ResolutionControlProps {
  presets: PresetSummary[];
}

function CheckIcon(): ReactElement {
  return (
    <svg viewBox="0 0 20 20" width="100%" height="100%" fill="none" aria-hidden="true">
      <title>selected</title>
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.2l2.3 2.3 4.7-4.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ResolutionControl({ presets }: ResolutionControlProps): ReactElement | null {
  const { params, updateParam } = useRenderRequest();
  const options = useMemo(() => buildResolutionOptions(presets), [presets]);
  const [customOpen, setCustomOpen] = useState(false);
  if (options.length === 0) return null;

  const selection = matchResolutionOption(params, options);
  // The custom panel is active when the canvas is off the preset ladder, or the
  // user explicitly opened the form (their dims may still happen to match a step).
  const customActive = selection === CUSTOM_RESOLUTION || customOpen;
  const width = params.width ?? 832;
  const height = params.height ?? 480;

  const applyDimensions = (dims: Dimensions): void => {
    updateParam("width", dims.width);
    updateParam("height", dims.height);
  };

  return (
    <div className={styles.group}>
      <span className={styles.groupLabel} id="svi2-resolution-label">
        Generation resolution
      </span>
      <div className={styles.resGrid} role="radiogroup" aria-labelledby="svi2-resolution-label">
        {options.map((option) => {
          const isSelected = !customActive && selection === option.id;
          const cardCls = [styles.resCard, isSelected ? styles.resCardActive : ""]
            .filter(Boolean)
            .join(" ");
          const checkCls = [styles.resCheck, isSelected ? styles.resCheckActive : ""]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={option.id}
              type="button"
              // biome-ignore lint/a11y/useSemanticElements: card radiogroup
              role="radio"
              aria-checked={isSelected}
              className={cardCls}
              onClick={() => {
                setCustomOpen(false);
                updateParam("width", option.width);
                updateParam("height", option.height);
              }}
            >
              <span className={styles.resHead}>
                <span className={styles.resValue}>
                  {option.width}×{option.height}
                </span>
                <span className={checkCls}>
                  <CheckIcon />
                </span>
              </span>
              <span className={styles.resLabel}>{option.label}</span>
              <span className={styles.resSub}>{option.sub}</span>
              {option.stepsDown > 0 && (
                <span
                  className={
                    option.stepsDown >= 2 ? styles.resBadgeWarn : styles.resBadgeNeutral
                  }
                >
                  {option.stepsDown >= 2 ? "off-distribution" : "below native"}
                </span>
              )}
            </button>
          );
        })}

        <button
          type="button"
          // biome-ignore lint/a11y/useSemanticElements: card radiogroup
          role="radio"
          aria-checked={customActive}
          className={[styles.resCard, styles.resCardAdd, customActive ? styles.resCardActive : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setCustomOpen(true)}
        >
          <span className={styles.resHead}>
            <span className={styles.resValue}>Custom</span>
            <span
              className={[styles.resCheck, customActive ? styles.resCheckActive : ""].join(" ")}
            >
              <CheckIcon />
            </span>
          </span>
          <span className={styles.resLabel}>Any aspect & budget</span>
          <span className={styles.resAddSub}>9:16 portrait, square, or a custom Wan2.2 canvas</span>
        </button>
      </div>

      {customActive && (
        <CustomResolutionForm width={width} height={height} onChange={applyDimensions} />
      )}
    </div>
  );
}
