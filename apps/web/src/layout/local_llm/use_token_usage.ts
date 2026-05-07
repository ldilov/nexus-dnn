import { useCallback, useEffect, useState } from "react";

export interface TokenUsageState {
  tokensUsed: number;
  lastTps: number;
}

export interface TokenUsageRecord {
  promptTokens?: number;
  completionTokens?: number;
  tokensPerSec?: number;
}

export interface UseTokenUsageResult {
  tokensUsed: number;
  lastTps: number;
  contextUsedPct: number;
  record: (stats: TokenUsageRecord) => void;
}

export function useTokenUsage(
  threadId: string | null,
  maxContext: number,
): UseTokenUsageResult {
  const [state, setState] = useState<TokenUsageState>({ tokensUsed: 0, lastTps: 0 });

  useEffect(() => {
    setState({ tokensUsed: 0, lastTps: 0 });
  }, [threadId]);

  const record = useCallback((stats: TokenUsageRecord) => {
    const used = (stats.promptTokens ?? 0) + (stats.completionTokens ?? 0);
    setState({ tokensUsed: used, lastTps: stats.tokensPerSec ?? 0 });
  }, []);

  return {
    tokensUsed: state.tokensUsed,
    lastTps: state.lastTps,
    contextUsedPct: maxContext > 0 ? state.tokensUsed / maxContext : 0,
    record,
  };
}
