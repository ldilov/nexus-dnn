import { useCallback, useEffect, useRef, useState } from "react";

interface MutationState<TData> {
  isPending: boolean;
  error: Error | null;
  data: TData | null;
}

export interface UseMutationResult<TArgs extends unknown[], TData>
  extends MutationState<TData> {
  /** Run the async action, tracking pending/error/data. Resolves to the result, or `undefined` on failure. */
  mutate: (...args: TArgs) => Promise<TData | undefined>;
  /** Clear pending/error/data back to the idle state. */
  reset: () => void;
}

const IDLE: MutationState<never> = {
  isPending: false,
  error: null,
  data: null,
};

/**
 * Wraps an async mutation so a single source drives a button's pending spinner and error surface.
 * Late resolutions after unmount are dropped; stale resolutions from superseded calls are ignored.
 */
export function useMutation<TArgs extends unknown[], TData>(
  fn: (...args: TArgs) => Promise<TData>,
): UseMutationResult<TArgs, TData> {
  const [state, setState] = useState<MutationState<TData>>(IDLE);
  const fnRef = useRef(fn);
  fnRef.current = fn;
  const mountedRef = useRef(true);
  const callIdRef = useRef(0);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const mutate = useCallback(async (...args: TArgs) => {
    const callId = ++callIdRef.current;
    setState((prev) => ({ ...prev, isPending: true, error: null }));
    try {
      const data = await fnRef.current(...args);
      if (mountedRef.current && callId === callIdRef.current) {
        setState({ isPending: false, error: null, data });
      }
      return data;
    } catch (caught) {
      const error =
        caught instanceof Error ? caught : new Error(String(caught));
      if (mountedRef.current && callId === callIdRef.current) {
        setState({ isPending: false, error, data: null });
      }
      return undefined;
    }
  }, []);

  const reset = useCallback(() => setState(IDLE), []);

  return { ...state, mutate, reset };
}
