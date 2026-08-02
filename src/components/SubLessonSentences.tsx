import React, { useEffect, useMemo } from 'react';
import { useTTS } from '../hooks/useTTS';
import { useQuiz } from '../hooks/useQuiz';
import { LessonResult } from './LessonResult';
import { ExerciseShell } from './ExerciseShell';
import { QuizCard } from './QuizCard';
import { EmptyState } from './EmptyState';
import { markSubLessonDone } from '../utils/progress';

interface SentencesProps {
  sentences: { pl: string; ru: string }[];
  lessonId: string;
  onComplete: () => void;
}

export const SubLessonSentences: React.FC<SentencesProps> = ({ sentences, lessonId, onComplete }) => {
  const { speak } = useTTS();
  const questions = useMemo(
    () => sentences.map((s) => ({ id: s.ru, prompt: s.pl, answer: s.ru })),
    [sentences]
  );
  const quiz = useQuiz(questions, { onAnswerRevealed: speak });

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  useEffect(() => {
    if (quiz.finished) markSubLessonDone(lessonId, 'sentences');
  }, [quiz.finished, lessonId]);

  if (sentences.length === 0) {
    return (
      <EmptyState
        title="Brak zdań"
        description="Ta lekcja nie ma jeszcze materiału w tej sekcji."
        onBack={onComplete}
      />
    );
  }

  if (quiz.finished) {
    return <LessonResult title="Zdania" stats={quiz.stats} onRetry={quiz.restart} onBack={onComplete} />;
  }

  return (
    <ExerciseShell
      title="Zdania"
      subtitle="Przetłumacz całe zdanie na rosyjski."
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
          multiline
          isLast={quiz.position >= quiz.queueLength}
        />
      )}
    </ExerciseShell>
  );
};
