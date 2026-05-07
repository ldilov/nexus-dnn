import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import * as styles from "./code_block.css";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

const SUPPORTED_LANGS = new Set([
  "ts",
  "tsx",
  "js",
  "jsx",
  "py",
  "python",
  "rs",
  "rust",
  "sh",
  "bash",
  "json",
  "css",
  "html",
  "sql",
  "go",
  "java",
  "yaml",
  "yml",
  "toml",
  "md",
  "markdown",
  "text",
  "txt",
  "c",
  "cpp",
  "ruby",
  "rb",
  "php",
  "kotlin",
  "swift",
  "dart",
]);

function normalizeLang(lang?: string): string {
  if (!lang) return "text";
  const lower = lang.toLowerCase();
  if (SUPPORTED_LANGS.has(lower)) return lower;
  return "text";
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);
  const dataLang = lang ?? "text";

  useEffect(() => {
    let cancelled = false;
    const resolved = normalizeLang(lang);
    codeToHtml(code, { lang: resolved, theme: "github-dark" })
      .then((rendered) => {
        if (!cancelled) setHtml(rendered);
      })
      .catch(() => {
        if (!cancelled) setHtml(null);
      });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  if (!html) {
    return (
      <pre
        className={styles.block}
        data-lang={dataLang}
        aria-label={`code block${lang ? ` (${lang})` : ""}`}
        tabIndex={0}
      >
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <pre
      className={styles.block}
      data-lang={dataLang}
      aria-label={`code block${lang ? ` (${lang})` : ""}`}
      tabIndex={0}
      dangerouslySetInnerHTML={{ __html: extractInner(html) }}
    />
  );
}

function extractInner(html: string): string {
  const match = html.match(/<pre[^>]*>([\s\S]*)<\/pre>/);
  if (match && match[1]) return match[1];
  return html;
}
