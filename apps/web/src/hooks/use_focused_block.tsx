/**
 * Spec 042 — Focused-Block context (T066).
 *
 * The Cursor singleton needs to know which Block currently owns user
 * focus so it can render at the right anchor. Block components signal
 * focus changes via `useReportBlockFocus`; the Cursor reads the current
 * value via `useFocusedBlockId`.
 *
 * Provider-less consumers receive `null` — useful in tests and in
 * mounting layers that have not yet wrapped their tree.
 */

import {
  type ReactElement,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface FocusedBlockContextValue {
  focusedBlockId: string | null;
  setFocusedBlockId: (id: string | null) => void;
}

const FocusedBlockContext = createContext<FocusedBlockContextValue | null>(
  null,
);

export interface FocusedBlockProviderProps {
  children: ReactNode;
}

export function FocusedBlockProvider(
  props: FocusedBlockProviderProps,
): ReactElement {
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onFocus = (event: FocusEvent): void => {
      const target = event.target as HTMLElement | null;
      if (target === null) return;
      const block = target.closest("[data-block-id]") as HTMLElement | null;
      if (block === null) return;
      const id = block.getAttribute("data-block-id");
      if (typeof id === "string" && id.length > 0) {
        setFocusedBlockId(id);
      }
    };
    document.addEventListener("focusin", onFocus);
    return () => {
      document.removeEventListener("focusin", onFocus);
    };
  }, []);

  const value = useMemo<FocusedBlockContextValue>(
    () => ({ focusedBlockId, setFocusedBlockId }),
    [focusedBlockId],
  );

  return (
    <FocusedBlockContext.Provider value={value}>
      {props.children}
    </FocusedBlockContext.Provider>
  );
}

export function useFocusedBlockId(): string | null {
  const ctx = useContext(FocusedBlockContext);
  return ctx?.focusedBlockId ?? null;
}

export function useReportBlockFocus(): (id: string | null) => void {
  const ctx = useContext(FocusedBlockContext);
  return useCallback(
    (id: string | null): void => {
      ctx?.setFocusedBlockId(id);
    },
    [ctx],
  );
}
