export type StoryTokenKind = "text" | "character" | "emotion";
export type StoryPillKind = "character" | "emotion";

export interface StoryToken {
  kind: StoryTokenKind;
  start: number;
  end: number;
  value: string;
}

export const SIGIL_FOR_KIND: Readonly<Record<StoryPillKind, "@" | "/">> = {
  character: "@",
  emotion: "/",
};

const SEPARATORS = new Set([" ", "\t", "\n", "\r"]);
const NAME_CHAR_PATTERN = /[\p{L}\p{N}_-]/u;
const NON_NAME_RUN = /[^\p{L}\p{N}_-]+/gu;

export function isNameChar(ch: string): boolean {
  if (!ch) return false;
  return NAME_CHAR_PATTERN.test(ch);
}

export function sanitizeTokenName(input: string): string {
  return input
    .replace(NON_NAME_RUN, "_")
    .replace(/_+/g, "_")
    .replace(/^[_-]+|[_-]+$/g, "");
}

function codePointLength(input: string, byteIndex: number): number {
  if (byteIndex >= input.length) return 0;
  const code = input.charCodeAt(byteIndex);
  if (code >= 0xd800 && code <= 0xdbff && byteIndex + 1 < input.length) {
    const next = input.charCodeAt(byteIndex + 1);
    if (next >= 0xdc00 && next <= 0xdfff) return 2;
  }
  return 1;
}

function codePointAtSafe(input: string, byteIndex: number): string {
  const len = codePointLength(input, byteIndex);
  return len === 0 ? "" : input.slice(byteIndex, byteIndex + len);
}

export function tokeniseStory(input: string): StoryToken[] {
  const tokens: StoryToken[] = [];
  let textStart = 0;
  let i = 0;
  const n = input.length;

  const flushText = (end: number) => {
    if (end > textStart) {
      tokens.push({
        kind: "text",
        start: textStart,
        end,
        value: input.slice(textStart, end),
      });
    }
  };

  while (i < n) {
    const ch = input[i];
    const trigger = ch === "@" || ch === "/";
    const prev = i === 0 ? "" : codePointAtSafe(input, prevCodePointIndex(input, i));
    const atBoundary = i === 0 || (prev !== "" && SEPARATORS.has(prev));

    if (trigger && atBoundary) {
      let j = i + 1;
      let name = "";
      while (j < n) {
        const nc = codePointAtSafe(input, j);
        if (nc && isNameChar(nc)) {
          name += nc;
          j += nc.length;
        } else {
          break;
        }
      }
      if (name) {
        flushText(i);
        tokens.push({
          kind: ch === "@" ? "character" : "emotion",
          start: i,
          end: j,
          value: name,
        });
        textStart = j;
        i = j;
        continue;
      }
    }
    i += 1;
  }
  flushText(n);
  return tokens;
}

function prevCodePointIndex(input: string, idx: number): number {
  if (idx <= 0) return -1;
  const lo = input.charCodeAt(idx - 1);
  if (lo >= 0xdc00 && lo <= 0xdfff && idx >= 2) {
    const hi = input.charCodeAt(idx - 2);
    if (hi >= 0xd800 && hi <= 0xdbff) return idx - 2;
  }
  return idx - 1;
}

export interface ActiveTrigger {
  kind: "character" | "emotion";
  start: number;
  query: string;
}

export function activeTriggerAt(input: string, caret: number): ActiveTrigger | null {
  if (caret <= 0 || caret > input.length) return null;
  let i = prevCodePointIndex(input, caret);
  let query = "";
  while (i >= 0) {
    const ch = codePointAtSafe(input, i);
    if (!ch) break;
    if (ch === "@" || ch === "/") {
      const prev = i === 0 ? "" : codePointAtSafe(input, prevCodePointIndex(input, i));
      const atBoundary = i === 0 || (prev !== "" && SEPARATORS.has(prev));
      if (!atBoundary) return null;
      return {
        kind: ch === "@" ? "character" : "emotion",
        start: i,
        query,
      };
    }
    if (!isNameChar(ch)) return null;
    query = ch + query;
    const next = prevCodePointIndex(input, i);
    if (next < 0) break;
    i = next;
  }
  return null;
}
