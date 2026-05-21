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

