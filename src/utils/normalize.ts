// Interpunkcja, myślniki (także — i –), cudzysłowy oraz spacje nie decydują o tym,
// czy ktoś zna słowo - porównujemy same litery.
const PUNCTUATION = /[.,/#!$%^&*;:{}=\-_`~()?!"'«»„”“–—…]/g;

// Znaki akcentu (kreśka nad samogłoską, np. во́лосы) są tylko podpowiedzią wymowy -
// nie da się ich wpisać ze zwykłej klawiatury, więc ignorujemy je po obu stronach.
const STRESS_MARKS = /[\u0300\u0301\u00b4\u02b9\u02ca\u02cb]/g;

export const normalizeRussian = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(STRESS_MARKS, '')
    .replace(PUNCTUATION, '')
    .replace(/\s+/g, '')
    .replace(/ё/g, 'е'); // ё i е traktujemy wymiennie
