import { createContext, useContext } from "react";

export interface LayoutContextValue {
  deploymentId?: string;
}

export const LayoutContext = createContext<LayoutContextValue>({});

export function useLayoutContext(): LayoutContextValue {
  return useContext(LayoutContext);
}
