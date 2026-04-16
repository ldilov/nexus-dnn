// Spec 019 FR-BM03 / FR-050 / FR-051 — sessionStorage envelope for drafts.
// A draft is a client-side fork of some read-only module surface (Blank,
// extension instance, or user instance). It lives in sessionStorage until
// the user saves, at which point the materialize endpoint turns it into a
// deployment.

import { draftStorageKey } from "./draft_uuid";

export interface DraftEnvelope {
  // Where this draft was forked from. Shape: `user:blank`, `ext:{extension_id}`,
  // or `user:{workflow_id}`. Used by the materialize handler to pick a
  // branch (new workflow row vs. reuse existing extension/user source).
  source_module_id: string;
  // Display name of the fork source, for the draft banner ("Editing draft
  // forked from Cinema Engine. First save creates a new deployment.").
  source_display_name: string;
  // Draft workflow payload. For Blank forks this starts empty; for
  // instance forks we seed it with the instance's resolved payload.
  workflow_payload: unknown;
  // Display name for the draft. Defaults to the source's display name.
  display_name: string;
  // RFC3339 timestamp. Used by the sessionStorage janitor (FR-408) to
  // evict drafts older than 7 days on app boot.
  forked_at: string;
}

const DRAFT_PREFIX = "nexus.module.draft.";
const SIZE_CAP_BYTES = 512 * 1024;

export function readDraftEnvelope(uuid: string): DraftEnvelope | null {
  try {
    const raw = sessionStorage.getItem(draftStorageKey(uuid));
    if (!raw) return null;
    return JSON.parse(raw) as DraftEnvelope;
  } catch {
    return null;
  }
}

export function writeDraftEnvelope(
  uuid: string,
  envelope: DraftEnvelope,
): { ok: true } | { ok: false; reason: "oversized" | "storage_failed" } {
  try {
    const serialized = JSON.stringify(envelope);
    if (serialized.length > SIZE_CAP_BYTES) {
      return { ok: false, reason: "oversized" };
    }
    sessionStorage.setItem(draftStorageKey(uuid), serialized);
    return { ok: true };
  } catch {
    return { ok: false, reason: "storage_failed" };
  }
}

export function clearDraftEnvelope(uuid: string): void {
  try {
    sessionStorage.removeItem(draftStorageKey(uuid));
  } catch {
    // sessionStorage unavailable — nothing to do
  }
}

// Spec 019 T408 — evict any draft keys older than `maxAgeMs` on app boot.
// Keeps sessionStorage tidy for users who open the app frequently and
// abandon drafts. Defaults to 7 days.
export function sweepStaleDrafts(maxAgeMs = 7 * 24 * 60 * 60 * 1000): number {
  let evicted = 0;
  try {
    const cutoff = Date.now() - maxAgeMs;
    const keysToEvict: string[] = [];
    for (let i = 0; i < sessionStorage.length; i += 1) {
      const key = sessionStorage.key(i);
      if (!key || !key.startsWith(DRAFT_PREFIX)) continue;
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;
      try {
        const envelope = JSON.parse(raw) as DraftEnvelope;
        const forkedAt = Date.parse(envelope.forked_at);
        if (Number.isNaN(forkedAt) || forkedAt < cutoff) {
          keysToEvict.push(key);
        }
      } catch {
        keysToEvict.push(key);
      }
    }
    for (const key of keysToEvict) {
      sessionStorage.removeItem(key);
      evicted += 1;
    }
  } catch {
    // sessionStorage unavailable — nothing to do
  }
  return evicted;
}
