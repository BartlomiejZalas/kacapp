import React, { useState } from 'react';
import type { Word } from '../types';
import { getWordEmoji, getWordGradient } from '../utils/wordVisual';

interface WordImageProps {
  word: Word;
  height?: number;
}

/**
 * Zdjęcie słówka z gwarantowanym zapasem: gdy URL padnie (a linki z sieci padają),
 * pokazujemy kafelek z emoji/literą zamiast ikony zepsutego obrazka.
 */
export const WordImage: React.FC<WordImageProps> = ({ word, height = 190 }) => {
  const [failed, setFailed] = useState(false);
  const emoji = getWordEmoji(word.ru);

  if (word.image && !failed) {
    return (
      <img
        src={word.image}
        alt={word.pl}
        loading="lazy"
        onError={() => setFailed(true)}
        style={{
          width: '100%',
          height,
          objectFit: 'cover',
          borderRadius: 'var(--radius-sm)',
          margin: '1rem 0',
          background: 'var(--background)',
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={word.pl}
      style={{
        width: '100%',
        height,
        borderRadius: 'var(--radius-sm)',
        margin: '1rem 0',
        background: getWordGradient(word.ru),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: emoji ? `${Math.round(height * 0.45)}px` : `${Math.round(height * 0.35)}px`,
        fontWeight: 800,
        color: 'rgba(15, 23, 42, 0.55)',
        userSelect: 'none',
      }}
    >
      {emoji ?? word.ru.charAt(0).toUpperCase()}
    </div>
  );
};
