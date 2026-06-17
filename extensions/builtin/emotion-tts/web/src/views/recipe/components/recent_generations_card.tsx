import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { LazyMotion, AnimatePresence, domAnimation, m, useReducedMotion } from "motion/react";
import { EXTENSION_PREFIX } from "../../../services/http";
import { listVoiceAssets, type VoiceAsset } from "../../../services/voice_assets_client";
import { subscribeRunState } from "../lib/run_events";
import * as css from "./recent_generations_card.css";

const LIMIT = 5;
// Two consecutive `1.0` slider readouts can sit ε apart in float space, so
// treat anything inside this tolerance as "the default speed".
const SPEED_EPSILON = 0.005;

interface ArtifactRow {
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
  /** Voice asset chosen by the dispatcher's resolver for this utterance.
   * Already stored on the utterance row server-side; the artifacts endpoint
   * surfaces it so the recent-generations card can label each row with the
   * actual voice used. Null when the utterance fell through to a hard-coded
   * path. Optional in the type so the frontend handles older API responses
   * that pre-date this field gracefully. */
  readonly voiceAssetId?: string | null;
}

interface ArtifactsResponse {
  readonly artifacts: readonly ArtifactRow[];
  readonly total: number;
}

function buildArtifactPath(deploymentId: string, suffix = ""): string {
  return `${EXTENSION_PREFIX}/deployments/${deploymentId}/artifacts${suffix}`;
}

/** Fetch the artifact and trigger a browser download via a blob object URL.
 * The host runs inside a custom-element / memory-router shell where a plain
 * `<a download href>` silently no-ops, so we drive the download programmatically
 * (same pattern as `exports_client.downloadExportBlob`). */
async function downloadArtifactBlob(
  deploymentId: string,
  utteranceId: string,
  filename: string,
): Promise<void> {
  const resp = await fetch(buildArtifactPath(deploymentId, `/${utteranceId}/download`), {
    headers: { accept: "application/octet-stream" },
  });
  if (!resp.ok) throw new Error(`download failed: HTTP ${resp.status}`);
  const blob = await resp.blob();
  const url = URL.createObjectURL(blob);
  try {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Soft-delete exactly the displayed utterances via the bulk endpoint's
 * `utteranceIds` subset filter, leaving any not-shown rows untouched. */
async function clearShownArtifacts(
  deploymentId: string,
  utteranceIds: readonly string[],
): Promise<void> {
  const csv = utteranceIds.map((id) => encodeURIComponent(id)).join(",");
  const resp = await fetch(buildArtifactPath(deploymentId, `?utteranceIds=${csv}`), {
    method: "DELETE",
    headers: { accept: "application/json" },
  });
  if (!resp.ok) throw new Error(`clear failed: HTTP ${resp.status}`);
}

interface UseRecentResult {
  readonly rows: readonly ArtifactRow[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly refetch: () => void;
}

interface UseRecentResultWithTick extends UseRecentResult {
  readonly tick: number;
}

function useRecentUtterances(deploymentId: string): UseRecentResultWithTick {
  const [rows, setRows] = useState<readonly ArtifactRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const controllerRef = useRef<AbortController | null>(null);
  const prevBusyRef = useRef(false);

  const refetch = useCallback(() => setTick((n) => n + 1), []);

  useEffect(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);
    fetch(`${buildArtifactPath(deploymentId)}?limit=${LIMIT}`, {
      headers: { accept: "application/json" },
      signal: controller.signal,
    })
      .then(async (resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }
        const body = (await resp.json()) as ArtifactsResponse;
        if (controller.signal.aborted) return;
        setRows(body.artifacts.slice(0, LIMIT));
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message = err instanceof Error ? err.message : "fetch failed";
        setError(message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [deploymentId, tick]);

  // Refetch on busy → idle (run just completed).
  useEffect(() => {
    return subscribeRunState((detail) => {
      const wasBusy = prevBusyRef.current;
      prevBusyRef.current = detail.busy;
      if (wasBusy && !detail.busy) {
        refetch();
      }
    });
  }, [refetch]);

  return { rows, loading, error, refetch, tick };
}

function useVoicesByRun(deploymentId: string, refetchTick: number): Map<string, string> {
  // `voiceAssetId → display name` lookup for the recent-generations card.
  // The artifacts endpoint already returns each utterance's resolved voice
  const [byId, setById] = useState<Map<string, string>>(() => new Map());
  useEffect(() => {
    let cancelled = false;
    listVoiceAssets(deploymentId)
      .then(({ voiceAssets }) => {
        if (cancelled) return;
        const map = new Map<string, string>();
        for (const v of voiceAssets as VoiceAsset[]) {
          map.set(v.voiceAssetId, v.displayName);
        }
        setById(map);
      })
      .catch(() => {
        /* silent; voice column simply won't render */
      });
    return () => {
      cancelled = true;
    };
  }, [deploymentId, refetchTick]);
  return byId;
}

export interface RecentGenerationsCardProps {
  readonly deploymentId: string;
  /** Optional speed factor from the recipe's generation settings. When set,
   * each row shows the speed multiplier mono caption. */
  readonly speedFactor?: number;
}

export function RecentGenerationsCard({
  deploymentId,
  speedFactor,
}: RecentGenerationsCardProps): ReactElement | null {
  const { rows, loading, error, refetch, tick } = useRecentUtterances(deploymentId);
  const voicesById = useVoicesByRun(deploymentId, tick);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const reducedMotion = useReducedMotion();

  // Drop the playing row when refresh starts a new fetch — if the previously
  // playing utterance is gone after refresh, the <audio> would otherwise
  const handleRefresh = useCallback((): void => {
    setPlayingId(null);
    setActionError(null);
    refetch();
  }, [refetch]);

  const handleDownload = useCallback(
    async (utteranceId: string, filename: string): Promise<void> => {
      setActionError(null);
      try {
        await downloadArtifactBlob(deploymentId, utteranceId, filename);
      } catch (err: unknown) {
        setActionError(err instanceof Error ? err.message : "download failed");
      }
    },
    [deploymentId],
  );

  // `rows` is already capped to LIMIT in the fetch handler — see useRecentUtterances.
  const displayRows = rows;

  const handleClear = useCallback(async (): Promise<void> => {
    const ids = displayRows.map((r) => r.utteranceId);
    if (ids.length === 0) return;
    if (!window.confirm(`Remove the ${ids.length} shown generation${ids.length === 1 ? "" : "s"} from this list?`)) {
      return;
    }
    setClearing(true);
    setActionError(null);
    setPlayingId(null);
    try {
      await clearShownArtifacts(deploymentId, ids);
      refetch();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "clear failed");
    } finally {
      setClearing(false);
    }
  }, [displayRows, deploymentId, refetch]);

  if (!loading && !error && displayRows.length === 0) {
    return null; // Hidden until the user has at least one generation.
  }

  return (
    <section className={css.card} aria-labelledby="recent-gen-eyebrow">
      <header className={css.head}>
        <span className={css.eyebrow} id="recent-gen-eyebrow">
          Recent generations
        </span>
        <span className={css.headMeta}>
          <span className={css.count}>{displayRows.length}</span>
          <span className={css.headHint}>last {LIMIT}</span>
          <button
            type="button"
            className={css.refresh}
            onClick={handleRefresh}
            aria-label="Refresh"
            title="Refresh"
          >
            ↻
          </button>
          <button
            type="button"
            className={css.refresh}
            onClick={() => void handleClear()}
            disabled={clearing || displayRows.length === 0}
            aria-label="Clear list"
            title="Clear the shown generations"
          >
            Clear
          </button>
        </span>
      </header>

      {(error || actionError) && (
        <div className={css.error} role="alert">
          {error ?? actionError}
        </div>
      )}

      <LazyMotion features={domAnimation} strict>
        <ul className={css.list}>
          <AnimatePresence initial={false}>
            {displayRows.map((row) => {
              const isPlaying = playingId === row.utteranceId;
              const downloadHref = buildArtifactPath(
                deploymentId,
                `/${row.utteranceId}/download`,
              );
              const rowVoiceName = row.voiceAssetId
                ? voicesById.get(row.voiceAssetId) ?? null
                : null;
              return (
                <m.li
                  key={row.utteranceId}
                  className={css.row}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.18,
                    ease: [0.2, 0, 0, 1],
                  }}
                  data-playing={isPlaying || undefined}
                >
                  <div className={css.rowMain}>
                  <button
                    type="button"
                    className={css.playButton}
                    onClick={() =>
                      setPlayingId((prev) =>
                        prev === row.utteranceId ? null : row.utteranceId,
                      )
                    }
                    aria-label="Preview"
                    aria-pressed={isPlaying}
                  >
                    {isPlaying ? "■" : "▶"}
                  </button>

                  <div className={css.body}>
                    <div className={css.bodyTop}>
                      <span className={css.character}>{row.characterDisplay}</span>
                      <span className={css.text} title={row.text}>
                        {row.text}
                      </span>
                    </div>
                    <div className={css.meta}>
                      <span className={css.metaSeg}>
                        {formatRelativeDate(row.finishedAt)}
                      </span>
                      {rowVoiceName && (
                        <>
                          <span className={css.metaDot} aria-hidden="true">
                            ·
                          </span>
                          <span className={css.metaVoice}>{rowVoiceName}</span>
                        </>
                      )}
                      <span className={css.metaDot} aria-hidden="true">
                        ·
                      </span>
                      <span className={css.metaDuration}>
                        {formatDuration(row.durationMs)}
                      </span>
                      {speedFactor !== undefined &&
                        Math.abs(speedFactor - 1) > SPEED_EPSILON && (
                          <>
                            <span className={css.metaDot} aria-hidden="true">
                              ·
                            </span>
                            <span className={css.metaSpeed}>
                              {speedFactor.toFixed(2)}×
                            </span>
                          </>
                        )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className={css.download}
                    onClick={() => void handleDownload(row.utteranceId, row.filename)}
                    aria-label={`Download ${row.filename}`}
                    title="Download"
                  >
                    ↓
                  </button>
                  </div>

                  {isPlaying && (
                    <audio
                      className={css.audio}
                      src={downloadHref}
                      controls
                      autoPlay
                      preload="auto"
                    >
                      <track kind="captions" />
                    </audio>
                  )}
                </m.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </LazyMotion>
    </section>
  );
}

function formatDuration(ms: number | null): string {
  if (ms == null || ms <= 0) return "—";
  const totalS = Math.round(ms / 1000);
  const m = Math.floor(totalS / 60);
  const s = totalS % 60;
  return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
}

function formatRelativeDate(epochS: number | null): string {
  if (!epochS) return "—";
  const now = Math.floor(Date.now() / 1000);
  const delta = now - epochS;
  if (delta < 0) return "just now";
  if (delta < 60) return `${delta}s ago`;
  if (delta < 3600) return `${Math.floor(delta / 60)}m ago`;
  if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
  if (delta < 604800) return `${Math.floor(delta / 86400)}d ago`;
  const date = new Date(epochS * 1000);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
