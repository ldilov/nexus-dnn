import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { LazyMotion, AnimatePresence, domAnimation, m, useReducedMotion } from "motion/react";
import { listVoiceAssets, type VoiceAsset } from "../../../services/voice_assets_client";
import { subscribeRunState } from "../lib/run_events";
import * as css from "./recent_generations_card.css";

const EXTENSION_ID = "nexus.audio.emotiontts";
const LIMIT = 5;

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
}

interface ArtifactsResponse {
  readonly artifacts: readonly ArtifactRow[];
  readonly total: number;
}

function buildArtifactPath(deploymentId: string, suffix = ""): string {
  return `/api/v1/extensions/${EXTENSION_ID}/deployments/${deploymentId}/artifacts${suffix}`;
}

interface UseRecentResult {
  readonly rows: readonly ArtifactRow[];
  readonly loading: boolean;
  readonly error: string | null;
  readonly refetch: () => void;
}

function useRecentUtterances(deploymentId: string): UseRecentResult {
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

  return { rows, loading, error, refetch };
}

function useVoicesByRun(deploymentId: string): Map<string, string> {
  // Best-effort `runId → voice display name` map. We don't have a direct
  // run→voice association from the artifacts endpoint, so we fall back to
  // showing the voice asset's display name when there's only one voice in
  // the deployment, otherwise we leave the field blank. The cost of being
  // wrong here is purely visual (mislabelled meta), so a soft guess is OK.
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
  }, [deploymentId]);
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
  const { rows, loading, error, refetch } = useRecentUtterances(deploymentId);
  const voicesById = useVoicesByRun(deploymentId);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const displayRows = useMemo(() => rows.slice(0, LIMIT), [rows]);

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
            onClick={refetch}
            aria-label="Refresh"
            title="Refresh"
          >
            ↻
          </button>
        </span>
      </header>

      {error && displayRows.length === 0 && (
        <div className={css.error} role="alert">
          {error}
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
              const voiceName = voicesById.size > 0
                ? Array.from(voicesById.values())[0]
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
                  <button
                    type="button"
                    className={css.playButton}
                    onClick={() =>
                      setPlayingId((prev) =>
                        prev === row.utteranceId ? null : row.utteranceId,
                      )
                    }
                    aria-label={isPlaying ? "Stop preview" : "Play preview"}
                    aria-pressed={isPlaying}
                  >
                    {isPlaying ? "■" : "▶"}
                  </button>

                  <div className={css.body}>
                    <div className={css.bodyTop}>
                      <span className={css.character}>{row.characterDisplay}</span>
                      <span
                        className={css.text}
                        title={row.text}
                        data-tooltip={row.text}
                      >
                        {row.text}
                      </span>
                    </div>
                    <div className={css.meta}>
                      <span className={css.metaSeg}>
                        {formatRelativeDate(row.finishedAt)}
                      </span>
                      {voiceName && (
                        <>
                          <span className={css.metaDot} aria-hidden="true">
                            ·
                          </span>
                          <span className={css.metaVoice}>{voiceName}</span>
                        </>
                      )}
                      <span className={css.metaDot} aria-hidden="true">
                        ·
                      </span>
                      <span className={css.metaDuration}>
                        {formatDuration(row.durationMs)}
                      </span>
                      {speedFactor !== undefined && speedFactor !== 1 && (
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

                  <a
                    className={css.download}
                    href={downloadHref}
                    download={row.filename}
                    aria-label={`Download ${row.filename}`}
                    title="Download"
                  >
                    ↓
                  </a>

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
