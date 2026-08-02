import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Zap, Volume2 } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';
import { useQuiz } from '../hooks/useQuiz';
import { LessonResult } from './LessonResult';
import { ExerciseShell } from './ExerciseShell';
import { QuizCard } from './QuizCard';
import { EmptyState } from './EmptyState';
import { markSubLessonDone } from '../utils/progress';

interface UnusualProps {
  phrases: {
    pl: string;
    ru: string;
    explanation?: string;
    examples?: { pl: string; ru: string }[];
  }[];
  lessonId: string;
  onComplete: () => void;
}

export const SubLessonUnusual: React.FC<UnusualProps> = ({ phrases, lessonId, onComplete }) => {
  const [phase, setPhase] = useState<'learning' | 'testing'>('learning');
  const [learnIndex, setLearnIndex] = useState(0);
  const { speak } = useTTS();

  // Testujemy samą regułę i każdy jej przykład - wcześniej reguła bywała pomijana.
  const questions = useMemo(
    () =>
      phrases.flatMap((phrase) => [
        { id: phrase.ru, prompt: phrase.pl, answer: phrase.ru, context: 'Reguła' },
        ...(phrase.examples ?? []).map((ex) => ({
          id: ex.ru,
          prompt: ex.pl,
          answer: ex.ru,
          context: phrase.pl,
        })),
      ]),
    [phrases]
  );
  const quiz = useQuiz(questions, { onAnswerRevealed: speak });

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  useEffect(() => {
    if (quiz.finished) markSubLessonDone(lessonId, 'unusual');
  }, [quiz.finished, lessonId]);

  if (phrases.length === 0) {
    return (
      <EmptyState
        title="Brak związków słów"
        description="Ta lekcja nie ma jeszcze materiału w tej sekcji."
        onBack={onComplete}
      />
    );
  }

  if (quiz.finished) {
    return (
      <LessonResult
        title="Związki słów"
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
    const phrase = phrases[learnIndex];
    return (
      <ExerciseShell
        title="Związki słów"
        subtitle="Konstrukcje, które w rosyjskim działają inaczej niż po polsku."
        onBack={onComplete}
        progress={((learnIndex + 1) / phrases.length) * 100}
        progressLabel={`Reguła ${learnIndex + 1} / ${phrases.length}`}
      >
        <div className="card">
          <span className="badge" style={{ background: '#f5f3ff', color: 'var(--accent)' }}>
            <Zap size={14} /> Reguła
          </span>
          <div className="flex" style={{ justifyContent: 'space-between', marginTop: '0.75rem' }}>
            <h1 style={{ fontSize: '1.6rem' }}>{phrase.ru}</h1>
            <button className="btn btn-ghost" onClick={() => speak(phrase.ru)} aria-label="Przeczytaj">
              <Volume2 size={20} />
            </button>
          </div>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{phrase.pl}</p>

          {phrase.explanation && (
            <div
              style={{
                padding: '0.9rem 1rem',
                background: '#faf5ff',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '4px solid var(--accent)',
                marginBottom: '1rem',
              }}
            >
              {phrase.explanation}
            </div>
          )}

          {phrase.examples && phrase.examples.length > 0 && (
            <div style={{ background: 'var(--surface)', padding: '0.9rem', borderRadius: 'var(--radius-sm)' }}>
              <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
                Przykłady
              </span>
              {phrase.examples.map((ex) => (
                <div
                  key={ex.ru}
                  className="flex"
                  style={{ justifyContent: 'space-between', gap: '0.5rem', padding: '0.35rem 0' }}
                >
                  <div style={{ fontSize: '0.95rem' }}>
                    <strong>{ex.ru}</strong>
                    <span style={{ color: 'var(--text-muted)' }}> — {ex.pl}</span>
                  </div>
                  <button className="btn btn-ghost" onClick={() => speak(ex.ru)} aria-label="Przeczytaj przykład">
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="btn btn-primary btn-block"
          onClick={() => (learnIndex < phrases.length - 1 ? setLearnIndex(learnIndex + 1) : setPhase('testing'))}
        >
          {learnIndex < phrases.length - 1 ? 'Następna reguła' : 'Zacznij test'} <ArrowRight size={20} />
        </button>
      </ExerciseShell>
    );
  }

  return (
    <ExerciseShell
      title="Związki słów"
      subtitle="Wpisz konstrukcję po rosyjsku."
      onBack={onComplete}
      progress={quiz.progress}
      progressLabel={`Opanowane ${quiz.stats.mastered} / ${quiz.stats.total}`}
    >
      {quiz.current && (
        <QuizCard
          context={quiz.current.context}
          prompt={quiz.current.prompt}
          answer={quiz.current.answer}
          input={quiz.input}
          onInputChange={quiz.setInput}
          feedback={quiz.feedback}
          onCheck={quiz.check}
          onGiveUp={quiz.giveUp}
          onNext={quiz.next}
          onSpeak={() => speak(quiz.current!.answer)}
          multiline
          isLast={quiz.position >= quiz.queueLength}
        />
      )}
    </ExerciseShell>
  );
};
