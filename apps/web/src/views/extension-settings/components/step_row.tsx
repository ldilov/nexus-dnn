/**
 * Spec 035 — StepRow.
 *
 * Generic renderer for one row of the Dependencies tab. Driven entirely by the
 * server-supplied `DependencyStep` shape. The only place the UI pattern-matches
 * on step `type` is the `STEP_TYPE_PRESENTATION` lookup for icon + subtitle.
 */
import { useState } from "react";

import type { DependencyStep } from "../../../types/extension_dependencies";
import {
  formatDuration,
  formatPhase,
  formatSpeed,
  presentation,
  shortenSize,
} from "../step_type_presentation";
import type { LiveStepProgress } from "../use_install_progress";
import * as s from "./step_row.css";

export interface StepRowProps {
  step: DependencyStep;
  /** True iff every step in `step.requires` reports `satisfied: true`. */
  upstreamSatisfied: boolean;
  /** True while any install run is active in the host. */
  installActive: boolean;
  /** Live event-driven download metrics for this step, if any. */
  live?: LiveStepProgress;
  onInstallOnly: (stepId: string) => void;
  onRetry: (stepId: string) => void;
  onReinstall: (stepId: string) => void;
}

const STATUS_LABEL: Record<DependencyStep["status"], string> = {
  pending: "Pending",
  running: "Installing",
  ok: "Installed",
  failed: "Failed",
  skipped: "Already installed",
};

export function StepRow({
  step,
  upstreamSatisfied,
  installActive,
  live,
  onInstallOnly,
  onRetry,
  onReinstall,
}: StepRowProps) {
  const [errorOpen, setErrorOpen] = useState(false);
  const pres = presentation(step);

  const accentClass =
    step.status === "running"
      ? s.accentRunning
      : step.status === "ok"
        ? s.accentOk
        : step.status === "failed"
          ? s.accentFailed
          : step.status === "skipped"
            ? s.accentSkipped
            : "";

  const dotClass =
    step.status === "running"
      ? s.statusDotRunning
      : step.status === "ok"
        ? s.statusDotOk
        : step.status === "failed"
          ? s.statusDotFailed
          : step.status === "skipped"
            ? s.statusDotSkipped
            : s.statusDotPending;

  const liveBytesActive = step.status === "running" && live !== undefined && live.totalBytes > 0;
  const liveReportedPct =
    step.status === "running" && live !== undefined && live.reportedPct !== null
      ? live.reportedPct
      : null;
  const unknownTotalActive =
    step.status === "running" &&
    live !== undefined &&
    live.totalBytes === 0 &&
    live.currentBytes > 0 &&
    liveReportedPct === null;
  const showProgressBar = step.status === "running" || (step.status === "pending" && installActive);
  const dtoPct =
    step.progress && step.progress.total_bytes > 0
      ? Math.min(100, (step.progress.current_bytes / step.progress.total_bytes) * 100)
      : null;
  const determinatePct = liveBytesActive && live
    ? live.pct
    : liveReportedPct !== null
      ? liveReportedPct
      : dtoPct;
  const progressIndeterminate = showProgressBar && determinatePct === null;
  const progressPct = determinatePct ?? 0;

  const filesLabel =
    step.files_total && step.files_total > 0
      ? `${step.files_present ?? 0}/${step.files_total} files`
      : null;
  const remainingLabel =
    step.estimated_remaining_bytes > 0
      ? `${shortenSize(step.estimated_remaining_bytes)} to download`
      : null;
  const downloadMeta = [filesLabel, remainingLabel].filter(Boolean).join(" · ");

  const liveBytes = liveBytesActive;
  const phaseRow =
    step.status === "running" && !liveBytesActive && !unknownTotalActive && live !== undefined
      ? {
          label: live.phase.length > 0 ? formatPhase(live.phase) : "",
          message: live.message,
        }
      : null;
  const showPhaseRow =
    phaseRow !== null && (phaseRow.label.length > 0 || phaseRow.message.length > 0);

  const installOnlyDisabled =
    !upstreamSatisfied || installActive || step.status === "ok" || step.status === "running";
  const installOnlyTitle = !upstreamSatisfied
    ? `Install upstream first: ${step.requires.join(", ")}`
    : installActive
      ? "Another step is currently installing"
      : step.status === "ok"
        ? "Already installed"
        : "Install only this step";

  return (
    <article
      className={`${s.row}${
        step.status === "running"
          ? ` ${s.rowRunning}`
          : step.status === "failed"
            ? ` ${s.rowFailed}`
            : step.status === "ok"
              ? ` ${s.rowOk}`
              : step.status === "skipped"
                ? ` ${s.rowSkipped}`
                : ""
      }`}
      aria-labelledby={`step-${step.id}-title`}
    >
      <span className={`${s.accentBar} ${accentClass}`} aria-hidden="true" />
      <span className={s.glyphTile} aria-hidden="true">
        {pres.glyph}
      </span>
      <div className={s.body}>
        <div className={s.titleRow}>
          <span className={s.stepId} id={`step-${step.id}-title`}>
            {step.id}
          </span>
          <span className={s.stepLabel}>{pres.label}</span>
        </div>
        <span className={s.subtitle}>{pres.subtitle(step)}</span>

        <div className={s.metaRow}>
          {downloadMeta && (
            <>
              <span className={s.meta}>{downloadMeta}</span>
              {step.requires.length > 0 && <span className={s.metaSep}>·</span>}
            </>
          )}
          {step.requires.length > 0 && (
            <span className={s.meta}>
              requires{" "}
              {step.requires.map((req, idx) => (
                <span key={req}>
                  <span className={s.requiresChip}>{req}</span>
                  {idx < step.requires.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          )}
        </div>

        {showProgressBar && (
          <div
            className={s.progressTrack}
            role="progressbar"
            aria-valuemin={progressIndeterminate ? undefined : 0}
            aria-valuemax={progressIndeterminate ? undefined : 100}
            aria-valuenow={progressIndeterminate ? undefined : Math.round(progressPct)}
            aria-busy={progressIndeterminate || undefined}
          >
            {progressIndeterminate ? (
              <span className={s.progressIndeterminate} />
            ) : (
              <span className={s.progressFill} style={{ width: `${progressPct}%` }} />
            )}
          </div>
        )}

        {liveBytes && live && (
          <div className={s.liveMeta} aria-live="polite">
            <span className={s.livePrimary}>
              {shortenSize(live.currentBytes)} / {shortenSize(live.totalBytes)}
            </span>
            <span className={s.metaSep}>·</span>
            <span className={s.liveMetric}>{Math.round(live.pct)}%</span>
            {live.speedBps > 0 && (
              <>
                <span className={s.metaSep}>·</span>
                <span className={s.liveMetric}>{formatSpeed(live.speedBps)}</span>
              </>
            )}
            {live.etaSeconds !== null && (
              <>
                <span className={s.metaSep}>·</span>
                <span className={s.liveMetric}>ETA {formatDuration(live.etaSeconds)}</span>
              </>
            )}
          </div>
        )}

        {unknownTotalActive && live && (
          <div className={s.liveMeta} aria-live="polite">
            <span className={s.livePrimary}>{shortenSize(live.currentBytes)} downloaded</span>
            {live.speedBps > 0 && (
              <>
                <span className={s.metaSep}>·</span>
                <span className={s.liveMetric}>{formatSpeed(live.speedBps)}</span>
              </>
            )}
          </div>
        )}

        {showPhaseRow && phaseRow && (
          <div className={s.liveMeta} aria-live="polite">
            {phaseRow.label.length > 0 && (
              <span className={s.livePrimary}>{phaseRow.label}</span>
            )}
            {phaseRow.label.length > 0 && phaseRow.message.length > 0 && (
              <span className={s.metaSep}>·</span>
            )}
            {phaseRow.message.length > 0 && (
              <span className={s.liveMetric}>{phaseRow.message}</span>
            )}
          </div>
        )}

        {step.last_error && (
          <>
            <button
              type="button"
              className={s.expandToggle}
              onClick={() => setErrorOpen((v) => !v)}
              aria-expanded={errorOpen}
            >
              {errorOpen ? "Hide error details" : "View error details"}
            </button>
            {errorOpen && (
              <div className={s.errorPanel}>
                <span className={s.errorLine}>
                  {step.last_error.category}: {step.last_error.message}
                </span>
                {step.last_error.hint && (
                  <span className={s.errorHint}>{step.last_error.hint}</span>
                )}
                {step.last_error.log_excerpt && (
                  <pre className={s.errorLog}>{step.last_error.log_excerpt}</pre>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <div className={s.trailing}>
        <span className={s.statusPill}>
          <span className={`${s.statusDot} ${dotClass}`} />
          {STATUS_LABEL[step.status]}
        </span>
        {step.status === "failed" && (
          <button
            type="button"
            className={`${s.ctaButton} ${s.ctaPrimary}`}
            onClick={() => onRetry(step.id)}
            disabled={installActive}
          >
            Retry
          </button>
        )}
        {step.status === "ok" && (
          <button
            type="button"
            className={s.ctaButton}
            onClick={() => onReinstall(step.id)}
            disabled={installActive}
          >
            Reinstall
          </button>
        )}
        {(step.status === "pending" || step.status === "skipped") && (
          <button
            type="button"
            className={s.ctaButton}
            onClick={() => onInstallOnly(step.id)}
            disabled={installOnlyDisabled}
            title={installOnlyTitle}
          >
            Install only this
          </button>
        )}
      </div>
    </article>
  );
}
