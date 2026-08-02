import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ExerciseShellProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  /** 0-100; pominięcie ukrywa pasek postępu. */
  progress?: number;
  progressLabel?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Wspólna rama każdego ćwiczenia: powrót, tytuł, pasek postępu.
 * Dzięki temu wszystkie moduły wyglądają i zachowują się tak samo.
 */
export const ExerciseShell: React.FC<ExerciseShellProps> = ({
  title,
  subtitle,
  onBack,
  progress,
  progressLabel,
  headerRight,
  children,
}) => (
  <div className="container fade-in">
    <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
      <button
        className="btn btn-secondary"
        onClick={() => {
          window.speechSynthesis.cancel();
          onBack();
        }}
      >
        <ArrowLeft size={20} /> Wróć
      </button>
      {headerRight}
    </div>

    <header style={{ marginBottom: '1rem' }}>
      <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{title}</h2>
      {subtitle && (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{subtitle}</p>
      )}
    </header>

    {progress !== undefined && (
      <div style={{ marginBottom: '1.25rem' }}>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
        </div>
        {progressLabel && (
          <p
            style={{
              marginTop: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textAlign: 'right',
            }}
          >
            {progressLabel}
          </p>
        )}
      </div>
    )}

    {children}
  </div>
);
