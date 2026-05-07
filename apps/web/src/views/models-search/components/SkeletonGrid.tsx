import { EmptyState as SharedEmptyState } from "../../../components/layout/empty_state";
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
      <SharedEmptyState
        count="0"
        line="No downloaded models match the active filters. Browse the full registry to install one."
        primaryAction={{ label: "Browse all models", onClick: onClearInstalled }}
      />
    );
  }
  if (!showUnsupported) {
    return (
      <SharedEmptyState
        count="0"
        line="No models match the active filters. Surface results that aren't runnable in your current backend, or relax a filter."
        primaryAction={{
          label: "Show unsupported results",
          onClick: onToggleShowUnsupported,
        }}
      />
    );
  }
  return (
    <SharedEmptyState
      count="0"
      line="No models match the active filters. Try a different search, or clear a filter."
    />
  );
}

export function ErrorState({
  error,
  onRetry,
}: {
  error: { code?: string; message: string };
  onRetry: () => void;
}) {
  const title =
    error.code === "upstream_unavailable"
      ? "Hugging Face is unreachable"
      : "Something went wrong";
  return (
    <SharedEmptyState
      count="!"
      line={`${title}. ${error.message}`}
      primaryAction={{ label: "Retry", onClick: onRetry }}
    />
  );
}
