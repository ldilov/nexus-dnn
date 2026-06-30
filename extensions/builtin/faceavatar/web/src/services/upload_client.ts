import { EXTENSION_PREFIX, ExtensionApiError } from "./http";
import type { ErrorEnvelope } from "./types";

/** The host stores the uploaded image and returns its artifact ref. */
export interface UploadResponse {
  ref: string;
}

export async function uploadImage(file: File): Promise<UploadResponse> {
  const body = new FormData();
  body.append("file", file);
  const resp = await fetch(`${EXTENSION_PREFIX}/uploads`, { method: "POST", body });

  if (!resp.ok) {
    let envelope: ErrorEnvelope | null = null;
    try {
      envelope = (await resp.json()) as ErrorEnvelope;
    } catch {
      envelope = null;
    }
    throw new ExtensionApiError(
      resp.status,
      envelope?.category ?? "unknown",
      envelope?.message ?? resp.statusText,
      envelope?.requestId,
    );
  }

  return (await resp.json()) as UploadResponse;
}
