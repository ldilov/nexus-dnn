import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ContractError, hfSearch, installHostModel } from "../api/client";
import type { HfSearchResultDto } from "../api/generated/HfSearchResultDto";
import * as s from "./hf_search_panel.css";

const DEBOUNCE_MS = 300;
const PAGE_SIZE = 20;

type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; results: HfSearchResultDto[]; query: string }
  | { status: "error"; message: string };

function formatBytes(n: number | bigint | null | undefined): string {
  if (n === null || n === undefined) return "—";
  let value = typeof n === "bigint" ? Number(n) : n;
  if (!Number.isFinite(value) || value <= 0) return "—";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[i]}`;
}

function totalBytes(result: HfSearchResultDto): number {
  return result.files.reduce((acc, f) => {
    const v = typeof f.size_bytes === "bigint" ? Number(f.size_bytes) : f.size_bytes ?? 0;
    return acc + (Number.isFinite(v as number) ? (v as number) : 0);
  }, 0);
}

interface Props {
  onInstallRequested?: (repoId: string, files: string[]) => void;
}

export function HfSearchPanel({ onInstallRequested }: Props) {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState<string>("");
  const [license, setLicense] = useState<string>("");
  const [loadState, setLoadState] = useState<LoadState>({ status: "idle" });

  const debouncedQuery = useDebounced(query, DEBOUNCE_MS);

  useEffect(() => {
    const q = debouncedQuery.trim();
    if (q.length === 0) {
      setLoadState({ status: "idle" });
      return;
    }
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setLoadState({
        status: "error",
        message: "Hugging Face unreachable — check your network and try again.",
      });
      return;
    }
    let cancelled = false;
    setLoadState({ status: "loading" });
    hfSearch({
      q,
      format: format || undefined,
      license: license || undefined,
      limit: PAGE_SIZE,
      page: 1,
    })
      .then((page) => {
        if (cancelled) return;
        setLoadState({ status: "ready", results: page.results, query: q });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof ContractError && err.status === 429) {
          const payload = err.payload as { error?: { message?: string } } | undefined;
          const retry = payload?.error?.message ?? err.message;
          toast.error("Hugging Face rate-limited", { description: retry });
          setLoadState((prev) =>
            prev.status === "ready" ? prev : { status: "error", message: retry },
          );
          return;
        }
        const isNetworkError =
          err instanceof TypeError || /NetworkError|Failed to fetch/i.test(String(err));
        const message = isNetworkError
          ? "Hugging Face unreachable — check your network and try again."
          : err instanceof Error
            ? err.message
            : "Hugging Face search failed";
        setLoadState({ status: "error", message });
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, format, license]);

  const filteredResults = useMemo(() => {
    if (loadState.status !== "ready") return [];
    if (!format) return loadState.results;
    const wanted = format.toLowerCase();
    return loadState.results.filter((r) =>
      r.formats.some((f) => f.toLowerCase() === wanted),
    );
  }, [loadState, format]);

  const handleInstall = async (repoId: string, files: string[]) => {
    if (onInstallRequested) {
      onInstallRequested(repoId, files);
      return;
    }
    try {
      const task = await installHostModel({
        source: "huggingface",
        repo_id: repoId,
        files,
      });
      if (task.already_installed) {
        toast.success(`${repoId} already installed`, {
          description: `Shared across extensions — no new download (install_id ${task.install_id.slice(0, 12)}).`,
        });
      } else {
        toast.success(`${repoId} installed`, {
          description: `${task.routed_backend ?? "host"} · ${task.install_id.slice(0, 12)}`,
        });
      }
    } catch (err) {
      if (err instanceof ContractError && err.status === 501) {
        toast.info(`Host-scope install pipeline is landing in a follow-up.`, {
          description: err.message,
        });
        return;
      }
      if (err instanceof ContractError && err.status === 403) {
        const code = (err.payload as { error?: { code?: string } })?.error?.code;
        if (code === "model_private") {
          toast.error("This model is private to another extension.");
          return;
        }
      }
      if (err instanceof ContractError && err.status === 429) {
        toast.error("Hugging Face rate-limited", { description: err.message });
        return;
      }
      const message = err instanceof Error ? err.message : "install failed";
      toast.error(`Install failed: ${message}`);
    }
  };

  return (
    <section className={s.panel} aria-labelledby="hf-search-heading">
      <div className={s.panelHeader}>
        <span className={s.eyebrow}>Hugging Face</span>
        <h2 className={s.title} id="hf-search-heading">
          Search models
        </h2>
        <p className={s.subtitle}>
          Find GGUF and TensorRT-LLM repos. Installed models are shared across
          every extension that declares a compatible dependency — no more
          per-extension downloads.
        </p>
      </div>

      <div className={s.controls}>
        <label className={s.searchField}>
          <span className={s.label}>Query</span>
          <input
            className={s.input}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. llama-3-8b"
            data-testid="hf-search-input"
          />
        </label>
        <label className={s.filterField}>
          <span className={s.label}>Format</span>
          <select
            className={s.select}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="">any</option>
            <option value="gguf">GGUF</option>
            <option value="safetensors">Safetensors</option>
            <option value="pytorch">PyTorch</option>
          </select>
        </label>
        <label className={s.filterField}>
          <span className={s.label}>License</span>
          <select
            className={s.select}
            value={license}
            onChange={(e) => setLicense(e.target.value)}
          >
            <option value="">any</option>
            <option value="apache-2.0">Apache-2.0</option>
            <option value="mit">MIT</option>
            <option value="llama3">LLAMA-3</option>
            <option value="llama2">LLAMA-2</option>
          </select>
        </label>
      </div>

      {loadState.status === "loading" && (
        <div className={s.emptyState}>Searching Hugging Face…</div>
      )}

      {loadState.status === "error" && (
        <div className={s.errorBanner} role="alert">
          {loadState.message}
        </div>
      )}

      {loadState.status === "idle" && (
        <div className={s.emptyState}>Type a query to search.</div>
      )}

      {loadState.status === "ready" && filteredResults.length === 0 && (
        <div className={s.emptyState}>
          No results for <strong>{loadState.query}</strong>
          {format ? ` (format: ${format})` : ""}.
        </div>
      )}

      {loadState.status === "ready" && filteredResults.length > 0 && (
        <div className={s.resultsGrid} data-testid="hf-results-grid">
          {filteredResults.map((r) => (
            <HfResultRow key={r.repo_id} result={r} onInstall={handleInstall} />
          ))}
        </div>
      )}

      <div className={s.followupNote}>
        <span className={s.followupLabel}>How this works</span>
        <span>
          Installs land in the host-managed model store and are shared across
          every extension that declares a compatible dependency. Dedup is
          SHA256-rooted — installing a file that's already present returns
          the existing install without a second download. Async progress
          streaming for long installs lands in a follow-up slice.
        </span>
      </div>
    </section>
  );
}

interface RowProps {
  result: HfSearchResultDto;
  onInstall: (repoId: string, files: string[]) => void;
}

function HfResultRow({ result, onInstall }: RowProps) {
  const llamaCompat = result.backend_compat.llamacpp.compatible;
  const trtCompat = result.backend_compat.trt_llm.compatible;
  const installable = llamaCompat || trtCompat;
  const alreadyInstalled = result.already_installed_ids.length > 0;
  const firstGguf = result.files.find((f) =>
    f.path.toLowerCase().endsWith(".gguf"),
  );
  const defaultFiles = firstGguf
    ? [firstGguf.path]
    : result.files.slice(0, 1).map((f) => f.path);

  const downloads =
    typeof result.downloads_30d === "bigint"
      ? Number(result.downloads_30d)
      : result.downloads_30d ?? 0;

  return (
    <article className={s.resultCard}>
      <div className={s.cardHead}>
        <div className={s.repoId}>{result.repo_id}</div>
        {alreadyInstalled && (
          <span className={s.chip.success} title="Already present in host models">
            Installed
          </span>
        )}
      </div>
      <div className={s.meta}>
        <span>{result.author ?? "unknown"}</span>
        <span>·</span>
        <span>{result.license ?? "no license"}</span>
        <span>·</span>
        <span>{(downloads ?? 0).toLocaleString()} 30d downloads</span>
        <span>·</span>
        <span>{result.files.length} files</span>
        <span>·</span>
        <span>{formatBytes(totalBytes(result))}</span>
      </div>
      <div className={s.chipRow}>
        <span className={llamaCompat ? s.chip.accent : s.chip.mute}>
          llama.cpp
        </span>
        <span className={trtCompat ? s.chip.accent : s.chip.mute}>
          tensorrt-llm
        </span>
        {result.formats.map((f) => (
          <span key={f} className={s.chip.neutral}>
            {f}
          </span>
        ))}
      </div>
      <div className={s.installRow}>
        <span className={s.meta} style={{ margin: 0 }}>
          {defaultFiles[0] ?? "—"}
        </span>
        <button
          type="button"
          className={s.installButton}
          disabled={!installable || alreadyInstalled}
          onClick={() => onInstall(result.repo_id, defaultFiles)}
          data-testid={`hf-install-${result.repo_id}`}
        >
          {alreadyInstalled
            ? "Installed"
            : installable
              ? "Install"
              : "Incompatible"}
        </button>
      </div>
    </article>
  );
}

function useDebounced<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(handle);
  }, [value, delayMs]);
  return debounced;
}
