import { type ReactElement, useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { EmptyState } from "../../../components/ui/empty_state";
import { presentGenerateError } from "../../../domain/error_codes";
import type { GenerateState } from "../../../domain/generate_state";
import { mediaUrlForRef } from "../../../services/media_url";
import type { GenerationMetadata } from "../../../services/types";
import * as styles from "./generate_progress.css";

interface GenerateProgressProps {
  state: GenerateState;
  onCancel: () => void;
  onReset: () => void;
}

/** Friendly labels for the known worker vocab. Unknown stages are humanized
 * generically so a vocab change never blanks the readout. */
const STAGE_LABELS: Record<string, string> = {
  preprocess: "Preprocessing image…",
  dinov3: "Encoding image (DINOv3)…",
  sparse: "Building O-Voxel sparse structure…",
  shape: "Decoding shape…",
  decode: "Decoding mesh…",
  mesh: "Assembling mesh…",
  texture: "Baking texture…",
  glb: "Exporting GLB…",
};

export function GenerateProgress({
  state,
  onCancel,
  onReset,
}: GenerateProgressProps): ReactElement {
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
        title="No active generation"
        detail="Upload an input image and start a generation to see live progress here."
      />
    );
  }

  if (state.phase === "error") {
    const error = presentGenerateError(state.errorCode, state.errorMessage);
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
        <EmptyState
          title="Generation cancelled"
          detail="The generation was stopped before completion."
        />
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    );
  }

  if (state.phase === "done") {
    return <DoneResult state={state} onReset={onReset} />;
  }

  const pct = Math.round(state.overallFraction * 100);

  return (
    <div className={styles.root}>
      <output className={styles.stageLine} aria-live="polite">
        {stageLabel(state)}
      </output>
      {/* biome-ignore lint/a11y/useFocusableInteractive: progressbar is a non-interactive ARIA role */}
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
      <div className={styles.statRow} aria-live="polite">
        <Stat label="Overall" value={`${pct}%`} />
        <Stat label="Stage" value={state.stage ? humanizeStage(state.stage) : "—"} />
        <Stat
          label="Step"
          value={state.totalSteps ? `${state.step} / ${state.totalSteps}` : "—"}
        />
      </div>
      <div className={styles.actions}>
        <Button variant="danger" onClick={handleCancel} loading={cancelling} disabled={cancelling}>
          {cancelling ? "Cancelling…" : "Cancel generation"}
        </Button>
      </div>
    </div>
  );
}

function DoneResult({
  state,
  onReset,
}: {
  state: GenerateState;
  onReset: () => void;
}): ReactElement {
  const glbUrl = mediaUrlForRef(state.glbRef);
  const downloadName = state.glbRef ? `${state.glbRef}.glb` : "mesh.glb";

  return (
    <output className={styles.resultCard}>
      <div className={styles.resultRow}>
        <div className={styles.thumbPlaceholder} aria-hidden="true">
          3D
        </div>
        <div className={styles.resultMeta}>
          <MetadataView metadata={state.metadata} glbRef={state.glbRef} />
          {glbUrl ? (
            <a className={styles.downloadLink} href={glbUrl} download={downloadName}>
              Download GLB
            </a>
          ) : null}
        </div>
      </div>
      <div className={styles.actions}>
        <Button variant="secondary" onClick={onReset}>
          New generation
        </Button>
      </div>
    </output>
  );
}

function humanizeStage(stage: string): string {
  return stage.replace(/[_-]+/g, " ");
}

function stageLabel(state: GenerateState): string {
  if (!state.stage) return "Starting worker…";
  return STAGE_LABELS[state.stage] ?? `${humanizeStage(state.stage)}…`;
}

function Stat({ label, value }: { label: string; value: string }): ReactElement {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}

function MetadataView({
  metadata,
  glbRef,
}: {
  metadata: GenerationMetadata | null;
  glbRef: string | null;
}): ReactElement | null {
  const entries: Array<[string, string]> = [];
  if (metadata) {
    const verts = metadata.mesh?.vertices;
    const faces = metadata.mesh?.faces;
    if (typeof verts === "number") entries.push(["Vertices", verts.toLocaleString()]);
    if (typeof faces === "number") entries.push(["Faces", faces.toLocaleString()]);
    if (typeof metadata.textured === "boolean")
      entries.push(["Texture", metadata.textured ? "baked" : "none"]);
    if (typeof metadata.attention_backend === "string")
      entries.push(["Attention", metadata.attention_backend]);
    if (typeof metadata.compute_cap === "string")
      entries.push(["Compute cap", metadata.compute_cap]);
    const totalMs = sumStageTimings(metadata.stage_timings);
    if (totalMs !== null) entries.push(["Duration", `${(totalMs / 1000).toFixed(1)}s`]);
    if (typeof metadata.sha256 === "string")
      entries.push(["sha256", `${metadata.sha256.slice(0, 16)}…`]);
  }
  if (glbRef) entries.push(["Artifact", glbRef]);

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

function sumStageTimings(timings: Record<string, number> | undefined): number | null {
  if (!timings) return null;
  const values = Object.values(timings).filter((v) => typeof v === "number");
  if (values.length === 0) return null;
  return values.reduce((acc, v) => acc + v, 0);
}
