import type {
  BackendCapability,
  CompatibilityStatus,
  Format,
  Modality,
  ParsedSearchParams,
} from "../../../services/model_store";
import * as s from "../models_search.css";

const FORMAT_OPTIONS: readonly Format[] = [
  "gguf",
  "safetensors",
  "pytorch_bin",
  "pth",
];

const MODALITY_OPTIONS: readonly Modality[] = [
  "llm",
  "image",
  "video",
  "audio",
  "upscaler",
  "embedding",
];

const COMPAT_OPTIONS: readonly {
  value: CompatibilityStatus;
  label: string;
}[] = [
  { value: "compatible", label: "Ready" },
  { value: "downloadable_but_not_runnable", label: "Download only" },
  { value: "compatible_with_requirements", label: "Needs setup" },
];

interface FilterBarProps {
  query: string;
  params: ParsedSearchParams;
  backends: BackendCapability[];
  onQueryChange: (q: string) => void;
  onToggleFormat: (fmt: Format) => void;
  onToggleBackend: (id: string) => void;
  onToggleModality: (m: Modality) => void;
  onToggleCompat: (c: CompatibilityStatus) => void;
  onToggleShowUnsupported: () => void;
  onCycleInstalled: () => void;
  onClearAll: () => void;
  degraded: boolean;
}

export function FilterBar({
  query,
  params,
  backends,
  onQueryChange,
  onToggleFormat,
  onToggleBackend,
  onToggleModality,
  onToggleCompat,
  onToggleShowUnsupported,
  onCycleInstalled,
  onClearAll,
  degraded,
}: FilterBarProps) {
  const hasActive =
    params.formats.length > 0 ||
    params.backends.length > 0 ||
    params.modalities.length > 0 ||
    params.compat.length > 0 ||
    params.licenses.length > 0 ||
    params.showUnsupported ||
    params.installed !== "any" ||
    params.q.trim().length > 0;

  return (
    <div className={s.filterBar} role="search" aria-label="Model filters">
      <div className={s.filterRow}>
        <label className={s.screenReaderOnly} htmlFor="models-search-q">
          Search models
        </label>
        <input
          id="models-search-q"
          type="text"
          className={s.queryInput}
          placeholder="search neural registry..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {hasActive && (
          <button
            type="button"
            className={s.chip}
            onClick={onClearAll}
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        )}
      </div>

      <div className={s.filterRow}>
        <span className={s.filterLabel}>Format</span>
        {FORMAT_OPTIONS.map((fmt) => {
          const active = params.formats.includes(fmt);
          const cls = active ? `${s.chip} ${s.chipActive}` : s.chip;
          return (
            <button
              key={fmt}
              type="button"
              className={cls}
              aria-pressed={active}
              onClick={() => onToggleFormat(fmt)}
            >
              {fmt.replace("_", " ")}
            </button>
          );
        })}

        <span className={s.separator} aria-hidden="true" />

        <span className={s.filterLabel}>Backend</span>
        {backends.length === 0 && (
          <span
            className={`${s.chip} ${s.chipDisabled}`}
            aria-disabled="true"
          >
            none available
          </span>
        )}
        {backends.map((b) => {
          const active = params.backends.includes(b.backend_id);
          const cls = active ? `${s.chip} ${s.chipActive}` : s.chip;
          const label =
            b.status === "experimental"
              ? `${b.display_name} · experimental`
              : b.display_name;
          return (
            <button
              key={b.backend_id}
              type="button"
              className={cls}
              aria-pressed={active}
              onClick={() => onToggleBackend(b.backend_id)}
              disabled={b.status === "disabled"}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className={s.filterRow}>
        <span className={s.filterLabel}>Modality</span>
        {MODALITY_OPTIONS.map((m) => {
          const active = params.modalities.includes(m);
          const cls = active ? `${s.chip} ${s.chipActive}` : s.chip;
          return (
            <button
              key={m}
              type="button"
              className={cls}
              aria-pressed={active}
              onClick={() => onToggleModality(m)}
            >
              {m}
            </button>
          );
        })}

        <span className={s.separator} aria-hidden="true" />

        <span className={s.filterLabel}>Compat</span>
        {COMPAT_OPTIONS.map(({ value, label }) => {
          const active = params.compat.includes(value);
          const cls = active ? `${s.chip} ${s.chipActive}` : s.chip;
          return (
            <button
              key={value}
              type="button"
              className={cls}
              aria-pressed={active}
              onClick={() => onToggleCompat(value)}
            >
              {label}
            </button>
          );
        })}

        <span className={s.separator} aria-hidden="true" />

        <button
          type="button"
          className={s.toggleSwitch}
          role="switch"
          aria-checked={params.showUnsupported}
          onClick={onToggleShowUnsupported}
        >
          <span
            className={`${s.toggleTrack} ${params.showUnsupported ? s.toggleTrackOn : ""}`}
            aria-hidden="true"
          >
            <span
              className={`${s.toggleThumb} ${params.showUnsupported ? s.toggleThumbOn : ""}`}
            />
          </span>
          Show unsupported
        </button>

        <span className={s.separator} aria-hidden="true" />

        <button
          type="button"
          className={
            params.installed === "installed"
              ? `${s.chip} ${s.chipActive}`
              : params.installed === "not_installed"
                ? `${s.chip} ${s.chipActive}`
                : s.chip
          }
          aria-pressed={params.installed !== "any"}
          aria-label={
            params.installed === "installed"
              ? "Filter: downloaded only"
              : params.installed === "not_installed"
                ? "Filter: not downloaded"
                : "Filter: downloaded (inactive)"
          }
          onClick={onCycleInstalled}
        >
          {params.installed === "installed"
            ? "Downloaded"
            : params.installed === "not_installed"
              ? "Not downloaded"
              : "Downloaded"}
        </button>
      </div>

      {degraded && (
        <div className={s.bannerDegraded} role="status">
          <span className="material-symbols-outlined" aria-hidden="true">
            warning
          </span>
          Backend registry unavailable — format-only filtering in effect.
        </div>
      )}
    </div>
  );
}
