import type { Word } from '../types';

/**
 * Powtórki rozłożone w czasie (Leitner/SM-2 lite).
 * Każde słówko ma „pudełko” - im wyższe, tym rzadziej wraca.
 * Pomyłka cofa je na start, bo najwyraźniej nie siedzi.
 */
export interface SrsCard extends Word {
  box: number;
  /** Data następnej powtórki, YYYY-MM-DD. */
  due: string;
  reps: number;
  lapses: number;
}

const SRS_KEY = 'kacapp_srs';
// Odstępy w dniach dla kolejnych pudełek. Pudełko 0 = nowe słówko, do nauki dziś.
const INTERVALS = [0, 1, 2, 4, 8, 16, 32, 64];
export const MAX_BOX = INTERVALS.length - 1;

// Klucze starego formatu - migrowane raz, przy pierwszym odczycie.
const LEGACY_HISTORY_KEY = 'kacapp_word_history';
const LEGACY_NEW_KEY = 'kacapp_reviews_new';

export const todayKey = (date: Date = new Date()): string => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const addDays = (days: number): string => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + days);
  return todayKey(date);
};

type SrsStore = Record<string, SrsCard>;

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeStore = (store: SrsStore) => {
  try {
    localStorage.setItem(SRS_KEY, JSON.stringify(store));
  } catch {
    /* brak miejsca - postęp się nie zapisze */
  }
};

const newCard = (word: Word, box: number): SrsCard => ({
  ...word,
  box,
  due: todayKey(),
  reps: 0,
  lapses: 0,
});

/** Jednorazowe przeniesienie postępu ze starego formatu (historia + „nowe”). */
const migrateLegacy = (): SrsStore => {
  const history = readJson<Word[]>(LEGACY_HISTORY_KEY, []);
  const fresh = readJson<Word[]>(LEGACY_NEW_KEY, []);
  if (history.length === 0 && fresh.length === 0) return {};

  const store: SrsStore = {};
  history.forEach((w) => {
    // Słówko już przerobione, a nieoczekujące na powtórkę - traktujemy jak znane.
    const isPending = fresh.some((f) => f.ru === w.ru);
    store[w.ru] = newCard(w, isPending ? 0 : 1);
  });
  fresh.forEach((w) => {
    if (!store[w.ru]) store[w.ru] = newCard(w, 0);
  });
  writeStore(store);
  return store;
};

export const getStore = (): SrsStore => {
  const raw = localStorage.getItem(SRS_KEY);
  if (raw === null) return migrateLegacy();
  return readJson<SrsStore>(SRS_KEY, {});
};

export const getAllCards = (): SrsCard[] => Object.values(getStore());

/** Karty na dziś: nowe najpierw, potem najbardziej zaległe. */
export const getDueCards = (limit = 30): SrsCard[] => {
  const today = todayKey();
  return getAllCards()
    .filter((c) => c.due <= today)
    .sort((a, b) => a.box - b.box || a.due.localeCompare(b.due))
    .slice(0, limit);
};

export const getDueCount = (): number => {
  const today = todayKey();
  return getAllCards().filter((c) => c.due <= today).length;
};

/** Ile kart wraca w kolejnych dniach - do podpowiedzi „jutro: 12”. */
export const getUpcomingCount = (withinDays: number): number => {
  const today = todayKey();
  const limit = addDays(withinDays);
  return getAllCards().filter((c) => c.due > today && c.due <= limit).length;
};

export const addWords = (words: Word[]) => {
  const store = getStore();
  let changed = false;
  words.forEach((word) => {
    if (!store[word.ru]) {
      store[word.ru] = newCard(word, 0);
      changed = true;
    }
  });
  if (changed) writeStore(store);
};

/** Ocena odpowiedzi: awans o jedno pudełko albo powrót na start. */
export const gradeCard = (ru: string, isCorrect: boolean) => {
  const store = getStore();
  const card = store[ru];
  if (!card) return;

  if (isCorrect) {
    card.box = Math.min(MAX_BOX, card.box + 1);
    card.due = addDays(INTERVALS[card.box]);
  } else {
    card.box = 0;
    card.lapses += 1;
    card.due = todayKey();
  }
  card.reps += 1;
  writeStore(store);
};

export const describeInterval = (box: number): string => {
  const days = INTERVALS[Math.min(MAX_BOX, box)];
  if (days === 0) return 'dziś';
  if (days === 1) return 'jutro';
  return `za ${days} dni`;
};
