const BASE_URL = "/api/v1";

type ApiEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown>;
  error?: string;
};

export type HealthStatus = {
  status: string;
  version: string;
};

export type SystemInfo = {
  version: string;
  uptime_seconds: number;
  extensions_count: number;
};

export type Extension = {
  id: string;
  name: string;
  version: string;
  status: string;
};

export type Operator = {
  id: string;
  name: string;
  category: string;
  input_types: string[];
  output_types: string[];
};

export type Tool = {
  id: string;
  name: string;
  kind: string;
  category: string;
  description?: string;
  input_types: string[];
  output_types: string[];
};

export type Recipe = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export type UIContribution = {
  extension_id: string;
  component: string;
  target: string;
};

export type WorkflowNode = {
  id: string;
  operator: string;
  inputs: Record<string, string>;
};

export type WorkflowStage = {
  name: string;
  nodes: WorkflowNode[];
};

export type Workflow = {
  id: string;
  name: string;
  stages: WorkflowStage[];
};

export type Run = {
  id: string;
  workflow_id: string;
  status: string;
  node_progress: Record<string, { status: string; progress: number }>;
};

export type Artifact = {
  id: string;
  name: string;
  mime_type: string;
  size_bytes: number;
  run_id: string;
  node_id: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  const body = (await response.json()) as ApiEnvelope<T> | T;
  if (body !== null && typeof body === "object" && "data" in body) {
    const envelope = body as ApiEnvelope<T>;
    if (envelope.error) throw new Error(envelope.error);
    return envelope.data;
  }
  return body as T;
}

export function fetchHealth(): Promise<HealthStatus> {
  return request("/health");
}

export function fetchSystemInfo(): Promise<SystemInfo> {
  return request("/system/info");
}

export async function fetchExtensions(): Promise<Extension[]> {
  const data = await request<{ extensions: Extension[] }>("/extensions");
  return data.extensions ?? [];
}

export function refreshExtensions(): Promise<Extension[]> {
  return request("/extensions/refresh", { method: "POST" });
}

export function enableExtension(id: string): Promise<Extension> {
  return request(`/extensions/${id}/enable`, { method: "POST" });
}

export function disableExtension(id: string): Promise<Extension> {
  return request(`/extensions/${id}/disable`, { method: "POST" });
}

export async function fetchOperators(): Promise<Operator[]> {
  const data = await request<{ operators: Operator[] }>("/operators");
  return data.operators ?? [];
}

export async function fetchTools(): Promise<Tool[]> {
  const data = await request<{ tools: Tool[] }>("/tools");
  return data.tools ?? [];
}

export async function fetchRecipes(): Promise<Recipe[]> {
  const data = await request<{ recipes: Recipe[] }>("/recipes");
  return data.recipes ?? [];
}

export async function fetchUIContributions(): Promise<UIContribution[]> {
  const data = await request<{ contributions: UIContribution[] }>("/ui/contributions");
  return data.contributions ?? [];
}

export async function fetchWorkflows(): Promise<Workflow[]> {
  const data = await request<{ workflows: Workflow[] }>("/workflows");
  return data.workflows ?? [];
}

export function fetchWorkflow(id: string): Promise<Workflow> {
  return request(`/workflows/${id}`);
}

export function validateWorkflow(id: string): Promise<{ valid: boolean; errors: string[] }> {
  return request(`/workflows/${id}/validate`, { method: "POST" });
}

export function updateWorkflow(id: string, payload: Partial<Workflow>): Promise<Workflow> {
  return request(`/workflows/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function createRun(workflowId: string): Promise<Run> {
  return request("/runs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workflow_id: workflowId }),
  });
}

export function fetchRun(id: string): Promise<Run> {
  return request(`/runs/${id}`);
}

export function retryRun(id: string): Promise<Run> {
  return request(`/runs/${id}/retry`, { method: "POST" });
}

export async function fetchArtifacts(runId: string): Promise<Artifact[]> {
  const data = await request<{ artifacts: Artifact[] }>(`/artifacts?run_id=${encodeURIComponent(runId)}`);
  return data.artifacts ?? [];
}
