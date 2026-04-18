import { useMemo } from "react";
import useSWR from "swr";
import { fetchOperators, type OperatorDto } from "../api/client";

export type OperatorSpecMap = ReadonlyMap<string, OperatorDto>;

const EMPTY: OperatorSpecMap = new Map();

export function useOperatorSpecs(): {
  specs: OperatorSpecMap;
  loading: boolean;
  error: string | null;
} {
  const { data, error, isLoading } = useSWR<OperatorDto[]>(
    "operators",
    () => fetchOperators(),
  );

  const specs = useMemo<OperatorSpecMap>(() => {
    if (!data) return EMPTY;
    const map = new Map<string, OperatorDto>();
    for (const op of data) {
      map.set(`${op.id}@${op.version}`, op);
    }
    return map;
  }, [data]);

  return {
    specs,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Failed to load operators"
      : null,
  };
}
