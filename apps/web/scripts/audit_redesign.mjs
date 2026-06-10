// Spec 037 / Phase 10 / T092 — full implementation.
//
// Plain Node 20+ ESM (no transpiler runtime). Six checks per
// `specs/037-spectral-graphite-redesign/contracts/audit_script.cli.md`:
// hex, px, filler, contrast, boundary, io-boundary.
//
// Designed for testability: each check is a pure function over
// `{ filePath, contents }` records. The CLI orchestration (argv parse,
// file globbing, stdout) wraps the pure layer.

import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "tinyglobby";
import { parse as parseColor, converter } from "culori";

const HERE = dirname(fileURLToPath(import.meta.url));
const APPS_WEB_ROOT = resolve(HERE, "..");
const REPO_ROOT = resolve(APPS_WEB_ROOT, "..", "..");

export const VERSION = "1.0.0";

export const CHECK_NAMES = ["hex", "px", "filler", "contrast", "boundary", "io-boundary"];

// ─── Annotation parser ────────────────────────────────────────────────
// `// audit-allow: <check> — <reason ≥ 8 chars>` on the line itself or
// the line immediately preceding the suspect literal.
//
// Separator alternation (em-dash OR ascii hyphen) is written as
// alternation (NOT a character class) so adding a third separator never
// silently produces a malformed range.
const ANNOTATION_RE = /\/\/\s*audit-allow:\s*([a-z-]+)\s*(?:—|-)\s*(.{8,})/;

export function parseAnnotation(line) {
  const m = line.match(ANNOTATION_RE);
  if (!m) return null;
  return { check: m[1], reason: m[2].trim() };
}

export function isLineSuppressed(lines, idx, check) {
  const own = parseAnnotation(lines[idx] ?? "");
  if (own && own.check === check) return true;
  const prev = parseAnnotation(lines[idx - 1] ?? "");
  if (prev && prev.check === check) return true;
  return false;
}

// Each check returns `{ findings, exceptions }` per the CLI contract:
//   findings: un-suppressed locations (hard signal)
//   exceptions: suppressed locations carrying the annotation reason
// The orchestrator merges these into the report envelope so reviewers
// see "Accepted exceptions" in the PR comment.

function annotationReason(lines, idx, check) {
  const own = parseAnnotation(lines[idx] ?? "");
  if (own && own.check === check) return own.reason;
  const prev = parseAnnotation(lines[idx - 1] ?? "");
  if (prev && prev.check === check) return prev.reason;
  return null;
}

// ─── HEX check ────────────────────────────────────────────────────────
// Negative lookahead `(?![0-9a-fA-F])` (instead of `\b`) ensures a
// 6-char hex literal embedded in a longer alphanumeric token is not
// silently truncated and missed.
const HEX_RE = /#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])/g;

export function checkHex(filePath, contents) {
  if (isTokenFile(filePath)) return { findings: [], exceptions: [] };
  const findings = [];
  const exceptions = [];
  const lines = contents.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    HEX_RE.lastIndex = 0;
    let m;
    while ((m = HEX_RE.exec(line)) !== null) {
      const len = m[0].length - 1;
      if (![3, 4, 6, 8].includes(len)) continue;
      const after = line.charAt(m.index + m[0].length);
      if (after !== "" && !"\";,) \t".includes(after)) continue;
      const reason = annotationReason(lines, i, "hex");
      if (reason !== null) {
        exceptions.push({
          check: "hex",
          file: filePath,
          line: i + 1,
          match: m[0],
          reason,
        });
        continue;
      }
      findings.push({
        check: "hex",
        file: filePath,
        line: i + 1,
        match: m[0],
        reason: null,
      });
    }
  }
  return { findings, exceptions };
}

// ─── PX check ─────────────────────────────────────────────────────────
const PX_RE = /\b(\d+)px\b/g;
const ALLOWED_PX = new Set(["1", "64"]);

export function checkPx(filePath, contents) {
  if (isTokenFile(filePath) || isDensityFile(filePath)) {
    return { findings: [], exceptions: [] };
  }
  const findings = [];
  const exceptions = [];
  const lines = contents.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    PX_RE.lastIndex = 0;
    let m;
    while ((m = PX_RE.exec(line)) !== null) {
      if (ALLOWED_PX.has(m[1])) continue;
      const reason = annotationReason(lines, i, "px");
      if (reason !== null) {
        exceptions.push({
          check: "px",
          file: filePath,
          line: i + 1,
          match: m[0],
          reason,
        });
        continue;
      }
      findings.push({
        check: "px",
        file: filePath,
        line: i + 1,
        match: m[0],
        reason: null,
      });
    }
  }
  return { findings, exceptions };
}

// ─── FILLER check ─────────────────────────────────────────────────────
// Short tokens (< 4 chars, e.g. "JK") require word-boundary anchoring so
// they don't substring-match arbitrary identifiers. Longer tokens use
// occurrence-counting so semantics match the regex-based hex/px checks
// (one finding per occurrence, not per line).
const SHORT_FILLER_THRESHOLD = 4;
const FILLER_REGEX_CACHE = new Map();

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function fillerOccurrences(line, filler) {
  if (filler.length < SHORT_FILLER_THRESHOLD) {
    let re = FILLER_REGEX_CACHE.get(filler);
    if (!re) {
      re = new RegExp(`\\b${escapeRegex(filler)}\\b`, "g");
      FILLER_REGEX_CACHE.set(filler, re);
    }
    re.lastIndex = 0;
    return (line.match(re) ?? []).length;
  }
  let count = 0;
  let start = 0;
  while (true) {
    const idx = line.indexOf(filler, start);
    if (idx === -1) break;
    count += 1;
    start = idx + filler.length;
  }
  return count;
}

export function checkFiller(filePath, contents, dictionary) {
  if (!isFillerScopedFile(filePath)) return { findings: [], exceptions: [] };
  const findings = [];
  const exceptions = [];
  const lines = contents.split("\n");
  const allFillers = collectFillers(dictionary);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const reason = annotationReason(lines, i, "filler");
    for (const filler of allFillers) {
      const n = fillerOccurrences(line, filler);
      if (n === 0) continue;
      const target = reason !== null ? exceptions : findings;
      for (let k = 0; k < n; k += 1) {
        target.push({
          check: "filler",
          file: filePath,
          line: i + 1,
          match: filler,
          reason: reason ?? null,
        });
      }
    }
  }
  return { findings, exceptions };
}

function collectFillers(dictionary) {
  const out = [];
  for (const key of Object.keys(dictionary)) {
    if (key.startsWith("$")) continue;
    const value = dictionary[key];
    if (Array.isArray(value)) out.push(...value);
  }
  return out;
}

// ─── BOUNDARY check ───────────────────────────────────────────────────
// Sorted longest-first so a fully-qualified id (`nexus.local-llm`) is
// matched as one finding, not double-counted with its short alias
// (`local-llm`). Per-line consumed-range tracking enforces the no-overlap
// rule.
const BANNED_EXTENSION_LITERALS = [
  "nexus.audio.emotiontts",
  "nexus.local-llm",
  "emotion-tts",
  "emotiontts",
  "local-llm",
  "local_llm",
];

function findFirstNonOverlapping(line, needle, consumed) {
  let start = 0;
  while (start <= line.length - needle.length) {
    const idx = line.indexOf(needle, start);
    if (idx === -1) return -1;
    const end = idx + needle.length;
    const overlap = consumed.some(([a, b]) => idx < b && end > a);
    if (!overlap) return idx;
    start = idx + 1;
  }
  return -1;
}

export function checkBoundary(filePath, contents) {
  if (isExtensionScopedHostFile(filePath)) return { findings: [], exceptions: [] };
  const findings = [];
  const exceptions = [];
  const lines = contents.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const reason = annotationReason(lines, i, "boundary");
    const consumed = [];
    for (const literal of BANNED_EXTENSION_LITERALS) {
      let idx = findFirstNonOverlapping(line, literal, consumed);
      while (idx !== -1) {
        consumed.push([idx, idx + literal.length]);
        const target = reason !== null ? exceptions : findings;
        target.push({
          check: "boundary",
          file: filePath,
          line: i + 1,
          match: literal,
          reason: reason ?? null,
        });
        idx = findFirstNonOverlapping(line, literal, consumed);
      }
    }
  }
  return { findings, exceptions };
}

// ─── IO-BOUNDARY check ────────────────────────────────────────────────
const IO_PATTERNS = [
  { name: "fetch", re: /\bfetch\s*\(/g },
  { name: "EventSource", re: /\bnew\s+EventSource\s*\(/g },
  { name: "WebSocket", re: /\bnew\s+WebSocket\s*\(/g },
];
const SWR_RE = /\buseSWR\s*\(/g;

export function checkIoBoundary(filePath, contents) {
  if (!isIoScopedFile(filePath)) return { findings: [], exceptions: [] };
  if (filePath.endsWith("/component_registry.tsx")) return { findings: [], exceptions: [] };
  const isViewContainer = filePath.endsWith(".view.tsx");
  const findings = [];
  const exceptions = [];
  const lines = contents.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const reason = annotationReason(lines, i, "io-boundary");
    const target = reason !== null ? exceptions : findings;
    for (const { name, re } of IO_PATTERNS) {
      re.lastIndex = 0;
      if (re.test(line)) {
        target.push({
          check: "io-boundary",
          file: filePath,
          line: i + 1,
          match: name,
          reason: reason ?? null,
        });
      }
    }
    if (!isViewContainer) {
      SWR_RE.lastIndex = 0;
      if (SWR_RE.test(line)) {
        target.push({
          check: "io-boundary",
          file: filePath,
          line: i + 1,
          match: "useSWR",
          reason: reason ?? null,
        });
      }
    }
  }
  return { findings, exceptions };
}

// ─── CONTRAST check ───────────────────────────────────────────────────
const TOKEN_VAR_RE = /^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/i;

export function parseTokenDeclarations(cssText) {
  const declared = new Map();
  const lines = cssText.split("\n");
  for (const line of lines) {
    const m = line.match(TOKEN_VAR_RE);
    if (!m) continue;
    declared.set(m[1], m[2].trim());
  }
  return declared;
}

function resolveTokenValue(token, declared, depth = 0) {
  if (depth > 8) return null;
  const raw = declared.get(token);
  if (!raw) return null;
  const refMatch = raw.match(/^var\((--[a-z0-9-]+)(?:,\s*(.+))?\)$/i);
  if (refMatch) {
    const target = resolveTokenValue(refMatch[1], declared, depth + 1);
    if (target) return target;
    if (refMatch[2]) return refMatch[2].trim();
    return null;
  }
  return raw;
}

const toRgb = converter("rgb");

function relativeLuminance(rgb) {
  const channel = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

export function contrastRatio(colorAStr, colorBStr) {
  const a = parseColor(colorAStr);
  const b = parseColor(colorBStr);
  if (!a || !b) return null;
  const ra = toRgb(a);
  const rb = toRgb(b);
  if (!ra || !rb) return null;
  const la = relativeLuminance(ra);
  const lb = relativeLuminance(rb);
  const [bright, dark] = la > lb ? [la, lb] : [lb, la];
  return (bright + 0.05) / (dark + 0.05);
}

export const CONTRAST_PAIRS = [
  { fg: "--on-surface", bg: "--surface", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-surface", bg: "--surface-container", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-surface", bg: "--surface-container-low", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-surface", bg: "--surface-container-high", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-surface", bg: "--surface-container-highest", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-surface-variant", bg: "--surface", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-surface-variant", bg: "--surface-container", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-surface-variant", bg: "--surface-container-highest", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-primary", bg: "--primary", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-secondary-container", bg: "--secondary-container", threshold: 4.5, kind: "normal-text" },
  { fg: "--on-tertiary", bg: "--tertiary", threshold: 4.5, kind: "normal-text" },
];

export function checkContrast(declared) {
  const findings = [];
  for (const pair of CONTRAST_PAIRS) {
    const fgValue = resolveTokenValue(pair.fg, declared);
    const bgValue = resolveTokenValue(pair.bg, declared);
    if (!fgValue || !bgValue) continue;
    const ratio = contrastRatio(fgValue, bgValue);
    if (ratio === null) continue;
    if (ratio + 1e-3 < pair.threshold) {
      findings.push({
        check: "contrast",
        pair: `${pair.fg} against ${pair.bg}`,
        computed: Number(ratio.toFixed(2)),
        threshold: pair.threshold,
        level: "AA",
        kind: pair.kind,
        fgValue,
        bgValue,
      });
    }
  }
  return findings;
}

// ─── File-scope helpers ───────────────────────────────────────────────
export function isTokenFile(filePath) {
  return /(?:^|\/)tokens\//.test(filePath) || /tokens[^/]*\.(css|ts)$/i.test(filePath);
}
export function isDensityFile(filePath) {
  return /density[^/]*\.(css|ts)$/i.test(filePath);
}
export function isFillerScopedFile(filePath) {
  if (filePath.includes(".test.") || filePath.includes("__tests__/")) return false;
  return (
    /apps\/web\/src\/(views|components|layout)\//.test(filePath) ||
    /extensions\/builtin\/[^/]+\/web\/src\/views\//.test(filePath)
  );
}
export function isIoScopedFile(filePath) {
  if (filePath.includes(".test.") || filePath.includes("__tests__/")) return false;
  return /apps\/web\/src\/(views|components)\//.test(filePath);
}
export function isExtensionScopedHostFile(filePath) {
  // Match repo-relative paths regardless of leading slash variation.
  if (/(^|\/)extensions\/builtin\//.test(filePath)) return true;
  if (filePath.includes("apps/web/src/views/extensions/")) return true;
  return false;
}

// ─── Source globbing ──────────────────────────────────────────────────
const SOURCE_INCLUDE = [
  "apps/web/src/**/*.{ts,tsx}",
  "extensions/builtin/*/web/src/**/*.{ts,tsx}",
];
const SOURCE_EXCLUDE = ["**/*.test.*", "**/__tests__/**", "**/node_modules/**"];

/**
 * @param {{ since?: string }} [opts]
 * Returns source files in the audit scope. When `opts.since` is set,
 * intersects the glob result with `git diff --name-only opts.since...HEAD`
 * so CI can scope the audit to changed files only (per FR-051a).
 *
 * Stable lexicographic order so JSON output is diffable across runs.
 */
async function loadSourceFiles(opts = {}) {
  const allFiles = await glob(SOURCE_INCLUDE, {
    cwd: REPO_ROOT,
    ignore: SOURCE_EXCLUDE,
    absolute: false,
  });

  let scoped = allFiles;
  if (opts.since) {
    const changed = gitChangedFiles(opts.since);
    if (changed === null) {
      // Surface the gap explicitly rather than silently scanning everything.
      throw new Error(
        `--since=${opts.since}: git diff failed (not a repo or unknown ref)`,
      );
    }
    const changedSet = new Set(changed);
    scoped = allFiles.filter((p) => changedSet.has(p.replace(/\\/g, "/")));
  }

  scoped.sort();
  return scoped.map((relPath) => {
    const abs = join(REPO_ROOT, relPath);
    const contents = readFileSync(abs, "utf8");
    return { filePath: relPath.replace(/\\/g, "/"), contents };
  });
}

function gitChangedFiles(base) {
  try {
    const out = execFileSync(
      "git",
      ["diff", "--name-only", `${base}...HEAD`],
      { cwd: REPO_ROOT, encoding: "utf8" },
    );
    return out
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return null;
  }
}

function loadFillerDictionary() {
  const dictPath = join(HERE, "audit_redesign.fillers.json");
  if (!existsSync(dictPath)) return {};
  return JSON.parse(readFileSync(dictPath, "utf8"));
}

function loadTokensCss() {
  const tokensPath = join(APPS_WEB_ROOT, "src", "styles", "tokens.css");
  if (!existsSync(tokensPath)) return null;
  return readFileSync(tokensPath, "utf8");
}

// ─── Orchestration ────────────────────────────────────────────────────
/**
 * @param {{ only?: string, since?: string, sources?: Array<{filePath: string, contents: string}>, tokensCss?: string, dictionary?: object }} [opts]
 *   `sources`/`tokensCss`/`dictionary` are optional injection points used
 *   by the integration tests; left undefined, the orchestrator loads
 *   them from disk.
 */
export async function runAudit(opts = {}) {
  const enabled = new Set(opts.only ? [opts.only] : CHECK_NAMES);
  const dictionary = opts.dictionary ?? loadFillerDictionary();
  const sources = opts.sources ?? (await loadSourceFiles({ since: opts.since }));
  const allFindings = [];
  const allExceptions = [];
  const byCheck = Object.fromEntries(
    CHECK_NAMES.map((c) => [c, { findings: 0, exceptions: 0 }]),
  );

  function absorb(check, result) {
    allFindings.push(...result.findings);
    allExceptions.push(...result.exceptions);
    byCheck[check].findings += result.findings.length;
    byCheck[check].exceptions += result.exceptions.length;
  }

  for (const { filePath, contents } of sources) {
    if (enabled.has("hex")) absorb("hex", checkHex(filePath, contents));
    if (enabled.has("px")) absorb("px", checkPx(filePath, contents));
    if (enabled.has("filler")) absorb("filler", checkFiller(filePath, contents, dictionary));
    if (enabled.has("boundary")) absorb("boundary", checkBoundary(filePath, contents));
    if (enabled.has("io-boundary")) absorb("io-boundary", checkIoBoundary(filePath, contents));
  }

  if (enabled.has("contrast")) {
    const tokensCss = opts.tokensCss ?? loadTokensCss();
    if (tokensCss) {
      const declared = parseTokenDeclarations(tokensCss);
      const contrastFindings = checkContrast(declared);
      allFindings.push(...contrastFindings);
      byCheck.contrast.findings += contrastFindings.length;
    }
  }

  return {
    version: VERSION,
    summary: {
      total_findings: allFindings.length,
      accepted_exceptions: allExceptions.length,
      by_check: byCheck,
    },
    findings: allFindings,
    exceptions: allExceptions,
  };
}

// ─── CLI entry ────────────────────────────────────────────────────────
function parseArgs(argv) {
  const opts = { json: false, only: null };
  for (const a of argv) {
    if (a === "--json") opts.json = true;
    else if (a.startsWith("--only=")) opts.only = a.slice("--only=".length);
    else if (a.startsWith("--since=")) opts.since = a.slice("--since=".length);
  }
  if (opts.only && !CHECK_NAMES.includes(opts.only)) {
    process.stderr.write(`unknown --only=${opts.only}; expected one of ${CHECK_NAMES.join(", ")}\n`);
    process.exit(2);
  }
  return opts;
}

function renderHuman(report) {
  const lines = [];
  lines.push(`audit:redesign v${report.version}`);
  lines.push(`Total findings: ${report.summary.total_findings}`);
  for (const check of CHECK_NAMES) {
    const n = report.summary.by_check[check]?.findings ?? 0;
    if (n > 0) lines.push(`  ${check}: ${n}`);
  }
  if (report.findings.length > 0) {
    lines.push("");
    lines.push("Findings:");
    for (const f of report.findings.slice(0, 50)) {
      const loc = f.file ? `${f.file}:${f.line}` : f.pair;
      lines.push(`  [${f.check}] ${loc} — ${f.match ?? f.computed}`);
    }
    if (report.findings.length > 50) {
      lines.push(`  …and ${report.findings.length - 50} more (use --json for the full list)`);
    }
  }
  return lines.join("\n");
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  try {
    const report = await runAudit(opts);
    if (opts.json) {
      process.stdout.write(JSON.stringify(report));
    } else {
      process.stdout.write(renderHuman(report) + "\n");
    }
    process.exit(report.summary.total_findings > 0 ? 1 : 0);
  } catch (err) {
    process.stderr.write(`audit:redesign failed: ${err?.message ?? err}\n`);
    if (err?.stack) process.stderr.write(err.stack + "\n");
    process.exit(2);
  }
}

const isEntryPoint =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isEntryPoint) {
  main();
}

// ─── Test exports ─────────────────────────────────────────────────────
export const __test__ = {
  isTokenFile,
  isDensityFile,
  isFillerScopedFile,
  isIoScopedFile,
  isExtensionScopedHostFile,
  parseAnnotation,
  isLineSuppressed,
  collectFillers,
  resolveTokenValue,
  parseTokenDeclarations,
  contrastRatio,
};
