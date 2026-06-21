import type { InstalledArtifact } from "../../../services/model_store";
import { DownloadedChip } from "./DownloadProgress";
import * as s from "./DownloadedPanel.css";

/**
 * Installed artifact row as rendered by the panel. Aliases the shared service
 * type, which now carries `install_path` (joined under `sink_root` by the host
 * DTO); kept as a named type so the panel's public surface stays stable.
 */
export type DownloadedArtifact = InstalledArtifact;

export interface DownloadedPanelProps {
  /** Installed artifacts present on disk; null while the first load is in flight. */
  artifacts: DownloadedArtifact[] | null;
  loading: boolean;
  error: { message: string } | null;
  /** True when the host capped the listing — surfaced as a hint. */
  truncated: boolean;
  /** Artifact id currently being deleted, if any (disables its row button). */
  deletingId: string | null;
  /** Confirm + delete a single artifact, then refresh upstream. */
  onDelete: (artifactId: string, label: string) => void;
  onRetry: () => void;
}

function sourceLabel(artifact: DownloadedArtifact): string {
  const repo = artifact.source_repo.trim();
  return repo.length > 0 ? repo : "local upload";
}

function SkeletonRows() {
  return (
    <div aria-busy="true" aria-label="Loading downloaded models">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={s.skeletonRow} aria-hidden="true" />
      ))}
    </div>
  );
}

function EmptyDownloaded() {
  return (
    <div className={s.empty}>
      <span
        className={`material-symbols-outlined ${s.emptyIcon}`}
        aria-hidden="true"
      >
        inventory_2
      </span>
      <span>No models downloaded yet.</span>
      <span>
        Upload a weight file or download one from the registry to see it here.
      </span>
    </div>
  );
}

/**
 * Foundry surface listing every weight file actually present in the host model
 * store — uploads, direct-URL pulls, and catalog downloads alike. Host-owned
 * and generic: rows come straight from the install-map (no extension id).
 */
export function DownloadedPanel({
  artifacts,
  loading,
  error,
  truncated,
  deletingId,
  onDelete,
  onRetry,
}: DownloadedPanelProps) {
  const isFirstLoad = loading && artifacts === null;
  const count = artifacts?.length ?? 0;

  return (
    <section
      className={s.panel}
      aria-label="Downloaded models"
      aria-busy={loading}
    >
      <div className={s.header}>
        <h2 className={s.title}>
          <span className="material-symbols-outlined" aria-hidden="true">
            download_done
          </span>
          Downloaded
        </h2>
        {artifacts !== null && (
          <span className={s.count}>
            {count === 1 ? "1 file" : `${count.toLocaleString()} files`}
          </span>
        )}
      </div>

      {error && (
        <div className={s.errorBanner} role="alert">
          <span className="material-symbols-outlined" aria-hidden="true">
            error
          </span>
          <span>{error.message}</span>
          <button
            type="button"
            className={s.deleteButton}
            onClick={onRetry}
            aria-label="Retry loading downloaded models"
          >
            Retry
          </button>
        </div>
      )}

      {isFirstLoad && !error && <SkeletonRows />}

      {!isFirstLoad && !error && count === 0 && <EmptyDownloaded />}

      {!error && count > 0 && (
        <ul className={s.list}>
          {(artifacts ?? []).map((artifact) => {
            const isDeleting = deletingId === artifact.artifact_id;
            return (
              <li key={artifact.artifact_id} className={s.item}>
                <div className={s.itemBody}>
                  <span className={s.filename} title={artifact.filename}>
                    {artifact.filename}
                  </span>
                  <div className={s.chipRow}>
                    <DownloadedChip sizeBytes={artifact.size_bytes} />
                  </div>
                  <span className={s.itemMeta}>
                    <span>{sourceLabel(artifact)}</span>
                    {artifact.install_path && (
                      <>
                        <span className={s.metaSep} aria-hidden="true">
                          ·
                        </span>
                        <span
                          className={s.path}
                          title={artifact.install_path}
                        >
                          {artifact.install_path}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <button
                  type="button"
                  className={s.deleteButton}
                  disabled={isDeleting}
                  aria-label={`Delete ${artifact.filename}`}
                  onClick={() => onDelete(artifact.artifact_id, artifact.filename)}
                >
                  <span
                    className={`material-symbols-outlined ${s.deleteIcon}`}
                    aria-hidden="true"
                  >
                    delete
                  </span>
                  {isDeleting ? "Deleting…" : "Delete"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {!error && truncated && count > 0 && (
        <span className={s.truncatedNote}>
          Showing the most recent downloads — some older files are not listed.
        </span>
      )}
    </section>
  );
}
