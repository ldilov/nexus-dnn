import { type ReactElement, useCallback } from "react";
import {
  applyEngineChange,
  engineFromParams,
  engineUsesMaxineQuality,
  UPSCALE_ENGINE_OFF,
  UPSCALE_ENGINE_OPTIONS,
  UPSCALE_QUALITY_OPTIONS,
  UPSCALE_SCALE_OPTIONS,
} from "../../../domain/upscale_options";
import type { UpscaleModel, UpscaleQuality } from "../../../services/types";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./quick_controls.css";

function Chevron(): ReactElement {
  return (
    <span className={styles.selectChevron} aria-hidden="true">
      <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none" aria-hidden="true">
        <title>open</title>
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function UpscaleControls(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  const engine = engineFromParams(params.upscale_factor, params.upscale_model);
  const isOff = engine === UPSCALE_ENGINE_OFF;
  const showQuality = engineUsesMaxineQuality(engine);

  const handleEngine = useCallback(
    (value: string) => {
      const change = applyEngineChange(value, params.upscale_factor);
      updateParam("upscale_factor", change.upscale_factor);
      if (change.upscale_model !== undefined) {
        updateParam("upscale_model", change.upscale_model as UpscaleModel);
      }
    },
    [params.upscale_factor, updateParam],
  );

  return (
    <>
      <div className={styles.group}>
        <label className={styles.groupLabel} htmlFor="svi2-upscale-engine">
          Upscaler
        </label>
        <div className={styles.selectWrap}>
          <select
            id="svi2-upscale-engine"
            className={styles.select}
            value={engine}
            onChange={(e) => handleEngine(e.target.value)}
          >
            {UPSCALE_ENGINE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
        <span className={styles.hint}>
          Super-resolution after stitch, before interpolation. Auto = Maxine (RTX/Windows) →
          DRCT-L → Real-ESRGAN. DRCT-L is the highest-quality transformer (runs on aarch64/GB10).
        </span>
      </div>

      {!isOff && (
        <div className={styles.group}>
          <label className={styles.groupLabel} htmlFor="svi2-upscale-scale">
            Scale
          </label>
          <div className={styles.selectWrap}>
            <select
              id="svi2-upscale-scale"
              className={styles.select}
              value={String(params.upscale_factor ?? 2)}
              onChange={(e) => updateParam("upscale_factor", Number(e.target.value))}
            >
              {UPSCALE_SCALE_OPTIONS.map((o) => (
                <option key={o.value} value={String(o.value)}>
                  {o.label}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
          <span className={styles.hint}>Output multiplier applied to the rendered resolution.</span>
        </div>
      )}

      {!isOff && showQuality && (
        <div className={styles.group}>
          <label className={styles.groupLabel} htmlFor="svi2-upscale-quality">
            Maxine quality
          </label>
          <div className={styles.selectWrap}>
            <select
              id="svi2-upscale-quality"
              className={styles.select}
              value={String(params.upscale_quality ?? "HIGH")}
              onChange={(e) => updateParam("upscale_quality", e.target.value as UpscaleQuality)}
            >
              {UPSCALE_QUALITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
          <span className={styles.hint}>
            Maxine VSR preset (Maxine/Auto on Windows only; ignored by DRCT-L/Real-ESRGAN).
          </span>
        </div>
      )}
    </>
  );
}
