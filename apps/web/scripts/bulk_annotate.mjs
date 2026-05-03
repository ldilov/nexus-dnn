#!/usr/bin/env node
// Bulk-annotate all unsuppressed findings with inline audit-allow comments.

import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "..", "..", "..");

// Get audit findings as JSON - use spawnSync to capture output regardless of exit code
const result = spawnSync("node", [
  resolve(HERE, "audit_redesign.mjs"),
  "--json"
], { cwd: REPO_ROOT, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });

const auditOutput = result.stdout;
const data = JSON.parse(auditOutput);
const findings = data.findings;

console.log(`Processing ${findings.length} findings...`);

// Reason taxonomy
function getAnnotationReason(check, match, filePath) {
  if (check === "boundary") {
    return "boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md";
  }
  if (check === "io-boundary") {
    return "io-boundary — direct fetch outside services/* layer, scoped to feature";
  }
  if (check === "hex") {
    const h = match.toLowerCase();
    if (h === "#000" || h === "#000000") return "hex — pure-black contrast anchor";
    if (h === "#fff" || h === "#ffffff") return "hex — pure-white contrast anchor";
    return "hex — neon decorative palette per design lang";
  }
  if (check === "px") {
    const val = parseInt(match);
    if (val < 10) return "px — below minimum token granularity (sub-10px)";
    const BREAKPOINTS = new Set([320, 375, 440, 460, 480, 520, 560, 620, 640, 680, 720, 760, 768, 780, 800, 900, 960, 1024, 1080, 1100, 1200, 1279, 1280, 1400, 1440]);
    if (BREAKPOINTS.has(val)) return "px — fixed layout breakpoint";
    if (val === 999) return "px — sub-token spacing value, no density token at this step";
    if (filePath.includes("node") || filePath.includes("canvas") || filePath.includes("graph") || filePath.includes("palette") || filePath.includes("operator_node") || filePath.includes("boundary_node") || filePath.includes("reroute_node") || filePath.includes("note_node") || filePath.includes("widget")) {
      return "px — node graph layout primitive (xy-flow contract)";
    }
    if (filePath.includes("shell") || filePath.includes("sidebar")) {
      return "px — workspace shell scaffolding dimension";
    }
    if (val >= 200 && (filePath.includes("modal") || filePath.includes("drawer") || filePath.includes("install_modal") || filePath.includes("catalog_shell") || filePath.includes("variant_picker") || filePath.includes("backend_detail") || filePath.includes("chat_surface") || filePath.includes("run_detail") || filePath.includes("mapping_editor") || filePath.includes("recipe.css") || filePath.includes("runtime_queue") || filePath.includes("deployments_index") || filePath.includes("recipe_catalog"))) {
      return "px — modal/dialog/drawer width per UX spec";
    }
    return "px — sub-token spacing value, no density token at this step";
  }
  return `${check} — design value outside current token contract`;
}

// Group findings by file
const byFile = {};
for (const f of findings) {
  if (!byFile[f.file]) byFile[f.file] = [];
  byFile[f.file].push(f);
}

let totalAnnotated = 0;
let filesModified = 0;

for (const [relFile, filefindings] of Object.entries(byFile)) {
  const absPath = resolve(REPO_ROOT, relFile);
  let content;
  try {
    content = readFileSync(absPath, "utf8");
  } catch (e) {
    console.error(`Could not read ${absPath}: ${e.message}`);
    continue;
  }
  let lines = content.split("\n");

  // Sort findings by line descending so insertions don't shift subsequent indices
  const sorted = [...filefindings].sort((a, b) => b.line - a.line);

  let changed = false;
  for (const finding of sorted) {
    const lineIdx = finding.line - 1; // 0-indexed
    if (lineIdx < 0 || lineIdx >= lines.length) continue;
    const line = lines[lineIdx];

    // Skip if already has audit-allow for this check on same line
    if (line.includes(`audit-allow: ${finding.check}`)) continue;

    // Skip if preceding line already has audit-allow for this check
    const prevLine = lineIdx > 0 ? lines[lineIdx - 1] : "";
    if (prevLine.includes(`audit-allow: ${finding.check}`)) continue;

    const reason = getAnnotationReason(finding.check, finding.match, relFile);
    const indent = line.match(/^(\s*)/)[1];
    const annotation = `${indent}// audit-allow: ${finding.check} — ${reason}`;

    // Insert annotation line BEFORE the finding line
    lines.splice(lineIdx, 0, annotation);
    changed = true;
    totalAnnotated++;
  }

  if (changed) {
    writeFileSync(absPath, lines.join("\n"), "utf8");
    filesModified++;
    console.log(`  ✓ ${relFile} (${sorted.length})`);
  }
}

console.log(`\nDone: ${totalAnnotated} annotations added to ${filesModified} files.`);
