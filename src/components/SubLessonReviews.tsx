import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTTS } from '../hooks/useTTS';
import { useQuiz, type QuizItem } from '../hooks/useQuiz';
import { ArrowLeft, PartyPopper, CalendarClock, Layers } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { ExerciseShell } from './ExerciseShell';
import { LessonResult } from './LessonResult';
import { shuffle } from '../utils/shuffle';
import { words as pluralWords } from '../utils/plural';
import {
  getAllCards,
  getDueCards,
  getUpcomingCount,
  gradeCard,
  todayKey,
  describeInterval,
} from '../utils/srs';

interface ReviewsProps {
  onBack: () => void;
}

export const SubLessonReviews: React.FC<ReviewsProps> = ({ onBack }) => {
  // Kolejka budowana synchronicznie, żeby quiz od pierwszego renderu miał komplet pytań.
  const [queue, setQueue] = useState(() => getDueCards());
  const [extraRounds, setExtraRounds] = useState(0);
  const { speak } = useTTS();

  useEffect(() => () => window.speechSynthesis.cancel(), []);

  const questions: QuizItem[] = useMemo(() => queue.map((c) => ({ id: c.ru, prompt: c.pl, answer: c.ru })), [queue]);

  // Harmonogram aktualizujemy od razu po odpowiedzi - wyjście w połowie nie gubi postępu.
  const handleGraded = useCallback((item: QuizItem, isCorrect: boolean) => {
    gradeCard(item.id, isCorrect);
  }, []);

  const quiz = useQuiz(questions, { onAnswerRevealed: speak, onGraded: handleGraded });

  const [queueVersion, setQueueVersion] = useState(0);
  useEffect(() => {
    if (queueVersion > 0) quiz.restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueVersion]);

  const addMoreWords = () => {
    // Ponad plan: karty spoza dzisiejszego terminu. Poprawna odpowiedź tylko
    // przesuwa termin dalej, więc harmonogram na tym nie cierpi.
    const today = todayKey();
    const notDue = getAllCards().filter((c) => c.due > today);
    if (notDue.length === 0) return;
    setQueue(shuffle(notDue).slice(0, 10));
    setExtraRounds((v) => v + 1);
    setQueueVersion((v) => v + 1);
  };

  const upcoming = getUpcomingCount(1);
  const totalCards = getAllCards().length;

  if (questions.length === 0) {
    return (
      <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <PartyPopper size={64} color="var(--accent)" style={{ margin: '0 auto 1.5rem' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>Powtórki na dziś zrobione</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {totalCards === 0
            ? 'Zrób lekcję słówek, a materiał sam trafi tutaj.'
            : upcoming > 0
              ? `Jutro wraca ${upcoming} ${pluralWords(upcoming)}.`
              : 'Kolejne słówka wrócą w swoim czasie - system rozkłada je w dniach.'}
        </p>
        <div className="grid">
          {totalCards > 0 && (
            <button className="btn btn-primary btn-block" onClick={addMoreWords}>
              Poćwicz ponad plan
            </button>
          )}
          <button className="btn btn-secondary btn-block" onClick={onBack}>
            <ArrowLeft size={20} /> Wróć do menu
          </button>
        </div>
      </div>
    );
  }

  if (quiz.finished) {
    return (
      <LessonResult
        title={extraRounds > 0 ? 'Powtórka ponad plan' : 'Powtórka dzienna'}
        stats={quiz.stats}
        onRetry={addMoreWords}
        retryLabel="Poćwicz ponad plan"
        onBack={onBack}
        backLabel="Wróć do menu"
        footnote={upcoming > 0 ? `Jutro wraca ${upcoming} ${pluralWords(upcoming)}.` : undefined}
      />
    );
  }

  const currentCard = quiz.current ? queue.find((c) => c.ru === quiz.current!.id) : undefined;

  return (
    <ExerciseShell
      title={extraRounds > 0 ? 'Powtórka ponad plan' : 'Powtórka dzienna'}
      subtitle="Słówka wracają w rosnących odstępach - im lepiej je znasz, tym rzadziej."
      onBack={onBack}
      progress={quiz.progress}
      progressLabel={`Zaliczone ${quiz.stats.mastered} / ${quiz.stats.total}`}
      headerRight={
        <span className="badge">
          <Layers size={14} /> {questions.length} na dziś
        </span>
      }
    >
      {quiz.current && (
        <QuizCard
          context={
            currentCard
              ? `Poziom ${currentCard.box} · dobrze = wraca ${describeInterval(currentCard.box + 1)}`
              : undefined
          }
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

      {upcoming > 0 && (
        <p
          className="flex"
          style={{ justifyContent: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}
        >
          <CalendarClock size={14} /> Jutro wraca {upcoming} {pluralWords(upcoming)}
        </p>
      )}
    </ExerciseShell>
  );
};
