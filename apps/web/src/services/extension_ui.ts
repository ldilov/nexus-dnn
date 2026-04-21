import type {
  ExtensionComponentSummary,
  ExtensionComponentsEnvelope,
} from "./ui_catalog";

const ENDPOINT = "/api/v1/ui/extension-components";

interface CachedEntry {
  fetchedAt: number;
  byTag: Map<string, ExtensionComponentSummary>;
}

let catalogCache: CachedEntry | null = null;
const registrations = new Map<string, Promise<unknown>>();

export async function fetchExtensionComponents(options?: {
  force?: boolean;
}): Promise<ReadonlyMap<string, ExtensionComponentSummary>> {
  if (!options?.force && catalogCache !== null) {
    return catalogCache.byTag;
  }
  const res = await fetch(ENDPOINT, { headers: { accept: "application/json" } });
  if (!res.ok) {
    throw new Error(
      `extension-components endpoint returned ${res.status} ${res.statusText}`,
    );
  }
  const envelope = (await res.json()) as ExtensionComponentsEnvelope;
  if (envelope.schema_version !== "1") {
    throw new Error(
      `unsupported extension-components schema_version: ${envelope.schema_version}`,
    );
  }
  const byTag = new Map<string, ExtensionComponentSummary>();
  for (const c of envelope.components) {
    byTag.set(c.tag, c);
  }
  catalogCache = { fetchedAt: Date.now(), byTag };
  return byTag;
}

export async function resolveTag(
  tag: string,
): Promise<ExtensionComponentSummary | undefined> {
  const byTag = await fetchExtensionComponents();
  return byTag.get(tag);
}

export type CustomElementModule = Record<string, unknown>;

export type ImportModule = (href: string) => Promise<CustomElementModule>;

const defaultImport: ImportModule = (href) =>
  import(/* @vite-ignore */ href) as Promise<CustomElementModule>;

export async function loadAndRegister(
  tag: string,
  importer: ImportModule = defaultImport,
): Promise<void> {
  if (registrations.has(tag)) {
    return registrations.get(tag) as Promise<void>;
  }
  const promise = (async () => {
    const summary = await resolveTag(tag);
    if (summary === undefined) {
      throw new UnknownTagError(tag);
    }
    let mod: CustomElementModule;
    try {
      mod = await importer(summary.asset_href);
    } catch (err) {
      throw new LoadFailedError(
        tag,
        summary.extension_id,
        err instanceof Error ? err.message : String(err),
      );
    }
    const entryFn = mod[summary.entry];
    if (typeof entryFn !== "function") {
      throw new RegisterFailedError(
        tag,
        summary.extension_id,
        `module exported no callable '${summary.entry}'`,
      );
    }
    try {
      await (entryFn as () => unknown | Promise<unknown>)();
    } catch (err) {
      throw new RegisterFailedError(
        tag,
        summary.extension_id,
        err instanceof Error ? err.message : String(err),
      );
    }
  })();
  registrations.set(tag, promise);
  try {
    await promise;
  } catch (err) {
    registrations.delete(tag);
    throw err;
  }
}

export function resetExtensionUiCachesForTest(): void {
  catalogCache = null;
  registrations.clear();
}

export class UnknownTagError extends Error {
  readonly reason = "unknown_tag" as const;
  readonly tag: string;
  readonly extension_id: null = null;
  constructor(tag: string) {
    super(`no extension registered tag '${tag}'`);
    this.tag = tag;
    this.name = "UnknownTagError";
  }
}

export class LoadFailedError extends Error {
  readonly reason = "load_failed" as const;
  readonly tag: string;
  readonly extension_id: string;
  constructor(tag: string, extension_id: string, detail: string) {
    super(`failed to load module for '${tag}' from '${extension_id}': ${detail}`);
    this.tag = tag;
    this.extension_id = extension_id;
    this.name = "LoadFailedError";
  }
}

export class RegisterFailedError extends Error {
  readonly reason = "register_failed" as const;
  readonly tag: string;
  readonly extension_id: string;
  constructor(tag: string, extension_id: string, detail: string) {
    super(`register() threw for '${tag}' in '${extension_id}': ${detail}`);
    this.tag = tag;
    this.extension_id = extension_id;
    this.name = "RegisterFailedError";
  }
}

export type ExtensionUiError =
  | UnknownTagError
  | LoadFailedError
  | RegisterFailedError;

export function isExtensionUiError(err: unknown): err is ExtensionUiError {
  return (
    err instanceof UnknownTagError ||
    err instanceof LoadFailedError ||
    err instanceof RegisterFailedError
  );
}
