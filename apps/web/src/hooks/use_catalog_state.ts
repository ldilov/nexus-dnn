import { useCallback, useEffect, useState } from "react";
import type { ControlsState, StatusKey } from "../catalog/catalog_controls";

export type CatalogScope = "workflows" | "recipes";

export interface UseCatalogState {
  state: ControlsState;
  setState: (next: ControlsState) => void;
  setQuery: (query: string) => void;
  clear: () => void;
}

interface PersistedShape {
  query: string;
  statusFilters: StatusKey[];
  extensionFilter: string | null;
}

const EMPTY_STATE: ControlsState = {
  query: "",
  statusFilters: new Set<StatusKey>(),
  extensionFilter: null,
};

function storageKey(scope: CatalogScope): string {
  return `nexus.catalog.${scope}.controls`;
}

function readPersisted(scope: CatalogScope): ControlsState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.sessionStorage.getItem(storageKey(scope));
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as PersistedShape;
    return {
      query: typeof parsed.query === "string" ? parsed.query : "",
      statusFilters: new Set<StatusKey>(parsed.statusFilters ?? []),
      extensionFilter:
        typeof parsed.extensionFilter === "string" ? parsed.extensionFilter : null,
    };
  } catch {
    return EMPTY_STATE;
  }
}

function writePersisted(scope: CatalogScope, state: ControlsState): void {
  if (typeof window === "undefined") return;
  try {
    const payload: PersistedShape = {
      query: state.query,
      statusFilters: Array.from(state.statusFilters),
      extensionFilter: state.extensionFilter,
    };
    window.sessionStorage.setItem(storageKey(scope), JSON.stringify(payload));
  } catch {
    // storage may be unavailable in private mode — ignore silently
  }
}

export function useCatalogState(scope: CatalogScope): UseCatalogState {
  const [state, setStateInternal] = useState<ControlsState>(() => readPersisted(scope));

  useEffect(() => {
    writePersisted(scope, state);
  }, [scope, state]);

  const setState = useCallback((next: ControlsState) => setStateInternal(next), []);
  const setQuery = useCallback(
    (query: string) => setStateInternal((prev) => ({ ...prev, query })),
    [],
  );
  const clear = useCallback(() => setStateInternal(EMPTY_STATE), []);

  return { state, setState, setQuery, clear };
}

export interface FilterableCatalogItem {
  readonly id: string;
  readonly title?: string | null;
  readonly name?: string | null;
  readonly display_name?: string | null;
  readonly description?: string | null;
  readonly summary?: string | null;
  readonly extension_id?: string | null;
  readonly status?: string | null;
}

export function matchesControls<T extends FilterableCatalogItem>(
  item: T,
  controls: ControlsState,
  extensionNameLookup: (extensionId: string) => string | undefined,
): boolean {
  if (controls.extensionFilter !== null && item.extension_id !== controls.extensionFilter) {
    return false;
  }
  if (controls.statusFilters.size > 0) {
    const status = (item.status ?? null) as StatusKey | null;
    if (status === null || !controls.statusFilters.has(status)) {
      return false;
    }
  }
  if (controls.query.trim().length === 0) return true;

  const needle = controls.query.trim().toLowerCase();
  const haystackParts: Array<string | null | undefined> = [
    item.title,
    item.name,
    item.display_name,
    item.id,
    item.summary,
    item.description,
    item.extension_id,
    item.extension_id ? extensionNameLookup(item.extension_id) : null,
  ];
  return haystackParts.some(
    (part) => typeof part === "string" && part.toLowerCase().includes(needle),
  );
}
