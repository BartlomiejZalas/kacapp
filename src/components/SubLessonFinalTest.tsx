import React, { useEffect, useMemo, useState } from 'react';
import type { Lesson } from '../types';
import { useTTS } from '../hooks/useTTS';
import { useQuiz } from '../hooks/useQuiz';
import { GraduationCap, AlertTriangle } from 'lucide-react';
import { LessonResult } from './LessonResult';
import { ExerciseShell } from './ExerciseShell';
import { QuizCard } from './QuizCard';
import { shuffle } from '../utils/shuffle';
import { markSubLessonDone, saveBadge } from '../utils/progress';
import { buildTestPool, PASS_THRESHOLD, TEST_LENGTH } from '../utils/exercisePools';

interface FinalTestProps {
  lesson: Lesson;
  onComplete: () => void;
}

export const SubLessonFinalTest: React.FC<FinalTestProps> = ({ lesson, onComplete }) => {
  const [attempt, setAttempt] = useState(0);
  const { speak } = useTTS();

  const questions = useMemo(() => {
    void attempt; // każde podejście losuje inny zestaw
    return shuffle(buildTestPool(lesson)).slice(0, TEST_LENGTH);
  }, [lesson, attempt]);

  // W teście pytania nie wracają do kolejki - jedno podejście, jedna odpowiedź.
  const quiz = useQuiz(questions, { onAnswerRevealed: speak, requeueOnWrong: false });

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  const score = quiz.stats.answers > 0 ? Math.round((quiz.stats.correct / quiz.stats.answers) * 100) : 0;
  const passed = score >= PASS_THRESHOLD;

  useEffect(() => {
    if (!quiz.finished) return;
    if (passed) {
      markSubLessonDone(lesson.id, 'final_test');
      saveBadge(lesson.id, score);
    }
  }, [quiz.finished, passed, score, lesson.id]);

  if (quiz.finished) {
    return (
      <LessonResult
        title={`Test końcowy: ${lesson.name}`}
        stats={quiz.stats}
        testResult={{ score, threshold: PASS_THRESHOLD, passed }}
        onRetry={() => {
          setAttempt((a) => a + 1);
          quiz.restart();
        }}
        retryLabel={passed ? 'Jeszcze raz, na 100%' : 'Podejdź ponownie'}
        onBack={onComplete}
      />
    );
  }

  return (
    <ExerciseShell
      title="Test końcowy"
      subtitle={`${TEST_LENGTH} losowych pytań ze wszystkich modułów. Do zaliczenia: ${PASS_THRESHOLD}%.`}
      onBack={onComplete}
      progress={(quiz.stats.answers / questions.length) * 100}
      progressLabel={`Pytanie ${Math.min(quiz.position, questions.length)} / ${questions.length}`}
      headerRight={
        <span className="badge" style={{ background: '#fef3c7', color: '#b45309' }}>
          <GraduationCap size={14} /> {score}%
        </span>
      }
    >
      <p
        className="flex"
        style={{ gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.75rem' }}
      >
        <AlertTriangle size={14} /> Tu pomyłka nie wraca do kolejki - liczy się każda odpowiedź.
      </p>

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
          requeueOnWrong={false}
          isLast={quiz.position >= quiz.queueLength}
        />
      )}
    </ExerciseShell>
  );
};
