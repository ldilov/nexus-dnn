import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import { fetchCatalog, type ComponentMetadata } from "../../services/ui_catalog";
import {
  extractDefaults,
  schemaToWidgets,
  validateValues,
} from "../../components/props-editor/props_editor";
import { DevComponentsUI } from "./dev_components.ui";
import { deriveSnippets } from "./snippets";

interface DevComponentsLoaderData {
  components: ComponentMetadata[];
  error: string | null;
}

export async function loader(): Promise<DevComponentsLoaderData> {
  try {
    const envelope = await fetchCatalog();
    return { components: envelope.components, error: null };
  } catch (err) {
    if (err instanceof Response) {
      throw err;
    }
    return {
      components: [],
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

const SESSION_KEY = "dev-components:state:v1";

interface SessionState {
  selected: string | null;
  propsByName: Record<string, Record<string, unknown>>;
}

function loadSessionState(): SessionState {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return { selected: null, propsByName: {} };
    const parsed = JSON.parse(raw) as SessionState;
    if (
      parsed &&
      typeof parsed === "object" &&
      (parsed.selected === null || typeof parsed.selected === "string") &&
      parsed.propsByName &&
      typeof parsed.propsByName === "object"
    ) {
      return parsed;
    }
  } catch {
    // ignore
  }
  return { selected: null, propsByName: {} };
}

function persistSessionState(state: SessionState): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function Component() {
  const data = useLoaderData() as DevComponentsLoaderData;
  const [searchParams] = useSearchParams();
  const [session, setSession] = useState<SessionState>(() => loadSessionState());
  const [lastCopied, setLastCopied] = useState<"yaml" | "tag" | null>(null);

  const deepLinkName = searchParams.get("component");

  useEffect(() => {
    if (!deepLinkName) return;
    setSession((prev) =>
      prev.selected === deepLinkName ? prev : { ...prev, selected: deepLinkName },
    );
  }, [deepLinkName]);

  const selected = useMemo(() => {
    const byName = (name: string | null) =>
      name ? data.components.find((c) => c.name === name) ?? null : null;
    return (
      byName(session.selected) ??
      byName(deepLinkName) ??
      data.components[0] ??
      null
    );
  }, [data.components, session.selected, deepLinkName]);

  const descriptors = useMemo(
    () => (selected ? schemaToWidgets(selected.props_schema.schema) : []),
    [selected],
  );

  const propValues = useMemo(() => {
    if (!selected) return {};
    const stored = session.propsByName[selected.name];
    if (stored) return stored;
    return extractDefaults(descriptors);
  }, [selected, session.propsByName, descriptors]);

  const errors = useMemo(
    () => (selected ? validateValues(descriptors, propValues) : {}),
    [selected, descriptors, propValues],
  );

  const snippets = useMemo(
    () => deriveSnippets(selected, propValues),
    [selected, propValues],
  );

  useEffect(() => {
    persistSessionState(session);
  }, [session]);

  const handleSelect = useCallback((name: string) => {
    setSession((prev) => ({ ...prev, selected: name }));
    setLastCopied(null);
  }, []);

  const handlePropsChange = useCallback(
    (next: Record<string, unknown>) => {
      if (!selected) return;
      setSession((prev) => ({
        ...prev,
        propsByName: { ...prev.propsByName, [selected.name]: next },
      }));
      setLastCopied(null);
    },
    [selected],
  );

  const handleResetProps = useCallback(() => {
    if (!selected) return;
    setSession((prev) => {
      const { [selected.name]: _removed, ...rest } = prev.propsByName;
      return { ...prev, propsByName: rest };
    });
    setLastCopied(null);
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleResetProps();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleResetProps]);

  const handleCopy = useCallback(
    (kind: "yaml" | "tag") => {
      const text = kind === "yaml" ? snippets.yaml : snippets.tag ?? "";
      if (!text) return;
      void navigator.clipboard
        .writeText(text)
        .then(() => {
          setLastCopied(kind);
          window.setTimeout(
            () => setLastCopied((prev) => (prev === kind ? null : prev)),
            2000,
          );
        })
        .catch(() => {
          // swallow — clipboard may be blocked in some browser contexts
        });
    },
    [snippets],
  );

  return (
    <DevComponentsUI
      components={data.components}
      selected={selected}
      propValues={propValues}
      errors={errors}
      snippets={snippets}
      lastCopied={lastCopied}
      error={data.error}
      onSelect={handleSelect}
      onPropsChange={handlePropsChange}
      onCopy={handleCopy}
    />
  );
}

