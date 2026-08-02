import type { Word } from '../types';
import { addWords } from './srs';

const SUB_PROGRESS_KEY = 'kacapp_sub_progress';
const BADGES_KEY = 'kacapp_badges';

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // brak miejsca / tryb prywatny - postęp po prostu się nie zapisze
  }
};

export type SubProgress = Record<string, string[]>;

export const getAllSubProgress = (): SubProgress => read<SubProgress>(SUB_PROGRESS_KEY, {});

export const getLessonProgress = (lessonId: string): string[] => getAllSubProgress()[lessonId] || [];

export const markSubLessonDone = (lessonId: string, subType: string) => {
  const all = getAllSubProgress();
  const done = all[lessonId] || [];
  if (!done.includes(subType)) {
    all[lessonId] = [...done, subType];
    write(SUB_PROGRESS_KEY, all);
  }
};

/** Nowo poznane słówka trafiają do harmonogramu powtórek. */
export const registerLearnedWords = (words: Word[]) => addWords(words);

/** Odznaki za zdany test końcowy: { [lessonId]: najlepszy wynik w % }. */
export type Badges = Record<string, number>;

export const getBadges = (): Badges => read<Badges>(BADGES_KEY, {});

export const saveBadge = (lessonId: string, score: number) => {
  const badges = getBadges();
  if ((badges[lessonId] ?? 0) < score) {
    badges[lessonId] = score;
    write(BADGES_KEY, badges);
  }
};
