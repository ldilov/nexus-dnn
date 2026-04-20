import { useMemo, useRef } from "react";
import type {
  Artifact,
  DownloadJob,
  DownloadState,
  Variant,
} from "../../../services/model_store";
import * as s from "./VariantList.css";

interface VariantListProps {
  variants: Variant[];
  artifacts: Artifact[];
  jobStateByVariant: Record<string, DownloadState | undefined>;
  jobIdByVariant: Record<string, string | undefined>;
  jobByVariant: Record<string, DownloadJob | undefined>;
  onDownload: (variant: Variant) => void;
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

function sizeOfVariant(v: Variant, sizeMap: Record<string, number | null>): number | null {
  let total = 0;
  let any = false;
  for (const id of v.artifact_ids) {
    const s = sizeMap[id];
    if (typeof s === "number") {
      total += s;
      any = true;
    }
  }
  return any ? total : null;
}

type RowIntent = "download" | "pause" | "resume" | "noop";

interface VariantRowProps {
  variant: Variant;
  size: number | null;
  state: DownloadState;
  job: DownloadJob | undefined;
  onDownload: () => void;
  onPause: () => void;
  onResume: () => void;
  onArrow: (dir: 1 | -1) => void;
}

function stateIcon(state: DownloadState): {
  icon: string;
  cls?: string;
  label: string;
  intent: RowIntent;
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

function VariantRow({
  variant,
  size,
  state,
  job,
  onDownload,
  onPause,
  onResume,
  onArrow,
}: VariantRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const meta = stateIcon(state);
  const isActionable = meta.intent !== "noop";
  const progress = progressCopy(job, state);
  const pct = progressPct(job);

  let rowCls = s.row;
  if (variant.is_default) rowCls += ` ${s.rowDefault}`;
  if (state === "downloaded") rowCls += ` ${s.rowInstalled}`;

  let btnCls = s.rowAction;
  if (meta.cls) btnCls += ` ${meta.cls}`;

  const trigger = () => {
    switch (meta.intent) {
      case "download":
        onDownload();
        break;
      case "pause":
        onPause();
        break;
      case "resume":
        onResume();
        break;
      default:
        break;
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onArrow(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onArrow(-1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isActionable) trigger();
    }
  };

  return (
    <div
      ref={rowRef}
      className={rowCls}
      role="listitem"
      tabIndex={0}
      onKeyDown={onKey}
      onClick={isActionable ? trigger : undefined}
      aria-label={`${variant.label}, ${formatSize(size)}, ${meta.label}`}
    >
      <div className={s.rowLeft}>
        <span className={s.label}>{variant.label}</span>
        <span className={s.size}>{formatSize(size)}</span>
        {variant.is_default && <span className={s.recommended}>recommended</span>}
        {progress && <span className={s.progress}>{progress}</span>}
      </div>
      {pct !== null && (
        <div
          className={s.progressBar}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className={s.progressFill} style={{ width: `${pct}%` }} />
        </div>
      )}
      <button
        type="button"
        className={btnCls}
        aria-label={meta.label}
        onClick={(e) => {
          e.stopPropagation();
          if (isActionable) trigger();
        }}
        disabled={!isActionable}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          {meta.icon}
        </span>
      </button>
    </div>
  );
}

export function VariantList({
  variants,
  artifacts,
  jobStateByVariant,
  jobIdByVariant,
  jobByVariant,
  onDownload,
  onPause,
  onResume,
  compatHint,
}: VariantListProps) {
  const sizeMap = useMemo(() => {
    const out: Record<string, number | null> = {};
    for (const a of artifacts) {
      out[a.artifact_id] = a.size_bytes;
    }
    return out;
  }, [artifacts]);

  if (variants.length === 0) return null;

  const focusSibling = (currentIdx: number, dir: 1 | -1) => {
    const target = currentIdx + dir;
    if (target < 0 || target >= variants.length) return;
    const container = document.querySelectorAll<HTMLElement>(
      `[data-variant-list="${variants[0]?.variant_id}"] [role="listitem"]`,
    );
    container[target]?.focus();
  };

  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <span className={s.sectionTitle}>Quantizations</span>
        {compatHint && <span className={s.sectionHint}>{compatHint}</span>}
      </div>
      <div className={s.list} role="list" data-variant-list={variants[0]?.variant_id}>
        {variants.map((variant, idx) => {
          const jobId = jobIdByVariant[variant.variant_id];
          return (
            <VariantRow
              key={variant.variant_id}
              variant={variant}
              size={sizeOfVariant(variant, sizeMap)}
              state={jobStateByVariant[variant.variant_id] ?? variant.install_state}
              job={jobByVariant[variant.variant_id]}
              onDownload={() => onDownload(variant)}
              onPause={() => {
                if (jobId) onPause(jobId);
              }}
              onResume={() => {
                if (jobId) onResume(jobId);
              }}
              onArrow={(dir) => focusSibling(idx, dir)}
            />
          );
        })}
      </div>
    </section>
  );
}
