import { Suspense, use, useState } from "react";
import {
  cancelExtensionInstallTask,
  hfSearch,
  installExtensionModel,
  listExtensionModels,
} from "../api/client";
import type { CatalogListDto } from "../api/generated/CatalogListDto";
import type { HfSearchResultDto } from "../api/generated/HfSearchResultDto";
import type { InstalledModelDto } from "../api/generated/InstalledModelDto";
import type { ModelInstallTaskDto } from "../api/generated/ModelInstallTaskDto";

interface SearchState {
  query: string;
  format?: string;
  license?: string;
  page: number;
}

type InstallStatus =
  | { state: "idle" }
  | { state: "running"; taskId: string; repoId: string }
  | { state: "done"; repoId: string; routedBackend: string }
  | { state: "error"; repoId: string; message: string };

function formatBytes(bytes: number | bigint | null | undefined): string {
  if (bytes === null || bytes === undefined) return "--";
  let value = typeof bytes === "bigint" ? Number(bytes) : bytes;
  if (!Number.isFinite(value) || value <= 0) return "--";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(1)} ${units[i]}`;
}

function InstalledSection({ items }: { items: InstalledModelDto[] }) {
  if (items.length === 0) {
    return (
      <section>
        <h3>Installed models</h3>
        <p style={{ opacity: 0.65 }}>No models installed yet. Search below to add one.</p>
      </section>
    );
  }
  return (
    <section>
      <h3>Installed models ({items.length})</h3>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "8px" }}>
        {items.map((m) => (
          <li
            key={m.id}
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "12px",
              borderRadius: "6px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{m.display_name}</strong>
              <span style={{ fontSize: "12px", opacity: 0.7 }}>
                {m.routed_backend ?? "--"} · {m.quantization ?? "--"}
              </span>
            </div>
            <div style={{ fontSize: "12px", opacity: 0.6 }}>
              {m.repo_id ?? "local import"} · {formatBytes(m.size_bytes)} ·{" "}
              {m.state}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

interface HfCardProps {
  result: HfSearchResultDto;
  onInstall: (repoId: string, files: string[]) => void;
  installStatus?: InstallStatus;
}

function HfResultCard({ result, onInstall, installStatus }: HfCardProps) {
  const canLlama = result.backend_compat.llamacpp.compatible;
  const canTrt = result.backend_compat.trt_llm.compatible;
  const installable = canLlama || canTrt;
  const firstGguf = result.files.find((f) => f.path.toLowerCase().endsWith(".gguf"));
  const defaultFiles = firstGguf ? [firstGguf.path] : result.files.slice(0, 1).map((f) => f.path);
  const alreadyInstalled = result.already_installed_ids.length > 0;
  const status = installStatus?.state;

  return (
    <li
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "12px",
        borderRadius: "6px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <strong>{result.repo_id}</strong>
        <span style={{ fontSize: "12px", opacity: 0.7 }}>
          {result.author ?? "--"} · {result.license ?? "no license"}
        </span>
      </div>
      <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "8px" }}>
        {result.downloads_30d ?? 0} downloads · {result.files.length} files ·{" "}
        {result.formats.join(", ") || "unknown format"}
      </div>
      <div style={{ display: "flex", gap: "6px", marginBottom: "8px", flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: "11px",
            padding: "2px 6px",
            borderRadius: "3px",
            background: canLlama ? "rgba(0,200,100,0.2)" : "rgba(255,255,255,0.06)",
          }}
        >
          llama.cpp: {canLlama ? result.backend_compat.llamacpp.signal ?? "yes" : "no"}
        </span>
        <span
          style={{
            fontSize: "11px",
            padding: "2px 6px",
            borderRadius: "3px",
            background: canTrt ? "rgba(0,200,100,0.2)" : "rgba(255,255,255,0.06)",
          }}
        >
          tensorrt-llm: {canTrt ? result.backend_compat.trt_llm.signal ?? "yes" : "no"}
        </span>
      </div>
      <button
        type="button"
        disabled={!installable || alreadyInstalled || status === "running"}
        onClick={() => onInstall(result.repo_id, defaultFiles)}
      >
        {alreadyInstalled
          ? "Already installed"
          : status === "running"
            ? "Installing…"
            : status === "done"
              ? "Installed"
              : installable
                ? `Install ${defaultFiles[0] ?? ""}`
                : "No compatible backend"}
      </button>
      {status === "error" && installStatus?.state === "error" && (
        <div style={{ color: "tomato", fontSize: "12px", marginTop: "4px" }}>
          {installStatus.message}
        </div>
      )}
    </li>
  );
}

interface CatalogBodyProps {
  promise: Promise<CatalogListDto>;
}

function CatalogBody({ promise }: CatalogBodyProps) {
  const data = use(promise);
  return <InstalledSection items={data.installed} />;
}

interface SearchResultsProps {
  promise: Promise<{ results: HfSearchResultDto[]; has_next: boolean }>;
  onInstall: (repoId: string, files: string[]) => void;
  installs: Record<string, InstallStatus>;
}

function SearchResultsBody({ promise, onInstall, installs }: SearchResultsProps) {
  const data = use(promise);
  if (data.results.length === 0) {
    return <p style={{ opacity: 0.65 }}>No results.</p>;
  }
  return (
    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "8px" }}>
      {data.results.map((r) => (
        <HfResultCard
          key={r.repo_id}
          result={r}
          onInstall={onInstall}
          installStatus={installs[r.repo_id]}
        />
      ))}
    </ul>
  );
}

interface ModelsPanelProps {
  /** Extension id declaring the huggingface capability. e.g. "local-llm". */
  extensionId: string;
}

export function ModelsPanel({ extensionId }: ModelsPanelProps) {
  const [catalogKey, setCatalogKey] = useState(0);
  const [search, setSearch] = useState<SearchState>({ query: "", page: 1 });
  const [searchPromise, setSearchPromise] = useState<
    Promise<{ results: HfSearchResultDto[]; has_next: boolean }> | null
  >(null);
  const [installs, setInstalls] = useState<Record<string, InstallStatus>>({});

  const catalogPromise = useReferencedPromise(catalogKey, () =>
    listExtensionModels(extensionId),
  );

  const runSearch = (query: string) => {
    const q = query.trim();
    if (!q) {
      setSearchPromise(null);
      return;
    }
    setSearch((s) => ({ ...s, query: q, page: 1 }));
    setSearchPromise(hfSearch({ q, limit: 20, page: 1 }));
  };

  const handleInstall = async (repoId: string, files: string[]) => {
    const task: ModelInstallTaskDto | null = await safeInstall(repoId, files);
    if (!task) return;
    setInstalls((prev) => ({
      ...prev,
      [repoId]: { state: "running", taskId: task.task_id, repoId },
    }));
    // Intentional: we await install synchronously on the server in this build.
    // On success, refresh the installed list.
    setInstalls((prev) => ({
      ...prev,
      [repoId]: {
        state: "done",
        repoId,
        routedBackend: task.routed_backend ?? "unknown",
      },
    }));
    setCatalogKey((k) => k + 1);
  };

  const safeInstall = async (repoId: string, files: string[]) => {
    try {
      return await installExtensionModel(extensionId, {
        source: "huggingface",
        repo_id: repoId,
        revision: null,
        files,
        display_name: null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "install failed";
      setInstalls((prev) => ({
        ...prev,
        [repoId]: { state: "error", repoId, message },
      }));
      return null;
    }
  };

  const handleCancel = async (repoId: string) => {
    const status = installs[repoId];
    if (status?.state !== "running") return;
    try {
      await cancelExtensionInstallTask(extensionId, status.taskId);
    } catch {
      // swallow — server may have already completed/failed
    }
    setInstalls((prev) => ({ ...prev, [repoId]: { state: "idle" } }));
  };
  void handleCancel;

  return (
    <main style={{ padding: "24px", display: "grid", gap: "24px" }}>
      <header>
        <h2>Models</h2>
        <p style={{ opacity: 0.65 }}>
          Installed models and Hugging Face search. Downloads route automatically: GGUF →
          llama.cpp, TensorRT-LLM engines → tensorrt-llm.
        </p>
      </header>

      <Suspense fallback={<div>Loading catalog…</div>}>
        <CatalogBody promise={catalogPromise} />
      </Suspense>

      <section>
        <h3>Hugging Face search</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            runSearch(String(formData.get("q") ?? ""));
          }}
          style={{ display: "flex", gap: "8px", marginBottom: "12px" }}
        >
          <input
            type="text"
            name="q"
            defaultValue={search.query}
            placeholder="Search Hugging Face (e.g. qwen2.5 gguf)"
            style={{ flex: 1, padding: "6px 8px" }}
          />
          <button type="submit">Search</button>
        </form>
        {searchPromise && (
          <Suspense fallback={<div>Searching Hugging Face…</div>}>
            <SearchResultsBody
              promise={searchPromise}
              onInstall={handleInstall}
              installs={installs}
            />
          </Suspense>
        )}
      </section>
    </main>
  );
}

function useReferencedPromise<T>(key: number, factory: () => Promise<T>): Promise<T> {
  const [state, setState] = useState(() => ({ key, promise: factory() }));
  if (state.key !== key) {
    const fresh = factory();
    setState({ key, promise: fresh });
    return fresh;
  }
  return state.promise;
}
