import React, { useEffect, useMemo, useState } from 'react';
import type { GrammarLesson } from '../types';
import { useTTS } from '../hooks/useTTS';
import { useQuiz } from '../hooks/useQuiz';
import { ArrowRight, Volume2, Lightbulb, BookOpen } from 'lucide-react';
import { ExerciseShell } from './ExerciseShell';
import { ChoiceCard } from './ChoiceCard';
import { LessonResult } from './LessonResult';
import { markSubLessonDone } from '../utils/progress';

interface GrammarLessonViewProps {
  lesson: GrammarLesson;
  onBack: () => void;
}

export const GrammarLessonView: React.FC<GrammarLessonViewProps> = ({ lesson, onBack }) => {
  const [phase, setPhase] = useState<'theory' | 'practice'>('theory');
  const [ruleIndex, setRuleIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { speak } = useTTS();

  const questions = useMemo(
    () =>
      lesson.questions.map((q) => ({
        id: q.prompt,
        prompt: q.prompt,
        answer: q.options[q.correctIndex],
        context: q.translation,
        options: q.options,
        explanation: q.explanation,
      })),
    [lesson]
  );

  const quiz = useQuiz(questions);

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  useEffect(() => {
    if (quiz.finished) markSubLessonDone(lesson.id, 'grammar');
  }, [quiz.finished, lesson.id]);

  /** Zdanie z wstawioną poprawną formą - to czytamy na głos. */
  const fullSentence = (prompt: string, answer: string) => prompt.replace('___', answer);

  if (quiz.finished) {
    return (
      <LessonResult
        title={lesson.name}
        stats={quiz.stats}
        onRetry={() => {
          quiz.restart();
          setSelectedIndex(null);
          setPhase('theory');
          setRuleIndex(0);
        }}
        onBack={onBack}
        backLabel="Wróć do menu"
      />
    );
  }

  if (phase === 'theory') {
    const rule = lesson.rules[ruleIndex];
    const isLastRule = ruleIndex === lesson.rules.length - 1;

    return (
      <ExerciseShell
        title={lesson.name}
        subtitle={lesson.summary}
        onBack={onBack}
        progress={((ruleIndex + 1) / lesson.rules.length) * 100}
        progressLabel={`Zasada ${ruleIndex + 1} / ${lesson.rules.length}`}
        headerRight={
          <span className="badge">
            <BookOpen size={14} /> Teoria
          </span>
        }
      >
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{rule.title}</h3>
          <p style={{ color: 'var(--text)', marginBottom: '1rem' }}>{rule.body}</p>

          {rule.keyPoint && (
            <div
              className="flex"
              style={{
                alignItems: 'flex-start',
                gap: '0.6rem',
                padding: '0.9rem 1rem',
                background: '#faf5ff',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '4px solid var(--accent)',
                marginBottom: '1rem',
              }}
            >
              <Lightbulb size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span style={{ fontWeight: 600 }}>{rule.keyPoint}</span>
            </div>
          )}

          {rule.table && (
            <div style={{ overflowX: 'auto', marginBottom: rule.examples ? '1rem' : 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                <thead>
                  <tr>
                    {rule.table.headers.map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: 'left',
                          padding: '0.5rem',
                          fontSize: '0.72rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--text-muted)',
                          borderBottom: '2px solid var(--border)',
                          lineHeight: 1.3,
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rule.table.rows.map((row) => (
                    <tr key={row.join('|')}>
                      {row.map((cell, i) => (
                        <td
                          key={cell + i}
                          style={{
                            padding: '0.6rem 0.5rem',
                            borderBottom: '1px solid var(--border)',
                            fontWeight: i === 0 ? 600 : 700,
                            color: i === 0 ? 'var(--text-muted)' : 'var(--text)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {rule.examples && (
            <div style={{ background: 'var(--surface)', padding: '0.9rem', borderRadius: 'var(--radius-sm)' }}>
              <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
                Przykłady
              </span>
              {rule.examples.map((ex) => (
                <div
                  key={ex.ru}
                  className="flex"
                  style={{ justifyContent: 'space-between', gap: '0.5rem', padding: '0.4rem 0' }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{ex.ru}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{ex.pl}</div>
                    {ex.note && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--error)', marginTop: '0.15rem' }}>{ex.note}</div>
                    )}
                  </div>
                  <button className="btn btn-ghost" onClick={() => speak(ex.ru)} aria-label="Przeczytaj przykład">
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid" style={{ gap: '0.6rem' }}>
          <button
            className="btn btn-primary btn-block"
            onClick={() => (isLastRule ? setPhase('practice') : setRuleIndex(ruleIndex + 1))}
          >
            {isLastRule ? `Przejdź do ćwiczeń (${lesson.questions.length})` : 'Następna zasada'}{' '}
            <ArrowRight size={20} />
          </button>
          {ruleIndex > 0 && (
            <button className="btn btn-secondary btn-block" onClick={() => setRuleIndex(ruleIndex - 1)}>
              Wróć do poprzedniej
            </button>
          )}
        </div>
      </ExerciseShell>
    );
  }

  return (
    <ExerciseShell
      title={lesson.name}
      subtitle="Wybierz właściwą formę. Po każdej odpowiedzi zobaczysz, dlaczego tak."
      onBack={onBack}
      progress={quiz.progress}
      progressLabel={`Zaliczone ${quiz.stats.mastered} / ${quiz.stats.total}`}
      headerRight={
        <button className="btn btn-secondary" onClick={() => setPhase('theory')}>
          <BookOpen size={18} /> Teoria
        </button>
      }
    >
      {quiz.current && (
        <ChoiceCard
          prompt={quiz.current.prompt}
          translation={quiz.current.context}
          options={quiz.current.options ?? []}
          correctIndex={(quiz.current.options ?? []).indexOf(quiz.current.answer)}
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            setSelectedIndex(index);
            const picked = (quiz.current!.options ?? [])[index];
            const isCorrect = picked === quiz.current!.answer;
            quiz.answer(isCorrect);
            speak(fullSentence(quiz.current!.prompt, quiz.current!.answer));
          }}
          feedback={quiz.feedback}
          explanation={quiz.current.explanation}
          onNext={() => {
            setSelectedIndex(null);
            quiz.next();
          }}
          onSpeak={() => speak(fullSentence(quiz.current!.prompt, quiz.current!.answer))}
          isLast={quiz.position >= quiz.queueLength}
        />
      )}
    </ExerciseShell>
  );
};
