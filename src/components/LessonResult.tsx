import React, { useEffect } from 'react';
import { Trophy, ArrowLeft, RotateCcw, Target, ListChecks, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { updateStreak } from '../utils/streak';
import type { QuizStats } from '../hooks/useQuiz';

interface ResultProps {
  title: string;
  onBack: () => void;
  onRetry?: () => void;
  stats?: QuizStats;
  backLabel?: string;
  retryLabel?: string;
  footnote?: string;
  /** Ustawiane przez test końcowy: wynik decyduje o odznace. */
  testResult?: { score: number; threshold: number; passed: boolean };
}

const praise = (accuracy: number) => {
  if (accuracy >= 95) return 'Perfekcyjnie! Rosyjski masz w małym palcu.';
  if (accuracy >= 80) return 'Bardzo dobrze! Kilka drobiazgów do dopracowania.';
  if (accuracy >= 60) return 'Nieźle. Powtórka utrwali resztę.';
  return 'Materiał na powtórkę - ale przebrnąłeś przez całość!';
};

const Stat: React.FC<{ icon: React.ReactNode; value: string; label: string; color: string }> = ({
  icon,
  value,
  label,
  color,
}) => (
  <div style={{ flex: 1, textAlign: 'center' }}>
    <div style={{ color, display: 'flex', justifyContent: 'center', marginBottom: '0.35rem' }}>{icon}</div>
    <div style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{label}</div>
  </div>
);

/** Jeden ekran podsumowania dla wszystkich ćwiczeń. */
export const LessonResult: React.FC<ResultProps> = ({
  title,
  onBack,
  onRetry,
  stats,
  backLabel = 'Powrót do lekcji',
  retryLabel = 'Powtórz ćwiczenie',
  footnote,
  testResult,
}) => {
  useEffect(() => {
    updateStreak();
  }, []);

  const accuracy = stats && stats.answers > 0 ? Math.round((stats.correct / stats.answers) * 100) : null;
  const failed = testResult && !testResult.passed;

  return (
    <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '3rem' }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
        <div
          style={{
            background: failed
              ? 'linear-gradient(135deg, #fb923c, #ea580c)'
              : 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white',
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: failed ? '0 16px 30px -12px rgb(234 88 12 / 0.7)' : '0 16px 30px -12px rgb(22 163 74 / 0.7)',
          }}
        >
          {failed ? <RotateCcw size={44} /> : <Trophy size={44} />}
        </div>
      </motion.div>

      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
        {testResult ? (testResult.passed ? 'Test zdany!' : 'Jeszcze nie tym razem') : 'Ukończone!'}
      </h1>
      <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        <strong style={{ color: 'var(--text)' }}>{title}</strong>
        <br />
        {testResult
          ? testResult.passed
            ? `Wynik ${testResult.score}% - odznaka Twoja.`
            : `Wynik ${testResult.score}%, do zaliczenia trzeba ${testResult.threshold}%.`
          : accuracy !== null && praise(accuracy)}
      </p>

      {stats && stats.answers > 0 && (
        <>
          <div className="card flex" style={{ gap: 0, padding: '1.25rem 0.5rem' }}>
            <Stat icon={<ListChecks size={22} />} value={`${stats.total}`} label="pytań" color="var(--primary)" />
            <Stat
              icon={<Target size={22} />}
              value={`${accuracy}%`}
              label="skuteczność"
              color={accuracy! >= 80 ? 'var(--success)' : 'var(--warning)'}
            />
            <Stat
              icon={<AlertCircle size={22} />}
              value={`${stats.mistakes.length}`}
              label="do powtórki"
              color={stats.mistakes.length ? 'var(--error)' : 'var(--success)'}
            />
          </div>

          {stats.mistakes.length > 0 && (
            <div className="card" style={{ textAlign: 'left' }}>
              <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>
                Warto powtórzyć
              </span>
              {stats.mistakes.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>{m.prompt}</span>
                  <strong>{m.answer}</strong>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {footnote && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>{footnote}</p>
      )}

      <div className="grid" style={{ marginTop: '1.5rem' }}>
        {onRetry && (
          <button className={`btn btn-block ${failed ? 'btn-primary' : 'btn-secondary'}`} onClick={onRetry}>
            <RotateCcw size={20} /> {retryLabel}
          </button>
        )}
        <button className={`btn btn-block ${failed ? 'btn-secondary' : 'btn-primary'}`} onClick={onBack}>
          <ArrowLeft size={20} /> {backLabel}
        </button>
      </div>
    </div>
  );
};
