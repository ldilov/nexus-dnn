// Typed API client.
//
// Every hand-written request type in this file is gone — the wire shapes are
// now defined in Rust under `crates/nexus-api/src/dto/` and emitted to
// `./generated/` via `cargo test -p nexus-api export_bindings`. See
// `crates/nexus-api/src/dto/mod.rs` for the authoritative DTO list.
//
// Call sites import `*Dto` types directly from `./generated/` and call the
// endpoint wrappers below (which resolve the envelope + run a runtime sanity
// check so contract drift surfaces as a clear `ContractError` instead of a
// silent React crash).

import type { ApiEnvelope } from "./generated/ApiEnvelope";
import type { ApiErrorPayloadDto } from "./generated/ApiErrorPayloadDto";
import type { ArtifactDto } from "./generated/ArtifactDto";
import type { ArtifactLineageDto } from "./generated/ArtifactLineageDto";
import type { CreateRunResponseDto } from "./generated/CreateRunResponseDto";
import type { EnableExtensionResponseDto } from "./generated/EnableExtensionResponseDto";
import type { ExtensionDto } from "./generated/ExtensionDto";
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

const BASE_URL = "/api/v1";

// ---------------------------------------------------------------------------
// Contract monitoring
// ---------------------------------------------------------------------------

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
    // Surface every violation in the console so it is impossible to miss
    // during development; production builds can strip this via a log level.
    // eslint-disable-next-line no-console
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

// ---------------------------------------------------------------------------
// Fetch pipeline
// ---------------------------------------------------------------------------

type RequestOptions = RequestInit & {
  /** Allow endpoints that return the payload raw (no envelope). */
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

  // Network-level failures bypass envelope parsing.
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

  // When the handler returns `ApiResponse::no_content()` the envelope has
  // `data: undefined`; callers that ask for `void` handle that.
  return (body.data ?? (undefined as unknown)) as T;
}

// ---------------------------------------------------------------------------
// Node-input helpers (kept here so frontend call sites don't have to know
// about the ts-rs-generated union shape).
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Re-exports: generated DTO types used pervasively by the frontend. Importing
// from `api/client` stays ergonomic without binding callers to the generated
// directory layout.
// ---------------------------------------------------------------------------

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
};

// Backwards-compatible aliases so the old, non-`Dto`-suffixed names that the
// rest of the app uses keep compiling. These have no runtime cost.
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

// ---------------------------------------------------------------------------
// Endpoint wrappers
// ---------------------------------------------------------------------------

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
  // Layout definitions are returned verbatim (raw layout JSON is the envelope
  // `data`); the shape is extension-specific so we keep it untyped.
  return apiFetch(`/ui/layouts/${encodeURIComponent(id)}`);
}
