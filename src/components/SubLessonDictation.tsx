import React, { useEffect, useMemo } from 'react';
import type { Lesson } from '../types';
import { useTTS } from '../hooks/useTTS';
import { useQuiz } from '../hooks/useQuiz';
import { Volume2, Turtle, Ear } from 'lucide-react';
import { LessonResult } from './LessonResult';
import { ExerciseShell } from './ExerciseShell';
import { QuizCard } from './QuizCard';
import { EmptyState } from './EmptyState';
import { markSubLessonDone } from '../utils/progress';
import { getDictationItems } from '../utils/exercisePools';

interface DictationProps {
  lesson: Lesson;
  onComplete: () => void;
}

export const SubLessonDictation: React.FC<DictationProps> = ({ lesson, onComplete }) => {
  const { speak } = useTTS();
  const questions = useMemo(() => getDictationItems(lesson), [lesson]);

  // W dyktandzie nie czytamy rozwiązania automatycznie - to zdradzałoby odpowiedź
  // zanim użytkownik ją zobaczy. Odsłuch jest zawsze pod ręką jako przycisk.
  const quiz = useQuiz(questions);

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  // Nowe pytanie - od razu je odtwarzamy.
  const currentId = quiz.current?.id;
  useEffect(() => {
    if (currentId && !quiz.feedback) speak(quiz.current!.answer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  useEffect(() => {
    if (quiz.finished) markSubLessonDone(lesson.id, 'dictation');
  }, [quiz.finished, lesson.id]);

  if (questions.length === 0) {
    return (
      <EmptyState
        title="Brak materiału na dyktando"
        description="Ta lekcja nie ma jeszcze zdań ani słówek."
        onBack={onComplete}
      />
    );
  }

  if (quiz.finished) {
    return <LessonResult title="Dyktando" stats={quiz.stats} onRetry={quiz.restart} onBack={onComplete} />;
  }

  const answer = quiz.current?.answer ?? '';

  return (
    <ExerciseShell
      title="Dyktando"
      subtitle="Posłuchaj i zapisz to, co słyszysz. Tekst zobaczysz dopiero po sprawdzeniu."
      onBack={onComplete}
      progress={quiz.progress}
      progressLabel={`Zaliczone ${quiz.stats.mastered} / ${quiz.stats.total}`}
    >
      {quiz.current && (
        <QuizCard
          prompt={quiz.current.prompt}
          answer={quiz.current.answer}
          hint={`Tłumaczenie: ${quiz.current.prompt}`}
          promptNode={
            <div style={{ margin: '0.5rem 0 1.5rem' }}>
              <div className="flex" style={{ justifyContent: 'center', color: 'var(--text-muted)', gap: '0.4rem' }}>
                <Ear size={18} />
                <span className="eyebrow" style={{ display: 'inline' }}>
                  Posłuchaj i zapisz
                </span>
              </div>
              <div className="flex" style={{ justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-primary btn-icon"
                  style={{ width: '64px', height: '64px' }}
                  onClick={() => speak(answer)}
                  aria-label="Odtwórz"
                >
                  <Volume2 size={28} />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-icon"
                  onClick={() => speak(answer, 'ru-RU', undefined, 0, 0.55)}
                  aria-label="Odtwórz wolniej"
                >
                  <Turtle size={22} />
                </button>
              </div>
            </div>
          }
          input={quiz.input}
          onInputChange={quiz.setInput}
          feedback={quiz.feedback}
          onCheck={quiz.check}
          onGiveUp={quiz.giveUp}
          onNext={quiz.next}
          onSpeak={() => speak(answer)}
          multiline
          placeholder="Zapisz po rosyjsku..."
          isLast={quiz.position >= quiz.queueLength}
        />
      )}
    </ExerciseShell>
  );
};
