import type {
  BackendCapability,
  CompatibilityStatus,
  DownloadJob,
  DownloadState,
  Format,
  Modality,
  ModelFamily,
  ParsedSearchParams,
  SearchPage,
} from "../../services/model_store";
import { FilterBar } from "./components/FilterBar";
import { ModelCard, type DownloadKind } from "./components/ModelCard";
import { Paginator } from "./components/Paginator";
import {
  EmptyState,
  ErrorState,
  SkeletonGrid,
} from "./components/SkeletonGrid";
import { SortMenu } from "./components/SortMenu";
import { PageHero } from "../../components/base/page_hero";
import * as s from "./models_search.css";

export interface ModelsSearchUIProps {
  params: ParsedSearchParams;
  query: string;
  backends: BackendCapability[];
  page: SearchPage;
  loading: boolean;
  error: { code?: string; message: string } | null;
  degraded: boolean;
  jobStateByVariant: Record<string, DownloadState | undefined>;
  jobIdByVariant: Record<string, string | undefined>;
  jobByVariant: Record<string, DownloadJob | undefined>;
  onQueryChange: (q: string) => void;
  onToggleFormat: (fmt: Format) => void;
  onToggleBackend: (id: string) => void;
  onToggleModality: (m: Modality) => void;
  onToggleCompat: (c: CompatibilityStatus) => void;
  onToggleShowUnsupported: () => void;
  onCycleInstalled: () => void;
  onClearInstalled: () => void;
  onClearAll: () => void;
  onSortChange: (sort: ParsedSearchParams["sort"]) => void;
  onViewChange: (view: "grid" | "list") => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onDownload: (family: ModelFamily, target: DownloadKind) => void;
  onPause: (jobId: string) => void;
  onResume: (jobId: string) => void;
  onAuthRequired: (family: ModelFamily) => void;
  onRetry: () => void;
}

function totalLabel(total: number | null): string {
  if (total === null) return "loaded";
  if (total === 1) return "1 model";
  return `${total.toLocaleString()} models`;
}

export function ModelsSearchUI(props: ModelsSearchUIProps) {
  const {
    params,
    query,
    backends,
    page,
    loading,
    error,
    degraded,
    jobStateByVariant,
    jobIdByVariant,
    jobByVariant,
    onQueryChange,
    onToggleFormat,
    onToggleBackend,
    onToggleModality,
    onToggleCompat,
    onToggleShowUnsupported,
    onCycleInstalled,
    onClearInstalled,
    onClearAll,
    onSortChange,
    onViewChange,
    onPageChange,
    onPageSizeChange,
    onDownload,
    onPause,
    onResume,
    onAuthRequired,
    onRetry,
  } = props;

  const gridCls =
    params.view === "list" ? `${s.grid} ${s.gridList}` : s.grid;

  return (
    <div className={s.page}>
      <PageHero
        eyebrow="Operator surface · Model registry"
        title="Model Foundry"
        meta={
          <span>
            Showing <span className={s.heroCount}>{totalLabel(page.total_results)}</span>
          </span>
        }
      />

      <FilterBar
        query={query}
        params={params}
        backends={backends}
        onQueryChange={onQueryChange}
        onToggleFormat={onToggleFormat}
        onToggleBackend={onToggleBackend}
        onToggleModality={onToggleModality}
        onToggleCompat={onToggleCompat}
        onToggleShowUnsupported={onToggleShowUnsupported}
        onCycleInstalled={onCycleInstalled}
        onClearAll={onClearAll}
        degraded={degraded}
      />

      <div className={s.sortRow}>
        <SortMenu value={params.sort} onChange={onSortChange} />
        <div
          className={s.viewToggle}
          role="radiogroup"
          aria-label="Result view mode"
        >
          <button
            type="button"
            role="radio"
            aria-checked={params.view === "grid"}
            aria-label="Grid view"
            className={
              params.view === "grid"
                ? `${s.viewToggleButton} ${s.viewToggleButtonActive}`
                : s.viewToggleButton
            }
            onClick={() => onViewChange("grid")}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              grid_view
            </span>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={params.view === "list"}
            aria-label="List view"
            className={
              params.view === "list"
                ? `${s.viewToggleButton} ${s.viewToggleButtonActive}`
                : s.viewToggleButton
            }
            onClick={() => onViewChange("list")}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              view_list
            </span>
          </button>
        </div>
      </div>

      {error && <ErrorState error={error} onRetry={onRetry} />}

      {!error && loading && <SkeletonGrid />}

      {!error && !loading && page.families.length === 0 && (
        <EmptyState
          showUnsupported={params.showUnsupported}
          installedMode={params.installed}
          onToggleShowUnsupported={onToggleShowUnsupported}
          onClearInstalled={onClearInstalled}
        />
      )}

      {!error && !loading && page.families.length > 0 && (
        <>
          <div className={gridCls}>
            {page.families.map((family) => (
              <ModelCard
                key={family.family_id}
                family={family}
                jobStateByVariant={jobStateByVariant}
                jobIdByVariant={jobIdByVariant}
                jobByVariant={jobByVariant}
                onDownload={onDownload}
                onPause={onPause}
                onResume={onResume}
                onAuthRequired={onAuthRequired}
              />
            ))}
          </div>
          <Paginator
            page={page.page}
            pageSize={page.page_size}
            totalResults={page.total_results}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </>
      )}
    </div>
  );
}
