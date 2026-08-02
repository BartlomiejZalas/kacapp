import React from 'react';
import { CheckCircle2, XCircle, Volume2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyrillicKeyboard } from './CyrillicKeyboard';
import type { Feedback } from '../hooks/useQuiz';

interface QuizCardProps {
  context?: string;
  prompt: string;
  /** Zamiennik nagłówka pytania (np. przycisk odsłuchu w dyktandzie). */
  promptNode?: React.ReactNode;
  /** Dodatkowa informacja pokazywana razem z rozwiązaniem (np. tłumaczenie). */
  hint?: string;
  answer: string;
  input: string;
  onInputChange: (value: string) => void;
  feedback: Feedback;
  onCheck: () => void;
  onGiveUp: () => void;
  onNext: () => void;
  onSpeak?: () => void;
  multiline?: boolean;
  placeholder?: string;
  isLast?: boolean;
  /** false w teście końcowym - tam błąd nie wraca do kolejki. */
  requeueOnWrong?: boolean;
}

/**
 * Jedno pytanie testowe - identyczne we wszystkich ćwiczeniach:
 * sprawdzenie, „nie wiem”, zawsze pokazana i przeczytana poprawna odpowiedź.
 */
export const QuizCard: React.FC<QuizCardProps> = ({
  context,
  prompt,
  promptNode,
  hint,
  answer,
  input,
  onInputChange,
  feedback,
  onCheck,
  onGiveUp,
  onNext,
  onSpeak,
  multiline = false,
  placeholder = 'Wpisz po rosyjsku...',
  isLast = false,
  requeueOnWrong = true,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback) onNext();
    else onCheck();
  };

  const inputClass = feedback === 'correct' ? 'is-correct' : feedback === 'wrong' ? 'is-wrong' : '';

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      {context && (
        <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          {context}
        </span>
      )}
      {promptNode ?? (
        <h2 style={{ fontSize: multiline ? '1.35rem' : '1.9rem', margin: '0.5rem 0 1.5rem' }}>{prompt}</h2>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          {multiline ? (
            <textarea
              className={inputClass}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={placeholder}
              autoFocus
              rows={3}
              disabled={!!feedback}
              style={{ fontSize: '1.1rem' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          ) : (
            <input
              className={inputClass}
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={placeholder}
              autoFocus
              disabled={!!feedback}
              style={{ textAlign: 'center', fontSize: '1.25rem' }}
            />
          )}
          <CyrillicKeyboard
            onInput={(char) => !feedback && onInputChange(input + char)}
            onBackspace={() => !feedback && onInputChange(input.slice(0, -1))}
          />
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`feedback ${feedback === 'correct' ? 'feedback-correct' : 'feedback-wrong'}`}
            >
              {feedback === 'correct' ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
              <div style={{ flex: 1 }}>
                <div>{feedback === 'correct' ? 'Dobrze!' : 'Jeszcze nie...'}</div>
                <div style={{ fontWeight: 500, marginTop: '0.25rem', color: 'var(--text)' }}>
                  Poprawna odpowiedź: <strong>{answer}</strong>
                </div>
                {hint && (
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {hint}
                  </div>
                )}
                {feedback === 'wrong' && requeueOnWrong && (
                  <div style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    To pytanie wróci na koniec kolejki.
                  </div>
                )}
              </div>
              {onSpeak && (
                <button type="button" className="btn btn-ghost" onClick={onSpeak} aria-label="Przeczytaj odpowiedź">
                  <Volume2 size={20} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!feedback ? (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} type="submit" disabled={!input.trim()}>
              Sprawdź
            </button>
            <button className="btn btn-secondary" type="button" onClick={onGiveUp}>
              <HelpCircle size={20} /> Nie wiem
            </button>
          </div>
        ) : (
          <button
            className={`btn btn-block ${feedback === 'correct' ? 'btn-success' : 'btn-primary'}`}
            style={{ marginTop: '1.5rem' }}
            onClick={onNext}
            type="button"
            autoFocus
          >
            {isLast ? 'Zakończ' : 'Dalej'}
          </button>
        )}
      </form>
    </div>
  );
};
