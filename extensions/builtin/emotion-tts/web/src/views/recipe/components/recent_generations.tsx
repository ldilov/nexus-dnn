import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { LazyMotion, AnimatePresence, domAnimation, m, useReducedMotion } from "motion/react";
import { subscribeRunState } from "../lib/run_events";
import * as css from "./recent_generations.css";

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

const LIMIT = 5;
const EXTENSION_ID = "nexus.audio.emotiontts";

function buildArtifactPath(deploymentId: string, suffix = ""): string {
  return `/api/v1/extensions/${EXTENSION_ID}/deployments/${deploymentId}/artifacts${suffix}`;
}

interface UseRecentResult {
  rows: readonly ArtifactRow[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
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

  // Refetch on the busy → idle transition (a run just completed).
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

export interface RecentGenerationsProps {
  readonly deploymentId: string;
}

export function RecentGenerations({ deploymentId }: RecentGenerationsProps): ReactElement {
  const [open, setOpen] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const { rows, loading, error, refetch } = useRecentUtterances(deploymentId);

  const close = useCallback(() => {
    setOpen(false);
    setPlayingId(null);
  }, []);

  // Outside-click + Escape close.
  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (e: MouseEvent): void => {
      if (!wrapRef.current) return;
      if (e.target instanceof Node && wrapRef.current.contains(e.target)) return;
      close();
    };
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const count = rows.length;
  const label = useMemo(() => `Recent · ${count}`, [count]);

  return (
    <div ref={wrapRef} className={css.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={css.trigger}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        title="Recent generations"
      >
        <span className={css.triggerGlyph} aria-hidden="true">
          ◉
        </span>
        <span>{label}</span>
      </button>

      <LazyMotion features={domAnimation} strict>
        <AnimatePresence>
          {open && (
            <m.div
              key="popover"
              role="dialog"
              aria-label="Recent generations"
              className={css.popover}
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: reducedMotion ? 0 : 0.16, ease: [0.4, 0, 0.2, 1] }}
            >
              <header className={css.header}>
                <span className={css.headerTitle}>Last {LIMIT} generations</span>
                <button
                  type="button"
                  className={css.headerButton}
                  onClick={refetch}
                  aria-label="Refresh"
                  title="Refresh"
                >
                  ↻
                </button>
              </header>

              {loading && rows.length === 0 && (
                <div className={css.empty}>Loading…</div>
              )}
              {error && rows.length === 0 && (
                <div className={css.error}>{error}</div>
              )}
              {!loading && !error && rows.length === 0 && (
                <div className={css.empty}>
                  No generations yet — hit Generate to start.
                </div>
              )}

              {rows.length > 0 && (
                <ul className={css.list}>
                  {rows.map((row) => (
                    <RecentRow
                      key={row.utteranceId}
                      row={row}
                      deploymentId={deploymentId}
                      isPlaying={playingId === row.utteranceId}
                      onPlayToggle={() =>
                        setPlayingId((prev) => (prev === row.utteranceId ? null : row.utteranceId))
                      }
                    />
                  ))}
                </ul>
              )}

              <footer className={css.footer}>
                <span className={css.footerHint}>
                  Press <kbd className={css.kbd}>Esc</kbd> to close
                </span>
              </footer>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}

interface RecentRowProps {
  readonly row: ArtifactRow;
  readonly deploymentId: string;
  readonly isPlaying: boolean;
  readonly onPlayToggle: () => void;
}

function RecentRow({ row, deploymentId, isPlaying, onPlayToggle }: RecentRowProps): ReactElement {
  const downloadHref = buildArtifactPath(
    deploymentId,
    `/${row.utteranceId}/download`,
  );

  return (
    <li className={css.row}>
      <div className={css.rowMain}>
        <button
          type="button"
          className={css.playButton}
          onClick={onPlayToggle}
          aria-label={isPlaying ? "Stop preview" : "Play preview"}
          aria-pressed={isPlaying}
        >
          {isPlaying ? "■" : "▶"}
        </button>
        <div className={css.rowMeta}>
          <span className={css.character}>{row.characterDisplay}</span>
          <span className={css.line} title={row.text}>
            {row.text}
          </span>
        </div>
        <span className={css.duration}>{formatDuration(row.durationMs)}</span>
        <a
          className={css.download}
          href={downloadHref}
          download={row.filename}
          aria-label="Download"
          title="Download"
        >
          ↓
        </a>
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
    </li>
  );
}

function formatDuration(ms: number | null): string {
  if (ms == null || ms <= 0) return "—";
  const totalS = Math.round(ms / 1000);
  const m = Math.floor(totalS / 60);
  const s = totalS % 60;
  return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
}
