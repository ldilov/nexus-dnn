import { useEffect, useRef, useState, type ReactNode } from "react";
import type { HighlighterCore } from "shiki/core";
import { Button } from "../base/button";
import * as styles from "./layout_styles.css";

type CodeBlockProps = {
  code?: string;
  language?: string;
  showHeader?: boolean;
  children?: ReactNode;
};

const LANGUAGE_LOADERS: Record<string, () => Promise<{ default: unknown }>> = {
  rust: () => import("shiki/langs/rust.mjs"),
  typescript: () => import("shiki/langs/typescript.mjs"),
  javascript: () => import("shiki/langs/javascript.mjs"),
  python: () => import("shiki/langs/python.mjs"),
  go: () => import("shiki/langs/go.mjs"),
  bash: () => import("shiki/langs/bash.mjs"),
  yaml: () => import("shiki/langs/yaml.mjs"),
  json: () => import("shiki/langs/json.mjs"),
  toml: () => import("shiki/langs/toml.mjs"),
  markdown: () => import("shiki/langs/markdown.mjs"),
  sql: () => import("shiki/langs/sql.mjs"),
};

let highlighterPromise: Promise<HighlighterCore> | null = null;
const loadedLanguages = new Set<string>();

async function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const [
        { createHighlighterCore },
        { createJavaScriptRegexEngine },
        darkTheme,
      ] = await Promise.all([
        import("shiki/core"),
        import("shiki/engine/javascript"),
        import("shiki/themes/github-dark.mjs"),
      ]);
      return createHighlighterCore({
        engine: createJavaScriptRegexEngine(),
        themes: [darkTheme.default],
        langs: [],
      });
    })();
  }
  return highlighterPromise;
}

async function ensureLanguage(
  highlighter: HighlighterCore,
  language: string,
): Promise<void> {
  if (loadedLanguages.has(language)) return;
  const loader = LANGUAGE_LOADERS[language];
  if (!loader) return;
  const grammar = await loader();
  await highlighter.loadLanguage(grammar.default as never);
  loadedLanguages.add(language);
}

function normalizeLanguage(language?: string): string | null {
  if (!language) return null;
  const normalized = language.trim().toLowerCase();
  if (normalized === "plain" || normalized === "") return null;
  return normalized in LANGUAGE_LOADERS ? normalized : null;
}

export function CodeBlock({
  code = "",
  language,
  showHeader = true,
  children,
}: CodeBlockProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  const normalizedLang = normalizeLanguage(language);

  useEffect(() => {
    cancelledRef.current = false;
    if (!normalizedLang || !code) {
      setHighlightedHtml(null);
      return;
    }

    (async () => {
      try {
        const highlighter = await getHighlighter();
        await ensureLanguage(highlighter, normalizedLang);
        if (cancelledRef.current) return;
        const html = highlighter.codeToHtml(code, {
          lang: normalizedLang,
          theme: "github-dark",
        });
        if (!cancelledRef.current) setHighlightedHtml(html);
      } catch {
        if (!cancelledRef.current) setHighlightedHtml(null);
      }
    })();

    return () => {
      cancelledRef.current = true;
    };
  }, [code, normalizedLang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div>
      {showHeader && language && (
        <div className={styles.codeBlockHeader}>
          <span className={styles.codeBlockLanguage}>{language}</span>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            Copy
          </Button>
        </div>
      )}
      {highlightedHtml ? (
        <div
          className={styles.codeBlock}
          // Shiki emits a self-contained <pre><code> tree it fully controls.
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className={styles.codeBlock}>
          <code>{code}</code>
        </pre>
      )}
      {children}
    </div>
  );
}
