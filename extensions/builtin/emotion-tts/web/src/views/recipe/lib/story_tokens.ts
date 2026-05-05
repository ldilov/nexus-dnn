export type StoryTokenKind = "text" | "character" | "emotion";

export interface StoryToken {
  kind: StoryTokenKind;
  start: number;
  end: number;
  value: string;
}

const SEPARATORS = new Set([" ", "\t", "\n", "\r"]);

function isNameChar(ch: string): boolean {
  if (ch === "_" || ch === "-") return true;
  return /\p{L}|\p{N}/u.test(ch);
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
    const prev = i === 0 ? "" : input[i - 1] ?? "";
    const atBoundary = i === 0 || SEPARATORS.has(prev);

    if (trigger && atBoundary) {
      let j = i + 1;
      let name = "";
      while (j < n) {
        const nc = input[j];
        if (nc && isNameChar(nc)) {
          name += nc;
          j += 1;
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

export interface ActiveTrigger {
  kind: "character" | "emotion";
  start: number;
  query: string;
}

export function activeTriggerAt(input: string, caret: number): ActiveTrigger | null {
  if (caret <= 0 || caret > input.length) return null;
  let i = caret - 1;
  let query = "";
  while (i >= 0) {
    const ch = input[i];
    if (!ch) break;
    if (ch === "@" || ch === "/") {
      const prev = i === 0 ? "" : input[i - 1] ?? "";
      const atBoundary = i === 0 || SEPARATORS.has(prev);
      if (!atBoundary) return null;
      return {
        kind: ch === "@" ? "character" : "emotion",
        start: i,
        query,
      };
    }
    if (!isNameChar(ch)) return null;
    query = ch + query;
    i -= 1;
  }
  return null;
}
