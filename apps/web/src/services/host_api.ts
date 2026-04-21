import { z } from "zod";

export type ArtifactFormat = "gguf" | "safetensors" | "pytorch_index" | "unknown";
export type ExtractionStatus = "ok" | "partial" | "failed";

export interface ModelMetadata {
  install_id: string;
  format: ArtifactFormat;
  layer_count: number | null;
  max_context: number | null;
  architecture: string | null;
  hidden_size: number | null;
  extraction_status: ExtractionStatus;
  extracted_at: number;
}

export interface CpuCoreFacts {
  physical: number;
  logical: number;
  detection_ok: boolean;
}

const artifactFormatSchema = z.enum(["gguf", "safetensors", "pytorch_index", "unknown"]);
const extractionStatusSchema = z.enum(["ok", "partial", "failed"]);

const modelMetadataSchema: z.ZodType<ModelMetadata> = z.object({
  install_id: z.string(),
  format: artifactFormatSchema,
  layer_count: z.number().int().nullable(),
  max_context: z.number().int().nullable(),
  architecture: z.string().nullable(),
  hidden_size: z.number().int().nullable(),
  extraction_status: extractionStatusSchema,
  extracted_at: z.number(),
});

const cpuCoreFactsSchema: z.ZodType<CpuCoreFacts> = z.object({
  physical: z.number().int(),
  logical: z.number().int(),
  detection_ok: z.boolean(),
});

export class ModelNotFoundError extends Error {
  public readonly installId: string;

  constructor(installId: string) {
    super(`model metadata not found for install_id=${installId}`);
    this.name = "ModelNotFoundError";
    this.installId = installId;
  }
}

export class HostApiError extends Error {
  public readonly endpoint: string;
  public readonly status: number | null;
  public readonly payload: unknown;

  constructor(
    message: string,
    details: { endpoint: string; status: number | null; payload?: unknown },
  ) {
    super(message);
    this.name = "HostApiError";
    this.endpoint = details.endpoint;
    this.status = details.status;
    this.payload = details.payload;
  }
}

async function readErrorBody(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return await response.text().catch(() => "");
  }
}

function buildMetadataPath(installId: string): string {
  const encoded = installId
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/api/host/models/${encoded}/metadata`;
}

export async function getModelMetadata(
  installId: string,
  signal?: AbortSignal,
): Promise<ModelMetadata> {
  const path = buildMetadataPath(installId);
  const response = await fetch(path, { method: "GET", signal });

  if (response.status === 404) {
    throw new ModelNotFoundError(installId);
  }

  if (!response.ok) {
    const payload = await readErrorBody(response);
    throw new HostApiError(`HTTP ${response.status} ${response.statusText}`, {
      endpoint: path,
      status: response.status,
      payload,
    });
  }

  const body = (await response.json()) as unknown;
  const parsed = modelMetadataSchema.safeParse(body);
  if (!parsed.success) {
    throw new HostApiError("response schema mismatch", {
      endpoint: path,
      status: response.status,
      payload: { body, issues: parsed.error.issues },
    });
  }
  return parsed.data;
}

export async function getCpuCores(signal?: AbortSignal): Promise<CpuCoreFacts> {
  const path = "/api/host/cpu/cores";
  const response = await fetch(path, { method: "GET", signal });

  if (!response.ok) {
    const payload = await readErrorBody(response);
    throw new HostApiError(`HTTP ${response.status} ${response.statusText}`, {
      endpoint: path,
      status: response.status,
      payload,
    });
  }

  const body = (await response.json()) as unknown;
  const parsed = cpuCoreFactsSchema.safeParse(body);
  if (!parsed.success) {
    throw new HostApiError("response schema mismatch", {
      endpoint: path,
      status: response.status,
      payload: { body, issues: parsed.error.issues },
    });
  }
  return parsed.data;
}
