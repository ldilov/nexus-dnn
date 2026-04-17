#!/usr/bin/env node
// Spec 020 SC-Q1-02: fail the build if any file under apps/web/src/views/
// or apps/web/src/backends/ defines a handler named `noop` or assigns
// handler props to an inline `() => {}` body.
//
// Rationale: spec 020 removed the `noop` shim from backends_view.tsx in
// favor of real handlers. This scan prevents silent regressions where a
// future edit re-introduces a placeholder CTA handler.
//
// Allowlist carve-outs:
// - any line preceded by a comment `// scan-noop: allow`
// - test files (*.test.ts, *.test.tsx)

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = join(HERE, "..");
const SRC_ROOT = join(WEB_ROOT, "src");

const SCAN_DIRS = [join(SRC_ROOT, "views"), join(SRC_ROOT, "backends")];

const PATTERNS = [
  { name: "noop function declaration", re: /\bfunction\s+noop\s*\(/g },
  { name: "noop const arrow", re: /\bconst\s+noop\s*=\s*\(/g },
  { name: "inline empty handler prop", re: /\bon[A-Z]\w+\s*=\s*\{\s*\(\s*\)\s*=>\s*\{\s*\}\s*\}/g },
];

async function walk(dir) {
  const { readdir } = await import("node:fs/promises");
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
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

function isTestFile(path) {
  return /\.test\.tsx?$/.test(path);
}

function isAllowed(content, matchIndex) {
  const before = content.slice(0, matchIndex);
  const newlineIdx = before.lastIndexOf("\n");
  const prevLine = newlineIdx >= 0 ? before.slice(newlineIdx + 1) : before;
  return /scan-noop:\s*allow/.test(prevLine);
}

async function main() {
  const files = (
    await Promise.all(SCAN_DIRS.map((d) => walk(d)))
  )
    .flat()
    .filter((f) => /\.tsx?$/.test(f) && !isTestFile(f));

  const offenders = [];
  for (const file of files) {
    const content = await readFile(file, "utf8");
    for (const { name, re } of PATTERNS) {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(content)) !== null) {
        if (isAllowed(content, match.index)) continue;
        const lineNumber = content.slice(0, match.index).split(/\n/).length;
        offenders.push({
          file: relative(WEB_ROOT, file),
          line: lineNumber,
          pattern: name,
          snippet: match[0],
        });
      }
    }
  }

  if (offenders.length === 0) {
    console.log("scan:noop — ok (no placeholder handlers in views/ or backends/)");
    return;
  }

  console.error("scan:noop — FAILED");
  console.error("Spec 020 SC-Q1-02 forbids noop handlers in Backends surfaces.");
  console.error("");
  for (const o of offenders) {
    console.error(`  ${o.file}:${o.line}  ${o.pattern}  '${o.snippet}'`);
  }
  console.error("");
  console.error(
    "If this is intentional, add '// scan-noop: allow' on the line above.",
  );
  process.exit(1);
}

await main();
