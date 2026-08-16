import { useCallback, useMemo, useState } from 'react';
import { normalizeRussian } from '../utils/normalize';

export interface QuizItem {
  /** Stabilna tożsamość pytania (np. rosyjska odpowiedź). */
  id: string;
  /** To, co widzi użytkownik (zwykle po polsku). */
  prompt: string;
  /** Oczekiwana odpowiedź po rosyjsku. */
  answer: string;
  /** Dodatkowy kontekst nad pytaniem (np. tytuł odmiany albo tłumaczenie). */
  context?: string;
  /** Warianty A/B/C - używane przez ćwiczenia wyboru zamiast wpisywania. */
  options?: string[];
  /** Dlaczego ta odpowiedź jest poprawna - pokazywane po sprawdzeniu. */
  explanation?: string;
}

export interface QuizStats {
  total: number;
  mastered: number;
  answers: number;
  correct: number;
  mistakes: QuizItem[];
}

export type Feedback = 'correct' | 'wrong' | null;

interface QuizOptions {
  /** Wywoływane z poprawną odpowiedzią po każdym sprawdzeniu - wszystkie ćwiczenia czytają rozwiązanie. */
  onAnswerRevealed?: (answer: string) => void;
  /** Wywoływane po każdej ocenionej odpowiedzi (np. do zapisu harmonogramu powtórek). */
  onGraded?: (item: QuizItem, isCorrect: boolean) => void;
  /**
   * Domyślnie pomyłka wraca na koniec kolejki (tryb nauki).
   * W teście końcowym każde pytanie zadajemy dokładnie raz.
   */
  requeueOnWrong?: boolean;
}

interface QuizState {
  queue: QuizItem[];
  index: number;
  masteredIds: string[];
  mistakes: QuizItem[];
  answers: number;
  correct: number;
  finished: boolean;
}

export const useQuiz = (items: QuizItem[], options: QuizOptions = {}) => {
  const { onAnswerRevealed, onGraded, requeueOnWrong = true } = options;

  const [state, setState] = useState<QuizState>(() => ({
    queue: items,
    index: 0,
    masteredIds: [],
    mistakes: [],
    answers: 0,
    correct: 0,
    finished: items.length === 0,
  }));
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<Feedback>(null);

  const current: QuizItem | undefined = state.queue[state.index];

  const grade = useCallback(
    (isCorrect: boolean) => {
      if (!current) return;
      onAnswerRevealed?.(current.answer);
      onGraded?.(current, isCorrect);
      setFeedback(isCorrect ? 'correct' : 'wrong');
      setState((prev) => {
        if (isCorrect) {
          return {
            ...prev,
            answers: prev.answers + 1,
            correct: prev.correct + 1,
            masteredIds: prev.masteredIds.includes(current.id)
              ? prev.masteredIds
              : [...prev.masteredIds, current.id],
          };
        }
        // Pomyłka: pytanie wraca na koniec kolejki i będzie wracać aż do skutku -
        // ćwiczenie kończy się dopiero, gdy wszystko zostanie wpisane poprawnie.
        return {
          ...prev,
          answers: prev.answers + 1,
          queue: requeueOnWrong ? [...prev.queue, current] : prev.queue,
          mistakes: prev.mistakes.some((m) => m.id === current.id)
            ? prev.mistakes
            : [...prev.mistakes, current],
        };
      });
    },
    [current, onAnswerRevealed, onGraded, requeueOnWrong]
  );

  const check = useCallback(() => {
    if (feedback || !input.trim() || !current) return;
    grade(normalizeRussian(input) === normalizeRussian(current.answer));
  }, [feedback, input, current, grade]);

  /** Ocena z zewnątrz - dla ćwiczeń wyboru, gdzie nie ma czego porównywać tekstowo. */
  const answer = useCallback(
    (isCorrect: boolean) => {
      if (feedback) return;
      grade(isCorrect);
    },
    [feedback, grade]
  );

  /** "Nie wiem" - liczone jak pomyłka, ale bez zgadywania na ślepo. */
  const giveUp = useCallback(() => {
    if (feedback || !current) return;
    grade(false);
  }, [feedback, current, grade]);

  const next = useCallback(() => {
    setFeedback(null);
    setInput('');
    setState((prev) => {
      const nextIndex = prev.index + 1;
      // Kolejka jest już zaktualizowana przez grade(), więc powtórka z ostatniego
      // pytania nie ucieka wraz z końcem ćwiczenia.
      if (nextIndex >= prev.queue.length) {
        return { ...prev, finished: true };
      }
      return { ...prev, index: nextIndex };
    });
  }, []);

  const stats: QuizStats = useMemo(
    () => ({
      total: items.length,
      mastered: state.masteredIds.length,
      answers: state.answers,
      correct: state.correct,
      mistakes: state.mistakes,
    }),
    [items.length, state.masteredIds.length, state.answers, state.correct, state.mistakes]
  );

  const restart = useCallback(() => {
    setInput('');
    setFeedback(null);
    setState({
      queue: items,
      index: 0,
        masteredIds: [],
      mistakes: [],
      answers: 0,
      correct: 0,
      finished: items.length === 0,
    });
  }, [items]);

  return {
    current,
    finished: state.finished,
    feedback,
    input,
    setInput,
    check,
    answer,
    giveUp,
    next,
    restart,
    stats,
    /** Postęp liczony opanowanymi pytaniami - nie „przewijaniem” kolejki. */
    progress: items.length ? (state.masteredIds.length / items.length) * 100 : 0,
    position: state.index + 1,
    queueLength: state.queue.length,
  };
};
