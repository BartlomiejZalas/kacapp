import React from 'react';
import { CheckCircle2, XCircle, Volume2, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Feedback } from '../hooks/useQuiz';

interface ChoiceCardProps {
  /** Zdanie z luką. */
  prompt: string;
  /** Tłumaczenie nad zdaniem - żeby było wiadomo, o którą formę chodzi. */
  translation?: string;
  options: string[];
  correctIndex: number;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  feedback: Feedback;
  explanation?: string;
  onNext: () => void;
  onSpeak?: () => void;
  isLast?: boolean;
}

const LETTERS = ['A', 'B', 'C', 'D'];

/** Pytanie jednokrotnego wyboru - format ćwiczeń gramatycznych. */
export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  prompt,
  translation,
  options,
  correctIndex,
  selectedIndex,
  onSelect,
  feedback,
  explanation,
  onNext,
  onSpeak,
  isLast = false,
}) => {
  const answered = feedback !== null;
  const [before, after] = prompt.split('___');

  const optionStyle = (index: number): React.CSSProperties => {
    if (!answered) return {};
    if (index === correctIndex) {
      return { borderColor: 'var(--success)', background: 'var(--success-soft)', color: 'var(--success)' };
    }
    if (index === selectedIndex) {
      return { borderColor: 'var(--error)', background: 'var(--error-soft)', color: 'var(--error)' };
    }
    return { opacity: 0.5 };
  };

  return (
    <div className="card">
      {translation && (
        <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>
          {translation}
        </span>
      )}

      <p style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '1.5rem' }}>
        {before}
        <span
          style={{
            display: 'inline-block',
            minWidth: '4.5rem',
            textAlign: 'center',
            padding: '0 0.4rem',
            borderBottom: `3px solid ${answered ? 'var(--success)' : 'var(--primary)'}`,
            color: answered ? 'var(--success)' : 'var(--text-muted)',
            fontWeight: 800,
          }}
        >
          {answered ? options[correctIndex] : '...'}
        </span>
        {after}
      </p>

      <div className="grid" style={{ gap: '0.6rem' }}>
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            className="card"
            onClick={() => !answered && onSelect(index)}
            disabled={answered}
            style={{
              margin: 0,
              padding: '0.9rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textAlign: 'left',
              font: 'inherit',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text)',
              cursor: answered ? 'default' : 'pointer',
              transition: 'all 0.15s ease',
              ...optionStyle(index),
            }}
          >
            <span
              style={{
                width: '2rem',
                height: '2rem',
                flexShrink: 0,
                borderRadius: '50%',
                background: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 800,
              }}
            >
              {LETTERS[index]}
            </span>
            <span style={{ flex: 1 }}>{option}</span>
            {answered && index === correctIndex && <CheckCircle2 size={20} />}
            {answered && index === selectedIndex && index !== correctIndex && <XCircle size={20} />}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className={`feedback ${feedback === 'correct' ? 'feedback-correct' : 'feedback-wrong'}`}>
              <Lightbulb size={22} />
              <div style={{ flex: 1 }}>
                <div>{feedback === 'correct' ? 'Dobrze!' : 'Nie tym razem'}</div>
                {explanation && (
                  <div style={{ fontWeight: 500, marginTop: '0.35rem', color: 'var(--text)' }}>{explanation}</div>
                )}
              </div>
              {onSpeak && (
                <button type="button" className="btn btn-ghost" onClick={onSpeak} aria-label="Przeczytaj zdanie">
                  <Volume2 size={20} />
                </button>
              )}
            </div>

            <button
              className={`btn btn-block ${feedback === 'correct' ? 'btn-success' : 'btn-primary'}`}
              style={{ marginTop: '1.25rem' }}
              onClick={onNext}
              type="button"
              autoFocus
            >
              {isLast ? 'Zakończ' : 'Dalej'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
