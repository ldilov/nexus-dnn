import { block } from "./code_block.css";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  return (
    <pre
      className={block}
      data-lang={lang ?? "text"}
      aria-label={`code block${lang ? ` (${lang})` : ""}`}
      tabIndex={0}
    >
      <code>{code}</code>
    </pre>
  );
}
