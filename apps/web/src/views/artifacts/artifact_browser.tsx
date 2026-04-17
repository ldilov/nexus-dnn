import { useEffect, useState } from "react";
import { fetchArtifacts, type Artifact } from "../../api/client";
import * as styles from "./artifact_browser.css";

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
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [selected, setSelected] = useState<Artifact | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!runId) return;
    fetchArtifacts(runId)
      .then(setArtifacts)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load artifacts"),
      );
  }, [runId]);

  if (!runId) {
    return <p className={styles.emptyState}>Run a workflow to see artifacts</p>;
  }

  if (error) {
    return <p className={styles.emptyState}>{error}</p>;
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
            <div key={art.id} className={cls} onClick={() => setSelected(art)}>
              <div className={styles.artifactName}>{displayName(art)}</div>
              <div className={styles.artifactMeta}>{art.artifact_type}</div>
            </div>
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
