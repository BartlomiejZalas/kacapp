export interface Word {
  pl: string;
  ru: string;
  image?: string;
}

export interface ConjugationRow {
  pronoun: string;
  verb: string;
}

export interface Conjugation {
  title: string;
  rows: ConjugationRow[];
}

export interface Enumerative {
  pl: string;
  ru: string;
}

export interface Lesson {
  id: string;
  name: string;
  icon: string;
  dialog: string;
  words: Word[];
  conjugations: Conjugation[];
  unusualPhrases: { 
    pl: string; 
    ru: string; 
    explanation?: string;
    examples?: { pl: string; ru: string }[];
  }[];
  sentences: { pl: string; ru: string }[];
  enumeratives: Enumerative[];
  hardWords: Word[];
}

export interface Category {
  id: string;
  name: string;
  lessons: Lesson[];
}

/* --- Gramatyka: inny format niż lekcje słownikowe --- */

export interface GrammarRule {
  title: string;
  /** Wyjaśnienie zasady, zwykłym językiem. */
  body: string;
  /** Najważniejsze zdanie do zapamiętania. */
  keyPoint?: string;
  examples?: { ru: string; pl: string; note?: string }[];
  table?: { headers: string[]; rows: string[][] };
}

export interface GrammarQuestion {
  /** Zdanie z luką, np. „Сейчас я ___ в магазин.” */
  prompt: string;
  /** Tłumaczenie, żeby było wiadomo, o którą formę chodzi. */
  translation: string;
  options: string[];
  correctIndex: number;
  /** Dlaczego ta odpowiedź - pokazywane po wyborze. */
  explanation: string;
}

export interface GrammarLesson {
  id: string;
  name: string;
  icon: string;
  summary: string;
  rules: GrammarRule[];
  questions: GrammarQuestion[];
}

