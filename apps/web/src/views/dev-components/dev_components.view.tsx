import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import { fetchCatalog, type ComponentMetadata } from "../../services/ui_catalog";
import {
  extractDefaults,
  schemaToWidgets,
  validateValues,
} from "../../components/props-editor/props_editor";
import { DevComponentsUI } from "./dev_components.ui";

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

  const initialName =
    searchParams.get("component") ??
    session.selected ??
    data.components[0]?.name ??
    null;

  useEffect(() => {
    if (initialName && session.selected !== initialName) {
      setSession((prev) => ({ ...prev, selected: initialName }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialName]);

  const selected = useMemo(
    () =>
      data.components.find((c) => c.name === session.selected) ??
      data.components.find((c) => c.name === initialName) ??
      null,
    [data.components, session.selected, initialName],
  );

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

function deriveSnippets(
  selected: ComponentMetadata | null,
  propValues: Record<string, unknown>,
): { yaml: string; tag: string | null } {
  if (!selected) return { yaml: "", tag: null };
  const lines: string[] = [`type: ${selected.name}`];
  const entries = Object.entries(propValues).filter(([, v]) => v !== undefined);
  if (entries.length > 0) {
    lines.push("props:");
    for (const [k, v] of entries) {
      lines.push(`  ${k}: ${formatYamlValue(v)}`);
    }
  }
  const yaml = lines.join("\n") + "\n";
  const tag =
    selected.examples.find((e) => e.tag !== null)?.tag ?? null;
  return { yaml, tag };
}

function formatYamlValue(v: unknown): string {
  if (v === null) return "null";
  if (typeof v === "string") {
    if (/[:#\[\]{},&*!|>'"%@`\n]/.test(v) || v.trim() !== v || v === "") {
      return JSON.stringify(v);
    }
    return v;
  }
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return "null";
  }
}
