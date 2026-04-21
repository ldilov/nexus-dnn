#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..", "..");

const registryTsx = resolve(
  repoRoot,
  "apps/web/src/layout/component_registry.tsx",
);
const allowlistJson = resolve(
  repoRoot,
  "apps/web/scripts/scan-components.allowlist.json",
);
const rustCatalog = resolve(
  repoRoot,
  "crates/nexus-api/src/handlers/ui_components.rs",
);

function readSet(filePath, extractor) {
  const contents = readFileSync(filePath, "utf8");
  return new Set(extractor(contents));
}

function extractTsxNames(src) {
  const out = new Set();
  const re = /^\s+([a-z][a-z0-9_]*):\s*\(_?node/gm;
  let m;
  while ((m = re.exec(src)) !== null) {
    out.add(m[1]);
  }
  return [...out];
}

function extractAllowlistNames(src) {
  const parsed = JSON.parse(src);
  return Array.isArray(parsed.components) ? parsed.components : [];
}

function extractRustNames(src) {
  const marker = "pub fn catalog_entries()";
  const start = src.indexOf(marker);
  if (start === -1) {
    throw new Error(`catalog_entries() not found in ${rustCatalog}`);
  }
  const testMarker = "#[cfg(test)]";
  const end = src.indexOf(testMarker, start);
  const region = src.slice(start, end === -1 ? undefined : end);
  const out = new Set();
  const re = /meta\(\s*"([a-z][a-z0-9_]*)"/g;
  let m;
  while ((m = re.exec(region)) !== null) {
    out.add(m[1]);
  }
  return [...out];
}

function diff(a, b) {
  const missing = [...a].filter((x) => !b.has(x)).sort();
  return missing;
}

function main() {
  const tsx = readSet(registryTsx, extractTsxNames);
  const allowlist = readSet(allowlistJson, extractAllowlistNames);
  const rust = readSet(rustCatalog, extractRustNames);

  const problems = [];

  const tsxMinusAllowlist = diff(tsx, allowlist);
  if (tsxMinusAllowlist.length) {
    problems.push(
      `Registered in component_registry.tsx but missing from allowlist: ${tsxMinusAllowlist.join(", ")}`,
    );
  }
  const allowlistMinusTsx = diff(allowlist, tsx);
  if (allowlistMinusTsx.length) {
    problems.push(
      `In allowlist but not registered in component_registry.tsx: ${allowlistMinusTsx.join(", ")}`,
    );
  }
  const tsxMinusRust = diff(tsx, rust);
  if (tsxMinusRust.length) {
    problems.push(
      `Registered in component_registry.tsx but missing from Rust catalog (crates/nexus-api/src/handlers/ui_components.rs): ${tsxMinusRust.join(", ")}`,
    );
  }
  const rustMinusTsx = diff(rust, tsx);
  if (rustMinusTsx.length) {
    problems.push(
      `Published in Rust catalog but not registered in component_registry.tsx: ${rustMinusTsx.join(", ")}`,
    );
  }

  if (problems.length) {
    console.error("scan:components FAILED");
    for (const p of problems) console.error("  - " + p);
    process.exit(1);
  }

  console.log(
    `scan:components OK — ${tsx.size} components in sync (tsx ↔ allowlist ↔ rust)`,
  );
  process.exit(0);
}

main();
