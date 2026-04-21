import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..", "..", "..");
const registryPath = resolve(
  repoRoot,
  "apps/web/src/layout/component_registry.tsx",
);
const allowlistPath = resolve(
  repoRoot,
  "apps/web/scripts/scan-components.allowlist.json",
);

function extractRegistryKeys(): Set<string> {
  const src = readFileSync(registryPath, "utf8");
  const re = /^\s+([a-z][a-z0-9_]*):\s*\(_?node/gm;
  const out = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const key = m[1];
    if (key) out.add(key);
  }
  return out;
}

function loadAllowlist(): Set<string> {
  const parsed = JSON.parse(readFileSync(allowlistPath, "utf8")) as {
    components: string[];
  };
  return new Set(parsed.components);
}

describe("component_registry", () => {
  it("every registered key appears in the allowlist", () => {
    const registry = extractRegistryKeys();
    const allowlist = loadAllowlist();
    const missing = [...registry].filter((k) => !allowlist.has(k)).sort();
    expect(missing, "keys in registry but not allowlist").toEqual([]);
  });

  it("every allowlist entry is actually registered", () => {
    const registry = extractRegistryKeys();
    const allowlist = loadAllowlist();
    const extra = [...allowlist].filter((k) => !registry.has(k)).sort();
    expect(extra, "keys in allowlist but not registry").toEqual([]);
  });

  it("registers the expected number of components", () => {
    expect(extractRegistryKeys().size).toBe(32);
  });
});
