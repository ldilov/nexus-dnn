import { useState } from "react";
import type { ParsedSearchParams } from "../../../services/model_store";
import * as s from "../models_search.css";

interface FilterBarProps {
  query: string;
  params: ParsedSearchParams;
  onQueryChange: (q: string) => void;
  onSourceChange: (source: ParsedSearchParams["source"]) => void;
  onCycleInstalled: () => void;
  onClearAll: () => void;
  onResolveUrl: (url: string) => void;
  resolving: boolean;
  degraded: boolean;
}

export function FilterBar({
  query,
  params,
  onQueryChange,
  onSourceChange,
  onCycleInstalled,
  onClearAll,
  onResolveUrl,
  resolving,
  degraded,
}: FilterBarProps) {
  const [url, setUrl] = useState("");
  const showClear = params.installed !== "any" || params.q.trim().length > 0;
  const isFromUrl = params.source === "from_url";
  return (
    <div className={s.filterBar} role="search" aria-label="Model filters">
      <div className={s.filterRow}>
        <label className={s.screenReaderOnly} htmlFor="models-source">
          Source
        </label>
        <select
          id="models-source"
          aria-label="Source"
          className={s.sourceSelect}
          value={params.source}
          onChange={(e) => {
            setUrl("");
            onSourceChange(e.target.value as ParsedSearchParams["source"]);
          }}
        >
          <option value="huggingface">Hugging Face</option>
          <option value="from_url">From URL</option>
        </select>
        {!isFromUrl && (
          <>
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
            <button
              type="button"
              className={
                params.installed !== "any"
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
              {params.installed === "not_installed"
                ? "Not downloaded"
                : "Downloaded"}
            </button>
            {showClear && (
              <button
                type="button"
                className={s.chip}
                onClick={onClearAll}
                aria-label="Clear all filters"
              >
                Clear all
              </button>
            )}
          </>
        )}
        {isFromUrl && (
          <>
            <label className={s.screenReaderOnly} htmlFor="models-url-input">
              Model URL
            </label>
            <input
              id="models-url-input"
              type="text"
              className={s.queryInput}
              placeholder="paste a Hugging Face file URL, a civitai.com link, or a direct .gguf/.safetensors URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && url.trim()) {
                  onResolveUrl(url.trim());
                }
              }}
            />
            <button
              type="button"
              className={
                resolving || url.trim() === ""
                  ? s.chip
                  : `${s.chip} ${s.chipActive}`
              }
              disabled={resolving || url.trim() === ""}
              onClick={() => {
                if (url.trim()) onResolveUrl(url.trim());
              }}
            >
              {resolving ? "Resolving…" : "Resolve"}
            </button>
          </>
        )}
      </div>
      {!isFromUrl && degraded && (
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
