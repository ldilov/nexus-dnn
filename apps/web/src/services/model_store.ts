import { apiFetch } from "./api_client";

/**
 * Sole I/O boundary for the Models Search screen (Principle XII.4).
 *
 * All fetches go through `apiFetch` which already normalises errors
 * into `Response`-throwing rejections that route loaders surface via
 * `errorElement`. No `fetch`, `useSWR`, or `EventSource` calls may
 * appear outside this file for the models-search feature.
 */

// ---------------------------------------------------------------------------
// Types (mirror the Rust DTOs in `crates/nexus-api/src/dto/model_store.rs`)

export type Format =
  | "gguf"
  | "ggml"
  | "safetensors"
  | "pytorch_bin"
  | "pth"
  | "unknown";

export type Precision =
  | "fp32"
  | "fp16"
  | "bf16"
  | "int8"
  | "quantized"
  | "unknown";

export type PrecisionSource = "explicit" | "inferred" | "unknown";

export type Modality =
  | "llm"
  | "image"
  | "video"
  | "audio"
  | "upscaler"
  | "embedding"
  | "lora"
  | "other";

export type DependencyRole =
  | "primary"
  | "vae"
  | "text_encoder"
  | "tokenizer"
  | "controlnet"
  | "lora"
  | "scheduler"
  | "other";

export type Requirement = "required" | "optional";

export type VariantType = "quantization" | "precision" | "checkpoint" | "other";

export type CompatibilityStatus =
  | "compatible"
  | "compatible_with_requirements"
  | "downloadable_but_not_runnable"
  | "unsupported"
  | "unknown";

export type DownloadState =
  | "not_downloaded"
  | "queued"
  | "downloading"
  | "paused"
  | "downloaded"
  | "failed"
  | "incompatible"
  | "auth_required";

export type BackendStatus = "enabled" | "experimental" | "disabled";

export type SourceProvider = "huggingface" | "civitai" | "direct_url" | "other";

export interface BackendCapability {
  backend_id: string;
  display_name: string;
  supported_formats: Format[];
  supports_quantized_variants: boolean;
  supports_multi_artifact_models: boolean;
  status: BackendStatus;
}

export interface ModelRepository {
  repo_id: string;
  source_provider: SourceProvider;
  owner: string;
  name: string;
  description: string | null;
  license: string | null;
  tags: string[];
  downloads: number | null;
  likes: number | null;
  last_updated: string | null;
  modality: Modality;
}

export interface Artifact {
  artifact_id: string;
  role: DependencyRole;
  format: Format;
  precision: Precision;
  precision_source: PrecisionSource;
  size_bytes: number | null;
  filename: string;
  download_url: string;
  sha256: string | null;
  install_state: DownloadState;
}

export interface Variant {
  variant_id: string;
  variant_type: VariantType;
  label: string;
  artifact_ids: string[];
  is_default: boolean;
  install_state: DownloadState;
}

export interface Dependency {
  role: DependencyRole;
  requirement: Requirement;
  target_artifact_id: string | null;
  external_ref: {
    source_provider: SourceProvider;
    repo_id: string;
    filename: string;
  } | null;
}

export interface ModelFamily {
  family_id: string;
  repository: ModelRepository;
  artifacts: Artifact[];
  variants: Variant[];
  dependencies: Dependency[];
  compat: CompatibilityStatus;
  warnings: string[];
}

export interface SearchFacets {
  formats: Record<string, number>;
  licenses: Record<string, number>;
  modalities: Record<string, number>;
}

export interface SearchPage {
  page: number;
  page_size: number;
  total_results: number | null;
  families: ModelFamily[];
  facets: SearchFacets;
}

export interface DownloadJobTarget {
  artifact_id: string;
  filename: string;
  role: DependencyRole;
  expected_bytes: number | null;
  downloaded_bytes: number;
  sha256: string | null;
  state: "queued" | "downloading" | "downloaded" | "failed" | "skipped";
}

export interface DownloadJob {
  job_id: string;
  family_id: string;
  requested_kind: "primary" | "variant" | "bundle";
  include_dependencies: boolean;
  state: DownloadState;
  targets: DownloadJobTarget[];
  warnings: string[];
  progress_bytes: number;
  total_bytes: number | null;
  error_reason: string | null;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
}

// ---------------------------------------------------------------------------
// URL / query handling

export interface ParsedSearchParams {
  q: string;
  repo: string;
  formats: Format[];
  backends: string[];
  modalities: Modality[];
  licenses: string[];
  compat: CompatibilityStatus[];
  installed: "any" | "installed" | "not_installed";
  showUnsupported: boolean;
  sort:
    | "relevance"
    | "most_downloaded"
    | "trending"
    | "recently_updated"
    | "alphabetical"
    | "compatible_first";
  page: number;
  pageSize: number;
  view: "grid" | "list";
  source: "huggingface" | "from_url";
}

export const DEFAULT_SEARCH_PARAMS: ParsedSearchParams = {
  q: "",
  repo: "",
  formats: [],
  backends: [],
  modalities: [],
  licenses: [],
  compat: [],
  installed: "any",
  showUnsupported: false,
  sort: "relevance",
  page: 1,
  pageSize: 30,
  view: "grid",
  source: "huggingface",
};

const VALID_FORMATS: ReadonlySet<Format> = new Set([
  "gguf",
  "ggml",
  "safetensors",
  "pytorch_bin",
  "pth",
  "unknown",
]);

const VALID_MODALITIES: ReadonlySet<Modality> = new Set([
  "llm",
  "image",
  "video",
  "audio",
  "upscaler",
  "embedding",
  "lora",
  "other",
]);

const VALID_COMPAT: ReadonlySet<CompatibilityStatus> = new Set([
  "compatible",
  "compatible_with_requirements",
  "downloadable_but_not_runnable",
  "unsupported",
  "unknown",
]);

const VALID_SORTS = [
  "relevance",
  "most_downloaded",
  "trending",
  "recently_updated",
  "alphabetical",
  "compatible_first",
] as const;

function parseEnumList<T extends string>(
  values: string[],
  valid: ReadonlySet<T>,
): T[] {
  return values.filter((v): v is T => (valid as ReadonlySet<string>).has(v));
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function parseSearchParams(qs: URLSearchParams): ParsedSearchParams {
  const sortRaw = qs.get("sort") ?? "relevance";
  const sort = (VALID_SORTS as readonly string[]).includes(sortRaw)
    ? (sortRaw as ParsedSearchParams["sort"])
    : "relevance";

  const installedRaw = qs.get("installed") ?? "any";
  const installed: ParsedSearchParams["installed"] =
    installedRaw === "installed" || installedRaw === "not_installed"
      ? installedRaw
      : "any";

  const viewRaw = qs.get("view") ?? "grid";
  const view: ParsedSearchParams["view"] =
    viewRaw === "list" ? "list" : "grid";

  const pageRaw = Number.parseInt(qs.get("page") ?? "1", 10);
  const pageSizeRaw = Number.parseInt(qs.get("page_size") ?? "30", 10);

  const sourceRaw = qs.get("source") ?? "huggingface";
  const source: ParsedSearchParams["source"] =
    sourceRaw === "from_url" ? "from_url" : "huggingface";

  return {
    q: qs.get("q") ?? "",
    repo: qs.get("repo") ?? "",
    formats: parseEnumList<Format>(qs.getAll("format"), VALID_FORMATS),
    backends: qs.getAll("backend"),
    modalities: parseEnumList<Modality>(qs.getAll("modality"), VALID_MODALITIES),
    licenses: qs.getAll("license"),
    compat: parseEnumList<CompatibilityStatus>(
      qs.getAll("compat"),
      VALID_COMPAT,
    ),
    installed,
    showUnsupported: qs.get("show_unsupported") === "true",
    sort,
    page: Number.isFinite(pageRaw) && pageRaw >= 1 ? pageRaw : 1,
    pageSize: clamp(
      Number.isFinite(pageSizeRaw) ? pageSizeRaw : 30,
      10,
      50,
    ),
    view,
    source,
  };
}

export function serializeSearchParams(p: ParsedSearchParams): URLSearchParams {
  const qs = new URLSearchParams();
  if (p.q) qs.set("q", p.q);
  if (p.repo) qs.set("repo", p.repo);
  for (const f of p.formats) qs.append("format", f);
  for (const b of p.backends) qs.append("backend", b);
  for (const m of p.modalities) qs.append("modality", m);
  for (const l of p.licenses) qs.append("license", l);
  for (const c of p.compat) qs.append("compat", c);
  if (p.installed !== "any") qs.set("installed", p.installed);
  if (p.showUnsupported) qs.set("show_unsupported", "true");
  if (p.sort !== "relevance") qs.set("sort", p.sort);
  if (p.page !== 1) qs.set("page", String(p.page));
  if (p.pageSize !== 30) qs.set("page_size", String(p.pageSize));
  if (p.view !== "grid") qs.set("view", p.view);
  if (p.source !== "huggingface") qs.set("source", p.source);
  return qs;
}

// ---------------------------------------------------------------------------
// Fetchers

export function fetchBackends(signal?: AbortSignal): Promise<{
  backends: BackendCapability[];
}> {
  return apiFetch("/model-store/backends", { signal });
}

export function fetchSearch(
  params: ParsedSearchParams,
  signal?: AbortSignal,
): Promise<SearchPage> {
  const qs = serializeSearchParams(params);
  return apiFetch(`/model-store/search?${qs}`, { signal });
}

export function fetchFamilyDetail(
  familyId: string,
  signal?: AbortSignal,
): Promise<ModelFamily> {
  return apiFetch(
    `/model-store/models/${encodeURIComponent(familyId)}`,
    { signal },
  );
}

export interface InstalledArtifact {
  artifact_id: string;
  family_id: string;
  variant_id: string | null;
  format: string;
  role: string;
  filename: string;
  size_bytes: number | null;
  source_repo: string;
  source_revision: string | null;
  installed_at: string;
}

export interface InstalledIndex {
  family_ids: string[];
  installed: InstalledArtifact[];
  truncated: boolean;
}

export function fetchInstalled(signal?: AbortSignal): Promise<InstalledIndex> {
  return apiFetch("/model-store/installed", { signal });
}

export interface DeleteInstalledResult {
  artifact_id: string;
  job_id: string;
  freed_bytes: number;
}

/**
 * Delete a downloaded model by one of its installed artifact ids. The host
 * resolves the artifact to its download job and removes the files + rows.
 * Rejects with a 409 when an extension still references the model.
 */
export function deleteInstalled(
  artifactId: string,
  signal?: AbortSignal,
): Promise<DeleteInstalledResult> {
  return apiFetch(`/model-store/installed/${encodeURIComponent(artifactId)}`, {
    method: "DELETE",
    signal,
  });
}

export interface UploadResult {
  artifact_id: string;
  family_id: string;
  filename: string;
  size_bytes: number;
  install_path: string;
}

/**
 * Import a local weight file directly into the model store. Streams the file as
 * multipart/form-data; the browser sets the boundary content-type, so no header
 * is passed. Progress is not reported (fetch can't observe upload bytes) — the
 * caller shows a spinner.
 */
export function uploadModel(file: File, signal?: AbortSignal): Promise<UploadResult> {
  const form = new FormData();
  form.append("file", file, file.name);
  return apiFetch("/model-store/upload", { method: "POST", body: form, signal });
}

export interface CreateDownloadBody {
  family_id: string;
  target:
    | { kind: "primary"; artifact_id: string }
    | { kind: "variant"; variant_id: string }
    | { kind: "bundle" };
  include_dependencies: boolean;
}

export function createDownload(
  body: CreateDownloadBody,
  signal?: AbortSignal,
): Promise<DownloadJob> {
  return apiFetch("/model-store/downloads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
}

export function fetchDownloadStatus(
  jobId: string,
  signal?: AbortSignal,
): Promise<DownloadJob> {
  return apiFetch(
    `/model-store/downloads/${encodeURIComponent(jobId)}`,
    { signal },
  );
}

export function pauseDownload(
  jobId: string,
  signal?: AbortSignal,
): Promise<DownloadJob> {
  return apiFetch(
    `/model-store/downloads/${encodeURIComponent(jobId)}/pause`,
    { method: "POST", signal },
  );
}

export function resumeDownload(
  jobId: string,
  signal?: AbortSignal,
): Promise<DownloadJob> {
  return apiFetch(
    `/model-store/downloads/${encodeURIComponent(jobId)}/resume`,
    { method: "POST", signal },
  );
}

export function isTerminalState(state: DownloadState | undefined): boolean {
  return (
    state === "downloaded" ||
    state === "failed" ||
    state === "incompatible"
  );
}

export interface RevalidateReport {
  checked: number;
  pruned: number;
}

/**
 * Sweep every install-map row and prune those whose on-disk file vanished
 * (spec 054 G2). Host-owned, generic — keyed by no extension id. The host
 * returns a bare `{ checked, pruned }` object (not an envelope), so this
 * read uses `expect: "raw"`.
 */
export function revalidateHostModels(
  signal?: AbortSignal,
): Promise<RevalidateReport> {
  return apiFetch("/host/models/revalidate", {
    method: "POST",
    expect: "raw",
    signal,
  });
}

export function resolveUrl(
  url: string,
  signal?: AbortSignal,
): Promise<ModelFamily> {
  return apiFetch("/model-store/resolve-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
    signal,
  });
}

export interface DirectDownloadTarget {
  source_provider: string;
  source_repo: string;
  artifact_id: string;
  filename: string;
  role: DependencyRole;
  download_url: string;
  sha256: string | null;
  size_bytes: number | null;
}

export function createDirectDownload(
  familyId: string,
  direct: DirectDownloadTarget,
  signal?: AbortSignal,
): Promise<DownloadJob> {
  return apiFetch("/model-store/downloads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ family_id: familyId, direct }),
    signal,
  });
}

export function directTargetFromFamily(
  family: ModelFamily,
): DirectDownloadTarget | null {
  const primary =
    family.artifacts.find((a) => a.role === "primary") ?? family.artifacts[0];
  if (!primary) return null;
  return {
    source_provider: family.repository.source_provider,
    source_repo: family.repository.repo_id,
    artifact_id: primary.artifact_id,
    filename: primary.filename,
    role: primary.role,
    download_url: primary.download_url,
    sha256: primary.sha256,
    size_bytes: primary.size_bytes,
  };
}

export interface TokenStatus {
  configured: boolean;
}

export function fetchCivitaiTokenStatus(
  signal?: AbortSignal,
): Promise<TokenStatus> {
  return apiFetch("/model-store/settings/civitai-token", { signal });
}

export function setCivitaiToken(
  token: string,
  signal?: AbortSignal,
): Promise<TokenStatus> {
  return apiFetch("/model-store/settings/civitai-token", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
    signal,
  });
}
