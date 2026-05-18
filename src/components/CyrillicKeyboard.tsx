import React, { useState } from 'react';
import { Keyboard as KeyboardIcon, X } from 'lucide-react';

interface CyrillicKeyboardProps {
  onInput: (char: string) => void;
  onBackspace: () => void;
}

export const CyrillicKeyboard: React.FC<CyrillicKeyboardProps> = ({ onInput, onBackspace }) => {
  const [isOpen, setIsOpen] = useState(false);

  const keys = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']
  ];

  if (!isOpen) {
    return (
      <button 
        type="button"
        className="btn btn-secondary" 
        onClick={() => setIsOpen(true)}
        style={{ padding: '0.5rem', minWidth: 'auto' }}
      >
        <KeyboardIcon size={20} />
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#d1d5db',
      padding: '0.5rem',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => setIsOpen(false)} style={{ border: 'none', background: 'none', padding: '0.25rem' }}>
          <X size={20} />
        </button>
      </div>
      {keys.map((row, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
          {row.map(key => (
            <button
              key={key}
              type="button"
              onClick={() => onInput(key)}
              style={{
                flex: 1,
                maxWidth: '40px',
                height: '45px',
                background: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                cursor: 'pointer'
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
        <button
          type="button"
          onClick={onBackspace}
          style={{
            flex: 2,
            height: '45px',
            background: '#9ca3af',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Backspace
        </button>
        <button
          type="button"
          onClick={() => onInput(' ')}
          style={{
            flex: 4,
            height: '45px',
            background: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Space
        </button>
      </div>
    </div>
  );
};
