#!/usr/bin/env node
// Spec 019 SC-014 / FR-T01..T04: fail the build if any visible JSX label
// or aria-label / title / alt attribute uses the word "Deployment" /
// "deployment". API types, URL strings, fixture data, and test files are
// explicitly allowed — only the visible-UI surface is gated.
//
// This is a deliberately-simple pattern-scanner — it errs on the side of
// false positives, which are easy to silence by moving copy into a
// constant file under src/i18n/ or marking the line with a trailing
// `// scan-terminology: allow` comment.

import { readFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = join(HERE, "..");
const SRC_ROOT = join(WEB_ROOT, "src");

async function walk(dir) {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".vite" || e.name === "dist") continue;
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

function isExcluded(path) {
  const rel = relative(WEB_ROOT, path).replaceAll("\\", "/");
  if (rel.startsWith("src/api/")) return true; // API types
  if (rel.includes(".test.")) return true;
  if (rel.startsWith("tests/")) return true;
  if (rel.startsWith("fixtures/")) return true;
  return false;
}

// Match "Deployment" / "Deployments" / "deployment" / "deployments" appearing
// as a JSX text child or as a quoted value of aria-label/title/alt/placeholder.
const RE_JSX_TEXT = />[^<>]*\bDeployments?\b[^<>]*</g;
const RE_JSX_TEXT_LOWER = />[^<>]*\bdeployments?\b[^<>]*</g;
const RE_ARIA = /(?:aria-label|title|alt|placeholder)\s*=\s*["'][^"']*\bdeployments?\b[^"']*["']/gi;

// Allowed: the sidebar item itself is canonically labeled "Deployments" in
// this repo (a deliberate carve-out — the flat list view stays that name).
// A line containing `// scan-terminology: allow` anywhere silences the rule.
const ALLOW_MARKER = /scan-terminology:\s*allow/;
const SIDEBAR_ITEM = /id:\s*["']deployments["'],\s*label:\s*["']Deployments["']/;

async function main() {
  const files = (await walk(SRC_ROOT))
    .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
    .filter((f) => !isExcluded(f));

  const failures = [];
  for (const f of files) {
    const src = await readFile(f, "utf8");
    const lines = src.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const prev = i > 0 ? lines[i - 1] : "";
      const next = i < lines.length - 1 ? lines[i + 1] : "";
      if (
        ALLOW_MARKER.test(line) ||
        ALLOW_MARKER.test(prev) ||
        ALLOW_MARKER.test(next)
      )
        continue;
      if (SIDEBAR_ITEM.test(line)) continue;
      const text = line.match(RE_JSX_TEXT) || line.match(RE_JSX_TEXT_LOWER);
      const aria = line.match(RE_ARIA);
      if (text || aria) {
        failures.push({
          file: relative(WEB_ROOT, f).replaceAll("\\", "/"),
          line: i + 1,
          snippet: line.trim().slice(0, 120),
        });
      }
    }
  }

  if (failures.length) {
    console.error("\n✗ scan-terminology FAILED — visible label uses 'Deployment':\n");
    for (const { file, line, snippet } of failures) {
      console.error(`  ${file}:${line}  ${snippet}`);
    }
    console.error(
      "\nUse 'Instance' in visible UI copy per FR-T01. Data layer keeps" +
        " 'deployment' unchanged. Silence false positives with" +
        " `// scan-terminology: allow` on the offending line.\n"
    );
    process.exit(1);
  }

  console.log(`✓ scan-terminology: ${files.length} files clean.`);
}

main().catch((err) => {
  console.error("scan-terminology crashed:", err);
  process.exit(2);
});
