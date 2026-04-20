import * as s from "../models_search.css";

interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({ count = 6 }: SkeletonGridProps) {
  return (
    <div className={s.grid} aria-busy="true" aria-label="Loading models">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={s.skeletonCard} aria-hidden="true" />
      ))}
    </div>
  );
}

export function EmptyState({
  showUnsupported,
  installedMode,
  onToggleShowUnsupported,
  onClearInstalled,
}: {
  showUnsupported: boolean;
  installedMode: "any" | "installed" | "not_installed";
  onToggleShowUnsupported: () => void;
  onClearInstalled: () => void;
}) {
  if (installedMode === "installed") {
    return (
      <div className={s.emptyState} role="status">
        <span className={`material-symbols-outlined ${s.emptyIcon}`} aria-hidden="true">
          download_done
        </span>
        <h3 className={s.emptyTitle}>No downloaded models yet</h3>
        <p className={s.emptyHint}>
          Install a model from search to see it here.
        </p>
        <button type="button" className={s.emptyAction} onClick={onClearInstalled}>
          Browse all models
        </button>
      </div>
    );
  }

  return (
    <div className={s.emptyState} role="status">
      <span className={`material-symbols-outlined ${s.emptyIcon}`} aria-hidden="true">
        travel_explore
      </span>
      <h3 className={s.emptyTitle}>No models match your filters</h3>
      <p className={s.emptyHint}>
        Try a different search, clear a filter, or broaden your scope.
        {!showUnsupported &&
          " You can also surface models that aren't runnable in your current backend."}
      </p>
      {!showUnsupported && (
        <button
          type="button"
          className={s.emptyAction}
          onClick={onToggleShowUnsupported}
        >
          Show unsupported results
        </button>
      )}
    </div>
  );
}

export function ErrorState({
  error,
  onRetry,
}: {
  error: { code?: string; message: string };
  onRetry: () => void;
}) {
  return (
    <div className={s.errorState} role="alert">
      <span className={`material-symbols-outlined ${s.emptyIcon}`} aria-hidden="true">
        cloud_off
      </span>
      <h3 className={s.emptyTitle}>
        {error.code === "upstream_unavailable"
          ? "Hugging Face is unreachable"
          : "Something went wrong"}
      </h3>
      <p className={s.emptyHint}>{error.message}</p>
      <button type="button" className={s.emptyAction} onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
