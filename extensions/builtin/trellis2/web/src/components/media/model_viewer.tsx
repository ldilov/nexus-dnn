import { type ReactElement, useEffect, useRef, useState } from "react";
import * as styles from "./model_viewer.css";

interface ModelViewerProps {
  url: string;
  alt: string;
  className?: string;
}

/** Interactive 3D preview of a GLB mesh.
 *
 * Lazy-imports `@google/model-viewer` on mount — the side-effect import
 * registers the `<model-viewer>` custom element and pulls in three.js
 * (~1MB), so it stays out of the main bundle until a result is shown. The
 * GLB is uncompressed (no DRACO/KTX2), so no CDN decoder paths are needed. */
export function ModelViewer({ url, alt, className }: ModelViewerProps): ReactElement {
  const [ready, setReady] = useState(
    () => typeof customElements !== "undefined" && Boolean(customElements.get("model-viewer")),
  );
  const [loaded, setLoaded] = useState(false);
  const viewerRef = useRef<HTMLElement | null>(null);

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
          shadow-intensity="1"
          exposure="1"
        />
      ) : null}
      {ready && loaded ? null : (
        <span className={styles.overlay} aria-hidden="true">
          Loading mesh…
        </span>
      )}
    </div>
  );
}
