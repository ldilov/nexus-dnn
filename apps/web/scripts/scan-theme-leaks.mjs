#!/usr/bin/env node
// Spec 019 SC-007: fail the build if any component file under apps/web/src/
// (excluding the styles/ token surface) contains a hex color literal,
// rgb/hsl/oklch literal, font-family string literal, or raw duration value.
//
// Allowlist carve-outs:
// - apps/web/src/styles/**       : the single source of truth
// - apps/web/src/**/*.test.tsx   : tests may assert on raw literals
// - apps/web/src/**/*.test.ts    : tests may assert on raw literals
// - anything inside a JSX comment that begins with "scan-theme-leaks: allow"

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = join(HERE, "..");
const SRC_ROOT = join(WEB_ROOT, "src");

// Minimal dependency-free recursive glob (no new deps).
async function walk(dir) {
  const { readdir, stat } = await import("node:fs/promises");
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
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

async function loadBaseline() {
  try {
    const src = await readFile(
      join(HERE, ".theme-leaks-baseline.txt"),
      "utf8",
    );
    return new Set(
      src
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#")),
    );
  } catch {
    return new Set();
  }
}

function isExcluded(path, baseline) {
  const rel = relative(WEB_ROOT, path).replaceAll("\\", "/");
  if (rel.startsWith("src/styles/")) return true;
  if (rel.endsWith(".test.tsx") || rel.endsWith(".test.ts")) return true;
  if (rel.startsWith("tests/")) return true;
  if (rel.startsWith("fixtures/")) return true;
  if (baseline.has(rel)) return true;
  return false;
}

const RE = {
  hex: /#[0-9a-fA-F]{3,8}\b/g,
  rgb: /\brgb(a)?\s*\(/g,
  hsl: /\bhsl(a)?\s*\(/g,
  oklch: /\boklch\s*\(/g,
  font: /'Inter'|'JetBrains Mono'/g,
  duration: /(?<![\w-])\d{2,4}ms\b/g,
};

const INCLUDE_EXTS = [".tsx", ".ts", ".css.ts", ".css"];

async function main() {
  const baseline = await loadBaseline();
  const files = (await walk(SRC_ROOT))
    .filter((f) => INCLUDE_EXTS.some((ext) => f.endsWith(ext)))
    .filter((f) => !isExcluded(f, baseline));

  let failures = [];
  for (const f of files) {
    const src = await readFile(f, "utf8");
    for (const [name, re] of Object.entries(RE)) {
      // Reset regex lastIndex for safety.
      re.lastIndex = 0;
      const matches = src.match(re);
      if (matches && matches.length > 0) {
        failures.push({
          file: relative(WEB_ROOT, f).replaceAll("\\", "/"),
          rule: name,
          samples: Array.from(new Set(matches)).slice(0, 3),
        });
      }
    }
  }

  if (failures.length) {
    console.error("\n✗ scan-theme-leaks FAILED — token leaks detected:\n");
    for (const { file, rule, samples } of failures) {
      console.error(`  ${file}  [${rule}]  ${samples.join(" ")}`);
    }
    console.error(
      "\nMove these values into apps/web/src/styles/theme.css.ts or motion.css.ts" +
        " (or add the file to the scanner allowlist if it is a test).\n"
    );
    process.exit(1);
  }

  console.log(`✓ scan-theme-leaks: ${files.length} files clean.`);
}

main().catch((err) => {
  console.error("scan-theme-leaks crashed:", err);
  process.exit(2);
});
