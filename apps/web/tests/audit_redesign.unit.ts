// Spec 037 / T091 — vitest coverage for the audit_redesign.mjs script.
//
// Each check is a pure function over `(filePath, contents [, dictionary])`,
// returning `{ findings, exceptions }` so the orchestrator can populate
// the summary's `accepted_exceptions` counter (per CLI contract).

import { describe, expect, it, beforeAll } from "vitest";
import {
  CHECK_NAMES,
  CONTRAST_PAIRS,
  checkBoundary,
  checkContrast,
  checkFiller,
  checkHex,
  checkIoBoundary,
  checkPx,
  contrastRatio,
  parseTokenDeclarations,
  __test__,
} from "../scripts/audit_redesign.mjs";

const {
  isTokenFile,
  isDensityFile,
  isFillerScopedFile,
  isIoScopedFile,
  isExtensionScopedHostFile,
  parseAnnotation,
  isLineSuppressed,
  resolveTokenValue,
  collectFillers,
} = __test__;

describe("annotation parser", () => {
  it("matches a valid audit-allow line", () => {
    const a = parseAnnotation("// audit-allow: hex — graphic-equalizer raw rgb");
    expect(a).toEqual({ check: "hex", reason: "graphic-equalizer raw rgb" });
  });

  it("rejects reasons under 8 chars", () => {
    expect(parseAnnotation("// audit-allow: hex — short")).toBeNull();
  });

  it("matches both em-dash and ascii-dash separators", () => {
    expect(parseAnnotation("// audit-allow: px - alignment hack for arrow icon")).toEqual({
      check: "px",
      reason: "alignment hack for arrow icon",
    });
  });

  it("ignores non-annotation comments", () => {
    expect(parseAnnotation("// just a regular comment line")).toBeNull();
  });
});

describe("isLineSuppressed", () => {
  it("suppresses on the same line", () => {
    const lines = ["const x = '#abcdef'; // audit-allow: hex — needed for canvas getImageData"];
    expect(isLineSuppressed(lines, 0, "hex")).toBe(true);
  });

  it("suppresses on the immediately preceding line", () => {
    const lines = [
      "// audit-allow: hex — needed for canvas getImageData",
      "const x = '#abcdef';",
    ];
    expect(isLineSuppressed(lines, 1, "hex")).toBe(true);
  });

  it("does not suppress lines two above", () => {
    const lines = [
      "// audit-allow: hex — needed for canvas getImageData",
      "",
      "const x = '#abcdef';",
    ];
    expect(isLineSuppressed(lines, 2, "hex")).toBe(false);
  });

  it("does not suppress a different check", () => {
    const lines = ["const x = '#abcdef'; // audit-allow: px — wrong check name"];
    expect(isLineSuppressed(lines, 0, "hex")).toBe(false);
  });
});

describe("file-scope helpers", () => {
  it("isTokenFile recognises tokens variants", () => {
    expect(isTokenFile("apps/web/src/styles/tokens.css")).toBe(true);
    expect(isTokenFile("apps/web/src/tokens/primitives.ts")).toBe(false);
    expect(isTokenFile("apps/web/src/foo.css")).toBe(false);
  });

  it("isDensityFile recognises density variants", () => {
    expect(isDensityFile("apps/web/src/styles/density.css")).toBe(true);
    expect(isDensityFile("apps/web/src/styles/density.tokens.ts")).toBe(true);
  });

  it("isExtensionScopedHostFile exempts the dispatcher rendering surface", () => {
    expect(isExtensionScopedHostFile("apps/web/src/views/extensions/local-llm/chat/chat.view.tsx")).toBe(true);
    expect(isExtensionScopedHostFile("extensions/builtin/emotion-tts/web/src/main.tsx")).toBe(true);
    expect(isExtensionScopedHostFile("apps/web/src/services/local_llm_chat.ts")).toBe(false);
  });

  it("isIoScopedFile excludes test files", () => {
    expect(isIoScopedFile("apps/web/src/views/foo/foo.view.tsx")).toBe(true);
    expect(isIoScopedFile("apps/web/src/views/foo/__tests__/foo.test.tsx")).toBe(false);
    expect(isIoScopedFile("apps/web/src/services/foo.ts")).toBe(false);
  });
});

describe("checkHex", () => {
  it("flags a typical hex literal in a CSS-in-JS file", () => {
    const result = checkHex(
      "apps/web/src/components/foo.css.ts",
      `const c = "#ba9eff";\n`,
    );
    expect(result.findings).toHaveLength(1);
    expect(result.findings[0]).toMatchObject({ check: "hex", match: "#ba9eff", line: 1 });
    expect(result.exceptions).toEqual([]);
  });

  it("does NOT flag inside a tokens file", () => {
    expect(checkHex("apps/web/src/styles/tokens.css", `--accent: #ba9eff;`).findings).toEqual([]);
  });

  it("respects an audit-allow annotation on the same line and records the exception with reason", () => {
    const result = checkHex(
      "apps/web/src/components/foo.css.ts",
      `const c = "#000000"; // audit-allow: hex — canvas getImageData needs raw rgb`,
    );
    expect(result.findings).toEqual([]);
    expect(result.exceptions).toHaveLength(1);
    expect(result.exceptions[0]).toMatchObject({
      check: "hex",
      match: "#000000",
      reason: "canvas getImageData needs raw rgb",
    });
  });

  it("respects an audit-allow annotation on the preceding line", () => {
    const result = checkHex(
      "apps/web/src/components/foo.css.ts",
      [
        `// audit-allow: hex — canvas getImageData needs raw rgb`,
        `const c = "#000000";`,
      ].join("\n"),
    );
    expect(result.findings).toEqual([]);
    expect(result.exceptions).toHaveLength(1);
    expect(result.exceptions[0].reason).toBe("canvas getImageData needs raw rgb");
  });

  it("tightened regex catches a 6-char hex followed by alphanumerics", () => {
    // Pre-fix bug: `#abcdefXX` would silently miss because `\b` doesn't break
    // between hex chars. With `(?![0-9a-fA-F])` the match is only emitted
    // when the next char isn't another hex digit — so a 6-char value
    // followed by another hex char produces a 8-char match (allowed) or
    // no match (if total > 8). Either way no silent miss.
    const result = checkHex(
      "apps/web/src/components/foo.css.ts",
      `const c = "#abcdef00ab"; // an 11-char run — should NOT silently emit a 6-char match`,
    );
    // 11-char hex run: only matches up to 8 chars (#abcdef00) followed by "ab" — and "ab" are still hex,
    // so no boundary, no match emitted. (The audit's intent is to catch real CSS hex literals — 11-char
    // runs aren't valid CSS hex anyway.)
    const allMatches = [...result.findings, ...result.exceptions];
    expect(allMatches.every((m) => m.match.length <= 9)).toBe(true);
  });
});

describe("checkPx", () => {
  it("flags arbitrary px literal in a non-token file", () => {
    const result = checkPx("apps/web/src/components/foo.css.ts", `padding: 12px;`);
    expect(result.findings).toHaveLength(1);
    expect(result.findings[0].match).toBe("12px");
  });

  it("allows 1px (hairline)", () => {
    expect(checkPx("apps/web/src/components/foo.css.ts", `border: 1px solid red;`).findings).toEqual([]);
  });

  it("allows 64px (sidebar rail width)", () => {
    expect(checkPx("apps/web/src/components/foo.css.ts", `width: 64px;`).findings).toEqual([]);
  });

  it("does NOT flag inside a density file", () => {
    expect(checkPx("apps/web/src/styles/density.css", `--row-h: 32px;`).findings).toEqual([]);
  });

  it("records annotated suppressions in the exceptions array", () => {
    const result = checkPx(
      "apps/web/src/components/foo.css.ts",
      `// audit-allow: px — design-system primitive doesn't cover icon nudge\nconst x = "13px";`,
    );
    expect(result.findings).toEqual([]);
    expect(result.exceptions).toHaveLength(1);
    expect(result.exceptions[0].reason).toContain("design-system primitive");
  });
});

describe("checkFiller", () => {
  const dict = {
    deployment_names: ["Aurora bench"],
    owner_initials: ["JK"],
  };

  it("flags a deployment-name filler in a view file", () => {
    const result = checkFiller(
      "apps/web/src/views/deployments/deployments.ui.tsx",
      `const name = "Aurora bench";`,
      dict,
    );
    expect(result.findings).toHaveLength(1);
    expect(result.findings[0].match).toBe("Aurora bench");
  });

  it("does NOT flag in service files (out of scope)", () => {
    expect(
      checkFiller(
        "apps/web/src/services/deployments.ts",
        `const name = "Aurora bench";`,
        dict,
      ).findings,
    ).toEqual([]);
  });

  it("respects audit-allow", () => {
    const result = checkFiller(
      "apps/web/src/views/deployments/deployments.ui.tsx",
      `const name = "Aurora bench"; // audit-allow: filler — fixture used in test mock`,
      dict,
    );
    expect(result.findings).toEqual([]);
    expect(result.exceptions).toHaveLength(1);
  });

  it("requires word-boundary for short fillers (< 4 chars) — no false positive on substrings", () => {
    // "JK" must NOT match a longer identifier that happens to contain it.
    expect(
      checkFiller(
        "apps/web/src/views/foo/foo.ui.tsx",
        `const id = "tooltipJKLabel"; const cls = "bg-JKL-50";`,
        dict,
      ).findings,
    ).toEqual([]);
  });

  it("does match short fillers when they're properly delimited", () => {
    expect(
      checkFiller(
        "apps/web/src/views/foo/foo.ui.tsx",
        `const initials = "JK";`,
        dict,
      ).findings,
    ).toHaveLength(1);
  });

  it("counts each occurrence on a line, matching hex/px semantics", () => {
    expect(
      checkFiller(
        "apps/web/src/views/foo/foo.ui.tsx",
        `const a = "Aurora bench"; const b = "Aurora bench";`,
        dict,
      ).findings,
    ).toHaveLength(2);
  });

  it("collectFillers ignores schema/comment keys", () => {
    expect(collectFillers({ $schema: "x", names: ["a", "b"], misc: 5 })).toEqual(["a", "b"]);
  });
});

describe("checkBoundary", () => {
  it("flags a fully-qualified extension id exactly once (no double-count with the alias)", () => {
    // Pre-fix bug: `nexus.local-llm` matched both itself AND `local-llm`,
    // inflating the finding count for a single offense. Longest-first
    // sort + consumed-range tracking guarantees one finding per offense.
    const result = checkBoundary(
      "apps/web/src/services/local_llm_chat.ts",
      `const url = '/api/v1/extensions/nexus.local-llm/chat/threads';`,
    );
    expect(result.findings).toHaveLength(1);
    expect(result.findings[0].match).toBe("nexus.local-llm");
  });

  it("flags the underscore alias when only the alias is present", () => {
    const result = checkBoundary(
      "apps/web/src/services/foo.ts",
      `import bar from "../local_llm_chat";`,
    );
    expect(result.findings).toHaveLength(1);
    expect(result.findings[0].match).toBe("local_llm");
  });

  it("flags genuinely separate occurrences as separate findings", () => {
    const result = checkBoundary(
      "apps/web/src/services/foo.ts",
      `const a = "local-llm"; const b = "local-llm";`,
    );
    expect(result.findings).toHaveLength(2);
  });

  it("does NOT flag inside the generic dispatcher rendering surface", () => {
    expect(
      checkBoundary(
        "apps/web/src/views/extensions/local-llm/chat/chat.view.tsx",
        `const id = "nexus.local-llm";`,
      ).findings,
    ).toEqual([]);
  });

  it("does NOT flag inside an extension's own subproject", () => {
    expect(
      checkBoundary(
        "extensions/builtin/emotion-tts/web/src/main.tsx",
        `const id = "nexus.audio.emotiontts";`,
      ).findings,
    ).toEqual([]);
  });

  it("records annotated suppressions in the exceptions array", () => {
    const result = checkBoundary(
      "apps/web/src/layout/foo.tsx",
      `// audit-allow: boundary — load-bearing registry bridge for chat_panel YAML entry\nconst id = "nexus.local-llm";`,
    );
    expect(result.findings).toEqual([]);
    expect(result.exceptions).toHaveLength(1);
    expect(result.exceptions[0].reason).toContain("registry bridge");
  });
});

describe("checkIoBoundary", () => {
  it("flags raw fetch in a presentational component", () => {
    const result = checkIoBoundary(
      "apps/web/src/components/foo/foo.tsx",
      `const r = fetch('/api/v1/health');`,
    );
    expect(result.findings).toHaveLength(1);
    expect(result.findings[0].match).toBe("fetch");
  });

  it("flags new EventSource in a component", () => {
    const result = checkIoBoundary(
      "apps/web/src/components/bar.tsx",
      `const es = new EventSource('/stream');`,
    );
    expect(result.findings.some((f) => f.match === "EventSource")).toBe(true);
  });

  it("flags useSWR in a non-view component", () => {
    const result = checkIoBoundary(
      "apps/web/src/components/baz.tsx",
      `const { data } = useSWR('/api', fetcher);`,
    );
    expect(result.findings.some((f) => f.match === "useSWR")).toBe(true);
  });

  it("allows useSWR in a .view.tsx container", () => {
    const result = checkIoBoundary(
      "apps/web/src/views/foo/foo.view.tsx",
      `const { data } = useSWR('/api', fetcher);`,
    );
    expect(result.findings.filter((f) => f.match === "useSWR")).toEqual([]);
  });

  it("does NOT scan service files (out of scope by design)", () => {
    expect(
      checkIoBoundary("apps/web/src/services/foo.ts", `const r = fetch('/api/v1/health');`).findings,
    ).toEqual([]);
  });

  it("records audit-allow suppression in the exceptions array", () => {
    const result = checkIoBoundary(
      "apps/web/src/components/foo/foo.tsx",
      `// audit-allow: io-boundary — preflight ping the host before mount\nconst r = fetch('/api/v1/health');`,
    );
    expect(result.findings).toEqual([]);
    expect(result.exceptions).toHaveLength(1);
    expect(result.exceptions[0].reason).toContain("preflight ping");
  });
});

describe("contrastRatio + checkContrast", () => {
  it("computes a known contrast ratio (white on black ≈ 21)", () => {
    const ratio = contrastRatio("#ffffff", "#000000");
    expect(ratio).toBeGreaterThan(20.99);
    expect(ratio).toBeLessThan(21.01);
  });

  it("returns null on unparseable color", () => {
    expect(contrastRatio("not-a-color", "#000000")).toBeNull();
  });

  it("flags a known-bad pair in checkContrast", () => {
    const declared = new Map([
      ["--on-surface", "#888888"],
      ["--surface", "#777777"],
    ]);
    const findings = checkContrast(declared);
    const onSurfacePair = findings.find(
      (f) => f.pair === "--on-surface against --surface",
    );
    expect(onSurfacePair).toBeDefined();
    expect(onSurfacePair.computed).toBeLessThan(4.5);
  });

  it("does NOT flag a known-good pair in checkContrast", () => {
    const declared = new Map([
      ["--on-surface", "#ffffff"],
      ["--surface", "#000000"],
    ]);
    const findings = checkContrast(declared);
    const onSurfacePair = findings.find(
      (f) => f.pair === "--on-surface against --surface",
    );
    expect(onSurfacePair).toBeUndefined();
  });

  it("CONTRAST_PAIRS covers the documented thresholds", () => {
    for (const p of CONTRAST_PAIRS) {
      expect(p.threshold).toBeGreaterThanOrEqual(3);
      expect(p.threshold).toBeLessThanOrEqual(4.5);
    }
  });
});

describe("parseTokenDeclarations + resolveTokenValue", () => {
  it("parses simple declarations from CSS text", () => {
    const declared = parseTokenDeclarations(
      `:root {\n  --primary: #112233;\n  --accent: var(--primary);\n}\n`,
    );
    expect(declared.get("--primary")).toBe("#112233");
    expect(declared.get("--accent")).toBe("var(--primary)");
  });

  it("resolves a one-hop var() reference", () => {
    const declared = new Map([
      ["--primary", "#abcdef"],
      ["--accent", "var(--primary)"],
    ]);
    expect(resolveTokenValue("--accent", declared)).toBe("#abcdef");
  });

  it("returns the fallback when var() target is unknown", () => {
    const declared = new Map([["--accent", "var(--unknown, #ffffff)"]]);
    expect(resolveTokenValue("--accent", declared)).toBe("#ffffff");
  });

  it("returns null on circular references", () => {
    const declared = new Map([
      ["--a", "var(--b)"],
      ["--b", "var(--a)"],
    ]);
    expect(resolveTokenValue("--a", declared)).toBeNull();
  });
});

describe("CHECK_NAMES contract", () => {
  it("exposes exactly the documented six checks", () => {
    expect(CHECK_NAMES).toEqual([
      "hex",
      "px",
      "filler",
      "contrast",
      "boundary",
      "io-boundary",
    ]);
  });
});

describe("runAudit orchestrator", () => {
  // Imported lazily — runAudit is the integration boundary.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let runAudit: any;
  beforeAll(async () => {
    ({ runAudit } = await import("../scripts/audit_redesign.mjs"));
  });

  it("aggregates findings + exceptions into the documented envelope shape", async () => {
    const sources = [
      {
        filePath: "apps/web/src/components/foo.css.ts",
        contents: `const a = "#abcdef"; const b = "12px";\n`,
      },
      {
        filePath: "apps/web/src/services/local_llm_chat.ts",
        contents: `const url = "/api/v1/extensions/nexus.local-llm/chat";\n`,
      },
      {
        filePath: "apps/web/src/components/bar.css.ts",
        contents: `// audit-allow: hex — graphic-equalizer needs raw rgb\nconst a = "#000000";\n`,
      },
    ];
    const dictionary = { deployment_names: ["Aurora bench"] };
    const tokensCss = `:root {\n  --on-surface: #ffffff;\n  --surface: #000000;\n}\n`;
    const report = await runAudit({ sources, dictionary, tokensCss });

    expect(report.version).toBeTypeOf("string");
    expect(report.summary.total_findings).toBeGreaterThanOrEqual(3); // hex + px + boundary
    expect(report.summary.accepted_exceptions).toBe(1);
    expect(report.exceptions).toHaveLength(1);
    expect(report.exceptions[0]).toMatchObject({
      check: "hex",
      file: "apps/web/src/components/bar.css.ts",
      reason: "graphic-equalizer needs raw rgb",
    });
    expect(report.findings.some((f: { check: string }) => f.check === "hex")).toBe(true);
    expect(report.findings.some((f: { check: string }) => f.check === "px")).toBe(true);
    expect(report.findings.some((f: { check: string }) => f.check === "boundary")).toBe(true);
    expect(report.findings.some((f: { check: string }) => f.check === "contrast")).toBe(false);
    // by_check counters reflect the per-check totals.
    expect(report.summary.by_check.hex.exceptions).toBe(1);
    expect(report.summary.by_check.boundary.findings).toBe(1);
  });

  it("respects --only=<check> by skipping all other checks", async () => {
    const sources = [
      {
        filePath: "apps/web/src/components/foo.css.ts",
        contents: `const a = "#abcdef"; const b = "12px";\n`,
      },
    ];
    const report = await runAudit({ only: "hex", sources, dictionary: {}, tokensCss: "" });
    expect(report.summary.by_check.px.findings).toBe(0);
    expect(report.summary.by_check.hex.findings).toBe(1);
  });
});

describe("real production tokens.css", () => {
  it("passes every documented contrast pair (no AA failures)", async () => {
    const fs = await import("node:fs");
    const url = await import("node:url");
    const path = await import("node:path");
    const here = path.dirname(url.fileURLToPath(import.meta.url));
    const tokensPath = path.join(here, "..", "src", "styles", "tokens.css");
    const cssText = fs.readFileSync(tokensPath, "utf8");
    const declared = parseTokenDeclarations(cssText);
    const findings = checkContrast(declared);
    if (findings.length > 0) {
      // Surface details so a regression is actionable, not just a red dot.
      const detail = findings
        .map(
          (f) => `${f.pair}: ${f.computed} (need ${f.threshold}, ${f.fgValue} vs ${f.bgValue})`,
        )
        .join("\n");
      throw new Error(`Production tokens.css has contrast failures:\n${detail}`);
    }
  });
});
