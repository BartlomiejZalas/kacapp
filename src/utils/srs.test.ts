import test from 'node:test';
import assert from 'node:assert/strict';

// srs czyta localStorage przy imporcie modułu dopiero w wywołaniach - stub musi
// istnieć wcześniej, bo node nie ma localStorage bez --experimental-webstorage.
const store = new Map<string, string>();
(globalThis as unknown as { localStorage: Storage }).localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
  clear: () => store.clear(),
  key: () => null,
  length: 0,
} as Storage;

const { repairStore, getAllCards } = await import('./srs.ts');

const SRS_KEY = 'kacapp_srs';
const card = (ru: string, box = 0) => ({ ru, pl: 'włosy', box, due: '2020-01-01', reps: 1, lapses: 0 });
const seed = (cards: Record<string, ReturnType<typeof card>>) => {
  store.clear();
  store.set(SRS_KEY, JSON.stringify(cards));
};

const WORDS = [{ pl: 'włosy', ru: 'волосы' }, { pl: 'kawa', ru: 'кофе' }];

test('karta z łacińskim "o" dostaje z powrotem cyrylicką pisownię', () => {
  seed({ 'вoлосы': card('вoлосы', 3) });
  repairStore(WORDS);
  const cards = getAllCards();
  assert.equal(cards.length, 1);
  assert.equal(cards[0].ru, 'волосы');
  assert.equal(cards[0].box, 3, 'postęp powtórki zostaje');
  assert.ok(JSON.parse(store.get(SRS_KEY)!)['волосы'], 'klucz też jest naprawiony');
});

test('duplikat po naprawie scala się, wygrywa lepiej opanowana karta', () => {
  seed({ 'вoлосы': card('вoлосы', 1), 'волосы': card('волосы', 4) });
  repairStore(WORDS);
  const cards = getAllCards();
  assert.equal(cards.length, 1);
  assert.equal(cards[0].box, 4);
});

test('karta spoza aktualnego słownika zostaje nietknięta', () => {
  seed({ 'старьё': card('старьё', 2) });
  repairStore(WORDS);
  assert.equal(getAllCards()[0].ru, 'старьё');
});

test('gdy wszystko się zgadza, localStorage nie jest nadpisywany', () => {
  seed({ 'волосы': card('волосы', 2) });
  const before = store.get(SRS_KEY);
  repairStore(WORDS);
  assert.equal(store.get(SRS_KEY), before);
});
