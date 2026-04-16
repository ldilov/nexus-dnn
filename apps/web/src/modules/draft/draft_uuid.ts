// Spec 019 FR-BM01 — client-minted UUID v4 for blank-module drafts.
// Mint with `crypto.randomUUID()` when available (all modern browsers);
// fall back to a hand-rolled v4 generator for headless test harnesses
// where the Web Crypto surface might be stubbed.

const UUID_V4_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export function mintDraftUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40;
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export function isDraftUuid(value: string): boolean {
  return UUID_V4_RE.test(value);
}

const DRAFT_STORAGE_PREFIX = "nexus.module.draft.";

export function draftStorageKey(uuid: string): string {
  return `${DRAFT_STORAGE_PREFIX}${uuid}`;
}
