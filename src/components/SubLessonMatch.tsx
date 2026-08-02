import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Word } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { LessonResult } from './LessonResult';
import { ExerciseShell } from './ExerciseShell';
import { EmptyState } from './EmptyState';
import { useTTS } from '../hooks/useTTS';
import { shuffle } from '../utils/shuffle';
import { markSubLessonDone } from '../utils/progress';

interface MatchProps {
  words: Word[];
  lessonId: string;
  onComplete: () => void;
}

interface Item {
  id: string;
  text: string;
  type: 'ru' | 'pl';
  pairId: string;
}

export const SubLessonMatch: React.FC<MatchProps> = ({ words, lessonId, onComplete }) => {
  const [round, setRound] = useState(0);
  const [selectedPl, setSelectedPl] = useState<Item | null>(null);
  const [selectedRu, setSelectedRu] = useState<Item | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState<Word[]>([]);
  const [isWrong, setIsWrong] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timers = useRef<number[]>([]);
  const { speak } = useTTS();

  const columns = useMemo(() => {
    // round w zależnościach: „Powtórz ćwiczenie” tasuje kafelki od nowa.
    void round;
    return {
      pl: shuffle(words.map((w) => ({ id: `pl-${w.ru}`, text: w.pl, type: 'pl' as const, pairId: w.ru }))),
      ru: shuffle(words.map((w) => ({ id: `ru-${w.ru}`, text: w.ru, type: 'ru' as const, pairId: w.ru }))),
    };
  }, [words, round]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      window.speechSynthesis.cancel();
    },
    []
  );

  const resolvePair = (pl: Item, ru: Item) => {
    if (pl.pairId === ru.pairId) {
      speak(ru.text);
      const newMatched = [...matchedPairIds, pl.pairId];
      setMatchedPairIds(newMatched);
      setSelectedPl(null);
      setSelectedRu(null);
      if (newMatched.length === words.length) {
        markSubLessonDone(lessonId, 'match');
        timers.current.push(window.setTimeout(() => setIsFinished(true), 700));
      }
      return;
    }

    setIsWrong(true);
    const missed = words.find((w) => w.ru === ru.pairId);
    if (missed && !wrongAttempts.some((w) => w.ru === missed.ru)) {
      setWrongAttempts((prev) => [...prev, missed]);
    }
    timers.current.push(
      window.setTimeout(() => {
        setIsWrong(false);
        setSelectedPl(null);
        setSelectedRu(null);
      }, 600)
    );
  };

  const select = (item: Item) => {
    if (isWrong || matchedPairIds.includes(item.pairId)) return;

    if (item.type === 'pl') {
      const next = selectedPl?.id === item.id ? null : item;
      setSelectedPl(next);
      if (next && selectedRu) resolvePair(next, selectedRu);
    } else {
      const next = selectedRu?.id === item.id ? null : item;
      setSelectedRu(next);
      if (next && selectedPl) resolvePair(selectedPl, next);
    }
  };

  const stats = useMemo(
    () => ({
      total: words.length,
      mastered: words.length,
      answers: words.length + wrongAttempts.length,
      correct: words.length,
      mistakes: wrongAttempts.map((w) => ({ id: w.ru, prompt: w.pl, answer: w.ru })),
    }),
    [words.length, wrongAttempts]
  );

  if (words.length === 0) {
    return (
      <EmptyState title="Brak par" description="Ta lekcja nie ma jeszcze słówek do dopasowania." onBack={onComplete} />
    );
  }

  if (isFinished) {
    return (
      <LessonResult
        title="Dopasuj pary"
        stats={stats}
        onRetry={() => {
          setRound((r) => r + 1);
          setMatchedPairIds([]);
          setWrongAttempts([]);
          setSelectedPl(null);
          setSelectedRu(null);
          setIsFinished(false);
        }}
        onBack={onComplete}
      />
    );
  }

  const renderColumn = (items: Item[], selected: Item | null, dir: number) => (
    <div className="grid" style={{ width: '100%', gap: '0.6rem', alignContent: 'start' }}>
      <AnimatePresence>
        {items.map(
          (item) =>
            !matchedPairIds.includes(item.pairId) && (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, x: dir * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                onClick={() => select(item)}
                className="card card-interactive"
                style={{
                  textAlign: 'center',
                  padding: '0.9rem 0.5rem',
                  margin: 0,
                  width: '100%',
                  font: 'inherit',
                  fontWeight: 600,
                  background: selected?.id === item.id ? 'var(--primary)' : 'var(--card)',
                  color: selected?.id === item.id ? 'white' : 'var(--text)',
                  borderColor: isWrong && selected?.id === item.id ? 'var(--error)' : 'var(--border)',
                }}
              >
                {item.text}
              </motion.button>
            )
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <ExerciseShell
      title="Dopasuj pary"
      subtitle="Kliknij polskie słowo i jego rosyjski odpowiednik."
      onBack={onComplete}
      progress={(matchedPairIds.length / words.length) * 100}
      progressLabel={`Dopasowane ${matchedPairIds.length} / ${words.length}`}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        {renderColumn(columns.pl, selectedPl, -1)}
        {renderColumn(columns.ru, selectedRu, 1)}
      </div>
    </ExerciseShell>
  );
};
