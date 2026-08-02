// Interpunkcja, myślniki (także — i –), cudzysłowy oraz spacje nie decydują o tym,
// czy ktoś zna słowo - porównujemy same litery.
const PUNCTUATION = /[.,/#!$%^&*;:{}=\-_`~()?!"'«»„”“–—…]/g;

export const normalizeRussian = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(PUNCTUATION, '')
    .replace(/\s+/g, '')
    .replace(/ё/g, 'е'); // ё i е traktujemy wymiennie
