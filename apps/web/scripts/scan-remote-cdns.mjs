#!/usr/bin/env node
// Spec 019 SC-021 / FR-TP03 / FR-TP04: scan the built dist/ output for any
// absolute URL pointing at a remote origin. The app is local-first — every
// runtime request must hit localhost / 127.0.0.1 / the host-provided base.
//
// Known offenders this scanner blocks:
// - fonts.googleapis.com / fonts.gstatic.com  (FR-TP04)
// - lh3.googleusercontent.com                 (mockup avatars)
// - cdn.jsdelivr.net / cdn.tailwindcss.com    (CDN scripts)
// - any http(s):// URL whose host is not localhost / 127.0.0.1

import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = join(HERE, "..");
const DIST = join(WEB_ROOT, "dist");

const BANNED_HOSTS = [
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "lh3.googleusercontent.com",
  "cdn.jsdelivr.net",
  "cdn.tailwindcss.com",
  "googletagmanager.com",
  "google-analytics.com",
];

const URL_RE = /https?:\/\/([A-Za-z0-9.-]+)(?:\/[^\s"'<>()]*)?/g;

async function walk(dir) {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

function isLocal(host) {
  return host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0";
}

// XML namespace identifiers and library error-page references are string
// constants baked into bundled output — they are never fetched at runtime.
// Keep this list tight; anything here is an explicit carve-out.
const BENIGN_HOSTS = [
  "www.w3.org",
  "xmlns.com",
  "purl.org",
  "schema.org",
  "reactflow.dev",
  "pro.reactflow.dev",
  "react.dev",
  // Library error-message URLs baked into bundled output. Never fetched.
  "developer.mozilla.org",
  "vanilla-extract.style",
  "reactrouter.com",
];

function isBenign(host) {
  return BENIGN_HOSTS.includes(host);
}

async function main() {
  try {
    await access(DIST, constants.R_OK);
  } catch {
    console.warn(
      "scan-remote-cdns: dist/ not present — run `pnpm build` first. Skipping."
    );
    return;
  }

  const files = (await walk(DIST)).filter((f) =>
    /\.(js|mjs|css|html|map)$/.test(f),
  );

  const failures = [];
  for (const f of files) {
    const src = await readFile(f, "utf8");
    URL_RE.lastIndex = 0;
    let m;
    while ((m = URL_RE.exec(src)) !== null) {
      const [, host] = m;
      if (isLocal(host)) continue;
      if (isBenign(host)) continue;
      const banned = BANNED_HOSTS.includes(host);
      const isCommentUrl = src
        .slice(Math.max(0, m.index - 3), m.index)
        .includes("//");
      if (banned || !isCommentUrl) {
        failures.push({
          file: relative(WEB_ROOT, f).replaceAll("\\", "/"),
          host,
          url: m[0].slice(0, 120),
        });
      }
    }
  }

  if (failures.length) {
    console.error(
      "\n✗ scan-remote-cdns FAILED — remote origin reference in built output:\n",
    );
    for (const { file, host, url } of failures) {
      console.error(`  ${file}  ${host}  ${url}`);
    }
    console.error(
      "\nSelf-host the asset under apps/web/public/ per FR-TP04. Local-first" +
        " posture forbids any non-localhost absolute URL in dist/.\n",
    );
    process.exit(1);
  }

  console.log(
    `✓ scan-remote-cdns: ${files.length} dist files clean (no remote origins).`,
  );
}

main().catch((err) => {
  console.error("scan-remote-cdns crashed:", err);
  process.exit(2);
});
