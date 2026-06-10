/**
 * Spec 035 — Extension Dependency Installer.
 *
 * Zod schemas + inferred types for the host's `/api/v1/extensions/:id/dependencies`
 * surface. Validates on receipt so a contract drift in the host shows up as a
 * loud client-side error rather than a silent UI bug.
 */
import { z } from "zod";

export const stepStatusKindSchema = z.enum([
  "pending",
  "running",
  "ok",
  "failed",
  "skipped",
]);
export type StepStatusKind = z.infer<typeof stepStatusKindSchema>;

export const stepProgressSchema = z.object({
  phase: z.string(),
  current_bytes: z.number(),
  total_bytes: z.number(),
});
export type StepProgress = z.infer<typeof stepProgressSchema>;

export const stepArtifactSchema = z.object({
  path: z.string().nullable(),
  bytes_placed: z.number(),
  summary: z.string(),
});
export type StepArtifact = z.infer<typeof stepArtifactSchema>;

export const stepErrorSchema = z.object({
  category: z.string(),
  message: z.string(),
  hint: z.string().nullable(),
  log_excerpt: z.string().nullable(),
});
export type StepError = z.infer<typeof stepErrorSchema>;

export const stepIntegritySchema = z.object({
  ok: z.boolean(),
  detail: z.string().nullable(),
});
export type StepIntegrity = z.infer<typeof stepIntegritySchema>;

export const stepSchema = z.object({
  id: z.string(),
  type: z.string(),
  requires: z.array(z.string()),
  status: stepStatusKindSchema,
  satisfied: z.boolean(),
  artifact: stepArtifactSchema.nullable(),
  last_error: stepErrorSchema.nullable(),
  progress: stepProgressSchema.nullable(),
  estimated_remaining_bytes: z.number(),
  files_present: z.number().optional(),
  files_total: z.number().optional(),
  // On-disk integrity verdict for a satisfied step. Absent when not verifiable;
  // `ok: false` drives the per-row "corrupt — reinstall" warning.
  integrity: stepIntegritySchema.optional(),
});
export type DependencyStep = z.infer<typeof stepSchema>;

export const dependenciesResponseSchema = z.object({
  steps: z.array(stepSchema),
  all_satisfied: z.boolean(),
  total_remaining_bytes: z.number(),
  // True while an install run is active host-side. Lets a freshly (re)mounted
  // page know it's still installing without waiting for the next WS event.
  // Optional for tolerance against older host payloads (treated as false).
  install_active: z.boolean().optional(),
  // True when no run is active but a paused, partially-downloaded artifact
  // exists (e.g. a host restart parked an in-flight download). Drives the
  // "Resume install" affordance; installing continues from the partial bytes.
  install_resumable: z.boolean().optional(),
});
export type DependenciesResponse = z.infer<typeof dependenciesResponseSchema>;

export const installStartedResponseSchema = z.object({
  install_run_id: z.string(),
  started_at: z.string(),
});
export type InstallStartedResponse = z.infer<typeof installStartedResponseSchema>;

export const uninstallSummarySchema = z.object({
  extension_id: z.string(),
  removed_models: z.number(),
  kept_shared_models: z.number(),
  freed_bytes: z.number(),
  leases_released: z.number(),
  install_dirs_removed: z.number(),
});
export type UninstallSummary = z.infer<typeof uninstallSummarySchema>;
