import type { ApiEnvelope } from "./generated/ApiEnvelope";
import type { ApiErrorPayloadDto } from "./generated/ApiErrorPayloadDto";
import type { ArtifactDto } from "./generated/ArtifactDto";
import type { ArtifactLineageDto } from "./generated/ArtifactLineageDto";
import type { CreateRunResponseDto } from "./generated/CreateRunResponseDto";
import type { EnableExtensionResponseDto } from "./generated/EnableExtensionResponseDto";
import type { ExtensionDto } from "./generated/ExtensionDto";
import type { ExtensionRevealDto } from "./generated/ExtensionRevealDto";
import type { HealthDto } from "./generated/HealthDto";
import type { LayoutSummaryDto } from "./generated/LayoutSummaryDto";
import type { ListResponseDto } from "./generated/ListResponseDto";
import type { OperatorDto } from "./generated/OperatorDto";
import type { RecipeDto } from "./generated/RecipeDto";
import type { RefreshReportDto } from "./generated/RefreshReportDto";
import type { RunDetailDto } from "./generated/RunDetailDto";
import type { RunDto } from "./generated/RunDto";
import type { RuntimeMetricsDto } from "./generated/RuntimeMetricsDto";
import type { SystemInfoDto } from "./generated/SystemInfoDto";
import type { ToolDto } from "./generated/ToolDto";
import type { UIContributionDto } from "./generated/UIContributionDto";
import type { WorkflowDto } from "./generated/WorkflowDto";
import type { WorkflowUpdatePayloadDto } from "./generated/WorkflowUpdatePayloadDto";
import type { CanvasStateDto } from "./generated/CanvasStateDto";

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

import type { WorkflowNodeInputDto } from "./generated/WorkflowNodeInputDto";

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
export type WorkflowNode = import("./generated/WorkflowNodeDto").WorkflowNodeDto;
export type WorkflowStage = import("./generated/WorkflowStageDto").WorkflowStageDto;
export type WorkflowEdge = import("./generated/WorkflowEdgeDto").WorkflowEdgeDto;
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

export function fetchLayouts(): Promise<LayoutSummaryDto[]> {
  return apiFetch<ListResponseDto<LayoutSummaryDto>>("/ui/layouts").then(unwrapItems);
}

export function fetchLayout(id: string): Promise<LayoutDefinition> {
  return apiFetch(`/ui/layouts/${encodeURIComponent(id)}`);
}

import type { CatalogListDto } from "./generated/CatalogListDto";
import type { HfSearchPageDto } from "./generated/HfSearchPageDto";
import type { HyperparameterProfileDto } from "./generated/HyperparameterProfileDto";
import type { InstallModelRequestDto } from "./generated/InstallModelRequestDto";
import type { LoadStateDto } from "./generated/LoadStateDto";
import type { LoadTaskDto } from "./generated/LoadTaskDto";
import type { ModelInstallTaskDto } from "./generated/ModelInstallTaskDto";

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
