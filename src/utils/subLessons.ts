import {
  MessageSquare,
  BookOpen,
  Star,
  Layers,
  Repeat,
  Zap,
  PenLine,
  ListOrdered,
  Ear,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import type { Lesson } from '../types';

export interface SubLessonDef {
  type: string;
  name: string;
  icon: LucideIcon;
  color: string;
  count: number;
  /** Test końcowy otwiera się dopiero po przerobieniu reszty materiału. */
  requiresAll?: boolean;
}

/**
 * Lista modułów dostępnych w danej lekcji. Puste sekcje są pomijane,
 * dzięki czemu licznik postępu („3/8”) nigdy nie jest nieosiągalny.
 */
export const getSubLessons = (lesson: Lesson): SubLessonDef[] => {
  const modules: SubLessonDef[] = [
    {
      type: 'dialog',
      name: 'Dialog i słuchanie',
      icon: MessageSquare,
      color: '#3b82f6',
      count: lesson.dialog.trim() ? 1 : 0,
    },
    { type: 'vocab', name: 'Lekcja słówek', icon: BookOpen, color: '#10b981', count: lesson.words.length },
    { type: 'hard_vocab', name: 'Słówka (trudne)', icon: Star, color: '#f59e0b', count: lesson.hardWords.length },
    { type: 'match', name: 'Dopasuj pary', icon: Layers, color: '#6366f1', count: lesson.words.length },
    { type: 'conjugation', name: 'Odmiana', icon: Repeat, color: '#8b5cf6', count: lesson.conjugations.length },
    { type: 'unusual', name: 'Związki słów', icon: Zap, color: '#ef4444', count: lesson.unusualPhrases.length },
    { type: 'sentences', name: 'Zdania', icon: PenLine, color: '#ec4899', count: lesson.sentences.length },
    {
      type: 'enumeratives',
      name: 'Enumeratywne',
      icon: ListOrdered,
      color: '#14b8a6',
      count: lesson.enumeratives.length,
    },
    {
      type: 'dictation',
      name: 'Dyktando',
      icon: Ear,
      color: '#0ea5e9',
      count: lesson.sentences.length + lesson.words.length,
    },
  ].filter((sub) => sub.count > 0);

  const testPoolSize =
    lesson.words.length +
    lesson.hardWords.length +
    lesson.enumeratives.length +
    lesson.sentences.length +
    lesson.conjugations.reduce((sum, c) => sum + c.rows.length, 0) +
    lesson.unusualPhrases.length;

  if (testPoolSize >= 10 && modules.length > 1) {
    modules.push({
      type: 'final_test',
      name: 'Test końcowy',
      icon: GraduationCap,
      color: '#f59e0b',
      count: testPoolSize,
      requiresAll: true,
    });
  }

  return modules;
};

/** Test końcowy jest zamknięty, dopóki pozostałe moduły nie są zaliczone. */
export const isSubLessonLocked = (sub: SubLessonDef, allSubs: SubLessonDef[], doneTypes: string[]): boolean => {
  if (!sub.requiresAll) return false;
  return allSubs.filter((s) => !s.requiresAll).some((s) => !doneTypes.includes(s.type));
};

export const countCompleted = (lesson: Lesson, doneTypes: string[]): number => {
  const available = getSubLessons(lesson).map((s) => s.type);
  return doneTypes.filter((t) => available.includes(t)).length;
};
