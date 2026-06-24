UPDATE recipes
SET projection = ?
WHERE id = ? AND author_kind = 'user'
