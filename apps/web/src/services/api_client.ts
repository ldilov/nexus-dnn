import type { ApiEnvelope } from "../api/generated/ApiEnvelope";
import type { ApiErrorPayloadDto } from "../api/generated/ApiErrorPayloadDto";
import type { ArtifactDto } from "../api/generated/ArtifactDto";
import type { ArtifactLineageDto } from "../api/generated/ArtifactLineageDto";
import type { CreateRunResponseDto } from "../api/generated/CreateRunResponseDto";
import type { EnableExtensionResponseDto } from "../api/generated/EnableExtensionResponseDto";
import type { ExtensionDto } from "../api/generated/ExtensionDto";
import type { ExtensionRevealDto } from "../api/generated/ExtensionRevealDto";
import type { HealthDto } from "../api/generated/HealthDto";
import type { LayoutSummaryDto } from "../api/generated/LayoutSummaryDto";
import type { ListResponseDto } from "../api/generated/ListResponseDto";
import type { OperatorDto } from "../api/generated/OperatorDto";
import type { RecipeDto } from "../api/generated/RecipeDto";
import type { RefreshReportDto } from "../api/generated/RefreshReportDto";
import type { RunDetailDto } from "../api/generated/RunDetailDto";
import type { RunDto } from "../api/generated/RunDto";
import type { RuntimeMetricsDto } from "../api/generated/RuntimeMetricsDto";
import type { SystemInfoDto } from "../api/generated/SystemInfoDto";
import type { ToolDto } from "../api/generated/ToolDto";
import type { UIContributionDto } from "../api/generated/UIContributionDto";
import type { WorkflowDto } from "../api/generated/WorkflowDto";
import type { WorkflowUpdatePayloadDto } from "../api/generated/WorkflowUpdatePayloadDto";
import type { CanvasStateDto } from "../api/generated/CanvasStateDto";

const BASE_URL = "/api/v1";

export type ContractViolation = {
  endpoint: string;
  method: string;
  status: number | null;
  reason: string;
  payloadPreview: string;
  at: string;
};

type ViolationListener = (violation: ContractViolation) => void;
const listeners = new Set<ViolationListener>();
const recentViolations: ContractViolation[] = [];

export const contractMonitor = {
  subscribe(listener: ViolationListener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  recent(): readonly ContractViolation[] {
    return recentViolations;
  },
  record(violation: ContractViolation): void {
    recentViolations.push(violation);
    if (recentViolations.length > 100) recentViolations.shift();
    console.warn(`[api] contract violation on ${violation.method} ${violation.endpoint}`, violation);
    for (const l of listeners) l(violation);
  },
};

export class ContractError extends Error {
  public readonly endpoint: string;
  public readonly method: string;
  public readonly status: number | null;
  public readonly payload: unknown;

  constructor(
    message: string,
    details: { endpoint: string; method: string; status: number | null; payload?: unknown },
  ) {
    super(message);
    this.name = "ContractError";
    this.endpoint = details.endpoint;
    this.method = details.method;
    this.status = details.status;
    this.payload = details.payload;
  }
}

type RequestOptions = RequestInit & {
  expect?: "envelope" | "raw";
};

function previewPayload(body: unknown): string {
  try {
    const s = typeof body === "string" ? body : JSON.stringify(body);
    return s.length > 400 ? `${s.slice(0, 400)}…` : s;
  } catch {
    return String(body);
  }
}

function isEnvelope(body: unknown): body is ApiEnvelope<unknown> {
  return body !== null && typeof body === "object" && "meta" in (body as object);
}

export async function apiFetch<T>(path: string, options?: RequestOptions): Promise<T> {
  const method = (options?.method ?? "GET").toUpperCase();
  const response = await fetch(`${BASE_URL}${path}`, options);

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      body = await response.text().catch(() => "");
    }
    const envelopeErr =
      isEnvelope(body) && body.error
        ? (body.error as ApiErrorPayloadDto).message
        : `HTTP ${response.status} ${response.statusText}`;
    contractMonitor.record({
      endpoint: path,
      method,
      status: response.status,
      reason: envelopeErr,
      payloadPreview: previewPayload(body),
      at: new Date().toISOString(),
    });
    throw new ContractError(envelopeErr, {
      endpoint: path,
      method,
      status: response.status,
      payload: body,
    });
  }

  const body = (await response.json()) as unknown;

  if (options?.expect === "raw") {
    return body as T;
  }

  if (!isEnvelope(body)) {
    contractMonitor.record({
      endpoint: path,
      method,
      status: response.status,
      reason: "missing envelope",
      payloadPreview: previewPayload(body),
      at: new Date().toISOString(),
    });
    throw new ContractError("envelope mismatch: missing `meta` field", {
      endpoint: path,
      method,
      status: response.status,
      payload: body,
    });
  }

  if (body.error) {
    const err = body.error as ApiErrorPayloadDto;
    contractMonitor.record({
      endpoint: path,
      method,
      status: response.status,
      reason: err.message,
      payloadPreview: previewPayload(body),
      at: new Date().toISOString(),
    });
    throw new ContractError(err.message, {
      endpoint: path,
      method,
      status: response.status,
      payload: err,
    });
  }

  return (body.data ?? (undefined as unknown)) as T;
}

import type { WorkflowNodeInputDto } from "../api/generated/WorkflowNodeInputDto";

export function isNodeInputReference(
  input: WorkflowNodeInputDto,
): input is { from: string } {
  return typeof (input as { from?: unknown }).from === "string";
}

export function renderNodeInput(input: WorkflowNodeInputDto): string {
  if (isNodeInputReference(input)) return input.from;
  const literal = (input as { value: unknown }).value;
  if (literal === null || literal === undefined) return "";
  if (typeof literal === "string") return literal;
  try {
    return JSON.stringify(literal);
  } catch {
    return String(literal);
  }
}

export type {
  ApiEnvelope,
  ApiErrorPayloadDto,
  ArtifactDto,
  ArtifactLineageDto,
  CreateRunResponseDto,
  EnableExtensionResponseDto,
  ExtensionDto,
  HealthDto,
  LayoutSummaryDto,
  ListResponseDto,
  OperatorDto,
  RecipeDto,
  RefreshReportDto,
  RunDetailDto,
  RunDto,
  RuntimeMetricsDto,
  SystemInfoDto,
  ToolDto,
  UIContributionDto,
  WorkflowDto,
  WorkflowNodeInputDto,
  WorkflowUpdatePayloadDto,
  CanvasStateDto,
};

export type Extension = ExtensionDto;
export type Operator = OperatorDto;
export type Tool = ToolDto;
export type Recipe = RecipeDto;
export type UIContribution = UIContributionDto;
export type Workflow = WorkflowDto;
export type LayoutSummary = LayoutSummaryDto;
export type Run = RunDto;
export type Artifact = ArtifactDto;
export type HealthStatus = HealthDto;
export type SystemInfo = SystemInfoDto;
export type RuntimeMetrics = RuntimeMetricsDto;
export type WorkflowNode = import("../api/generated/WorkflowNodeDto").WorkflowNodeDto;
export type WorkflowStage = import("../api/generated/WorkflowStageDto").WorkflowStageDto;
export type WorkflowEdge = import("../api/generated/WorkflowEdgeDto").WorkflowEdgeDto;
export type WorkflowNodeInput = WorkflowNodeInputDto;

export type LayoutDefinition = {
  id: string;
  displayName: string;
  icon?: string;
  root: LayoutNode;
};

export type DataSource = {
  method: string;
  params?: Record<string, unknown>;
  refreshInterval?: number;
  events?: string[];
};

export type LayoutNode = {
  type: string;
  id?: string;
  props?: Record<string, unknown>;
  dataSource?: DataSource;
  children?: LayoutNode[];
  visibility?: { condition: string };
};

function unwrapItems<T>(resp: ListResponseDto<T>): T[] {
  return resp.items;
}

export function fetchHealth(): Promise<HealthDto> {
  return apiFetch("/health");
}

export function fetchSystemInfo(): Promise<SystemInfoDto> {
  return apiFetch("/system/info");
}

export function fetchExtensions(): Promise<ExtensionDto[]> {
  return apiFetch<ListResponseDto<ExtensionDto>>("/extensions").then(unwrapItems);
}

export function refreshExtensions(): Promise<RefreshReportDto> {
  return apiFetch("/extensions/refresh", { method: "POST" });
}

export function enableExtension(id: string): Promise<EnableExtensionResponseDto> {
  return apiFetch(`/extensions/${encodeURIComponent(id)}/enable`, { method: "POST" });
}

export function disableExtension(id: string): Promise<EnableExtensionResponseDto> {
  return apiFetch(`/extensions/${encodeURIComponent(id)}/disable`, { method: "POST" });
}

export function revealExtensionFolder(id: string): Promise<ExtensionRevealDto> {
  return apiFetch(`/extensions/${encodeURIComponent(id)}/reveal`, { method: "POST" });
}

export function fetchOperators(): Promise<OperatorDto[]> {
  return apiFetch<ListResponseDto<OperatorDto>>("/operators").then(unwrapItems);
}

export function fetchTools(): Promise<ToolDto[]> {
  return apiFetch<ListResponseDto<ToolDto>>("/tools").then(unwrapItems);
}

export function fetchRecipes(): Promise<RecipeDto[]> {
  return apiFetch<ListResponseDto<RecipeDto>>("/recipes").then(unwrapItems);
}

export function fetchUIContributions(): Promise<UIContributionDto[]> {
  return apiFetch<ListResponseDto<UIContributionDto>>("/ui/contributions").then(unwrapItems);
}

export function fetchWorkflows(): Promise<WorkflowDto[]> {
  return apiFetch<ListResponseDto<WorkflowDto>>("/workflows").then(unwrapItems);
}

export function fetchWorkflow(id: string): Promise<WorkflowDto> {
  return apiFetch(`/workflows/${encodeURIComponent(id)}`);
}

export function updateWorkflowGraph(
  id: string,
  payload: WorkflowUpdatePayloadDto,
): Promise<WorkflowDto> {
  return apiFetch(`/workflows/${encodeURIComponent(id)}/graph`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function revertWorkflow(id: string): Promise<WorkflowDto> {
  return apiFetch(`/workflows/${encodeURIComponent(id)}/revert`, { method: "POST" });
}

export function fetchWorkflowCanvas(id: string): Promise<CanvasStateDto> {
  return apiFetch(`/workflows/${encodeURIComponent(id)}/canvas`);
}

export function updateWorkflowCanvas(
  id: string,
  payload: CanvasStateDto,
): Promise<CanvasStateDto> {
  return apiFetch(`/workflows/${encodeURIComponent(id)}/canvas`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function validateWorkflowPayload(
  payload: WorkflowUpdatePayloadDto,
): Promise<{ valid: boolean; errors: string[]; warnings: string[] }> {
  return apiFetch("/workflows/validate-payload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function validateWorkflow(body: string): Promise<{ valid: boolean; errors: string[] }> {
  return apiFetch("/workflows/validate", {
    method: "POST",
    headers: { "Content-Type": "application/yaml" },
    body,
  });
}

export function createRun(workflowId: string): Promise<CreateRunResponseDto> {
  return apiFetch("/runs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workflow_id: workflowId }),
  });
}

export function fetchRun(id: string): Promise<RunDetailDto> {
  return apiFetch(`/runs/${encodeURIComponent(id)}`);
}

export function retryRun(id: string): Promise<CreateRunResponseDto> {
  return apiFetch(`/runs/${encodeURIComponent(id)}/retry`, { method: "POST" });
}

export function cancelRun(id: string): Promise<CreateRunResponseDto> {
  return apiFetch(`/runs/${encodeURIComponent(id)}/cancel`, { method: "POST" });
}

export function fetchArtifacts(runId: string): Promise<ArtifactDto[]> {
  return apiFetch<ListResponseDto<ArtifactDto>>(
    `/artifacts?run_id=${encodeURIComponent(runId)}`,
  ).then(unwrapItems);
}

export function fetchArtifact(id: string): Promise<ArtifactDto> {
  return apiFetch(`/artifacts/${encodeURIComponent(id)}`);
}

export function fetchArtifactLineage(id: string): Promise<ArtifactLineageDto> {
  return apiFetch(`/artifacts/${encodeURIComponent(id)}/lineage`);
}

export function fetchMetrics(): Promise<RuntimeMetricsDto> {
  return apiFetch("/metrics");
}

export type DeploymentSummary = {
  readonly id: string;
  readonly slug: string;
  readonly display_name: string;
  readonly state: string;
  readonly restore_state: string;
  readonly created_from_surface: string;
  readonly current_revision_id: string | null;
  readonly last_run_id: string | null;
  readonly last_successful_run_id: string | null;
  readonly last_failed_run_id: string | null;
  readonly run_count: number;
  readonly is_archived: boolean;
  readonly is_favorite: boolean;
  readonly created_at: string;
  readonly updated_at: string;
  // Spec 019 T400 — primary source link of the current revision. Lets the
  // flat deployments list resolve a module-provenance badge per row with
  // zero extra round-trips. Both NULL on legacy rows predating the join.
  readonly source_extension_id?: string | null;
  readonly source_workflow_id?: string | null;
};

export function fetchDeployments(): Promise<DeploymentSummary[]> {
  return apiFetch<DeploymentSummary[]>("/deployments");
}

export function fetchLayouts(): Promise<LayoutSummaryDto[]> {
  return apiFetch<ListResponseDto<LayoutSummaryDto>>("/ui/layouts").then(unwrapItems);
}

export function fetchLayout(id: string): Promise<LayoutDefinition> {
  return apiFetch(`/ui/layouts/${encodeURIComponent(id)}`);
}

import type { CatalogListDto } from "../api/generated/CatalogListDto";
import type { HfSearchPageDto } from "../api/generated/HfSearchPageDto";
import type { HyperparameterProfileDto } from "../api/generated/HyperparameterProfileDto";
import type { InstallModelRequestDto } from "../api/generated/InstallModelRequestDto";
import type { LoadStateDto } from "../api/generated/LoadStateDto";
import type { LoadTaskDto } from "../api/generated/LoadTaskDto";
import type { ModelInstallTaskDto } from "../api/generated/ModelInstallTaskDto";

export function fetchLoadState(backendId: string): Promise<LoadStateDto> {
  return apiFetch(`/llm/backends/${encodeURIComponent(backendId)}/load-state`);
}

// Spec 011 US5: host-level parameter catalog for a runtime family.
// Loosely typed — the catalog evolves on its own cadence and the UI parses
// progressively, dropping unrecognized fields.
export interface ParameterCatalogResponse {
  family: string;
  snapshot_date: string;
  upstream_source: string;
  total_entries: number;
  entries: Array<Record<string, unknown>>;
}

export function fetchParameterCatalog(family: string): Promise<ParameterCatalogResponse> {
  return apiFetch(`/backends/${encodeURIComponent(family)}/parameters`);
}

// Spec 011 Phase 9: host-level runtime install listing.
export interface HostRuntimeInstallView {
  install_id: string;
  family: string;
  version: string;
  accelerator: string;
  install_root: string;
  state: string;
  created_at: string;
  updated_at: string;
  dependents: string[];
}

export interface HostRuntimesResponse {
  installs: HostRuntimeInstallView[];
  available_families: string[];
}

export function fetchRuntimes(): Promise<HostRuntimesResponse> {
  return apiFetch("/backends");
}

export type AcceleratorProfile = "cpu" | "cuda12" | "cuda13";

export interface BackendVariant {
  release_id: string;
  platform: string;
  accelerator_profile: AcceleratorProfile;
  label: string;
  recommended: boolean;
  supported: boolean;
  disabled_reason: string | null;
  size_bytes: number | null;
  checksum_sha256: string | null;
}

export interface BackendVariantsResponse {
  variants: BackendVariant[];
  recommended_release_id: string | null;
}

export function fetchBackendVariants(
  backendId: string,
): Promise<BackendVariantsResponse> {
  return apiFetch<BackendVariantsResponse>(
    `/llm/backends/${encodeURIComponent(backendId)}/variants`,
  );
}

export interface BackendInstallResponse {
  install_task_id: string;
  runtime_install_id: string;
}

export function startBackendInstall(
  backendId: string,
  body: { release_id: string; accelerator_profile: AcceleratorProfile },
): Promise<BackendInstallResponse> {
  return apiFetch<BackendInstallResponse>(
    `/llm/backends/${encodeURIComponent(backendId)}/install`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
}

// Host-level, extension-agnostic HF search/detail.

export function hfSearch(params: {
  q: string;
  format?: string;
  license?: string;
  limit?: number;
  page?: number;
}): Promise<HfSearchPageDto> {
  const qs = new URLSearchParams({ q: params.q });
  if (params.format) qs.set("format", params.format);
  if (params.license) qs.set("license", params.license);
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.page) qs.set("page", String(params.page));
  return apiFetch(`/huggingface/search?${qs}`);
}

export function hfRepoDetail(repoId: string): Promise<unknown> {
  return apiFetch(`/huggingface/repos/${encodeURIComponent(repoId)}`);
}

// Per-extension model lifecycle. `extensionId` must match an extension
// that registered the huggingface capability at app-assembly time;
// the host returns 404 otherwise.

// Host-managed model store (spec 017). The canonical source of truth for
// what's installed on this host, aggregated across every extension that
// depends on a model.
export interface HostModelView {
  readonly install_id: string;
  readonly family: string;
  readonly version: string;
  readonly quantization: string | null;
  readonly variant: string;
  readonly install_root: string;
  readonly sha256_root: string;
  readonly source_revision: string;
  readonly state: string;
  readonly source_kind: string;
  readonly source_url: string | null;
  readonly license_spdx: string | null;
  readonly license_url: string | null;
  readonly private_model: boolean;
  readonly owner_extension_id: string | null;
  readonly created_at: string;
}

export interface HostModelsResponse {
  readonly installs: readonly HostModelView[];
}

export function fetchHostModels(): Promise<HostModelsResponse> {
  return apiFetch<HostModelsResponse>("/host-models");
}

export type DependentKind = "lease";

export interface DependentEntry {
  extension_id: string;
  display_name: string;
  kind: DependentKind;
}

export interface DependentsResponse {
  count: number;
  extensions: DependentEntry[];
}

export function fetchHostModelDependents(
  installId: string,
): Promise<DependentsResponse> {
  return apiFetch<DependentsResponse>(
    `/host-models/${encodeURIComponent(installId)}/dependents`,
  );
}

export interface HostModelInstallRequest {
  source: "huggingface";
  repo_id: string;
  revision?: string | null;
  files: string[];
  display_name?: string | null;
}

export interface HostModelInstallTask {
  install_id: string;
  task_id: string;
  already_installed: boolean;
  routed_backend: string | null;
  sha256_root: string;
}

export function installHostModel(
  body: HostModelInstallRequest,
): Promise<HostModelInstallTask> {
  return apiFetch<HostModelInstallTask>("/host-models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function listExtensionModels(
  extensionId: string,
  params?: {
    q?: string;
    format?: string;
    license?: string;
    includeHf?: boolean;
  },
): Promise<CatalogListDto> {
  const qs = new URLSearchParams();
  if (params?.q) qs.set("q", params.q);
  if (params?.format) qs.set("format", params.format);
  if (params?.license) qs.set("license", params.license);
  if (params?.includeHf) qs.set("include_hf", "true");
  const suffix = qs.toString() ? `?${qs}` : "";
  return apiFetch(
    `/extensions/${encodeURIComponent(extensionId)}/huggingface/models${suffix}`,
  );
}

export function installExtensionModel(
  extensionId: string,
  body: InstallModelRequestDto,
): Promise<ModelInstallTaskDto> {
  return apiFetch(`/extensions/${encodeURIComponent(extensionId)}/huggingface/models`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

export function cancelExtensionInstallTask(
  extensionId: string,
  taskId: string,
): Promise<void> {
  return apiFetch(
    `/extensions/${encodeURIComponent(extensionId)}/huggingface/tasks/${encodeURIComponent(taskId)}/cancel`,
    { method: "POST" },
  );
}

export function loadExtensionModel(
  extensionId: string,
  modelId: string,
): Promise<LoadTaskDto> {
  return apiFetch(
    `/extensions/${encodeURIComponent(extensionId)}/huggingface/models/${encodeURIComponent(modelId)}/load`,
    { method: "POST" },
  );
}

export function patchExtensionHyperparameters(
  extensionId: string,
  modelId: string,
  profile: HyperparameterProfileDto,
): Promise<HyperparameterProfileDto> {
  return apiFetch(
    `/extensions/${encodeURIComponent(extensionId)}/huggingface/models/${encodeURIComponent(modelId)}/hyperparameters`,
    {
      method: "PATCH",
      body: JSON.stringify(profile),
      headers: { "Content-Type": "application/json" },
    },
  );
}

// =============================================================================
// Spec 019 — Modules surface + ZIP install
// =============================================================================

export type ModuleIcon =
  | { kind: "symbol"; value: string }
  | { kind: "svg"; value: string }
  | { kind: "fallback"; value: string; fallback_hash: number };

export interface RecipeRef {
  recipe_id: string;
  display_name: string;
  description: string | null;
  step_count: number;
  tags: readonly string[];
  is_primary: boolean;
}

export interface DeploymentCounts {
  total: number;
  by_state: Record<string, number>;
  by_restore_state: Record<string, number>;
}

export interface CompatibilitySummary {
  overall: string;
  warning_count: number;
}

export interface ModuleSummary {
  module_id: string;
  source_kind: "extension" | "user" | "blank";
  extension_id: string | null;
  display_name: string;
  icon: ModuleIcon;
  version: string | null;
  tags: readonly string[];
  blueprints: readonly RecipeRef[];
  default_runtime_binding_ref: string | null;
  default_model_binding_ref: string | null;
  deployments: DeploymentCounts;
  compatibility_summary: CompatibilitySummary;
  // Spec 019 Instance-view redesign — hero + footer metadata.
  description?: string | null;
  publisher?: string | null;
  runtime_family?: string | null;
  installed_at?: string | null;
  // Workflow id backing the module's "Graph" projection on the Blueprint
  // view. Frontend fetches GET /api/v1/workflows/{id} when rendering the
  // Workflow tab; null for Blank Module.
  workflow_id?: string | null;
}

export interface ModuleListEnvelope {
  modules: readonly ModuleSummary[];
  total: number;
  limit: number;
  offset: number;
}

export interface DeploymentRow {
  deployment_id: string;
  display_name: string;
  state: string;
  restore_state: string;
  current_revision_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface RunSummary {
  run_id: string;
  status: string;
  created_at: string;
}

export interface ModuleDetail {
  summary: ModuleSummary;
  deployments: readonly DeploymentRow[];
  recent_runs: readonly RunSummary[];
}

export interface DeployFromModuleRequest {
  recipe_id?: string;
  display_name?: string;
  runtime_binding_overrides?: unknown;
  model_binding_overrides?: unknown;
  parameter_overlays?: unknown;
  workflow_patch?: unknown;
}

export interface DeploymentSaveResult {
  deployment_id: string;
  revision_id: string;
  revision_number: number;
  effective_workflow_hash: string;
  mapping_state: string;
}

export interface DryRunPlan {
  plan_id: string;
  steps: readonly { index: number; op_code: string; display_name: string }[];
  warnings: readonly string[];
  diagnostics: readonly string[];
}

export interface MaterializeRequest {
  workflow_payload: unknown;
  display_name?: string;
  runtime_binding_overrides?: unknown;
  model_binding_overrides?: unknown;
  parameter_overlays?: unknown;
}

export interface MaterializeResult {
  module_id: string;
  deployment_id: string;
  deployment_revision_id: string;
}

export interface ManifestSummary {
  id: string;
  version: string;
  name: string | null;
  description: string | null;
  publisher: string | null;
}

export interface ZipInstallResult {
  extension_id: string;
  module_id: string;
  manifest_summary: ManifestSummary;
  install_diagnostics: readonly string[];
}

export function fetchModules(params?: {
  q?: string;
  kind?: "extension" | "user" | "all";
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<ModuleListEnvelope> {
  const query = new URLSearchParams();
  if (params?.q) query.set("q", params.q);
  if (params?.kind) query.set("kind", params.kind);
  if (params?.status) query.set("status", params.status);
  if (params?.limit !== undefined) query.set("limit", String(params.limit));
  if (params?.offset !== undefined) query.set("offset", String(params.offset));
  const qs = query.toString();
  return apiFetch<ModuleListEnvelope>(`/modules${qs ? `?${qs}` : ""}`);
}

export function fetchModule(moduleId: string): Promise<ModuleDetail> {
  return apiFetch<ModuleDetail>(`/modules/${encodeURIComponent(moduleId)}`);
}

export function fetchBlueprint(
  moduleId: string,
  recipeId?: string,
): Promise<RecipeRef> {
  const qs = recipeId ? `?recipe_id=${encodeURIComponent(recipeId)}` : "";
  return apiFetch<RecipeRef>(
    `/modules/${encodeURIComponent(moduleId)}/blueprint${qs}`,
  );
}

export function deployFromModule(
  moduleId: string,
  body: DeployFromModuleRequest,
): Promise<DeploymentSaveResult> {
  return apiFetch<DeploymentSaveResult>(
    `/modules/${encodeURIComponent(moduleId)}/deployments`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    },
  );
}

export function dryRunModuleBlueprint(
  moduleId: string,
  body: { recipe_id?: string; parameter_overlays?: unknown; runtime_binding_overrides?: unknown },
): Promise<DryRunPlan> {
  return apiFetch<DryRunPlan>(
    `/modules/${encodeURIComponent(moduleId)}/blueprint/dry-run`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    },
  );
}

export function materializeDraft(
  uuid: string,
  body: MaterializeRequest,
): Promise<MaterializeResult> {
  return apiFetch<MaterializeResult>(
    `/modules/user:draft:${encodeURIComponent(uuid)}/materialize`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    },
  );
}

export async function installExtensionFromZip(file: File): Promise<ZipInstallResult> {
  const form = new FormData();
  form.append("file", file, file.name || "extension.zip");
  return apiFetch<ZipInstallResult>("/extensions/install-from-zip", {
    method: "POST",
    body: form,
  });
}
