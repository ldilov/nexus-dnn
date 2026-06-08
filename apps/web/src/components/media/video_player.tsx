import { type ReactElement, type ReactNode, useCallback, useState } from "react";
import * as styles from "./video_player.css";

export type VideoPlayerProps = {
  src?: string | null;
  poster?: string;
  fpsLabel?: string;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  ariaLabel?: string;
  className?: string;
  emptyContent?: ReactNode;
  onEnded?: () => void;
  onReady?: () => void;
  onError?: (error: Error) => void;
};

export function VideoPlayer({
  src,
  poster,
  fpsLabel,
  controls = true,
  loop = false,
  muted = false,
  autoPlay = false,
  ariaLabel,
  className,
  emptyContent,
  onEnded,
  onReady,
  onError,
}: VideoPlayerProps): ReactElement {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleReady = useCallback(() => {
    setStatus("ready");
    onReady?.();
  }, [onReady]);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const target = e.target as HTMLVideoElement;
      const msg = target.error?.message || `media error code ${target.error?.code ?? "?"}`;
      setStatus("error");
      setErrorMessage(msg);
      onError?.(new Error(msg));
    },
    [onError],
  );

  const cls = [styles.root, className].filter(Boolean).join(" ");

  if (!src) {
    return (
      <div className={cls} aria-label={ariaLabel ?? "no video"}>
        <div className={styles.emptyPanel}>
          {emptyContent ?? "No video to display yet."}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={cls} role="alert" aria-label={ariaLabel ?? "video playback error"}>
        <div className={styles.errorPanel}>
          <div className={styles.errorTitle}>Could not play video</div>
          <div className={styles.errorDetail}>{errorMessage ?? "unknown error"}</div>
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
      {fpsLabel && <span className={styles.fpsBadge}>{fpsLabel}</span>}
      <video
        className={styles.video}
        src={src}
        poster={poster}
        controls={controls}
        loop={loop}
        muted={muted}
        autoPlay={autoPlay}
        preload="metadata"
        aria-label={ariaLabel ?? "video player"}
        onLoadedData={handleReady}
        onEnded={onEnded}
        onError={handleError}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
