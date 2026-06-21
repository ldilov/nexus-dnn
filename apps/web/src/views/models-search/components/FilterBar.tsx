import { useState } from "react";
import type {
  ActiveUpload,
  ParsedSearchParams,
} from "../../../services/model_store";
import { formatSize } from "./DownloadProgress";
import * as s from "../models_search.css";

interface FilterBarProps {
  query: string;
  params: ParsedSearchParams;
  onQueryChange: (q: string) => void;
  onSourceChange: (source: ParsedSearchParams["source"]) => void;
  onCycleInstalled: () => void;
  onClearAll: () => void;
  onResolveUrl: (url: string) => void;
  onUpload: (file: File) => void;
  onCancelUpload: (id: string) => void;
  resolving: boolean;
  uploads: Record<string, ActiveUpload>;
  degraded: boolean;
}

function UploadRow({
  upload,
  onCancel,
}: {
  upload: ActiveUpload;
  onCancel: (id: string) => void;
}) {
  const isError = upload.status === "error";
  const determinate = upload.pct !== null;
  const counter =
    upload.total && upload.total > 0
      ? `${formatSize(upload.loaded)} / ${formatSize(upload.total)}${
          upload.pct !== null ? ` · ${upload.pct}%` : ""
        }`
      : upload.loaded > 0
        ? `${formatSize(upload.loaded)} uploaded`
        : "starting…";
  const ariaLabel = isError
    ? `Upload of ${upload.filename} failed`
    : determinate
      ? `Uploading ${upload.filename}, ${upload.pct} percent`
      : `Uploading ${upload.filename}, size unknown`;

  return (
    <div className={s.uploadRow} role="status" aria-label={ariaLabel}>
      <span className={s.uploadName} title={upload.filename}>
        {upload.filename}
      </span>
      {isError ? (
        <span className={s.uploadError}>{upload.error ?? "upload failed"}</span>
      ) : (
        <>
          <div
            className={s.uploadBar}
            role="progressbar"
            aria-valuemin={determinate ? 0 : undefined}
            aria-valuemax={determinate ? 100 : undefined}
            aria-valuenow={determinate ? (upload.pct ?? undefined) : undefined}
          >
            <div
              className={determinate ? s.uploadFill : s.uploadFillIndeterminate}
              style={determinate ? { width: `${upload.pct}%` } : undefined}
            />
          </div>
          <span className={s.uploadCounter}>{counter}</span>
        </>
      )}
      <button
        type="button"
        className={s.chip}
        aria-label={
          isError
            ? `Dismiss failed upload ${upload.filename}`
            : `Cancel upload ${upload.filename}`
        }
        onClick={() => onCancel(upload.id)}
      >
        {isError ? "Dismiss" : "Cancel"}
      </button>
    </div>
  );
}

export function FilterBar({
  query,
  params,
  onQueryChange,
  onSourceChange,
  onCycleInstalled,
  onClearAll,
  onResolveUrl,
  onUpload,
  onCancelUpload,
  resolving,
  uploads,
  degraded,
}: FilterBarProps) {
  const [url, setUrl] = useState("");
  const showClear = params.installed !== "any" || params.q.trim().length > 0;
  const isFromUrl = params.source === "from_url";
  const uploadList = Object.values(uploads);
  const anyUploading = uploadList.some((u) => u.status === "uploading");
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
            <label className={`${s.chip} ${s.chipActive}`}>
              {anyUploading ? "Uploading…" : "Upload file"}
              <input
                type="file"
                accept=".safetensors,.gguf,.ckpt,.pt,.pth,.bin"
                className={s.screenReaderOnly}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUpload(file);
                  e.target.value = "";
                }}
              />
            </label>
          </>
        )}
      </div>
      {uploadList.length > 0 && (
        <div className={s.uploadList} aria-label="Active uploads">
          {uploadList.map((upload) => (
            <UploadRow
              key={upload.id}
              upload={upload}
              onCancel={onCancelUpload}
            />
          ))}
        </div>
      )}
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
