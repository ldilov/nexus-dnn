/**
 * Spec 035 — Extension Dependency Installer.
 *
 * Thin HTTP client for the four endpoints:
 *   GET  /api/v1/extensions/:id/dependencies
 *   POST /api/v1/extensions/:id/install
 *   POST /api/v1/extensions/:id/install/steps/:step_id/retry
 *   POST /api/v1/extensions/:id/install/cancel
 *
 * Centralises fetch I/O per Constitution Principle XII.4 (SR-005). Validates the
 * response with the matching zod schema so a contract drift surfaces as a client
 * error rather than a silent UI bug.
 */
import { apiFetch } from "./api_client";
import {
  dependenciesResponseSchema,
  installStartedResponseSchema,
  type DependenciesResponse,
  type InstallStartedResponse,
} from "../types/extension_dependencies";

export async function fetchDependencies(
  extensionId: string,
): Promise<DependenciesResponse> {
  const raw = await apiFetch<unknown>(
    `/extensions/${encodeURIComponent(extensionId)}/dependencies`,
  );
  return dependenciesResponseSchema.parse(raw);
}

export async function startInstall(
  extensionId: string,
): Promise<InstallStartedResponse> {
  const raw = await apiFetch<unknown>(
    `/extensions/${encodeURIComponent(extensionId)}/install`,
    { method: "POST" },
  );
  return installStartedResponseSchema.parse(raw);
}

export async function retryStep(
  extensionId: string,
  stepId: string,
): Promise<InstallStartedResponse> {
  const raw = await apiFetch<unknown>(
    `/extensions/${encodeURIComponent(extensionId)}/install/steps/${encodeURIComponent(stepId)}/retry`,
    { method: "POST" },
  );
  return installStartedResponseSchema.parse(raw);
}

export async function cancelInstall(extensionId: string): Promise<void> {
  await apiFetch<unknown>(
    `/extensions/${encodeURIComponent(extensionId)}/install/cancel`,
    { method: "POST" },
  );
}
