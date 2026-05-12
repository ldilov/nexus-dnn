const BRAILLE_BASE: u32 = 0x2800;

pub fn braille_cell(dots: u8) -> char {
    char::from_u32(BRAILLE_BASE + dots as u32).unwrap_or('·')
}

pub fn braille_column(filled_rows: u8, max_rows: u8) -> char {
    let height = max_rows.min(4);
    let filled = filled_rows.min(height);
    let mut left_mask: u8 = 0;
    for row in 0..filled {
        left_mask |= BRAILLE_LEFT_ROW[row as usize];
    }
    braille_cell(left_mask)
}

const BRAILLE_LEFT_ROW: [u8; 4] = [0x40, 0x04, 0x02, 0x01];

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn base_offset_yields_blank_braille() {
        assert_eq!(braille_cell(0), '\u{2800}');
    }

    #[test]
    fn full_byte_yields_dense_braille() {
        assert_eq!(braille_cell(0xFF), '\u{28FF}');
    }

    #[test]
    fn single_dot_patterns_are_distinct() {
        let one_dot = braille_cell(0x01);
        let two_dot = braille_cell(0x02);
        let four_dot = braille_cell(0x04);
        assert_ne!(one_dot, two_dot);
        assert_ne!(two_dot, four_dot);
        assert_ne!(one_dot, four_dot);
    }

    #[test]
    fn column_zero_returns_blank() {
        assert_eq!(braille_column(0, 4), '\u{2800}');
    }

    #[test]
    fn column_grows_with_filled_rows() {
        let one = braille_column(1, 4);
        let two = braille_column(2, 4);
        let three = braille_column(3, 4);
        let four = braille_column(4, 4);
        assert_ne!(one, two);
        assert_ne!(two, three);
        assert_ne!(three, four);
    }

    #[test]
    fn column_clamps_to_max_rows() {
        let four = braille_column(4, 4);
        let over = braille_column(99, 4);
        assert_eq!(four, over);
    }
}
