import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeRussian, stripStress } from './normalize.ts';

const accepts = (given: string, expected: string) =>
  assert.equal(normalizeRussian(given), normalizeRussian(expected), `"${given}" powinno zaliczyć "${expected}"`);

const rejects = (given: string, expected: string) =>
  assert.notEqual(normalizeRussian(given), normalizeRussian(expected), `"${given}" NIE powinno zaliczyć "${expected}"`);

test('brak kropki na końcu jest zaliczany', () => {
  accepts('Я дома', 'Я дома.');
  accepts('Садитесь, пожалуйста', 'Садитесь, пожалуйста.');
});

test('brak myślnika (także półpauzy i pauzy) jest zaliczany', () => {
  accepts('по русски', 'по-русски');
  accepts('порусски', 'по-русски');
  accepts('Моя цель туризм', 'Моя цель — туризм.');
  accepts('Без веника баня не баня', 'Без веника баня — не баня.');
});

test('pozostała interpunkcja i cudzysłowy nie blokują odpowiedzi', () => {
  accepts('Где граница', 'Где граница?');
  accepts('С лёгким паром', 'С лёгким паром!');
  accepts('Напиши слово школа', 'Напиши слово "школа".');
  accepts('Счёт пожалуйста', 'Счёт, пожалуйста.');
});

test('wielkość liter, spacje i ё/е nie mają znaczenia', () => {
  accepts('  ЧАЙ  ', 'чай');
  accepts('приятного   аппетита', 'приятного аппетита');
  accepts('ребенок', 'ребёнок');
});

test('akcent (kreska nad samogłoską) nie blokuje odpowiedzi', () => {
  accepts('волосы', 'во\u0301лосы');
  accepts('во\u0301лосы', 'волосы');
  accepts('хорошо', 'хорошо\u0301');
});

test('błędne słowo nadal jest błędne', () => {
  rejects('чай', 'кофе');
  rejects('дом', 'дома');
  rejects('мои', 'мой');
});

test('stripStress zdejmuje akcent, ale nie psuje й i ё', () => {
  assert.equal(stripStress('во\u0301лосы'), 'волосы');
  assert.equal(stripStress('хоро\u0301ший'), 'хороший');
  assert.equal(stripStress('ребёнок'), 'ребёнок');
  assert.equal(stripStress('мой'), 'мой');
});
