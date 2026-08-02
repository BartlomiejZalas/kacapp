import type { Lesson } from '../types';
import type { QuizItem } from '../hooks/useQuiz';

/** Materiał na dyktando: zdania (najcenniejsze na słuch) plus słówka lekcji. */
export const getDictationItems = (lesson: Lesson): QuizItem[] => [
  ...lesson.sentences.map((s) => ({ id: `s-${s.ru}`, prompt: s.pl, answer: s.ru })),
  ...lesson.words.map((w) => ({ id: `w-${w.ru}`, prompt: w.pl, answer: w.ru })),
];

export const TEST_LENGTH = 15;
export const PASS_THRESHOLD = 80;

/** Pula pytań testu końcowego: wszystko, czego lekcja uczy w pozostałych modułach. */
export const buildTestPool = (lesson: Lesson): QuizItem[] => [
  ...lesson.words.map((w) => ({ id: `w-${w.ru}`, prompt: w.pl, answer: w.ru, context: 'Słówko' })),
  ...lesson.hardWords.map((w) => ({ id: `h-${w.ru}`, prompt: w.pl, answer: w.ru, context: 'Trudne słówko' })),
  ...lesson.enumeratives.map((e) => ({ id: `e-${e.ru}`, prompt: e.pl, answer: e.ru, context: 'Enumeratywne' })),
  ...lesson.sentences.map((s) => ({ id: `s-${s.ru}`, prompt: s.pl, answer: s.ru, context: 'Zdanie' })),
  ...lesson.conjugations.flatMap((c) =>
    c.rows.map((r) => ({
      id: `c-${c.title}-${r.pronoun}`,
      prompt: `${r.pronoun} ...`,
      answer: r.verb,
      context: c.title,
    }))
  ),
  ...lesson.unusualPhrases.flatMap((p) => [
    { id: `u-${p.ru}`, prompt: p.pl, answer: p.ru, context: 'Związek słów' },
    ...(p.examples ?? []).map((ex) => ({ id: `ux-${ex.ru}`, prompt: ex.pl, answer: ex.ru, context: p.pl })),
  ]),
];
