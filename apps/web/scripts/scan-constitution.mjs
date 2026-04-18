#!/usr/bin/env node
/**
 * scan-constitution — enforces constitution v1.2.0 Principle XII and Appendix F
 * on every file under apps/web/src/. Exits 0 on clean, 2 on violation, 1 on
 * scanner error. Rules SR-001..SR-009 are documented in
 * specs/021-web-architecture-refactor/contracts/scan-constitution.contract.md.
 */

import { readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, relative, basename, extname } from "node:path";
import { parse as parseTS } from "@typescript-eslint/typescript-estree";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = join(HERE, "..");
const SRC_ROOT = join(WEB_ROOT, "src");
const BASELINE_PATH = join(HERE, "scan-constitution-baseline.json");

const EXIT_CLEAN = 0;
const EXIT_SCANNER_ERROR = 1;
const EXIT_VIOLATION = 2;

const argv = process.argv.slice(2);
const FLAG_BASELINE = argv.includes("--baseline");
const FLAG_HINTS = argv.includes("--fix-suggestions");

const EXCLUDED_DIRS = new Set([
  "node_modules",
  ".vite",
  "dist",
  "build",
  "coverage",
]);

const EXCLUDED_REL_PREFIXES = [
  "api/generated",
];

const DEDUP_EXEMPT_BASENAMES = new Set([
  "index.ts",
  "index.tsx",
  "types.ts",
  "constants.ts",
  "styles.css.ts",
  "utils.ts",
]);

const VIEW_SUFFIX = ".view.tsx";

const RULES = [
  {
    id: "SR-001",
    clause: "Appendix F",
    description: "`framer-motion` import forbidden",
    hint: "Change to `import { ... } from \"motion/react\"`",
    kind: "ast",
    check: (ast, src) => scanImports(ast, "framer-motion"),
  },
  {
    id: "SR-002",
    clause: "Appendix F + R-10",
    description: "`react-router-dom` source import forbidden",
    hint: "Change to `import ... from \"react-router\"`",
    kind: "ast",
    check: (ast, src) => scanImports(ast, "react-router-dom"),
  },
  {
    id: "SR-003",
    clause: "Principle XII.3",
    description: "Legacy declarative router element forbidden outside routes.ts",
    hint: "Move the route into src/routes.ts as a route object",
    kind: "ast",
    check: (ast, src, relPath) => {
      if (relPath === "routes.ts" || relPath.endsWith("/routes.ts")) return [];
      return scanJsxElementNames(ast, ["BrowserRouter", "HashRouter", "Routes", "Route"]);
    },
  },
  {
    id: "SR-004",
    clause: "Principle XII.4",
    description: "useEffect with fetch/.then call forbidden; use a route loader",
    hint: "Move data fetch into a route loader in src/routes.ts",
    kind: "ast",
    check: (ast, src) => scanUseEffectWithIO(ast),
  },
  {
    id: "SR-005",
    clause: "Principle XII.4",
    description:
      "fetch/WebSocket/EventSource construction outside src/services/",
    hint: "Wrap the call in a services/ module and import the wrapper",
    kind: "ast",
    check: (ast, src, relPath) => {
      if (
        relPath.startsWith("services/") ||
        relPath.startsWith("api/generated/") ||
        relPath.startsWith("service-workers/")
      ) {
        return [];
      }
      return scanRawIO(ast);
    },
  },
  {
    id: "SR-006",
    clause: "Principle XII.7",
    description: "Duplicate component filename under src/",
    hint: "Rename one or merge the two files",
    kind: "global",
  },
  {
    id: "SR-007",
    clause: "Principle XII.2",
    description:
      ".view.tsx must have a single PascalCase JSX root (no <div>/<section>/layout wrappers)",
    hint: "Extract the markup into the matching .ui.tsx",
    kind: "ast",
    check: (ast, src, relPath) => {
      if (!relPath.endsWith(VIEW_SUFFIX)) return [];
      return scanViewFileRoots(ast);
    },
  },
  {
    id: "SR-008",
    clause: "Principle XII.7",
    description: "Barrel re-export chain deeper than one level",
    hint: "Flatten the barrel chain — import from the leaf directly",
    kind: "ast",
    check: (ast, src, relPath) => scanBarrelChains(ast, relPath),
  },
  {
    id: "SR-009",
    clause: "Principle XII.5",
    description: "Static inline style={{...}} forbidden; use vanilla-extract + theme tokens",
    hint: "Move the style into the sibling *.css.ts file using tokens from src/theme/",
    kind: "ast",
    check: (ast, src) => scanStaticInlineStyles(ast),
  },
];

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (EXCLUDED_DIRS.has(e.name)) continue;
      out.push(...(await walk(full)));
      continue;
    }
    const ext = extname(e.name);
    if (ext !== ".ts" && ext !== ".tsx") continue;
    if (e.name.endsWith(".d.ts")) continue;
    if (e.name.endsWith(".test.ts") || e.name.endsWith(".test.tsx")) continue;
    if (e.name.endsWith(".spec.ts") || e.name.endsWith(".spec.tsx")) continue;
    out.push(full);
  }
  return out;
}

function relSrcPath(absPath) {
  return relative(SRC_ROOT, absPath).replaceAll("\\", "/");
}

function isExcluded(relPath) {
  return EXCLUDED_REL_PREFIXES.some((prefix) => relPath.startsWith(prefix));
}

function parseOrNull(src) {
  try {
    return parseTS(src, {
      jsx: true,
      loc: true,
      range: false,
      tokens: false,
      errorOnUnknownASTType: false,
      loggerFn: false,
    });
  } catch {
    return null;
  }
}

function scanImports(ast, moduleName) {
  const out = [];
  for (const node of ast.body ?? []) {
    if (node.type !== "ImportDeclaration") continue;
    if (node.source?.value === moduleName) {
      out.push({ line: node.loc.start.line, col: node.loc.start.column + 1 });
    }
  }
  return out;
}

function scanJsxElementNames(ast, names) {
  const out = [];
  const needle = new Set(names);
  walkAST(ast, (node) => {
    if (node.type !== "JSXOpeningElement") return;
    const id = node.name;
    if (id?.type === "JSXIdentifier" && needle.has(id.name)) {
      out.push({ line: node.loc.start.line, col: node.loc.start.column + 1, extra: id.name });
    }
  });
  return out;
}

function scanUseEffectWithIO(ast) {
  const out = [];
  walkAST(ast, (node) => {
    if (node.type !== "CallExpression") return;
    const callee = node.callee;
    const name =
      callee?.type === "Identifier"
        ? callee.name
        : callee?.type === "MemberExpression" && callee.property?.type === "Identifier"
          ? callee.property.name
          : null;
    if (name !== "useEffect") return;
    const effectBody = node.arguments?.[0];
    if (!effectBody) return;
    let hasIO = false;
    walkAST(effectBody, (inner) => {
      if (hasIO) return;
      if (inner.type === "CallExpression") {
        const c = inner.callee;
        if (c?.type === "Identifier" && c.name === "fetch") hasIO = true;
        if (
          c?.type === "MemberExpression" &&
          c.property?.type === "Identifier" &&
          c.property.name === "then"
        ) {
          hasIO = true;
        }
      }
      if (inner.type === "NewExpression") {
        const c = inner.callee;
        if (c?.type === "Identifier" && (c.name === "WebSocket" || c.name === "EventSource")) {
          hasIO = true;
        }
      }
    });
    if (hasIO) {
      out.push({ line: node.loc.start.line, col: node.loc.start.column + 1 });
    }
  });
  return out;
}

function scanRawIO(ast) {
  const out = [];
  walkAST(ast, (node) => {
    if (node.type === "CallExpression") {
      const c = node.callee;
      if (c?.type === "Identifier" && c.name === "fetch") {
        out.push({ line: node.loc.start.line, col: node.loc.start.column + 1, extra: "fetch" });
      }
    }
    if (node.type === "NewExpression") {
      const c = node.callee;
      if (c?.type === "Identifier" && (c.name === "WebSocket" || c.name === "EventSource")) {
        out.push({ line: node.loc.start.line, col: node.loc.start.column + 1, extra: c.name });
      }
    }
  });
  return out;
}

function scanViewFileRoots(ast) {
  const out = [];
  const exportDefaultFns = [];
  const namedExports = new Map();
  for (const node of ast.body ?? []) {
    if (node.type === "ExportDefaultDeclaration") {
      exportDefaultFns.push(node.declaration);
    }
    if (node.type === "ExportNamedDeclaration" && node.declaration) {
      if (node.declaration.type === "FunctionDeclaration" && node.declaration.id) {
        namedExports.set(node.declaration.id.name, node.declaration);
      }
      if (node.declaration.type === "VariableDeclaration") {
        for (const decl of node.declaration.declarations) {
          if (decl.id?.type === "Identifier") {
            namedExports.set(decl.id.name, decl.init);
          }
        }
      }
    }
  }
  const candidates = [...exportDefaultFns, ...namedExports.values()].filter(Boolean);
  for (const fn of candidates) {
    const roots = collectReturnedJsxRoots(fn);
    for (const root of roots) {
      if (root.multiple) {
        out.push({ line: root.line, col: root.col, extra: "multiple JSX roots" });
        continue;
      }
      if (root.tagName && !/^[A-Z]/.test(root.tagName)) {
        out.push({ line: root.line, col: root.col, extra: `root <${root.tagName}> is not a PascalCase component` });
      }
    }
  }
  return out;
}

function collectReturnedJsxRoots(fn) {
  const out = [];
  if (!fn) return out;
  let body = fn;
  if (fn.type === "ArrowFunctionExpression" || fn.type === "FunctionExpression" || fn.type === "FunctionDeclaration") {
    body = fn.body;
  }
  if (!body) return out;
  if (body.type === "JSXElement" || body.type === "JSXFragment") {
    pushJsxRoot(out, body);
    return out;
  }
  walkAST(body, (node) => {
    if (node.type !== "ReturnStatement") return;
    const arg = node.argument;
    if (!arg) return;
    pushJsxRoot(out, arg);
  });
  return out;
}

function pushJsxRoot(out, arg) {
  if (arg.type === "JSXElement") {
    const tagName = extractJsxName(arg.openingElement?.name);
    out.push({
      line: arg.loc.start.line,
      col: arg.loc.start.column + 1,
      tagName,
    });
    return;
  }
  if (arg.type === "JSXFragment") {
    const children = (arg.children ?? []).filter(
      (c) => c.type === "JSXElement" || c.type === "JSXFragment",
    );
    if (children.length > 1) {
      out.push({
        line: arg.loc.start.line,
        col: arg.loc.start.column + 1,
        multiple: true,
      });
    }
  }
}

function extractJsxName(name) {
  if (!name) return null;
  if (name.type === "JSXIdentifier") return name.name;
  if (name.type === "JSXMemberExpression") {
    const parts = [];
    let cur = name;
    while (cur.type === "JSXMemberExpression") {
      parts.unshift(cur.property.name);
      cur = cur.object;
    }
    if (cur.type === "JSXIdentifier") parts.unshift(cur.name);
    return parts.join(".");
  }
  return null;
}

function scanBarrelChains(ast, relPath) {
  const out = [];
  const leaf = basename(relPath);
  if (leaf !== "index.ts" && leaf !== "index.tsx") return out;
  for (const node of ast.body ?? []) {
    if (node.type !== "ExportAllDeclaration" && node.type !== "ExportNamedDeclaration") continue;
    const src = node.source?.value;
    if (typeof src !== "string") continue;
    if (!src.startsWith("./")) continue;
    const segments = src.split("/").filter(Boolean);
    if (segments.length > 2) {
      out.push({
        line: node.loc.start.line,
        col: node.loc.start.column + 1,
        extra: `deep barrel re-export from "${src}"`,
      });
    }
  }
  return out;
}

function scanStaticInlineStyles(ast) {
  const out = [];
  walkAST(ast, (node) => {
    if (node.type !== "JSXAttribute") return;
    if (node.name?.name !== "style") return;
    const value = node.value;
    if (!value || value.type !== "JSXExpressionContainer") return;
    const expr = value.expression;
    if (expr.type !== "ObjectExpression") return;
    if (!expr.properties.length) return;
    let allStatic = true;
    for (const prop of expr.properties) {
      if (prop.type !== "Property") {
        allStatic = false;
        break;
      }
      if (!isStaticLiteral(prop.value)) {
        allStatic = false;
        break;
      }
    }
    if (allStatic) {
      out.push({ line: node.loc.start.line, col: node.loc.start.column + 1 });
    }
  });
  return out;
}

function isStaticLiteral(node) {
  if (!node) return false;
  if (node.type === "Literal") return true;
  if (node.type === "TemplateLiteral" && node.expressions.length === 0) return true;
  if (node.type === "UnaryExpression" && node.operator === "-" && node.argument?.type === "Literal") {
    return true;
  }
  return false;
}

function walkAST(node, visit) {
  if (!node || typeof node !== "object") return;
  visit(node);
  for (const key of Object.keys(node)) {
    if (key === "parent" || key === "loc" || key === "range") continue;
    const child = node[key];
    if (Array.isArray(child)) {
      for (const c of child) walkAST(c, visit);
    } else if (child && typeof child === "object" && typeof child.type === "string") {
      walkAST(child, visit);
    }
  }
}

function findDuplicateBasenames(files) {
  const byBasename = new Map();
  for (const abs of files) {
    const rel = relSrcPath(abs);
    if (isExcluded(rel)) continue;
    const base = basename(rel);
    if (DEDUP_EXEMPT_BASENAMES.has(base)) continue;
    const existing = byBasename.get(base) ?? [];
    existing.push(rel);
    byBasename.set(base, existing);
  }
  const out = [];
  for (const [base, paths] of byBasename) {
    if (paths.length < 2) continue;
    for (const p of paths) {
      out.push({
        rule: "SR-006",
        file: p,
        line: 1,
        col: 1,
        message: `duplicate basename "${base}" — also at: ${paths.filter((x) => x !== p).join(", ")}`,
      });
    }
  }
  return out;
}

async function loadBaseline() {
  try {
    const raw = await readFile(BASELINE_PATH, "utf8");
    const data = JSON.parse(raw);
    const set = new Set();
    for (const v of data.violations ?? []) {
      set.add(`${v.rule}|${v.file}|${v.line}`);
    }
    return set;
  } catch {
    return new Set();
  }
}

function formatViolation(v) {
  const extra = v.extra ? ` (${v.extra})` : "";
  return `${v.file}:${v.line}:${v.col} [${v.rule}] ${v.message}${extra} → see constitution § ${v.clause}`;
}

async function main() {
  let files;
  try {
    files = await walk(SRC_ROOT);
  } catch (err) {
    process.stderr.write(`scan:constitution: failed to walk ${SRC_ROOT}: ${err.message}\n`);
    process.exit(EXIT_SCANNER_ERROR);
  }

  const violations = [];

  for (const abs of files) {
    const rel = relSrcPath(abs);
    if (isExcluded(rel)) continue;
    let src;
    try {
      src = await readFile(abs, "utf8");
    } catch (err) {
      process.stderr.write(`scan:constitution: failed to read ${rel}: ${err.message}\n`);
      process.exit(EXIT_SCANNER_ERROR);
    }
    const ast = parseOrNull(src);
    if (!ast) continue;
    for (const rule of RULES) {
      if (rule.kind !== "ast") continue;
      let hits;
      try {
        hits = rule.check(ast, src, rel) ?? [];
      } catch (err) {
        process.stderr.write(
          `scan:constitution: rule ${rule.id} crashed on ${rel}: ${err.message}\n`,
        );
        process.exit(EXIT_SCANNER_ERROR);
      }
      for (const hit of hits) {
        violations.push({
          rule: rule.id,
          clause: rule.clause,
          file: rel,
          line: hit.line,
          col: hit.col,
          message: rule.description,
          extra: hit.extra,
          hint: rule.hint,
        });
      }
    }
  }

  violations.push(...findDuplicateBasenames(files).map((v) => ({
    ...v,
    clause: "Principle XII.7",
    hint: "Rename one or merge the two files",
  })));

  violations.sort((a, b) => {
    if (a.file !== b.file) return a.file.localeCompare(b.file);
    if (a.line !== b.line) return a.line - b.line;
    return a.rule.localeCompare(b.rule);
  });

  if (FLAG_BASELINE) {
    const payload = {
      capturedAt: new Date().toISOString().slice(0, 10),
      capturedOnSha: process.env.GIT_SHA ?? "unknown",
      violations: violations.map(({ rule, file, line }) => ({ rule, file, line })),
    };
    await writeFile(BASELINE_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
    process.stdout.write(
      `scan:constitution: wrote baseline (${violations.length} pre-existing violations) → ${relative(WEB_ROOT, BASELINE_PATH)}\n`,
    );
    process.exit(EXIT_CLEAN);
  }

  const baseline = await loadBaseline();
  const fresh = violations.filter(
    (v) => !baseline.has(`${v.rule}|${v.file}|${v.line}`),
  );

  for (const v of fresh) {
    process.stdout.write(formatViolation(v) + "\n");
    if (FLAG_HINTS && v.hint) {
      process.stdout.write(`    hint: ${v.hint}\n`);
    }
  }

  if (fresh.length === 0) {
    process.stdout.write(
      `scan:constitution: clean (${violations.length} baseline-allowed, 0 new)\n`,
    );
    process.exit(EXIT_CLEAN);
  }

  process.stdout.write(
    `\n${fresh.length} new violation(s). See .specify/memory/constitution.md for full clause text.\n`,
  );
  process.exit(EXIT_VIOLATION);
}

main().catch((err) => {
  process.stderr.write(`scan:constitution: unexpected error: ${err.stack ?? err.message}\n`);
  process.exit(EXIT_SCANNER_ERROR);
});
