import { type ReactElement, useMemo } from "react";
import { segmentDefaults, stitchedFrames } from "../../../domain/length";
import {
  CUSTOM_RESOLUTION,
  buildResolutionOptions,
  matchResolutionOption,
} from "../../../domain/resolution_presets";
import { isFlf2vMode } from "../../../domain/validation";
import type { PresetSummary } from "../../../services/types";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./output_spec_bar.css";

interface OutputSpecBarProps {
  presets: PresetSummary[];
}

function Dot(): ReactElement {
  return <span className={styles.dot} aria-hidden="true" />;
}

export function OutputSpecBar({ presets }: OutputSpecBarProps): ReactElement {
  const { presetId, params } = useRenderRequest();
  const options = useMemo(() => buildResolutionOptions(presets), [presets]);

  const defaults = segmentDefaults(params);
  const flf2v = isFlf2vMode(presetId, params);
  const numClips = flf2v ? 1 : (params.num_clips ?? 1);
  const nativeFrames = flf2v ? defaults.framesPerClip : stitchedFrames(numClips, defaults);
  const seconds = defaults.fps > 0 ? nativeFrames / defaults.fps : 0;

  const interpFps = params.interpolate_fps ?? 0;
  const outFps = interpFps > 0 ? interpFps : defaults.fps;
  const outFrames =
    interpFps > 0 && defaults.fps > 0
      ? Math.round(nativeFrames * (interpFps / defaults.fps))
      : nativeFrames;

  const upscale = typeof params.upscale_factor === "number" ? params.upscale_factor : 0;
  const scale = upscale > 0 ? upscale : 1;
  const outWidth = (params.width ?? 0) * scale;
  const outHeight = (params.height ?? 0) * scale;

  const selection = matchResolutionOption(params, options);
  const offDistribution =
    selection === CUSTOM_RESOLUTION ||
    (options.find((o) => o.id === selection)?.stepsDown ?? 0) >= 2;

  const chipDotCls = [styles.chipDot, offDistribution ? styles.chipDotWarn : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.bar}>
      <span className={styles.eyebrow}>Output</span>
      <div className={styles.stats}>
        <span>
          <span className={styles.statStrong}>{outFrames}</span>{" "}
          <span className={styles.statDim}>frames</span>
        </span>
        <Dot />
        <span className={styles.statStrong}>
          {outWidth}×{outHeight}
        </span>
        <Dot />
        <span>
          <span className={styles.statStrong}>{outFps}</span>{" "}
          <span className={styles.statDim}>fps</span>
        </span>
        <Dot />
        <span>
          <span className={styles.statDim}>~</span>
          <span className={styles.statStrong}>{seconds.toFixed(1)}</span>{" "}
          <span className={styles.statDim}>s</span>
        </span>
      </div>
      <span className={styles.chip}>
        <span className={chipDotCls} aria-hidden="true" />
        {offDistribution ? "off-distribution" : "ready"}
      </span>
    </div>
  );
}
