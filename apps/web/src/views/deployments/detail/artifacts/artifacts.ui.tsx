import { Fragment } from "react";
import { Button } from "../../../../components/base/button";
import * as s from "./artifacts.css";

export interface ArtifactRow {
  readonly utteranceId: string;
  readonly runId: string;
  readonly globalIndex: number;
  readonly characterDisplay: string;
  readonly text: string;
  readonly outputFormat: string;
  readonly durationMs: number | null;
  readonly finishedAt: number | null;
  readonly filename: string;
  readonly edited: boolean;
}

export interface ArtifactsUIProps {
  readonly artifacts: readonly ArtifactRow[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly playingId: string | null;
  readonly selected: ReadonlySet<string>;
  readonly onPlayToggle: (utteranceId: string) => void;
  readonly onDelete: (utteranceId: string) => void;
  readonly onDeleteAll: () => void;
  readonly onDownloadZip: () => void;
  readonly onToggleSelect: (utteranceId: string) => void;
  readonly onSelectAll: () => void;
  readonly onClearSelection: () => void;
  readonly onDeleteSelected: () => void;
  readonly onDownloadSelected: () => void;
  readonly buildDownloadUrl: (utteranceId: string) => string;
}

function formatDuration(ms: number | null): string {
  if (ms == null || ms <= 0) return "—";
  const totalS = Math.round(ms / 1000);
  const m = Math.floor(totalS / 60);
  const s2 = totalS % 60;
  return m > 0 ? `${m}:${s2.toString().padStart(2, "0")}` : `${s2}s`;
}

function formatTime(epochS: number | null): string {
  if (!epochS) return "—";
  const d = new Date(epochS * 1000);
  return d.toLocaleString();
}

function shortRunId(runId: string): string {
  return runId.length > 10 ? `…${runId.slice(-8)}` : runId;
}

export function ArtifactsUI({
  artifacts,
  loading,
  error,
  playingId,
  selected,
  onPlayToggle,
  onDelete,
  onDeleteAll,
  onDownloadZip,
  onToggleSelect,
  onSelectAll,
  onClearSelection,
  onDeleteSelected,
  onDownloadSelected,
  buildDownloadUrl,
}: ArtifactsUIProps) {
  const total = artifacts.length;
  const selectedCount = selected.size;
  const allSelected = total > 0 && selectedCount === total;
  const someSelected = selectedCount > 0 && !allSelected;
  const hasSelection = selectedCount > 0;

  if (error) {
    return <div className={s.error}>{error}</div>;
  }

  return (
    <div className={s.root}>
      <div className={s.toolbar}>
        <div className={s.toolbarLeft}>
          <div className={s.summary}>
            {loading ? (
              "Loading artifacts…"
            ) : (
              <>
                <span className={s.summaryStrong}>{total}</span>{" "}
                {total === 1 ? "artifact" : "artifacts"} produced by this
                deployment
              </>
            )}
          </div>
        </div>
        <div className={s.toolbarActions}>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onDownloadZip}
            disabled={total === 0}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              folder_zip
            </span>
            Download as ZIP
          </Button>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={onDeleteAll}
            disabled={total === 0}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              delete_sweep
            </span>
            Delete all
          </Button>
        </div>
      </div>

      {hasSelection && (
        <div
          className={s.selectionBanner}
          role="region"
          aria-label="Bulk actions"
        >
          <div className={s.selectionLeft}>
            <span className={s.selectionCount}>{selectedCount}</span>
            <span>
              {selectedCount === 1 ? "artifact" : "artifacts"} selected
            </span>
            <button
              type="button"
              className={s.clearLink}
              onClick={onClearSelection}
            >
              Clear
            </button>
          </div>
          <div className={s.selectionActions}>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onDownloadSelected}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                download
              </span>
              Download selected
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={onDeleteSelected}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                delete
              </span>
              Delete selected
            </Button>
          </div>
        </div>
      )}

      {!loading && total === 0 && (
        <div className={s.empty}>
          No artifacts yet. Run the recipe to produce audio segments — they'll
          show up here.
        </div>
      )}

      {total > 0 && (
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.checkboxHeader} scope="col">
                  <input
                    type="checkbox"
                    className={s.checkbox}
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={() =>
                      hasSelection ? onClearSelection() : onSelectAll()
                    }
                    aria-label={
                      hasSelection ? "Clear selection" : "Select all artifacts"
                    }
                  />
                </th>
                <th className={s.th}>Time</th>
                <th className={s.th}>Run</th>
                <th className={s.th}>Idx</th>
                <th className={s.th}>Character</th>
                <th className={s.th}>Line</th>
                <th className={s.th}>Format</th>
                <th className={s.th}>Duration</th>
                <th className={s.th} style={{ textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {artifacts.map((a) => {
                const isPlaying = playingId === a.utteranceId;
                const isSelected = selected.has(a.utteranceId);
                return (
                  <Fragment key={a.utteranceId}>
                    <tr className={isSelected ? `${s.row} ${s.rowSelected}` : s.row}>
                      <td className={s.checkboxCell}>
                        <input
                          type="checkbox"
                          className={s.checkbox}
                          checked={isSelected}
                          onChange={() => onToggleSelect(a.utteranceId)}
                          aria-label={`Select artifact ${a.filename}`}
                        />
                      </td>
                      <td className={s.tdMono}>{formatTime(a.finishedAt)}</td>
                      <td className={s.tdMono}>{shortRunId(a.runId)}</td>
                      <td className={s.tdMono}>{a.globalIndex}</td>
                      <td className={s.characterCell}>
                        {a.characterDisplay}
                        {a.edited && (
                          <span className={s.editedBadge}>edited</span>
                        )}
                      </td>
                      <td className={s.textCell} title={a.text}>
                        {a.text}
                      </td>
                      <td className={s.tdMono}>{a.outputFormat}</td>
                      <td className={s.tdMono}>
                        {formatDuration(a.durationMs)}
                      </td>
                      <td className={s.actionsCell}>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconOnly
                          aria-label={
                            isPlaying ? "Hide player" : "Play artifact"
                          }
                          aria-pressed={isPlaying}
                          onClick={() => onPlayToggle(a.utteranceId)}
                        >
                          <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                          >
                            {isPlaying ? "stop_circle" : "play_circle"}
                          </span>
                        </Button>
                        <a
                          className={s.iconLink}
                          href={buildDownloadUrl(a.utteranceId)}
                          download={a.filename}
                          aria-label="Download artifact"
                        >
                          <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                          >
                            download
                          </span>
                        </a>
                        <Button
                          variant="danger"
                          size="sm"
                          iconOnly
                          aria-label="Delete artifact"
                          onClick={() => onDelete(a.utteranceId)}
                        >
                          <span
                            className="material-symbols-outlined"
                            aria-hidden="true"
                          >
                            delete
                          </span>
                        </Button>
                      </td>
                    </tr>
                    {isPlaying && (
                      <tr className={s.row}>
                        <td colSpan={9} className={s.td}>
                          <div className={s.player}>
                            <span className={s.playerLabel}>
                              {a.filename}
                            </span>
                            <audio
                              className={s.playerAudio}
                              controls
                              autoPlay
                              preload="auto"
                              src={buildDownloadUrl(a.utteranceId)}
                            >
                              <track kind="captions" />
                            </audio>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
