import { useEffect, useRef, useState } from 'react';
import * as css from '../chat.css';

interface Props {
  current: string;
  onSubmit: (next: string) => void;
  onCancel: () => void;
}

export function RenameAffordance({ current, onSubmit, onCancel }: Props) {
  const [value, setValue] = useState(current);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <input
      ref={inputRef}
      className={css.composerInput}
      style={{ minHeight: 'auto', maxHeight: 'none' }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const trimmed = value.trim();
          if (trimmed && trimmed !== current) onSubmit(trimmed);
          else onCancel();
        } else if (e.key === 'Escape') {
          onCancel();
        }
      }}
      onBlur={() => onCancel()}
      aria-label="Rename thread"
    />
  );
}
