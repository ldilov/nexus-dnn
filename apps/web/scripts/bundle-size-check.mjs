#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(here, "..");
const distAssets = join(webRoot, "dist", "assets");
const baselinePath = join(webRoot, "bundle-baseline.json");

async function readBaseline() {
  const raw = await readFile(baselinePath, "utf8");
  return JSON.parse(raw);
}

async function findMainChunk() {
  const entries = await readdir(distAssets);
  const jsFiles = entries.filter(
    (name) => name.startsWith("index-") && name.endsWith(".js"),
  );
  if (jsFiles.length === 0) {
    throw new Error(
      "bundle-size-check: no dist/assets/index-*.js chunk found. Did you run `pnpm build` first?",
    );
  }
  if (jsFiles.length > 1) {
    throw new Error(
      `bundle-size-check: multiple index-*.js chunks found, ambiguous: ${jsFiles.join(", ")}`,
    );
  }
  return join(distAssets, jsFiles[0]);
}

async function gzippedSize(path) {
  const buf = await readFile(path);
  return gzipSync(buf).length;
}

async function main() {
  const baseline = await readBaseline();
  const mainPath = await findMainChunk();
  const actual = await gzippedSize(mainPath);
  const delta = actual - baseline.mainChunkGzippedBytes;
  const tolerance = baseline.toleranceBytes ?? 8192;
  const formatted = (n) => `${(n / 1024).toFixed(2)} KB`;

  console.log(`main chunk (gzipped): ${formatted(actual)} (${actual} B)`);
  console.log(
    `baseline:             ${formatted(baseline.mainChunkGzippedBytes)} (${baseline.mainChunkGzippedBytes} B)`,
  );
  console.log(
    `delta:                ${delta >= 0 ? "+" : ""}${formatted(delta)} (${delta >= 0 ? "+" : ""}${delta} B)`,
  );
  console.log(`tolerance:            ${formatted(tolerance)} (${tolerance} B)`);

  if (delta > tolerance) {
    console.error(
      `\nbundle-size-check: FAIL — main chunk grew by ${formatted(delta)}, exceeds tolerance ${formatted(tolerance)}.`,
    );
    console.error(
      "If the growth is intentional, update apps/web/bundle-baseline.json and commit it in the same PR.",
    );
    process.exit(1);
  }

  console.log("\nbundle-size-check: OK");
}

main().catch((err) => {
  console.error(err?.message ?? err);
  process.exit(1);
});
