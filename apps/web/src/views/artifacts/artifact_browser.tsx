import { useState } from "react";
import useSWR from "swr";
import { fetchArtifacts, type Artifact } from "../../api/client";
import * as styles from "./artifact_browser.css";

const EMPTY_ARTIFACTS: Artifact[] = [];

type ArtifactBrowserProps = {
  runId: string | null;
};

function isImageMime(mime: string): boolean {
  return mime.startsWith("image/");
}

function displayName(art: Artifact): string {
  return art.port_name || art.id;
}

export function ArtifactBrowser({ runId }: ArtifactBrowserProps) {
  const [selected, setSelected] = useState<Artifact | null>(null);
  const { data: artifacts = EMPTY_ARTIFACTS, error } = useSWR<Artifact[]>(
    runId ? `artifacts:${runId}` : null,
    () => fetchArtifacts(runId as string),
  );
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : "Failed to load artifacts"
    : null;

  if (!runId) {
    return <p className={styles.emptyState}>Run a workflow to see artifacts</p>;
  }

  if (errorMessage) {
    return <p className={styles.emptyState}>{errorMessage}</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.artifactGrid}>
        {artifacts.map((art) => {
          const cls =
            art.id === selected?.id
              ? `${styles.artifactCard} ${styles.artifactCardSelected}`
              : styles.artifactCard;
          return (
            <button
              key={art.id}
              type="button"
              className={cls}
              aria-pressed={art.id === selected?.id}
              onClick={() => setSelected(art)}
            >
              <div className={styles.artifactName}>{displayName(art)}</div>
              <div className={styles.artifactMeta}>{art.artifact_type}</div>
            </button>
          );
        })}
      </div>
      {selected && (
        <div className={styles.preview}>
          <div className={styles.artifactName}>{displayName(selected)}</div>
          <div className={styles.artifactMeta}>
            {selected.artifact_type} - {selected.size_bytes} bytes
          </div>
          {isImageMime(selected.artifact_type) && (
            <img
              className={styles.previewImage}
              src={`/api/v1/artifacts/${selected.id}/blob`}
              alt={displayName(selected)}
            />
          )}
        </div>
      )}
    </div>
  );
}
