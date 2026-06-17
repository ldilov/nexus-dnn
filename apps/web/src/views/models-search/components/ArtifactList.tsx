// Lists multiple quantization / format artifacts for a model family
// whose upstream registry didn't declare any `Variant`s. Example: a

import type {
  Artifact,
  DownloadJob,
  DownloadState,
} from "../../../services/model_store";
import * as s from "./VariantList.css";

interface ArtifactListProps {
  artifacts: Artifact[];
  jobStateByArtifact: Record<string, DownloadState | undefined>;
  jobIdByArtifact: Record<string, string | undefined>;
  jobByArtifact: Record<string, DownloadJob | undefined>;
  onDownload: (artifact: Artifact) => void;
  onPause: (jobId: string) => void;
  onResume: (jobId: string) => void;
  compatHint?: string;
}

function formatSize(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined || !Number.isFinite(bytes) || bytes <= 0) {
    return "—";
  }
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[unit]}`;
}

function progressCopy(job: DownloadJob | undefined, state: DownloadState): string | null {
  if (!job) return null;
  const total = job.total_bytes ?? null;
  const done = job.progress_bytes ?? 0;
  if (state === "queued") return "queued";
  if (state === "paused") {
    return total ? `${formatSize(done)} / ${formatSize(total)} · paused` : "paused";
  }
  if (state === "downloading") {
    if (total && total > 0) {
      const pct = Math.min(100, Math.max(0, Math.round((done / total) * 100)));
      return `${formatSize(done)} / ${formatSize(total)} · ${pct}%`;
    }
    return `${formatSize(done)} downloaded`;
  }
  if (state === "failed") return "failed";
  return null;
}

function progressPct(job: DownloadJob | undefined): number | null {
  if (!job || !job.total_bytes || job.total_bytes <= 0) return null;
  return Math.min(100, Math.max(0, (job.progress_bytes / job.total_bytes) * 100));
}

type Intent = "download" | "pause" | "resume" | "noop";

function stateGlyph(state: DownloadState): {
  icon: string;
  cls?: string;
  label: string;
  intent: Intent;
} {
  switch (state) {
    case "downloaded":
      return { icon: "check_circle", cls: s.rowActionDone, label: "Installed", intent: "noop" };
    case "downloading":
    case "queued":
      return { icon: "pause_circle", cls: s.spinner, label: "Pause", intent: "pause" };
    case "paused":
      return { icon: "play_circle", label: "Resume", intent: "resume" };
    case "failed":
      return { icon: "refresh", cls: s.rowActionFailed, label: "Retry", intent: "download" };
    case "auth_required":
      return { icon: "lock", cls: s.rowActionFailed, label: "Access gated", intent: "noop" };
    case "incompatible":
      return { icon: "block", label: "Incompatible", intent: "noop" };
    default:
      return { icon: "download_for_offline", label: "Download", intent: "download" };
  }
}

function artifactLabel(artifact: Artifact): string {
  // Filename is the most operator-recognisable identifier — it carries
  // the quantization suffix in HF GGUF repos (e.g. `model-q4_k_m.gguf`).
  const base = artifact.filename.split(/[\\/]/).pop() ?? artifact.filename;
  return base;
}

function artifactDetail(artifact: Artifact): string {
  // `precision` is the most relevant secondary signal — operators
  // pick a quantization by precision (q4, q5, q8, fp16, etc.). When
  const precision = artifact.precision;
  if (precision && precision !== "unknown") {
    return precision;
  }
  return artifact.format;
}

export function ArtifactList({
  artifacts,
  jobStateByArtifact,
  jobIdByArtifact,
  jobByArtifact,
  onDownload,
  onPause,
  onResume,
  compatHint,
}: ArtifactListProps) {
  return (
    <section className={s.section} aria-label="Available files">
      <header className={s.sectionHead}>
        <span className={s.sectionTitle}>files · {artifacts.length}</span>
        {compatHint ? <span className={s.sectionHint}>{compatHint}</span> : null}
      </header>
      <ul className={s.list}>
        {artifacts.map((artifact) => {
          const state = jobStateByArtifact[artifact.artifact_id] ?? artifact.install_state;
          const job = jobByArtifact[artifact.artifact_id];
          const jobId = jobIdByArtifact[artifact.artifact_id];
          const glyph = stateGlyph(state);
          const copy = progressCopy(job, state);
          const pct = progressPct(job);
          const onAction = () => {
            switch (glyph.intent) {
              case "download":
                onDownload(artifact);
                break;
              case "pause":
                if (jobId) onPause(jobId);
                break;
              case "resume":
                if (jobId) onResume(jobId);
                break;
              case "noop":
              default:
                break;
            }
          };
          const interactive = glyph.intent !== "noop";
          return (
            <li
              key={artifact.artifact_id}
              className={s.row}
              role={interactive ? "button" : "listitem"}
              tabIndex={interactive ? 0 : -1}
              onClick={interactive ? onAction : undefined}
              onKeyDown={(e) => {
                if (!interactive) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onAction();
                }
              }}
              aria-label={`${artifactLabel(artifact)} — ${glyph.label}`}
            >
              <div className={s.rowLeft}>
                <span className={s.label}>{artifactLabel(artifact)}</span>
                <span className={s.size}>
                  {artifactDetail(artifact)} · {formatSize(artifact.size_bytes)}
                </span>
                {copy ? <span className={s.progress}>{copy}</span> : null}
                {pct !== null && state === "downloading" ? (
                  <span
                    className={s.progressBar}
                    role="progressbar"
                    aria-valuenow={Math.round(pct)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span className={s.progressFill} style={{ width: `${pct}%` }} />
                  </span>
                ) : null}
              </div>
              <span
                className={`material-symbols-outlined ${s.rowAction} ${glyph.cls ?? ""}`}
                aria-hidden="true"
              >
                {glyph.icon}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
