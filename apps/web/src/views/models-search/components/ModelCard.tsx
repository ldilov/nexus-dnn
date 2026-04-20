import { toast } from "sonner";
import type {
  DownloadJob,
  DownloadState,
  ModelFamily,
  Variant,
} from "../../../services/model_store";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { DependencyStrip } from "./DependencyStrip";
import { VariantList } from "./VariantList";
import * as s from "./ModelCard.css";

function copyRepoId(repoId: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    void navigator.clipboard.writeText(repoId);
    toast.success(`Copied ${repoId}`);
  }
}

export type DownloadKind =
  | { kind: "primary"; artifactId: string }
  | { kind: "variant"; variantId: string }
  | { kind: "bundle" };

interface ModelCardProps {
  family: ModelFamily;
  jobStateByVariant: Record<string, DownloadState | undefined>;
  jobIdByVariant: Record<string, string | undefined>;
  jobByVariant: Record<string, DownloadJob | undefined>;
  onDownload: (family: ModelFamily, target: DownloadKind) => void;
  onPause: (jobId: string) => void;
  onResume: (jobId: string) => void;
  onAuthRequired: (family: ModelFamily) => void;
}

function formatCount(n: number | null | undefined): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

function formatSize(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined || !Number.isFinite(bytes) || bytes <= 0) {
    return "—";
  }
  const units = ["B", "KB", "MB", "GB", "TB"];
  let v = bytes;
  let u = 0;
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024;
    u += 1;
  }
  return `${v.toFixed(v >= 100 ? 0 : 1)} ${units[u]}`;
}

function primaryArtifact(family: ModelFamily) {
  return family.artifacts.find((a) => a.role === "primary") ?? family.artifacts[0];
}

function accentFor(family: ModelFamily): keyof typeof s.accentVariants {
  const primary = primaryArtifact(family);
  if (!primary) return "none";
  if (primary.format === "gguf" || primary.format === "ggml") return "primary";
  if (family.repository.modality === "image" || family.repository.modality === "video") {
    return "tertiary";
  }
  return "none";
}

function ownerClass(family: ModelFamily): string {
  const a = primaryArtifact(family);
  if (a?.format === "gguf" || a?.format === "ggml") return s.owner;
  if (family.repository.modality === "image" || family.repository.modality === "video") {
    return `${s.owner} ${s.ownerTertiary}`;
  }
  return `${s.owner} ${s.ownerMuted}`;
}

function isAuthRequired(family: ModelFamily): boolean {
  return family.warnings.includes("auth_required");
}

export function ModelCard({
  family,
  jobStateByVariant,
  jobIdByVariant,
  jobByVariant,
  onDownload,
  onPause,
  onResume,
  onAuthRequired,
}: ModelCardProps) {
  const primary = primaryArtifact(family);
  const accent = accentFor(family);
  const cardCls = `${s.card} ${s.accentVariants[accent]}`;
  const showVariants = family.variants.length > 0;
  const hasRequiredDeps = family.dependencies.some(
    (d) => d.requirement === "required",
  );
  const unsupported =
    family.compat === "unsupported" || family.compat === "unknown";
  const gated = isAuthRequired(family);
  const precisionAssumed = primary?.precision_source === "inferred";
  const precisionUnknown =
    primary?.precision === "unknown" || primary?.precision_source === "unknown";

  return (
    <article className={cardCls} aria-labelledby={`family-${family.family_id}`}>
      <header className={s.header}>
        <div className={s.headerText}>
          <span className={ownerClass(family)}>{family.repository.owner}</span>
          <h3 id={`family-${family.family_id}`} className={s.title}>
            {family.repository.name}
          </h3>
        </div>
        <div className={s.stats}>
          <span className={s.stat} title="Downloads">
            <span className={`material-symbols-outlined ${s.statIcon}`} aria-hidden="true">
              download
            </span>
            {formatCount(family.repository.downloads)}
          </span>
          {family.repository.likes !== null && (
            <span className={s.stat} title="Likes">
              <span
                className={`material-symbols-outlined ${s.statIcon}`}
                aria-hidden="true"
              >
                favorite
              </span>
              {formatCount(family.repository.likes)}
            </span>
          )}
        </div>
      </header>

      <div className={s.chipsRow}>
        <CompatibilityBadge status={family.compat} />
        {primary && (
          <span className={`${s.chip} ${s.chipPrimary}`}>{primary.format}</span>
        )}
        <span className={s.chip}>{family.repository.modality}</span>
        {family.repository.license && (
          <span className={s.chip}>{family.repository.license}</span>
        )}
      </div>

      {family.repository.description && (
        <p className={s.description}>{family.repository.description}</p>
      )}

      {gated && (
        <div className={s.authOverlay} role="status">
          <span
            className={`material-symbols-outlined ${s.authIcon}`}
            aria-hidden="true"
          >
            lock
          </span>
          <span>Access gated — HF token required</span>
          <button
            type="button"
            className={s.authButton}
            onClick={() => onAuthRequired(family)}
          >
            How to fix
          </button>
        </div>
      )}

      {showVariants && !unsupported && !gated && (
        <VariantList
          variants={family.variants}
          artifacts={family.artifacts}
          jobStateByVariant={jobStateByVariant}
          jobIdByVariant={jobIdByVariant}
          jobByVariant={jobByVariant}
          onDownload={(v: Variant) =>
            onDownload(family, { kind: "variant", variantId: v.variant_id })
          }
          onPause={onPause}
          onResume={onResume}
          compatHint={
            primary?.format === "gguf" || primary?.format === "ggml"
              ? "llama.cpp compatible"
              : undefined
          }
        />
      )}

      {!showVariants && primary && !unsupported && !gated && (
        <div className={s.precisionRow}>
          <span className={s.precisionLabel}>
            {primary.format.replace("_", " ")}
            {primary.precision !== "quantized" && " · precision"}
          </span>
          {precisionUnknown ? (
            <span className={`${s.precisionValue} ${s.precisionAssumed}`}>
              precision unspecified · {formatSize(primary.size_bytes)}
            </span>
          ) : (
            <span className={s.precisionValue}>
              {primary.precision}
              {precisionAssumed && (
                <span className={s.precisionAssumed}> · assumed</span>
              )}
              {" · "}
              {formatSize(primary.size_bytes)}
            </span>
          )}
        </div>
      )}

      {hasRequiredDeps && (
        <DependencyStrip dependencies={family.dependencies} />
      )}

      <footer className={s.actions}>
        {unsupported ? (
          <button
            type="button"
            className={s.actionGhost}
            onClick={() => copyRepoId(family.repository.repo_id)}
          >
            Copy repo id
          </button>
        ) : gated ? (
          <button
            type="button"
            className={s.actionSecondary}
            onClick={() => onAuthRequired(family)}
          >
            How to add HF token
          </button>
        ) : (
          <>
            {primary && !showVariants && (
              <button
                type="button"
                className={s.actionPrimary}
                onClick={() =>
                  onDownload(family, {
                    kind: "primary",
                    artifactId: primary.artifact_id,
                  })
                }
              >
                Download primary
              </button>
            )}
            {hasRequiredDeps && (
              <button
                type="button"
                className={
                  showVariants ? s.actionPrimary : s.actionSecondary
                }
                onClick={() =>
                  onDownload(family, { kind: "bundle" })
                }
              >
                Download bundle
              </button>
            )}
            {!showVariants && !hasRequiredDeps && !primary && (
              <button
                type="button"
                className={s.actionGhost}
                onClick={() => copyRepoId(family.repository.repo_id)}
              >
                Copy repo id
              </button>
            )}
          </>
        )}
      </footer>
    </article>
  );
}
