import { type ReactElement, useCallback, useEffect, useState } from "react";
import { VideoPlayer } from "../../../components/media/video_player";
import { Button } from "../../../components/ui/button";
import { EmptyState } from "../../../components/ui/empty_state";
import { presentRenderError } from "../../../domain/error_codes";
import { estimateRemainingSeconds, type RenderState } from "../../../domain/render_state";
import { mediaUrlForOutput } from "../../../services/media_url";
import * as styles from "./render_progress.css";
import { SpeedGauge } from "./speed_gauge";

interface RenderProgressProps {
  state: RenderState;
  onCancel: () => void;
  onReset: () => void;
}

export function RenderProgress({ state, onCancel, onReset }: RenderProgressProps): ReactElement {
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (state.phase !== "running") setCancelling(false);
  }, [state.phase]);

  const handleCancel = useCallback(() => {
    setCancelling(true);
    onCancel();
  }, [onCancel]);

  if (state.phase === "idle") {
    return (
      <EmptyState
        title="No active render"
        detail="Pick a preset, set your anchor image and prompt, then start a render to see live progress here."
      />
    );
  }

  if (state.phase === "error") {
    const error = presentRenderError(state.errorCode, state.errorMessage);
    return (
      <div className={styles.root}>
        <div className={styles.errorBox} role="alert">
          <span className={styles.errorTitle}>{error.title}</span>
          <span className={styles.errorHint}>{error.hint}</span>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onReset}>
            Dismiss
          </Button>
        </div>
      </div>
    );
  }

  if (state.phase === "cancelled") {
    return (
      <div className={styles.root}>
        <EmptyState title="Render cancelled" detail="The render was stopped before completion." />
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    );
  }

  const reportFps = state.renderReport?.fps;
  const fps = typeof reportFps === "number" ? reportFps : undefined;

  if (state.phase === "done") {
    return (
      <output className={styles.root}>
        <VideoPlayer
          src={mediaUrlForOutput(state.outputPath)}
          fpsLabel={fps ? `${fps} fps` : undefined}
          ariaLabel="rendered output"
        />
        <RenderReportView state={state} />
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onReset}>
            New render
          </Button>
        </div>
      </output>
    );
  }

  const pct = Math.round(state.overallFraction * 100);

  return (
    <div className={styles.root}>
      <output className={styles.stageLine} aria-live="polite">
        {stageLabel(state)}
      </output>
      {/* biome-ignore lint/a11y/useFocusableInteractive: progressbar is a non-interactive ARIA role and must not be focusable */}
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label="overall progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <div
          className={styles.progressFill}
          style={{ transform: `scaleX(${Math.max(0.02, state.overallFraction)})` }}
        />
      </div>
      {state.stalled && (
        <output className={styles.stallNote}>
          Still working… no progress for a while — the connection may be lost. The render may still
          be running; check History if it does not resume.
        </output>
      )}
      <div className={styles.telemetryRow} aria-live="polite">
        <SpeedGauge secondsPerStep={state.secondsPerStep} />
        <div className={styles.statRow}>
          <Stat label="Overall" value={`${pct}%`} />
          <Stat
            label="Clip"
            value={state.numClips ? `${state.clipIndex + 1} / ${state.numClips}` : "—"}
          />
          <Stat
            label="Step"
            value={state.totalSteps ? `${state.step} / ${state.totalSteps}` : "—"}
          />
          <Stat label="ETA" value={formatEta(estimateRemainingSeconds(state))} />
          <Stat
            label="VRAM peak"
            value={state.vramPeakGib !== null ? `${state.vramPeakGib.toFixed(1)} GiB` : "—"}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button variant="danger" onClick={handleCancel} loading={cancelling} disabled={cancelling}>
          {cancelling ? "Cancelling…" : "Cancel render"}
        </Button>
      </div>
    </div>
  );
}

function formatEta(seconds: number | null): string {
  if (seconds === null) return "—";
  const total = Math.max(0, Math.round(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  if (m > 0) return `${m}m ${String(s).padStart(2, "0")}s`;
  return `${s}s`;
}

const STAGE_LABELS: Record<string, string> = {
  loading_text_encoder: "Loading text encoder (UMT5-xxl)…",
  encoding_prompts: "Encoding prompts…",
  encoding_anchors: "Encoding anchor keyframes…",
  loading_experts: "Loading diffusion experts…",
  denoising: "Denoising",
  stitching: "Assembling frames (overlap trim)…",
  upscaling: "RTX upscaling (Maxine VSR)…",
  interpolating: "Interpolating to target fps (RIFE)…",
};

function stageLabel(state: RenderState): string {
  if (!state.stage) return "Starting worker…";
  if (state.stage === "loading_experts" && state.stageDetail) return state.stageDetail;
  const base = STAGE_LABELS[state.stage] ?? state.stage;
  if (state.stage === "denoising" && state.numClips > 0) {
    return `${base} — clip ${state.clipIndex + 1} of ${state.numClips}`;
  }
  return base;
}

function baseModelReadout(report: NonNullable<RenderState["renderReport"]>): string | null {
  const high = report.base_model_high;
  const low = report.base_model_low;
  if (typeof high !== "string") return null;
  const custom = report.base_model_override === true;
  const tag = custom ? "custom" : "bundled";
  const highName = basenameOf(high);
  if (typeof low === "string" && low !== high) {
    return `${highName} + ${basenameOf(low)} (${tag})`;
  }
  const tier = report.svi_lora_tier;
  const sviNote = custom && typeof tier === "string" ? `, SVI ${tier}` : "";
  return `${highName} (${tag}${sviNote})`;
}

function compileReadout(report: NonNullable<RenderState["renderReport"]>): string | null {
  const c = report.torch_compile;
  if (!c || typeof c !== "object") return null;
  const a = c as Record<string, unknown>;
  if (a.requested !== true) return null;
  if (a.blocked_by_block_swap === true) return "skipped — block-swap on";
  if (typeof a.error === "string") return "failed → eager";
  if (a.engaged !== true) return "not engaged";
  const mode = typeof a.mode === "string" ? a.mode : "default";
  const dyn = (a.dynamo as Record<string, unknown> | undefined) ?? {};
  const graphs = typeof dyn.unique_graphs === "number" ? dyn.unique_graphs : null;
  const calls = typeof dyn.calls_captured === "number" ? dyn.calls_captured : null;
  const breaks = typeof dyn.graph_breaks === "number" ? dyn.graph_breaks : null;
  if (graphs !== null && calls !== null) {
    const brk = breaks ? `, ${breaks} breaks` : "";
    return `${mode} — ${graphs} graphs / ${calls} calls${brk}`;
  }
  return `${mode} — engaged`;
}

function basenameOf(path: string): string {
  const parts = path.split(/[\\/]/);
  return parts[parts.length - 1] || path;
}

function Stat({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}

function RenderReportView({ state }: { state: RenderState }): ReactElement | null {
  const report = state.renderReport;
  if (!report) return null;
  const entries: Array<[string, string]> = [];
  const baseModel = baseModelReadout(report);
  if (baseModel) entries.push(["Base model", baseModel]);
  const compile = compileReadout(report);
  if (compile) entries.push(["torch.compile", compile]);
  if (typeof report.frames === "number") entries.push(["Frames", String(report.frames)]);
  if (typeof report.duration_seconds === "number")
    entries.push(["Duration", `${report.duration_seconds.toFixed(1)}s`]);
  if (state.vramPeakGib !== null) entries.push(["VRAM peak", `${state.vramPeakGib.toFixed(1)} GiB`]);
  if (typeof report.sha256 === "string") entries.push(["sha256", `${report.sha256.slice(0, 16)}…`]);
  if (state.outputPath) entries.push(["Output", state.outputPath]);

  if (entries.length === 0) return null;

  return (
    <div className={styles.reportGrid}>
      {entries.map(([key, value]) => (
        <div className={styles.reportItem} key={key}>
          <span className={styles.reportKey}>{key}</span>
          <span className={styles.reportValue}>{value}</span>
        </div>
      ))}
    </div>
  );
}
