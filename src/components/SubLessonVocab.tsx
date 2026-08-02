import React, { useEffect, useMemo, useState } from 'react';
import type { Word } from '../types';
import { useTTS } from '../hooks/useTTS';
import { useQuiz } from '../hooks/useQuiz';
import { ArrowRight, Volume2 } from 'lucide-react';
import { LessonResult } from './LessonResult';
import { ExerciseShell } from './ExerciseShell';
import { QuizCard } from './QuizCard';
import { EmptyState } from './EmptyState';
import { WordImage } from './WordImage';
import { markSubLessonDone, registerLearnedWords } from '../utils/progress';

interface VocabProps {
  words: Word[];
  lessonId: string;
  type: 'vocab' | 'hard_vocab';
  onComplete: () => void;
}

export const SubLessonVocab: React.FC<VocabProps> = ({ words, lessonId, type, onComplete }) => {
  const title = type === 'hard_vocab' ? 'Słówka (trudne)' : 'Lekcja słówek';
  const [phase, setPhase] = useState<'learning' | 'testing'>('learning');
  const [learnIndex, setLearnIndex] = useState(0);
  const { speak } = useTTS();

  const questions = useMemo(
    () => words.map((w) => ({ id: w.ru, prompt: w.pl, answer: w.ru })),
    [words]
  );
  const quiz = useQuiz(questions, { onAnswerRevealed: speak });

  useEffect(() => {
    if (phase === 'learning' && words[learnIndex]) speak(words[learnIndex].ru);
  }, [learnIndex, phase, words, speak]);

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  useEffect(() => {
    if (quiz.finished) {
      markSubLessonDone(lessonId, type);
      registerLearnedWords(words);
    }
  }, [quiz.finished, lessonId, type, words]);

  if (words.length === 0) {
    return (
      <EmptyState
        title="Brak słówek"
        description="Ta lekcja nie ma jeszcze materiału w tej sekcji."
        onBack={onComplete}
      />
    );
  }

  if (quiz.finished) {
    return (
      <LessonResult
        title={title}
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
    const word = words[learnIndex];
    return (
      <ExerciseShell
        title={title}
        subtitle="Najpierw poznaj słówka, potem sprawdzimy pamięć."
        onBack={onComplete}
        progress={((learnIndex + 1) / words.length) * 100}
        progressLabel={`Nauka ${learnIndex + 1} / ${words.length}`}
      >
        <div className="card" style={{ textAlign: 'center' }}>
          <WordImage word={word} />
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>{word.ru}</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{word.pl}</p>
          <button className="btn btn-secondary btn-icon" onClick={() => speak(word.ru)} aria-label="Przeczytaj">
            <Volume2 />
          </button>
        </div>

        <button
          className="btn btn-primary btn-block"
          onClick={() => (learnIndex < words.length - 1 ? setLearnIndex(learnIndex + 1) : setPhase('testing'))}
        >
          {learnIndex < words.length - 1 ? 'Dalej' : 'Zacznij test'} <ArrowRight size={20} />
        </button>
      </ExerciseShell>
    );
  }

  return (
    <ExerciseShell
      title={title}
      subtitle="Wpisz słówko po rosyjsku."
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
