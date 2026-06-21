import type {
  ActiveUpload,
  BackendCapability,
  DownloadJob,
  DownloadState,
  ModelFamily,
  ParsedSearchParams,
  SearchPage,
} from "../../services/model_store";
import { FilterBar } from "./components/FilterBar";
import {
  DownloadedPanel,
  type DownloadedArtifact,
} from "./components/DownloadedPanel";
import {
  ModelCard,
  type DownloadKind,
  type ModelOnDiskIdentity,
} from "./components/ModelCard";
import { Paginator } from "./components/Paginator";
import { RevalidateButton } from "./components/RevalidateButton";
import {
  EmptyState,
  ErrorState,
  SkeletonGrid,
} from "./components/SkeletonGrid";
import { SortMenu } from "./components/SortMenu";
import { PageHero } from "../../components/base/page_hero";
import { heroMetaSep as pageHeroMetaSep } from "../../components/base/page_hero.css";
import * as s from "./models_search.css";

export interface ModelsSearchUIProps {
  params: ParsedSearchParams;
  query: string;
  backends: BackendCapability[];
  page: SearchPage;
  loading: boolean;
  error: { code?: string; message: string } | null;
  degraded: boolean;
  resolved: ModelFamily | null;
  resolving: boolean;
  uploads: Record<string, ActiveUpload>;
  resolveError: { message: string } | null;
  installedArtifacts: DownloadedArtifact[] | null;
  installedLoading: boolean;
  installedError: { message: string } | null;
  installedTruncated: boolean;
  deletingId: string | null;
  jobStateByVariant: Record<string, DownloadState | undefined>;
  jobIdByVariant: Record<string, string | undefined>;
  jobByVariant: Record<string, DownloadJob | undefined>;
  jobStateByFamily: Record<string, DownloadState | undefined>;
  jobIdByFamily: Record<string, string | undefined>;
  jobByFamily: Record<string, DownloadJob | undefined>;
  jobStateByArtifact: Record<string, DownloadState | undefined>;
  jobIdByArtifact: Record<string, string | undefined>;
  jobByArtifact: Record<string, DownloadJob | undefined>;
  identityByFamily: Record<string, ModelOnDiskIdentity | undefined>;
  onQueryChange: (q: string) => void;
  onSourceChange: (source: ParsedSearchParams["source"]) => void;
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
  onDelete: (artifactId: string, label: string) => void;
  onDeleteInstalled: (artifactId: string, label: string) => void;
  onRefreshInstalled: () => void;
  onResolveUrl: (url: string) => void;
  onUpload: (file: File) => void;
  onCancelUpload: (id: string) => void;
  onRetry: () => void;
  onRevalidated: () => void;
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
    page,
    loading,
    error,
    degraded,
    resolved,
    resolving,
    resolveError,
    installedArtifacts,
    installedLoading,
    installedError,
    installedTruncated,
    deletingId,
    jobStateByVariant,
    jobIdByVariant,
    jobByVariant,
    jobStateByFamily,
    jobIdByFamily,
    jobByFamily,
    jobStateByArtifact,
    jobIdByArtifact,
    jobByArtifact,
    identityByFamily,
    onQueryChange,
    onSourceChange,
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
    onDelete,
    onDeleteInstalled,
    onRefreshInstalled,
    onResolveUrl,
    onUpload,
    onCancelUpload,
    uploads,
    onRetry,
    onRevalidated,
  } = props;

  const gridCls =
    params.view === "list" ? `${s.grid} ${s.gridList}` : s.grid;

  const isFromUrl = params.source === "from_url";

  return (
    <div className={s.page}>
      <PageHero
        eyebrow="Operator surface · Model registry"
        title="Model Foundry"
        actions={<RevalidateButton onRevalidated={onRevalidated} />}
        meta={
          <>
            <span>Discover and quantize state-of-the-art architectures</span>
            <span className={pageHeroMetaSep} aria-hidden="true">·</span>
            <span>Showing</span>
            <span className={s.heroCount}>{totalLabel(page.total_results)}</span>
          </>
        }
      />

      <FilterBar
        query={query}
        params={params}
        onQueryChange={onQueryChange}
        onSourceChange={onSourceChange}
        onCycleInstalled={onCycleInstalled}
        onClearAll={onClearAll}
        onResolveUrl={onResolveUrl}
        onUpload={onUpload}
        onCancelUpload={onCancelUpload}
        resolving={resolving}
        uploads={uploads}
        degraded={degraded}
      />

      {params.installed === "installed" && (
        <DownloadedPanel
          artifacts={installedArtifacts}
          loading={installedLoading}
          error={installedError}
          truncated={installedTruncated}
          deletingId={deletingId}
          onDelete={onDeleteInstalled}
          onRetry={onRefreshInstalled}
        />
      )}

      {!isFromUrl && (
        <>
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
                    jobStateByFamily={jobStateByFamily}
                    jobIdByFamily={jobIdByFamily}
                    jobByFamily={jobByFamily}
                    jobStateByArtifact={jobStateByArtifact}
                    jobIdByArtifact={jobIdByArtifact}
                    jobByArtifact={jobByArtifact}
                    identity={identityByFamily[family.family_id]}
                    onDownload={onDownload}
                    onPause={onPause}
                    onResume={onResume}
                    onAuthRequired={onAuthRequired}
                    onDelete={onDelete}
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
        </>
      )}

      {isFromUrl && (
        <>
          {resolveError && (
            <div className={s.bannerDegraded} role="alert">
              <span className="material-symbols-outlined" aria-hidden="true">
                error
              </span>
              {resolveError.message}
            </div>
          )}
          {!resolveError && resolving && <SkeletonGrid />}
          {!resolveError && !resolving && resolved && (
            <div className={gridCls}>
              <ModelCard
                family={resolved}
                jobStateByVariant={jobStateByVariant}
                jobIdByVariant={jobIdByVariant}
                jobByVariant={jobByVariant}
                jobStateByFamily={jobStateByFamily}
                jobIdByFamily={jobIdByFamily}
                jobByFamily={jobByFamily}
                jobStateByArtifact={jobStateByArtifact}
                jobIdByArtifact={jobIdByArtifact}
                jobByArtifact={jobByArtifact}
                identity={identityByFamily[resolved.family_id]}
                onDownload={onDownload}
                onPause={onPause}
                onResume={onResume}
                onAuthRequired={onAuthRequired}
                onDelete={onDelete}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
