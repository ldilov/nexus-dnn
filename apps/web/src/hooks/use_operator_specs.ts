import { useEffect, useState } from "react";
import { fetchOperators, type OperatorDto } from "../api/client";

export type OperatorSpecMap = ReadonlyMap<string, OperatorDto>;

const EMPTY: OperatorSpecMap = new Map();

export function useOperatorSpecs(): {
  specs: OperatorSpecMap;
  loading: boolean;
  error: string | null;
} {
  const [specs, setSpecs] = useState<OperatorSpecMap>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchOperators()
      .then((operators) => {
        if (cancelled) return;
        const map = new Map<string, OperatorDto>();
        for (const op of operators) {
          map.set(`${op.id}@${op.version}`, op);
        }
        setSpecs(map);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load operators");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { specs, loading, error };
}
