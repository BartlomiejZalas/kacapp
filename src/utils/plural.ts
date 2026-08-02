/**
 * Polska odmiana liczebników: 1 słówko, 2-4 słówka, 5+ słówek
 * (z wyjątkiem nastek: 12 słówek, nie 12 słówka).
 */
export const plural = (count: number, one: string, few: string, many: string): string => {
  const abs = Math.abs(count);
  if (abs === 1) return one;
  const lastTwo = abs % 100;
  const last = abs % 10;
  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return few;
  return many;
};

export const words = (count: number) => plural(count, 'słówko', 'słówka', 'słówek');
export const days = (count: number) => plural(count, 'dzień', 'dni', 'dni');
export const items = (count: number) => plural(count, 'pozycja', 'pozycje', 'pozycji');
export const questions = (count: number) => plural(count, 'pytanie', 'pytania', 'pytań');
