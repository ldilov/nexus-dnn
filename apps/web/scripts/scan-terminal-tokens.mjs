#!/usr/bin/env node
// Spec 042 US5 (T069) — token-coverage scan for the neo-terminal surface.
//
// Forbids hardcoded color literals (hex, rgb/hsl/oklch), hardcoded *ms durations,
// and hardcoded *px widths/heights/radii in any file under the spec 042 file set:
//
//   apps/web/src/components/blocks/
//   apps/web/src/components/cursor/
//   apps/web/src/components/pulse_floor/
//   apps/web/src/components/runtime/model_load_lattice/
//   apps/web/src/components/titlebar/
//   apps/web/src/styles/tokens/terminal.css.ts
//
// Allowed: token references via `vars.*` or `terminal.*`. Per Constitution XII.8
// the visual system is the single source of truth — any quantity that needs
// tweaking must live in `terminal.css.ts` or the underlying Spectral Graphite
// theme so a single-token edit cascades app-wide (SC-010 from spec 042).
//
// The terminal token group itself is allowlisted as the source-of-truth file.

import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = join(HERE, "..");
const SRC_ROOT = join(WEB_ROOT, "src");

const SCAN_DIRS = [
  join(SRC_ROOT, "components", "blocks"),
  join(SRC_ROOT, "components", "cursor"),
  join(SRC_ROOT, "components", "pulse_floor"),
  join(SRC_ROOT, "components", "runtime", "model_load_lattice"),
  join(SRC_ROOT, "components", "titlebar"),
];

const SCAN_FILES = [
  join(SRC_ROOT, "styles", "tokens", "terminal.css.ts"),
];

const SOURCE_OF_TRUTH = new Set([
  relative(WEB_ROOT, join(SRC_ROOT, "styles", "tokens", "terminal.css.ts"))
    .replaceAll("\\", "/"),
]);

const INCLUDE_EXTS = [".tsx", ".ts", ".css.ts", ".css"];

const RE = {
  hex: /#[0-9a-fA-F]{3,8}\b/g,
  rgb: /\brgb(a)?\s*\(/g,
  hsl: /\bhsl(a)?\s*\(/g,
  oklch: /\boklch\s*\(/g,
  duration: /(?<![\w-])\d{2,4}ms\b/g,
  pxDim: /(?<![\w-])\d{1,4}px\b/g,
};

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err && err.code === "ENOENT") return out;
    throw err;
  }
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

function shouldInclude(path) {
  if (path.endsWith(".test.tsx") || path.endsWith(".test.ts")) return false;
  return INCLUDE_EXTS.some((ext) => path.endsWith(ext));
}

function stripComments(src) {
  const noBlock = src.replace(/\/\*[\s\S]*?\*\//g, "");
  return noBlock
    .split(/\r?\n/)
    .map((line) => line.replace(/\/\/.*$/, ""))
    .join("\n");
}

async function main() {
  const seen = new Set();
  const targets = [];

  for (const dir of SCAN_DIRS) {
    const found = await walk(dir);
    for (const f of found) {
      if (!shouldInclude(f)) continue;
      if (seen.has(f)) continue;
      seen.add(f);
      targets.push(f);
    }
  }
  for (const f of SCAN_FILES) {
    if (!seen.has(f)) {
      seen.add(f);
      targets.push(f);
    }
  }

  const failures = [];
  for (const f of targets) {
    const rel = relative(WEB_ROOT, f).replaceAll("\\", "/");
    const isSourceOfTruth = SOURCE_OF_TRUTH.has(rel);
    const src = await readFile(f, "utf8");
    const stripped = stripComments(src);
    for (const [name, re] of Object.entries(RE)) {
      re.lastIndex = 0;
      const matches = stripped.match(re);
      if (!matches || matches.length === 0) continue;
      if (isSourceOfTruth) continue;
      failures.push({
        file: rel,
        rule: name,
        samples: Array.from(new Set(matches)).slice(0, 4),
      });
    }
  }

  if (failures.length) {
    console.error("\n✗ scan-terminal-tokens FAILED — hardcoded values detected in spec 042 surface:\n");
    for (const { file, rule, samples } of failures) {
      console.error(`  ${file}  [${rule}]  ${samples.join(" ")}`);
    }
    console.error(
      "\nReplace with token references: vars.* (Spectral Graphite primitives) " +
        "or terminal.* (semantic role tokens in apps/web/src/styles/tokens/terminal.css.ts).\n",
    );
    process.exit(1);
  }

  console.log(`✓ scan-terminal-tokens: ${targets.length} files clean.`);
}

main().catch((err) => {
  console.error("scan-terminal-tokens crashed:", err);
  process.exit(2);
});
