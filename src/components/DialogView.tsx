import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTTS } from '../hooks/useTTS';
import { Play, Square, ArrowRight, Languages, Volume2 } from 'lucide-react';
import { LessonResult } from './LessonResult';
import { ExerciseShell } from './ExerciseShell';
import { EmptyState } from './EmptyState';
import { motion, AnimatePresence } from 'framer-motion';
import { markSubLessonDone } from '../utils/progress';

interface DialogProps {
  dialog: string;
  lessonId: string;
  onComplete: () => void;
}

export const DialogView: React.FC<DialogProps> = ({ dialog, lessonId, onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [visibleTranslations, setVisibleTranslations] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const isPlayingAll = useRef(false);
  const { speak } = useTTS();

  const lines = useMemo(
    () =>
      dialog
        .split('\n')
        .filter((line) => line.trim() !== '')
        .map((line) => {
          const [ru, pl] = line.split('|');
          return { ru: ru.replace(/^-\s*/, '').trim(), pl: pl?.trim() };
        }),
    [dialog]
  );

  useEffect(
    () => () => {
      isPlayingAll.current = false;
      window.speechSynthesis.cancel();
    },
    []
  );

  const stop = () => {
    isPlayingAll.current = false;
    window.speechSynthesis.cancel();
    setPlayingIndex(null);
  };

  const playSequentially = (startIndex: number) => {
    if (!isPlayingAll.current || startIndex >= lines.length) {
      isPlayingAll.current = false;
      setPlayingIndex(null);
      return;
    }
    setPlayingIndex(startIndex);
    speak(lines[startIndex].ru, 'ru-RU', () => playSequentially(startIndex + 1), startIndex % 2);
  };

  const playAll = () => {
    isPlayingAll.current = true;
    playSequentially(0);
  };

  const toggleTranslation = (idx: number) =>
    setVisibleTranslations((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));

  if (lines.length === 0) {
    return <EmptyState title="Brak dialogu" description="Ta lekcja nie ma jeszcze dialogu." onBack={onComplete} />;
  }

  if (isFinished) {
    return <LessonResult title="Dialog i słuchanie" onBack={onComplete} onRetry={() => setIsFinished(false)} />;
  }

  return (
    <ExerciseShell
      title="Dialog i słuchanie"
      subtitle="Odsłuchaj całość, potem sprawdź tłumaczenia."
      onBack={onComplete}
      headerRight={
        <div className="flex" style={{ gap: '0.5rem' }}>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setShowAll(!showAll);
              setVisibleTranslations([]);
            }}
          >
            <Languages size={18} /> {showAll ? 'Ukryj PL' : 'Pokaż PL'}
          </button>
          <button
            className={`btn btn-icon ${playingIndex !== null ? 'btn-danger' : 'btn-primary'}`}
            onClick={playingIndex !== null ? stop : playAll}
            aria-label={playingIndex !== null ? 'Zatrzymaj' : 'Odtwórz dialog'}
          >
            {playingIndex !== null ? <Square size={18} /> : <Play size={18} />}
          </button>
        </div>
      }
    >
      <div className="card" style={{ padding: '0.5rem' }}>
        {lines.map((line, idx) => {
          const isMe = idx % 2 === 0;
          const showPl = showAll || visibleTranslations.includes(idx);
          return (
            <div
              key={idx}
              style={{
                padding: '0.6rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                background: playingIndex === idx ? 'var(--primary-soft)' : 'transparent',
                transition: 'background 0.3s ease',
              }}
            >
              <div className="flex" style={{ alignItems: 'flex-start', gap: '0.6rem' }}>
                <button
                  className="btn btn-ghost"
                  style={{ padding: '0.35rem', color: playingIndex === idx ? 'var(--primary)' : '#94a3b8' }}
                  onClick={() => {
                    stop();
                    setPlayingIndex(idx);
                    speak(line.ru, 'ru-RU', () => setPlayingIndex(null), idx % 2);
                  }}
                  aria-label="Odtwórz linię"
                >
                  <Volume2 size={16} />
                </button>
                <div style={{ flex: 1 }}>
                  <span
                    className="eyebrow"
                    style={{ color: isMe ? 'var(--primary)' : 'var(--accent)', fontSize: '0.65rem' }}
                  >
                    {isMe ? 'A' : 'B'}
                  </span>
                  <p
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: playingIndex === idx ? 700 : 500,
                      color: playingIndex === idx ? 'var(--primary)' : 'var(--text)',
                    }}
                  >
                    {line.ru}
                  </p>
                  <AnimatePresence>
                    {showPl && line.pl && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-muted)',
                          fontStyle: 'italic',
                          overflow: 'hidden',
                        }}
                      >
                        {line.pl}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {line.pl && !showAll && (
                  <button
                    className="btn btn-ghost"
                    onClick={() => toggleTranslation(idx)}
                    aria-label="Pokaż tłumaczenie"
                    style={{ color: visibleTranslations.includes(idx) ? 'var(--primary)' : 'var(--text-muted)' }}
                  >
                    <Languages size={18} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="btn btn-primary btn-block"
        onClick={() => {
          stop();
          markSubLessonDone(lessonId, 'dialog');
          setIsFinished(true);
        }}
      >
        Zakończ dialog <ArrowRight size={20} />
      </button>
    </ExerciseShell>
  );
};
