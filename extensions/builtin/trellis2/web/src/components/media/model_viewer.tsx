import { type ReactElement, useEffect, useId, useRef, useState } from "react";
import * as styles from "./model_viewer.css";

interface ModelViewerProps {
  url: string;
  alt: string;
  className?: string;
}

/** Tone-mapping operators surfaced in the viewer toggle.
 *
 * `neutral` is model-viewer's KhronosPBRNeutral default — color-preserving and
 * the right pick for inspecting albedo/material accuracy. `aces` is the filmic
 * operator, punchier highlight roll-off for a more "rendered" look. */
const TONE_MAPPINGS = ["neutral", "aces"] as const;
type ToneMapping = (typeof TONE_MAPPINGS)[number];

const TONE_LABELS: Record<ToneMapping, string> = {
  neutral: "Neutral",
  aces: "ACES",
};

const MIN_EXPOSURE = 0.4;
const MAX_EXPOSURE = 2.0;
const DEFAULT_EXPOSURE = 1.0;

/** Interactive 3D preview of a GLB mesh.
 *
 * Lazy-imports `@google/model-viewer` on mount — the side-effect import
 * registers the `<model-viewer>` custom element and pulls in three.js
 * (~1MB), so it stays out of the main bundle until a result is shown. The
 * GLB is uncompressed (no DRACO/KTX2), so no CDN decoder paths are needed.
 *
 * Lighting uses model-viewer's built-in `environment-image="neutral"` — a
 * procedurally generated studio IBL (rendered on-GPU, no asset, no network),
 * so PBR materials and metals read correctly while staying fully offline /
 * CSP-safe. Exposure and tone-mapping are user-tunable to taste. */
export function ModelViewer({ url, alt, className }: ModelViewerProps): ReactElement {
  const [ready, setReady] = useState(
    () => typeof customElements !== "undefined" && Boolean(customElements.get("model-viewer")),
  );
  const [loaded, setLoaded] = useState(false);
  const [exposure, setExposure] = useState(DEFAULT_EXPOSURE);
  const [toneMapping, setToneMapping] = useState<ToneMapping>("neutral");
  const viewerRef = useRef<HTMLElement | null>(null);
  const exposureId = useId();

  useEffect(() => {
    let cancelled = false;
    if (ready) return;
    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        // Registration failed — overlay stays; download link remains usable.
      });
    return () => {
      cancelled = true;
    };
  }, [ready]);

  useEffect(() => {
    setLoaded(false);
    const node = viewerRef.current;
    if (!ready || !node || node.getAttribute("src") !== url) return;
    const onLoad = () => setLoaded(true);
    node.addEventListener("load", onLoad);
    return () => node.removeEventListener("load", onLoad);
  }, [ready, url]);

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      {ready ? (
        <model-viewer
          ref={viewerRef}
          className={styles.viewer}
          src={url}
          alt={alt}
          camera-controls
          auto-rotate
          environment-image="neutral"
          tone-mapping={toneMapping}
          shadow-intensity="1"
          exposure={exposure.toFixed(2)}
        />
      ) : null}
      {ready && loaded ? (
        <div className={styles.controls}>
          <div className={[styles.controlGroup, styles.exposureGroup].join(" ")}>
            <label className={styles.controlLabel} htmlFor={exposureId}>
              Exposure
            </label>
            <input
              id={exposureId}
              className={styles.slider}
              type="range"
              min={MIN_EXPOSURE}
              max={MAX_EXPOSURE}
              step={0.05}
              value={exposure}
              onChange={(event) => setExposure(Number(event.target.value))}
            />
            <span className={styles.controlValue}>{exposure.toFixed(2)}</span>
          </div>
          <fieldset className={styles.toneGroup}>
            <legend className={styles.legend}>Tone</legend>
            <div className={styles.segment}>
              {TONE_MAPPINGS.map((mode) => {
                const active = mode === toneMapping;
                return (
                  <button
                    key={mode}
                    type="button"
                    className={active ? styles.segmentButtonActive : styles.segmentButton}
                    aria-pressed={active}
                    onClick={() => setToneMapping(mode)}
                  >
                    {TONE_LABELS[mode]}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      ) : null}
      {ready && loaded ? null : (
        <span className={styles.overlay} aria-hidden="true">
          Loading mesh…
        </span>
      )}
    </div>
  );
}
