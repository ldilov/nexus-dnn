import { useCallback, useEffect, useState } from "react";

export interface HashRoute {
  hash: string;
  path: string;
  segments: readonly string[];
  query: URLSearchParams;
}

// Spec 019 FR-004/FR-005 — a minimal hash-based router. The app still drives
// most view switching via sidebar state; this hook exposes the current hash
// so we can deep-link into `/#/modules/{id}` and friends + handle legacy
// redirects from `/#/recipes` and `/#/workflows/{id}`.

function parse(hash: string): HashRoute {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  const withoutSlash = raw.startsWith("/") ? raw.slice(1) : raw;
  const [pathPart, queryPart] = withoutSlash.split("?");
  const path = pathPart ?? "";
  const segments = path.split("/").filter((s) => s.length > 0);
  const query = new URLSearchParams(queryPart ?? "");
  return { hash, path, segments, query };
}

export function useHashRoute(): [HashRoute, (nextHash: string) => void] {
  const [route, setRoute] = useState<HashRoute>(() =>
    typeof window !== "undefined"
      ? parse(window.location.hash)
      : parse(""),
  );

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((nextHash: string) => {
    const normalized = nextHash.startsWith("#") ? nextHash : `#${nextHash}`;
    if (window.location.hash === normalized) return;
    window.location.hash = normalized;
  }, []);

  return [route, navigate];
}

export function replaceHash(nextHash: string): void {
  const normalized = nextHash.startsWith("#") ? nextHash : `#${nextHash}`;
  const url = `${window.location.pathname}${window.location.search}${normalized}`;
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
