export interface KnownBrokenVerdict {
  broken: boolean;
  reason?: string;
  upstreamIssue?: string;
}

export function isKnownBrokenForCacheReuse(
  familyId: string | null | undefined,
): KnownBrokenVerdict {
  if (!familyId) return { broken: false };
  const lower = familyId.toLowerCase();
  if (lower.includes("gemma-3") || lower.includes("gemma3")) {
    return {
      broken: true,
      reason:
        "Gemma 3 SWA + cache-reuse breaks without --swa-full; GPU drops to 20-30%.",
      upstreamIssue: "https://github.com/ggml-org/llama.cpp/issues/21468",
    };
  }
  if (lower.includes("qwen3-next") || lower.includes("qwen3_next")) {
    return {
      broken: true,
      reason: "Qwen3-Next SWA hybrid breaks cache-reuse without --swa-full.",
      upstreamIssue: "https://github.com/ggml-org/llama.cpp/issues/18497",
    };
  }
  return { broken: false };
}
