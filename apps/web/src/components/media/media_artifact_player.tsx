import { type ReactElement, useState, useCallback } from "react";
import * as styles from "./media_artifact_player.css";

export type MediaArtifactMime =
  | "video/mp4"
  | "video/webm"
  | "audio/mpeg"
  | "audio/wav"
  | "audio/flac";

export type MediaArtifactPlayerProps = {
  artifactId: string;
  mime: MediaArtifactMime;
  src?: string;
  posterArtifactId?: string;
  posterSrc?: string;
  downloadEnabled?: boolean;
  downloadFilename?: string;
  ariaLabel?: string;
  className?: string;
  onError?: (error: Error) => void;
  onReady?: () => void;
};

const ARTIFACT_URL_BASE = "/api/v1/artifacts";

function artifactUrl(artifactId: string): string {
  return `${ARTIFACT_URL_BASE}/${encodeURIComponent(artifactId)}`;
}

function isVideo(mime: MediaArtifactMime): boolean {
  return mime.startsWith("video/");
}

export function MediaArtifactPlayer({
  artifactId,
  mime,
  src,
  posterArtifactId,
  posterSrc,
  downloadEnabled = true,
  downloadFilename,
  ariaLabel,
  className,
  onError,
  onReady,
}: MediaArtifactPlayerProps): ReactElement {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const url = src ?? artifactUrl(artifactId);
  const poster = posterSrc ?? (posterArtifactId ? artifactUrl(posterArtifactId) : undefined);

  const handleReady = useCallback(() => {
    setStatus("ready");
    onReady?.();
  }, [onReady]);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLMediaElement>) => {
      const target = e.target as HTMLMediaElement;
      const msg = target.error?.message || `media error code ${target.error?.code ?? "?"}`;
      setStatus("error");
      setErrorMessage(msg);
      onError?.(new Error(msg));
    },
    [onError],
  );

  const cls = [styles.root, className].filter(Boolean).join(" ");

  if (status === "error") {
    return (
      <div className={cls} role="alert" aria-label={ariaLabel ?? "media playback error"}>
        <div className={styles.errorPanel}>
          <div className={styles.errorTitle}>Could not play media</div>
          <div className={styles.errorDetail}>{errorMessage ?? "unknown error"}</div>
          {downloadEnabled && (
            <a
              href={url}
              download={downloadFilename ?? artifactId}
              className={styles.downloadFallbackLink}
            >
              Download instead
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cls}>
      {status === "loading" && (
        <div className={styles.loadingOverlay} aria-hidden="true">
          <div className={styles.spinner} />
        </div>
      )}

      {isVideo(mime) ? (
        <video
          className={styles.video}
          src={url}
          poster={poster}
          controls
          preload="metadata"
          aria-label={ariaLabel ?? `video artifact ${artifactId}`}
          onLoadedData={handleReady}
          onError={handleError}
        >
          <track kind="captions" />
        </video>
      ) : (
        <audio
          className={styles.audio}
          src={url}
          controls
          preload="metadata"
          aria-label={ariaLabel ?? `audio artifact ${artifactId}`}
          onLoadedData={handleReady}
          onError={handleError}
        />
      )}

      {downloadEnabled && status === "ready" && (
        <div className={styles.actions}>
          <a
            href={url}
            download={downloadFilename ?? artifactId}
            className={styles.downloadButton}
            aria-label="download"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
