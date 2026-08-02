import React, { useEffect, useState } from 'react';
import { Keyboard as KeyboardIcon, X, Delete } from 'lucide-react';

interface CyrillicKeyboardProps {
  onInput: (char: string) => void;
  onBackspace: () => void;
}

const rows = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
  ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'ё'],
];

export const CyrillicKeyboard: React.FC<CyrillicKeyboardProps> = ({ onInput, onBackspace }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Klawiatura jest przyklejona do dołu - odsuwamy treść, by nie zasłaniała przycisków.
  useEffect(() => {
    document.body.style.paddingBottom = isOpen ? '17rem' : '';
    return () => {
      document.body.style.paddingBottom = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setIsOpen(true)}
        aria-label="Otwórz klawiaturę cyrylicy"
        style={{ padding: '0 0.9rem', flexShrink: 0 }}
      >
        <KeyboardIcon size={20} />
      </button>
    );
  }

  const keyStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: '44px',
    height: '46px',
    background: 'var(--card)',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.05rem',
    fontWeight: 600,
    color: 'var(--text)',
    boxShadow: '0 1px 2px rgb(15 23 42 / 0.25)',
    cursor: 'pointer',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '620px',
        background: '#cbd5e1',
        padding: `0.5rem 0.5rem calc(0.5rem + env(safe-area-inset-bottom))`,
        boxShadow: '0 -4px 20px rgb(15 23 42 / 0.18)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
      }}
    >
      <div className="flex" style={{ justifyContent: 'space-between', padding: '0 0.25rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Cyrylica</span>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Zamknij klawiaturę"
          style={{ border: 'none', background: 'none', padding: '0.25rem', cursor: 'pointer', color: '#475569' }}
        >
          <X size={20} />
        </button>
      </div>

      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
          {row.map((key) => (
            <button key={key} type="button" onClick={() => onInput(key)} style={keyStyle}>
              {key}
            </button>
          ))}
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
        <button type="button" onClick={() => onInput(' ')} style={{ ...keyStyle, flex: 5, maxWidth: 'none' }}>
          spacja
        </button>
        <button
          type="button"
          onClick={onBackspace}
          aria-label="Usuń znak"
          style={{ ...keyStyle, flex: 2, maxWidth: 'none', background: '#94a3b8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Delete size={20} />
        </button>
      </div>
    </div>
  );
};
