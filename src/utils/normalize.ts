// Interpunkcja, myślniki (także — i –), cudzysłowy oraz spacje nie decydują o tym,
// czy ktoś zna słowo - porównujemy same litery.
const PUNCTUATION = /[.,/#!$%^&*;:{}=\-_`~()?!"'«»„”“–—…]/g;

// Znaki akcentu (kreśka nad samogłoską, np. во́лосы) są tylko podpowiedzią wymowy -
// nie da się ich wpisać ze zwykłej klawiatury, więc ignorujemy je po obu stronach.
const STRESS_MARKS = /[\u0300\u0301\u0340\u0341\u00b4\u02b9\u02ca\u02cb]/g;

// Znaki niewidoczne (zero-width, miękki dywiz, BOM) - potrafią wpaść przy kopiowaniu
// tekstu i osiąść w karcie powtórek w localStorage. Na ekranie nie ma po nich śladu,
// a odpowiedź nie przechodzi. \s ich nie łapie, więc czyścimy osobno.
const INVISIBLE = /\u00ad|\u200b|\u200c|\u200d|\u2060|\ufeff/g;

/**
 * Usuwa akcenty, zostawiając literę. NFD rozkłada ewentualne złożone znaki
 * (np. ѝ = и + akcent), a NFC składa z powrotem to, co ma zostać (й, ё).
 */
export const stripStress = (text: string): string =>
  text.normalize('NFD').replace(STRESS_MARKS, '').normalize('NFC');

// Litery łacińskie, które wyglądają dokładnie jak cyrylickie (o, a, e, c, p, x...).
// Przy przełączaniu układu klawiatury albo autokorekcie na telefonie łatwo wpisać
// "вoлосы" z łacińskim "o" - dla oka bez różnicy, dla === to inne słowo.
const HOMOGLYPHS: Record<string, string> = {
  A: 'А', a: 'а', B: 'В', C: 'С', c: 'с', E: 'Е', e: 'е', H: 'Н',
  K: 'К', k: 'к', M: 'М', O: 'О', o: 'о', P: 'Р', p: 'р', T: 'Т',
  X: 'Х', x: 'х', Y: 'У', y: 'у',
};

/** Zamienia łacińskie bliźniaki na cyrylicę - przed obniżeniem wielkości liter,
 *  bo tylko wtedy widać, że "B" to "В", a nie "в" od łacińskiego "b". */
export const foldHomoglyphs = (text: string): string =>
  text.replace(/[AaBCcEeHKkMOoPpTXxYy]/g, (ch) => HOMOGLYPHS[ch] ?? ch);

export const normalizeRussian = (text: string): string =>
  foldHomoglyphs(stripStress(text))
    .replace(INVISIBLE, '')
    .toLowerCase()
    .trim()
    .replace(PUNCTUATION, '')
    .replace(/\s+/g, '')
    .replace(/ё/g, 'е'); // ё i е traktujemy wymiennie
