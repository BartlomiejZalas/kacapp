import React, { useEffect, useMemo, useState } from 'react';
import type { Enumerative } from '../types';
import { useTTS } from '../hooks/useTTS';
import { useQuiz } from '../hooks/useQuiz';
import { ArrowRight, Volume2 } from 'lucide-react';
import { LessonResult } from './LessonResult';
import { ExerciseShell } from './ExerciseShell';
import { QuizCard } from './QuizCard';
import { EmptyState } from './EmptyState';
import { markSubLessonDone } from '../utils/progress';

interface EnumProps {
  items: Enumerative[];
  lessonId: string;
  onComplete: () => void;
}

export const SubLessonEnumeratives: React.FC<EnumProps> = ({ items, lessonId, onComplete }) => {
  const [phase, setPhase] = useState<'learning' | 'testing'>('learning');
  const [learnIndex, setLearnIndex] = useState(0);
  const { speak } = useTTS();

  const questions = useMemo(() => items.map((i) => ({ id: i.ru, prompt: i.pl, answer: i.ru })), [items]);
  const quiz = useQuiz(questions, { onAnswerRevealed: speak });

  useEffect(() => {
    if (phase === 'learning' && items[learnIndex]) speak(items[learnIndex].ru);
  }, [phase, learnIndex, items, speak]);

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  useEffect(() => {
    if (quiz.finished) markSubLessonDone(lessonId, 'enumeratives');
  }, [quiz.finished, lessonId]);

  if (items.length === 0) {
    return (
      <EmptyState
        title="Brak wyliczanek"
        description="Ta lekcja nie ma jeszcze materiału w tej sekcji."
        onBack={onComplete}
      />
    );
  }

  if (quiz.finished) {
    return (
      <LessonResult
        title="Enumeratywne"
        stats={quiz.stats}
        onRetry={() => {
          quiz.restart();
          setPhase('learning');
          setLearnIndex(0);
        }}
        onBack={onComplete}
      />
    );
  }

  if (phase === 'learning') {
    const current = items[learnIndex];
    return (
      <ExerciseShell
        title="Enumeratywne"
        subtitle="Zapamiętaj kolejność i brzmienie."
        onBack={onComplete}
        progress={((learnIndex + 1) / items.length) * 100}
        progressLabel={`Nauka ${learnIndex + 1} / ${items.length}`}
      >
        <div className="card" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>{current.ru}</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{current.pl}</p>
          <button className="btn btn-secondary btn-icon" onClick={() => speak(current.ru)} aria-label="Przeczytaj">
            <Volume2 />
          </button>
        </div>
        <button
          className="btn btn-primary btn-block"
          onClick={() => (learnIndex < items.length - 1 ? setLearnIndex(learnIndex + 1) : setPhase('testing'))}
        >
          {learnIndex < items.length - 1 ? 'Dalej' : 'Zacznij test'} <ArrowRight size={20} />
        </button>
      </ExerciseShell>
    );
  }

  return (
    <ExerciseShell
      title="Enumeratywne"
      subtitle="Wpisz po rosyjsku."
      onBack={onComplete}
      progress={quiz.progress}
      progressLabel={`Opanowane ${quiz.stats.mastered} / ${quiz.stats.total}`}
    >
      {quiz.current && (
        <QuizCard
          prompt={quiz.current.prompt}
          answer={quiz.current.answer}
          input={quiz.input}
          onInputChange={quiz.setInput}
          feedback={quiz.feedback}
          onCheck={quiz.check}
          onGiveUp={quiz.giveUp}
          onNext={quiz.next}
          onSpeak={() => speak(quiz.current!.answer)}
          isLast={quiz.position >= quiz.queueLength}
        />
      )}
    </ExerciseShell>
  );
};
