import { useMemo, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { ExtensionApiError } from "../../services/http";
import { resumeRun } from "../../services/runs_client";
import type { Run, RunStatus, UtteranceStatus } from "../../services/types";
import * as css from "./run_detail.css";

interface LoaderData {
  run: Run;
}

const RESUMABLE: readonly RunStatus[] = ["cancelled", "failed", "partial"];

export function RunDetailView(): JSX.Element {
  const { run } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const metrics = useMemo(() => deriveMetrics(run), [run]);
  const canResume = RESUMABLE.includes(run.status) && run.kind === "batch";

  const onRerun = async (): Promise<void> => {
    if (!run.deploymentId) return;
    setBusy(true);
    setError(null);
    try {
      const { runId } = await resumeRun(run.deploymentId, run.runId);
      navigate(`/${run.deploymentId}/runs/${runId}`);
    } catch (err: unknown) {
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className={css.shell}>
      <div className={css.frame}>
        <header className={css.hero}>
          <p className={css.eyebrow}>
            {run.deploymentId ? (
              <>
                <Link to={`/${run.deploymentId}/recipe`} className={css.eyebrowLink}>
                  ← Back to recipe
                </Link>
                <span className={css.eyebrowSeparator}>·</span>
              </>
            ) : null}
            <span>Run detail</span>
          </p>
          <div className={css.titleRow}>
            <h1 className={css.title}>
              {titleForKind(run.kind)}
              <span className={css.titleRunId}>{run.runId}</span>
            </h1>
            <span className={css.statusHero[run.status]}>{run.status}</span>
          </div>
        </header>

        <section className={css.stats} aria-label="Run statistics">
          <StatCard label="Format" value={run.outputFormat.toUpperCase()} mono />
          <StatCard label="Speed" value={`${run.speedFactor.toFixed(2)}×`} mono />
          <StatCard
            label="Completed"
            value={`${metrics.completed} / ${metrics.total}`}
            progress={metrics.total > 0 ? metrics.completed / metrics.total : 0}
          />
          <StatCard
            label="Cache hit"
            value={`${metrics.cacheRatio}%`}
            progress={metrics.cacheRatio / 100}
          />
        </section>

        {canResume && (
          <section className={css.resumePanel} aria-label="Resume run">
            <div className={css.resumeCopy}>
              <p className={css.resumeTitle}>
                {metrics.failed > 0
                  ? `${metrics.failed} line${metrics.failed === 1 ? "" : "s"} did not complete`
                  : "Run was interrupted before completion"}
              </p>
              <p className={css.resumeBody}>
                Resume picks up where the last attempt left off — completed audio is re-used from cache.
              </p>
            </div>
            <button
              type="button"
              className={css.resumeButton}
              disabled={busy}
              onClick={() => void onRerun()}
            >
              {busy
                ? "Resuming…"
                : metrics.failed > 0
                  ? "Rerun failed lines"
                  : "Resume run"}
            </button>
            {error && (
              <p className={css.resumeError} role="alert">
                {error}
              </p>
            )}
          </section>
        )}

        <section className={css.panel} aria-label="Utterances">
          <div className={css.panelHeader}>
            <h2 className={css.panelTitle}>Utterances</h2>
            {metrics.completed > 0 && (
              <span className={css.cacheSummary}>
                <span className={css.cacheRatio}>{metrics.cached}</span>/{metrics.completed} from cache
              </span>
            )}
          </div>
          <ul className={css.utteranceList}>
            {run.utterances.map((u) => (
              <li key={u.utteranceId} className={css.utterance}>
                <span className={css.uttIndex}>#{u.globalIndex.toString().padStart(3, "0")}</span>
                <span className={css.uttCharacter} title={u.characterDisplay}>
                  {u.characterDisplay}
                </span>
                <span className={css.uttText} title={u.text}>
                  {u.text}
                </span>
                <span className={css.uttMeta}>
                  {u.cacheHit && <span className={css.cacheChip}>cached</span>}
                  {u.durationMs ? <span>{formatDuration(u.durationMs)}</span> : null}
                  <span className={css.uttStatus[u.status as UtteranceStatus]}>{u.status}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {run.exportArtifactRef && (
          <div className={css.footer}>
            <a
              href={`/api/v1/artifacts/${run.exportArtifactRef}/download`}
              download
              className={css.exportLink}
            >
              Download ZIP <span className={css.exportArrow}>↓</span>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  mono?: boolean;
  progress?: number;
}

function StatCard({ label, value, mono, progress }: StatCardProps): JSX.Element {
  const progressClamped =
    progress !== undefined ? Math.min(1, Math.max(0, progress)) : undefined;
  return (
    <div
      className={css.statCard}
      style={
        progressClamped !== undefined
          ? ({ "--progress": String(progressClamped) } as Record<string, string>)
          : undefined
      }
    >
      <span className={css.statLabel}>{label}</span>
      <span className={mono ? css.statValueMono : css.statValue}>{value}</span>
      {progressClamped !== undefined && <span className={css.statBar} aria-hidden="true" />}
    </div>
  );
}

interface RunMetrics {
  total: number;
  completed: number;
  failed: number;
  cached: number;
  cacheRatio: number;
}

function deriveMetrics(run: Run): RunMetrics {
  const total = run.utterances.length;
  const completed = run.utterances.filter((u) => u.status === "completed").length;
  const failed = run.utterances.filter(
    (u) => u.status === "failed" || u.status === "cancelled",
  ).length;
  const cached = run.utterances.filter((u) => u.cacheHit).length;
  const cacheRatio = completed > 0 ? Math.round((cached / completed) * 100) : 0;
  return { total, completed, failed, cached, cacheRatio };
}

function titleForKind(kind: Run["kind"]): string {
  switch (kind) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  const seconds = (ms / 1000).toFixed(ms < 10_000 ? 2 : 1);
  return `${seconds} s`;
}

function describeError(err: unknown): string {
  if (err instanceof ExtensionApiError) return `${err.category}: ${err.message}`;
  if (err instanceof Error) return err.message;
  return "Unexpected error";
}
