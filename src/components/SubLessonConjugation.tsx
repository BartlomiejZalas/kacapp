import React, { useEffect, useMemo, useState } from 'react';
import type { Conjugation } from '../types';
import { ArrowRight, Volume2 } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';
import { useQuiz } from '../hooks/useQuiz';
import { LessonResult } from './LessonResult';
import { ExerciseShell } from './ExerciseShell';
import { QuizCard } from './QuizCard';
import { EmptyState } from './EmptyState';
import { markSubLessonDone } from '../utils/progress';

interface ConjugationProps {
  conjugations: Conjugation[];
  lessonId: string;
  onComplete: () => void;
}

export const SubLessonConjugation: React.FC<ConjugationProps> = ({ conjugations, lessonId, onComplete }) => {
  const [phase, setPhase] = useState<'learning' | 'testing'>('learning');
  const [learnIndex, setLearnIndex] = useState(0);
  const { speak } = useTTS();

  const questions = useMemo(
    () =>
      conjugations.flatMap((conj) =>
        conj.rows.map((row) => ({
          id: `${conj.title}-${row.pronoun}`,
          prompt: `${row.pronoun} ...`,
          answer: row.verb,
          context: conj.title,
        }))
      ),
    [conjugations]
  );
  const quiz = useQuiz(questions, { onAnswerRevealed: speak });

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  useEffect(() => {
    if (quiz.finished) markSubLessonDone(lessonId, 'conjugation');
  }, [quiz.finished, lessonId]);

  if (questions.length === 0) {
    return (
      <EmptyState
        title="Brak odmian"
        description="Ta lekcja nie ma jeszcze materiału w tej sekcji."
        onBack={onComplete}
      />
    );
  }

  if (quiz.finished) {
    return (
      <LessonResult
        title="Odmiana"
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
    const conj = conjugations[learnIndex];
    return (
      <ExerciseShell
        title="Odmiana"
        subtitle="Zapamiętaj odmianę, potem uzupełnisz formy z pamięci."
        onBack={onComplete}
        progress={((learnIndex + 1) / conjugations.length) * 100}
        progressLabel={`Nauka ${learnIndex + 1} / ${conjugations.length}`}
      >
        <div className="card">
          <div className="flex" style={{ justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem' }}>{conj.title}</h3>
            <button
              className="btn btn-ghost"
              onClick={() => speak(conj.rows.map((r) => `${r.pronoun} ${r.verb}`).join(', '))}
              aria-label="Przeczytaj całą odmianę"
            >
              <Volume2 size={20} />
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.75rem' }}>
            <tbody>
              {conj.rows.map((row) => (
                <tr key={row.pronoun} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.7rem 0.25rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {row.pronoun}
                  </td>
                  <td style={{ padding: '0.7rem 0.25rem', fontWeight: 700, fontSize: '1.1rem' }}>{row.verb}</td>
                  <td style={{ width: '40px', textAlign: 'right' }}>
                    <button className="btn btn-ghost" onClick={() => speak(row.verb)} aria-label={`Przeczytaj ${row.verb}`}>
                      <Volume2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="btn btn-primary btn-block"
          onClick={() =>
            learnIndex < conjugations.length - 1 ? setLearnIndex(learnIndex + 1) : setPhase('testing')
          }
        >
          {learnIndex < conjugations.length - 1 ? 'Następny czasownik' : 'Zacznij test'} <ArrowRight size={20} />
        </button>
      </ExerciseShell>
    );
  }

  return (
    <ExerciseShell
      title="Odmiana"
      subtitle="Wpisz poprawną formę czasownika."
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
          placeholder="Forma rosyjska..."
          isLast={quiz.position >= quiz.queueLength}
        />
      )}
    </ExerciseShell>
  );
};
