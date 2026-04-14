import type { ReactNode } from "react";
import * as styles from "./layout_styles.css";

type MarkdownViewProps = {
  content?: string;
  children?: ReactNode;
};

type MarkdownToken =
  | { type: "text"; value: string }
  | { type: "heading"; level: number; value: string }
  | { type: "paragraph"; children: InlineToken[] }
  | { type: "code_block"; value: string }
  | { type: "list"; ordered: boolean; items: string[] };

type InlineToken =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "italic"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; text: string; href: string };

function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(\[(.+?)\]\((.+?)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    if (match[1] && match[2]) tokens.push({ type: "bold", value: match[2] });
    else if (match[3] && match[4]) tokens.push({ type: "italic", value: match[4] });
    else if (match[5] && match[6]) tokens.push({ type: "code", value: match[6] });
    else if (match[7] && match[8] && match[9]) tokens.push({ type: "link", text: match[8], href: match[9] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) });
  }

  return tokens;
}

function renderInline(tokens: InlineToken[]): ReactNode[] {
  return tokens.map((token, i) => {
    switch (token.type) {
      case "bold": return <strong key={i}>{token.value}</strong>;
      case "italic": return <em key={i}>{token.value}</em>;
      case "code": return <code key={i}>{token.value}</code>;
      case "link": return <a key={i} href={token.href} target="_blank" rel="noopener noreferrer">{token.text}</a>;
      default: return <span key={i}>{token.value}</span>;
    }
  });
}

function parseMarkdown(source: string): MarkdownToken[] {
  const lines = source.split("\n");
  const tokens: MarkdownToken[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length) {
        const codeLine = lines[i]!;
        if (codeLine.startsWith("```")) break;
        codeLines.push(codeLine);
        i++;
      }
      i++;
      tokens.push({ type: "code_block", value: codeLines.join("\n") });
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      tokens.push({ type: "heading", level: headingMatch[1]!.length, value: headingMatch[2]! });
      i++;
      continue;
    }

    if (line.match(/^[-*]\s+/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i]!.match(/^[-*]\s+/)) {
        items.push(lines[i]!.replace(/^[-*]\s+/, ""));
        i++;
      }
      tokens.push({ type: "list", ordered: false, items });
      continue;
    }

    if (line.match(/^\d+\.\s+/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i]!.match(/^\d+\.\s+/)) {
        items.push(lines[i]!.replace(/^\d+\.\s+/, ""));
        i++;
      }
      tokens.push({ type: "list", ordered: true, items });
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    tokens.push({ type: "paragraph", children: parseInline(line) });
    i++;
  }

  return tokens;
}

function renderToken(token: MarkdownToken, index: number): ReactNode {
  switch (token.type) {
    case "heading": {
      const Tag = `h${token.level}` as "h1" | "h2" | "h3";
      return <Tag key={index}>{token.value}</Tag>;
    }
    case "paragraph":
      return <p key={index}>{renderInline(token.children)}</p>;
    case "code_block":
      return <pre key={index}><code>{token.value}</code></pre>;
    case "list": {
      const Tag = token.ordered ? "ol" : "ul";
      return (
        <Tag key={index}>
          {token.items.map((item, i) => <li key={i}>{item}</li>)}
        </Tag>
      );
    }
    default:
      return null;
  }
}

export function MarkdownView({ content = "", children }: MarkdownViewProps) {
  const tokens = parseMarkdown(content);

  return (
    <div className={styles.markdownView}>
      {tokens.map(renderToken)}
      {children}
    </div>
  );
}
