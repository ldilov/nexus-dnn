const MAX_CHARS: usize = 60;

pub fn derive_title(first_user_message: &str) -> String {
    let normalized = normalize(first_user_message);
    if normalized.is_empty() {
        return "New chat".to_owned();
    }

    let char_count = normalized.chars().count();
    if char_count <= MAX_CHARS {
        return normalized;
    }

    let head: String = normalized.chars().take(MAX_CHARS).collect();
    let trimmed = trim_to_word_boundary(&head);
    format!("{trimmed}…")
}

fn normalize(input: &str) -> String {
    let mut out = String::with_capacity(input.len());
    let mut last_was_space = false;
    for ch in input.chars() {
        if ch.is_whitespace() {
            if !out.is_empty() && !last_was_space {
                out.push(' ');
                last_was_space = true;
            }
        } else {
            out.push(ch);
            last_was_space = false;
        }
    }
    if out.ends_with(' ') {
        out.pop();
    }
    out
}

fn trim_to_word_boundary(head: &str) -> String {
    if let Some(last_space_byte) = head.rfind(char::is_whitespace) {
        let candidate = head[..last_space_byte].trim_end();
        if !candidate.is_empty() {
            return candidate.to_owned();
        }
    }
    head.trim_end().to_owned()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn short_input_returned_verbatim() {
        assert_eq!(derive_title("hi"), "hi");
    }

    #[test]
    fn empty_input_falls_back() {
        assert_eq!(derive_title(""), "New chat");
        assert_eq!(derive_title("   "), "New chat");
    }

    #[test]
    fn long_input_truncated_at_word_boundary_with_ellipsis() {
        let input = "a".repeat(30) + " " + &"b".repeat(30) + " " + &"c".repeat(30);
        let out = derive_title(&input);
        assert!(out.ends_with('…'));
        assert!(out.chars().count() <= MAX_CHARS + 1);
        assert!(!out.contains("   "));
    }

    #[test]
    fn collapses_internal_whitespace() {
        assert_eq!(derive_title("hello    world"), "hello world");
    }

    #[test]
    fn unicode_char_safe() {
        let emoji_string: String = "🚀".repeat(70);
        let out = derive_title(&emoji_string);
        assert!(out.ends_with('…'));
        assert!(out.chars().count() <= MAX_CHARS + 1);
    }

    #[test]
    fn no_word_boundary_hard_truncates() {
        let input = "a".repeat(100);
        let out = derive_title(&input);
        assert!(out.ends_with('…'));
        assert!(out.chars().count() <= MAX_CHARS + 1);
    }

    #[test]
    fn exactly_60_chars_not_truncated() {
        let input = "a".repeat(60);
        assert_eq!(derive_title(&input), input);
    }

    #[test]
    fn sixty_one_chars_gets_ellipsis() {
        let input = "a".repeat(61);
        let out = derive_title(&input);
        assert!(out.ends_with('…'));
    }

    #[test]
    fn whitespace_at_boundary_trimmed() {
        let input = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do";
        let out = derive_title(input);
        assert!(out.len() <= 64);
    }

    #[test]
    fn newlines_collapse() {
        assert_eq!(derive_title("hello\n\n\nworld"), "hello world");
    }

    #[test]
    fn tab_whitespace_collapsed() {
        assert_eq!(derive_title("hello\t\tworld"), "hello world");
    }

    #[test]
    fn repeated_idempotent() {
        let input = "some long message that definitely exceeds the sixty character limit here";
        let a = derive_title(input);
        let b = derive_title(input);
        let c = derive_title(input);
        assert_eq!(a, b);
        assert_eq!(b, c);
    }
}
